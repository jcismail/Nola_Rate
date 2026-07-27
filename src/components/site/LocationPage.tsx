import Image from "next/image";
import Link from "next/link";
import SiteHeader from "@/components/site/SiteHeader";
import { applicationUrl } from "@/lib/application";

type LocationPageProps = {
  eyebrow: string;
  title: string;
  intro: string;
  bullets: string[];
  marketNotes: {
    title: string;
    text: string;
  }[];
  image: {
    src: string;
    alt: string;
    credit: string;
    creditHref: string;
  };
};

export default function LocationPage({
  eyebrow,
  title,
  intro,
  bullets,
  marketNotes,
  image,
}: LocationPageProps) {
  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_15%_20%,#ffffff_0%,#f1e7ba_37%,#f7f6ef_80%)]">
      <main className="mx-auto max-w-6xl px-6 py-10 md:px-8 md:py-14">
        <SiteHeader />

        <section className="rounded-3xl border border-[#ffd534]/40 bg-[linear-gradient(130deg,#081244_0%,#121e5b_68%,#2b3672_100%)] p-7 text-white shadow-xl shadow-[#121e5b]/20 md:p-10">
          <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
            <div>
              <p className="inline-flex rounded-full border border-white/40 bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide">
                {eyebrow}
              </p>
              <h1 className="mt-5 max-w-4xl text-4xl font-bold leading-tight md:text-6xl">
                {title}
              </h1>
              <p className="mt-5 max-w-3xl text-lg leading-8 text-white/88">
                {intro}
              </p>
              <div className="mt-7 flex flex-wrap gap-3">
                <a
                  href={applicationUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full border border-white/50 px-5 py-3 text-sm font-semibold text-white hover:bg-white hover:text-[#121e5b]"
                >
                  Apply Now
                </a>
                <Link
                  href="/contact"
                  className="rounded-full border border-white/50 px-5 py-3 text-sm font-semibold text-white hover:bg-white hover:text-[#121e5b]"
                >
                  Contact John
                </Link>
                <Link
                  href="/rate-quote"
                  className="rounded-full border border-white/50 px-5 py-3 text-sm font-semibold text-white hover:bg-white hover:text-[#121e5b]"
                >
                  Request Rate Quote
                </Link>
                <Link
                  href="/mortgage-calculator"
                  className="rounded-full border border-white/50 px-5 py-3 text-sm font-semibold text-white hover:bg-white hover:text-[#121e5b]"
                >
                  Mortgage Calculator
                </Link>
              </div>
            </div>
            <figure>
              <div className="overflow-hidden rounded-2xl border border-white/30 bg-white/12">
                <Image
                  src={image.src}
                  alt={image.alt}
                  width={1200}
                  height={800}
                  className="h-72 w-full object-cover"
                  priority
                />
              </div>
              <figcaption className="mt-2 text-xs text-white/65">
                Photo:{" "}
                <a
                  href={image.creditHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline"
                >
                  {image.credit}
                </a>
              </figcaption>
            </figure>
          </div>
        </section>

        <section className="mt-9 grid gap-6 lg:grid-cols-[0.85fr_1.15fr]">
          <article className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-[#e5dcc0] md:p-8">
            <h2 className="text-2xl font-bold text-[#121e5b]">How John Helps</h2>
            <ul className="mt-5 space-y-3 text-[#4c5265]">
              {bullets.map((bullet) => (
                <li key={bullet} className="border-l-2 border-[#e2d6b5] pl-4 leading-7">
                  {bullet}
                </li>
              ))}
            </ul>
          </article>

          <div className="grid gap-4">
            {marketNotes.map((note) => (
              <article
                key={note.title}
                className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-[#e5dcc0]"
              >
                <h3 className="text-xl font-bold text-[#121e5b]">{note.title}</h3>
                <p className="mt-2 leading-7 text-[#4c5265]">{note.text}</p>
              </article>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
