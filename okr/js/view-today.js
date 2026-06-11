// ── [1] 오늘 ──────────────────────────────────────────────────
(function () {
  'use strict';
  const S = () => window.Store;

  const ViewToday = {
    el: null,
    sel: 0, // 좌측 목록 선택 인덱스
    editingId: null, // 화면 내 인라인 편집 중인 할일

    mount(el) { this.el = el; this.render(); },

    list() { return S().todayTasks(); },

    mine(t) { return t && t.owner === S().me(); }, // 수정·삭제는 본인 할일만

    // 행 자리에 그대로 나타나는 인라인 편집 폼 (트리로 이동하지 않음)
    editRowHtml(t) {
      return '<div class="row edit-row today-edit" data-node-id="' + t.id + '">'
        + window.R.checkbox(t) + ' '
        + '<input type="text" class="edit-title seamless" value="' + window.R.esc(t.title) + '" placeholder="제목 입력...">'
        + ' <span class="dim edit-dates"><input type="date" class="edit-start seamless" value="' + (t.start || '') + '"><span>~</span>'
        + '<input type="date" class="edit-due seamless" value="' + (t.due || '') + '" title="마감일"></span>'
        + ' <span class="dim">⏎ 저장 · <button class="lnk edit-esc">Esc 취소</button></span>'
        + '<div class="path">' + window.R.pathLine(t.id) + '</div>'
        + '</div>';
    },

    render() {
      const tasks = this.list();
      const recentAll = S().recentTasks(7); // 완료 여부 무관
      const recent = recentAll.slice(0, 15);
      if (this.sel >= tasks.length) this.sel = Math.max(0, tasks.length - 1);
      const acts = t => this.mine(t)
        ? '<span class="row-actions"><button data-ta="edit">[수정]</button><button data-ta="del">[삭제]</button></span>'
        : '';

      let left = '';
      if (!tasks.length) {
        left = '<div class="empty">오늘의 할일이 없습니다. [2]트리에서 할일에 마감일을 지정하세요.</div>';
      } else {
        left = tasks.map((t, i) => {
          if (t.id === this.editingId) return this.editRowHtml(t);
          const editing = window.Sim && window.Sim.editingBy(t.id);
          const dueTag = t.due && t.due > window.OKRT.TODAY ? ' <span class="dim">~' + window.OKRD.fmt(t.due) + '</span>' : '';
          return '<div class="row sel-row' + (i === this.sel ? ' selected' : '') + '" data-node-id="' + t.id + '" data-idx="' + i + '">'
            + window.R.checkbox(t) + ' '
            + '<span class="title">' + window.R.esc(t.title) + '</span>'
            + window.R.carryTag(t) + window.R.warnTag(t.id) + dueTag
            + ' <span class="owner">@' + window.R.esc(t.owner) + '</span>'
            + (editing ? ' <span class="editing">[' + editing + ' 편집중]</span>' : '')
            + acts(t)
            + '<div class="path">' + window.R.pathLine(t.id) + '</div>'
            + '</div>';
        }).join('');
      }

      let right = '';
      if (!recent.length) {
        right = '<div class="empty">최근 7일 내 할일 활동이 없습니다.</div>';
      } else {
        right = recent.map(t => {
          if (t.id === this.editingId) return this.editRowHtml(t);
          const done = t.status === 'done';
          const ts = t.completedAt || t.updatedAt || t.createdAt;
          return '<div class="row done-row" data-node-id="' + t.id + '">'
            + '<span class="cb" title="완료 토글">' + (done ? '[x]' : '[ ]') + '</span> '
            + '<span class="' + (done ? 'done-title' : 'title') + '">' + window.R.esc(t.title) + '</span>'
            + ' <span class="dim">— ' + window.R.esc(t.updatedBy || t.owner) + ' · ' + window.R.fmtTs(ts) + '</span>'
            + acts(t)
            + '<div class="path">' + window.R.pathLine(t.id) + '</div>'
            + '</div>';
        }).join('');
        if (recentAll.length > recent.length) {
          right += '<div class="row dim">… 외 ' + (recentAll.length - recent.length) + '건 (전체는 [5]관리 → 활동 로그)</div>';
        }
      }

      this.el.innerHTML =
        '<div class="today-grid">'
        + '<section class="panel"><div class="panel-title">┌─ 최근 할일 (7일, ' + recentAll.length + ') ' + '─'.repeat(4) + '</div>'
        + right + '</section>'
        + '<section class="panel"><div class="panel-title">┌─ 오늘의 할일 (' + tasks.length + ') ' + '─'.repeat(8) + '</div>'
        + left
        + '<div class="hint dim">Space 완료 토글 · j/k 이동 · Enter 수정(본인 할일, 이 화면에서)</div></section>'
        + '</div>';

      // 마우스 보조 — 양쪽 패널 공통: 완료 토글 / [수정](본인) / [삭제](본인)
      this.el.querySelectorAll('.sel-row, .done-row').forEach(row => {
        if (row.classList.contains('sel-row')) {
          row.addEventListener('click', () => { this.sel = +row.dataset.idx; this.render(); });
        }
        const cb = row.querySelector('.cb');
        if (cb) cb.addEventListener('click', (e) => {
          e.stopPropagation();
          S().toggleDone(row.dataset.nodeId);
        });
        const editBtn = row.querySelector('[data-ta="edit"]');
        if (editBtn) editBtn.addEventListener('click', (e) => {
          e.stopPropagation();
          this.startEdit(row.dataset.nodeId);
        });
        const delBtn = row.querySelector('[data-ta="del"]');
        if (delBtn) delBtn.addEventListener('click', (e) => {
          e.stopPropagation();
          const n = S().node(row.dataset.nodeId); if (!n) return;
          if (!this.mine(n)) { window.R.notice('! 본인 할일만 삭제할 수 있습니다', 'warn'); return; }
          if (!confirm('"' + (n.title || '(제목 없음)') + '" 할일을 삭제할까요?')) return;
          S().remove(n.id);
          window.R.notice('삭제됨 — u 키로 되돌리기 가능');
        });
      });

      // 인라인 편집 폼 바인딩
      const editRow = this.el.querySelector('.today-edit');
      if (editRow) {
        editRow.addEventListener('keydown', (e) => {
          if (e.isComposing || e.keyCode === 229) { e.stopPropagation(); return; } // 한글 조합 보호
          if (e.key === 'Enter') { e.preventDefault(); this.commitEdit(); }
          if (e.key === 'Escape') { e.preventDefault(); this.cancelEdit(); }
          e.stopPropagation();
        });
        const escBtn = editRow.querySelector('.edit-esc');
        if (escBtn) escBtn.addEventListener('click', (e) => { e.preventDefault(); e.stopPropagation(); this.cancelEdit(); });
        const inp = editRow.querySelector('.edit-title');
        if (inp) { inp.focus(); inp.setSelectionRange(inp.value.length, inp.value.length); }
      }
    },

    startEdit(id) {
      const n = S().node(id); if (!n) return;
      if (!this.mine(n)) { window.R.notice('! 본인 할일만 수정할 수 있습니다', 'warn'); return; }
      this.editingId = id;
      if (window.Sim) window.Sim.userEditing(id);
      this.render();
    },

    commitEdit() {
      const id = this.editingId; if (!id) return;
      const row = this.el.querySelector('.today-edit'); if (!row) { this.editingId = null; return; }
      const n = S().node(id);
      const title = row.querySelector('.edit-title').value.trim();
      if (!title) { this.cancelEdit(); return; }
      const due = row.querySelector('.edit-due').value || n.due;
      const fields = { title, start: row.querySelector('.edit-start').value || n.start, due, end: due };
      const res = S().update(id, fields);
      if (res && res.error) { window.R.notice('! ' + res.error, 'warn'); return; }
      this.editingId = null;
      if (window.Sim) window.Sim.userEditing(null);
      this.render();
      if (window.App) window.App.flushPending();
    },

    cancelEdit() {
      this.editingId = null;
      if (window.Sim) window.Sim.userEditing(null);
      this.render();
      if (window.App) window.App.flushPending();
    },

    selectedTask() { return this.list()[this.sel]; },

    onKey(e) {
      if (this.editingId) { // 편집 중 키는 폼이 처리
        if (e.key === 'Escape') { this.cancelEdit(); return true; }
        return true;
      }
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
        if (t) this.startEdit(t.id);
        return true;
      }
      return false;
    },
  };

  window.ViewToday = ViewToday;
})();
