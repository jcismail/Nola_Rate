"use client";

import Image from "next/image";
import SiteHeader from "@/components/site/SiteHeader";
import { applicationUrl } from "@/lib/application";

const trustItems = [
  "Friendly, one-on-one mortgage guidance built around your family goals",
  "Clear options and honest advice so you can choose with confidence",
  "Fast initial qualification support to help your family move forward",
  "Local support for Louisiana and Mississippi buyers at every step",
];

const financingOptions = [
  {
    title: "Conventional Loans",
    description:
      "Flexible and widely available, conventional loans offer competitive rates and terms for buyers with good credit and stable income.",
    href: "/solutions/conventional-loans",
    icon: "💵",
  },
  {
    title: "FHA Loans",
    description:
      "Designed for first-time buyers and those with lower down payments, FHA loans offer easier qualification and government-backed security.",
    href: "/solutions/fha-loans",
    icon: "💸",
  },
  {
    title: "VA Loans",
    description:
      "Exclusive to veterans and active-duty military, VA loans provide options and competitive rates with no private mortgage insurance (PMI).",
    href: "/solutions/va-loans",
    icon: "🏳️",
  },
  {
    title: "Jumbo Loans",
    description:
      "Higher loan amount options for buyers purchasing homes above standard conforming loan limits.",
    href: "/solutions/jumbo-loans",
    icon: "J",
  },
  {
    title: "Investor Loans",
    description:
      "Financing guidance for rental properties, real estate investors, and portfolio growth strategies.",
    href: "/solutions/investor-loans",
    icon: "I",
  },
  {
    title: "Down Payment Assistance",
    description:
      "Program options that may help qualified buyers reduce upfront cash needed to purchase a home.",
    href: "/solutions/down-payment-assistance",
    icon: "D",
  },
  {
    title: "Low FICO Score",
    description:
      "We offer loan options for buyers with lower credit scores, helping you achieve homeownership with flexible requirements.",
    href: "/solutions/low-credit-options",
    icon: "📊",
  },
  {
    title: "Stated Income",
    description:
      "Self-employed or have non-traditional income? Stated income loans provide flexible financing without extensive income verification.",
    href: "/solutions/outside-the-box-programs",
    icon: "🪪",
  },
  {
    title: "And More!",
    description:
      "We have solutions tailored to your unique needs. Contact us to explore your best financing options!",
    href: "/solutions/zero-down-programs",
    icon: "👍",
  },
];

const serviceAreas = [
  {
    title: "Texas",
    href: "/texas",
    image:
      "https://images.unsplash.com/photo-1666969565832-b55bf42a900d?auto=format&fit=crop&q=80&w=900",
    imageAlt: "Austin, Texas skyline at sunset",
    credit: "Justin Wallace on Unsplash",
    creditHref:
      "https://unsplash.com/photos/eine-skyline-der-stadt-bei-sonnenuntergang-cB_LQ6NGkq4",
    description:
      "Plano roots, statewide guidance, and mortgage support for buyers, homeowners, and investors.",
  },
  {
    title: "Louisiana",
    href: "/solutions/louisiana-mortgage-broker",
    image:
      "https://images.unsplash.com/photo-1748272041292-853251602432?auto=format&fit=crop&q=80&w=900",
    imageAlt: "Bourbon Street in New Orleans, Louisiana",
    credit: "Alain Pierre-Lys on Unsplash",
    creditHref:
      "https://unsplash.com/photos/people-walk-down-a-sunlit-urban-street-L4k4NXohgoc",
    description:
      "Based in New Orleans with clear mortgage guidance for Louisiana purchase and refinance goals.",
  },
  {
    title: "Mississippi",
    href: "/mississippi",
    image:
      "https://images.unsplash.com/photo-1621302879828-a43aea3cb9fa?auto=format&fit=crop&q=80&w=900",
    imageAlt: "Bridge over the Mississippi River near Vicksburg, Mississippi",
    credit: "Justin Wilkens on Unsplash",
    creditHref:
      "https://unsplash.com/photos/gray-bridge-over-body-of-water-during-daytime-TcqGcfPnbTI",
    description:
      "Licensed Mississippi support for families comparing loan programs and next-step options.",
  },
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
    <div className="min-h-screen bg-[radial-gradient(circle_at_15%_20%,#ffffff_0%,#f1e7ba_37%,#f7f6ef_80%)]">
      <main className="mx-auto max-w-6xl px-6 py-10 md:px-8 md:py-14">
        <SiteHeader />

        <section className="overflow-hidden rounded-3xl border border-[#ffd534]/40 bg-[linear-gradient(130deg,#081244_0%,#121e5b_68%,#2b3672_100%)] p-7 text-white shadow-xl shadow-[#121e5b]/20 md:p-10">
          <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
            <div className="space-y-5">
              <p className="inline-flex rounded-full border border-white/40 bg-white/10 px-3 py-1 text-xs tracking-wide uppercase">
                Louisiana & Mississippi Expansion Demo
              </p>
              <h1 className="text-3xl font-bold leading-tight md:text-5xl">
                Mortgage Guidance That Feels Personal, Clear, and Family-First
              </h1>
              <p className="max-w-2xl text-base text-white/88 md:text-lg">
                John takes time to understand your goals, explain your options in plain language,
                and help your household choose the right path to homeownership.
              </p>
              <p className="max-w-2xl text-sm font-semibold uppercase tracking-wide text-white/80">
                Based in New Orleans, helping customers throughout Texas, Louisiana, and Mississippi.
              </p>
              <div className="flex flex-wrap gap-3">
                <a href={applicationUrl} onClick={() => trackEvent("cta_click", { cta: "hero_apply_now" })} target="_blank" rel="noopener noreferrer" className="rounded-full border border-white/50 px-5 py-3 text-sm font-semibold text-white hover:bg-white hover:text-[#121e5b]">Apply Now</a>
                <a href="/rate-quote" onClick={() => trackEvent("cta_click", { cta: "hero_rate_quote" })} className="rounded-full border border-white/50 px-5 py-3 text-sm font-semibold text-white hover:bg-white hover:text-[#121e5b]">Request Rate Quote</a>
                <a href="/mortgage-calculator" onClick={() => trackEvent("cta_click", { cta: "hero_mortgage_calculator" })} className="rounded-full border border-white/50 px-5 py-3 text-sm font-semibold text-white hover:bg-white hover:text-[#121e5b]">Mortgage Calculator</a>
              </div>
            </div>
            <div className="space-y-4">
              <div className="overflow-hidden rounded-2xl border border-white/30 bg-white/12 backdrop-blur-sm">
                <Image src="/brand/john_america_fade.png" alt="John Ismail" width={1200} height={800} className="h-64 w-full object-cover object-[74%_center]" />
              </div>
              <div className="rounded-2xl bg-white/14 p-5 backdrop-blur-sm">
                <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-[#ffd534]">Why Choose John</h2>
                <ul className="space-y-2 text-sm leading-relaxed text-white/95">{trustItems.map((item) => <li key={item}>{item}</li>)}</ul>
              </div>
            </div>
          </div>
        </section>

        <section className="mt-9 overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-[#e5dcc0]">
          <div className="grid gap-0 lg:grid-cols-[0.75fr_1.25fr]">
            <div className="bg-[#121e5b] p-6 text-white md:p-8">
              <p className="text-xs font-semibold uppercase tracking-wide text-[#ffd534]">
                About John
              </p>
              <h2 className="mt-3 text-3xl font-bold leading-tight md:text-4xl">
                Experienced mortgage guidance with roots in Texas and New Orleans.
              </h2>
              <div className="mt-6 grid gap-3 text-sm font-semibold text-white/95 sm:grid-cols-2 lg:grid-cols-1">
                <span className="bg-white/10 px-4 py-3">20+ years in mortgage lending</span>
                <span className="bg-white/10 px-4 py-3">UT Dallas Bachelors and MBA</span>
                <span className="bg-white/10 px-4 py-3">Licensed in TX, LA, and MS</span>
              </div>
            </div>
            <div className="p-6 md:p-8">
              <div className="space-y-4 text-base leading-8 text-[#4c5265]">
                <p>
                  Raised in Plano, Texas, John earned both his Bachelor&apos;s degree and MBA
                  from the University of Texas at Dallas. With more than 20 years of mortgage
                  industry experience, he brings deep expertise across Conventional, FHA, VA,
                  USDA, Jumbo, Non-QM, and investor financing programs.
                </p>
                <p>
                  John currently resides in New Orleans and maintains a secondary home in Plano,
                  Texas. He is licensed and proud to serve customers in Texas, Louisiana, and
                  Mississippi.
                </p>
                <p>
                  His mission is simple: to be your trusted mortgage consultant. John is committed
                  to guiding you through the process with clarity, dedication, and a relentless
                  focus on your long-term success.
                </p>
              </div>
              <div className="mt-6 rounded-xl border border-[#e2d6b5] bg-[#fffdf3] p-5">
                <h3 className="text-lg font-bold text-[#121e5b]">Languages John can help with</h3>
                <p className="mt-2 text-[#4c5265]">
                  John is comfortable helping customers who speak Hindi, Urdu, Gujarati,
                  Spanish, and Portuguese.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="mt-9 rounded-2xl bg-white p-6 shadow-sm ring-1 ring-[#e5dcc0] md:p-8">
          <div className="mb-8 rounded-2xl bg-[#121e5b] p-6 text-white md:flex md:items-center md:justify-between md:gap-6">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-[#ffd534]">
                Custom Rate Review
              </p>
              <h2 className="mt-2 text-3xl font-bold">
                Get a quote built around your purchase or refinance goals.
              </h2>
              <p className="mt-2 max-w-3xl text-white/80">
                Complete a detailed quote request so John can review the right loan path,
                estimated payment, timing, and next steps.
              </p>
            </div>
            <a
              href="/rate-quote"
              onClick={() => trackEvent("cta_click", { cta: "home_rate_quote_band" })}
              className="mt-5 inline-flex rounded-lg bg-white px-5 py-3 text-sm font-semibold text-[#121e5b] hover:bg-[#fff5c7] md:mt-0"
            >
              Request Rate Quote
            </a>
          </div>
          <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-[#b27b00]">
                Service Areas
              </p>
              <h2 className="mt-2 text-3xl font-bold text-[#121e5b]">
                Based in New Orleans. Serving Texas, Louisiana, and Mississippi.
              </h2>
            </div>
            <a
              href="/contact"
              className="inline-flex rounded-lg bg-[#121e5b] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#081244]"
            >
              Ask About Your State
            </a>
          </div>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {serviceAreas.map((area) => (
              <article key={area.title} className="overflow-hidden rounded-2xl border border-[#e2d6b5] bg-[#fffdf3]">
                <a href={area.href} className="block hover:bg-[#fff5c7]">
                  <Image
                    src={area.image}
                    alt={area.imageAlt}
                    width={900}
                    height={620}
                    className="h-44 w-full object-cover"
                  />
                  <div className="p-5">
                    <h3 className="text-2xl font-bold text-[#121e5b]">{area.title}</h3>
                    <p className="mt-2 leading-7 text-[#4c5265]">{area.description}</p>
                    <p className="mt-4 text-xs text-[#5f6270]">
                      Photo:{" "}
                      <span className="underline">{area.credit}</span>
                    </p>
                  </div>
                </a>
              </article>
            ))}
          </div>
        </section>

        <section className="mt-9 rounded-2xl bg-white p-6 shadow-sm md:p-8">
          <h2 className="text-center text-3xl font-bold text-[#121e5b] md:text-5xl">
            There are a lot of financing options - let&apos;s find the right one for you.
          </h2>
          <p className="mx-auto mt-3 max-w-4xl text-center text-lg text-[#5f6270] md:text-2xl">
            Whether you are looking to buy, refinance, or grow your real estate portfolio,
            we&apos;ve got you covered with the right loan products to fit your needs.
          </p>

          <div className="mt-8 grid gap-x-8 gap-y-8 md:grid-cols-2 xl:grid-cols-3">
            {financingOptions.map((option) => (
              <article key={option.title} className="rounded-2xl border border-[#e5dcc0] bg-white p-5 shadow-sm">
                <div className="flex items-start gap-3">
                  <span className="mt-0.5 inline-grid h-10 w-10 place-items-center rounded-full bg-[#fff5c7] text-xl leading-none text-[#121e5b]">
                    {option.icon}
                  </span>
                  <div>
                    <h3 className="text-2xl font-bold leading-tight text-[#121e5b]">{option.title}</h3>
                    <p className="mt-2 text-base leading-8 text-[#5f6270]">{option.description}</p>
                  </div>
                </div>
                <a
                  href={option.href}
                  className="mt-5 inline-block rounded-lg bg-[#121e5b] px-5 py-2.5 text-base font-semibold text-white hover:bg-[#081244]"
                >
                  Learn More
                </a>
              </article>
            ))}
          </div>
        </section>

        <section className="mt-9 grid gap-4 sm:grid-cols-2">
          <a href="/review-us" className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-[#e5dcc0]">
            <h3 className="text-xl font-bold text-[#172033]">Review Us</h3>
            <p className="mt-1 text-[#4c5265]">Help local buyers find a trusted mortgage advisor.</p>
          </a>
          <a href="/contact" className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-[#e5dcc0]">
            <h3 className="text-xl font-bold text-[#172033]">Contact</h3>
            <p className="mt-1 text-[#4c5265]">Call, text, or send your scenario for next-step guidance.</p>
          </a>
        </section>


      </main>
    </div>
  );
}
