import Link from "next/link";
import SiteHeader from "@/components/site/SiteHeader";

export default function ReviewUsPage() {
  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_15%_20%,#ffffff_0%,#dbe8fb_37%,#f6f7fb_80%)]">
    <main className="mx-auto max-w-6xl px-6 py-10 md:px-8 md:py-14">
      <SiteHeader />
      <section className="rounded-2xl bg-white p-8 shadow-sm ring-1 ring-[#e6eefb]">
        <h1 className="text-4xl font-bold text-[#172033]">Review Us</h1>
        <p className="mt-3 text-lg text-[#43506b]">
          Your feedback helps families in Louisiana and Mississippi find a trusted local mortgage guide.
        </p>
        <a
          href="/contact"
          className="mt-6 inline-block rounded-lg bg-[#1f6dd8] px-5 py-3 font-semibold text-white hover:bg-[#195ebd]"
        >
          Request Review Link
        </a>
        <p className="mt-4 text-sm text-[#5d6d86]">
          John&apos;s direct Google review URL will be added after final onboarding.
        </p>
        <Link href="/" className="mt-6 inline-block text-sm font-semibold text-[#1f6dd8] underline">
          Back to Homepage
        </Link>
      </section>
    </main>
    </div>
  );
}
