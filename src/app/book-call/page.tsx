const calendlyUrl = process.env.NEXT_PUBLIC_CALENDLY_URL?.trim() || "";

export default function BookCallPage() {
  const hasCalendly = calendlyUrl.startsWith("https://calendly.com/");

  return (
    <main className="mx-auto min-h-screen max-w-4xl px-6 py-12 md:px-8">
      <section className="rounded-2xl bg-white p-7 shadow-sm ring-1 ring-[#e6eefb]">
        <h1 className="text-3xl font-bold text-[#172033]">Book A Consultation</h1>
        <p className="mt-3 text-[#43506b]">
          {hasCalendly
            ? "Use the scheduling link below to book your 15-minute mortgage strategy call."
            : "Calendly is ready to plug in. Add John’s scheduling URL to NEXT_PUBLIC_CALENDLY_URL in .env.local and this page will auto-update."}
        </p>

        {hasCalendly ? (
          <a
            href={calendlyUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-5 inline-block rounded-lg bg-[#1f6dd8] px-5 py-3 font-semibold text-white hover:bg-[#195ebd]"
          >
            Open Calendly Scheduler
          </a>
        ) : (
          <div className="mt-5 rounded-lg border border-[#c9d9f6] bg-[#f8fbff] p-4 text-sm text-[#2f405e]">
            <p className="font-semibold">Setup step</p>
            <p className="mt-1">
              Add this to <code>.env.local</code>:
            </p>
            <pre className="mt-2 overflow-auto rounded bg-white p-2 text-xs">
{`NEXT_PUBLIC_CALENDLY_URL=https://calendly.com/<john-handle>/<event-name>`}
            </pre>
          </div>
        )}
      </section>
    </main>
  );
}
