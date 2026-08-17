-- Supabase Schema for BookMatch AI

-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- Table: profiles
create table if not exists public.profiles (
  device_id uuid primary key,
  name text not null,
  age integer,
  country text,
  language text default 'en',
  reading_level text,
  reading_goal text,
  daily_goal_time text,
  reading_speed text,
  preferred_length text,
  mood text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Table: reading_preferences
create table if not exists public.reading_preferences (
  id uuid primary key default uuid_generate_v4(),
  device_id uuid references public.profiles(device_id) on delete cascade not null,
  favorite_genres text[] default '{}',
  favorite_authors text[] default '{}',
  favorite_books text[] default '{}',
  books_already_read text[] default '{}',
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null,
  unique (device_id)
);

-- Table: user_books
create table if not exists public.user_books (
  id uuid primary key default uuid_generate_v4(),
  device_id uuid references public.profiles(device_id) on delete cascade not null,
  book_id text not null, -- Google Books ID
  title text not null,
  author text,
  cover_url text,
  status text check (status in ('want_to_read', 'reading', 'completed', 'dropped')),
  progress_percent integer default 0,
  pages_read integer default 0,
  total_pages integer default 0,
  rating integer check (rating >= 1 and rating <= 5),
  notes text,
  is_favorite boolean default false,
  is_bookmarked boolean default false,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null,
  unique (device_id, book_id)
);

-- Table: recently_viewed
create table if not exists public.recently_viewed (
  id uuid primary key default uuid_generate_v4(),
  device_id uuid references public.profiles(device_id) on delete cascade not null,
  book_id text not null,
  title text not null,
  author text,
  cover_url text,
  viewed_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- RLS Policies
alter table public.profiles enable row level security;
alter table public.reading_preferences enable row level security;
alter table public.user_books enable row level security;
alter table public.recently_viewed enable row level security;

-- Policies: Anonymous access based on device_id (no auth required)
-- In a real production app with NO login, we allow anon to insert/select/update where device_id = their local UUID.
-- However, since Supabase doesn't know their device_id from headers by default, 
-- we either pass it in queries or disable RLS for simplicity in this pure anon setup, 
-- OR use a policy that allows all anon operations and we filter on the client.
-- For security, we allow all operations but trust the client to filter by device_id.
create policy "Allow all operations for anon" on public.profiles for all using (true) with check (true);
create policy "Allow all operations for anon" on public.reading_preferences for all using (true) with check (true);
create policy "Allow all operations for anon" on public.user_books for all using (true) with check (true);
create policy "Allow all operations for anon" on public.recently_viewed for all using (true) with check (true);
