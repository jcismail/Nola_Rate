"use client";

import { FormEvent, useState } from "react";

type FormState = "idle" | "submitting" | "success" | "error";

export default function ContactPage() {
  const [state, setState] = useState<FormState>("idle");
  const [error, setError] = useState("");

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setState("submitting");
    setError("");
    const formData = new FormData(event.currentTarget);
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
      event.currentTarget.reset();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Submission failed.");
      setState("error");
    }
  }

  return (
    <main className="mx-auto min-h-screen max-w-6xl px-6 py-12 md:px-8">
      <section className="grid gap-6 md:grid-cols-2">
        <article className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-[#e6eefb]">
          <h1 className="text-4xl font-bold text-[#172033]">Contact</h1>
          <p className="mt-2 text-[#43506b]">
            Reach out for pre-approval, refinance strategy, or loan scenario guidance.
          </p>
          <div className="mt-5 space-y-2 text-[#172033]">
            <p><strong>Call/Text:</strong> <a href="tel:+14692262429" className="text-[#1f6dd8]">469.226.2429</a></p>
            <p><strong>Email:</strong> <a href="mailto:john@example.com" className="text-[#1f6dd8]">john@example.com</a></p>
            <p><strong>Service Area:</strong> Louisiana and Mississippi</p>
          </div>
        </article>

        <article className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-[#e6eefb]">
          <h2 className="text-2xl font-bold text-[#172033]">Send A Message</h2>
          <form className="mt-4 grid gap-3" onSubmit={(e) => void onSubmit(e)}>
            <input type="text" name="company_website" autoComplete="off" tabIndex={-1} className="hidden" />
            <input name="name" required placeholder="Full Name" className="rounded-lg border border-[#c9d9f6] px-3 py-2.5" />
            <input name="email" required type="email" placeholder="Email" className="rounded-lg border border-[#c9d9f6] px-3 py-2.5" />
            <input name="phone" placeholder="Phone" className="rounded-lg border border-[#c9d9f6] px-3 py-2.5" />
            <textarea name="message" rows={4} required placeholder="How can we help?" className="rounded-lg border border-[#c9d9f6] px-3 py-2.5" />
            <button type="submit" className="rounded-lg bg-[#1f6dd8] px-4 py-2.5 font-semibold text-white">
              {state === "submitting" ? "Submitting..." : "Send Message"}
            </button>
            {state === "success" && <p className="text-sm text-green-700">Message received. We will follow up soon.</p>}
            {state === "error" && <p className="text-sm text-red-700">{error || "Submission failed."}</p>}
          </form>
        </article>
      </section>
    </main>
  );
}
