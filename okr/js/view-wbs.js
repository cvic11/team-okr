// ── [3] WBS (간트) ────────────────────────────────────────────
(function () {
  'use strict';
  const S = () => window.Store;
  const D = () => window.OKRD;

  const ViewWBS = {
    el: null,
    filter: localStorage.getItem('okrterm_wbs_filter') || 'month', // week | month | quarter
    selId: null,
    drag: null, // { id, mode: 'start'|'end'|'move', x0, start0, end0 }

    mount(el) { this.el = el; this.render(); },

    range() {
      const today = window.OKRT.TODAY;
      const d = D().parse(today);
      if (this.filter === 'week') {
        const dow = (d.getDay() + 6) % 7; // 월요일 시작
        const s = D().add(today, -dow);
        return { start: s, end: D().add(s, 6) };
      }
      if (this.filter === 'month') {
        const s = D().str(new Date(d.getFullYear(), d.getMonth(), 1));
        return { start: s, end: D().str(new Date(d.getFullYear(), d.getMonth() + 1, 0)) };
      }
      const q = D().quarterOf(today);
      return { start: q.start, end: q.end };
    },

    rows() {
      // 기간과 겹치는 항목 + 그 조상 (완료 숨기기 공유, F5)
      const hide = window.ViewTree.hideDone();
      const r = this.range();
      const keep = new Set();
      S().walk((n) => {
        const ns = n.start, ne = n.type === 'task' ? (n.due || n.end) : n.end;
        if (ns && ne && ns <= r.end && ne >= r.start) {
          keep.add(n.id);
          S().ancestors(n.id).forEach(a => keep.add(a.id));
        }
      });
      const out = [];
      S().walk((n, depth) => {
        if (keep.has(n.id) && !(hide && n.status === 'done')) out.push({ node: n, depth });
      });
      return out;
    },

    render() {
      const r = this.range();
      const days = D().diff(r.start, r.end) + 1;
      const rows = this.rows();
      const today = window.OKRT.TODAY;

      const LABEL_W = 360;
      const avail = Math.max(500, (this.el.clientWidth || 1000) - LABEL_W - 40);
      const dayW = Math.max(4, Math.floor(avail / days));
      const chartW = days * dayW;

      // 주 눈금 (월요일)
      let ticks = '';
      for (let i = 0; i < days; i++) {
        const ds = D().add(r.start, i);
        if (D().parse(ds).getDay() === 1 || i === 0) {
          ticks += '<div class="wbs-tick" style="left:' + (i * dayW) + 'px"><span>' + D().fmt(ds) + '</span></div>';
        }
      }
      // 오늘 세로선
      let todayLine = '';
      const ti = D().diff(r.start, today);
      if (ti >= 0 && ti < days) {
        todayLine = '<div class="wbs-today" style="left:' + (ti * dayW + Math.floor(dayW / 2)) + 'px"></div>';
      }

      const body = rows.map(({ node: n, depth }) => {
        const isTask = n.type === 'task';
        const ns = n.start, ne = isTask ? (n.due || n.end) : n.end;
        let bar = '';
        if (ns && ne) {
          const from = Math.max(0, D().diff(r.start, ns));
          const to = Math.min(days - 1, D().diff(r.start, ne));
          if (to >= 0 && from <= days - 1 && to >= from) {
            const warn = S().dateWarn(n.id);
            const frame = (n.type === 'o' || n.type === 'kr') ? ' bar-frame' : '';
            const cls = (n.status === 'done' ? 'bar-done' : warn ? 'bar-warn' : '') + frame;
            const clipL = D().diff(r.start, ns) < 0 ? ' clip-l' : '';
            const clipR = D().diff(r.start, ne) > days - 1 ? ' clip-r' : '';
            bar = '<div class="wbs-bar ' + cls + clipL + clipR + '" data-bar-id="' + n.id + '"'
              + ' style="left:' + (from * dayW) + 'px;width:' + ((to - from + 1) * dayW) + 'px">'
              + '<span class="bar-grip grip-l"></span><span class="bar-grip grip-r"></span></div>';
          }
        }
        const lbl = n.type === 'o' ? 'O' + (S().roots().indexOf(n) + 1) + ' '
          : n.type === 'kr' ? 'KR' + (S().children(n.parentId).indexOf(n) + 1) + ' ' : '';
        return '<div class="wbs-row' + (n.id === this.selId ? ' selected' : '') + (n.status === 'done' ? ' is-done' : '') + '" data-node-id="' + n.id + '">'
          + '<div class="wbs-label" style="--depth:' + depth + '">'
          + '<span class="title">' + lbl + window.R.esc(n.title) + '</span>'
          + (ns && ne ? ' <span class="wbs-days">' + (D().diff(ns, ne) + 1) + 'd</span>' : '')
          + window.R.warnTag(n.id)
          + ' <span class="dim">@' + window.R.esc(n.owner) + '</span></div>'
          + '<div class="wbs-lane" style="width:' + chartW + 'px">' + bar + '</div>'
          + '</div>';
      }).join('');

      const fbtn = (key, label) =>
        '<button class="lnk' + (this.filter === key ? ' active-filter' : '') + '" data-filter="' + key + '">['
        + (this.filter === key ? '■' : ' ') + label + ']</button>';

      this.el.innerHTML =
        '<div class="wbs-head">'
        + '<span class="dim">기간:</span> ' + fbtn('week', 'w 이번 주') + ' ' + fbtn('month', 'm 이번 달') + ' ' + fbtn('quarter', 'q 분기 전체')
        + ' <span class="dim">· ' + D().fmt(r.start) + ' ~ ' + D().fmt(r.end) + '</span>'
        + ' <button class="lnk" data-hd>[x 완료 숨기기 ' + (window.ViewTree.hideDone() ? '●' : '○') + ']</button>'
        + '</div>'
        + '<div class="wbs-subhead dim">막대 양끝 드래그=시작·종료일 · 몸통 드래그=기간 유지 이동 · 황색=부모 기간 이탈 · 외곽선=O·KR 구간</div>'
        + '<div class="wbs-scroll">'
        + '<div class="wbs-chart" style="--labelw:' + LABEL_W + 'px">'
        + '<div class="wbs-gridhead"><div class="wbs-label"></div><div class="wbs-lane" style="width:' + chartW + 'px;height:22px">' + ticks + '</div></div>'
        + '<div class="wbs-body" style="position:relative">' + body
        + '<div class="wbs-overlay" style="left:' + LABEL_W + 'px;width:' + chartW + 'px">' + todayLine + '</div>'
        + '</div></div></div>';

      this._dayW = dayW; this._rangeStart = r.start; this._days = days;
      this.bind();
    },

    bind() {
      const self = this;
      this.el.querySelectorAll('[data-filter]').forEach(b =>
        b.addEventListener('click', () => { self.filter = b.dataset.filter; localStorage.setItem('okrterm_wbs_filter', self.filter); self.render(); }));
      const hd = this.el.querySelector('[data-hd]');
      if (hd) hd.addEventListener('click', () => { window.ViewTree.toggleHideDone(); self.render(); });

      this.el.querySelectorAll('.wbs-row').forEach(row => {
        row.addEventListener('click', () => { self.selId = row.dataset.nodeId; self.render(); });
        row.addEventListener('dblclick', () => window.App && window.App.gotoTree(row.dataset.nodeId));
      });

      this.el.querySelectorAll('.wbs-bar').forEach(bar => {
        bar.addEventListener('pointerdown', (e) => {
          e.preventDefault(); e.stopPropagation();
          const id = bar.dataset.barId;
          const n = S().node(id); if (!n) return;
          const rect = bar.getBoundingClientRect();
          const isTask = n.type === 'task';
          const trueEnd = isTask ? (n.due || n.end) : n.end;
          // 그립 폭은 막대 폭에 비례 — 짧은 막대에서도 몸통/양끝 모두 잡힌다
          const g = Math.min(10, Math.max(3, rect.width / 3));
          let mode = 'move';
          if (e.clientX - rect.left < g) mode = 'start';
          else if (rect.right - e.clientX < g) mode = 'end';
          // 화면 밖으로 잘린 막대: 보이는 끝을 앵커로 삼아 드래그가 즉시 반응하게
          const rs = self._rangeStart, rEnd = D().add(rs, self._days - 1);
          let s0 = n.start, e0 = trueEnd;
          if (mode === 'start' && s0 < rs) s0 = rs;
          if (mode === 'end' && e0 > rEnd) e0 = rEnd;
          const d = self.drag = { id, mode, x0: e.clientX, start0: s0, end0: e0, isTask, moved: false };
          bar.classList.add('dragging');
          document.body.style.cursor = mode === 'move' ? 'grabbing' : 'ew-resize';

          // 윈도우 레벨 리스너 — 재렌더링으로 요소가 교체돼도 드래그가 안 끊긴다
          const onMove = (ev) => {
            const delta = Math.round((ev.clientX - d.x0) / self._dayW);
            if (delta === d.lastDelta) return;
            d.lastDelta = delta; d.moved = d.moved || delta !== 0;
            const prev = self._preview(d, delta);
            const from = Math.max(0, D().diff(self._rangeStart, prev.start));
            const to = Math.min(self._days - 1, D().diff(self._rangeStart, prev.end));
            if (to >= from) {
              bar.style.left = (from * self._dayW) + 'px';
              bar.style.width = ((to - from + 1) * self._dayW) + 'px';
            }
            window.R.notice(window.R.esc(n.title) + ' : ' + prev.start + ' ~ ' + prev.end, null, true);
            // 좌측 총소요일 실시간 갱신
            const rowEl = bar.closest('.wbs-row');
            const daysEl = rowEl && rowEl.querySelector('.wbs-days');
            if (daysEl) daysEl.textContent = (D().diff(prev.start, prev.end) + 1) + 'd';
          };
          const onUp = (ev) => {
            window.removeEventListener('pointermove', onMove);
            window.removeEventListener('pointerup', onUp);
            window.removeEventListener('pointercancel', onUp);
            document.body.style.cursor = '';
            bar.classList.remove('dragging');
            self.drag = null;
            if (!d.moved) { window.R.notice(''); if (window.App) window.App.flushPending(); return; }
            const delta = Math.round((ev.clientX - d.x0) / self._dayW);
            const prev = self._preview(d, delta);
            const fields = { start: prev.start };
            if (d.isTask) { fields.due = prev.end; fields.end = prev.end; }
            else fields.end = prev.end;
            const res = S().update(d.id, fields, { logExtra: '기간 변경(WBS)' });
            if (res && res.error) { window.R.notice('! ' + res.error, 'warn'); self.render(); }
            else window.R.notice('');
            if (window.App) window.App.flushPending();
          };
          window.addEventListener('pointermove', onMove);
          window.addEventListener('pointerup', onUp);
          window.addEventListener('pointercancel', onUp);
        });
      });
    },

    _preview(d, delta) {
      let s = d.start0, e = d.end0;
      if (d.mode === 'move') { s = D().add(s, delta); e = D().add(e, delta); }
      else if (d.mode === 'start') { s = D().add(s, delta); if (s > e) s = e; }
      else { e = D().add(e, delta); if (e < s) e = s; }
      return { start: s, end: e };
    },

    onKey(e) {
      const k = window.keyOf(e);
      if (k === 'w') { this.filter = 'week'; localStorage.setItem('okrterm_wbs_filter', 'week'); this.render(); return true; }
      if (k === 'm') { this.filter = 'month'; localStorage.setItem('okrterm_wbs_filter', 'month'); this.render(); return true; }
      if (k === 'q') { this.filter = 'quarter'; localStorage.setItem('okrterm_wbs_filter', 'quarter'); this.render(); return true; }
      if (k === 'x') { window.ViewTree.toggleHideDone(); this.render(); return true; }
      const rows = this.rows();
      const idx = rows.findIndex(r => r.node.id === this.selId);
      if (k === 'j' || e.key === 'ArrowDown') { this.selId = rows[Math.min(rows.length - 1, idx + 1)].node.id; this.render(); return true; }
      if (k === 'k' || e.key === 'ArrowUp') { this.selId = rows[Math.max(0, idx - 1)].node.id; this.render(); return true; }
      if (e.key === 'Enter' && this.selId) { window.App.gotoTree(this.selId); return true; }
      return false;
    },
  };

  window.ViewWBS = ViewWBS;
})();
