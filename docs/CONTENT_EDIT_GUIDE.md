# Content Edit Guide

## Primary Files

- Homepage copy/layout: `src/app/page.tsx`
- Loan detail pages: `src/app/solutions/[slug]/page.tsx`
- Realtor page: `src/app/realtor-partner/page.tsx`
- Contact page: `src/app/contact/page.tsx`
- Review page: `src/app/review-us/page.tsx`
- Legal footer copy: `src/app/page.tsx`

## Key Variables To Update

- Calendly URL:
  - `.env.local` -> `NEXT_PUBLIC_CALENDLY_URL`
- Resend email delivery:
  - `.env.local` -> `RESEND_API_KEY`, `LEAD_TO_EMAIL`, optional `LEAD_FROM_EMAIL`
- Contact details:
  - `src/app/contact/page.tsx` (`phone`, `email`, service area)

## Lead Flow

- Forms POST to: `src/app/api/leads/route.ts`
- Local backup lead log: `data/leads.jsonl`
- Honeypot field: `company_website` (do not remove)
- Rate limiting is enabled in the API route

## Before Editing Compliance Copy

- Keep NMLS/license disclosures consistent across pages
- Avoid specific rate claims unless compliance-approved
- Re-review footer legal block after any major content changes
