-- ============================================================================
-- team-okr · 누락된 테이블 보정 스크립트
-- 사용법: Supabase 대시보드 → SQL Editor → 이 파일 전체를 붙여넣고 RUN
-- 이미 만들어진 테이블은 IF NOT EXISTS 로 건너뜀.
-- ============================================================================

-- v30: Initiative 하위 할일(sub-task) 테이블
create table if not exists public.initiative_tasks (
  id            text primary key,
  initiative_id text not null,
  title         text not null default '',
  status        text not null default 'todo',          -- todo | doing | done | blocked
  owner_id      text,
  start_date    date,
  due_date      date,
  sort_order    int  not null default 0,
  updated_at    timestamptz not null default now(),
  created_at    timestamptz not null default now()
);

create index if not exists initiative_tasks_init_id_idx
  on public.initiative_tasks (initiative_id);

-- 부모 Initiative 가 삭제되면 같이 정리 (앱에서도 정리하지만 안전망)
do $$
begin
  if not exists (
    select 1 from pg_constraint where conname = 'initiative_tasks_initiative_id_fkey'
  ) then
    alter table public.initiative_tasks
      add constraint initiative_tasks_initiative_id_fkey
      foreign key (initiative_id) references public.initiatives(id)
      on delete cascade;
  end if;
exception when undefined_table then null; -- initiatives 가 아직 없으면 무시
end$$;

-- RLS — 익명(anon) 키로도 읽기/쓰기 가능하게 (앱의 다른 테이블과 동일 패턴)
alter table public.initiative_tasks enable row level security;

drop policy if exists "initiative_tasks_all" on public.initiative_tasks;
create policy "initiative_tasks_all" on public.initiative_tasks
  for all using (true) with check (true);

-- realtime 채널 발행 — 다른 브라우저에 즉시 반영
do $$
begin
  if not exists (
    select 1 from pg_publication_tables
    where pubname='supabase_realtime' and schemaname='public' and tablename='initiative_tasks'
  ) then
    alter publication supabase_realtime add table public.initiative_tasks;
  end if;
exception when undefined_object then null;
end$$;

-- v24: 팀원 간 1:1 메시지 테이블 (우측 하단 플로팅 채팅)
create table if not exists public.messages (
  id         text primary key,
  team_id    text not null,
  from_id    text not null,
  to_id      text not null,
  body       text not null default '',
  read_at    timestamptz,
  created_at timestamptz not null default now()
);

create index if not exists messages_team_id_idx on public.messages (team_id);
create index if not exists messages_to_id_idx   on public.messages (to_id);

-- RLS — 익명(anon) 키로도 읽기/쓰기 가능하게 (앱의 다른 테이블과 동일 패턴)
alter table public.messages enable row level security;

drop policy if exists "messages_all" on public.messages;
create policy "messages_all" on public.messages
  for all using (true) with check (true);

-- realtime 채널 발행 — 다른 브라우저에 즉시 반영
do $$
begin
  if not exists (
    select 1 from pg_publication_tables
    where pubname='supabase_realtime' and schemaname='public' and tablename='messages'
  ) then
    alter publication supabase_realtime add table public.messages;
  end if;
exception when undefined_object then null;
end$$;

-- ============================================================================
-- 끝. SQL Editor 우측 상단 'RUN' 클릭. 콘솔에 success 떴으면 페이지 새로고침.
-- ============================================================================

-- v123: 그룹 채팅 — 방/멤버십, messages.room_id (적용 완료된 마이그레이션의 기록)
create table if not exists public.chat_rooms (
  id         text primary key,
  team_id    text not null,
  name       text not null default '',
  created_by text,
  created_at timestamptz not null default now()
);
create table if not exists public.chat_room_members (
  room_id      text not null,
  member_id    text not null,
  joined_at    timestamptz not null default now(),
  last_read_at timestamptz,
  primary key (room_id, member_id)
);
alter table public.messages add column if not exists room_id text;
alter table public.messages alter column to_id drop not null;
create index if not exists messages_room_id_idx on public.messages (room_id);
create index if not exists chat_room_members_member_idx on public.chat_room_members (member_id);
alter table public.chat_rooms enable row level security;
alter table public.chat_room_members enable row level security;
drop policy if exists "chat_rooms_all" on public.chat_rooms;
create policy "chat_rooms_all" on public.chat_rooms for all using (true) with check (true);
drop policy if exists "chat_room_members_all" on public.chat_room_members;
create policy "chat_room_members_all" on public.chat_room_members for all using (true) with check (true);
do $$
begin
  if not exists (select 1 from pg_publication_tables where pubname='supabase_realtime' and schemaname='public' and tablename='chat_rooms') then
    alter publication supabase_realtime add table public.chat_rooms;
  end if;
  if not exists (select 1 from pg_publication_tables where pubname='supabase_realtime' and schemaname='public' and tablename='chat_room_members') then
    alter publication supabase_realtime add table public.chat_room_members;
  end if;
exception when undefined_object then null;
end$$;
