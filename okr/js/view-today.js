// ── [1] 오늘 ──────────────────────────────────────────────────
(function () {
  'use strict';
  const S = () => window.Store;

  const ViewToday = {
    el: null,
    sel: 0, // 좌측 목록 선택 인덱스

    mount(el) { this.el = el; this.render(); },

    list() { // 내 할일 먼저, 그 아래 다른 팀원 할일 (각 그룹 내 정렬은 유지)
      const me = S().me();
      const t = S().todayTasks();
      return t.filter(x => x.owner === me).concat(t.filter(x => x.owner !== me));
    },

    mine(t) { return t && t.owner === S().me(); }, // 제목·날짜 직접 입력과 삭제는 본인 할일만

    // 입력 중이면 외부 변경 재렌더 보류 (App.isInteracting에서 사용)
    isTyping() {
      const ae = document.activeElement;
      return !!(ae && this.el && this.el.contains(ae) && /live-(title|start|due)/.test(ae.className || ''));
    },

    // 공통 행: 본인 할일은 [수정] 없이 제목·날짜를 바로 입력 가능
    rowHtml(t, opts) {
      const mine = this.mine(t);
      const done = t.status === 'done';
      const titleHtml = mine
        ? '<input type="text" class="live-title seamless' + (done ? ' done-title' : '') + '" value="' + window.R.esc(t.title) + '" placeholder="제목 입력...">'
        : '<span class="' + (done ? 'done-title' : 'title') + '">' + window.R.esc(t.title) + '</span>';
      const dates = mine
        ? ' <span class="dim live-dates"><input type="date" class="live-start seamless" value="' + (t.start || '') + '" title="시작일"><span>~</span><input type="date" class="live-due seamless" value="' + (t.due || '') + '" title="마감일"></span>'
        : '';
      const acts = '<span class="row-actions ta-show"><button data-ta="del" title="삭제">[삭제]</button></span>';
      // 본인 할일은 소속(이니셔티브)도 그 자리에서 변경 가능
      const belong = mine
        ? '<div class="path">소속: <select class="live-parent seamless dim" title="소속 이니셔티브 변경">' + window.R.initOptions(t.parentId) + '</select></div>'
        : '<div class="path">' + window.R.pathLine(t.id) + '</div>';
      return '<div class="row ' + opts.cls + '" data-node-id="' + t.id + '"' + (opts.idx != null ? ' data-idx="' + opts.idx + '"' : '') + '>'
        + '<div class="trow">'
        + '<span class="cb" title="완료 토글">' + (done ? '[x]' : '[ ]') + '</span>'
        + titleHtml
        + (opts.meta || '')
        + dates
        + acts
        + '</div>'
        + belong
        + '</div>';
    },

    render() {
      const tasks = this.list();
      const recentAll = S().recentTasks(7); // 오늘 이전 날짜에 입력된 것 — 완료 여부 무관
      const recent = recentAll.slice(0, 15);
      if (this.sel >= tasks.length) this.sel = Math.max(0, tasks.length - 1);

      let left = '';
      if (!tasks.length) {
        left = '<div class="empty">오늘의 할일이 없습니다. [2]트리에서 할일에 마감일을 지정하세요.</div>';
      } else {
        left = tasks.map((t, i) => {
          const editing = window.Sim && window.Sim.editingBy(t.id);
          const dueTag = !this.mine(t) && t.due && t.due > window.OKRT.TODAY ? ' <span class="dim">~' + window.OKRD.fmt(t.due) + '</span>' : '';
          const meta = window.R.carryTag(t) + window.R.warnTag(t.id) + dueTag
            + ' <span class="owner">@' + window.R.esc(t.owner) + '</span>'
            + (editing ? ' <span class="editing">[' + editing + ' 편집중]</span>' : '');
          // 내 할일 그룹이 끝나는 지점에 구분선 — 다른 팀원 항목과 섞이지 않게
          const sep = (i > 0 && !this.mine(t) && this.mine(tasks[i - 1]))
            ? '<div class="row dim group-sep">── 다른 팀원 ──────────</div>' : '';
          return sep + this.rowHtml(t, { cls: 'sel-row' + (i === this.sel ? ' selected' : ''), idx: i, meta });
        }).join('');
        if (tasks.length && !this.mine(tasks[0])) left = '<div class="row dim group-sep">── 다른 팀원 ──────────</div>' + left;
      }

      let right = '';
      if (!recent.length) {
        right = '<div class="empty">어제 이전 7일 내 입력된 할일이 없습니다.</div>';
      } else {
        right = recent.map(t => {
          const meta = ' <span class="dim">— ' + window.R.esc(t.owner) + ' · ' + window.OKRD.fmt((t.createdAt || '').slice(0, 10)) + ' 입력</span>';
          return this.rowHtml(t, { cls: 'done-row', meta });
        }).join('');
        if (recentAll.length > recent.length) {
          right += '<div class="row dim">… 외 ' + (recentAll.length - recent.length) + '건 (전체는 [5]관리 → 활동 로그)</div>';
        }
      }

      // 새 할일 즉시 추가 행 — 소속(이니셔티브) 선택 + 제목 입력 후 ⏎
      const savedParent = localStorage.getItem('okrterm_add_parent');
      const initOpts = window.R.initOptions(savedParent);
      const addRow = initOpts
        ? '<div class="row trow add-task-row"><span class="tlabel">[+]</span>'
        + '<input type="text" class="add-title seamless live-title" placeholder="새 할일 — 제목 입력 후 ⏎ (오늘 마감 · 나에게 할당)">'
        + '<span class="dim">소속</span> <select class="add-parent seamless dim">' + initOpts + '</select>'
        + '</div>'
        : '<div class="row dim add-task-row">[+] 할일을 추가하려면 [2]트리에서 이니셔티브를 먼저 만드세요.</div>';

      this.el.innerHTML =
        '<div class="today-grid">'
        + '<section class="panel"><div class="panel-title">┌─ 최근 할일 (오늘 이전 7일, ' + recentAll.length + ') ' + '─'.repeat(4) + '</div>'
        + right + '</section>'
        + '<section class="panel"><div class="panel-title">┌─ 오늘의 할일 (' + tasks.length + ') ' + '─'.repeat(8) + '</div>'
        + left
        + addRow
        + '<div class="hint dim">[+]행에서 새 할일 바로 추가 · 제목·날짜 클릭 즉시 입력(본인) · Space 완료 · j/k 이동</div></section>'
        + '</div>';

      this.bind();
      this.bindAdd();
      if (this._refocusAdd) { this._refocusAdd = false; const a = this.el.querySelector('.add-title'); if (a) a.focus(); }
    },

    bind() {
      const self = this;
      this.el.querySelectorAll('.sel-row, .done-row').forEach(row => {
        const id = row.dataset.nodeId;
        if (row.classList.contains('sel-row')) {
          row.addEventListener('click', (e) => {
            if (/^(INPUT|BUTTON|SELECT)$/.test(e.target.tagName)) return; // 입력·버튼 클릭은 선택 이동 안 함
            self.sel = +row.dataset.idx; self.render();
          });
        }
        const cb = row.querySelector('.cb');
        if (cb) cb.addEventListener('click', (e) => { e.stopPropagation(); S().toggleDone(id); });

        const delBtn = row.querySelector('[data-ta="del"]');
        if (delBtn) delBtn.addEventListener('click', (e) => {
          e.stopPropagation();
          const n = S().node(id); if (!n) return;
          if (!self.mine(n)) { window.R.notice('! 본인 할일만 삭제할 수 있습니다', 'warn'); return; }
          if (!confirm('"' + (n.title || '(제목 없음)') + '" 할일을 삭제할까요?')) return;
          S().remove(n.id);
          window.R.notice('삭제됨 — u 키로 되돌리기 가능');
        });

        // 즉시 입력: 제목 (Enter/포커스아웃 시 저장)
        const ti = row.querySelector('.live-title');
        if (ti) {
          ti.addEventListener('keydown', (e) => {
            if (e.isComposing || e.keyCode === 229) { e.stopPropagation(); return; } // 한글 조합 보호
            if (e.key === 'Enter') { e.preventDefault(); ti.blur(); }
            if (e.key === 'Escape') { const n = S().node(id); ti.value = n ? n.title : ti.value; ti.blur(); }
            e.stopPropagation();
          });
          ti.addEventListener('change', () => {
            const n = S().node(id); if (!n) return;
            const v = ti.value.trim();
            if (v && v !== n.title) S().update(id, { title: v });
            else ti.value = n.title;
          });
          ti.addEventListener('blur', () => setTimeout(() => { if (!self.isTyping() && window.App) { window.App.flushPending(); self.render(); } }, 0));
        }
        // 즉시 입력: 시작~마감일
        const ds = row.querySelector('.live-start'), dd = row.querySelector('.live-due');
        const dateCommit = () => {
          const n = S().node(id); if (!n) return;
          const fields = {};
          if (ds && ds.value && ds.value !== n.start) fields.start = ds.value;
          if (dd && dd.value && dd.value !== n.due) { fields.due = dd.value; fields.end = dd.value; }
          if (Object.keys(fields).length) {
            const res = S().update(id, fields);
            if (res && res.error) { window.R.notice('! ' + res.error, 'warn'); if (ds) ds.value = n.start || ''; if (dd) dd.value = n.due || ''; }
          }
        };
        if (ds) ds.addEventListener('change', dateCommit);
        if (dd) dd.addEventListener('change', dateCommit);

        // 소속 변경 (본인 할일)
        const lp = row.querySelector('.live-parent');
        if (lp) {
          lp.addEventListener('keydown', e => e.stopPropagation());
          lp.addEventListener('change', () => {
            const n = S().node(id); if (!n || !lp.value || lp.value === n.parentId) return;
            S().move(id, lp.value, null);
            window.R.notice('소속 변경됨');
          });
        }
      });
    },

    bindAdd() {
      const inp = this.el.querySelector('.add-title');
      const sel = this.el.querySelector('.add-parent');
      if (!inp || !sel) return;
      sel.addEventListener('change', () => { try { localStorage.setItem('okrterm_add_parent', sel.value); } catch (e) { } });
      sel.addEventListener('keydown', e => e.stopPropagation());
      inp.addEventListener('keydown', (e) => {
        if (e.isComposing || e.keyCode === 229) { e.stopPropagation(); return; } // 한글 조합 보호
        if (e.key === 'Enter') {
          e.preventDefault();
          const title = inp.value.trim();
          if (!title) return;
          const pid = sel.value;
          if (!pid) { window.R.notice('! 이니셔티브를 선택하세요', 'warn'); return; }
          try { localStorage.setItem('okrterm_add_parent', pid); } catch (err) { }
          const TODAY = window.OKRT.TODAY;
          this._refocusAdd = true; // 생성 후 재렌더 시 입력칸으로 복귀 — 연속 입력
          S().create('task', pid, { title, owner: S().me(), start: TODAY, due: TODAY, end: TODAY });
          // 입력칸 포커스 중에는 재렌더가 보류되므로 즉시 갱신
          if (window.App && window.App.flushPending) window.App.flushPending(); else this.render();
          window.R.notice('할일 추가됨: "' + window.R.esc(title) + '"');
        }
        if (e.key === 'Escape') { inp.value = ''; inp.blur(); }
        e.stopPropagation();
      });
    },

    selectedTask() { return this.list()[this.sel]; },

    onKey(e) {
      const tasks = this.list();
      const k = window.keyOf(e);
      if (k === 'j' || e.key === 'ArrowDown') { this.sel = Math.min(tasks.length - 1, this.sel + 1); this.render(); return true; }
      if (k === 'k' || e.key === 'ArrowUp') { this.sel = Math.max(0, this.sel - 1); this.render(); return true; }
      if (e.key === ' ') {
        const t = this.selectedTask();
        if (t) S().toggleDone(t.id);
        return true;
      }
      if (e.key === 'Enter') {
        const t = this.selectedTask();
        if (!t) return true;
        if (!this.mine(t)) { window.R.notice('! 본인 할일만 수정할 수 있습니다', 'warn'); return true; }
        const row = this.el.querySelector('.sel-row[data-node-id="' + t.id + '"] .live-title');
        if (row) { row.focus(); row.setSelectionRange(row.value.length, row.value.length); }
        return true;
      }
      return false;
    },
  };

  window.ViewToday = ViewToday;
})();
