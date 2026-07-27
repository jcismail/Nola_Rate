"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { applicationUrl } from "@/lib/application";

function currency(value: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);
}

function numberValue(value: string) {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : 0;
}

export default function MortgageCalculator() {
  const [homePrice, setHomePrice] = useState("400000");
  const [downPayment, setDownPayment] = useState("40000");
  const [interestRate, setInterestRate] = useState("6.75");
  const [loanTerm, setLoanTerm] = useState("30");
  const [taxes, setTaxes] = useState("450");
  const [insurance, setInsurance] = useState("175");
  const [hoa, setHoa] = useState("0");

  const result = useMemo(() => {
    const principal = Math.max(numberValue(homePrice) - numberValue(downPayment), 0);
    const months = Math.max(numberValue(loanTerm) * 12, 1);
    const monthlyRate = numberValue(interestRate) / 100 / 12;
    const principalAndInterest =
      monthlyRate === 0
        ? principal / months
        : (principal * monthlyRate * (1 + monthlyRate) ** months) /
          ((1 + monthlyRate) ** months - 1);
    const monthlyTaxes = Math.max(numberValue(taxes), 0);
    const monthlyInsurance = Math.max(numberValue(insurance), 0);
    const monthlyHoa = Math.max(numberValue(hoa), 0);
    const total = principalAndInterest + monthlyTaxes + monthlyInsurance + monthlyHoa;

    return {
      principal,
      principalAndInterest,
      total,
      monthlyTaxes,
      monthlyInsurance,
      monthlyHoa,
    };
  }, [downPayment, hoa, homePrice, insurance, interestRate, loanTerm, taxes]);

  const inputClass = "rounded-lg border border-[#e2d6b5] px-3 py-2.5";

  return (
    <section className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
      <form className="grid gap-4 rounded-2xl bg-white p-6 shadow-sm ring-1 ring-[#e5dcc0] md:p-8">
        <div>
          <h2 className="text-2xl font-bold text-[#121e5b]">Estimate Payment</h2>
          <p className="mt-2 text-[#4c5265]">
            A quick principal, interest, tax, insurance, and HOA estimate.
          </p>
        </div>

        <label className="grid gap-1 text-sm font-semibold text-[#172033]">
          Home Price
          <input
            className={inputClass}
            inputMode="decimal"
            value={homePrice}
            onChange={(event) => setHomePrice(event.target.value)}
          />
        </label>
        <label className="grid gap-1 text-sm font-semibold text-[#172033]">
          Down Payment
          <input
            className={inputClass}
            inputMode="decimal"
            value={downPayment}
            onChange={(event) => setDownPayment(event.target.value)}
          />
        </label>
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="grid gap-1 text-sm font-semibold text-[#172033]">
            Interest Rate
            <input
              className={inputClass}
              inputMode="decimal"
              value={interestRate}
              onChange={(event) => setInterestRate(event.target.value)}
            />
          </label>
          <label className="grid gap-1 text-sm font-semibold text-[#172033]">
            Loan Term
            <select
              className={`${inputClass} bg-white`}
              value={loanTerm}
              onChange={(event) => setLoanTerm(event.target.value)}
            >
              <option value="30">30 years</option>
              <option value="20">20 years</option>
              <option value="15">15 years</option>
              <option value="10">10 years</option>
            </select>
          </label>
        </div>
        <div className="grid gap-4 sm:grid-cols-3">
          <label className="grid gap-1 text-sm font-semibold text-[#172033]">
            Monthly Taxes
            <input
              className={inputClass}
              inputMode="decimal"
              value={taxes}
              onChange={(event) => setTaxes(event.target.value)}
            />
          </label>
          <label className="grid gap-1 text-sm font-semibold text-[#172033]">
            Insurance
            <input
              className={inputClass}
              inputMode="decimal"
              value={insurance}
              onChange={(event) => setInsurance(event.target.value)}
            />
          </label>
          <label className="grid gap-1 text-sm font-semibold text-[#172033]">
            HOA
            <input
              className={inputClass}
              inputMode="decimal"
              value={hoa}
              onChange={(event) => setHoa(event.target.value)}
            />
          </label>
        </div>
      </form>

      <aside className="rounded-2xl bg-[#121e5b] p-6 text-white shadow-xl shadow-[#121e5b]/20 md:p-8">
        <p className="text-xs font-semibold uppercase tracking-wide text-[#ffd534]">
          Estimated Monthly Payment
        </p>
        <p className="mt-3 text-5xl font-bold">{currency(result.total)}</p>
        <div className="mt-6 space-y-3 text-sm">
          <div className="flex justify-between border-b border-white/15 pb-2">
            <span>Loan Amount</span>
            <strong>{currency(result.principal)}</strong>
          </div>
          <div className="flex justify-between border-b border-white/15 pb-2">
            <span>Principal & Interest</span>
            <strong>{currency(result.principalAndInterest)}</strong>
          </div>
          <div className="flex justify-between border-b border-white/15 pb-2">
            <span>Taxes</span>
            <strong>{currency(result.monthlyTaxes)}</strong>
          </div>
          <div className="flex justify-between border-b border-white/15 pb-2">
            <span>Insurance</span>
            <strong>{currency(result.monthlyInsurance)}</strong>
          </div>
          <div className="flex justify-between">
            <span>HOA</span>
            <strong>{currency(result.monthlyHoa)}</strong>
          </div>
        </div>
        <p className="mt-6 text-sm leading-6 text-white/75">
          This estimate is for planning only. Actual payment, rate, taxes, insurance,
          and approval terms depend on lender review and final loan details.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <a
            href={applicationUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-lg bg-white px-5 py-2.5 text-sm font-semibold text-[#121e5b] hover:bg-[#fff5c7]"
          >
            Apply Now
          </a>
          <Link
            href="/rate-quote"
            className="rounded-lg border border-white/40 px-5 py-2.5 text-sm font-semibold text-white hover:bg-white hover:text-[#121e5b]"
          >
            Request Rate Quote
          </Link>
        </div>
      </aside>
    </section>
  );
}
