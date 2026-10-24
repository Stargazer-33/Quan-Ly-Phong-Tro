-- Store the expanded lease agreement fields without breaking existing contracts.
alter table public.rental_contracts
  add column if not exists terms jsonb not null default '{}'::jsonb;
