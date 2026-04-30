import Link from "next/link";

export default function ReviewUsPage() {
  return (
    <main className="mx-auto min-h-screen max-w-4xl px-6 py-12 md:px-8">
      <section className="rounded-2xl bg-white p-8 shadow-sm ring-1 ring-[#e6eefb]">
        <h1 className="text-4xl font-bold text-[#172033]">Review Us</h1>
        <p className="mt-3 text-lg text-[#43506b]">
          Your feedback helps families in Louisiana and Mississippi find a trusted local mortgage guide.
        </p>
        <a
          href="#"
          className="mt-6 inline-block rounded-lg bg-[#1f6dd8] px-5 py-3 font-semibold text-white hover:bg-[#195ebd]"
        >
          Leave A Google Review (Placeholder)
        </a>
        <p className="mt-4 text-sm text-[#5d6d86]">
          Replace placeholder with John&apos;s Google Business Profile review URL.
        </p>
        <Link href="/" className="mt-6 inline-block text-sm font-semibold text-[#1f6dd8] underline">
          Back to Homepage
        </Link>
      </section>
    </main>
  );
}
