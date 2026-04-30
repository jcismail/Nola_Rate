# John Onboarding Steps

Use this checklist to move from demo mode to live-ready configuration.

## 1) Resend Setup

1. Create/activate Resend account.
2. Verify sending domain or sender identity.
3. Add to `.env.local`:

```env
RESEND_API_KEY=...
LEAD_TO_EMAIL=...
LEAD_FROM_EMAIL=...
```

4. Submit each form once and confirm email delivery.

## 2) Calendly Setup

1. Create/confirm event type in Calendly.
2. Add to `.env.local`:

```env
NEXT_PUBLIC_CALENDLY_URL=https://calendly.com/<john-handle>/<event-name>
```

3. Restart local server and verify all scheduling CTAs.

## 3) Google Review Link

1. Copy direct Google Business Profile review URL.
2. Replace placeholder in:
   - `src/app/review-us/page.tsx`

## 4) Contact Details

Update final phone/email/service areas in:
- `src/app/contact/page.tsx`

## 5) Compliance Review

Before production:
- Confirm NMLS/license IDs are final.
- Confirm state-specific disclosure language.
- Confirm marketing claims/rate statements.
- Obtain final legal/compliance signoff.

## 6) Validation Pass

Run:

```bash
npm run lint
npm run build
```

Then test:
- Homepage forms
- Contact/Realtor forms
- Thank-you routes
- Key solution pages
- Footer disclosures on mobile
