type LeadEntry = Record<string, unknown>;

type LeadEmailSection = {
  title: string;
  fields: Array<{ key: string; label: string }>;
};

const SYSTEM_FIELDS = new Set([
  "company_website",
  "leadType",
  "loan_goal",
  "page",
  "receivedAt",
  "source",
  "submittedAt",
]);

const RATE_QUOTE_SECTIONS: LeadEmailSection[] = [
  {
    title: "Contact",
    fields: [
      { key: "name", label: "Name" },
      { key: "phone", label: "Phone" },
      { key: "email", label: "Email" },
      { key: "preferredContactMethod", label: "Preferred contact" },
    ],
  },
  {
    title: "Loan scenario",
    fields: [
      { key: "transactionType", label: "Request type" },
      { key: "state", label: "Property state" },
      { key: "city", label: "Property city" },
      { key: "timeline", label: "Timeline" },
      { key: "target_home_price", label: "Purchase price / property value" },
      { key: "existing_loan_balance", label: "Existing loan balance(s)" },
      { key: "loan_term", label: "Requested loan term" },
      { key: "loan_term_other", label: "Other loan term" },
      { key: "credit_range", label: "Credit range" },
      { key: "propertyUse", label: "Property use" },
      { key: "downPaymentMode", label: "Down payment type" },
      { key: "down_payment_percent", label: "Down payment percentage" },
      { key: "down_payment_amount", label: "Down payment amount" },
      { key: "referral_source", label: "Referral source" },
    ],
  },
  {
    title: "Message",
    fields: [{ key: "message", label: "What John should know" }],
  },
  {
    title: "Permissions",
    fields: [
      { key: "consentToContact", label: "Consent to contact" },
    ],
  },
  {
    title: "Marketing attribution",
    fields: [
      { key: "utm_source", label: "UTM source" },
      { key: "utm_medium", label: "UTM medium" },
      { key: "utm_campaign", label: "UTM campaign" },
      { key: "utm_term", label: "UTM term" },
      { key: "utm_content", label: "UTM content" },
    ],
  },
];

const CONTACT_SECTIONS: LeadEmailSection[] = [
  {
    title: "Contact",
    fields: [
      { key: "name", label: "Name" },
      { key: "phone", label: "Phone" },
      { key: "email", label: "Email" },
    ],
  },
  {
    title: "Question",
    fields: [{ key: "message", label: "Message" }],
  },
  {
    title: "Permissions",
    fields: [{ key: "consentToContact", label: "Consent to contact" }],
  },
];

function hasValue(value: unknown) {
  return value !== null && value !== undefined && String(value).trim() !== "";
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function titleCase(value: string) {
  return value
    .replace(/([a-z])([A-Z])/g, (_match, lower: string, upper: string) => `${lower} ${upper}`)
    .replace(/[_-]+/g, " ")
    .replace(/\b\w/g, (letter) => letter.toUpperCase());
}

function validReplyTo(value: unknown) {
  if (!hasValue(value)) return undefined;
  const email = String(value).trim();
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ? email : undefined;
}

function formatPhone(value: string) {
  const digits = value.replace(/\D/g, "");
  const local = digits.length === 11 && digits.startsWith("1") ? digits.slice(1) : digits;
  if (local.length !== 10) return value;
  return `(${local.slice(0, 3)}) ${local.slice(3, 6)}-${local.slice(6)}`;
}

function formatCurrency(value: string) {
  const numeric = Number(value.replace(/[$,\s]/g, ""));
  if (!Number.isFinite(numeric)) return value;
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(numeric);
}

function formatDate(value: unknown) {
  if (!hasValue(value)) return "";
  const date = new Date(String(value));
  if (Number.isNaN(date.getTime())) return String(value);
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
    timeZone: "America/Chicago",
    timeZoneName: "short",
  }).format(date);
}

function formatValue(key: string, value: unknown) {
  const text = String(value).trim();

  if (key === "phone") return formatPhone(text);
  if (key === "target_home_price" || key === "existing_loan_balance" || key === "down_payment_amount") {
    return formatCurrency(text);
  }
  if (key === "down_payment_percent") {
    return text.includes("%") ? text : `${text}%`;
  }
  if (key === "consentToContact") return text === "yes" ? "Yes" : titleCase(text);
  if (key === "marketingOptOut") return text === "yes" ? "Yes — request-specific contact only" : titleCase(text);
  if (["transactionType", "loan_goal", "downPaymentMode"].includes(key)) {
    return titleCase(text);
  }

  return text;
}

function fieldLink(key: string, rawValue: unknown, displayValue: string) {
  if (key === "email") {
    return `<a href="mailto:${escapeHtml(String(rawValue).trim())}" style="color:#121e5b;font-weight:700;text-decoration:underline;">${escapeHtml(displayValue)}</a>`;
  }
  if (key === "phone") {
    const digits = String(rawValue).replace(/\D/g, "");
    const href = digits.length === 10 ? `+1${digits}` : digits;
    return `<a href="tel:${href}" style="color:#121e5b;font-weight:700;text-decoration:underline;">${escapeHtml(displayValue)}</a>`;
  }
  return escapeHtml(displayValue).replaceAll("\n", "<br>");
}

function renderHtmlSection(section: LeadEmailSection, entry: LeadEntry) {
  const rows = section.fields
    .filter(({ key }) => hasValue(entry[key]))
    .map(({ key, label }) => {
      const displayValue = formatValue(key, entry[key]);
      return `<tr>
        <td style="padding:8px 14px 8px 0;color:#657083;font-size:13px;line-height:20px;vertical-align:top;width:190px;">${escapeHtml(label)}</td>
        <td style="padding:8px 0;color:#172033;font-size:14px;line-height:20px;vertical-align:top;">${fieldLink(key, entry[key], displayValue)}</td>
      </tr>`;
    })
    .join("");

  if (!rows) return "";
  return `<section style="padding:22px 28px;border-top:1px solid #e5dcc0;">
    <h2 style="margin:0 0 8px;color:#121e5b;font-size:15px;line-height:22px;text-transform:uppercase;letter-spacing:.08em;">${escapeHtml(section.title)}</h2>
    <table role="presentation" style="border-collapse:collapse;width:100%;">${rows}</table>
  </section>`;
}

function renderTextSection(section: LeadEmailSection, entry: LeadEntry) {
  const lines = section.fields
    .filter(({ key }) => hasValue(entry[key]))
    .map(({ key, label }) => `${label}: ${formatValue(key, entry[key])}`);
  if (!lines.length) return "";
  return `${section.title.toUpperCase()}\n${lines.join("\n")}`;
}

function additionalFields(entry: LeadEntry, sections: LeadEmailSection[]): LeadEmailSection {
  const knownFields = new Set(sections.flatMap((section) => section.fields.map(({ key }) => key)));
  const fields = Object.keys(entry)
    .filter((key) => !SYSTEM_FIELDS.has(key) && !knownFields.has(key) && hasValue(entry[key]))
    .map((key) => ({ key, label: titleCase(key) }));
  return { title: "Additional details", fields };
}

function leadTypeDetails(entry: LeadEntry) {
  const isRateQuote = entry.leadType === "rate_quote";
  return {
    isRateQuote,
    title: isRateQuote ? "New Rate Quote" : "New Website Question",
    sections: isRateQuote ? RATE_QUOTE_SECTIONS : CONTACT_SECTIONS,
  };
}

function buildSubject(entry: LeadEntry) {
  const { isRateQuote, title } = leadTypeDetails(entry);
  const name = hasValue(entry.name) ? String(entry.name).trim() : "Website lead";
  if (!isRateQuote) return `${title}: ${name}`;

  const transaction = hasValue(entry.transactionType)
    ? titleCase(String(entry.transactionType))
    : "Mortgage request";
  const location = hasValue(entry.state) ? ` in ${String(entry.state).trim()}` : "";
  return `${title}: ${name} — ${transaction}${location}`;
}

export function buildLeadEmail(entry: LeadEntry) {
  const { title, sections } = leadTypeDetails(entry);
  const allSections = [...sections, additionalFields(entry, sections)];
  const received = formatDate(entry.receivedAt ?? entry.submittedAt ?? new Date().toISOString());
  const name = hasValue(entry.name) ? String(entry.name).trim() : "A new lead";
  const intro = entry.leadType === "rate_quote"
    ? `${name} submitted a mortgage rate quote request.`
    : `${name} sent a question through Nola Rate.`;

  const textSections = allSections.map((section) => renderTextSection(section, entry)).filter(Boolean);
  const text = [
    `NOLA RATE — ${title.toUpperCase()}`,
    intro,
    `Received: ${received}`,
    ...textSections,
    "Open the Nola Rate lead workflow to record follow-up and status.",
  ].join("\n\n");

  const htmlSections = allSections.map((section) => renderHtmlSection(section, entry)).join("");
  const html = `<!doctype html>
<html lang="en">
  <body style="margin:0;background:#f4f1e8;font-family:Arial,Helvetica,sans-serif;color:#172033;">
    <div style="display:none;max-height:0;overflow:hidden;opacity:0;">${escapeHtml(intro)} Review contact and loan details.</div>
    <table role="presentation" style="border-collapse:collapse;width:100%;background:#f4f1e8;">
      <tr><td align="center" style="padding:28px 12px;">
        <table role="presentation" style="border-collapse:collapse;width:100%;max-width:680px;background:#ffffff;border:1px solid #e5dcc0;border-radius:14px;overflow:hidden;box-shadow:0 8px 28px rgba(18,30,91,.08);">
          <tr><td style="background:#121e5b;padding:26px 28px;border-bottom:5px solid #ffd534;">
            <p style="margin:0 0 7px;color:#ffd534;font-size:12px;font-weight:700;letter-spacing:.14em;text-transform:uppercase;">Nola Rate Lead Alert</p>
            <h1 style="margin:0;color:#ffffff;font-size:25px;line-height:32px;">${escapeHtml(title)}</h1>
          </td></tr>
          <tr><td style="padding:24px 28px;">
            <p style="margin:0 0 6px;color:#172033;font-size:17px;line-height:26px;font-weight:700;">${escapeHtml(intro)}</p>
            <p style="margin:0;color:#657083;font-size:13px;line-height:20px;">Received ${escapeHtml(received)}</p>
          </td></tr>
          <tr><td>${htmlSections}</td></tr>
          <tr><td style="padding:20px 28px;background:#fffdf3;border-top:1px solid #e5dcc0;color:#657083;font-size:12px;line-height:18px;">
            This notification was generated by the Nola Rate website. Replying to this email will reply to the lead when a valid email address was provided.
          </td></tr>
        </table>
      </td></tr>
    </table>
  </body>
</html>`;

  return {
    subject: buildSubject(entry),
    text,
    html,
    replyTo: validReplyTo(entry.email),
  };
}
