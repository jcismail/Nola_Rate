"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { applicationUrl } from "@/lib/application";

type CalculatorMode = "purchase" | "refinance";

function currency(value: number) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(value);
}

function numberValue(value: string) {
  const parsed = Number(value.replace(/[$,%\s]/g, ""));
  return Number.isFinite(parsed) ? parsed : 0;
}

function compactNumber(value: number) {
  return Number.isFinite(value) ? String(Math.round(value * 100) / 100) : "";
}

export default function MortgageCalculator() {
  const [mode, setMode] = useState<CalculatorMode>("purchase");
  const [homePrice, setHomePrice] = useState("");
  const [downPaymentAmount, setDownPaymentAmount] = useState("");
  const [downPaymentPercent, setDownPaymentPercent] = useState("");
  const [refinanceBalance, setRefinanceBalance] = useState("");
  const [interestRate, setInterestRate] = useState("");
  const [loanTerm, setLoanTerm] = useState("30");
  const [taxes, setTaxes] = useState("");
  const [insurance, setInsurance] = useState("");
  const [hoa, setHoa] = useState("");

  function updateHomePrice(value: string) {
    setHomePrice(value);
    const price = numberValue(value);
    if (price > 0 && downPaymentPercent !== "") {
      setDownPaymentAmount(compactNumber((price * numberValue(downPaymentPercent)) / 100));
    }
  }

  function updateDownPaymentAmount(value: string) {
    setDownPaymentAmount(value);
    const price = numberValue(homePrice);
    if (price > 0) setDownPaymentPercent(compactNumber((numberValue(value) / price) * 100));
  }

  function updateDownPaymentPercent(value: string) {
    setDownPaymentPercent(value);
    const price = numberValue(homePrice);
    if (price > 0) setDownPaymentAmount(compactNumber((price * numberValue(value)) / 100));
  }

  const result = useMemo(() => {
    const principal = mode === "purchase"
      ? Math.max(numberValue(homePrice) - numberValue(downPaymentAmount), 0)
      : Math.max(numberValue(refinanceBalance), 0);
    const months = Math.max(numberValue(loanTerm) * 12, 1);
    const monthlyRate = numberValue(interestRate) / 100 / 12;
    const principalAndInterest = monthlyRate === 0
      ? principal / months
      : (principal * monthlyRate * (1 + monthlyRate) ** months) / ((1 + monthlyRate) ** months - 1);
    const monthlyTaxes = Math.max(numberValue(taxes), 0);
    const monthlyInsurance = Math.max(numberValue(insurance), 0);
    const monthlyHoa = Math.max(numberValue(hoa), 0);
    return {
      principal,
      principalAndInterest,
      total: principalAndInterest + monthlyTaxes + monthlyInsurance + monthlyHoa,
      monthlyTaxes,
      monthlyInsurance,
      monthlyHoa,
    };
  }, [downPaymentAmount, hoa, homePrice, insurance, interestRate, loanTerm, mode, refinanceBalance, taxes]);

  const inputClass = "rounded-lg border border-[#e2d6b5] px-3 py-2.5";
  const labelClass = "grid gap-1 text-sm font-semibold text-[#172033]";

  return (
    <section className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
      <form className="grid gap-4 rounded-2xl bg-white p-6 shadow-sm ring-1 ring-[#e5dcc0] md:p-8">
        <div>
          <h2 className="text-2xl font-bold text-[#121e5b]">Estimate Payment</h2>
          <p className="mt-2 text-[#4c5265]">Choose a purchase or refinance estimate, then enter the details that matter most.</p>
        </div>

        <div className="grid grid-cols-2 gap-2 rounded-xl bg-[#f3efdf] p-1.5" role="group" aria-label="Calculator type">
          {(["purchase", "refinance"] as const).map((option) => (
            <button
              key={option}
              type="button"
              aria-pressed={mode === option}
              onClick={() => setMode(option)}
              className={`rounded-lg px-4 py-3 text-sm font-bold capitalize transition ${mode === option ? "bg-[#121e5b] text-white shadow-sm" : "text-[#4c5265] hover:bg-white"}`}
            >
              {option}
            </button>
          ))}
        </div>

        {mode === "purchase" ? (
          <>
            <label className={labelClass}>
              Purchase Price
              <input aria-label="Purchase Price" className={`${inputClass} placeholder:text-slate-400`} inputMode="decimal" value={homePrice} placeholder="e.g. 400,000" onChange={(event) => updateHomePrice(event.target.value)} />
            </label>
            <div className="grid gap-4 sm:grid-cols-2">
              <label className={labelClass}>
                Down Payment Amount
                <input aria-label="Down Payment Amount" className={`${inputClass} placeholder:text-slate-400`} inputMode="decimal" value={downPaymentAmount} placeholder="e.g. 80,000" onChange={(event) => updateDownPaymentAmount(event.target.value)} />
              </label>
              <label className={labelClass}>
                Down Payment Percentage
                <div className="relative">
                  <input aria-label="Down Payment Percentage" className={`${inputClass} w-full pr-9 placeholder:text-slate-400`} inputMode="decimal" value={downPaymentPercent} placeholder="e.g. 20" onChange={(event) => updateDownPaymentPercent(event.target.value)} />
                  <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[#72778a]">%</span>
                </div>
              </label>
            </div>
            <p className="text-xs text-[#5f6270]">Enter either down payment box. The matching dollar amount or percentage updates automatically.</p>
          </>
        ) : (
          <label className={labelClass}>
            Current Loan Balance
            <input aria-label="Current Loan Balance" className={`${inputClass} placeholder:text-slate-400`} inputMode="decimal" value={refinanceBalance} placeholder="e.g. 275,000" onChange={(event) => setRefinanceBalance(event.target.value)} />
          </label>
        )}

        <div className="grid gap-4 sm:grid-cols-2">
          <label className={labelClass}>
            Interest Rate
            <input aria-label="Interest Rate" className={`${inputClass} placeholder:text-slate-400`} inputMode="decimal" value={interestRate} placeholder="e.g. 6.75" onChange={(event) => setInterestRate(event.target.value)} />
          </label>
          <label className={labelClass}>
            Loan Term
            <select aria-label="Loan Term" className={`${inputClass} bg-white`} value={loanTerm} onChange={(event) => setLoanTerm(event.target.value)}>
              <option value="30">30 years</option>
              <option value="20">20 years</option>
              <option value="15">15 years</option>
              <option value="10">10 years</option>
            </select>
          </label>
        </div>

        <details className="rounded-xl border border-[#e2d6b5] bg-[#fffdf3] p-4">
          <summary className="cursor-pointer text-sm font-bold text-[#121e5b]">Optional monthly costs</summary>
          <div className="mt-4 grid gap-4 sm:grid-cols-3">
            <label className={labelClass}>Taxes<input className={inputClass} inputMode="decimal" value={taxes} placeholder="450" onChange={(event) => setTaxes(event.target.value)} /></label>
            <label className={labelClass}>Insurance<input className={inputClass} inputMode="decimal" value={insurance} placeholder="175" onChange={(event) => setInsurance(event.target.value)} /></label>
            <label className={labelClass}>HOA<input className={inputClass} inputMode="decimal" value={hoa} placeholder="0" onChange={(event) => setHoa(event.target.value)} /></label>
          </div>
        </details>

        <p className="text-xs leading-5 text-[#5f6270]">Estimated payment figures do not include potential mortgage insurance and program fees that may affect the total loan amount and monthly payment.</p>
      </form>

      <aside className="rounded-2xl bg-[#121e5b] p-6 text-white shadow-xl shadow-[#121e5b]/20 md:p-8">
        <p className="text-xs font-semibold uppercase tracking-wide text-[#ffd534]">Estimated Monthly Payment</p>
        <p className="mt-3 text-5xl font-bold">{currency(result.total)}</p>
        <div className="mt-6 space-y-3 text-sm">
          <div className="flex justify-between border-b border-white/15 pb-2"><span>{mode === "purchase" ? "Loan Amount" : "Refinance Balance"}</span><strong>{currency(result.principal)}</strong></div>
          <div className="flex justify-between border-b border-white/15 pb-2"><span>Principal &amp; Interest</span><strong>{currency(result.principalAndInterest)}</strong></div>
          <div className="flex justify-between border-b border-white/15 pb-2"><span>Taxes</span><strong>{currency(result.monthlyTaxes)}</strong></div>
          <div className="flex justify-between border-b border-white/15 pb-2"><span>Insurance</span><strong>{currency(result.monthlyInsurance)}</strong></div>
          <div className="flex justify-between"><span>HOA</span><strong>{currency(result.monthlyHoa)}</strong></div>
        </div>
        <p className="mt-6 text-sm leading-6 text-white/75">This estimate is for planning only. Actual payment, rate, taxes, insurance, and approval terms depend on lender review and final loan details.</p>
        <div className="mt-6 flex flex-wrap gap-3">
          <a href={applicationUrl} target="_blank" rel="noopener noreferrer" className="rounded-lg bg-white px-5 py-2.5 text-sm font-semibold text-[#121e5b] hover:bg-[#fff5c7]">Apply Now</a>
          <Link href="/rate-quote" className="rounded-lg border border-white/40 px-5 py-2.5 text-sm font-semibold text-white hover:bg-white hover:text-[#121e5b]">Request Rate Quote</Link>
        </div>
      </aside>
    </section>
  );
}
