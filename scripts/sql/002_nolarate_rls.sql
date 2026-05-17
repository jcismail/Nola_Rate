-- Nola Rate RLS baseline
-- Apply after 001_nolarate_core_schema.sql

-- Enable RLS on all application tables
alter table borrowers enable row level security;
alter table loan_applications enable row level security;
alter table borrower_documents enable row level security;
alter table ai_actions enable row level security;
alter table audit_logs enable row level security;

-- ANON: no access by default (intentionally no policies for anon)

-- AUTHENTICATED: broad app access for internal dashboard usage
-- Tighten later with user/tenant scoping as auth model evolves.
create policy borrowers_authenticated_all
on borrowers
for all
to authenticated
using (true)
with check (true);

create policy loan_applications_authenticated_all
on loan_applications
for all
to authenticated
using (true)
with check (true);

create policy borrower_documents_authenticated_all
on borrower_documents
for all
to authenticated
using (true)
with check (true);

create policy ai_actions_authenticated_all
on ai_actions
for all
to authenticated
using (true)
with check (true);

create policy audit_logs_authenticated_all
on audit_logs
for all
to authenticated
using (true)
with check (true);

-- SERVICE ROLE bypasses RLS automatically in Supabase.
-- No explicit policies are required for service_role.
