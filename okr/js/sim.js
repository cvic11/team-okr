// ── 실시간 협업 시뮬레이터 — 가상 팀원 활동 데모 ─────────────────
// 실제 구현은 Supabase Realtime. 프로토타입에서는 가상 팀원이 주기적으로
// 생성/수정/완료 작업을 수행해 presence·색반전·충돌 알림 동작을 시연한다.
(function () {
  'use strict';
  const S = () => window.Store;

  const Sim = {
    enabled: true,
    intervalMs: 9000,
    timer: null,
    presence: {},        // name -> bool (접속)
    editing: {},         // nodeId -> { name, until }
    userEditingId: null, // 내가 편집 중인 노드 (충돌 데모용)

    start() {
      this.stop();
      const others = this.others();
      // 로그인 전 시드된 presence 정리(현재 사용자 포함 금지)
      Object.keys(this.presence).forEach(k => { if (!others.includes(k)) delete this.presence[k]; });
      others.forEach((m, i) => { if (!(m in this.presence)) this.presence[m] = i < 2; }); // 처음엔 2명 접속
      this.tick = this.tick.bind(this);
      this.timer = setInterval(() => this.tick(), this.intervalMs);
    },
    stop() { if (this.timer) clearInterval(this.timer); this.timer = null; },
    setIntervalMs(ms) { this.intervalMs = ms; if (this.enabled) this.start(); },
    setEnabled(on) {
      this.enabled = on;
      if (on) this.start(); else { this.stop(); this.editing = {}; }
      if (window.App) window.App.renderTopbar();
    },

    others() { return S().data.members.map(m => m.name).filter(n => n !== S().me()); },
    online() { return Object.keys(this.presence).filter(n => this.presence[n] && n !== S().me()); },

    editingBy(nodeId) {
      const e = this.editing[nodeId];
      if (e && e.until > Date.now()) return e.name;
      if (e) delete this.editing[nodeId];
      return null;
    },
    userEditing(id) { this.userEditingId = id; },

    tick() {
      if (!this.enabled || !S().me()) return;
      // 안전장치: presence에 현재 사용자가 남아 있으면 제거
      if (S().me() in this.presence) delete this.presence[S().me()];
      const r = Math.random();

      // 가끔 접속 상태 변동
      if (r < 0.15) {
        const others = this.others();
        const m = others[Math.floor(Math.random() * others.length)];
        this.presence[m] = !this.presence[m];
        if (window.App) window.App.renderTopbar();
        return;
      }

      const online = this.online();
      if (!online.length) { const o = this.others()[0]; if (o) this.presence[o] = true; return; }
      const actor = online[Math.floor(Math.random() * online.length)];
      const mem = S().member(actor); if (mem) { mem.lastActive = new Date().toISOString(); }

      // 충돌 데모: 내가 편집 중인 항목을 가끔 건드림
      if (this.userEditingId && Math.random() < 0.25 && S().node(this.userEditingId)) {
        const n = S().node(this.userEditingId);
        S().update(n.id, { end: window.OKRD.add(n.end || window.OKRT.TODAY, 1) }, { sim: true, actor, logExtra: '종료일 +1d' });
        window.R.conflictNotice(n.title, actor,
          () => { /* 내 것 유지: 편집 폼 그대로 둠 */ },
          () => { if (window.ViewTree.editingId === n.id) window.ViewTree.cancelEdit(); window.App.refresh(); });
        return;
      }

      const tasks = Object.values(S().data.nodes).filter(n => n.type === 'task');
      const open = tasks.filter(t => t.status !== 'done');
      const simOpen = open.filter(t => t.simMade);
      const simAll = tasks.filter(t => t.simMade);
      const simDoneTasks = simAll.filter(t => t.status === 'done');
      const pick = arr => arr[Math.floor(Math.random() * arr.length)];
      const r2 = Math.random();

      if (r2 < 0.30) {
        // 할일 완료 — 시뮬 생성 항목 우선, 실데이터는 낮은 확률로만 (데이터 잠식 방지)
        const t = simOpen.length ? pick(simOpen)
          : (Math.random() < 0.12 && open.length ? pick(open) : null);
        if (!t) { if (open.length) this.markEditing(pick(open).id, actor, 5000); return; }
        this.markEditing(t.id, actor, 1800);
        setTimeout(() => {
          if (!S().node(t.id) || S().node(t.id).status === 'done') return;
          S().toggleDone(t.id, { sim: true, actor });
          window.R.notice(actor + ' — "' + window.R.esc(t.title) + '" 완료');
        }, 1800);
      } else if (r2 < 0.50 && open.length) {
        // 날짜 수정 (편집중 표시 → 변경)
        const t = pick(open);
        this.markEditing(t.id, actor, 3500);
        setTimeout(() => {
          if (!S().node(t.id)) return;
          const f = t.type === 'task' ? { due: window.OKRD.add(t.due, 1), end: window.OKRD.add(t.due, 1) } : { end: window.OKRD.add(t.end, 1) };
          S().update(t.id, f, { sim: true, actor, logExtra: '마감 +1d' });
          window.R.notice(actor + ' — "' + window.R.esc(t.title) + '" 마감 변경');
        }, 3500);
      } else if (r2 < 0.60 && simOpen.length < 3 && simAll.length < 8) {
        // 새 할일 생성 — 미완료 3개·누적 8개 상한 (F1)
        const inits = Object.values(S().data.nodes).filter(n => n.type === 'init' && n.status !== 'done');
        if (!inits.length) return;
        const p = pick(inits);
        const titles = ['결과 공유 메모 작성', '관련 문서 링크 정리', '다음 단계 합의', '체크리스트 검토', '운영 가이드 보완'];
        const n = S().create('task', p.id, {
          title: pick(titles),
          owner: actor, due: window.OKRD.add(window.OKRT.TODAY, 1 + Math.floor(Math.random() * 4)),
          simMade: true,
        }, { sim: true, actor });
        window.R.notice(actor + ' — 할일 추가: "' + window.R.esc(n.title) + '"');
      } else if (r2 < 0.70 && simDoneTasks.length) {
        // 자신이 완료한 시뮬 항목을 다시 열기 — 양방향 동기화 시연 + 평형 유지
        const t = pick(simDoneTasks);
        S().toggleDone(t.id, { sim: true, actor });
        window.R.notice(actor + ' — "' + window.R.esc(t.title) + '" 완료 해제');
      } else {
        // 편집중 표시만 (들여다보는 중)
        if (open.length) this.markEditing(pick(open).id, actor, 5000);
      }
    },

    markEditing(nodeId, name, ms) {
      this.editing[nodeId] = { name, until: Date.now() + ms };
      if (window.App) window.App.refresh({ soft: true });
      setTimeout(() => { delete this.editing[nodeId]; if (window.App) window.App.refresh({ soft: true }); }, ms + 50);
    },

    // ── 네트워크 단절 데모 ──
    goOffline(seconds) {
      if (S().offline) return;
      S().offline = true;
      S().offlineQueue = [];
      if (window.App) window.App.renderTopbar();
      window.R.notice('네트워크 단절됨 — 조작은 큐에 쌓입니다', 'warn', true);
      setTimeout(() => {
        const n = S().offlineQueue.length;
        S().offline = false;
        S().offlineQueue = [];
        if (window.App) window.App.renderTopbar();
        window.R.notice('재접속 — 큐에 쌓인 ' + n + '건 동기화 완료');
      }, (seconds || 8) * 1000);
    },
  };

  window.Sim = Sim;
})();
