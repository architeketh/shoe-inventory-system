create extension if not exists pgcrypto;

create table if not exists public.shoe_inventory (
  id uuid primary key default gen_random_uuid(),
  brand text not null,
  description text not null,
  size text not null,
  price numeric(10,2) not null check (price >= 0),
  notes text,
  has_box boolean not null default false,
  source_method text not null check (source_method in ('box', 'no_box')),
  ai_assisted boolean not null default false,
  photo_urls text[] not null default '{}',
  photo_paths text[] not null default '{}',
  created_at timestamptz not null default timezone('utc', now())
);

alter table public.shoe_inventory enable row level security;

drop policy if exists "Public can read shoe inventory" on public.shoe_inventory;
create policy "Public can read shoe inventory"
on public.shoe_inventory for select
using (true);

drop policy if exists "Public can insert shoe inventory" on public.shoe_inventory;
create policy "Public can insert shoe inventory"
on public.shoe_inventory for insert
with check (true);

insert into storage.buckets (id, name, public)
values ('shoe-photos', 'shoe-photos', true)
on conflict (id) do update set public = excluded.public;

drop policy if exists "Public can read shoe photos" on storage.objects;
create policy "Public can read shoe photos"
on storage.objects for select
using (bucket_id = 'shoe-photos');

drop policy if exists "Public can upload shoe photos" on storage.objects;
create policy "Public can upload shoe photos"
on storage.objects for insert
with check (bucket_id = 'shoe-photos');
