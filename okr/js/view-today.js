// ── [1] 오늘 ──────────────────────────────────────────────────
(function () {
  'use strict';
  const S = () => window.Store;

  const ViewToday = {
    el: null,
    sel: 0, // 좌측 목록 선택 인덱스

    mount(el) { this.el = el; this.render(); },

    list() { return S().todayTasks(); },

    render() {
      const tasks = this.list();
      const recentAll = S().recentTasks(7); // 완료 여부 무관
      const recent = recentAll.slice(0, 15);
      if (this.sel >= tasks.length) this.sel = Math.max(0, tasks.length - 1);

      let left = '';
      if (!tasks.length) {
        left = '<div class="empty">오늘의 할일이 없습니다. [2]트리에서 할일에 마감일을 지정하세요.</div>';
      } else {
        left = tasks.map((t, i) => {
          const editing = window.Sim && window.Sim.editingBy(t.id);
          const dueTag = t.due && t.due > window.OKRT.TODAY ? ' <span class="dim">~' + window.OKRD.fmt(t.due) + '</span>' : '';
          return '<div class="row sel-row' + (i === this.sel ? ' selected' : '') + '" data-node-id="' + t.id + '" data-idx="' + i + '">'
            + window.R.checkbox(t) + ' '
            + '<span class="title">' + window.R.esc(t.title) + '</span>'
            + window.R.carryTag(t) + window.R.warnTag(t.id) + dueTag
            + ' <span class="owner">@' + window.R.esc(t.owner) + '</span>'
            + (editing ? ' <span class="editing">[' + editing + ' 편집중]</span>' : '')
            + '<span class="row-actions"><button data-ta="edit">[수정]</button><button data-ta="del">[삭제]</button></span>'
            + '<div class="path">' + window.R.pathLine(t.id) + '</div>'
            + '</div>';
        }).join('');
      }

      let right = '';
      if (!recent.length) {
        right = '<div class="empty">최근 7일 내 할일 활동이 없습니다.</div>';
      } else {
        right = recent.map(t => {
          const done = t.status === 'done';
          const ts = t.completedAt || t.updatedAt || t.createdAt;
          return '<div class="row done-row" data-node-id="' + t.id + '">'
            + '<span class="cb" title="완료 토글">' + (done ? '[x]' : '[ ]') + '</span> '
            + '<span class="' + (done ? 'done-title' : 'title') + '">' + window.R.esc(t.title) + '</span>'
            + ' <span class="dim">— ' + window.R.esc(t.updatedBy || t.owner) + ' · ' + window.R.fmtTs(ts) + '</span>'
            + '<span class="row-actions"><button data-ta="edit">[수정]</button><button data-ta="del">[삭제]</button></span>'
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
        + '<div class="hint dim">Space 완료 토글 · j/k 이동 · Enter 수정(트리에서 열림)</div></section>'
        + '</div>';

      // 마우스 보조 — 양쪽 패널 공통: 완료 토글 / [수정] / [삭제]
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
          this.openEdit(row.dataset.nodeId);
        });
        const delBtn = row.querySelector('[data-ta="del"]');
        if (delBtn) delBtn.addEventListener('click', (e) => {
          e.stopPropagation();
          const n = S().node(row.dataset.nodeId); if (!n) return;
          if (!confirm('"' + (n.title || '(제목 없음)') + '" 할일을 삭제할까요?')) return;
          S().remove(n.id);
          window.R.notice('삭제됨 — u 키로 되돌리기 가능');
        });
      });
    },

    openEdit(id) { // 트리로 이동해 해당 할일을 바로 인라인 편집
      if (window.App) window.App.gotoTree(id);
      if (window.ViewTree) window.ViewTree.startEdit(id);
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
        if (t) this.openEdit(t.id);
        return true;
      }
      return false;
    },
  };

  window.ViewToday = ViewToday;
})();
