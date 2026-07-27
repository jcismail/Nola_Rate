import Link from "next/link";
import SiteHeader from "@/components/site/SiteHeader";
import { siteConfig } from "@/lib/siteConfig";

export default function ReviewUsPage() {
  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_15%_20%,#ffffff_0%,#f1e7ba_37%,#f7f6ef_80%)]">
    <main className="mx-auto max-w-6xl px-6 py-10 md:px-8 md:py-14">
      <SiteHeader />
      <section className="rounded-2xl bg-white p-8 shadow-sm ring-1 ring-[#e5dcc0]">
        <h1 className="text-4xl font-bold text-[#172033]">Review Us</h1>
        <p className="mt-3 text-lg text-[#4c5265]">
          Your feedback helps families in Louisiana and Mississippi find a trusted local mortgage guide.
        </p>
        <a
          href={siteConfig.reviewUrl}
          className="mt-6 inline-block rounded-lg bg-[#121e5b] px-5 py-3 font-semibold text-white hover:bg-[#081244]"
        >
          Request Review Link
        </a>
        <p className="mt-4 text-sm text-[#5f6270]">
          John&apos;s direct Google review URL will be added after final onboarding.
        </p>
        <Link href="/" className="mt-6 inline-block text-sm font-semibold text-[#b27b00] underline">
          Back to Homepage
        </Link>
      </section>
    </main>
    </div>
  );
}
