-- Nola Rate core schema
-- Source: docs/NOLARATE_DATABASE_DESIGN.md

-- Ensure required extension is available for gen_random_uuid()
create extension if not exists pgcrypto;

-- Keep updated_at fresh on update
create or replace function set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

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

create table if not exists borrower_documents (
  id uuid primary key default gen_random_uuid(),
  borrower_id uuid references borrowers(id) on delete cascade,
  document_type text not null,
  file_path text,
  status text default 'missing',
  created_at timestamptz default now()
);

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

create table if not exists audit_logs (
  id uuid primary key default gen_random_uuid(),
  actor_type text,
  action_type text not null,
  input jsonb,
  output jsonb,
  status text,
  created_at timestamptz default now()
);

-- Helpful indexes
create index if not exists idx_borrowers_email on borrowers(email);
create index if not exists idx_borrowers_created_at on borrowers(created_at desc);
create index if not exists idx_loan_applications_borrower_id on loan_applications(borrower_id);
create index if not exists idx_borrower_documents_borrower_id on borrower_documents(borrower_id);
create index if not exists idx_ai_actions_borrower_id on ai_actions(borrower_id);
create index if not exists idx_audit_logs_created_at on audit_logs(created_at desc);

-- Triggers for updated_at maintenance
drop trigger if exists trg_borrowers_set_updated_at on borrowers;
create trigger trg_borrowers_set_updated_at
before update on borrowers
for each row
execute function set_updated_at();

drop trigger if exists trg_loan_applications_set_updated_at on loan_applications;
create trigger trg_loan_applications_set_updated_at
before update on loan_applications
for each row
execute function set_updated_at();
