import Link from "next/link";
import SiteHeader from "@/components/site/SiteHeader";

const messages: Record<string, { title: string; next: string }> = {
  rate_quote: {
    title: "Your Rate Quote Request Is In",
    next: "John will review your details and follow up with next steps.",
  },
  strategy_call: {
    title: "Your Call Request Is In",
    next: "John will reach out to coordinate your 15-minute consultation window.",
  },
  start_application: {
    title: "Your Application Request Is In",
    next: "A follow-up will include the next checklist items and document workflow.",
  },
  lead_magnet: {
    title: "Your Guide Request Is In",
    next: "John’s team will send the requested resource and recommended next steps.",
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
    <div className="min-h-screen bg-[radial-gradient(circle_at_15%_20%,#ffffff_0%,#dbe8fb_37%,#f6f7fb_80%)]">
    <main className="mx-auto max-w-6xl px-6 py-10 md:px-8 md:py-14">
      <SiteHeader />
      <section className="rounded-2xl bg-white p-8 shadow-sm ring-1 ring-[#e6eefb]">
        <p className="text-xs font-semibold uppercase tracking-wide text-[#1f6dd8]">
          Gulf Rate Demo
        </p>
        <h1 className="mt-2 text-4xl font-bold text-[#172033]">{content.title}</h1>
        <p className="mt-3 text-lg text-[#43506b]">{content.next}</p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            href="/"
            className="rounded-lg bg-[#1f6dd8] px-5 py-2.5 font-semibold text-white hover:bg-[#195ebd]"
          >
            Back To Homepage
          </Link>
          <Link
            href="/book-call"
            className="rounded-lg border border-[#c9d9f6] px-5 py-2.5 font-semibold text-[#12345a] hover:bg-[#f8fbff]"
          >
            Book A Call
          </Link>
        </div>
      </section>
    </main>
    </div>
  );
}
