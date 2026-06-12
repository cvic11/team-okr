// ── 공용 렌더 헬퍼 ─────────────────────────────────────────────
(function () {
  'use strict';
  const S = () => window.Store;

  const esc = s => String(s == null ? '' : s)
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

  // [████░░░░░░] 42% — 텍스트 게이지
  function gauge(pct, width) {
    width = width || 10;
    const filled = Math.round(pct / 100 * width);
    return '[' + '█'.repeat(filled) + '░'.repeat(width - filled) + '] ' + String(pct).padStart(3, ' ') + '%';
  }

  // 소속 경로 한 줄 (흐린 색)
  function pathLine(id) {
    return '<span class="dim">' + esc(S().pathStr(id)) + '</span>';
  }

  // 이월 표기 (+2d)
  function carryTag(t) {
    const c = S().carryDays(t);
    if (!c) return '';
    return ' <span class="' + (c >= 3 ? 'warn' : 'dim') + '">(+' + c + 'd)</span>';
  }

  // 날짜 경고 !
  function warnTag(id) {
    if (S().dateWarn(id) || S().parentWarn(id)) return ' <span class="warn">!</span>';
    return '';
  }

  // 체크박스 [x]/[ ]
  function checkbox(n) {
    return '<span class="cb">[' + (n.status === 'done' ? 'x' : n.status === 'hold' ? '-' : ' ') + ']</span>';
  }

  // 변경 줄 색 반전 1.5초 (애니메이션 금지 원칙의 유일한 예외)
  function flashRows(ids) {
    if (!ids || !ids.length) return;
    ids.forEach(id => {
      document.querySelectorAll('[data-node-id="' + id + '"]').forEach(el => {
        el.classList.add('flash');
        setTimeout(() => el.classList.remove('flash'), 1500);
      });
    });
  }

  // 하단 알림 줄
  let noticeTimer = null;
  function notice(msg, kind, sticky) {
    const el = document.getElementById('notice-line');
    if (!el) return;
    el.innerHTML = msg ? ('<span class="' + (kind === 'warn' ? 'warn' : '') + '">' + msg + '</span>') : '';
    if (noticeTimer) clearTimeout(noticeTimer);
    if (msg && !sticky) noticeTimer = setTimeout(() => { el.innerHTML = ''; }, 5000);
  }

  // 충돌 알림: 내 것 유지 / 새로고침 선택지
  function conflictNotice(nodeTitle, actor, onKeep, onReload) {
    const el = document.getElementById('notice-line');
    if (!el) return;
    el.innerHTML = '<span class="warn">! ' + esc(nodeTitle) + '(이)가 ' + esc(actor) + '에 의해 수정됨 — </span>'
      + '<button class="lnk" id="cf-keep">[내 것 유지]</button> <button class="lnk" id="cf-reload">[새로고침]</button>';
    document.getElementById('cf-keep').onclick = () => { el.innerHTML = ''; onKeep && onKeep(); };
    document.getElementById('cf-reload').onclick = () => { el.innerHTML = ''; onReload && onReload(); };
  }

  function fmtTs(iso) {
    if (!iso) return '';
    const d = new Date(iso);
    return (d.getMonth() + 1) + '/' + d.getDate() + ' ' + String(d.getHours()).padStart(2, '0') + ':' + String(d.getMinutes()).padStart(2, '0');
  }

  // ── 타자 "쾅쾅" 효과: 글자가 도장처럼 박히는 스탬프 + 짧은 타건음 ──
  const typeFX = {
    enabled: localStorage.getItem('okrterm_typefx') !== '0', // [5]관리에서 끄기 가능
    toggle() {
      this.enabled = !this.enabled;
      try { localStorage.setItem('okrterm_typefx', this.enabled ? '1' : '0'); } catch (e) { }
      return this.enabled;
    },
    _ctx: null,
    _canvas: document.createElement('canvas'),
    textWidth(text, el) {
      const cs = getComputedStyle(el);
      const c = this._canvas.getContext('2d');
      c.font = cs.fontWeight + ' ' + cs.fontSize + ' ' + cs.fontFamily;
      return c.measureText(text).width;
    },
    click() {
      try {
        if (!this._ctx) this._ctx = new (window.AudioContext || window.webkitAudioContext)();
        const c = this._ctx, t = c.currentTime;
        const o = c.createOscillator(), g = c.createGain();
        o.type = 'square';
        o.frequency.value = 95 + Math.random() * 45;
        g.gain.setValueAtTime(0.05, t);
        g.gain.exponentialRampToValueAtTime(0.0008, t + 0.045);
        o.connect(g); g.connect(c.destination);
        o.start(t); o.stop(t + 0.05);
      } catch (e) { }
    },
    _caretXY(el, cs) { // v134 — textarea 캐럿 좌표: 미러 div로 측정
      const d = document.createElement('div');
      ['fontFamily', 'fontSize', 'fontWeight', 'lineHeight', 'letterSpacing', 'paddingTop', 'paddingRight', 'paddingBottom', 'paddingLeft', 'borderTopWidth', 'borderRightWidth', 'borderBottomWidth', 'borderLeftWidth', 'boxSizing'].forEach(k => { d.style[k] = cs[k]; });
      d.style.cssText += ';position:fixed;left:-9999px;top:0;visibility:hidden;white-space:pre-wrap;word-wrap:break-word;overflow-wrap:break-word;';
      d.style.width = el.clientWidth + 'px';
      const caret = el.selectionStart != null ? el.selectionStart : el.value.length;
      d.textContent = el.value.slice(0, caret);
      const mark = document.createElement('span'); mark.textContent = '\u200b'; d.appendChild(mark);
      document.body.appendChild(d);
      const r = el.getBoundingClientRect();
      const x = r.left + mark.offsetLeft - el.scrollLeft;
      const y = r.top + mark.offsetTop - el.scrollTop;
      const h = parseFloat(cs.lineHeight) || 20;
      d.remove();
      return { x, y, h };
    },
    stamp(el, ch) {
      if (!this.enabled) return;
      // v129 — 입력칸을 위아래로 흔들던 jolt 제거: 스탬프·타건음만 유지
      this.click();
      if (!ch) return;
      const cs = getComputedStyle(el);
      const c = this._canvas.getContext('2d');
      c.font = cs.fontWeight + ' ' + cs.fontSize + ' ' + cs.fontFamily;
      const chW = c.measureText(ch).width;
      const r = el.getBoundingClientRect();
      let x, y, h;
      if (el.tagName === 'TEXTAREA') { // v134 — 스탠드업 막힘 등 여러 줄 입력칸도 지원
        const pos = this._caretXY(el, cs);
        x = pos.x - chW; y = pos.y; h = pos.h;
        if (y < r.top - 2 || y > r.bottom - h * 0.5 || x < r.left - chW || x > r.right) return;
      } else {
        const caret = el.selectionStart != null ? el.selectionStart : el.value.length;
        const before = c.measureText(el.value.slice(0, caret)).width;
        x = r.left + (parseFloat(cs.paddingLeft) || 0) + before - el.scrollLeft - chW;
        y = r.top; h = r.height;
        if (x > r.right || x < r.left - chW) return;
      }
      const s = document.createElement('span');
      s.className = 'type-stamp';
      s.textContent = ch;
      s.style.background = cs.color; // 입력칸 글자색을 따라감 — 채팅에선 내가 고른 색과 통일 (v130)
      s.style.left = x + 'px';
      s.style.top = y + 'px';
      s.style.height = h + 'px';
      s.style.font = c.font;
      document.body.appendChild(s);
      setTimeout(() => s.remove(), 170);
    },
  };
  document.addEventListener('input', (e) => {
    const el = e.target;
    if (el.tagName !== 'TEXTAREA' && !(el.tagName === 'INPUT' && (!el.type || el.type === 'text'))) return;
    // v123 — 한글 조합 입력에도 스탬프·타건음 복원 (게임 같은 타격감, [5]관리에서 끄기 가능)
    if (e.inputType && e.inputType !== 'insertText' && e.inputType !== 'insertCompositionText') return;
    const ch = e.data ? e.data.slice(-1) : '';
    typeFX.stamp(el, ch);
  }, true);

  // v123 — 날짜 입력 클릭 시 달력(요일 확인) 즉시 열기
  document.addEventListener('click', (e) => {
    const el = e.target;
    if (el && el.tagName === 'INPUT' && el.type === 'date' && el.showPicker) {
      try { el.showPicker(); } catch (err) { }
    }
  }, true);

  // ── IME-안전 키 판별: 한글 입력 상태에서도 물리 키 기준으로 단축키 동작 (F2) ──
  function keyOf(e) {
    const c = e.code || '';
    if (!e.ctrlKey && !e.metaKey) {
      const m = /^Key([A-Z])$/.exec(c);
      if (m) return m[1].toLowerCase();
      const d = /^Digit([0-9])$/.exec(c);
      if (d && !e.shiftKey) return d[1];
      if (c === 'Slash') return e.shiftKey ? '?' : '/';
      if (c === 'Period' && e.shiftKey) return '>';
    }
    return e.key;
  }
  window.keyOf = keyOf;

  // 소속(이니셔티브) 선택 옵션 — 'KR > 이니셔티브' 라벨 (할일 생성·이동용)
  function initOptions(selectedId) {
    const out = [];
    window.Store.walk((n, depth, anc) => {
      if (n.type !== 'init') return;
      const lbl = (((anc[1] || {}).title ? anc[1].title + ' > ' : '') + (n.title || '(제목 없음)')).slice(0, 30);
      out.push('<option value="' + n.id + '"' + (n.id === selectedId ? ' selected' : '') + '>' + esc(lbl) + '</option>');
    });
    return out.join('');
  }

  window.R = { esc, gauge, pathLine, carryTag, warnTag, checkbox, flashRows, notice, conflictNotice, fmtTs, typeFX, initOptions };
})();
