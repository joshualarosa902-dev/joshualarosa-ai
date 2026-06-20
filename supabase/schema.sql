-- joshualarosa.ai — Supabase schema
-- Run in the Supabase SQL editor (Dashboard → SQL → New query).

create extension if not exists pgcrypto;

-- ---------- resources ----------
create table if not exists public.resources (
  id           uuid primary key default gen_random_uuid(),
  slug         text unique not null,
  title        text not null,
  description  text,
  whats_inside text[] default '{}',
  category     text not null,
  cover_url    text,
  pdf_path     text not null,          -- object path in the private 'pdfs' bucket
  video_url    text,
  featured     boolean not null default false,
  published    boolean not null default false,
  created_at   timestamptz not null default now()
);

create index if not exists resources_published_idx on public.resources (published);
create index if not exists resources_featured_idx on public.resources (featured);

alter table public.resources enable row level security;

-- Anyone may read PUBLISHED resources. No public writes.
drop policy if exists "public read published resources" on public.resources;
create policy "public read published resources"
  on public.resources for select
  to anon, authenticated
  using (published = true);

-- ---------- subscribers ----------
create table if not exists public.subscribers (
  id            uuid primary key default gen_random_uuid(),
  email         text not null,
  resource_slug text,                  -- which magnet unlocked (null = general newsletter)
  created_at    timestamptz not null default now()
);

create index if not exists subscribers_email_idx on public.subscribers (email);

alter table public.subscribers enable row level security;
-- No anon/authenticated policies: only the server (service-role) can read/insert.
-- The service-role key bypasses RLS, so the /api/unlock route works; the public cannot.

-- ---------- seed (optional starter rows) ----------
-- insert into public.resources (slug, title, description, whats_inside, category, pdf_path, featured, published)
-- values ('ai-hook-vault', 'The AI hook vault', '50 openers that stop the scroll.',
--   array['50 plug-and-play hooks','The 6 hook patterns that go viral','How to adapt any hook'],
--   'Hooks', 'ai-hook-vault.pdf', true, true);
