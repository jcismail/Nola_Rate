# Gulf South Insurance Demo

Conversion-focused demo site for insurers serving Louisiana and Mississippi.

## Project Focus

- Service lines: Home, Auto, Flood, and Business insurance
- Primary goal: lead generation demo (quote + advisor call forms)
- Secondary goal: stage environment demos before stakeholder review

## Tech Stack

- Next.js (App Router)
- TypeScript
- Tailwind CSS v4

## Local Development

1. Install dependencies:
`npm install`

2. Start development server:
`npm run dev`

3. Open:
`http://localhost:3000`

## Stage Alias Workflow

After any stage preview build/push for QA, repoint stage domain:

`npm run stage:alias`

Optional env overrides:

- `STAGE_BRANCH`
- `STAGE_SOURCE_ALIAS`
- `STAGE_DOMAIN` (default: `stage.partyswami.com`)
- `VERCEL_SCOPE` (default: `xponetials-projects`)

## Launch Notes

This repo is demo-first. Before production launch, add:
- Licensed agency and state-specific compliance disclosures
- Real backend/CRM integration for form submissions
- Analytics and conversion tracking
