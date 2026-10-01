-- Supabase backend for the boarding-house owner dashboard.
-- Apply this file in Supabase Dashboard > SQL Editor or with supabase db push.

create extension if not exists pgcrypto;

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text not null default '',
  role text not null default 'tenant' check (role in ('owner', 'manager', 'tenant')),
  created_at timestamptz not null default now()
);

create or replace function public.create_profile_for_auth_user()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  insert into public.profiles (id, full_name, role)
  values (new.id, coalesce(new.raw_user_meta_data ->> 'full_name', ''), 'tenant')
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created_profile on auth.users;
create trigger on_auth_user_created_profile
  after insert on auth.users
  for each row execute procedure public.create_profile_for_auth_user();

create table if not exists public.properties (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null references public.profiles(id) on delete restrict,
  name text not null default 'Nhà trọ của tôi',
  address text not null default '',
  created_at timestamptz not null default now()
);

create table if not exists public.property_members (
  property_id uuid not null references public.properties(id) on delete cascade,
  user_id uuid not null references public.profiles(id) on delete cascade,
  role text not null check (role in ('owner', 'manager')),
  created_at timestamptz not null default now(),
  primary key (property_id, user_id)
);

create or replace function public.add_owner_to_new_property()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  insert into public.property_members (property_id, user_id, role)
  values (new.id, new.owner_id, 'owner')
  on conflict (property_id, user_id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_property_created_add_owner on public.properties;
create trigger on_property_created_add_owner
  after insert on public.properties
  for each row execute procedure public.add_owner_to_new_property();

-- This preserves the current owner UI data shape while moving persistence to PostgreSQL.
create table if not exists public.rental_data (
  property_id uuid primary key references public.properties(id) on delete cascade,
  data jsonb not null default '{}'::jsonb,
  updated_by uuid references public.profiles(id) on delete set null,
  updated_at timestamptz not null default now()
);

create or replace function public.is_property_manager(target_property uuid)
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (
    select 1
    from public.property_members pm
    where pm.property_id = target_property
      and pm.user_id = (select auth.uid())
      and pm.role in ('owner', 'manager')
  );
$$;

alter table public.profiles enable row level security;
alter table public.properties enable row level security;
alter table public.property_members enable row level security;
alter table public.rental_data enable row level security;

revoke all on public.profiles, public.properties, public.property_members, public.rental_data from anon, authenticated;
grant select on public.profiles to authenticated;
grant select, insert on public.properties to authenticated;
grant select, insert on public.property_members to authenticated;
grant select, insert, update on public.rental_data to authenticated;

drop policy if exists "users read own profile" on public.profiles;
create policy "users read own profile" on public.profiles
  for select to authenticated using (id = (select auth.uid()));

drop policy if exists "owner or assigned manager reads property" on public.properties;
create policy "owner or assigned manager reads property" on public.properties
  for select to authenticated
  using (owner_id = (select auth.uid()) or public.is_property_manager(id));

drop policy if exists "owners create their own property" on public.properties;
create policy "owners create their own property" on public.properties
  for insert to authenticated
  with check (
    owner_id = (select auth.uid())
    and exists (select 1 from public.profiles p where p.id = (select auth.uid()) and p.role = 'owner')
  );

drop policy if exists "members read their membership" on public.property_members;
create policy "members read their membership" on public.property_members
  for select to authenticated
  using (user_id = (select auth.uid()) or public.is_property_manager(property_id));

drop policy if exists "owner adds property members" on public.property_members;
create policy "owner adds property members" on public.property_members
  for insert to authenticated
  with check (
    exists (
      select 1 from public.properties p
      where p.id = property_id and p.owner_id = (select auth.uid())
    )
    and (role = 'manager' or (role = 'owner' and user_id = (select auth.uid())))
  );

drop policy if exists "property managers read rental data" on public.rental_data;
create policy "property managers read rental data" on public.rental_data
  for select to authenticated using (public.is_property_manager(property_id));

drop policy if exists "property managers create rental data" on public.rental_data;
create policy "property managers create rental data" on public.rental_data
  for insert to authenticated
  with check (public.is_property_manager(property_id) and updated_by = (select auth.uid()));

drop policy if exists "property managers update rental data" on public.rental_data;
create policy "property managers update rental data" on public.rental_data
  for update to authenticated
  using (public.is_property_manager(property_id))
  with check (public.is_property_manager(property_id) and updated_by = (select auth.uid()));

create index if not exists property_members_user_id_idx on public.property_members(user_id);
