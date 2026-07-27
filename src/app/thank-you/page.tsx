import Link from "next/link";
import SiteHeader from "@/components/site/SiteHeader";
import { applicationUrl } from "@/lib/application";

const messages: Record<string, { title: string; next: string }> = {
  rate_quote: {
    title: "Your Rate Quote Request Is In",
    next: "John will review your details and follow up with next steps.",
  },
  start_application: {
    title: "Your Application Request Is In",
    next: "A follow-up will include the next checklist items and document workflow.",
  },
};

export default async function ThankYouPage({
  searchParams,
}: {
  searchParams: Promise<{ type?: string }>;
}) {
  const { type = "" } = await searchParams;
  const content = messages[type] ?? {
    title: "Thank You",
    next: "Your request was received.",
  };

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_15%_20%,#ffffff_0%,#f1e7ba_37%,#f7f6ef_80%)]">
      <main className="mx-auto max-w-6xl px-6 py-10 md:px-8 md:py-14">
        <SiteHeader />
        <section className="rounded-2xl bg-white p-8 shadow-sm ring-1 ring-[#e5dcc0]">
          <p className="text-xs font-semibold uppercase tracking-wide text-[#b27b00]">
            Nola Rate Demo
          </p>
          <h1 className="mt-2 text-4xl font-bold text-[#172033]">
            {content.title}
          </h1>
          <p className="mt-3 text-lg text-[#4c5265]">{content.next}</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/"
              className="rounded-lg bg-[#121e5b] px-5 py-2.5 font-semibold text-white hover:bg-[#081244]"
            >
              Back To Homepage
            </Link>
            <Link
              href="/contact"
              className="rounded-lg border border-[#e2d6b5] px-5 py-2.5 font-semibold text-[#121e5b] hover:bg-[#fffdf3]"
            >
              Contact John
            </Link>
            <a
              href={applicationUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg border border-[#e2d6b5] px-5 py-2.5 font-semibold text-[#121e5b] hover:bg-[#fffdf3]"
            >
              Apply Now
            </a>
          </div>
        </section>
      </main>
    </div>
  );
}
