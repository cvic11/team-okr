// ── 앱 셸: 로그인 · 모드 라우팅 · 전역 키 · 명령줄 ───────────────
(function () {
  'use strict';
  const S = () => window.Store;

  const MODES = [
    { key: '1', id: 'today', label: '오늘', view: () => window.ViewToday },
    { key: '2', id: 'tree', label: '트리', view: () => window.ViewTree },
    { key: '3', id: 'wbs', label: 'WBS', view: () => window.ViewWBS },
    { key: '4', id: 'standup', label: '스탠드업', view: () => window.ViewStandup },
    { key: '5', id: 'admin', label: '관리', view: () => window.ViewAdmin },
  ];

  const App = {
    mode: 'today',
    helpOpen: false,

    init() {
      S().init();
      this.main = document.getElementById('main');
      this.bindGlobal();
      this.bindCommand();
      if (!S().me()) this.renderLogin();
      else this.boot();
    },

    boot() {
      document.getElementById('login-screen').style.display = 'none';
      document.getElementById('app-screen').style.display = '';
      S().onChange((detail) => this.onStoreChange(detail));
      window.Sim.setEnabled(window.Sim.enabled);
      this.setMode('today');
      this.renderTopbar();
      setInterval(() => this.renderTopbar(), 4000); // presence 주기 갱신
    },

    // ── 로그인 ──
    loginSel: 0, loginStage: 'name', loginPin: '',
    renderLogin() {
      document.getElementById('app-screen').style.display = 'none';
      const el = document.getElementById('login-screen');
      el.style.display = '';
      const members = S().data.members;
      if (this.loginSel >= members.length) this.loginSel = 0;

      let body;
      if (this.loginStage === 'name') {
        body = members.map((m, i) =>
          '<div class="login-item' + (i === this.loginSel ? ' selected' : '') + '" data-i="' + i + '">'
          + (i === this.loginSel ? '&gt; ' : '&nbsp;&nbsp;') + window.R.esc(m.name) + '</div>').join('')
          + '<div class="dim login-hint">j/k 또는 ↑↓ 선택 · Enter 확인</div>';
      } else {
        const name = members[this.loginSel].name;
        body = '<div class="login-item">' + window.R.esc(name) + ' — 핀 4자리 입력</div>'
          + '<div class="login-pin">' + ('*'.repeat(this.loginPin.length) + '_'.repeat(4 - this.loginPin.length)).split('').join(' ') + '</div>'
          + (this.loginErr ? '<div class="warn">' + this.loginErr + '</div>' : '')
          + '<div class="dim login-hint">숫자 입력 · Esc 뒤로 · 데모 핀: 0000</div>';
      }
      el.innerHTML =
        '<div class="login-box">'
        + '<pre class="login-title">┌──────────────────────────────────┐\n│     팀 OKR 터미널  ·  ' + window.R.esc(S().data.quarter) + '    │\n└──────────────────────────────────┘</pre>'
        + body
        + '<div class="dim login-foot">사내 팀 도구 — 민감정보(개인정보·매출 원천 데이터)는 저장하지 않습니다 · <a class="switch-link" href="../">기존 플래너로↗</a></div>'
        + '</div>';
      el.querySelectorAll('.login-item[data-i]').forEach(it =>
        it.addEventListener('click', () => { this.loginSel = +it.dataset.i; this.loginStage = 'pin'; this.loginPin = ''; this.renderLogin(); }));
    },
    loginKey(e) {
      const members = S().data.members;
      const k = window.keyOf(e);
      if (this.loginStage === 'name') {
        if (k === 'j' || e.key === 'ArrowDown') { this.loginSel = Math.min(members.length - 1, this.loginSel + 1); this.renderLogin(); }
        else if (k === 'k' || e.key === 'ArrowUp') { this.loginSel = Math.max(0, this.loginSel - 1); this.renderLogin(); }
        else if (e.key === 'Enter') { this.loginStage = 'pin'; this.loginPin = ''; this.loginErr = ''; this.renderLogin(); }
      } else {
        if (/^\d$/.test(k)) {
          this.loginPin += k;
          if (this.loginPin.length >= 4) {
            const m = members[this.loginSel];
            const pin = this.loginPin;
            // DB 연동 모드에서는 플래너와 같은 pin_hash 검증 (비동기)
            const check = (window.OKR_SYNC && window.OKR_SYNC.enabled)
              ? window.OKR_SYNC.verifyPin(m, pin)
              : Promise.resolve(pin === m.pin);
            check.then(ok => {
              if (ok) { S().login(m.name); this.boot(); return; }
              this.loginErr = '! 핀이 일치하지 않습니다'; this.loginPin = '';
              this.renderLogin();
            });
            return;
          }
          this.renderLogin();
        }
        else if (e.key === 'Backspace') { this.loginPin = this.loginPin.slice(0, -1); this.renderLogin(); }
        else if (e.key === 'Escape') { this.loginStage = 'name'; this.loginErr = ''; this.renderLogin(); }
      }
    },

    // ── 모드 ──
    setMode(id) {
      this.mode = id;
      const m = MODES.find(x => x.id === id);
      this.currentView = m.view();
      this.main.innerHTML = '';
      this.currentView.mount(this.main);
      this.renderTopbar();
    },
    gotoTree(nodeId) {
      this.setMode('tree');
      window.ViewTree.focusNode(nodeId);
      this.renderTopbar();
    },

    // 사용자가 드래그/인라인 편집 중이면 재렌더링을 미룬다 (드래그 끊김 방지)
    _pending: false,
    isInteracting() {
      return !!((window.ViewWBS && window.ViewWBS.drag)
        || (window.ViewTree && (window.ViewTree.editingId || window.ViewTree.dragId)));
    },
    flushPending() {
      if (!this._pending) return;
      this._pending = false;
      if (this.currentView) this.currentView.render();
      this.renderTopbar();
    },

    onStoreChange(detail) {
      if (!S().me()) return;
      if (this.isInteracting()) { this._pending = true; return; }
      this.currentView.render();
      if (detail && detail.changed) window.R.flashRows(detail.changed);
      this.renderTopbar();
    },
    refresh(opts) {
      if (!S().me() || !this.currentView) return;
      if (this.isInteracting()) { this._pending = true; return; }
      this.currentView.render();
      if (!(opts && opts.soft)) this.renderTopbar();
    },

    // ── 상단 바 ──
    renderTopbar() {
      if (!S().me()) return;
      const tabs = MODES.map(m =>
        '<button class="tab' + (m.id === this.mode ? ' tab-on' : '') + '" data-mode="' + m.id + '">'
        + '[' + m.key + ']' + m.label + '</button>').join('');
      const presence = S().data.members.map(m => {
        const on = m.name === S().me() ? true : !!window.Sim.presence[m.name];
        return '<span class="' + (on ? '' : 'dim') + '">' + window.R.esc(m.name) + (on ? '●' : '○') + '</span>';
      }).join(' ');
      const html =
        '<div class="tabs">' + tabs + '</div>'
        + '<div class="top-right">'
        + (S().offline ? '<span class="offline-badge">OFFLINE</span> ' : '')
        + '<span class="dim">' + window.R.esc(S().data.quarter) + '</span> '
        + presence
        + ' <span class="dim">│ 나: </span><span>' + window.R.esc(S().me()) + '</span>'
        + ' <a class="switch-link dim" href="../" title="기존 플래너 버전으로 전환">[플래너↗]</a>'
        + '</div>';
      if (this._topbarHtml === html) return; // 내용 동일하면 재렌더 생략 — 4초 주기 깜빡임 방지
      this._topbarHtml = html;
      document.getElementById('topbar').innerHTML = html;
      document.querySelectorAll('#topbar .tab').forEach(t =>
        t.addEventListener('click', () => this.setMode(t.dataset.mode)));
    },

    // ── 전역 키 ──
    bindGlobal() {
      document.addEventListener('keydown', (e) => {
        if (!S().me()) { this.loginKey(e); return; }

        const k = window.keyOf(e);
        const inInput = /^(INPUT|TEXTAREA|SELECT)$/.test(document.activeElement.tagName);
        const isCmd = document.activeElement.id === 'cmd-input';

        if (this.helpOpen) {
          if (e.key === 'Escape' || k === '?') { this.toggleHelp(false); e.preventDefault(); }
          return;
        }
        if (isCmd) return; // 명령줄 자체 핸들러가 처리
        if (inInput) {
          // 편집 폼: Tree의 edit-row 핸들러가 stopPropagation으로 우선 처리. 여기는 Esc만.
          if (e.key === 'Escape') document.activeElement.blur();
          return;
        }

        if (k >= '1' && k <= '5' && !e.altKey && !e.ctrlKey && !e.metaKey) {
          this.setMode(MODES[+k - 1].id); e.preventDefault(); return;
        }
        if (k === '?') { this.toggleHelp(true); e.preventDefault(); return; }
        if (k === '/') { this.focusCmd('find '); e.preventDefault(); return; }
        if (k === '>') { this.focusCmd(''); e.preventDefault(); return; }
        if (k === 'u' && !e.altKey) {
          if (S().undo()) window.R.notice('실행 취소됨');
          else window.R.notice('되돌릴 작업이 없습니다', 'warn');
          e.preventDefault(); return;
        }
        const handled = this.currentView.onKey(e);
        if (handled === true) e.preventDefault();
      });
    },

    // ── 명령줄 ──
    bindCommand() {
      const input = document.getElementById('cmd-input');
      input.addEventListener('keydown', (e) => {
        e.stopPropagation();
        if (e.isComposing || e.keyCode === 229) return; // 한글 조합 중 Enter 보호
        if (e.key === 'Escape') { input.value = ''; input.blur(); }
        if (e.key === 'Enter') {
          const v = input.value.trim();
          input.value = '';
          input.blur();
          if (v) this.execCommand(v);
        }
      });
      document.getElementById('cmd-line').addEventListener('click', () => input.focus());
    },
    focusCmd(prefill) {
      const input = document.getElementById('cmd-input');
      input.value = prefill || '';
      input.focus();
      input.setSelectionRange(input.value.length, input.value.length);
    },
    execCommand(raw) {
      const m = raw.match(/^(\S+)\s*(.*)$/);
      if (!m) return;
      const cmd = m[1].toLowerCase(), arg = m[2].trim();

      if (cmd === 'add') {
        const am = arg.match(/^(o|kr|init|task|할일|목표)\s+(.+)$/i);
        if (!am) { window.R.notice('사용법: add o|kr|init|task <제목>', 'warn'); return; }
        let type = am[1].toLowerCase();
        if (type === '목표') type = 'o'; if (type === '할일') type = 'task';
        const title = am[2];
        const parent = this.findParentFor(type);
        if (parent === undefined) { window.R.notice('! 상위 항목이 없습니다. 먼저 상위 계층을 만드세요.', 'warn'); return; }
        const n = S().create(type, parent, { title });
        window.R.notice(window.OKRT.TYPE_LABEL[type] + ' 생성됨: "' + window.R.esc(title) + '"');
        this.gotoTree(n.id);
        return;
      }
      if (cmd === 'done') {
        if (!arg) { window.R.notice('사용법: done <검색어>', 'warn'); return; }
        const t = Object.values(S().data.nodes).find(n =>
          n.type === 'task' && n.status !== 'done' && n.title.toLowerCase().includes(arg.toLowerCase()));
        if (!t) { window.R.notice('! 일치하는 미완료 할일 없음: ' + window.R.esc(arg), 'warn'); return; }
        S().toggleDone(t.id);
        window.R.notice('완료: "' + window.R.esc(t.title) + '"');
        return;
      }
      if (cmd === 'find') {
        if (!arg) { window.R.notice('사용법: find <검색어>', 'warn'); return; }
        const matches = Object.values(S().data.nodes).filter(n =>
          n.title.toLowerCase().includes(arg.toLowerCase()));
        if (!matches.length) { window.R.notice('! 검색 결과 없음: ' + window.R.esc(arg), 'warn'); return; }
        window.ViewTree.findTerm = arg;
        this.gotoTree(matches[0].id);
        window.R.notice(matches.length + '건 일치 — 트리에서 강조 표시');
        return;
      }
      window.R.notice('알 수 없는 명령: ' + window.R.esc(cmd) + ' (add / done / find)', 'warn');
    },
    findParentFor(type) {
      // 트리 선택 컨텍스트 기준으로 상위 항목 추정
      const TYPES = window.OKRT.TYPES;
      const ti = TYPES.indexOf(type);
      if (ti === 0) return null; // O는 루트
      const parentType = TYPES[ti - 1];
      const sel = S().node(window.ViewTree.selId);
      if (sel) {
        if (sel.type === parentType) return sel.id;
        const anc = S().ancestors(sel.id).find(a => a.type === parentType);
        if (anc) return anc.id;
        if (sel.type === type) return sel.parentId;
      }
      const first = Object.values(S().data.nodes).filter(n => n.type === parentType).sort((a, b) => a.sort - b.sort)[0];
      return first ? first.id : undefined;
    },

    // ── 도움말 ──
    toggleHelp(open) {
      this.helpOpen = open;
      document.getElementById('help-overlay').style.display = open ? '' : 'none';
    },
  };

  window.App = App;
  document.addEventListener('DOMContentLoaded', () => App.init());
})();
