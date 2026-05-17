import Image from "next/image";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import SiteHeader from "@/components/site/SiteHeader";

type Section = {
  title: string;
  bullets: string[];
};

type FAQ = {
  question: string;
  answer: string;
};

type SolutionPageConfig = {
  title: string;
  navLabel: string;
  subtitle: string;
  heroImage: string;
  introHeadline: string;
  introText: string;
  sections: Section[];
  faqs?: FAQ[];
};

const pages: Record<string, SolutionPageConfig> = {
  "low-credit-options": {
    title: "Low Credit Score",
    navLabel: "Low Credit",
    subtitle: "Loan options for developing credit profiles.",
    heroImage: "/brand/low-credit-hero.jpeg",
    introHeadline: "Have a low credit score? We might be able to help!",
    introText:
      "Program and lender guidelines can support borrowers with developing credit profiles. Qualification depends on full borrower and property review.",
    sections: [
      {
        title: "FHA requirements",
        bullets: [
          "Lower down payment options may be available for qualified borrowers",
          "Credit and down payment requirements vary by lender and borrower profile",
          "Must be able to verify income",
          "No foreclosures within the last 3 years",
          "No bankruptcy in the last 2 years",
        ],
      },
      {
        title: "Fannie Mae / Freddie Mac requirements",
        bullets: [
          "Conventional requirements vary by lender and scenario",
          "Underwriting standards may be stricter than FHA in some scenarios",
          "Lower credit profiles may require larger down payments",
        ],
      },
    ],
    faqs: [
      {
        question: "Can I still qualify with a credit score under 620?",
        answer:
          "Possibly, yes. Qualification depends on full profile including down payment, income, debt ratio, and reserves.",
      },
      {
        question: "What is the minimum score for FHA?",
        answer:
          "Program guidelines can allow lower scores, but lender overlays vary. We match your profile to lenders with workable options.",
      },
      {
        question: "Will I need a larger down payment with lower credit?",
        answer:
          "In many scenarios, yes. We outline a realistic approval plan with payment options before you shop homes.",
      },
    ],
  },
  "outside-the-box-programs": {
    title: "Outside the Box Programs",
    navLabel: "Outside-the-Box",
    subtitle: "Non-traditional income mortgage options.",
    heroImage: "/brand/outside-box-hero.jpg",
    introHeadline: "Self-employed or have non-traditional income?",
    introText:
      "We offer Bank Statement loans, 1099-only, DSCR (no-income-doc investor loans), and other flexible options.",
    sections: [
      {
        title: "Bank Statement Program",
        bullets: [
          "Built for self-employed borrowers with strong cash flow",
          "Use bank deposits instead of traditional W2 income",
          "Flexible qualification for business owners",
        ],
      },
      {
        title: "1099s Only",
        bullets: [
          "Designed for contractors and 1099 earners",
          "Qualification based on non-traditional income documentation",
          "Useful when tax returns do not reflect true earning power",
        ],
      },
      {
        title: "DSCR",
        bullets: [
          "Great for investment-property borrowers",
          "Focuses on property cash flow vs borrower income",
          "Supports portfolio growth strategies",
        ],
      },
      {
        title: "Foreign National Program",
        bullets: [
          "Options for eligible non-U.S. resident borrowers",
          "Program requirements vary by lender and scenario",
          "Guided structuring support to improve approval odds",
        ],
      },
    ],
    faqs: [
      {
        question: "What is a bank statement loan?",
        answer:
          "A non-QM option that uses business or personal bank deposits to assess qualifying income for self-employed borrowers.",
      },
      {
        question: "What does DSCR mean?",
        answer:
          "Debt Service Coverage Ratio. It evaluates investment property cash flow compared to debt obligation, often with reduced personal income documentation.",
      },
      {
        question: "Do I need W2 income for these programs?",
        answer:
          "Not always. These programs are designed for non-traditional income profiles such as 1099 and business-owner scenarios.",
      },
    ],
  },
  "zero-down-programs": {
    title: "Zero Down",
    navLabel: "Zero Down",
    subtitle: "Down payment assistance and zero-down pathways.",
    heroImage: "/brand/zero-down-hero.jpg",
    introHeadline: "Need extra help with down payment?",
    introText:
      "Have you found a home but need additional help for down payment? We have solutions.",
    sections: [
      {
        title: "Down Payment Assistance",
        bullets: [
          "Programs can reduce cash needed at closing",
          "Eligibility varies by area, income, and property type",
          "Structured to support first-time and repeat buyers",
        ],
      },
      {
        title: "FHA requirements",
        bullets: [
          "Lower down payment options for qualified borrowers",
          "Flexible credit pathways vs many conventional routes",
          "Government-backed structure with broad lender support",
        ],
      },
      {
        title: "USDA",
        bullets: [
          "Potential zero-down financing for eligible rural/suburban areas",
          "Property and borrower eligibility rules apply",
          "Check eligibility at: eligibility.sc.egov.usda.gov",
        ],
      },
    ],
    faqs: [
      {
        question: "Are zero-down programs available everywhere?",
        answer:
          "No. Program eligibility depends on location, borrower profile, and property type.",
      },
      {
        question: "Can I combine assistance with other loan types?",
        answer:
          "In some cases, yes. We review compatibility rules and structure the most practical path for your scenario.",
      },
      {
        question: "How do I check USDA area eligibility?",
        answer:
          "USDA eligibility is location-specific. We can confirm eligible areas during initial qualification planning.",
      },
    ],
  },
  "conventional-loans": {
    title: "Conventional Loans",
    navLabel: "Conventional",
    subtitle: "Flexible, competitive mortgage options.",
    heroImage: "/brand/john_america_fade.png",
    introHeadline: "Conventional financing with competitive terms",
    introText:
      "A strong fit for buyers with stable income, stronger credit, and clear long-term goals.",
    sections: [
      {
        title: "Why conventional",
        bullets: [
          "Competitive rates and term options",
          "Common choice for primary and secondary residences",
          "Structured options for purchase or refinance",
        ],
      },
      {
        title: "What to expect",
        bullets: [
          "Credit and debt-to-income review",
          "Income and asset verification",
          "Loan structure tailored to monthly payment goals",
        ],
      },
    ],
  },
  "first-time-home-buyer": {
    title: "First-Time Home Buyer",
    navLabel: "First-Time",
    subtitle: "Step-by-step guidance from initial qualification to close.",
    heroImage: "/brand/john_america_fade.png",
    introHeadline: "First home, clear strategy, confident closing",
    introText:
      "We guide buyers through every step, from prep to paperwork to winning the right home.",
    sections: [
      {
        title: "Preparation",
        bullets: [
          "Credit and affordability review",
          "Down payment planning",
          "Clear buying timeline",
        ],
      },
      {
        title: "Execution",
        bullets: [
          "Fast initial qualification support",
          "Offer-ready documentation",
          "Guided closing process",
        ],
      },
    ],
  },
  "fha-loans": {
    title: "FHA Loans",
    navLabel: "FHA",
    subtitle: "Government-backed option with flexible qualification.",
    heroImage: "/brand/john_america_fade.png",
    introHeadline: "FHA for buyers needing flexibility",
    introText:
      "FHA loans can open doors for buyers with lower down payment or non-perfect credit profiles.",
    sections: [
      {
        title: "FHA benefits",
        bullets: [
          "Lower down payment pathways",
          "Flexible credit options",
          "Widely used by first-time buyers",
        ],
      },
      {
        title: "FHA considerations",
        bullets: [
          "Mortgage insurance may apply",
          "Property standards are reviewed",
          "Qualification still depends on full profile",
        ],
      },
    ],
    faqs: [
      {
        question: "Who is FHA best for?",
        answer:
          "Often first-time buyers or borrowers needing more flexible credit/down-payment pathways.",
      },
      {
        question: "Does FHA require mortgage insurance?",
        answer:
          "Yes, mortgage insurance commonly applies. We compare total payment impact versus other options.",
      },
      {
        question: "Can FHA be used in Louisiana and Mississippi?",
        answer:
          "Yes, with normal lender and property eligibility requirements. We confirm fit during initial qualification.",
      },
    ],
  },
  "va-loans": {
    title: "VA Loans",
    navLabel: "VA",
    subtitle: "For eligible veterans and active-duty service members.",
    heroImage: "/brand/john_america_fade.png",
    introHeadline: "Honor your service with the right financing path",
    introText:
      "VA loans can provide strong purchasing power with no PMI and excellent terms for eligible borrowers.",
    sections: [
      {
        title: "VA advantages",
        bullets: [
          "No private mortgage insurance (PMI)",
          "Potential zero-down financing",
          "Competitive rates for eligible borrowers",
        ],
      },
      {
        title: "VA process",
        bullets: [
          "Confirm eligibility/COE",
          "Build the right loan structure",
          "Coordinate approval through closing",
        ],
      },
    ],
    faqs: [
      {
        question: "Do VA loans require PMI?",
        answer:
          "No, eligible VA borrowers do not pay private mortgage insurance.",
      },
      {
        question: "Can VA loans be zero down?",
        answer:
          "Yes, many eligible borrowers can use zero-down financing, subject to lender and property guidelines.",
      },
      {
        question: "How do I start a VA loan application?",
        answer:
          "We begin by confirming eligibility, gathering documents, and structuring the initial qualification plan.",
      },
    ],
  },
  "self-employed-mortgage": {
    title: "Self-Employed Mortgage",
    navLabel: "Self-Employed",
    subtitle: "Mortgage options for business owners and 1099 earners.",
    heroImage: "/brand/outside-box-hero.jpg",
    introHeadline: "Self-employed borrowers need lender-fit strategy",
    introText:
      "We help structure files around your true cash flow and match you with the right lender programs.",
    sections: [
      {
        title: "Program paths",
        bullets: [
          "Bank statement loans",
          "1099-only qualification",
          "Non-QM options where appropriate",
        ],
      },
      {
        title: "Documentation strategy",
        bullets: [
          "Income story clarity",
          "Asset positioning",
          "Approval-focused file packaging",
        ],
      },
    ],
  },
  "louisiana-mortgage-broker": {
    title: "Louisiana Mortgage Broker",
    navLabel: "Louisiana",
    subtitle: "Local mortgage guidance across Louisiana.",
    heroImage: "/brand/john_america_fade.png",
    introHeadline: "Local Louisiana mortgage support",
    introText:
      "From initial qualification to close, we help buyers move quickly and confidently in Louisiana markets.",
    sections: [
      {
        title: "How we help",
        bullets: [
          "Fast initial qualification support",
          "Lender option comparison",
          "Clear communication with all parties",
        ],
      },
      {
        title: "Who this fits",
        bullets: [
          "First-time buyers",
          "Move-up buyers",
          "Refinance and investor scenarios",
        ],
      },
    ],
  },
  "mississippi-mortgage-broker": {
    title: "Mississippi Mortgage Broker",
    navLabel: "Mississippi",
    subtitle: "Local mortgage guidance across Mississippi.",
    heroImage: "/brand/john_america_fade.png",
    introHeadline: "Local Mississippi mortgage support",
    introText:
      "We help buyers and homeowners evaluate loan options and close with confidence.",
    sections: [
      {
        title: "How we help",
        bullets: [
          "Initial qualification and purchase support",
          "Refinance strategy and options",
          "Multiple lender comparison",
        ],
      },
      {
        title: "What you get",
        bullets: [
          "Clear next steps",
          "Responsive communication",
          "Guided process from start to close",
        ],
      },
    ],
  },
};

export function generateStaticParams() {
  return Object.keys(pages).map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const page = pages[slug];
  if (!page) return { title: "Not Found" };

  return {
    title: `${page.title} | Nola Rate`,
    description: page.subtitle,
  };
}

export default async function SolutionPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const page = pages[slug];
  if (!page) notFound();
  const faqSchema =
    page.faqs && page.faqs.length
      ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: page.faqs.map((faq) => ({
            "@type": "Question",
            name: faq.question,
            acceptedAnswer: {
              "@type": "Answer",
              text: faq.answer,
            },
          })),
        }
      : null;

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_15%_20%,#ffffff_0%,#dbe8fb_37%,#f6f7fb_80%)]">
      <div className="mx-auto max-w-6xl px-6 py-10 md:px-8 md:py-14">
        <SiteHeader />
      </div>

      <section className="relative h-[280px] md:h-[540px]">
        <Image src={page.heroImage} alt={page.title} fill className="object-cover" />
        <div className="absolute inset-0 bg-black/20" />
        <div className="absolute inset-0 grid place-items-center">
          <h1 className="px-4 text-center text-4xl font-bold text-white md:text-6xl">{page.title}</h1>
        </div>
      </section>

      <main className="mx-auto max-w-7xl px-6 py-12 md:px-8">
        <section className="text-center">
          <h2 className="text-5xl font-bold text-[#071c4e]">{page.introHeadline}</h2>
          <p className="mx-auto mt-3 max-w-5xl text-2xl leading-10 text-[#667790]">{page.introText}</p>
        </section>

        <section className={`mt-10 grid gap-8 ${page.sections.length >= 4 ? "md:grid-cols-2 xl:grid-cols-4" : page.sections.length === 3 ? "md:grid-cols-3" : "md:grid-cols-2"}`}>
          {page.sections.map((section) => (
            <article key={section.title} className="rounded-xl bg-white p-6 shadow-sm ring-1 ring-[#e7eaf2]">
              <h3 className="text-4xl font-bold text-[#071c4e]">{section.title}</h3>
              <ul className="mt-4 list-disc space-y-2 pl-5 text-xl leading-9 text-[#667790]">
                {section.bullets.map((bullet) => (
                  <li key={bullet}>{bullet}</li>
                ))}
              </ul>
            </article>
          ))}
        </section>

        {page.faqs && page.faqs.length > 0 && (
          <section className="mt-10 rounded-xl bg-white p-6 shadow-sm ring-1 ring-[#e7eaf2]">
            <h2 className="text-3xl font-bold text-[#071c4e]">Frequently Asked Questions</h2>
            <div className="mt-4 space-y-4">
              {page.faqs.map((faq) => (
                <article key={faq.question} className="rounded-lg border border-[#e6ebf5] p-4">
                  <h3 className="text-xl font-semibold text-[#102a52]">{faq.question}</h3>
                  <p className="mt-1 text-[#5d6d86]">{faq.answer}</p>
                </article>
              ))}
            </div>
          </section>
        )}

        <section className="mt-10 rounded-xl bg-white p-6 shadow-sm ring-1 ring-[#e7eaf2]">
          <p className="text-center text-3xl text-[#071c4e]">
            Text/call: <a href="tel:+14692262429" className="text-[#129bd0]">469.226.2429</a>
          </p>
        </section>
      </main>
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}
    </div>
  );
}

