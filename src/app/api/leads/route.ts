import { mkdir, appendFile } from "node:fs/promises";
import path from "node:path";
import { sendLeadToAttio } from "@/lib/attio";
import { getSupabaseAdminClient, isSupabaseLeadsEnabled } from "@/lib/supabaseAdmin";

type LeadPayload = {
  leadType?: string;
  name?: string;
  email?: string;
  phone?: string;
  company_website?: string;
  [key: string]: unknown;
};

const dataDir = path.join(process.cwd(), "data");
const leadsFile = path.join(dataDir, "leads.jsonl");
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const RATE_LIMIT_MAX = 10;
const rateLimitStore = new Map<string, { count: number; resetAt: number }>();

function getClientIp(req: Request) {
  const forwarded = req.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0]?.trim() || "unknown";
  return req.headers.get("x-real-ip") || "unknown";
}

function isRateLimited(ip: string) {
  const now = Date.now();
  const current = rateLimitStore.get(ip);
  if (!current || current.resetAt < now) {
    rateLimitStore.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return false;
  }
  if (current.count >= RATE_LIMIT_MAX) return true;
  current.count += 1;
  rateLimitStore.set(ip, current);
  return false;
}

async function sendLeadEmail(entry: Record<string, unknown>) {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.LEAD_TO_EMAIL;
  const from = process.env.LEAD_FROM_EMAIL ?? "leads@updates.nolarate.com";

  if (!apiKey || !to) return;

  const lines = Object.entries(entry).map(([k, v]) => `${k}: ${String(v ?? "")}`);
  const text = lines.join("\n");

  const resendResponse = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to: [to],
      subject: `New Lead: ${String(entry.leadType ?? "unknown")}`,
      text,
    }),
  });

  if (!resendResponse.ok) {
    const errorText = await resendResponse.text().catch(() => "");
    throw new Error(
      `Resend API error (${resendResponse.status}): ${errorText || "Unknown error"}`
    );
  }
}

async function persistLeadEntry(entry: Record<string, unknown>) {
  try {
    await mkdir(dataDir, { recursive: true });
    await appendFile(leadsFile, `${JSON.stringify(entry)}\n`, "utf8");
  } catch (error) {
    // Vercel/serverless filesystems may be read-only at runtime.
    console.error("Lead persistence skipped:", error);
  }
}

function toNullableText(value: unknown) {
  const text = String(value ?? "").trim();
  return text ? text : null;
}

function toNullableNumber(value: unknown) {
  if (value === null || value === undefined) return null;
  const digits = String(value).replace(/[^0-9.]/g, "");
  if (!digits) return null;
  const parsed = Number(digits);
  return Number.isFinite(parsed) ? parsed : null;
}

function toLoanTypeFromLeadType(leadType: unknown) {
  const raw = String(leadType ?? "").trim();
  if (!raw) return null;
  return raw;
}

async function persistLeadToSupabase(entry: Record<string, unknown>) {
  if (!isSupabaseLeadsEnabled()) return;
  const supabase = getSupabaseAdminClient();
  if (!supabase) return;

  const borrowerInsert = {
    full_name: toNullableText(entry.name),
    email: String(entry.email ?? "").trim(),
    phone: toNullableText(entry.phone),
    city: toNullableText(entry.city),
    state: toNullableText(entry.state),
    loan_goal: toNullableText(entry.loan_goal ?? entry.loanGoal),
    credit_range: toNullableText(entry.credit_range ?? entry.creditRange),
    income_range: toNullableText(entry.income_range ?? entry.incomeRange),
    down_payment_range: toNullableText(entry.down_payment_range ?? entry.downPaymentRange),
    target_home_price: toNullableNumber(entry.target_home_price ?? entry.purchasePrice),
    timeline: toNullableText(entry.timeline),
    consent_to_contact: false,
    status: "new",
  };

  const borrowerResult = await supabase
    .from("borrowers")
    .insert(borrowerInsert)
    .select("id")
    .single();

  if (borrowerResult.error || !borrowerResult.data?.id) {
    throw new Error(
      `Supabase borrower insert failed: ${borrowerResult.error?.message ?? "Unknown error"}`
    );
  }

  const loanType = toLoanTypeFromLeadType(entry.leadType);
  if (!loanType) return;

  const applicationResult = await supabase.from("loan_applications").insert({
    borrower_id: borrowerResult.data.id,
    loan_type: loanType,
    application_status: "draft",
    ai_summary: null,
    ai_recommendation: null,
  });

  if (applicationResult.error) {
    throw new Error(
      `Supabase loan application insert failed: ${applicationResult.error.message}`
    );
  }
}

export async function POST(req: Request) {
  try {
    const ip = getClientIp(req);
    if (isRateLimited(ip)) {
      return Response.json(
        { ok: false, error: "Too many requests. Please try again later." },
        { status: 429 }
      );
    }

    const payload = (await req.json()) as LeadPayload;

    // Honeypot trap: if bot fills this field, return success without processing.
    if (payload.company_website && String(payload.company_website).trim() !== "") {
      return Response.json({ ok: true });
    }

    if (!payload.leadType || !payload.name || !payload.email) {
      return Response.json(
        { ok: false, error: "Missing required fields" },
        { status: 400 }
      );
    }

    const entry = {
      ...payload,
      company_website: undefined,
      receivedAt: new Date().toISOString(),
      source: "website_demo",
    };

    await persistLeadEntry(entry);

    try {
      await persistLeadToSupabase(entry);
    } catch (error) {
      console.error("Lead Supabase sync failed:", error);
    }

    try {
      await sendLeadEmail(entry);
    } catch (error) {
      console.error("Lead email send failed:", error);
    }

    try {
      await sendLeadToAttio(entry);
    } catch (error) {
      console.error("Lead CRM sync failed:", error);
    }

    return Response.json({ ok: true });
  } catch {
    return Response.json(
      { ok: false, error: "Unable to process lead" },
      { status: 500 }
    );
  }
}

