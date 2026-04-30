# AGENTS

## Stage Deployment Alias Rule (Permanent)

After any stage preview build/push intended for QA, always repoint the public stage domain:

`stage.partyswami.com` -> latest `stage/*` preview deployment.

Use:

`npm run stage:alias`

Optional overrides:

- `STAGE_BRANCH`
- `STAGE_SOURCE_ALIAS`
- `STAGE_DOMAIN` (default: `stage.partyswami.com`)
- `VERCEL_SCOPE` (default: `xponetials-projects`)

