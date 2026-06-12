// ── [2] 트리 — 입력·편집의 중심 ────────────────────────────────
(function () {
  'use strict';
  const S = () => window.Store;
  const T = () => window.OKRT;

  const ViewTree = {
    el: null,
    selId: null,
    collapsed: new Set(JSON.parse(localStorage.getItem('okrterm_collapsed') || '[]')),
    editingId: null,     // 인라인 편집 중인 노드
    pendingDelete: null, // dd 두 번 입력 방지
    findTerm: '',
    dragId: null,

    mount(el) { this.el = el; this.render(); },

    saveCollapsed() {
      localStorage.setItem('okrterm_collapsed', JSON.stringify([...this.collapsed]));
    },

    // 완료 숨기기 (F5) — 트리/WBS 공유 플래그
    hideDone() { return localStorage.getItem('okrterm_hidedone') === '1'; },
    toggleHideDone() { // 플래그만 변경 — 호출한 뷰가 직접 render
      localStorage.setItem('okrterm_hidedone', this.hideDone() ? '0' : '1');
      window.R.notice('완료 항목 ' + (this.hideDone() ? '숨김' : '표시'));
    },

    // 보이는 행 (collapse 반영)
    visible() {
      const hide = this.hideDone();
      const out = [];
      const rec = (parentId, depth) => {
        for (const n of S().children(parentId)) {
          if (hide && n.status === 'done') continue;
          out.push({ node: n, depth });
          if (!this.collapsed.has(n.id)) rec(n.id, depth + 1);
        }
      };
      rec(null, 0);
      return out;
    },

    focusNode(id) { // 검색/외부 점프: 조상 펼치고 선택
      S().ancestors(id).forEach(a => this.collapsed.delete(a.id));
      this.saveCollapsed();
      this.selId = id;
      this.render();
      const row = this.el.querySelector('.selected');
      if (row) {
        const r = row.getBoundingClientRect(), c = this.el.getBoundingClientRect();
        if (r.bottom > c.bottom || r.top < c.top) this.el.scrollTop += r.top - c.top - c.height / 3;
      }
    },

    label(n, idx) {
      if (n.type === 'o') return 'O' + (S().roots().indexOf(n) + 1);
      if (n.type === 'kr') return 'KR' + (S().children(n.parentId).indexOf(n) + 1);
      return '';
    },

    render() {
      const rows = this.visible();
      if (!rows.find(r => r.node.id === this.selId)) this.selId = rows.length ? rows[0].node.id : null;

      if (!rows.length) {
        this.el.innerHTML = '<div class="empty big-empty">O가 없습니다. n 키로 첫 Objective를 만드세요.<br><span class="dim">또는 하단 명령줄에 add o 제목 입력</span></div>';
        return;
      }

      const html = rows.map(({ node: n, depth }) => {
        if (this.editingId === n.id) return this.editRowHtml(n, depth);
        const kids = S().children(n.id).length;
        const caret = kids ? (this.collapsed.has(n.id) ? '▸' : '▾') : '·';
        const lbl = this.label(n);
        const isDone = n.status === 'done';
        const editing = window.Sim && window.Sim.editingBy(n.id);
        const match = this.findTerm && n.title.toLowerCase().includes(this.findTerm.toLowerCase());
        const pct = n.type !== 'task' ? S().percent(n.id) : null;

        let meta = '';
        if (n.type === 'task') {
          meta = '<span class="dim">' + window.OKRD.fmt(n.due) + ' 마감</span>' + window.R.carryTag(n);
        } else {
          meta = '<span class="gauge' + (isDone ? ' done-text' : '') + '">' + window.R.gauge(pct) + '</span>'
            + ' <span class="dim">' + window.OKRD.fmt(n.start) + '~' + window.OKRD.fmt(n.end) + '</span>';
        }

        // 마우스 보조 액션 (호버 시 노출, F3)
        const acts = '<span class="row-actions">'
          + '<button data-ra="edit">[수정]</button>'
          + '<button data-ra="sib">[+형제]</button>'
          + (n.type !== 'task' ? '<button data-ra="child">[+추가]</button>' : '')
          + '<button data-ra="del">[삭제]</button>'
          + '</span>';

        // 숨겨진 완료 자식 개수 표시 (F5)
        const hiddenDone = this.hideDone() ? S().children(n.id).filter(c => c.status === 'done').length : 0;

        return '<div class="row tree-row' + (n.id === this.selId ? ' selected' : '') + (isDone ? ' is-done' : '')
          + (match ? ' find-match' : '') + (this.pendingDelete === n.id ? ' pending-del' : '') + '" data-node-id="' + n.id + '" draggable="true" style="--depth:' + depth + '">'
          + '<span class="caret" data-act="toggle">' + caret + '</span>'
          + window.R.checkbox(n) + ' '
          + (lbl ? '<span class="tlabel">' + lbl + '</span> ' : '')
          + '<span class="title">' + window.R.esc(n.title) + '</span>'
          + window.R.warnTag(n.id)
          + (n.status === 'hold' ? ' <span class="dim">(보류)</span>' : '')
          + ' <span class="owner">@' + window.R.esc(n.owner) + '</span> '
          + meta
          + (hiddenDone ? ' <span class="dim">…완료 ' + hiddenDone + '건</span>' : '')
          + (editing ? ' <span class="editing">[' + editing + ' 편집중]</span>' : '')
          + acts
          + '</div>';
      }).join('');

      this.el.innerHTML = '<div class="tree-list">' + html + '</div>'
        + '<div class="hint dim">Enter 편집 · n 형제 · Tab 자식 · Space 완료 · dd 삭제 · Alt+↑↓ 순서 · Alt+←→ 계층 · 드래그 이동 · '
        + '<button class="lnk" data-hd>[x 완료 숨기기 ' + (this.hideDone() ? '●' : '○') + ']</button></div>';

      this.bind();
      if (this.editingId) {
        const inp = this.el.querySelector('.edit-title');
        if (inp) {
          // 제목 인풋을 내용 폭에 맞춰 자동 확장 — 표시 행과 동일한 흐름 유지
          const fit = () => {
            const w = window.R.typeFX.textWidth(inp.value || inp.placeholder || '', inp);
            inp.style.width = Math.max(80, Math.ceil(w) + 14) + 'px';
          };
          fit();
          inp.addEventListener('input', fit);
          inp.focus();
          inp.setSelectionRange(inp.value.length, inp.value.length);
        }
      }
    },

    editRowHtml(n, depth) {
      // 보이는 행 모습 그대로 편집 — 투명 인풋, 레이아웃 변화 없음
      const members = S().data.members.map(m =>
        '<option' + (m.name === n.owner ? ' selected' : '') + '>' + window.R.esc(m.name) + '</option>').join('');
      const statuses = ['active', 'hold'].map(s =>
        '<option value="' + s + '"' + (n.status === s ? ' selected' : '') + '>' + T().STATUS_LABEL[s] + '</option>').join('');
      const lbl = this.label(n);
      const dateFields = n.type === 'task'
        ? '<input type="date" class="edit-start seamless" value="' + (n.start || '') + '"><span>~</span>'
        + '<input type="date" class="edit-due seamless" value="' + (n.due || '') + '" title="마감일">'
        : '<input type="date" class="edit-start seamless" value="' + (n.start || '') + '"><span>~</span>'
        + '<input type="date" class="edit-end seamless" value="' + (n.end || '') + '">';
      return '<div class="row tree-row edit-row" data-node-id="' + n.id + '" style="--depth:' + depth + '">'
        + '<span class="caret">▾</span>'
        + window.R.checkbox(n) + ' '
        + (lbl ? '<span class="tlabel">' + lbl + '</span> ' : '')
        + '<input type="text" class="edit-title seamless" value="' + window.R.esc(n.title) + '" placeholder="제목 입력...">'
        + ' <span class="owner">@<select class="edit-owner seamless">' + members + '</select></span> '
        + '<span class="dim edit-dates">' + dateFields + '</span>'
        + (n.status !== 'done' ? ' <select class="edit-status seamless dim">' + statuses + '</select>' : '')
        + (n.type === 'task' ? ' <span class="dim">소속 <select class="edit-parent seamless dim">' + window.R.initOptions(n.parentId) + '</select></span>' : '')
        + ' <span class="dim">⏎ 저장 · <button class="lnk edit-esc" title="취소 — 새 항목은 삭제됩니다">Esc 취소</button></span>'
        + '</div>';
    },

    startEdit(id) {
      this.editingId = id;
      if (window.Sim) window.Sim.userEditing(id);
      this.render();
    },

    commitEdit() {
      const id = this.editingId; if (!id) return;
      const row = this.el.querySelector('.edit-row'); if (!row) { this.editingId = null; return; }
      const n = S().node(id);
      const title = row.querySelector('.edit-title').value.trim();
      if (!title) { this.cancelEdit(); return; }
      const fields = {
        title,
        owner: row.querySelector('.edit-owner').value,
        start: row.querySelector('.edit-start').value || n.start,
      };
      const due = row.querySelector('.edit-due');
      const end = row.querySelector('.edit-end');
      if (due) { fields.due = due.value || n.due; fields.end = fields.due; }
      if (end) fields.end = end.value || n.end;
      const st = row.querySelector('.edit-status');
      if (st) fields.status = st.value;
      const res = S().update(id, fields);
      if (res && res.error) { window.R.notice('! ' + res.error, 'warn'); return; }
      const ps = row.querySelector('.edit-parent');
      if (ps && ps.value && ps.value !== n.parentId) S().move(id, ps.value, null); // 소속 변경
      this.editingId = null;
      if (window.Sim) window.Sim.userEditing(null);
      this.render();
      if (window.App) window.App.flushPending();
    },

    cancelEdit() {
      const id = this.editingId;
      this.editingId = null;
      if (window.Sim) window.Sim.userEditing(null);
      const n = S().node(id);
      if (n && !n.title.trim()) S().remove(id); // 새 항목 취소 → 제거
      else this.render();
      if (window.App) window.App.flushPending();
    },

    createSibling() {
      const cur = S().node(this.selId);
      let type = 'o', parentId = null, afterId = null;
      if (cur) { type = cur.type; parentId = cur.parentId; afterId = cur.id; }
      const n = S().create(type, parentId, {}, { afterId });
      this.selId = n.id;
      this.startEdit(n.id);
    },

    createChild() {
      const cur = S().node(this.selId);
      if (!cur) { this.createSibling(); return; }
      const ti = T().TYPES.indexOf(cur.type);
      if (ti >= T().TYPES.length - 1) { window.R.notice('할일 아래에는 자식을 만들 수 없습니다', 'warn'); return; }
      this.collapsed.delete(cur.id); this.saveCollapsed();
      const n = S().create(T().TYPES[ti + 1], cur.id, {});
      this.selId = n.id;
      this.startEdit(n.id);
    },

    requestDelete() {
      const n = S().node(this.selId); if (!n) return;
      if (this.pendingDelete === n.id) {
        this.pendingDelete = null;
        const rows = this.visible();
        const idx = rows.findIndex(r => r.node.id === n.id);
        const next = rows[idx + 1] || rows[idx - 1];
        const cnt = S().remove(n.id);
        this.selId = next ? next.node.id : null;
        window.R.notice('삭제됨' + (cnt > 1 ? ' (자식 ' + (cnt - 1) + '개 포함)' : '') + ' — u 키로 복원 가능');
      } else {
        this.pendingDelete = n.id;
        const kids = S().descendants(n.id).length;
        window.R.notice((kids ? '자식 ' + kids + '개 포함 삭제 — ' : '') + '삭제하려면 d 한 번 더 (또는 [삭제] 한 번 더 클릭)', 'warn');
        this.render(); // 삭제 대기 행 표시
        setTimeout(() => { if (this.pendingDelete === n.id) { this.pendingDelete = null; this.render(); } }, 2500);
      }
    },

    onKey(e) {
      if (this.editingId) {
        if (e.key === 'Enter') { this.commitEdit(); return true; }
        if (e.key === 'Escape') { this.cancelEdit(); return true; }
        return 'editing'; // 나머지 키는 입력 필드로
      }
      const rows = this.visible();
      const idx = rows.findIndex(r => r.node.id === this.selId);
      const sel = idx >= 0 ? rows[idx].node : null;
      const k = window.keyOf(e);

      if (e.altKey && sel) {
        if (e.key === 'ArrowUp') { S().reorder(sel.id, -1); return true; }
        if (e.key === 'ArrowDown') { S().reorder(sel.id, 1); return true; }
        if (e.key === 'ArrowLeft') { const r = S().shiftLevel(sel.id, -1); if (r.error) window.R.notice('! ' + r.error, 'warn'); return true; }
        if (e.key === 'ArrowRight') { const r = S().shiftLevel(sel.id, 1); if (r.error) window.R.notice('! ' + r.error, 'warn'); return true; }
      }
      if (k === 'j' || e.key === 'ArrowDown') { if (idx < rows.length - 1) this.selId = rows[idx + 1].node.id; this.render(); return true; }
      if (k === 'k' || e.key === 'ArrowUp') { if (idx > 0) this.selId = rows[idx - 1].node.id; this.render(); return true; }
      if (e.key === 'ArrowLeft' && sel) { this.collapsed.add(sel.id); this.saveCollapsed(); this.render(); return true; }
      if (e.key === 'ArrowRight' && sel) { this.collapsed.delete(sel.id); this.saveCollapsed(); this.render(); return true; }
      if (e.key === ' ' && sel) { S().toggleDone(sel.id); return true; }
      if (e.key === 'Enter' && sel) { this.startEdit(sel.id); return true; }
      if (k === 'n') { this.createSibling(); return true; }
      if (e.key === 'Tab') { this.createChild(); return true; }
      if (k === 'd') { this.requestDelete(); return true; }
      if (k === 'x') { this.toggleHideDone(); this.render(); return true; }
      return false;
    },

    // ── 드래그 앤 드롭 ──
    bind() {
      const self = this;
      const hd = this.el.querySelector('[data-hd]');
      if (hd) hd.addEventListener('click', () => { self.toggleHideDone(); self.render(); });
      this.el.querySelectorAll('.tree-row').forEach(row => {
        const id = row.dataset.nodeId;

        row.addEventListener('click', (e) => {
          if (self.editingId === id) return; // 편집 중인 행 내부 클릭(드롭다운·날짜)은 그대로 둔다
          if (self.editingId && self.editingId !== id) self.commitEdit();
          self.selId = id;
          if (e.target.dataset.act === 'toggle') {
            if (self.collapsed.has(id)) self.collapsed.delete(id); else self.collapsed.add(id);
            self.saveCollapsed();
          }
          if (e.target.classList.contains('cb')) { S().toggleDone(id); return; }
          self.render();
        });
        row.addEventListener('dblclick', () => { if (self.editingId !== id) self.startEdit(id); });

        // 호버 액션 버튼 (F3)
        row.querySelectorAll('[data-ra]').forEach(b => b.addEventListener('click', (e) => {
          e.stopPropagation();
          self.selId = id;
          const act = b.dataset.ra;
          if (act === 'edit') self.startEdit(id);
          else if (act === 'sib') self.createSibling();
          else if (act === 'child') self.createChild();
          else if (act === 'del') { self.requestDelete(); self.render(); }
        }));

        row.addEventListener('dragstart', (e) => {
          self.dragId = id;
          e.dataTransfer.effectAllowed = 'move';
          try { e.dataTransfer.setData('text/plain', id); } catch (err) { }
        });
        row.addEventListener('dragover', (e) => {
          if (!self.dragId || self.dragId === id) return;
          e.preventDefault();
          const r = row.getBoundingClientRect();
          const y = (e.clientY - r.top) / r.height;
          row.classList.remove('drop-before', 'drop-after', 'drop-into');
          const target = S().node(id);
          const canInto = T().TYPES.indexOf(target.type) < T().TYPES.length - 1;
          if (y < 0.3) row.classList.add('drop-before');
          else if (y > 0.7 || !canInto) row.classList.add('drop-after');
          else row.classList.add('drop-into');
        });
        row.addEventListener('dragleave', () => row.classList.remove('drop-before', 'drop-after', 'drop-into'));
        row.addEventListener('drop', (e) => {
          e.preventDefault();
          const zone = row.classList.contains('drop-before') ? 'before'
            : row.classList.contains('drop-into') ? 'into' : 'after';
          row.classList.remove('drop-before', 'drop-after', 'drop-into');
          const dragId = self.dragId; self.dragId = null;
          if (!dragId || dragId === id) return;
          const target = S().node(id);
          let res;
          if (zone === 'into') {
            const childType = T().TYPES[T().TYPES.indexOf(target.type) + 1];
            self.collapsed.delete(id); self.saveCollapsed();
            res = S().moveRetype(dragId, id, null, childType);
          } else {
            const sibs = S().children(target.parentId);
            const ti = sibs.indexOf(target);
            const beforeId = zone === 'before' ? id : (sibs[ti + 1] ? sibs[ti + 1].id : null);
            res = S().moveRetype(dragId, target.parentId, beforeId, target.type);
          }
          if (res && res.error) window.R.notice('! ' + res.error, 'warn');
          self.selId = dragId;
        });
        row.addEventListener('dragend', () => {
          self.el.querySelectorAll('.drop-before,.drop-after,.drop-into').forEach(r =>
            r.classList.remove('drop-before', 'drop-after', 'drop-into'));
          self.dragId = null;
          if (window.App) window.App.flushPending();
        });
      });

      // 편집 폼 내부 키 처리 (전역 키 핸들러가 input에서 안 먹는 경우 대비)
      const editRow = this.el.querySelector('.edit-row');
      if (editRow) {
        editRow.addEventListener('keydown', (e) => {
          if (e.isComposing || e.keyCode === 229) { e.stopPropagation(); return; } // 한글 조합 중 Enter 보호
          if (e.key === 'Enter') { e.preventDefault(); this.commitEdit(); }
          if (e.key === 'Escape') { e.preventDefault(); this.cancelEdit(); }
          e.stopPropagation();
        });
        // 'Esc 취소' 클릭으로도 취소 — 제목이 빈 새 항목은 즉시 삭제됨
        const escBtn = editRow.querySelector('.edit-esc');
        if (escBtn) escBtn.addEventListener('click', (e) => { e.preventDefault(); e.stopPropagation(); this.cancelEdit(); });
      }
    },
  };

  window.ViewTree = ViewTree;
})();
