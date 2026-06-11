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
    enabled: true,
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
    stamp(el, ch) {
      if (!this.enabled) return;
      // 행 전체가 살짝 내려앉는 타격감
      el.classList.remove('type-jolt'); void el.offsetWidth; el.classList.add('type-jolt');
      setTimeout(() => el.classList.remove('type-jolt'), 90);
      this.click();
      if (!ch || el.tagName === 'TEXTAREA') return;
      const cs = getComputedStyle(el);
      const c = this._canvas.getContext('2d');
      c.font = cs.fontWeight + ' ' + cs.fontSize + ' ' + cs.fontFamily;
      const caret = el.selectionStart != null ? el.selectionStart : el.value.length;
      const before = c.measureText(el.value.slice(0, caret)).width;
      const chW = c.measureText(ch).width;
      const r = el.getBoundingClientRect();
      const x = r.left + (parseFloat(cs.paddingLeft) || 0) + before - el.scrollLeft - chW;
      if (x > r.right || x < r.left - chW) return;
      const s = document.createElement('span');
      s.className = 'type-stamp';
      s.textContent = ch;
      s.style.left = x + 'px';
      s.style.top = r.top + 'px';
      s.style.height = r.height + 'px';
      s.style.font = c.font;
      document.body.appendChild(s);
      setTimeout(() => s.remove(), 170);
    },
  };
  document.addEventListener('input', (e) => {
    const el = e.target;
    if (el.tagName !== 'TEXTAREA' && !(el.tagName === 'INPUT' && (!el.type || el.type === 'text'))) return;
    if (e.inputType && e.inputType !== 'insertText' && e.inputType !== 'insertCompositionText') return;
    const ch = e.data ? e.data.slice(-1) : '';
    typeFX.stamp(el, ch);
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

  window.R = { esc, gauge, pathLine, carryTag, warnTag, checkbox, flashRows, notice, conflictNotice, fmtTs, typeFX };
})();
