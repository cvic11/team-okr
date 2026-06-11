// ── Supabase 연동 어댑터 ─────────────────────────────────────
// 기존 플래너(daily-planner)와 같은 DB(objectives/key_results/initiatives/
// initiative_tasks/members/standup_entries/audit_log)를 직접 읽고 쓴다.
// 두 버전 어느 쪽에서 수정해도 실시간 반영. supabase-js CDN 미로드 시
// 이 파일은 아무것도 하지 않고 localStorage 데모 모드로 동작한다.
// 반드시 store.js 이후, app.js 이전에 로드할 것.
(function () {
  'use strict';
  if (!window.supabase || !window.supabase.createClient || !window.Store) return;

  // 플래너(app.js)와 동일한 프로젝트·키
  const SUPABASE_URL = 'https://fmudqapruoppzlfhoxde.supabase.co';
  const SUPABASE_ANON = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZtdWRxYXBydW9wcHpsZmhveGRlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzgwNzk2NTEsImV4cCI6MjA5MzY1NTY1MX0.NLQdccHlwahIy69opYzUkPSXKGCOZIQAr5ehctCWbw0';
  const TEAM_KEY = 'team-okr-current-team'; // 플래너와 공유 — 같은 팀을 본다
  const SELF_KEY = 'team-okr-self-id';      // 플래너의 본인 선택
  const PIN_AUTH_KEY = 'team-okr-pin-auth'; // 플래너의 PIN 인증 기록 {memberId: ts}
  const PIN_AUTH_TTL = 24 * 60 * 60 * 1000; // 플래너와 동일 24시간

  const sb = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON);
  const Store = window.Store;
  const S = () => window.Store;

  const TBL = { o: 'objectives', kr: 'key_results', init: 'initiatives', task: 'initiative_tasks' };
  const PARENT_COL = { kr: 'objective_id', init: 'kr_id', task: 'initiative_id' };
  const TYPE_ORDER = { o: 0, kr: 1, init: 2, task: 3 };

  const Sync = {
    enabled: true,
    client: sb,
    teamId: null,
    snapshot: {},       // id → 동기화 대상 필드 스냅샷 (diff 기준)
    applyingRemote: false,
    loaded: false,
    queue: [],
    flushing: false,
    channel: null,
    presCh: null,

    uid() { return Math.random().toString(36).slice(2, 9) + Date.now().toString(36).slice(-3); }, // 플래너와 동일 형식

    async sha256(text) {
      const buf = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(text));
      return Array.from(new Uint8Array(buf)).map(b => b.toString(16).padStart(2, '0')).join('');
    },

    // ── 멤버 ──
    memberOf(r) {
      return { id: r.id, name: r.name, color: r.color || '#6241F5', pin_hash: r.pin_hash || null,
        isAdmin: !!r.is_admin, isObserver: !!r.is_observer, sortOrder: r.sort_order || 0, lastActive: null };
    },
    idOf(name) { const m = S().data.members.find(x => x.name === name); return m ? m.id : null; },
    nameOf(id) { if (!id) return ''; const m = S().data.members.find(x => x.id === id); return m ? m.name : ''; },

    async verifyPin(m, pin) {
      if (!m) return false;
      if (!m.pin_hash) return /^\d{4}$/.test(pin); // 핀 미설정 멤버 — 아무 4자리 허용
      return (await this.sha256(m.id + ':' + pin)) === m.pin_hash; // 플래너와 동일: salt=member.id
    },
    async setPin(m, pin) {
      const h = await this.sha256(m.id + ':' + pin);
      const r = await sb.from('members').update({ pin_hash: h }).eq('id', m.id);
      if (r.error) return r.error.message;
      m.pin_hash = h; return null;
    },
    async addMember(name, pin) {
      const id = this.uid();
      const row = { id, team_id: this.teamId, name, role: '', color: '#6241F5',
        sort_order: S().data.members.length, is_admin: false, is_observer: false };
      if (pin) row.pin_hash = await this.sha256(id + ':' + pin);
      const r = await sb.from('members').insert(row);
      if (r.error) return r.error.message;
      S().data.members.push(this.memberOf(row)); S().persist();
      return null;
    },
    // ── 플래너 ↔ 터미널 세션 공유 (로그인 중복 제거) ──
    adoptPlannerSession() {
      if (S().me()) return false;
      try {
        const selfId = localStorage.getItem(SELF_KEY);
        if (!selfId || selfId === '__observer__') return false;
        const m = S().data.members.find(x => x.id === selfId);
        if (!m || m.isObserver) return false;
        const auth = JSON.parse(localStorage.getItem(PIN_AUTH_KEY) || '{}')[selfId];
        if (!auth || (Date.now() - auth) >= PIN_AUTH_TTL) return false;
        S().login(m.name);
        return true;
      } catch (e) { return false; }
    },
    shareSessionToPlanner(name) {
      try {
        const m = S().data.members.find(x => x.name === name);
        if (!m) return;
        localStorage.setItem(SELF_KEY, m.id);
        const o = JSON.parse(localStorage.getItem(PIN_AUTH_KEY) || '{}');
        o[m.id] = Date.now();
        localStorage.setItem(PIN_AUTH_KEY, JSON.stringify(o));
      } catch (e) { }
    },
    clearPlannerSession(name) {
      try {
        const m = S().data.members.find(x => x.name === name);
        if (m) {
          const o = JSON.parse(localStorage.getItem(PIN_AUTH_KEY) || '{}');
          delete o[m.id];
          localStorage.setItem(PIN_AUTH_KEY, JSON.stringify(o));
          if (localStorage.getItem(SELF_KEY) === m.id) localStorage.removeItem(SELF_KEY);
        }
      } catch (e) { }
    },

    async delMember(m) {
      const r = await sb.from('members').delete().eq('id', m.id);
      if (r.error) return r.error.message; // 담당 항목 FK 참조 시 실패할 수 있음
      const i = S().data.members.findIndex(x => x.id === m.id);
      if (i >= 0) { S().data.members.splice(i, 1); S().persist(); }
      return null;
    },

    // ── DB행 ↔ 노드 변환 ──
    // 날짜 없는 행은 표시용 기본값(분기 범위)으로 채운다. 스냅샷에도 같은 값이
    // 들어가므로 사용자가 실제로 날짜를 바꾸기 전에는 DB에 역기록되지 않는다.
    rowToNode(type, r) {
      const Q = window.OKRD.quarterOf(window.OKRT.TODAY);
      const owner = this.nameOf(r.owner_id);
      const created = (r.created_at || '').slice(0, 10) || Q.start;
      if (type === 'o' || type === 'kr') {
        return { id: r.id, type, parentId: type === 'o' ? null : (r.objective_id || null),
          title: r.title || '', owner, start: r.start_date || Q.start, end: r.due_date || Q.end,
          status: 'active', sort: r.sort_order || 0,
          createdAt: r.created_at || '', updatedAt: r.created_at || '', updatedBy: '', completedAt: null };
      }
      if (type === 'init') {
        const done = r.status === 'done';
        return { id: r.id, type, parentId: r.kr_id, title: r.title || '', owner,
          start: r.start_date || created, end: r.due_date || Q.end,
          status: done ? 'done' : 'active', sort: r.sort_order || 0,
          createdAt: r.created_at || '', updatedAt: r.updated_at || '', updatedBy: '',
          completedAt: done ? (r.updated_at || null) : null };
      }
      const done = r.status === 'done';
      return { id: r.id, type: 'task', parentId: r.initiative_id, title: r.title || '', owner,
        start: r.start_date || r.due_date || window.OKRT.TODAY,
        end: r.due_date || r.start_date || window.OKRT.TODAY,
        due: r.due_date || null,
        status: done ? 'done' : (r.status === 'blocked' ? 'hold' : 'active'),
        sort: r.sort_order || 0, createdAt: r.created_at || '', updatedAt: r.updated_at || '',
        updatedBy: '', completedAt: done ? (r.updated_at || null) : null, carry: 0 };
    },

    snapOf(n) {
      return { type: n.type, parentId: n.parentId || null, title: n.title || '', owner: n.owner || '',
        start: n.start || null, end: n.end || null, due: n.due || null,
        status: n.status || 'active', sort: n.sort || 0 };
    },

    // 변경된 필드만 DB 컬럼으로 변환 (old=null 이면 insert용 전체 컬럼)
    colsFor(type, oldS, newS) {
      const c = {};
      if (!oldS || oldS.title !== newS.title) c.title = newS.title;
      if (!oldS || oldS.owner !== newS.owner) c.owner_id = this.idOf(newS.owner);
      if (!oldS || oldS.sort !== newS.sort) c.sort_order = Math.round(newS.sort);
      if (type !== 'o' && (!oldS || oldS.parentId !== newS.parentId)) c[PARENT_COL[type]] = newS.parentId;
      if (!oldS || oldS.start !== newS.start) c.start_date = newS.start || null;
      if (type === 'task') {
        if (!oldS || oldS.due !== newS.due) c.due_date = newS.due || null;
      } else {
        if (!oldS || oldS.end !== newS.end) c.due_date = newS.end || null;
      }
      if (!oldS || oldS.status !== newS.status) {
        if (type === 'init') c.status = newS.status === 'done' ? 'done' : 'todo';
        if (type === 'task') c.status = newS.status === 'done' ? 'done' : (newS.status === 'hold' ? 'blocked' : 'todo');
      }
      return c;
    },
    insertRow(n) {
      const snap = this.snapOf(n);
      const row = Object.assign({ id: n.id }, this.colsFor(n.type, null, snap));
      if (n.type === 'o') row.team_id = this.teamId;
      return row;
    },

    // ── 로컬 변경 → DB (스냅샷 diff: create/update/move/retype/remove/undo 전부 처리) ──
    onLocalChange() {
      if (this.applyingRemote || !this.loaded) return;
      const nodes = S().data.nodes;
      const ins = [], upd = [], del = [];
      const ids = new Set(Object.keys(nodes).concat(Object.keys(this.snapshot)));
      ids.forEach(id => {
        const n = nodes[id], o = this.snapshot[id];
        if (n && !o) { ins.push(n); return; }
        if (!n && o) { del.push({ id, type: o.type }); return; }
        if (o.type !== n.type) { del.push({ id, type: o.type }); ins.push(n); return; } // 계층 승격/강등 → 테이블 이동
        const c = this.colsFor(n.type, o, this.snapOf(n));
        if (Object.keys(c).length) upd.push({ id, type: n.type, cols: c });
      });
      const fresh = {};
      Object.values(nodes).forEach(n => { fresh[n.id] = this.snapOf(n); });
      this.snapshot = fresh;
      if (!ins.length && !upd.length && !del.length) return;
      // FK 순서: 부모 먼저 insert(o→task), 자식 먼저 delete(task→o)
      ins.sort((a, b) => TYPE_ORDER[a.type] - TYPE_ORDER[b.type]);
      del.sort((a, b) => TYPE_ORDER[b.type] - TYPE_ORDER[a.type]);
      const ops = [];
      // 플래너의 '최근 한 일'은 updated_at 날짜로 완료일을 판정 — 쓰기마다 갱신
      const touch = (type, cols) => {
        if (type === 'init' || type === 'task') cols.updated_at = new Date().toISOString();
        return cols;
      };
      ins.forEach(n => ops.push({ t: 'upsert', table: TBL[n.type], row: touch(n.type, this.insertRow(n)) }));
      upd.forEach(u => ops.push({ t: 'update', table: TBL[u.type], id: u.id, cols: touch(u.type, u.cols) }));
      del.forEach(d => ops.push({ t: 'delete', table: TBL[d.type], id: d.id }));
      this.queue.push.apply(this.queue, ops);
      this.flush();
    },
    async flush() {
      if (this.flushing) return;
      this.flushing = true;
      while (this.queue.length) {
        const op = this.queue[0];
        try {
          let r;
          if (op.t === 'upsert') r = await sb.from(op.table).upsert(op.row);
          else if (op.t === 'update') r = await sb.from(op.table).update(op.cols).eq('id', op.id);
          else r = await sb.from(op.table).delete().eq('id', op.id);
          if (r.error) throw r.error;
          this.queue.shift();
          this.setOffline(false);
        } catch (e) {
          console.warn('[sync] write fail', e && e.message || e);
          this.setOffline(true);
          window.R && window.R.notice('! 서버 저장 실패 — 자동 재시도 중', 'warn');
          setTimeout(() => { this.flushing = false; this.flush(); }, 8000);
          return;
        }
      }
      this.flushing = false;
    },
    setOffline(b) { if (S().offline !== b) { S().offline = b; window.App && window.App.renderTopbar && window.App.renderTopbar(); } },

    // ── DB 변경 → 로컬 (실시간) ──
    onRemote(type, evt) {
      const id = (evt.new && evt.new.id) || (evt.old && evt.old.id);
      if (!id) return;
      if (evt.eventType === 'DELETE') {
        if (!S().data.nodes[id]) { delete this.snapshot[id]; return; } // 자기 echo
        const desc = S().descendants(id);
        this.applyingRemote = true;
        delete S().data.nodes[id]; delete this.snapshot[id];
        desc.forEach(d => { delete S().data.nodes[d.id]; delete this.snapshot[d.id]; });
        S().persist(); S().notify({ structural: true, remote: true });
        this.applyingRemote = false;
        return;
      }
      const r = evt.new;
      if (type === 'o' && this.teamId && r.team_id && r.team_id !== this.teamId) return; // 다른 팀
      const n = this.rowToNode(type, r);
      if (type !== 'o' && !S().data.nodes[n.parentId] && !S().data.nodes[id]) return;     // 부모 미보유(다른 팀)
      const cur = S().data.nodes[id];
      const ns = this.snapOf(n);
      if (cur && JSON.stringify(this.snapOf(cur)) === JSON.stringify(ns)) { this.snapshot[id] = ns; return; } // 자기 echo
      this.applyingRemote = true;
      if (cur) Object.assign(cur, n); else S().data.nodes[id] = n;
      this.snapshot[id] = ns;
      S().persist();
      S().notify(cur ? { changed: [id], remote: true } : { structural: true, remote: true });
      this.applyingRemote = false;
    },
    onMemberEvt(evt) {
      const ms = S().data.members;
      if (evt.eventType === 'DELETE') {
        const i = ms.findIndex(m => m.id === (evt.old && evt.old.id));
        if (i >= 0) ms.splice(i, 1);
      } else {
        const r = evt.new;
        if (this.teamId && r.team_id && r.team_id !== this.teamId) return;
        const i = ms.findIndex(m => m.id === r.id);
        if (i >= 0) Object.assign(ms[i], this.memberOf(r)); else ms.push(this.memberOf(r));
        ms.sort((a, b) => (a.sortOrder || 0) - (b.sortOrder || 0));
      }
      S().persist();
      if (S().me() && !S().member(S().me())) { S().logout(); location.reload(); return; }
      if (!S().me()) { window.App && window.App.renderLogin(); }
      else { window.App && window.App.renderTopbar(); if (window.App && window.App.mode === 'admin') window.App.refresh(); }
    },
    onStandupEvt(evt) {
      const r = evt.new;
      if (!r || (this.teamId && r.team_id && r.team_id !== this.teamId)) return;
      const nm = this.nameOf(r.member_id);
      if (!nm) return;
      const cur = (S().data.standup[r.date] || {})[nm];
      if (cur && (cur.blocked || '') === (r.blockers || '')) return; // 자기 echo — 재렌더 불필요
      this.applyingRemote = true;
      (S().data.standup[r.date] = S().data.standup[r.date] || {})[nm] = { blocked: r.blockers || '' };
      S().persist();
      this.applyingRemote = false;
      // 막힘 textarea에 입력 중이면 재렌더 보류 — 포커스·커서 끊김 방지
      const ae = document.activeElement;
      const typing = ae && ae.classList && ae.classList.contains('su-blocked');
      if (!typing && window.App && window.App.mode === 'standup') window.App.refresh({ soft: true });
    },

    // ── 접속 표시 (presence) ──
    trackPresence() {
      const me = S().me();
      if (!me || this.presCh) return;
      const ch = sb.channel('okrterm-presence', { config: { presence: { key: me } } });
      ch.on('presence', { event: 'sync' }, () => {
        const p = {};
        Object.keys(ch.presenceState()).forEach(k => { p[k] = true; });
        window.Sim.presence = p;
        window.App && window.App.renderTopbar();
      });
      ch.subscribe(st => { if (st === 'SUBSCRIBED') ch.track({ at: Date.now() }); });
      this.presCh = ch;
    },

    subscribe() {
      if (this.channel) return;
      const ch = sb.channel('okrterm-db');
      [['objectives', 'o'], ['key_results', 'kr'], ['initiatives', 'init'], ['initiative_tasks', 'task']]
        .forEach(([t, ty]) => ch.on('postgres_changes', { event: '*', schema: 'public', table: t }, p => this.onRemote(ty, p)));
      ch.on('postgres_changes', { event: '*', schema: 'public', table: 'members' }, p => this.onMemberEvt(p));
      ch.on('postgres_changes', { event: '*', schema: 'public', table: 'standup_entries' }, p => this.onStandupEvt(p));
      ch.subscribe(st => {
        if (st === 'SUBSCRIBED') this.setOffline(false);
        else if (st === 'CHANNEL_ERROR' || st === 'TIMED_OUT' || st === 'CLOSED') this.setOffline(true);
      });
      this.channel = ch;
    },

    // ── 최초 로드 ──
    async start() {
      try {
        const teams = await sb.from('teams').select('*').order('sort_order');
        if (teams.error) throw teams.error;
        const saved = localStorage.getItem(TEAM_KEY);
        const team = (teams.data || []).find(t => t.id === saved) || (teams.data || [])[0];
        if (!team) throw new Error('등록된 팀이 없습니다');
        this.teamId = team.id;
        S().data.quarter = team.quarter || S().data.quarter;

        const mem = await sb.from('members').select('*').eq('team_id', team.id).order('sort_order');
        if (mem.error) throw mem.error;
        S().data.members = (mem.data || []).map(r => this.memberOf(r));

        const obj = await sb.from('objectives').select('*').eq('team_id', team.id).order('sort_order');
        if (obj.error) throw obj.error;
        const oids = (obj.data || []).map(r => r.id);
        const krs = oids.length ? await sb.from('key_results').select('*').in('objective_id', oids).order('sort_order') : { data: [] };
        const krids = (krs.data || []).map(r => r.id);
        const inits = krids.length ? await sb.from('initiatives').select('*').in('kr_id', krids).order('sort_order') : { data: [] };
        const iids = (inits.data || []).map(r => r.id);
        const tasks = iids.length ? await sb.from('initiative_tasks').select('*').in('initiative_id', iids).order('sort_order') : { data: [] };

        const nodes = {};
        (obj.data || []).forEach(r => { const n = this.rowToNode('o', r); nodes[n.id] = n; });
        (krs.data || []).forEach(r => { const n = this.rowToNode('kr', r); nodes[n.id] = n; });
        (inits.data || []).forEach(r => { const n = this.rowToNode('init', r); nodes[n.id] = n; });
        (tasks.data || []).forEach(r => { const n = this.rowToNode('task', r); nodes[n.id] = n; });
        S().data.nodes = nodes;
        this.snapshot = {};
        Object.values(nodes).forEach(n => { this.snapshot[n.id] = this.snapOf(n); });

        // 스탠드업 막힘 노트 (최근 60일) + 활동 로그 (최근 100건)
        const cut = window.OKRD.add(window.OKRT.TODAY, -60);
        const su = await sb.from('standup_entries').select('*').eq('team_id', team.id).gte('date', cut);
        S().data.standup = {};
        (su.data || []).forEach(r => {
          const nm = this.nameOf(r.member_id); if (!nm) return;
          (S().data.standup[r.date] = S().data.standup[r.date] || {})[nm] = { blocked: r.blockers || '' };
        });
        const lg = await sb.from('audit_log').select('*').eq('team_id', team.id).order('ts', { ascending: false }).limit(100);
        S().data.log = (lg.data || []).map(r => ({
          ts: r.ts, actor: r.actor || '?', action: r.action + (r.field_name ? ' ' + r.field_name : ''),
          target: r.entity_label || '', extra: '',
        }));

        if (S().me() && !S().member(S().me())) S().logout();
        this.loaded = true;
        S().persist();
        // 플래너에서 이미 본인 선택+PIN 인증을 마쳤으면 터미널 로그인 생략
        if (!S().me() && this.adoptPlannerSession() && window.App) window.App.boot();
        if (!S().me()) { window.App && window.App.renderLogin(); }
        else {
          S().notify({ structural: true, remote: true });
          window.App && window.App.renderTopbar();
          this.trackPresence();
        }
        this.subscribe();
        window.R && window.R.notice('플래너 DB 연동됨 — ' + (team.name || '') + ' · ' + (team.quarter || ''));
      } catch (e) {
        console.warn('[sync] load fail', e);
        this.setOffline(true);
        window.R && window.R.notice('! 서버 연결 실패 — 캐시 데이터로 동작, 10초 후 재시도', 'warn');
        setTimeout(() => this.start(), 10000);
      }
    },
  };

  // ── Store 패치 (app.js의 App.init 이전에 적용됨) ──
  Store.KEY = 'okrterm_db_v1'; // 데모 데이터(okrterm_data_v1)와 분리된 서버 캐시
  window.OKR_SEED = function () { return { nodes: {}, members: [], standup: {}, log: [], archives: [] }; };

  const origInit = Store.init.bind(Store);
  Store.init = function () {
    origInit();
    // 멤버 목록이 아직 안 왔을 때 세션이 지워지는 것 방지 — 로드 후 start()에서 재검증
    if (!this.session) {
      try { const s = localStorage.getItem(this.SESSION_KEY); if (s) this.session = JSON.parse(s); } catch (e) { }
    }
  };

  const origLogin = Store.login.bind(Store);
  Store.login = function (name) { origLogin(name); Sync.shareSessionToPlanner(name); Sync.trackPresence(); };

  const origLogout = Store.logout.bind(Store);
  Store.logout = function () { const name = this.me(); origLogout(); if (name) Sync.clearPlannerSession(name); };

  const origLog = Store.log.bind(Store);
  Store.log = function (actor, action, target, extra) {
    origLog(actor, action, target, extra);
    if (!Sync.loaded || Sync.applyingRemote) return;
    sb.from('audit_log').insert({
      team_id: Sync.teamId, entity_type: 'okr_terminal',
      entity_id: (target && target.id) || '',
      entity_label: target ? ((window.OKRT.TYPE_LABEL[target.type] || '') + ' "' + (target.title || '') + '"') : '',
      action: action + (extra ? ' — ' + extra : ''), field_name: '', before_value: '', after_value: '',
      actor: actor || '', category: 'change',
    }).then(r => { if (r.error) console.warn('[sync] audit', r.error.message); });
  };

  const origSU = Store.saveStandupNote.bind(Store);
  const suTimers = {};
  Store.saveStandupNote = function (date, member, note) {
    origSU(date, member, note);
    if (!Sync.loaded || Sync.applyingRemote) return;
    const key = date + '|' + member;
    if (suTimers[key]) clearTimeout(suTimers[key]);
    suTimers[key] = setTimeout(() => { // 타이핑마다 호출되므로 디바운스
      delete suTimers[key];
      const mid = Sync.idOf(member); if (!mid) return;
      const cur = Store.standupNote(date, member);
      sb.from('standup_entries').upsert(
        { date, member_id: mid, team_id: Sync.teamId, blockers: (cur && cur.blocked) || '', updated_at: new Date().toISOString() },
        { onConflict: 'date,member_id,team_id' }
      ).then(r => { if (r.error) console.warn('[sync] standup', r.error.message); });
    }, 700);
  };

  // 데모 전용·DB 전체를 지우는 작업은 연동 모드에서 차단
  ['resetSeed', 'cleanSim', 'closeQuarter'].forEach(fn => {
    Store[fn] = function () { window.R && window.R.notice('! 플래너 DB 연동 모드에서는 사용할 수 없습니다', 'warn'); return { removed: 0, reverted: 0 }; };
  });

  Store.onChange(d => { if (d && d.remote) return; Sync.onLocalChange(d); });

  window.OKR_SYNC = Sync;
  document.addEventListener('DOMContentLoaded', () => Sync.start());
})();
