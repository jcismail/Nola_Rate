"use client";

import Image from "next/image";
import { FormEvent, useMemo, useState } from "react";
import { useRouter } from "next/navigation";

type FormState = "idle" | "submitting" | "success" | "error";

const calendlyUrl =
  process.env.NEXT_PUBLIC_CALENDLY_URL?.trim() || "/book-call";

const trustItems = [
  "Local broker strategy, not one-size-fits-all bank scripts",
  "Shops multiple lenders to find the right loan structure",
  "Fast pre-approval support to help offers win",
  "Guidance designed for Louisiana and Mississippi buyers",
];

const seoPages = [
  { href: "/solutions/conventional-loans", label: "Conventional Loans" },
  { href: "/solutions/first-time-home-buyer", label: "First-Time Home Buyer" },
  { href: "/solutions/fha-loans", label: "FHA Loans" },
  { href: "/solutions/va-loans", label: "VA Loans" },
  { href: "/solutions/zero-down-programs", label: "Zero Down Programs" },
  { href: "/solutions/outside-the-box-programs", label: "Outside-the-Box Programs" },
  { href: "/solutions/self-employed-mortgage", label: "Self-Employed Options" },
  { href: "/solutions/low-credit-options", label: "Low Credit Options" },
  { href: "/solutions/louisiana-mortgage-broker", label: "Louisiana Mortgage Broker" },
  { href: "/solutions/mississippi-mortgage-broker", label: "Mississippi Mortgage Broker" },
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

export default function Home() {
  const router = useRouter();
  const [quoteState, setQuoteState] = useState<FormState>("idle");
  const [callState, setCallState] = useState<FormState>("idle");
  const [appState, setAppState] = useState<FormState>("idle");
  const [magnetState, setMagnetState] = useState<FormState>("idle");
  const [formError, setFormError] = useState("");

  const utm = useMemo(() => {
    if (typeof window === "undefined") return {};
    const params = new URLSearchParams(window.location.search);
    return {
      utm_source: params.get("utm_source") ?? "",
      utm_medium: params.get("utm_medium") ?? "",
      utm_campaign: params.get("utm_campaign") ?? "",
      utm_term: params.get("utm_term") ?? "",
      utm_content: params.get("utm_content") ?? "",
    };
  }, []);

  async function submitLead(
    event: FormEvent<HTMLFormElement>,
    leadType: "rate_quote" | "strategy_call" | "start_application" | "lead_magnet",
    setState: (state: FormState) => void
  ) {
    event.preventDefault();
    setFormError("");
    setState("submitting");

    const formData = new FormData(event.currentTarget);
    const payload = {
      leadType,
      page: "/",
      submittedAt: new Date().toISOString(),
      ...Object.fromEntries(formData.entries()),
      ...utm,
    };

    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const body = (await res.json().catch(() => ({}))) as { error?: string };
        throw new Error(body.error || "submit failed");
      }
      setState("success");
      event.currentTarget.reset();
      router.push(`/thank-you?type=${leadType}`);
    } catch (error) {
      setFormError(error instanceof Error ? error.message : "Submission failed. Please try again.");
      setState("error");
    }
  }

  function trackEvent(name: string, data?: Record<string, string>) {
    if (typeof window === "undefined") return;
    const eventData = { event: name, ...data };
    (window as Window & { dataLayer?: Record<string, unknown>[] }).dataLayer?.push(
      eventData
    );
  }

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_15%_20%,#ffffff_0%,#dbe8fb_37%,#f6f7fb_80%)]">
      <main className="mx-auto max-w-6xl px-6 py-10 md:px-8 md:py-14">
        <header className="mb-6 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="grid h-12 w-12 place-items-center rounded-full bg-[#0fa5d7] text-3xl font-black leading-none text-white">
              %
            </div>
            <div>
              <p className="text-4xl font-black uppercase tracking-tight text-[#1a2337]">
                Gulf<span className="ml-1.5 text-[#0fa5d7]">Rate</span>
              </p>
              <p className="mt-[-2px] text-[11px] font-semibold uppercase tracking-[0.14em] text-[#5f6f8d]">
                Louisiana & Mississippi
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3 rounded-full border border-[#c7daf8] bg-white px-4 py-2 text-xs text-[#3b4f70]">
            <span>Powered by</span>
            <Image src="/brand/c2financial-logo.png" alt="C2 Financial" width={110} height={24} />
          </div>
        </header>

        <section className="overflow-hidden rounded-3xl bg-[linear-gradient(130deg,#12345a_0%,#1f6dd8_62%,#68bdf7_100%)] p-7 text-white shadow-xl md:p-10">
          <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
            <div className="space-y-5">
              <p className="inline-flex rounded-full border border-white/40 bg-white/10 px-3 py-1 text-xs tracking-wide uppercase">
                Louisiana & Mississippi Expansion Demo
              </p>
              <h1 className="text-3xl font-bold leading-tight md:text-5xl">
                Local Mortgage Guidance For Louisiana and Mississippi Buyers
              </h1>
              <p className="max-w-2xl text-base text-blue-50 md:text-lg">
                John helps buyers compare lenders, choose the right loan strategy, and close with confidence.
              </p>
              <div className="flex flex-wrap gap-3">
                <a href="#quote-form" onClick={() => trackEvent("cta_click", { cta: "hero_rate_quote" })} className="rounded-full bg-[#f7b84d] px-5 py-3 text-sm font-semibold text-[#172033]">Get My Rate Quote</a>
                <a href={calendlyUrl} onClick={() => trackEvent("cta_click", { cta: "hero_schedule_call" })} target="_blank" rel="noopener noreferrer" className="rounded-full border border-white/50 px-5 py-3 text-sm font-semibold text-white">Schedule 15-Min Mortgage Call</a>
                <a href="#application-form" onClick={() => trackEvent("cta_click", { cta: "hero_start_application" })} className="rounded-full border border-white/50 px-5 py-3 text-sm font-semibold text-white">Upload Docs / Start Application</a>
              </div>
            </div>
            <div className="space-y-4">
              <div className="overflow-hidden rounded-2xl border border-white/30 bg-white/12 backdrop-blur-sm">
                <Image src="/brand/john_america_fade.png" alt="John Ismail" width={1200} height={800} className="h-64 w-full object-cover object-[74%_center]" />
              </div>
              <div className="rounded-2xl bg-white/14 p-5 backdrop-blur-sm">
                <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-blue-100">Why Choose John</h2>
                <ul className="space-y-2 text-sm leading-relaxed text-white/95">{trustItems.map((item) => <li key={item}>{item}</li>)}</ul>
              </div>
            </div>
          </div>
        </section>

        <section className="mt-9 grid gap-6 lg:grid-cols-3">
          <article id="quote-form" className="rounded-2xl bg-white p-6 shadow-md ring-1 ring-[#e6eefb]">
            <h2 className="text-xl font-bold text-[#172033]">Rate Quote</h2>
            <form className="mt-5 grid gap-3" onSubmit={(e) => { trackEvent("form_submit_attempt", { form: "rate_quote" }); void submitLead(e, "rate_quote", setQuoteState); }}>
              <input type="text" name="company_website" autoComplete="off" tabIndex={-1} className="hidden" />
              <input name="name" required placeholder="Full Name" className="rounded-lg border border-[#c9d9f6] px-3 py-2.5" />
              <input name="email" type="email" required placeholder="Email" className="rounded-lg border border-[#c9d9f6] px-3 py-2.5" />
              <input name="phone" required placeholder="Phone" className="rounded-lg border border-[#c9d9f6] px-3 py-2.5" />
              <input name="purchasePrice" placeholder="Purchase Price" className="rounded-lg border border-[#c9d9f6] px-3 py-2.5" />
              <select name="creditRange" className="rounded-lg border border-[#c9d9f6] bg-white px-3 py-2.5">
                <option value="">Credit Range</option><option>760+</option><option>700-759</option><option>640-699</option><option>Below 640</option>
              </select>
              <select name="timeline" className="rounded-lg border border-[#c9d9f6] bg-white px-3 py-2.5">
                <option value="">Timeline</option><option>ASAP</option><option>1-3 months</option><option>3-6 months</option><option>6+ months</option>
              </select>
              <button type="submit" className="mt-1 rounded-lg bg-[#1f6dd8] px-4 py-2.5 font-semibold text-white">{quoteState === "submitting" ? "Submitting..." : "Get My Rate Quote"}</button>
              {quoteState === "success" && <p className="text-sm text-green-700">Thanks, we received your quote request.</p>}
              {quoteState === "error" && <p className="text-sm text-red-700">{formError || "Submission failed. Please try again."}</p>}
            </form>
          </article>

          <article className="rounded-2xl bg-white p-6 shadow-md ring-1 ring-[#e6eefb]">
            <h2 className="text-xl font-bold text-[#172033]">15-Min Call</h2>
            <a href={calendlyUrl} target="_blank" rel="noopener noreferrer" className="mt-2 inline-block text-sm font-semibold text-[#1f6dd8] underline">Book on Calendly</a>
            <form className="mt-4 grid gap-3" onSubmit={(e) => { trackEvent("form_submit_attempt", { form: "strategy_call" }); void submitLead(e, "strategy_call", setCallState); }}>
              <input type="text" name="company_website" autoComplete="off" tabIndex={-1} className="hidden" />
              <input name="name" required placeholder="Best Contact Name" className="rounded-lg border border-[#c9d9f6] px-3 py-2.5" />
              <input name="phone" required placeholder="Best Phone Number" className="rounded-lg border border-[#c9d9f6] px-3 py-2.5" />
              <input name="email" type="email" required placeholder="Email" className="rounded-lg border border-[#c9d9f6] px-3 py-2.5" />
              <input name="preferredCallTime" placeholder="Preferred Call Time" className="rounded-lg border border-[#c9d9f6] px-3 py-2.5" />
              <button type="submit" className="mt-1 rounded-lg bg-[#12345a] px-4 py-2.5 font-semibold text-white">{callState === "submitting" ? "Submitting..." : "Request Call"}</button>
              {callState === "success" && <p className="text-sm text-green-700">Call request received.</p>}
              {callState === "error" && <p className="text-sm text-red-700">{formError || "Submission failed. Please try again."}</p>}
            </form>
          </article>

          <article id="application-form" className="rounded-2xl bg-white p-6 shadow-md ring-1 ring-[#e6eefb]">
            <h2 className="text-xl font-bold text-[#172033]">Start Application</h2>
            <form className="mt-5 grid gap-3" onSubmit={(e) => { trackEvent("form_submit_attempt", { form: "start_application" }); void submitLead(e, "start_application", setAppState); }}>
              <input type="text" name="company_website" autoComplete="off" tabIndex={-1} className="hidden" />
              <input name="name" required placeholder="Borrower Name" className="rounded-lg border border-[#c9d9f6] px-3 py-2.5" />
              <input name="email" type="email" required placeholder="Email" className="rounded-lg border border-[#c9d9f6] px-3 py-2.5" />
              <input name="phone" required placeholder="Phone" className="rounded-lg border border-[#c9d9f6] px-3 py-2.5" />
              <input name="purchasePrice" placeholder="Estimated Purchase Price" className="rounded-lg border border-[#c9d9f6] px-3 py-2.5" />
              <input name="timeline" placeholder="Purchase Timeline" className="rounded-lg border border-[#c9d9f6] px-3 py-2.5" />
              <button type="submit" className="mt-1 rounded-lg bg-[#12345a] px-4 py-2.5 font-semibold text-white">{appState === "submitting" ? "Submitting..." : "Start Application"}</button>
              {appState === "success" && <p className="text-sm text-green-700">Application request received.</p>}
              {appState === "error" && <p className="text-sm text-red-700">{formError || "Submission failed. Please try again."}</p>}
            </form>
          </article>
        </section>

        <section className="mt-9 rounded-2xl bg-white p-6 shadow-sm md:p-8">
          <h2 className="text-center text-3xl font-bold text-[#071c4e] md:text-5xl">
            There are a lot of financing options - let&apos;s find the right one for you.
          </h2>
          <p className="mx-auto mt-3 max-w-4xl text-center text-lg text-[#5d6d86] md:text-2xl">
            Whether you are looking to buy, refinance, or grow your real estate portfolio,
            we&apos;ve got you covered with the right loan products to fit your needs.
          </p>

          <div className="mt-8 grid gap-x-8 gap-y-8 md:grid-cols-2 xl:grid-cols-3">
            {financingOptions.map((option) => (
              <article key={option.title} className="rounded-xl p-2">
                <div className="flex items-start gap-3">
                  <span className="mt-0.5 text-4xl leading-none text-[#0f5d95]">{option.icon}</span>
                  <div>
                    <h3 className="text-4xl font-bold text-[#00114a]">{option.title}</h3>
                    <p className="mt-2 text-xl leading-9 text-[#5d6d86]">{option.description}</p>
                  </div>
                </div>
                <a
                  href={option.href}
                  className="mt-4 inline-block rounded bg-[#135f99] px-7 py-3 text-xl font-semibold text-white hover:bg-[#0f4f80]"
                >
                  Learn More
                </a>
              </article>
            ))}
          </div>
        </section>

        <section className="mt-9 rounded-2xl bg-white p-6 shadow-sm">
          <h2 className="text-xl font-bold text-[#172033]">Buyer-Type Landing Pages</h2>
          <div className="mt-4 flex flex-wrap gap-2.5">
            {seoPages.map((page) => (
              <a key={page.href} href={page.href} className="rounded-full border border-[#c8daf7] bg-[#f8fbff] px-3.5 py-1.5 text-sm font-semibold text-[#12345a] hover:bg-[#eef4ff]">{page.label}</a>
            ))}
          </div>
          <a
            href="/realtor-partner"
            className="mt-5 inline-block rounded bg-[#135f99] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#0f4f80]"
          >
            View Realtor Partner Program
          </a>
        </section>

        <section className="mt-9 rounded-2xl bg-white p-6 shadow-sm">
          <h2 className="text-xl font-bold text-[#172033]">Lead Magnet Download</h2>
          <form className="mt-4 grid gap-3 sm:grid-cols-2" onSubmit={(e) => { trackEvent("form_submit_attempt", { form: "lead_magnet" }); void submitLead(e, "lead_magnet", setMagnetState); }}>
            <input type="text" name="company_website" autoComplete="off" tabIndex={-1} className="hidden" />
            <input name="name" required placeholder="Name" className="rounded-lg border border-[#c9d9f6] px-3 py-2.5" />
            <input name="email" type="email" required placeholder="Email" className="rounded-lg border border-[#c9d9f6] px-3 py-2.5" />
            <input name="phone" placeholder="Phone" className="rounded-lg border border-[#c9d9f6] px-3 py-2.5" />
            <select name="asset" className="rounded-lg border border-[#c9d9f6] bg-white px-3 py-2.5">
              <option>Louisiana & Mississippi Homebuyer Checklist</option>
              <option>Pre-Approval Document Checklist</option>
              <option>FHA vs Conventional Guide</option>
              <option>Can I Afford This House? Worksheet</option>
            </select>
            <button type="submit" className="sm:col-span-2 rounded-lg bg-[#1f6dd8] px-4 py-2.5 font-semibold text-white">{magnetState === "submitting" ? "Submitting..." : "Send Me The Guide"}</button>
            {magnetState === "success" && <p className="sm:col-span-2 text-sm text-green-700">Request received. John can follow up with the guide.</p>}
            {magnetState === "error" && <p className="sm:col-span-2 text-sm text-red-700">{formError || "Submission failed. Please try again."}</p>}
          </form>
        </section>

        <section className="mt-9 grid gap-4 sm:grid-cols-2">
          <a href="/review-us" className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-[#e6eefb]">
            <h3 className="text-xl font-bold text-[#172033]">Review Us</h3>
            <p className="mt-1 text-[#43506b]">Help local buyers find a trusted mortgage advisor.</p>
          </a>
          <a href="/contact" className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-[#e6eefb]">
            <h3 className="text-xl font-bold text-[#172033]">Contact</h3>
            <p className="mt-1 text-[#43506b]">Call, text, or send your scenario for next-step guidance.</p>
          </a>
        </section>

        <footer className="mt-9 overflow-hidden rounded-2xl border border-[#0c1b4a] bg-[#020a39] text-white">
          <div className="px-6 py-7 md:px-8">
            <div className="mb-5 flex flex-wrap items-center gap-6">
              <Image src="/brand/c2financial-logo.png" alt="C2 Financial" width={160} height={36} />
              <div className="rounded bg-white px-2 py-1 text-[10px] font-bold text-[#0c1b4a]">EQUAL HOUSING OPPORTUNITY</div>
              <div className="rounded bg-white px-2 py-1 text-[10px] font-bold text-[#0c1b4a]">NMLS CONSUMER ACCESS</div>
            </div>
            <div className="space-y-4 text-sm leading-7 text-blue-50">
              <p className="font-semibold">C2 NMLS #231283</p>
              <p>C2 Financial is rapidly growing with active licenses in over 34 states as of March 2024. Number of licensed states and lenders within the C2 Lender Network may vary. www.C2Financial.com</p>
              <p>Consumers wishing to file a complaint against a company or a residential mortgage loan originator should complete and send a complaint form to the texas department of savings and mortgage lending, 2601 North Lamar, Suite 201, Austin, Texas 78705. Complaint forms and instructions may be obtained from the department&apos;s website at www.sml.texas.gov.</p>
              <p>A toll-free consumer hotline is available at 1-877-276-5550. The department maintains a recovery fund to make payments of certain actual out of pocket damages sustained by borrowers caused by acts of licensed residential mortgage loan originators. A written application for reimbursement from the recovery fund must be filed with and investigated by the department prior to the payment of a claim. For more information about the recovery fund, please consult the department&apos;s website at www.sml.texas.gov.</p>
              <p>This licensee is performing acts for which a mortgage Company License is required. C2 Financial Corporation is licensed by the Texas Department of Savings and Mortgage Lending; NMLS# 135622. Loan approval is not guaranteed and is subject to lender review of information. All loan approvals are conditional and all conditions must be met by borrower. Loan is only approved when lender has issued approval in writing and is subject to the Lender conditions. Specified rates may not be available for all borrowers. Rate subject to change with market conditions. C2 Financial Corporation is an Equal Opportunity Mortgage Broker/Lender. The services referred to herein are not available to persons located outside the state of TX. C2 Financial Corporation has the ability to broker VA loans based on their relationship with VA approved lenders. C2 Financial Corporation is not acting on behalf of or at the direction of HUD/FHA or the VA.</p>
              <p>Texas Complaint/Recovery Fund Notice: <a href="https://www.sml.texas.gov/ResidentialMortgageLoanOriginator/rmlo_mb_forms.html" target="_blank" rel="noopener noreferrer" className="underline">https://www.sml.texas.gov/ResidentialMortgageLoanOriginator/rmlo_mb_forms.html</a></p>
            </div>
          </div>
          <div className="border-t border-white/15 px-6 py-5 text-sm text-blue-50 md:px-8">
            <p>Corporate Address: 12230 El Camino Real, Ste 100 | San Diego, CA 92130</p>
            <p className="mt-2">© 2026 All Rights Reserved.</p>
            <p className="mt-2 font-semibold">C2 NMLS #135622 | C2 TX #135622 | NMLS #231283</p>
          </div>
        </footer>
      </main>
    </div>
  );
}
