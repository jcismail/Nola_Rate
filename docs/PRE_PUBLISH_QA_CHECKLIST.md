# Pre-Publish QA Checklist

Use this checklist before sharing any build with John or submitting to C2 Advertising.

## 1) Code Quality Gate

- Run `npm run lint`
- Run `npm run compliance:check`
- Run `npm run test:smoke`
- Run `npm run evidence:pack`
- Confirm no unexpected git changes: `git status`

## 2) Functional Smoke Test

- Homepage loads and main CTAs work
- Solution pages load without errors
- Contact/Realtor forms submit successfully
- Thank-you flow works for each lead type
- `book-call` route behaves correctly with/without Calendly URL

## 3) Disclosure and Compliance QA

- Footer logos are visible:
  - C2 Financial
  - Equal Housing Opportunity
  - NMLS Consumer Access
- Footer includes:
  - Company + MLO NMLS/license identifiers
  - LA/MS service area limitation text
  - FHA/VA disclaimer text
  - LA + MS complaint wording and links
  - Corporate address as final footer line
- No prohibited phrases or misleading claims

## 4) Cross-Device QA

- Desktop: Chrome + Edge
- Mobile: iPhone + Android viewports
- Check spacing/readability for header, forms, and footer disclosure blocks

## 5) Approval Packet Prep

- Capture screenshots of all key public pages
- Save exact published copy/version hash
- Attach supporting rate-sheet context if any rate/payment claims exist
- Submit to C2 Advertising for written approval before dissemination

## 6) Evidence Retention

- Store screenshots, copy, and submission artifacts under `docs/compliance/evidence/`
- Archive written approvals and date stamps
- Keep records for required retention period
