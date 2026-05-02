import Link from "next/link";

const calendlyUrl = process.env.NEXT_PUBLIC_CALENDLY_URL?.trim() || "/book-call";

export default function SiteHeader() {
  return (
    <header className="mb-6 flex flex-wrap items-center justify-between gap-4">
      <Link href="/" className="flex items-center gap-3">
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
      </Link>

      <div className="flex flex-wrap items-center gap-3">
        <nav className="flex flex-wrap items-center gap-2 text-xs font-semibold text-[#12345a]">
          <Link className="rounded-full border border-[#c7daf8] bg-white px-3 py-1.5" href="/">
            Home
          </Link>
          <Link
            className="rounded-full border border-[#c7daf8] bg-white px-3 py-1.5"
            href="/realtor-partner"
          >
            Realtor Program
          </Link>
          <Link
            className="rounded-full border border-[#c7daf8] bg-white px-3 py-1.5"
            href="/contact"
          >
            Contact
          </Link>
          <Link
            className="rounded-full border border-[#c7daf8] bg-white px-3 py-1.5"
            href="/review-us"
          >
            Review Us
          </Link>
          <a
            className="rounded-full border border-[#c7daf8] bg-white px-3 py-1.5"
            href={calendlyUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            Book Call
          </a>
        </nav>
      </div>
    </header>
  );
}
