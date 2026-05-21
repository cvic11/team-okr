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

-- ============================================================================
-- 끝. SQL Editor 우측 상단 'RUN' 클릭. 콘솔에 success 떴으면 페이지 새로고침.
-- ============================================================================
