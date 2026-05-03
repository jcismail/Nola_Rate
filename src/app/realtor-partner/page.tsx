"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import SiteHeader from "@/components/site/SiteHeader";

type FormState = "idle" | "submitting" | "success" | "error";

export default function RealtorPartnerPage() {
  const [state, setState] = useState<FormState>("idle");

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setState("submitting");
    const formData = new FormData(event.currentTarget);
    const payload = {
      leadType: "realtor_partner",
      page: "/realtor-partner",
      submittedAt: new Date().toISOString(),
      ...Object.fromEntries(formData.entries()),
    };

    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("failed");
      setState("success");
      event.currentTarget.reset();
    } catch {
      setState("error");
    }
  }

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_15%_20%,#ffffff_0%,#dbe8fb_37%,#f6f7fb_80%)]">
    <main className="mx-auto max-w-6xl px-6 py-10 md:px-8 md:py-14">
      <SiteHeader />
      <section className="rounded-2xl bg-[linear-gradient(130deg,#12345a_0%,#1f6dd8_70%,#68bdf7_100%)] p-8 text-white shadow-xl">
        <h1 className="text-4xl font-bold">Realtor Partner Program</h1>
        <p className="mt-3 max-w-3xl text-lg text-blue-50">
          Helping Louisiana and Mississippi realtors serve families better with fast
          initial qualification, clear communication, and loan options that fit real-life goals.
        </p>
      </section>

      <section className="mt-7 grid gap-6 md:grid-cols-2">
        <article className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-[#e6eefb]">
          <h2 className="text-2xl font-bold text-[#172033]">Partner Benefits</h2>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-[#43506b]">
            <li>Fast pre-approval support for cleaner offers</li>
            <li>Communication guarantee and status updates</li>
            <li>Co-branded flyers and buyer education handouts</li>
            <li>Monthly market/rate update email template</li>
            <li>Quarterly lunch-and-learn webinar invite workflow</li>
          </ul>
        </article>

        <article className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-[#e6eefb]">
          <h2 className="text-2xl font-bold text-[#172033]">Partner Interest Form</h2>
          <form className="mt-4 grid gap-3" onSubmit={(e) => void onSubmit(e)}>
            <input type="text" name="company_website" autoComplete="off" tabIndex={-1} className="hidden" />
            <label htmlFor="rp-name" className="sr-only">Agent Name</label>
            <label htmlFor="rp-brokerage" className="sr-only">Brokerage</label>
            <label htmlFor="rp-email" className="sr-only">Email</label>
            <label htmlFor="rp-phone" className="sr-only">Phone</label>
            <label htmlFor="rp-notes" className="sr-only">Collaboration Notes</label>
            <input id="rp-name" name="name" required placeholder="Agent Name" className="rounded-lg border border-[#c9d9f6] px-3 py-2.5" />
            <input id="rp-brokerage" name="brokerage" placeholder="Brokerage" className="rounded-lg border border-[#c9d9f6] px-3 py-2.5" />
            <input id="rp-email" name="email" type="email" required placeholder="Email" className="rounded-lg border border-[#c9d9f6] px-3 py-2.5" />
            <input id="rp-phone" name="phone" placeholder="Phone" className="rounded-lg border border-[#c9d9f6] px-3 py-2.5" />
            <textarea id="rp-notes" name="notes" rows={4} placeholder="How can we collaborate?" className="rounded-lg border border-[#c9d9f6] px-3 py-2.5" />
            <button type="submit" className="rounded-lg bg-[#1f6dd8] px-4 py-2.5 font-semibold text-white">
              {state === "submitting" ? "Submitting..." : "Request Partner Call"}
            </button>
            {state === "success" && <p className="text-sm text-green-700">Thanks! Partner request received.</p>}
            {state === "error" && <p role="alert" aria-live="assertive" className="text-sm text-red-700">Submission failed. Please retry.</p>}
          </form>
        </article>
      </section>

      <section className="mt-7 rounded-2xl bg-white p-6 shadow-sm ring-1 ring-[#e6eefb]">
        <h2 className="text-2xl font-bold text-[#172033]">Demo Assets</h2>
        <div className="mt-3 flex flex-wrap gap-3">
          <span className="rounded bg-[#eef4ff] px-3 py-1.5 text-sm font-semibold text-[#12345a]">Co-Branded Flyer Kit (Coming Soon)</span>
          <span className="rounded bg-[#eef4ff] px-3 py-1.5 text-sm font-semibold text-[#12345a]">Buyer Qualification Checklist (Coming Soon)</span>
          <span className="rounded bg-[#eef4ff] px-3 py-1.5 text-sm font-semibold text-[#12345a]">Webinar Signup Flow (Coming Soon)</span>
        </div>
        <Link href="/" className="mt-5 inline-block text-sm font-semibold text-[#1f6dd8] underline">
          Back to Homepage
        </Link>
      </section>
    </main>
    </div>
  );
}
