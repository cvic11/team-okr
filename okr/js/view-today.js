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
      const recentAll = S().recentDone(7);
      const recent = recentAll.slice(0, 15);
      if (this.sel >= tasks.length) this.sel = Math.max(0, tasks.length - 1);

      let left = '';
      if (!tasks.length) {
        left = '<div class="empty">오늘의 할일이 없습니다. [2]트리에서 할일에 마감일을 지정하세요.</div>';
      } else {
        left = tasks.map((t, i) => {
          const editing = window.Sim && window.Sim.editingBy(t.id);
          return '<div class="row sel-row' + (i === this.sel ? ' selected' : '') + '" data-node-id="' + t.id + '" data-idx="' + i + '">'
            + window.R.checkbox(t) + ' '
            + '<span class="title">' + window.R.esc(t.title) + '</span>'
            + window.R.carryTag(t) + window.R.warnTag(t.id)
            + ' <span class="owner">@' + window.R.esc(t.owner) + '</span>'
            + (editing ? ' <span class="editing">[' + editing + ' 편집중]</span>' : '')
            + '<div class="path">' + window.R.pathLine(t.id) + '</div>'
            + '</div>';
        }).join('');
      }

      let right = '';
      if (!recent.length) {
        right = '<div class="empty">최근 7일 내 완료된 할일이 없습니다.</div>';
      } else {
        right = recent.map(t =>
          '<div class="row done-row" data-node-id="' + t.id + '">'
          + '<span class="cb">[x]</span> '
          + '<span class="done-title">' + window.R.esc(t.title) + '</span>'
          + ' <span class="dim">— ' + window.R.esc(t.updatedBy || t.owner) + ' · ' + window.R.fmtTs(t.completedAt) + '</span>'
          + '<div class="path">' + window.R.pathLine(t.id) + '</div>'
          + '</div>'
        ).join('');
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
        + '<div class="hint dim">Space 완료 토글 · j/k 이동 · Enter 트리에서 열기</div></section>'
        + '</div>';

      // 마우스 보조
      this.el.querySelectorAll('.sel-row').forEach(row => {
        row.addEventListener('click', () => { this.sel = +row.dataset.idx; this.render(); });
        row.querySelector('.cb').addEventListener('click', (e) => {
          e.stopPropagation();
          S().toggleDone(row.dataset.nodeId);
        });
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
        if (t && window.App) window.App.gotoTree(t.id);
        return true;
      }
      return false;
    },
  };

  window.ViewToday = ViewToday;
})();
