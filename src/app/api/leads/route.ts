import { mkdir, appendFile } from "node:fs/promises";
import path from "node:path";
import { sendLeadToAttio } from "@/lib/attio";

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
  const from = process.env.LEAD_FROM_EMAIL ?? "leads@updates.gulfrate.com";

  if (!apiKey || !to) return;

  const lines = Object.entries(entry).map(([k, v]) => `${k}: ${String(v ?? "")}`);
  const text = lines.join("\n");

  await fetch("https://api.resend.com/emails", {
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

    await mkdir(dataDir, { recursive: true });
    await appendFile(leadsFile, `${JSON.stringify(entry)}\n`, "utf8");
    await sendLeadEmail(entry);
    await sendLeadToAttio(entry);

    return Response.json({ ok: true });
  } catch {
    return Response.json(
      { ok: false, error: "Unable to process lead" },
      { status: 500 }
    );
  }
}
