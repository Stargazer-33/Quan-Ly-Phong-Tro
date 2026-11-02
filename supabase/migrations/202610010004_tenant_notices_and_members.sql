-- Bổ sung dữ liệu cho trang Khách thuê: thông báo nội bộ và thành viên ở cùng.
-- Chạy MỘT LẦN trên project Supabase chung (xem supabase/TEAM_GUIDE.md mục 7).
-- File này chỉ tạo thêm bảng mới, không sửa/xóa bảng cũ.

-- ---------------------------------------------------------------------------
-- 1. Thông báo từ chủ trọ / ban quản lý
-- ---------------------------------------------------------------------------
create table if not exists public.notices (
  id uuid primary key default gen_random_uuid(),
  property_id uuid not null references public.properties(id) on delete cascade,
  title text not null,
  content text not null default '',
  published_at timestamptz not null default now(),
  created_by uuid default auth.uid() references auth.users(id) on delete set null,
  created_at timestamptz not null default now()
);

create index if not exists notices_property_published_idx
  on public.notices (property_id, published_at desc);

alter table public.notices enable row level security;

revoke all on public.notices from anon, authenticated;
grant select, insert, update, delete on public.notices to authenticated;

drop policy if exists "property managers manage notices" on public.notices;
create policy "property managers manage notices" on public.notices
  for all to authenticated
  using (public.is_property_manager(property_id))
  with check (public.is_property_manager(property_id));

-- Khách thuê chỉ thấy thông báo của cơ sở mình đang thuê.
drop policy if exists "tenants read property notices" on public.notices;
create policy "tenants read property notices" on public.notices
  for select to authenticated
  using (exists (
    select 1 from public.tenants t
    where t.property_id = notices.property_id
      and t.auth_user_id = (select auth.uid())
  ));

-- ---------------------------------------------------------------------------
-- 2. Thành viên ở cùng phòng (chủ trọ nhập, khách thuê chỉ xem)
-- ---------------------------------------------------------------------------
create table if not exists public.room_members (
  id uuid primary key default gen_random_uuid(),
  property_id uuid not null references public.properties(id) on delete cascade,
  room_id text not null,
  tenant_id text not null,
  full_name text not null,
  phone text not null default '',
  identity_no text not null default '',
  relation text not null default 'Thành viên',
  status text not null default 'active' check (status in ('active', 'inactive')),
  created_at timestamptz not null default now(),
  foreign key (property_id, room_id) references public.rooms(property_id, id) on delete cascade,
  foreign key (property_id, tenant_id) references public.tenants(property_id, id) on delete cascade
);

create index if not exists room_members_tenant_idx
  on public.room_members (property_id, tenant_id);

alter table public.room_members enable row level security;

revoke all on public.room_members from anon, authenticated;
grant select, insert, update, delete on public.room_members to authenticated;

drop policy if exists "property managers manage room members" on public.room_members;
create policy "property managers manage room members" on public.room_members
  for all to authenticated
  using (public.is_property_manager(property_id))
  with check (public.is_property_manager(property_id));

-- Khách thuê chỉ đọc thành viên thuộc hồ sơ của mình; không có policy ghi.
drop policy if exists "tenants read own room members" on public.room_members;
create policy "tenants read own room members" on public.room_members
  for select to authenticated
  using (exists (
    select 1 from public.tenants t
    where t.property_id = room_members.property_id
      and t.id = room_members.tenant_id
      and t.auth_user_id = (select auth.uid())
  ));

-- ---------------------------------------------------------------------------
-- 3. Vá dữ liệu: hóa đơn/hợp đồng cũ có thể thiếu tenant_id
--    (trang khách thuê lọc theo tenant_id nên nếu null sẽ không thấy dữ liệu).
-- ---------------------------------------------------------------------------
update public.invoices i
set tenant_id = t.id
from public.tenants t
where i.tenant_id is null
  and i.property_id = t.property_id
  and i.room_id = t.room_id
  and i.tenant_name = t.full_name;

update public.rental_contracts c
set tenant_id = t.id
from public.tenants t
where c.tenant_id is null
  and c.property_id = t.property_id
  and c.room_id = t.room_id
  and c.tenant_name = t.full_name;
