# 🧠 Project Identity: Nola Rate

This repository is **Nola Rate** — a mortgage lead generation and conversion platform.

---

This project MUST ONLY use:
- John's GitHub account
- John's Vercel organization
- John's Supabase project
- John's OpenAI keys

Never use Party Swami credentials or infrastructure.

## 🚨 HARD PROJECT BOUNDARY (CRITICAL)

You are working ONLY in this project.

- Root directory: `C:\Users\xpone\apps\nola-rate`
- GitHub repo: https://github.com/jcismail/Nola_Rate.git
- Production domain: Managed outside this repository (do not deploy or modify DNS unless explicitly instructed)

### ❌ NEVER DO THIS
- Do NOT access or modify files outside this repository
- Do NOT reference or use code from **Party Swami**
- Do NOT use Party Swami GitHub, domains, APIs, or environment variables
- Do NOT assume shared configs across projects

If uncertain → STOP and ask.

---

## 🧭 Project Context

Nola Rate is:
- Mortgage lead generation platform
- Focused on converting visitors into loan applications
- Integrates with:
  - Mortgage CRMs (e.g., HubSpot, Jungo, etc.)
  - Lead funnels and landing pages
  - Marketing automation

Primary goals:
👉 Drive traffic  
👉 Capture leads  
👉 Increase conversion rates  

---

## ⚙️ Tech Stack Assumptions

- Next.js (latest — may include breaking changes)
- Vercel deployments (if used)
- CRM integrations (HubSpot or alternatives)
- Email marketing integrations (Constant Contact, etc.)

---

## ⚠️ Next.js Warning (MANDATORY)

<!-- BEGIN:nextjs-agent-rules -->
This is NOT the Next.js you know.

This version may include breaking changes:
- APIs may differ
- File structure may differ
- Conventions may differ

Before writing or modifying code:
👉 Read relevant docs in:
`node_modules/next/dist/docs/`

Always heed deprecation warnings.
<!-- END:nextjs-agent-rules -->

---

## 🌐 Deployment Rules

-  Production domain: Managed outside this repository (do not deploy or modify DNS unless explicitly instructed)
- All deployments must be validated before going live
- Do NOT assume staging configuration from other projects

---

## 🧩 Environment Isolation

This project has its own:

- `.env.local`
- CRM API keys
- Email marketing configs
- Hosting configuration

### NEVER:
- Reuse environment variables from Party Swami
- Mix environments between projects
- Share API credentials across projects

---

## 🧠 Agent Behavior Rules

Before making changes:

1. Confirm working directory is:
   `nola-rate`
2. Read:
   - `AGENTS.md`
   - `README.md`
3. Validate:
   - Git remote is correct
   - Branch is correct

If anything is unclear → ASK.

---

## 🛑 Safety Rule

If there is ANY chance you are:
- In the wrong repo
- Using the wrong GitHub
- Mixing with Party Swami

👉 STOP immediately and ask for clarification.

---

## ✅ Summary

You are operating inside:

👉 Nola Rate ONLY  
👉 This repo ONLY  
👉 This environment ONLY  

No cross-project assumptions. Ever.

# 🚨 SUPABASE ENVIRONMENT RESTRICTIONS (CRITICAL)

All agents, Codex sessions, Claude sessions, scripts, automations, previews, local development servers, and deployments MUST follow these rules exactly.

---

# 🔐 REQUIRED SUPABASE ACCOUNT

Agents MUST always use:

- John's GitHub-linked Supabase account credentials
- The official Nola_Rate Supabase organization/project only

Agents MUST NOT:
- Create new Supabase organizations
- Create personal Supabase projects
- Use temporary Supabase projects
- Use any Supabase project outside the approved Nola_Rate environment

---

# 🧪 DEVELOPMENT + PREVIEW ENVIRONMENT

The following Supabase project/database MUST be used for:

- Local development
- Development servers
- Vercel preview deployments
- Feature branches
- Worktrees
- Stage testing
- QA testing
- AI testing
- Experimental development

## Approved Development Database

Project Name:
`Nola_Rate`

Database Environment:
`Nola_Rate_Dev`

Supabase URL:
`https://tythlslvjxydxxezmajf.supabase.co`

Publishable Key:
`sb_publishable_4-Y2dvSiYhrgOt3pHra5Fw_3-XfpbAK`

---

# 🚀 PRODUCTION ENVIRONMENT

The following MUST ONLY be used for production deployments.

## Approved Production Database

Project Name:
`Nola_Rate`

Database Environment:
`Nola_Rate_Prod`

Supabase URL:
`https://vfgsunjardkdimkbysrv.supabase.co`

Publishable Key:
`sb_publishable_Uctd4fMHmvVlkgb85VdLWg_R2tJ1hRs`

---

# 🚫 PROHIBITED ACTIONS

Agents MUST NEVER:

- Point local development to production
- Point preview deployments to production
- Run destructive migrations against production
- Seed fake/test data into production
- Use production credentials for feature branches
- Create additional Supabase projects without explicit approval
- Modify production environment variables during development work
- Hardcode Supabase secrets into source code
- Commit service role keys into GitHub

---

# ✅ REQUIRED ENVIRONMENT RULES

## Local Development + Preview Deployments

MUST use:

```env
NEXT_PUBLIC_SUPABASE_URL=https://tythlslvjxydxxezmajf.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=sb_publishable_4-Y2dvSiYhrgOt3pHra5Fw_3-XfpbAK