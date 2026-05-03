# John Stage/Production Handoff

This document covers everything needed to move Texas Rate from local/demo to stage and production under John's ownership.

Last updated: May 3, 2026 (America/Chicago)

## 1) Current Stack Used In This Repo

- Frontend/App: Next.js 16 + React 19 + TypeScript
- Hosting target: Vercel
- Form notification email: Resend API
- Scheduling links: Calendly
- Source control: GitHub

## 2) Accounts John Needs

## Core Accounts (Required)

1. GitHub account/org access
- Purpose: own repository, branch protection, CI workflows
- Sign up: https://github.com/signup

2. Vercel account/team
- Purpose: stage/prod deployments, environment variables, domains
- Sign up: https://vercel.com/signup
- Pricing page: https://vercel.com/pricing

3. Resend account
- Purpose: transactional lead notification emails from `/api/leads`
- Sign up: https://resend.com/signup
- Pricing page: https://resend.com/pricing

4. Calendly account
- Purpose: booking links used in header and CTA buttons
- Sign up: https://calendly.com/signup
- Pricing page: https://calendly.com/pricing

## Business/Operations Accounts (Strongly Recommended)

5. Domain registrar/DNS provider account (where John's domain is managed)
- Purpose: point stage/prod domains to Vercel

6. Google Business Profile access
- Purpose: real review URL for `/review-us`
- Info: https://www.google.com/business/

7. Attio (CRM) account
- Purpose: central lead pipeline, assignment, and follow-up workflow
- Sign up: https://attio.com/
- Pricing page: https://attio.com/pricing

## 3) Keys/Settings John Must Replace

These are the active environment variables in this codebase:

```env
RESEND_API_KEY=
LEAD_TO_EMAIL=
LEAD_FROM_EMAIL=
NEXT_PUBLIC_CALENDLY_URL=
```

Where used:
- `src/app/api/leads/route.ts`
  - `RESEND_API_KEY`
  - `LEAD_TO_EMAIL`
  - `LEAD_FROM_EMAIL` (falls back to `leads@updates.gulfrate.com` if unset)
- `src/components/site/SiteHeader.tsx`
- `src/app/page.tsx`
- `src/app/book-call/page.tsx`
  - `NEXT_PUBLIC_CALENDLY_URL`

## Required replacements before stage/prod

1. `RESEND_API_KEY`
- Replace with John's own Resend API key (never reuse shared keys).

2. `LEAD_TO_EMAIL`
- Set destination inbox for incoming leads (for example John's monitored operations inbox).

3. `LEAD_FROM_EMAIL`
- Set to a sender on a domain verified in Resend (SPF/DKIM aligned).

4. `NEXT_PUBLIC_CALENDLY_URL`
- Set to John's real Calendly event URL.

## Content values to finalize

1. Contact email in `src/app/contact/page.tsx` (`john@example.com` still present)
2. Google review final URL in `src/app/review-us/page.tsx`
3. Any remaining "Coming Soon" labels in realtor-partner assets

## 4) Pricing Snapshot (Official Pages)

Pricing can change. Confirm on linked pages before purchase.

## Vercel (from vercel.com/pricing on May 3, 2026)

- Hobby: Free
- Pro: `$20/mo + additional usage` (includes `$20 usage credit`)
- Enterprise: custom

Reference:
- https://vercel.com/pricing

## Resend (from resend.com/pricing on May 3, 2026)

- Free: `$0/mo`, `3,000 emails/mo`, `100/day`
- Pro: `$20/mo`, `50,000 emails/mo`, overage `$0.90 / 1,000`
- Scale: `$90/mo`, `100,000 emails/mo`, overage `$0.90 / 1,000`
- Enterprise: custom
- Dedicated IP add-on listed: `$30/mo` (eligibility applies)

Reference:
- https://resend.com/pricing

## Calendly (from calendly.com/pricing on May 3, 2026)

- Free: `Always free`
- Standard: `$10/seat/mo` (yearly billing view)
- Teams: `$16/seat/mo` (yearly billing view)
- Enterprise: starts at `$15k/yr`

Reference:
- https://calendly.com/pricing

## 5) Stage + Production Deployment Checklist

1. GitHub
- Ensure repo ownership/access is correct.
- Protect `main` branch and require PR checks.

2. Vercel project setup
- Import `Texas_Rate` repo.
- Create two environments at minimum:
  - Preview/Stage (Preview)
  - Production

3. Environment variables in Vercel
- Add all required env vars for Preview and Production.
- Use different values where needed (for example lead inbox).

4. Resend setup
- Verify sending domain.
- Configure SPF/DKIM/DMARC at DNS host.
- Test one lead submission in stage.

5. Domain setup
- Add production domain in Vercel.
- Add optional stage domain/subdomain.
- Update DNS records to Vercel targets.

6. Smoke test
- Run `npm run lint`
- Run `npm run compliance:check`
- Verify all form flows + thank-you routes
- Confirm footer disclosures/logos on mobile and desktop

7. Compliance package
- Capture screenshots and final copy.
- Submit to C2 Advertising for written approval before dissemination.

## 6) Security and Ownership Notes

1. Rotate all credentials when transferring ownership.
2. Never commit secrets into git.
3. Store production secrets only in Vercel env vars (and password manager).
4. Keep separate sender identities and lead inboxes for stage vs production when feasible.

## 7) Optional Next Integrations (Not yet in code)

- CRM direct posting (HubSpot/Jungo/webhook)
- Attio CRM integration (recommended)
- Analytics (GA4, Meta pixel, call tracking)
- Bot protection upgrade (Turnstile/reCAPTCHA)

If these are added later, update `.env.example` and this handoff doc in the same PR.

## 8) Attio Recommendation (Suggested CRM Path)

Attio is a strong fit if John wants a modern, flexible CRM with lightweight setup and clear pipeline ownership.

Suggested implementation approach:

1. Start with email lead delivery in place (current Resend flow).
2. Add a server-side API step in `src/app/api/leads/route.ts` to create/update contacts in Attio.
3. Map lead types (`rate_quote`, `strategy_call`, etc.) to Attio pipeline stages.
4. Store Attio credentials in Vercel env vars (stage/prod separated).
5. Keep Resend notifications as backup until Attio flow is fully validated.

Potential env vars (future):

```env
ATTIO_API_KEY=
ATTIO_WORKSPACE_ID=
ATTIO_LIST_ID=
```
