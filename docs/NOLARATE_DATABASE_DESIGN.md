# NolaRate Database Design

## Purpose

This database supports NolaRate.com, an AI-assisted mortgage lead and workflow platform for Louisiana and Mississippi.

The database must support:

- Lead capture
- Borrower intake
- AI chat history
- Loan applications
- Document tracking
- CRM sync
- AI action logging
- Compliance audit logs
- Development and production separation

---

# Environment Rules

## Development and Preview

Use:

```env
NEXT_PUBLIC_SUPABASE_URL=https://tythlslvjxydxxezmajf.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=sb_publishable_4-Y2dvSiYhrgOt3pHra5Fw_3-XfpbAK
```

Database:

```txt
Nola_Rate_Dev
```

## Production

Use:

```env
NEXT_PUBLIC_SUPABASE_URL=https://vfgsunjardkdimkbysrv.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=sb_publishable_Uctd4fMHmvVlkgb85VdLWg_R2tJ1hRs
```

Database:

```txt
Nola_Rate_Prod
```

---

# Core Tables

## borrowers

```sql
create table if not exists borrowers (
  id uuid primary key default gen_random_uuid(),
  full_name text,
  email text not null,
  phone text,
  state text check (state in ('LA', 'MS')),
  city text,
  loan_goal text,
  credit_range text,
  income_range text,
  down_payment_range text,
  target_home_price numeric,
  timeline text,
  consent_to_contact boolean default false,
  status text default 'new',
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);
```

## loan_applications

```sql
create table if not exists loan_applications (
  id uuid primary key default gen_random_uuid(),
  borrower_id uuid references borrowers(id) on delete cascade,
  loan_type text,
  application_status text default 'draft',
  ai_summary text,
  ai_recommendation jsonb,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);
```

## borrower_documents

```sql
create table if not exists borrower_documents (
  id uuid primary key default gen_random_uuid(),
  borrower_id uuid references borrowers(id) on delete cascade,
  document_type text not null,
  file_path text,
  status text default 'missing',
  created_at timestamptz default now()
);
```

## ai_actions

```sql
create table if not exists ai_actions (
  id uuid primary key default gen_random_uuid(),
  borrower_id uuid references borrowers(id) on delete set null,
  agent_name text not null,
  action_type text not null,
  payload jsonb,
  status text default 'pending',
  result jsonb,
  created_at timestamptz default now()
);
```

## audit_logs

```sql
create table if not exists audit_logs (
  id uuid primary key default gen_random_uuid(),
  actor_type text,
  action_type text not null,
  input jsonb,
  output jsonb,
  status text,
  created_at timestamptz default now()
);
```

---

# Compliance Rules

AI may:

- Collect borrower intake information
- Summarize borrower data
- Recommend possible next steps
- Draft follow-up messages
- Track missing documents

AI must not:

- Approve loans
- Deny loans
- Lock rates
- Make final underwriting decisions
- Provide legally binding financial advice

All AI recommendations must include this disclaimer:

```txt
This information is educational only and is not a loan approval, underwriting decision, or lending commitment.
```
