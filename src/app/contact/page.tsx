"use client";

import { FormEvent, useState } from "react";
import SiteHeader from "@/components/site/SiteHeader";
import { siteConfig, toTelHref } from "@/lib/siteConfig";

type FormState = "idle" | "submitting" | "success" | "error";

export default function ContactPage() {
  const [state, setState] = useState<FormState>("idle");
  const [error, setError] = useState("");

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setState("submitting");
    setError("");
    const form = event.currentTarget;
    const formData = new FormData(form);
    const payload = {
      leadType: "contact_request",
      page: "/contact",
      submittedAt: new Date().toISOString(),
      ...Object.fromEntries(formData.entries()),
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
    } catch (e) {
      setError(e instanceof Error ? e.message : "Submission failed.");
      setState("error");
    }
  }

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_15%_20%,#ffffff_0%,#f1e7ba_37%,#f7f6ef_80%)]">
      <main className="mx-auto max-w-6xl px-6 py-10 md:px-8 md:py-14">
      <SiteHeader />
      <section className="grid gap-6 md:grid-cols-2">
        <article className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-[#e5dcc0]">
          <h1 className="text-4xl font-bold text-[#172033]">Contact</h1>
          <p className="mt-2 text-[#4c5265]">
            Reach out for friendly, family-focused guidance on purchase, refinance, and next-step planning.
          </p>
          <div className="mt-5 space-y-2 text-[#172033]">
            <p><strong>New Orleans:</strong> <a href={toTelHref(siteConfig.newOrleansPhone)} className="text-[#b27b00]">{siteConfig.newOrleansPhone}</a></p>
            <p><strong>Call/Text:</strong> <a href={toTelHref(siteConfig.contactPhone)} className="text-[#b27b00]">{siteConfig.contactPhone}</a></p>
            <p><strong>Email:</strong> <a href={`mailto:${siteConfig.contactEmail}`} className="text-[#b27b00]">{siteConfig.contactEmail}</a></p>
            <p><strong>NMLS:</strong> #{siteConfig.nmls}</p>
            <p><strong>LinkedIn:</strong> <a href={siteConfig.linkedinUrl} target="_blank" rel="noopener noreferrer" className="text-[#b27b00]">Connect with John</a></p>
            <p><strong>Service Area:</strong> Texas, Louisiana, and Mississippi</p>
          </div>
        </article>

        <article className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-[#e5dcc0]">
          <h2 className="text-2xl font-bold text-[#172033]">Send A Message</h2>
          <form className="mt-4 grid gap-3" onSubmit={(e) => void onSubmit(e)}>
            <input type="text" name="company_website" autoComplete="off" tabIndex={-1} className="hidden" />
            <label htmlFor="contact-name" className="sr-only">Full Name</label>
            <label htmlFor="contact-email" className="sr-only">Email</label>
            <label htmlFor="contact-phone" className="sr-only">Phone</label>
            <label htmlFor="contact-message" className="sr-only">Message</label>
            <input id="contact-name" name="name" required placeholder="Full Name" className="rounded-lg border border-[#e2d6b5] px-3 py-2.5" />
            <input id="contact-email" name="email" required type="email" placeholder="Email" className="rounded-lg border border-[#e2d6b5] px-3 py-2.5" />
            <input id="contact-phone" name="phone" required placeholder="Phone" className="rounded-lg border border-[#e2d6b5] px-3 py-2.5" />
            <textarea id="contact-message" name="message" rows={4} required placeholder="How can we help?" className="rounded-lg border border-[#e2d6b5] px-3 py-2.5" />
            <label className="flex items-start gap-3 rounded-lg border border-[#e2d6b5] bg-[#fffdf3] p-3 text-sm text-[#4c5265]">
              <input
                type="checkbox"
                name="consentToContact"
                value="yes"
                required
                className="mt-1"
              />
              <span>
                I agree that John may contact me by phone, text, or email about my
                request. Message and data rates may apply.
              </span>
            </label>
            <label className="flex items-start gap-3 rounded-lg border border-[#e2d6b5] p-3 text-sm text-[#4c5265]">
              <input
                type="checkbox"
                name="marketingOptOut"
                value="yes"
                className="mt-1"
              />
              <span>
                Opt me out of marketing emails and marketing phone calls. Only contact
                me about this request.
              </span>
            </label>
            <button type="submit" className="rounded-lg bg-[#121e5b] px-4 py-2.5 font-semibold text-white hover:bg-[#081244]">
              {state === "submitting" ? "Submitting..." : "Send Message"}
            </button>
            {state === "success" && <p className="text-sm text-green-700">Message received. We will follow up soon.</p>}
            {state === "error" && <p role="alert" aria-live="assertive" className="text-sm text-red-700">{error || "Submission failed."}</p>}
          </form>
        </article>
      </section>
      </main>
    </div>
  );
}
