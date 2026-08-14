import Image from "next/image";
import Link from "next/link";
import { applicationUrl } from "@/lib/application";
import { siteConfig } from "@/lib/siteConfig";

export default function SiteHeader() {
  return (
    <header className="mb-6 flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-[#2b3672] bg-[#121e5b] p-4 shadow-lg shadow-[#121e5b]/15">
      <Link href="/" className="flex items-center">
        <Image
          src="/brand/nola-rate-logo.png"
          alt="Nola Rate Mortgage Advisory"
          width={455}
          height={130}
          className="h-auto w-[230px] sm:w-[300px]"
        />
      </Link>

      <div className="flex flex-wrap items-center gap-3">
        <nav className="flex flex-wrap items-center gap-2 text-xs font-semibold text-white">
          <Link className="rounded-full border border-[#ffd534]/50 bg-white/10 px-3 py-1.5 hover:bg-white hover:text-[#121e5b]" href="/">
            Home
          </Link>
          <Link
            className="rounded-full border border-[#ffd534]/50 bg-white/10 px-3 py-1.5 hover:bg-white hover:text-[#121e5b]"
            href="/rate-quote"
          >
            Rate Quote
          </Link>
          <Link
            className="rounded-full border border-[#ffd534]/50 bg-white/10 px-3 py-1.5 hover:bg-white hover:text-[#121e5b]"
            href="/mortgage-calculator"
          >
            Calculator
          </Link>
          <Link
            className="rounded-full border border-[#ffd534]/50 bg-white/10 px-3 py-1.5 hover:bg-white hover:text-[#121e5b]"
            href="/contact"
          >
            Questions
          </Link>
          <a
            className="rounded-full border border-[#ffd534]/50 bg-white/10 px-3 py-1.5 text-white hover:bg-white hover:text-[#121e5b]"
            href={siteConfig.linkedinUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            LinkedIn
          </a>
          <a
            className="rounded-full border border-[#ffd534]/50 bg-white/10 px-3 py-1.5 text-white hover:bg-white hover:text-[#121e5b]"
            href={applicationUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            Apply Now
          </a>
        </nav>
      </div>
    </header>
  );
}
