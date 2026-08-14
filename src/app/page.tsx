"use client";

import Image from "next/image";
import Link from "next/link";
import SiteHeader from "@/components/site/SiteHeader";
import { applicationUrl } from "@/lib/application";
import { siteConfig, toTelHref } from "@/lib/siteConfig";

const loanHighlights = [
  { name: "Conventional", description: "Flexible financing for primary homes, second homes, and common purchase or refinance scenarios." },
  { name: "FHA", description: "Government-backed loans that can help buyers with lower down payments and more flexible credit pathways." },
  { name: "VA", description: "Strong purchase power and no PMI for eligible service members, veterans, and surviving spouses." },
  { name: "USDA", description: "Possible zero-down or low-down financing for qualifying rural and suburban buyers." },
  { name: "Jumbo", description: "Higher-loan solutions for homes above standard conforming loan limits." },
  { name: "Investor", description: "Rental and investment property financing built around cash flow, reserves, and portfolio goals." },
  { name: "Non-QM", description: "Alternative documentation options for self-employed borrowers and non-traditional income profiles." },
  { name: "Down Payment Assistance", description: "Programs that may reduce the cash required upfront for qualified home buyers." },
];

export default function Home() {
  function trackEvent(name: string, data?: Record<string, string>) {
    if (typeof window === "undefined") return;
    const eventData = { event: name, ...data };
    (window as Window & { dataLayer?: Record<string, unknown>[] }).dataLayer?.push(
      eventData
    );
  }

  return (
    <div className="min-h-screen bg-[#f7f6ef]">
      <main className="mx-auto max-w-6xl px-6 py-8 md:px-8 md:py-10">
        <SiteHeader />

        <section className="overflow-hidden rounded-3xl bg-[#121e5b] text-white shadow-[0_28px_60px_rgba(18,30,91,0.18)] ring-1 ring-[#d7b249]/60">
          <div className="grid gap-0 lg:grid-cols-[1.08fr_0.92fr]">
            <div className="p-7 md:p-10 lg:p-12">
              <div className="inline-flex items-center gap-3 rounded-full border border-[#d7b249]/70 bg-[#10214a] px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.18em] text-[#f4d36a] shadow-inner shadow-[#f4d36a]/10">
                <Image
                  src="/brand/c2financial-logo.png"
                  alt="C2 Financial Corporation"
                  width={116}
                  height={28}
                  className="h-6 w-auto object-contain"
                />
              </div>
              <p className="mt-6 text-xs font-semibold uppercase tracking-[0.18em] text-[#ffd534]">
                Based in New Orleans. Serving Texas, Louisiana, and Mississippi.
              </p>
              <h1 className="mt-4 max-w-3xl text-4xl font-bold leading-tight md:text-6xl">
                Mortgage guidance designed around your next move.
              </h1>
              <p className="mt-5 max-w-2xl text-lg leading-8 text-white/82">
                John helps buyers, homeowners, and investors compare loan options with
                clarity, confidence, and a more personal path forward.
              </p>
              <p className="mt-3 text-sm font-semibold uppercase tracking-wide text-white/70">
                John Ismail · Mortgage Broker · NMLS #{siteConfig.nmls}
              </p>

              <div className="mt-8 grid w-full max-w-xl gap-3">
                <a
                  href={applicationUrl}
                  onClick={() => trackEvent("cta_click", { cta: "hero_apply_now" })}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex w-full justify-center rounded-2xl bg-[#f4d36a] px-6 py-5 text-lg font-black text-[#121e5b] shadow-[0_18px_32px_rgba(244,211,106,0.28)] transition hover:-translate-y-0.5 hover:bg-[#ffd534]"
                >
                  Apply Now
                </a>
                <Link
                  href="/mortgage-calculator"
                  onClick={() => trackEvent("cta_click", { cta: "hero_calculator" })}
                  className="inline-flex w-full justify-center rounded-2xl border border-white/45 bg-white/8 px-6 py-4 text-base font-bold text-white transition hover:bg-white hover:text-[#121e5b]"
                >
                  Mortgage Calculator
                </Link>
                <Link
                  href="/rate-quote"
                  onClick={() => trackEvent("cta_click", { cta: "hero_rate_quote" })}
                  className="inline-flex w-full justify-center rounded-2xl border border-white/45 bg-white/5 px-6 py-4 text-base font-bold text-white transition hover:bg-white hover:text-[#121e5b]"
                >
                  Request Rate Quote
                </Link>
              </div>
            </div>

            <div className="relative min-h-[360px] bg-[#081244]">
              <Image
                src="/brand/john-headshot-red-tie.jpg"
                alt="John Ismail"
                fill
                preload
                sizes="(min-width: 1024px) 520px, 100vw"
                className="object-cover object-[58%_16%]"
              />
            </div>
          </div>
        </section>

        <section className="mt-8 grid gap-4 md:grid-cols-3">
          <a
            href={applicationUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-[#e5dcc0] transition hover:-translate-y-1 hover:ring-[#121e5b]"
          >
            <h2 className="text-2xl font-bold text-[#121e5b]">Apply Now</h2>
            <p className="mt-3 leading-7 text-[#4c5265]">
              Best when you are ready to share your goals and move toward a full review.
            </p>
          </a>

          <Link
            href="/rate-quote"
            className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-[#e5dcc0] transition hover:-translate-y-1 hover:ring-[#121e5b]"
          >
            <h2 className="text-2xl font-bold text-[#121e5b]">Request Rate Quote</h2>
            <p className="mt-3 leading-7 text-[#4c5265]">
              Share purchase or refinance details, timeline, and property goals to start a more informed conversation.
            </p>
          </Link>

          <Link
            href="/contact"
            className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-[#e5dcc0] transition hover:-translate-y-1 hover:ring-[#121e5b]"
          >
            <h2 className="text-2xl font-bold text-[#121e5b]">Ask A Question</h2>
            <p className="mt-3 leading-7 text-[#4c5265]">
              Use this for quick questions before you are ready to apply or request a detailed quote.
            </p>
          </Link>
        </section>

        <section className="mt-8 overflow-hidden rounded-3xl bg-white shadow-sm ring-1 ring-[#e5dcc0] lg:grid lg:grid-cols-[1.12fr_0.88fr]">
          <div className="relative min-h-[340px] lg:min-h-[470px]">
            <Image
              src="/brand/new-orleans/garden-district-skyline.jpg"
              alt="New Orleans homes with the downtown skyline in the distance"
              fill
              sizes="(min-width: 1024px) 650px, 100vw"
              className="object-cover object-center"
            />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#071833]/90 via-[#071833]/25 to-transparent px-6 pb-6 pt-24 text-white">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#f4d36a]">
                New Orleans, Louisiana
              </p>
            </div>
          </div>
          <div className="flex flex-col justify-center p-7 md:p-10 lg:p-12">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#b27b00]">
              Local roots. Regional reach.
            </p>
            <h2 className="mt-3 text-3xl font-bold leading-tight text-[#121e5b] md:text-4xl">
              Mortgage advice grounded in the place you call home.
            </h2>
            <p className="mt-5 leading-8 text-[#4c5265]">
              From a first home in New Orleans to an investment property across the
              region, John brings more than 20 years of experience to every financing
              conversation.
            </p>
            <div className="mt-7 grid grid-cols-3 gap-2 border-y border-[#e5dcc0] py-5 text-center">
              {[
                ["Louisiana", "Local base"],
                ["Texas", "Longtime roots"],
                ["Mississippi", "Licensed service"],
              ].map(([state, detail]) => (
                <div key={state} className="px-1">
                  <p className="text-sm font-black text-[#121e5b] sm:text-base">{state}</p>
                  <p className="mt-1 text-[10px] font-semibold uppercase tracking-wide text-[#72778a] sm:text-xs">
                    {detail}
                  </p>
                </div>
              ))}
            </div>
            <a
              href="#about-john"
              className="mt-7 inline-flex w-fit items-center gap-2 text-sm font-bold text-[#121e5b] underline decoration-[#d7b249] decoration-2 underline-offset-8"
            >
              Get to know John <span aria-hidden="true">→</span>
            </a>
          </div>
        </section>

        <section id="about-john" className="mt-8 grid scroll-mt-6 gap-6 rounded-2xl bg-white p-6 shadow-sm ring-1 ring-[#e5dcc0] md:grid-cols-[0.85fr_1.15fr] md:p-8">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-[#b27b00]">
              About John
            </p>
            <h2 className="mt-2 text-3xl font-bold leading-tight text-[#121e5b]">
              Experienced mortgage guidance without making the process feel heavy.
            </h2>
          </div>
          <div className="space-y-4 leading-8 text-[#4c5265]">
            <p>
              Recognized as a top mortgage professional in the markets he has served in
              Texas and Louisiana, John and his team strive to earn the opportunity and
              trust of their customers to lead to real estate success.
            </p>
            <p>
              Raised in Plano, Texas, John earned both his Bachelor&apos;s degree and MBA
              from the University of Texas at Dallas. With more than 20 years of mortgage
              industry experience, he brings deep expertise across purchase, refinance,
              and equity strategies for primary residences, second homes, and investors.
            </p>
            <p>
              John and his family are based in New Orleans with a secondary base in Dallas,
              Texas, to be able to serve his customers in Texas. He is licensed and proud to
              serve customers in Texas, Louisiana, and Mississippi.
            </p>
            <p>
              John is comfortable helping customers who speak Hindi, Urdu, Gujarati,
              Spanish, and Portuguese.
            </p>
          </div>
        </section>

        <section id="local-contact" className="mt-8 scroll-mt-6 overflow-hidden rounded-2xl bg-[#0b2142] text-white shadow-sm ring-1 ring-[#d5aa33]/40 md:grid md:grid-cols-[0.82fr_1.18fr]">
          <div className="relative min-h-[320px] bg-[#071833]">
            <Image
              src="/brand/new-orleans/st-charles-streetcar.jpg"
              alt="A St. Charles Avenue streetcar beside New Orleans homes"
              fill
              sizes="(min-width: 768px) 420px, 100vw"
              className="object-cover object-[68%_center]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#071833]/60 via-transparent to-transparent" />
            <p className="absolute bottom-5 left-5 rounded-full border border-white/30 bg-[#071833]/75 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.18em] text-white backdrop-blur-sm">
              Proudly based in New Orleans
            </p>
          </div>
          <div className="border-t-4 border-[#d5aa33] p-6 md:border-l-4 md:border-t-0 md:p-8">
            <p className="text-sm font-semibold uppercase tracking-wide text-[#d5aa33]">
              John Ismail
            </p>
            <h2 className="mt-2 text-3xl font-bold">Mortgage Broker</h2>
            <p className="mt-1 text-white/82">NMLS #{siteConfig.nmls}</p>
            <div className="mt-6 grid gap-3 text-lg">
              <a href={toTelHref(siteConfig.newOrleansPhone)} className="hover:text-[#ffd534]">
                {siteConfig.newOrleansPhone}
              </a>
              <a href={toTelHref(siteConfig.contactPhone)} className="hover:text-[#ffd534]">
                {siteConfig.contactPhone}
              </a>
              <a href={`mailto:${siteConfig.contactEmail}`} className="hover:text-[#ffd534]">
                {siteConfig.contactEmail}
              </a>
              <span>{siteConfig.siteUrl}</span>
            </div>
          </div>
        </section>

        <section className="mt-8 rounded-2xl bg-white p-6 shadow-sm ring-1 ring-[#e5dcc0] md:p-8">
          <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-[#b27b00]">
                Loan Options
              </p>
              <h2 className="mt-2 text-3xl font-bold text-[#121e5b]">
                Plenty of options, one simple starting point.
              </h2>
              <p className="mt-2 max-w-3xl leading-7 text-[#4c5265]">
                The detailed quote form gives John enough context to identify the right
                path before the conversation starts.
              </p>
            </div>
            <Link
              href="/rate-quote"
              className="inline-flex justify-center rounded-xl bg-[#121e5b] px-5 py-3 text-sm font-bold text-white hover:bg-[#081244]"
            >
              Start Quote Request
            </Link>
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {loanHighlights.map((item) => (
              <div
                key={item.name}
                className="rounded-2xl border border-[#e2d6b5] bg-[#fffdf3] p-4 shadow-sm"
              >
                <h3 className="text-lg font-bold text-[#121e5b]">{item.name}</h3>
                <p className="mt-2 text-sm leading-6 text-[#4c5265]">{item.description}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="new-orleans-homes" className="mt-8 scroll-mt-6 overflow-hidden rounded-3xl bg-[#eee8d7] ring-1 ring-[#d9cfb2] lg:grid lg:grid-cols-[0.78fr_1.22fr]">
          <div className="flex flex-col justify-center p-7 md:p-10 lg:p-12">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#9a6a00]">
              Homes with character
            </p>
            <h2 className="mt-3 text-3xl font-bold leading-tight text-[#121e5b] md:text-4xl">
              Every home has a story. Your financing should fit yours.
            </h2>
            <p className="mt-5 leading-8 text-[#4c5265]">
              Whether the property is classic, colorful, or completely new, the right
              loan starts with understanding your goals—not forcing them into a template.
            </p>
            <Link
              href="/rate-quote"
              className="mt-7 inline-flex w-fit justify-center rounded-xl bg-[#121e5b] px-5 py-3 text-sm font-bold text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-[#081244]"
            >
              Explore Your Options
            </Link>
          </div>
          <div className="grid min-h-[430px] grid-cols-2 gap-1 bg-[#d9cfb2] sm:min-h-[520px]">
            <div className="relative">
              <Image
                src="/brand/new-orleans/classic-shotgun-home.jpg"
                alt="A classic New Orleans shotgun home with an ornate front porch"
                fill
                sizes="(min-width: 1024px) 340px, 50vw"
                className="object-cover object-center"
              />
            </div>
            <div className="relative">
              <Image
                src="/brand/new-orleans/colorful-new-orleans-home.jpg"
                alt="Colorful New Orleans homes with traditional shutters and porches"
                fill
                sizes="(min-width: 1024px) 340px, 50vw"
                className="object-cover object-[62%_center]"
              />
            </div>
          </div>
        </section>

        <section className="mt-8 grid gap-4 sm:grid-cols-2">
          <a
            href={toTelHref(siteConfig.contactPhone)}
            className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-[#e5dcc0]"
          >
            <h3 className="text-xl font-bold text-[#172033]">Call Or Text</h3>
            <p className="mt-1 text-[#4c5265]">
              {siteConfig.newOrleansPhone} · {siteConfig.contactPhone}
            </p>
          </a>
          <Link
            href="/contact"
            className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-[#e5dcc0]"
          >
            <h3 className="text-xl font-bold text-[#172033]">Questions</h3>
            <p className="mt-1 text-[#4c5265]">
              Send a quick message if you are not ready for a full quote request.
            </p>
          </Link>
        </section>
      </main>
    </div>
  );
}
