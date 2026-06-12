// ── 팀 OKR 터미널 · 데이터 스토어 ─────────────────────────────
// 4계층(O→KR→이니셔티브→할일) 트리 + 멤버 + 활동로그 + 스탠드업 노트
// localStorage 영속화, undo 10단계, 진척률 상향 집계, 날짜 정합성 경고

(function () {
  'use strict';

  // ── 날짜 유틸 ──
  const D = {
    today() { const t = new Date(); return D.str(t); },
    str(d) {
      const y = d.getFullYear(), m = String(d.getMonth() + 1).padStart(2, '0'), dd = String(d.getDate()).padStart(2, '0');
      return y + '-' + m + '-' + dd;
    },
    parse(s) { const [y, m, d] = s.split('-').map(Number); return new Date(y, m - 1, d); },
    add(s, n) { const d = D.parse(s); d.setDate(d.getDate() + n); return D.str(d); },
    diff(a, b) { return Math.round((D.parse(b) - D.parse(a)) / 86400000); }, // b - a (days)
    fmt(s) { if (!s) return '--/--'; const [, m, d] = s.split('-'); return Number(m) + '/' + Number(d); },
    dow(s) { return '일월화수목금토'[D.parse(s).getDay()]; },
    quarterOf(s) {
      const d = D.parse(s); const q = Math.floor(d.getMonth() / 3);
      return { label: d.getFullYear() + '-Q' + (q + 1), start: D.str(new Date(d.getFullYear(), q * 3, 1)), end: D.str(new Date(d.getFullYear(), q * 3 + 3, 0)) };
    },
  };

  const TODAY = D.today();
  const TYPES = ['o', 'kr', 'init', 'task'];
  const TYPE_LABEL = { o: 'O', kr: 'KR', init: '이니셔티브', task: '할일' };
  const STATUS_LABEL = { active: '진행중', done: '완료', hold: '보류' };

  let _seq = 1;
  const uid = () => 'n' + (_seq++) + '_' + Math.random().toString(36).slice(2, 6);

  // ── 스토어 ──
  const Store = {
    data: null,            // { nodes:{id:node}, members:[], standup:{date:{member:{...}}}, log:[], quarter, archives:[] }
    session: null,         // { member }
    undoStack: [],
    listeners: [],
    offline: false,
    offlineQueue: [],

    KEY: 'okrterm_data_v1',
    SESSION_KEY: 'okrterm_session_v1',

    // ── 초기화 ──
    init() {
      try {
        const raw = localStorage.getItem(this.KEY);
        if (raw) { this.data = JSON.parse(raw); }
      } catch (e) { /* corrupt → reseed */ }
      if (!this.data || !this.data.nodes || !Object.keys(this.data.nodes).length) {
        this.data = window.OKR_SEED ? window.OKR_SEED(D, uid, TODAY) : { nodes: {}, members: [], standup: {}, log: [], archives: [] };
        this.data.quarter = D.quarterOf(TODAY).label;
        this.persist();
      }
      try {
        const s = localStorage.getItem(this.SESSION_KEY);
        if (s) this.session = JSON.parse(s);
      } catch (e) { }
      if (this.session && !this.data.members.find(m => m.name === this.session.member)) this.session = null;
      // 구버전 데이터 보정: 시뮬 생성 할일에 simMade 플래그 소급 적용 (F1 청소 대상 인식)
      const SIM_TITLES = ['결과 공유 메모 작성', '관련 문서 링크 정리', '다음 단계 합의', '체크리스트 검토', '운영 가이드 보완'];
      Object.values(this.data.nodes).forEach(n => {
        if (n.type === 'task' && n.simMade === undefined && SIM_TITLES.includes(n.title)) n.simMade = true;
      });
    },

    resetSeed() {
      this.data = window.OKR_SEED(D, uid, TODAY);
      this.data.quarter = D.quarterOf(TODAY).label;
      this.undoStack = [];
      this.persist(); this.notify({ structural: true });
    },

    persist() {
      try { localStorage.setItem(this.KEY, JSON.stringify(this.data)); } catch (e) { }
    },

    login(member) {
      this.session = { member };
      localStorage.setItem(this.SESSION_KEY, JSON.stringify(this.session));
      const m = this.member(member); if (m) m.lastActive = new Date().toISOString();
      this.persist();
    },
    logout() {
      this.session = null;
      localStorage.removeItem(this.SESSION_KEY);
    },
    me() { return this.session ? this.session.member : null; },
    member(name) { return this.data.members.find(m => m.name === name); },

    // ── 구독 ──
    onChange(fn) { this.listeners.push(fn); },
    notify(detail) { this.listeners.forEach(fn => { try { fn(detail || {}); } catch (e) { console.error(e); } }); },

    // ── 트리 조회 ──
    node(id) { return this.data.nodes[id]; },
    children(id) {
      return Object.values(this.data.nodes)
        .filter(n => n.parentId === (id || null))
        .sort((a, b) => a.sort - b.sort);
    },
    roots() { return this.children(null); },
    // 깊이우선 순회 (visible: collapse 고려 안 함 — 뷰에서 처리)
    walk(cb) {
      const rec = (id, depth, ancestors) => {
        for (const n of this.children(id)) {
          cb(n, depth, ancestors);
          rec(n.id, depth + 1, ancestors.concat(n));
        }
      };
      rec(null, 0, []);
    },
    flat() { const out = []; this.walk((n, d, a) => out.push({ node: n, depth: d, ancestors: a })); return out; },
    ancestors(id) {
      const out = []; let n = this.node(id);
      while (n && n.parentId) { n = this.node(n.parentId); if (n) out.unshift(n); }
      return out;
    },
    pathStr(id) {
      const anc = this.ancestors(id);
      const labels = anc.map((n, i) => i === 0 ? 'O' + (this.roots().indexOf(n) + 1) : (n.type === 'kr' ? 'KR' + (this.children(n.parentId).indexOf(n) + 1) : n.title));
      return labels.join(' > ');
    },
    descendants(id) {
      const out = [];
      const rec = nid => { for (const c of this.children(nid)) { out.push(c); rec(c.id); } };
      rec(id); return out;
    },

    // ── 진척률 (상향 집계) ──
    percent(id) {
      const n = this.node(id); if (!n) return 0;
      if (n.type === 'task') return n.status === 'done' ? 100 : 0;
      const kids = this.children(id);
      if (n.type === 'init') {
        if (!kids.length) return n.status === 'done' ? 100 : 0;
        const done = kids.filter(k => k.status === 'done').length;
        return Math.round(done / kids.length * 100);
      }
      // kr, o → 자식 평균
      if (!kids.length) return n.status === 'done' ? 100 : 0;
      return Math.round(kids.reduce((s, k) => s + this.percent(k.id), 0) / kids.length);
    },

    // ── 날짜 정합성 ──
    dateWarn(id) { // 자식 기간이 부모 기간 이탈 → 본인 경고
      const n = this.node(id); if (!n || !n.parentId) return false;
      const p = this.node(n.parentId); if (!p) return false;
      return (n.start && p.start && n.start < p.start) || (n.end && p.end && n.end > p.end);
    },
    parentWarn(id) { // 자식 중 이탈 항목 존재 → 부모에도 표식
      return this.children(id).some(c => this.dateWarn(c.id) || this.parentWarn(c.id));
    },

    // ── 이월 ──
    carryDays(t) {
      if (t.type !== 'task' || t.status === 'done' || !t.due) return 0;
      const d = D.diff(t.due, TODAY);
      return d > 0 ? d : 0;
    },

    // ── 활동 로그 ──
    log(actor, action, target, extra) {
      this.data.log.unshift({
        ts: new Date().toISOString(), actor, action,
        target: target ? (TYPE_LABEL[target.type] + ' "' + target.title + '"') : '',
        extra: extra || '',
      });
      if (this.data.log.length > 500) this.data.log.length = 500;
    },

    // ── undo ──
    pushUndo() {
      this.undoStack.push(JSON.stringify(this.data.nodes));
      if (this.undoStack.length > 10) this.undoStack.shift();
    },
    undo() {
      const snap = this.undoStack.pop();
      if (!snap) return false;
      this.data.nodes = JSON.parse(snap);
      this.log(this.me(), '실행취소', null);
      this.persist(); this.notify({ structural: true });
      return true;
    },

    // ── 변경 작업 (actor: 사람 이름, sim: 가상팀원 여부) ──
    _commit(changedIds, opts) {
      this.persist();
      this.notify(Object.assign({ changed: changedIds || [] }, opts || {}));
      if (this.offline && !(opts && opts.sim)) this.offlineQueue.push(Date.now());
    },

    create(type, parentId, fields, opts) {
      opts = opts || {};
      if (!opts.sim) this.pushUndo();
      const sibs = this.children(parentId || null);
      let sort = (opts.afterId != null)
        ? (this.node(opts.afterId) ? this.node(opts.afterId).sort + 0.5 : sibs.length)
        : sibs.length;
      const now = new Date().toISOString();
      const n = Object.assign({
        id: uid(), type, parentId: parentId || null, title: '', owner: opts.actor || this.me(),
        start: TODAY, end: type === 'task' ? TODAY : D.add(TODAY, 14),
        due: type === 'task' ? TODAY : undefined,
        status: 'active', sort, createdAt: now, updatedAt: now, updatedBy: opts.actor || this.me(),
        completedAt: null, carry: 0,
      }, fields || {});
      this.data.nodes[n.id] = n;
      this._normalizeSort(parentId || null);
      this.log(opts.actor || this.me(), '생성', n);
      this._commit([n.id], opts);
      return n;
    },

    update(id, fields, opts) {
      opts = opts || {};
      const n = this.node(id); if (!n) return null;
      if (fields.start && fields.end && fields.end < fields.start) return { error: '종료일이 시작일보다 빠릅니다 — 저장 거부' };
      if (fields.end && !fields.start && n.start && fields.end < n.start) return { error: '종료일이 시작일보다 빠릅니다 — 저장 거부' };
      if (fields.start && !fields.end && n.end && n.end < fields.start) return { error: '종료일이 시작일보다 빠릅니다 — 저장 거부' };
      if (!opts.sim) this.pushUndo();
      Object.assign(n, fields, { updatedAt: new Date().toISOString(), updatedBy: opts.actor || this.me() });
      this.log(opts.actor || this.me(), '수정', n, opts.logExtra);
      this._commit([id], opts);
      return n;
    },

    toggleDone(id, opts) {
      opts = opts || {};
      const n = this.node(id); if (!n) return;
      if (!opts.sim) this.pushUndo();
      const done = n.status !== 'done';
      n.status = done ? 'done' : 'active';
      n.completedAt = done ? new Date().toISOString() : null;
      if (opts.sim && done) n.simDone = true; else delete n.simDone; // 데모 활동 추적 (청소용)
      n.updatedAt = new Date().toISOString(); n.updatedBy = opts.actor || this.me();
      this.log(opts.actor || this.me(), done ? '완료' : '완료해제', n);
      this._commit([id].concat(this.ancestors(id).map(a => a.id)), opts);
    },

    remove(id, opts) {
      opts = opts || {};
      const n = this.node(id); if (!n) return;
      if (!opts.sim) this.pushUndo();
      const all = [n].concat(this.descendants(id));
      all.forEach(x => delete this.data.nodes[x.id]);
      this.log(opts.actor || this.me(), '삭제', n, all.length > 1 ? '자식 ' + (all.length - 1) + '개 포함' : '');
      this._commit([], Object.assign({ structural: true }, opts));
      return all.length;
    },

    move(id, newParentId, beforeId, opts) { // beforeId 앞에 삽입 (null → 맨 뒤)
      opts = opts || {};
      const n = this.node(id); if (!n) return;
      if (id === newParentId) return;
      if (this.descendants(id).some(d => d.id === newParentId)) return; // 자기 자손 밑으로 금지
      if (!opts.sim) this.pushUndo();
      n.parentId = newParentId || null;
      const sibs = this.children(n.parentId).filter(s => s.id !== id);
      let idx = beforeId ? sibs.findIndex(s => s.id === beforeId) : sibs.length;
      if (idx < 0) idx = sibs.length;
      sibs.splice(idx, 0, n);
      sibs.forEach((s, i) => s.sort = i);
      n.updatedAt = new Date().toISOString(); n.updatedBy = opts.actor || this.me();
      this.log(opts.actor || this.me(), '이동', n);
      this._commit([id], Object.assign({ structural: true }, opts));
    },

    reorder(id, dir, opts) { // dir: -1 위, +1 아래
      const n = this.node(id); if (!n) return;
      const sibs = this.children(n.parentId);
      const i = sibs.indexOf(n), j = i + dir;
      if (j < 0 || j >= sibs.length) return;
      if (!(opts && opts.sim)) this.pushUndo();
      [sibs[i].sort, sibs[j].sort] = [sibs[j].sort, sibs[i].sort];
      this.log((opts && opts.actor) || this.me(), '순서변경', n);
      this._commit([id], Object.assign({ structural: true }, opts || {}));
    },

    // 계층 승격/강등: 타입이 함께 한 단계 이동. 자손도 연쇄 이동.
    shiftLevel(id, dir, opts) { // dir: -1 승격(←), +1 강등(→)
      const n = this.node(id); if (!n) return { error: '' };
      const ti = TYPES.indexOf(n.type);
      const desc = this.descendants(id);
      // 타입 범위 검사
      const all = [n].concat(desc);
      for (const x of all) {
        const ni = TYPES.indexOf(x.type) + dir;
        if (ni < 0 || ni >= TYPES.length) return { error: '계층 이동 불가: ' + TYPE_LABEL[x.type] + ' 범위 초과' };
      }
      let newParent;
      if (dir === -1) {
        const p = n.parentId && this.node(n.parentId);
        if (!p) return { error: '최상위 항목은 승격할 수 없습니다' };
        newParent = p.parentId; // 부모의 형제가 됨
      } else {
        const sibs = this.children(n.parentId);
        const i = sibs.indexOf(n);
        const prev = sibs[i - 1];
        if (!prev) return { error: '강등하려면 위에 형제 항목이 필요합니다' };
        newParent = prev.id; // 윗형제의 자식이 됨
      }
      if (!(opts && opts.sim)) this.pushUndo();
      all.forEach(x => { x.type = TYPES[TYPES.indexOf(x.type) + dir]; });
      n.parentId = newParent || null;
      n.sort = this.children(n.parentId).length + 1;
      this._normalizeSort(n.parentId);
      this.log((opts && opts.actor) || this.me(), dir === -1 ? '승격' : '강등', n);
      this._commit([id], Object.assign({ structural: true }, opts || {}));
      return { ok: true };
    },

    // 데모 활동 청소: 시뮬이 만든 항목 제거 + 시뮬이 완료시킨 항목 복원
    cleanSim() {
      this.pushUndo();
      let removed = 0, reverted = 0;
      Object.values(this.data.nodes).forEach(n => {
        if (n.simMade) { delete this.data.nodes[n.id]; removed++; }
      });
      Object.values(this.data.nodes).forEach(n => {
        if (n.simDone && n.status === 'done') { n.status = 'active'; n.completedAt = null; delete n.simDone; reverted++; }
      });
      this.log(this.me(), '데모청소', null, '생성 ' + removed + '건 제거 · 완료 ' + reverted + '건 복원');
      this.persist(); this.notify({ structural: true });
      return { removed, reverted };
    },

    // 드래그로 다른 계층에 떨어뜨릴 때: 타입을 맞춰 변환 후 이동
    moveRetype(id, newParentId, beforeId, requiredType, opts) {
      const n = this.node(id); if (!n) return { error: '' };
      const delta = TYPES.indexOf(requiredType) - TYPES.indexOf(n.type);
      if (delta !== 0) {
        const all = [n].concat(this.descendants(id));
        for (const x of all) {
          const ni = TYPES.indexOf(x.type) + delta;
          if (ni < 0 || ni >= TYPES.length) return { error: '이동 불가: 하위 항목이 계층 범위를 벗어남' };
        }
        if (!(opts && opts.sim)) this.pushUndo();
        all.forEach(x => { x.type = TYPES[TYPES.indexOf(x.type) + delta]; });
        this.move(id, newParentId, beforeId, Object.assign({}, opts, { sim: true })); // undo는 위에서 1회만
        this.log((opts && opts.actor) || this.me(), '계층이동', n);
        this._commit([id], Object.assign({ structural: true }, opts || {}));
      } else {
        this.move(id, newParentId, beforeId, opts);
      }
      return { ok: true };
    },

    _normalizeSort(parentId) {
      this.children(parentId).forEach((s, i) => s.sort = i);
    },

    // ── 오늘/최근 ──
    todayTasks() {
      // 날짜 기준 소속: 마감 도래·이월 + 진행 중(시작일 도래).
      // 완료해도 '오늘 완료한 것'은 오늘의 할일에 [x]로 남는다 — 다음 날부터 최근 할일로.
      return Object.values(this.data.nodes)
        .filter(n => {
          if (n.type !== 'task') return false;
          if (n.status === 'done') return !!(n.completedAt && String(n.completedAt).slice(0, 10) === TODAY);
          if (n.due) return n.due <= TODAY || (n.start && n.start <= TODAY);
          return !!(n.start && n.start <= TODAY);
        })
        .sort((a, b) => {
          const ad = a.due || '9999-12-31', bd = b.due || '9999-12-31';
          return ad < bd ? -1 : ad > bd ? 1 : a.sort - b.sort;
        });
    },
    recentDone(days) {
      const cut = D.add(TODAY, -(days || 7));
      return Object.values(this.data.nodes)
        .filter(n => n.type === 'task' && n.status === 'done' && n.completedAt && n.completedAt.slice(0, 10) >= cut)
        .sort((a, b) => (a.completedAt < b.completedAt ? 1 : -1));
    },
    recentTasks(days) { // '오늘 이전' 날짜에 입력(생성)된 최근 N일 내 할일 — 완료 여부 무관
      const cut = D.add(TODAY, -(days || 7));
      return Object.values(this.data.nodes)
        .filter(n => {
          if (n.type !== 'task') return false;
          const cd = (n.createdAt || '').slice(0, 10);
          return cd && cd < TODAY && cd >= cut;
        })
        .sort((a, b) => (b.createdAt || '').localeCompare(a.createdAt || ''));
    },
    dueSoon(days) {
      const lim = D.add(TODAY, days || 7);
      return Object.values(this.data.nodes)
        .filter(n => n.type === 'task' && n.status !== 'done' && n.due && n.due > TODAY && n.due <= lim)
        .sort((a, b) => a.due < b.due ? -1 : 1);
    },

    // ── 스탠드업 노트 ──
    standupNote(date, member) {
      const d = this.data.standup[date];
      return (d && d[member]) || { blocked: '' };
    },
    saveStandupNote(date, member, note) {
      if (!this.data.standup[date]) this.data.standup[date] = {};
      this.data.standup[date][member] = Object.assign({}, this.data.standup[date][member], note);
      this.persist();
    },

    // ── CSV ──
    csvTree() {
      const rows = [['유형', '경로', '제목', '담당', '시작', '종료', '마감', '상태', '진척%']];
      this.walk((n) => {
        rows.push([TYPE_LABEL[n.type], this.pathStr(n.id), n.title, n.owner || '',
          n.start || '', n.end || '', n.due || '', STATUS_LABEL[n.status], this.percent(n.id) + '']);
      });
      return rows.map(r => r.map(c => '"' + String(c).replace(/"/g, '""') + '"').join(',')).join('\r\n');
    },

    // ── 분기 마감 ──
    closeQuarter(copy) {
      this.pushUndo();
      this.data.archives.push({ quarter: this.data.quarter, closedAt: new Date().toISOString(), nodes: JSON.parse(JSON.stringify(this.data.nodes)) });
      if (copy) {
        Object.values(this.data.nodes).forEach(n => {
          if (n.type === 'task') delete this.data.nodes[n.id];
          else { n.status = 'active'; n.completedAt = null; }
        });
      } else {
        this.data.nodes = {};
      }
      const q = D.quarterOf(TODAY);
      this.data.quarter = q.label;
      this.log(this.me(), '분기마감', null, copy ? '지난 분기 복사 후 시작' : '빈 상태로 시작');
      this.persist(); this.notify({ structural: true });
    },
  };

  window.OKRD = D;
  window.OKRT = { TODAY, TYPES, TYPE_LABEL, STATUS_LABEL };
  window.Store = Store;
})();
