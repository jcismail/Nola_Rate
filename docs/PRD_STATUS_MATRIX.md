# Nola Rate PRD Status Matrix

Last updated: May 3, 2026 (America/Chicago)

## Overall Status

- Build/implementation: **Done**
- QA/compliance automation: **Done**
- External approvals + final owner data: **Blocked (waiting on John + C2)**

## Status Legend

- **Done**: Implemented and validated in repo
- **In Progress**: Partially complete, not blocking code readiness
- **Blocked**: Waiting on external owner/compliance input

## Workstream Matrix

| Workstream | Status | Notes | Owner | Next Action |
|---|---|---|---|---|
| Core site revamp pages | Done | Home, solutions, contact, realtor, review, thank-you updated and consistent headers/footers applied | Engineering | None |
| Lead capture API | Done | `/api/leads` stores leads, sends Resend email, includes honeypot + rate limiting | Engineering | None |
| Compliance disclosures/logos | Done | Footer includes required disclosure stack, C2/EHO/NMLS logos, LA/MS complaint links, license identifiers | Engineering | Confirm wording in final C2 signoff packet |
| Compliance policy enforcement | Done | `npm run compliance:check` implemented and passing | Engineering | Maintain rules as policy changes |
| CI quality gates | Done | CI runs lint + compliance + build + smoke tests | Engineering | Monitor CI on future PRs |
| Smoke test coverage | Done | Playwright smoke tests for core routes/footer presence | Engineering | Expand as needed |
| Evidence packaging workflow | Done | Evidence generator + evidence folder + checklist integrated | Engineering | Generate fresh pack per submission |
| Stage/Prod handoff docs | Done | Handoff, launch flags, onboarding, QA checklist documented | Engineering | Share with John |
| Production env/account setup | Blocked | Needs John account ownership and final key values | John | Create accounts and set envs |
| C2 advertising written approval | Blocked | Final written signoff required before dissemination | C2 Advertising + John | Submit screenshots/copy + receive written approval |
| CRM system activation (Attio) | In Progress | Attio scaffold complete but feature disabled by default | John + Engineering | Provide Attio credentials and enable flag in stage |
| Final public contact/review values | Blocked | Needs real contact email/phone and Google review URL | John | Provide values and set env vars |

## Release Readiness Checklist

- [x] `npm run lint` passing
- [x] `npm run compliance:check` passing
- [x] `npm run build` passing
- [x] `npm run test:smoke` passing
- [x] Main branch up to date in GitHub
- [ ] C2 written approval received
- [ ] John production values set
- [ ] Stage verification with John completed

## Top 3 Blocking Items

1. C2 written advertising approval
2. John-provided production values (Calendly, contact, review URL, Resend)
3. Stage environment activation under John's accounts

## Immediate Next Steps (When John Is Available)

1. Review and execute `docs/JOHN_STAGE_PROD_HANDOFF.md`
2. Set stage env vars and validate all forms end-to-end
3. Generate evidence pack (`npm run evidence:pack`) and submit final approval packet to C2

