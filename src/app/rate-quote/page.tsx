"use client";

import { FormEvent, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import SiteHeader from "@/components/site/SiteHeader";
import { applicationUrl } from "@/lib/application";
import { siteConfig, toTelHref } from "@/lib/siteConfig";

type FormState = "idle" | "submitting" | "success" | "error";

export default function RateQuotePage() {
  const router = useRouter();
  const [state, setState] = useState<FormState>("idle");
  const [error, setError] = useState("");

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

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setState("submitting");
    setError("");

    const form = event.currentTarget;
    const formData = new FormData(form);
    const transactionType = String(formData.get("transactionType") ?? "");
    const payload = {
      leadType: "rate_quote",
      page: "/rate-quote",
      submittedAt: new Date().toISOString(),
      loan_goal: transactionType,
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
        throw new Error(body.error || "Submission failed.");
      }

      setState("success");
      form.reset();
      router.push("/thank-you?type=rate_quote");
    } catch (e) {
      setError(e instanceof Error ? e.message : "Submission failed.");
      setState("error");
    }
  }

  const inputClass = "rounded-lg border border-[#e2d6b5] bg-white px-3 py-3";
  const labelClass = "grid gap-1 text-sm font-semibold text-[#172033]";

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_15%_20%,#ffffff_0%,#f1e7ba_37%,#f7f6ef_80%)]">
      <main className="mx-auto max-w-6xl px-6 py-10 md:px-8 md:py-14">
        <SiteHeader />

        <section className="grid gap-7 lg:grid-cols-[0.78fr_1.22fr]">
          <aside className="rounded-3xl bg-[#121e5b] p-7 text-white shadow-xl shadow-[#121e5b]/20 md:p-8">
            <p className="text-xs font-semibold uppercase tracking-wide text-[#ffd534]">
              Request Rate Quote
            </p>
            <h1 className="mt-3 text-4xl font-bold leading-tight md:text-5xl">
              A clearer quote starts with the right details.
            </h1>
            <p className="mt-4 text-lg leading-8 text-white/82">
              Tell John whether you are buying or refinancing, where the property is,
              and what kind of loan goal you have in mind. Email and phone are required
              so he can follow up with complete next steps.
            </p>
            <div className="mt-7 space-y-3 rounded-2xl bg-white/10 p-5 text-sm leading-6">
              <p>
                <strong>Call/Text:</strong>{" "}
                <a href={toTelHref(siteConfig.contactPhone)} className="underline">
                  {siteConfig.contactPhone}
                </a>
              </p>
              <p>
                <strong>Email:</strong>{" "}
                <a href={`mailto:${siteConfig.contactEmail}`} className="underline">
                  {siteConfig.contactEmail}
                </a>
              </p>
              <p>
                <strong>LinkedIn:</strong>{" "}
                <a
                  href={siteConfig.linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline"
                >
                  Connect with John
                </a>
              </p>
            </div>
            <a
              href={applicationUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-flex rounded-lg bg-white px-5 py-3 text-sm font-semibold text-[#121e5b] hover:bg-[#fff5c7]"
            >
              Ready To Apply Now
            </a>
          </aside>

          <section className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-[#e5dcc0] md:p-8">
            <h2 className="text-3xl font-bold text-[#172033]">
              Complete Your Quote Request
            </h2>
            <p className="mt-2 text-[#4c5265]">
              Required fields are marked with an asterisk.
            </p>

            <form className="mt-6 grid gap-5" onSubmit={(e) => void onSubmit(e)}>
              <input
                type="text"
                name="company_website"
                autoComplete="off"
                tabIndex={-1}
                className="hidden"
              />

              <fieldset className="grid gap-3 rounded-2xl border border-[#e2d6b5] bg-[#fffdf3] p-4">
                <legend className="px-1 text-sm font-bold text-[#121e5b]">
                  Is this a purchase or refinance? *
                </legend>
                <div className="grid gap-3 sm:grid-cols-2">
                  <label className="flex items-center gap-3 rounded-lg border border-[#e2d6b5] bg-white px-4 py-3 text-sm font-semibold text-[#172033]">
                    <input type="radio" name="transactionType" value="purchase" required />
                    Purchase
                  </label>
                  <label className="flex items-center gap-3 rounded-lg border border-[#e2d6b5] bg-white px-4 py-3 text-sm font-semibold text-[#172033]">
                    <input type="radio" name="transactionType" value="refinance" required />
                    Refinance
                  </label>
                </div>
              </fieldset>

              <div className="grid gap-4 md:grid-cols-2">
                <label className={labelClass}>
                  Full Name *
                  <input name="name" required className={inputClass} />
                </label>
                <label className={labelClass}>
                  Phone *
                  <input name="phone" type="tel" required className={inputClass} />
                </label>
                <label className={labelClass}>
                  Email *
                  <input name="email" type="email" required className={inputClass} />
                </label>
                <label className={labelClass}>
                  Preferred Contact Method
                  <select name="preferredContactMethod" className={inputClass} defaultValue="">
                    <option value="">Choose one</option>
                    <option>Call</option>
                    <option>Text</option>
                    <option>Email</option>
                  </select>
                </label>
              </div>

              <div className="grid gap-4 md:grid-cols-3">
                <label className={labelClass}>
                  Property State *
                  <select name="state" required className={inputClass} defaultValue="">
                    <option value="">Choose state</option>
                    <option>Texas</option>
                    <option>Louisiana</option>
                    <option>Mississippi</option>
                    <option>Other</option>
                  </select>
                </label>
                <label className={labelClass}>
                  City
                  <input name="city" className={inputClass} />
                </label>
                <label className={labelClass}>
                  Timeline
                  <select name="timeline" className={inputClass} defaultValue="">
                    <option value="">Choose timeline</option>
                    <option>ASAP</option>
                    <option>30-60 days</option>
                    <option>60-90 days</option>
                    <option>3+ months</option>
                  </select>
                </label>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <label className={labelClass}>
                  Estimated Purchase Price or Home Value
                  <input name="target_home_price" inputMode="decimal" className={inputClass} />
                </label>
                <label className={labelClass}>
                  Down Payment or Current Equity
                  <input name="down_payment_range" className={inputClass} />
                </label>
                <label className={labelClass}>
                  Credit Range
                  <select name="credit_range" className={inputClass} defaultValue="">
                    <option value="">Choose range</option>
                    <option>760+</option>
                    <option>700-759</option>
                    <option>640-699</option>
                    <option>580-639</option>
                    <option>Below 580</option>
                    <option>Not sure</option>
                  </select>
                </label>
                <label className={labelClass}>
                  Property Use
                  <select name="propertyUse" className={inputClass} defaultValue="">
                    <option value="">Choose use</option>
                    <option>Primary Residence</option>
                    <option>Second Home</option>
                    <option>Investment Property</option>
                  </select>
                </label>
              </div>

              <label className={labelClass}>
                Anything John should know?
                <textarea
                  name="message"
                  rows={5}
                  className={inputClass}
                  placeholder="Example: purchase price, refinance goal, cash-out need, property location, loan type you are considering, or anything time-sensitive."
                />
              </label>

              <label className="flex items-start gap-3 rounded-2xl border border-[#e2d6b5] bg-[#fffdf3] p-4 text-sm text-[#4c5265]">
                <input
                  type="checkbox"
                  name="consentToContact"
                  value="yes"
                  required
                  className="mt-1"
                />
                <span>
                  I agree that John may contact me by phone, text, or email about my
                  mortgage request. Message and data rates may apply.
                </span>
              </label>

              <button
                type="submit"
                className="rounded-xl bg-[#121e5b] px-6 py-4 text-base font-bold text-white hover:bg-[#081244]"
              >
                {state === "submitting" ? "Submitting..." : "Request My Rate Quote"}
              </button>
              {state === "success" && (
                <p className="text-sm text-green-700">
                  Quote request received. John will follow up soon.
                </p>
              )}
              {state === "error" && (
                <p role="alert" aria-live="assertive" className="text-sm text-red-700">
                  {error || "Submission failed."}
                </p>
              )}
            </form>
          </section>
        </section>
      </main>
    </div>
  );
}
