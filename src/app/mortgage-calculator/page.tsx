import type { Metadata } from "next";
import MortgageCalculator from "@/components/site/MortgageCalculator";
import SiteHeader from "@/components/site/SiteHeader";

export const metadata: Metadata = {
  title: "Mortgage Calculator | Nola Rate Mortgage Advisory",
  description:
    "Estimate a monthly mortgage payment and request a rate quote from Nola Rate Mortgage Advisory.",
};

export default function MortgageCalculatorPage() {
  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_15%_20%,#ffffff_0%,#f1e7ba_37%,#f7f6ef_80%)]">
      <main className="mx-auto max-w-6xl px-6 py-10 md:px-8 md:py-14">
        <SiteHeader />
        <section className="mb-9 rounded-3xl border border-[#ffd534]/40 bg-[linear-gradient(130deg,#081244_0%,#121e5b_68%,#2b3672_100%)] p-7 text-white shadow-xl shadow-[#121e5b]/20 md:p-10">
          <p className="inline-flex rounded-full border border-white/40 bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide">
            Mortgage Calculator
          </p>
          <h1 className="mt-5 max-w-4xl text-4xl font-bold leading-tight md:text-6xl">
            Estimate your monthly mortgage payment.
          </h1>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-white/88">
            Run a quick payment estimate, then request a rate quote or start the application when you are ready.
          </p>
        </section>
        <MortgageCalculator />
      </main>
    </div>
  );
}
