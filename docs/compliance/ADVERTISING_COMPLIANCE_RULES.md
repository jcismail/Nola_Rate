# Nola Rate Advertising Compliance Rules

Source policy:
- `docs/compliance/Advertising P&P 2.2024.pdf`
- extracted text: `docs/compliance/Advertising_PandP_2_2024.extracted.txt`
- copy snippets: `docs/compliance/CONTENT_COMPLIANCE_SNIPPETS.md`

## Required Before Publishing Any Advertising Content

1. Obtain written approval from C2 (`advertising@c2financial.com`) before dissemination.
2. Re-submit any changed website/social content before making it live.
3. Retain ad records for 3 years:
- final ad copy
- rate sheets and lender support
- approval evidence

## Required Web Disclosures (Louisiana and Mississippi Expansion Context)

1. Full company name: `C2 Financial Corporation` (no abbreviation).
2. Company and originator licensing identifiers must be visible.
3. NMLS Consumer Access link is required:
- `https://www.nmlsconsumeraccess.org`
4. State-specific complaint/recovery notice requirements must be verified and added per state guidance.
5. Services availability restriction by state must be shown.
6. FHA/VA statements require broker disclaimer language.

## High-Risk Prohibited Content

1. Government affiliation implications.
2. Superlative/comparative guarantees (for example "best rates", "lowest rate guaranteed").
3. Misleading promises ("your loan is guaranteed", "no cost loan", "skip mortgage payments").
4. AI-generated testimonials or unsubstantiated testimonial claims.
5. Misleading fixed-rate language where rates can adjust.

## Rate / Payment Advertising Rules

1. If rate/finance charge appears, APR must be disclosed with equal prominence.
2. If points are part of the rate, points and impact must be clearly disclosed.
3. Trigger-term ads (down payment, payment amount, finance charge, repayment period) require additional disclosures including APR and repayment terms.

## Engineering Guardrails In This Repo

1. Global disclosure footer:
- `src/components/compliance/ComplianceFooter.tsx`
- rendered in `src/app/layout.tsx`
2. Automated compliance scan:
- `npm run compliance:check`
- script: `scripts/compliance-check.mjs`

## Release Workflow

1. Run `npm run lint`.
2. Run `npm run compliance:check`.
3. Capture screenshots/exported copy of all modified landing pages.
4. Send package to compliance for written approval.
5. Store approval + supporting docs in internal records.

## Notes

- This checklist is an engineering safety net and does not replace legal/compliance review.
- If policy updates are issued, update both this file and `scripts/compliance-check.mjs`.

