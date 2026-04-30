import { mkdir, appendFile } from "node:fs/promises";
import path from "node:path";

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

    return Response.json({ ok: true });
  } catch {
    return Response.json(
      { ok: false, error: "Unable to process lead" },
      { status: 500 }
    );
  }
}
