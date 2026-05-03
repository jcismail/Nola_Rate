# Launch Flags Guide

Use these flags to safely control stage/production behavior without code edits.

## Public Runtime Values

These are safe to expose to the browser (`NEXT_PUBLIC_`):

```env
NEXT_PUBLIC_CALENDLY_URL=
NEXT_PUBLIC_CONTACT_PHONE=
NEXT_PUBLIC_CONTACT_EMAIL=
NEXT_PUBLIC_REVIEW_URL=
```

Recommended usage:

1. Stage: point to test-safe contact/review values if needed.
2. Production: point to final John-approved values.

## Server-Only Values

These must be kept secret (set in Vercel env vars only):

```env
RESEND_API_KEY=
LEAD_TO_EMAIL=
LEAD_FROM_EMAIL=
ATTIO_API_KEY=
ATTIO_WORKSPACE_ID=
ATTIO_LIST_ID=
```

## Feature Flags

```env
ATTIO_ENABLED=false
```

Behavior:

1. `ATTIO_ENABLED=false`
- Attio sync is disabled.
- Lead capture still stores locally and can still email via Resend.

2. `ATTIO_ENABLED=true`
- Attio sync attempts on each lead submission.
- Fail-safe mode: if Attio fails, lead capture still succeeds.

## Recommended Cutover Sequence

1. Set all `NEXT_PUBLIC_*` values for stage.
2. Validate forms and footer disclosure output.
3. Set Resend values and verify lead emails.
4. Keep `ATTIO_ENABLED=false` until Attio creds are confirmed.
5. Enable `ATTIO_ENABLED=true` in stage and test one lead.
6. Promote same configuration pattern to production.
