import type { Metadata } from "next";
import Image from "next/image";
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
        <section className="mb-9 overflow-hidden rounded-3xl border border-[#ffd534]/40 bg-[#121e5b] text-white shadow-xl shadow-[#121e5b]/20 lg:grid lg:grid-cols-[1.02fr_0.98fr]">
          <div className="flex flex-col justify-center bg-[linear-gradient(130deg,#081244_0%,#121e5b_68%,#2b3672_100%)] p-7 md:p-10 lg:p-12">
            <p className="inline-flex w-fit rounded-full border border-white/40 bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide">
              Mortgage Calculator
            </p>
            <h1 className="mt-5 max-w-4xl text-4xl font-bold leading-tight md:text-6xl">
              Estimate your monthly mortgage payment.
            </h1>
            <p className="mt-5 max-w-3xl text-lg leading-8 text-white/88">
              Run a quick payment estimate, then request a rate quote or start the
              application when you are ready.
            </p>
          </div>
          <div className="relative min-h-[300px] lg:min-h-[460px]">
            <Image
              src="/brand/new-orleans/historic-new-orleans-homes.jpg"
              alt="Colorful historic homes on a New Orleans neighborhood street"
              fill
              preload
              sizes="(min-width: 1024px) 550px, 100vw"
              className="object-cover object-[68%_center]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#081244]/55 via-transparent to-transparent" />
            <p className="absolute bottom-5 left-5 rounded-full border border-white/30 bg-[#081244]/75 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.18em] backdrop-blur-sm">
              Plan for the home ahead
            </p>
          </div>
        </section>
        <MortgageCalculator />
      </main>
    </div>
  );
}
