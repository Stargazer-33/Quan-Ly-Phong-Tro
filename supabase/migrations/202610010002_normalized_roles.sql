-- Normalize the existing owner JSON state into relational tables and add manager/tenant access.
create table if not exists public.rooms (
  property_id uuid not null references public.properties(id) on delete cascade,
  id text not null,
  code text not null,
  name text not null,
  floor text not null default '',
  monthly_rent numeric(12,0) not null default 0 check (monthly_rent >= 0),
  area numeric(8,2) not null default 0 check (area >= 0),
  status text not null default 'available' check (status in ('available','rented','maintenance')),
  primary key (property_id,id),
  unique (property_id,code)
);

create table if not exists public.tenants (
  property_id uuid not null references public.properties(id) on delete cascade,
  id text not null,
  full_name text not null,
  phone text not null default '',
  identity_no text not null default '',
  email text,
  room_id text,
  status text not null default 'active' check (status in ('active','inactive')),
  auth_user_id uuid unique references auth.users(id) on delete set null,
  primary key (property_id,id),
  foreign key (property_id,room_id) references public.rooms(property_id,id) on delete restrict
);

create table if not exists public.staff_members (
  property_id uuid not null references public.properties(id) on delete cascade,
  id text not null,
  full_name text not null,
  phone text not null default '',
  email text not null,
  position text not null default '',
  area text not null default '',
  status text not null default 'active' check (status in ('active','inactive')),
  auth_user_id uuid unique references auth.users(id) on delete set null,
  primary key (property_id,id)
);

create table if not exists public.rental_contracts (
  property_id uuid not null references public.properties(id) on delete cascade,
  id text not null,
  code text not null,
  room_id text not null,
  tenant_id text,
  tenant_name text not null default '',
  deposit numeric(12,0) not null default 0 check (deposit >= 0),
  start_date date not null,
  end_date date not null,
  status text not null default 'active' check (status in ('active','terminated')),
  primary key (property_id,id),
  unique (property_id,code),
  foreign key (property_id,room_id) references public.rooms(property_id,id) on delete restrict,
  foreign key (property_id,tenant_id) references public.tenants(property_id,id) on delete restrict,
  check (end_date >= start_date)
);

create table if not exists public.service_prices (
  property_id uuid not null references public.properties(id) on delete cascade,
  id text not null,
  name text not null,
  unit text not null,
  price numeric(12,0) not null default 0 check (price >= 0),
  primary key (property_id,id)
);

create table if not exists public.utility_readings (
  property_id uuid not null references public.properties(id) on delete cascade,
  id text not null,
  room_id text not null,
  period text not null check (period ~ '^[0-9]{4}-[0-9]{2}$'),
  electricity_previous numeric(12,2) not null default 0,
  electricity_current numeric(12,2) not null default 0,
  water_previous numeric(12,2) not null default 0,
  water_current numeric(12,2) not null default 0,
  primary key (property_id,id),
  unique (property_id,room_id,period),
  foreign key (property_id,room_id) references public.rooms(property_id,id) on delete restrict,
  check (electricity_current >= electricity_previous),
  check (water_current >= water_previous)
);

create table if not exists public.invoices (
  property_id uuid not null references public.properties(id) on delete cascade,
  id text not null,
  code text not null,
  room_id text not null,
  tenant_id text,
  tenant_name text not null default '',
  period text not null check (period ~ '^[0-9]{4}-[0-9]{2}$'),
  rent_amount numeric(12,0) not null default 0 check (rent_amount >= 0),
  electricity_usage numeric(12,2) not null default 0,
  electricity_amount numeric(12,0) not null default 0,
  water_usage numeric(12,2) not null default 0,
  water_amount numeric(12,0) not null default 0,
  service_amount numeric(12,0) not null default 0,
  total_amount numeric(12,0) not null default 0 check (total_amount >= 0),
  due_date date,
  primary key (property_id,id),
  unique (property_id,code),
  unique (property_id,room_id,period),
  foreign key (property_id,room_id) references public.rooms(property_id,id) on delete restrict,
  foreign key (property_id,tenant_id) references public.tenants(property_id,id) on delete restrict
);

create table if not exists public.payments (
  property_id uuid not null,
  id text not null,
  invoice_id text not null,
  amount numeric(12,0) not null check (amount > 0),
  paid_at timestamptz not null default now(),
  method text not null default 'cash',
  note text not null default '',
  primary key (property_id,id),
  foreign key (property_id,invoice_id) references public.invoices(property_id,id) on delete cascade
);

create table if not exists public.expenses (
  property_id uuid not null references public.properties(id) on delete cascade,
  id text not null,
  spent_on date not null,
  name text not null,
  category text not null default 'Khác',
  room_code text not null default '',
  amount numeric(12,0) not null default 0 check (amount >= 0),
  note text not null default '',
  primary key (property_id,id)
);

create table if not exists public.incidents (
  property_id uuid not null references public.properties(id) on delete cascade,
  id text not null,
  code text not null,
  room_id text not null,
  tenant_id text,
  title text not null,
  category text not null default 'Khác',
  severity text not null default 'medium' check (severity in ('low','medium','high')),
  status text not null default 'new' check (status in ('new','processing','resolved')),
  description text not null default '',
  reported_by uuid references auth.users(id) on delete set null,
  created_at timestamptz not null default now(),
  primary key (property_id,id),
  foreign key (property_id,room_id) references public.rooms(property_id,id) on delete restrict,
  foreign key (property_id,tenant_id) references public.tenants(property_id,id) on delete restrict
);

create table if not exists public.property_bootstrap (
  property_id uuid primary key references public.properties(id) on delete cascade,
  initialized_at timestamptz not null default now()
);

create index if not exists tenants_auth_user_id_idx on public.tenants(auth_user_id);
create index if not exists contracts_tenant_idx on public.rental_contracts(property_id,tenant_id);
create index if not exists invoices_tenant_idx on public.invoices(property_id,tenant_id);
create index if not exists invoices_period_idx on public.invoices(property_id,period);
create index if not exists payments_invoice_idx on public.payments(property_id,invoice_id);
create index if not exists incidents_status_idx on public.incidents(property_id,status);

alter table public.rooms enable row level security;
alter table public.tenants enable row level security;
alter table public.staff_members enable row level security;
alter table public.rental_contracts enable row level security;
alter table public.service_prices enable row level security;
alter table public.utility_readings enable row level security;
alter table public.invoices enable row level security;
alter table public.payments enable row level security;
alter table public.expenses enable row level security;
alter table public.incidents enable row level security;
alter table public.property_bootstrap enable row level security;

revoke all on public.rooms, public.tenants, public.staff_members, public.rental_contracts,
  public.service_prices, public.utility_readings, public.invoices, public.payments,
  public.expenses, public.incidents from anon, authenticated;
revoke all on public.property_bootstrap from anon, authenticated;
grant select, insert, update, delete on public.rooms, public.rental_contracts, public.service_prices,
  public.utility_readings, public.invoices, public.payments, public.expenses, public.incidents to authenticated;
grant select, delete on public.tenants, public.staff_members to authenticated;
grant insert (property_id,id,full_name,phone,identity_no,email,room_id,status) on public.tenants to authenticated;
-- PostgREST upsert uses ON CONFLICT DO UPDATE and needs UPDATE rights on every
-- submitted column, including the conflict key. auth_user_id stays server-only.
grant update (property_id,id,full_name,phone,identity_no,email,room_id,status) on public.tenants to authenticated;
grant insert (property_id,id,full_name,phone,email,position,area,status) on public.staff_members to authenticated;
grant update (property_id,id,full_name,phone,email,position,area,status) on public.staff_members to authenticated;
grant select, insert on public.property_bootstrap to authenticated;

drop policy if exists "members read bootstrap marker" on public.property_bootstrap;
create policy "members read bootstrap marker" on public.property_bootstrap for select to authenticated
  using (public.is_property_manager(property_id));
drop policy if exists "members initialize their property once" on public.property_bootstrap;
create policy "members initialize their property once" on public.property_bootstrap for insert to authenticated
  with check (public.is_property_manager(property_id));

drop policy if exists "property managers manage rooms" on public.rooms;
create policy "property managers manage rooms" on public.rooms for all to authenticated
  using (public.is_property_manager(property_id)) with check (public.is_property_manager(property_id));
drop policy if exists "tenants read their room" on public.rooms;
create policy "tenants read their room" on public.rooms for select to authenticated
  using (exists (select 1 from public.tenants t where t.property_id = rooms.property_id
    and t.room_id = rooms.id and t.auth_user_id = (select auth.uid())));

drop policy if exists "property managers manage tenants" on public.tenants;
create policy "property managers manage tenants" on public.tenants for all to authenticated
  using (public.is_property_manager(property_id)) with check (public.is_property_manager(property_id));
drop policy if exists "tenants read own profile" on public.tenants;
create policy "tenants read own profile" on public.tenants for select to authenticated
  using (auth_user_id = (select auth.uid()));

drop policy if exists "property managers manage staff" on public.staff_members;
create policy "property managers manage staff" on public.staff_members for all to authenticated
  using (public.is_property_manager(property_id)) with check (public.is_property_manager(property_id));

drop policy if exists "property managers manage contracts" on public.rental_contracts;
create policy "property managers manage contracts" on public.rental_contracts for all to authenticated
  using (public.is_property_manager(property_id)) with check (public.is_property_manager(property_id));
drop policy if exists "tenants read own contracts" on public.rental_contracts;
create policy "tenants read own contracts" on public.rental_contracts for select to authenticated
  using (exists (select 1 from public.tenants t where t.property_id = rental_contracts.property_id
    and t.id = rental_contracts.tenant_id and t.auth_user_id = (select auth.uid())));

drop policy if exists "property managers manage service prices" on public.service_prices;
create policy "property managers manage service prices" on public.service_prices for all to authenticated
  using (public.is_property_manager(property_id)) with check (public.is_property_manager(property_id));

drop policy if exists "property managers manage utility readings" on public.utility_readings;
create policy "property managers manage utility readings" on public.utility_readings for all to authenticated
  using (public.is_property_manager(property_id)) with check (public.is_property_manager(property_id));
drop policy if exists "tenants read own utility readings" on public.utility_readings;
create policy "tenants read own utility readings" on public.utility_readings for select to authenticated
  using (exists (select 1 from public.tenants t where t.property_id = utility_readings.property_id
    and t.room_id = utility_readings.room_id and t.auth_user_id = (select auth.uid())));

drop policy if exists "property managers manage invoices" on public.invoices;
create policy "property managers manage invoices" on public.invoices for all to authenticated
  using (public.is_property_manager(property_id)) with check (public.is_property_manager(property_id));
drop policy if exists "tenants read own invoices" on public.invoices;
create policy "tenants read own invoices" on public.invoices for select to authenticated
  using (exists (select 1 from public.tenants t where t.property_id = invoices.property_id
    and t.id = invoices.tenant_id and t.auth_user_id = (select auth.uid())));

drop policy if exists "property managers manage payments" on public.payments;
create policy "property managers manage payments" on public.payments for all to authenticated
  using (public.is_property_manager(property_id)) with check (public.is_property_manager(property_id));
drop policy if exists "tenants read own payments" on public.payments;
create policy "tenants read own payments" on public.payments for select to authenticated
  using (exists (select 1 from public.invoices i join public.tenants t
    on t.property_id = i.property_id and t.id = i.tenant_id
    where i.property_id = payments.property_id and i.id = payments.invoice_id
      and t.auth_user_id = (select auth.uid())));

drop policy if exists "property managers manage expenses" on public.expenses;
create policy "property managers manage expenses" on public.expenses for all to authenticated
  using (public.is_property_manager(property_id)) with check (public.is_property_manager(property_id));

drop policy if exists "property managers manage incidents" on public.incidents;
create policy "property managers manage incidents" on public.incidents for all to authenticated
  using (public.is_property_manager(property_id)) with check (public.is_property_manager(property_id));
drop policy if exists "tenants read own incidents" on public.incidents;
create policy "tenants read own incidents" on public.incidents for select to authenticated
  using (exists (select 1 from public.tenants t where t.property_id = incidents.property_id
    and t.id = incidents.tenant_id and t.auth_user_id = (select auth.uid())));
drop policy if exists "tenants submit own incidents" on public.incidents;
create policy "tenants submit own incidents" on public.incidents for insert to authenticated
  with check (status = 'new' and reported_by = (select auth.uid()) and exists (select 1 from public.tenants t
    where t.property_id = incidents.property_id and t.id = incidents.tenant_id
      and t.room_id = incidents.room_id and t.auth_user_id = (select auth.uid())));

-- Import already-synced dashboard records. Old rental_data is retained as a backup.
insert into public.rooms (property_id,id,code,name,floor,monthly_rent,area,status)
select d.property_id, x->>'id', x->>'code', coalesce(x->>'name',x->>'code'), coalesce(x->>'floor',''),
  coalesce(nullif(x->>'price','')::numeric,0), coalesce(nullif(x->>'area','')::numeric,0),
  coalesce(x->>'status','available')
from public.rental_data d cross join lateral jsonb_array_elements(coalesce(d.data->'rooms','[]'::jsonb)) x
where x->>'id' is not null and x->>'code' is not null
on conflict (property_id,id) do nothing;

insert into public.tenants (property_id,id,full_name,phone,identity_no,room_id,status)
select d.property_id,x->>'id',coalesce(x->>'name',''),coalesce(x->>'phone',''),coalesce(x->>'identity',''),
  r.id,case when x->>'status'='inactive' then 'inactive' else 'active' end
from public.rental_data d cross join lateral jsonb_array_elements(coalesce(d.data->'tenants','[]'::jsonb)) x
left join public.rooms r on r.property_id=d.property_id and r.code=x->>'roomCode'
where x->>'id' is not null
on conflict (property_id,id) do nothing;

insert into public.staff_members (property_id,id,full_name,phone,email,position,area,status)
select d.property_id,x->>'id',coalesce(x->>'name',''),coalesce(x->>'phone',''),coalesce(x->>'email',''),
  coalesce(x->>'position',''),coalesce(x->>'area',''),case when x->>'status'='inactive' then 'inactive' else 'active' end
from public.rental_data d cross join lateral jsonb_array_elements(coalesce(d.data->'staff','[]'::jsonb)) x
where x->>'id' is not null
on conflict (property_id,id) do nothing;

insert into public.rental_contracts (property_id,id,code,room_id,tenant_id,tenant_name,deposit,start_date,end_date,status)
select d.property_id,x->>'id',coalesce(x->>'code',x->>'id'),r.id,t.id,
  coalesce(x->>'tenantName',''),coalesce(nullif(x->>'deposit','')::numeric,0),
  (x->>'start')::date,(x->>'end')::date,case when x->>'status'='terminated' then 'terminated' else 'active' end
from public.rental_data d cross join lateral jsonb_array_elements(coalesce(d.data->'contracts','[]'::jsonb)) x
join public.rooms r on r.property_id=d.property_id and r.code=x->>'roomCode'
left join public.tenants t on t.property_id=d.property_id and t.full_name=x->>'tenantName'
where x->>'id' is not null and x->>'start' is not null and x->>'end' is not null
on conflict (property_id,id) do nothing;

insert into public.service_prices (property_id,id,name,unit,price)
select d.property_id,x->>'id',coalesce(x->>'name',''),coalesce(x->>'unit',''),
  coalesce(nullif(x->>'price','')::numeric,0)
from public.rental_data d cross join lateral jsonb_array_elements(coalesce(d.data->'services','[]'::jsonb)) x
where x->>'id' is not null
on conflict (property_id,id) do nothing;

insert into public.invoices (property_id,id,code,room_id,tenant_id,tenant_name,period,rent_amount,
  electricity_usage,electricity_amount,water_usage,water_amount,service_amount,total_amount,due_date)
select d.property_id,x->>'id',coalesce(x->>'code',x->>'id'),r.id,t.id,coalesce(x->>'tenantName',''),
  x->>'period',coalesce(nullif(x->>'rent','')::numeric,0),coalesce(nullif(x->>'electricUsage','')::numeric,0),
  coalesce(nullif(x->>'electricCost','')::numeric,0),coalesce(nullif(x->>'waterUsage','')::numeric,0),
  coalesce(nullif(x->>'waterCost','')::numeric,0),coalesce(nullif(x->>'serviceCost','')::numeric,0),
  coalesce(nullif(x->>'total','')::numeric,0),nullif(x->>'dueDate','')::date
from public.rental_data d cross join lateral jsonb_array_elements(coalesce(d.data->'invoices','[]'::jsonb)) x
join public.rooms r on r.property_id=d.property_id and r.code=x->>'roomCode'
left join public.tenants t on t.property_id=d.property_id and t.full_name=x->>'tenantName'
where x->>'id' is not null and x->>'period' is not null
on conflict (property_id,id) do nothing;

insert into public.payments (property_id,id,invoice_id,amount,paid_at,method,note)
select d.property_id,(x->>'id')||'-opening',x->>'id',nullif(x->>'paid','')::numeric,
  coalesce(nullif(x->>'dueDate','')::date,current_date)::timestamptz,'cash','Khoản đã thu từ dữ liệu cũ'
from public.rental_data d cross join lateral jsonb_array_elements(coalesce(d.data->'invoices','[]'::jsonb)) x
where coalesce(nullif(x->>'paid','')::numeric,0)>0 and x->>'id' is not null
on conflict (property_id,id) do nothing;

insert into public.expenses (property_id,id,spent_on,name,category,room_code,amount,note)
select d.property_id,x->>'id',(x->>'date')::date,coalesce(x->>'name',''),coalesce(x->>'category','Khác'),
  coalesce(x->>'roomCode',''),coalesce(nullif(x->>'amount','')::numeric,0),coalesce(x->>'note','')
from public.rental_data d cross join lateral jsonb_array_elements(coalesce(d.data->'expenses','[]'::jsonb)) x
where x->>'id' is not null and x->>'date' is not null
on conflict (property_id,id) do nothing;

-- Existing properties have already been migrated; newly created properties can seed once from the UI.
insert into public.property_bootstrap (property_id)
select property_id from public.rental_data
on conflict (property_id) do nothing;
