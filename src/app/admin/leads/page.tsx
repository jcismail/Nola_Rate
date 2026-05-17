import { readFile } from "node:fs/promises";
import path from "node:path";
import { getSupabaseAdminClient, isSupabaseLeadsEnabled } from "@/lib/supabaseAdmin";

type LeadRecord = {
  id?: string;
  leadType?: string;
  name?: string;
  email?: string;
  phone?: string;
  submittedAt?: string;
  receivedAt?: string;
  [key: string]: unknown;
};

type BorrowerRow = {
  id: string;
  full_name: string | null;
  email: string;
  phone: string | null;
  created_at: string;
};

type LoanApplicationRow = {
  borrower_id: string;
  loan_type: string | null;
  created_at: string;
};

async function loadLeads(): Promise<LeadRecord[]> {
  const file = path.join(process.cwd(), "data", "leads.jsonl");
  try {
    const raw = await readFile(file, "utf8");
    const lines = raw.split("\n").filter(Boolean);
    return lines
      .map((line) => {
        try {
          return JSON.parse(line) as LeadRecord;
        } catch {
          return null;
        }
      })
      .filter((x): x is LeadRecord => x !== null)
      .reverse()
      .slice(0, 25);
  } catch {
    return [];
  }
}

async function loadSupabaseLeads(): Promise<LeadRecord[]> {
  if (!isSupabaseLeadsEnabled()) return [];
  const supabase = getSupabaseAdminClient();
  if (!supabase) return [];

  const borrowersResult = await supabase
    .from("borrowers")
    .select("id, full_name, email, phone, created_at")
    .order("created_at", { ascending: false })
    .limit(50);

  if (borrowersResult.error || !borrowersResult.data) {
    return [];
  }

  const borrowers = borrowersResult.data as BorrowerRow[];
  if (borrowers.length === 0) return [];

  const borrowerIds = borrowers.map((b) => b.id);
  const applicationsResult = await supabase
    .from("loan_applications")
    .select("borrower_id, loan_type, created_at")
    .in("borrower_id", borrowerIds)
    .order("created_at", { ascending: false });

  const applicationByBorrower = new Map<string, LoanApplicationRow>();
  if (!applicationsResult.error && applicationsResult.data) {
    for (const row of applicationsResult.data as LoanApplicationRow[]) {
      if (!applicationByBorrower.has(row.borrower_id)) {
        applicationByBorrower.set(row.borrower_id, row);
      }
    }
  }

  return borrowers.map((borrower) => {
    const app = applicationByBorrower.get(borrower.id);
    return {
      id: borrower.id,
      leadType: app?.loan_type ?? "",
      name: borrower.full_name ?? "",
      email: borrower.email,
      phone: borrower.phone ?? "",
      receivedAt: borrower.created_at,
    };
  });
}

export default async function AdminLeadsPage() {
  if (process.env.NODE_ENV === "production") {
    return (
      <main className="mx-auto min-h-screen max-w-4xl px-6 py-12 md:px-8">
        <section className="rounded-xl bg-white p-6 shadow-sm ring-1 ring-[#e6eefb]">
          <h1 className="text-2xl font-bold text-[#172033]">Admin Leads</h1>
          <p className="mt-2 text-[#43506b]">
            This page is disabled in production.
          </p>
        </section>
      </main>
    );
  }

  const supabaseLeads = await loadSupabaseLeads();
  const leads = supabaseLeads.length > 0 ? supabaseLeads : await loadLeads();
  const sourceLabel = supabaseLeads.length > 0 ? "Supabase" : "Local lead log";

  return (
    <main className="mx-auto min-h-screen max-w-6xl px-6 py-12 md:px-8">
      <section className="rounded-xl bg-white p-6 shadow-sm ring-1 ring-[#e6eefb]">
        <h1 className="text-3xl font-bold text-[#172033]">Lead Health</h1>
        <p className="mt-2 text-[#43506b]">
          Showing latest {leads.length} submissions from {sourceLabel}.
        </p>
        <div className="mt-5 overflow-auto">
          <table className="min-w-full border-collapse text-left text-sm">
            <thead>
              <tr className="border-b border-[#e4e9f5] text-[#172033]">
                <th className="px-3 py-2">Received</th>
                <th className="px-3 py-2">Type</th>
                <th className="px-3 py-2">Name</th>
                <th className="px-3 py-2">Email</th>
                <th className="px-3 py-2">Phone</th>
              </tr>
            </thead>
            <tbody>
              {leads.map((lead, i) => (
                <tr key={`${lead.receivedAt ?? "n/a"}-${i}`} className="border-b border-[#eef2fa]">
                  <td className="px-3 py-2 text-[#43506b]">{String(lead.receivedAt ?? "")}</td>
                  <td className="px-3 py-2 text-[#172033]">{String(lead.leadType ?? "")}</td>
                  <td className="px-3 py-2 text-[#172033]">{String(lead.name ?? "")}</td>
                  <td className="px-3 py-2 text-[#172033]">{String(lead.email ?? "")}</td>
                  <td className="px-3 py-2 text-[#172033]">{String(lead.phone ?? "")}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {leads.length === 0 && (
            <p className="mt-4 text-sm text-[#5d6d86]">No leads logged yet.</p>
          )}
        </div>
      </section>
    </main>
  );
}
