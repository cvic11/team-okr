// ── [6] 메시지 — 터미널 스타일 채팅 (플래너 채팅과 같은 DB 공유) ──
// messages(1:1·그룹) / chat_rooms / chat_room_members. DB 연동 모드 전용.
(function () {
  'use strict';
  const S = () => window.Store;
  const sb = () => (window.OKR_SYNC && window.OKR_SYNC.enabled) ? window.OKR_SYNC.client : null;

  function meMember() { const n = S().me(); return n ? S().member(n) : null; }
  function memberOf(id) { return S().data.members.find(x => x.id === id); }
  function nowIso() { return new Date().toISOString(); }
  function rid(p) { return p + '_' + Math.random().toString(36).slice(2, 9) + Date.now().toString(36).slice(-4); }
  function fmtTime(ts) {
    if (!ts) return '';
    const d = new Date(ts), t = new Date();
    const hm = String(d.getHours()).padStart(2, '0') + ':' + String(d.getMinutes()).padStart(2, '0');
    return d.toDateString() === t.toDateString() ? hm : (d.getMonth() + 1) + '/' + d.getDate() + ' ' + hm;
  }

  const ViewChat = {
    el: null,
    view: 'list',      // list | conv | room | new-room | invite
    peer: null, room: null,
    sel: 0,
    messages: [], rooms: [], roomMems: {}, myRead: {},
    drafts: {},
    loaded: false, _booted: false, _refreshT: null,

    mount(el) { this.el = el; this.boot(); this.render(); },

    teamId() { return window.OKR_SYNC ? window.OKR_SYNC.teamId : null; },
    key() { return this.room ? 'r:' + this.room : (this.peer ? 'p:' + this.peer : ''); },

    async boot() {
      if (this._booted || !sb()) return;
      this._booted = true;
      await this.load();
      this.subscribe();
      this.render();
      if (window.App) window.App.renderTopbar();
    },
    async load() {
      const m = meMember(); const c = sb();
      if (!m || !c || !this.teamId()) return;
      try {
        const rm = await c.from('chat_room_members').select('*');
        const allRm = rm.data || [];
        this.roomMems = {};
        allRm.forEach(x => { (this.roomMems[x.room_id] = this.roomMems[x.room_id] || []).push(x.member_id); });
        const myRows = allRm.filter(x => x.member_id === m.id);
        this.myRead = {};
        myRows.forEach(x => { this.myRead[x.room_id] = x.last_read_at; });
        const ids = myRows.map(x => x.room_id);
        if (ids.length) {
          const rr = await c.from('chat_rooms').select('*').in('id', ids);
          this.rooms = (rr.data || []).filter(r => r.team_id === this.teamId());
        } else this.rooms = [];
        let orExpr = 'from_id.eq.' + m.id + ',to_id.eq.' + m.id;
        const rids = this.rooms.map(r => r.id);
        if (rids.length) orExpr += ',room_id.in.(' + rids.join(',') + ')';
        const { data, error } = await c.from('messages').select('*').eq('team_id', this.teamId()).or(orExpr).order('created_at', { ascending: true });
        if (!error) this.messages = data || [];
        this.loaded = true;
      } catch (e) { console.warn('[chat-t] load fail', e); }
    },
    subscribe() {
      const c = sb(); if (!c || this._ch) return;
      const onAny = () => { this.scheduleRefresh(); };
      this._ch = c.channel('okrterm-chat')
        .on('postgres_changes', { event: '*', schema: 'public', table: 'messages' }, p => {
          const r = p.new || p.old; const m = meMember();
          if (!r || !m || r.team_id !== this.teamId()) return;
          const isMyRoom = r.room_id && this.rooms.some(x => x.id === r.room_id);
          if (!isMyRoom && r.from_id !== m.id && r.to_id !== m.id) return;
          if (p.eventType === 'DELETE') this.messages = this.messages.filter(x => x.id !== r.id);
          else {
            const i = this.messages.findIndex(x => x.id === r.id);
            if (i >= 0) this.messages[i] = r; else this.messages.push(r);
          }
          this.messages.sort((a, b) => new Date(a.created_at) - new Date(b.created_at));
          if (window.App && window.App.mode === 'chat') this.render();
          if (window.App) window.App.renderTopbar();
        })
        .on('postgres_changes', { event: '*', schema: 'public', table: 'chat_rooms' }, onAny)
        .on('postgres_changes', { event: '*', schema: 'public', table: 'chat_room_members' }, p => {
          const r = p.new || p.old; const m = meMember();
          if (p.eventType === 'UPDATE' && r && m && r.member_id === m.id) return; // 내 읽음 echo
          onAny();
        })
        .subscribe();
    },
    scheduleRefresh() {
      if (this._refreshT) clearTimeout(this._refreshT);
      this._refreshT = setTimeout(async () => {
        this._refreshT = null;
        await this.load();
        if (window.App && window.App.mode === 'chat') this.render();
        if (window.App) window.App.renderTopbar();
      }, 700);
    },

    dmWith(peerId) {
      const m = meMember(); if (!m) return [];
      return this.messages.filter(x => !x.room_id && ((x.from_id === m.id && x.to_id === peerId) || (x.from_id === peerId && x.to_id === m.id)));
    },
    roomMsgs(roomId) { return this.messages.filter(x => x.room_id === roomId); },
    dmUnread(peerId) { const m = meMember(); if (!m) return 0; return this.messages.filter(x => !x.room_id && x.from_id === peerId && x.to_id === m.id && !x.read_at).length; },
    roomUnread(roomId) {
      const m = meMember(); if (!m) return 0;
      const lr = this.myRead[roomId];
      return this.messages.filter(x => x.room_id === roomId && x.from_id !== m.id && (!lr || x.created_at > lr)).length;
    },
    unread() {
      const m = meMember(); if (!m || !this.loaded) return 0;
      const dm = this.messages.filter(x => !x.room_id && x.to_id === m.id && !x.read_at).length;
      return dm + this.rooms.reduce((s, r) => s + this.roomUnread(r.id), 0);
    },
    roomName(r) {
      if (r.name) return r.name;
      const m = meMember();
      return (this.roomMems[r.id] || []).filter(x => !m || x !== m.id).map(x => (memberOf(x) || {}).name || '?').join(', ') || '그룹';
    },

    entries() { // 목록: 그룹 + 1:1, 미읽음·최근 활동순
      const m = meMember(); if (!m) return [];
      const out = [];
      this.rooms.forEach(r => {
        const msgs = this.roomMsgs(r.id);
        out.push({ kind: 'room', id: r.id, name: this.roomName(r) + ' 〔' + (this.roomMems[r.id] || []).length + '명〕', last: msgs[msgs.length - 1] || null, unread: this.roomUnread(r.id) });
      });
      S().data.members.filter(x => !x.isObserver && x.id !== m.id).forEach(mm => {
        const msgs = this.dmWith(mm.id);
        out.push({ kind: 'dm', id: mm.id, name: mm.name, last: msgs[msgs.length - 1] || null, unread: this.dmUnread(mm.id) });
      });
      out.sort((a, b) => {
        if (a.unread && !b.unread) return -1;
        if (!a.unread && b.unread) return 1;
        const at = a.last ? new Date(a.last.created_at).getTime() : 0;
        const bt = b.last ? new Date(b.last.created_at).getTime() : 0;
        return bt - at;
      });
      return out;
    },

    async send(body) {
      const m = meMember(); const c = sb();
      if (!m || !c || !body || (!this.peer && !this.room)) return;
      const row = { id: rid('m'), team_id: this.teamId(), from_id: m.id, to_id: this.peer || null, room_id: this.room || null, body, created_at: nowIso() };
      this.messages.push(row);
      this.render();
      try { const { error } = await c.from('messages').insert(row); if (error) window.R.notice('! 전송 실패: ' + error.message, 'warn'); }
      catch (e) { window.R.notice('! 전송 실패', 'warn'); }
    },
    async markRead() {
      const m = meMember(); const c = sb(); if (!m || !c) return;
      if (this.peer) {
        const unread = this.messages.filter(x => !x.room_id && x.from_id === this.peer && x.to_id === m.id && !x.read_at);
        if (!unread.length) return;
        const now = nowIso(); unread.forEach(x => { x.read_at = now; });
        try { await c.from('messages').update({ read_at: now }).eq('to_id', m.id).eq('from_id', this.peer).is('read_at', null); } catch (e) { }
      } else if (this.room) {
        this.myRead[this.room] = nowIso();
        try { await c.from('chat_room_members').update({ last_read_at: this.myRead[this.room] }).eq('room_id', this.room).eq('member_id', m.id); } catch (e) { }
      }
      if (window.App) window.App.renderTopbar();
    },
    async createRoom(name, ids) {
      const m = meMember(); const c = sb(); if (!m || !c) return;
      const id = rid('r'); const now = nowIso();
      const room = { id, team_id: this.teamId(), name: name || '', created_by: m.id, created_at: now };
      this.rooms.push(room);
      this.roomMems[id] = [m.id].concat(ids);
      this.myRead[id] = now;
      try {
        const r1 = await c.from('chat_rooms').insert(room); if (r1.error) throw r1.error;
        const rows = [{ room_id: id, member_id: m.id, last_read_at: now }].concat(ids.map(x => ({ room_id: id, member_id: x })));
        const r2 = await c.from('chat_room_members').insert(rows); if (r2.error) throw r2.error;
        window.R.notice('그룹 생성됨: ' + (name || this.roomName(room)));
      } catch (e) { window.R.notice('! 그룹 생성 실패: ' + (e.message || e), 'warn'); }
      this.view = 'room'; this.room = id; this.peer = null;
      this.render();
    },
    async invite(ids) {
      const c = sb(); if (!c || !this.room || !ids.length) return;
      this.roomMems[this.room] = (this.roomMems[this.room] || []).concat(ids);
      try {
        const { error } = await c.from('chat_room_members').insert(ids.map(x => ({ room_id: this.room, member_id: x })));
        if (error) throw error;
        window.R.notice(ids.length + '명 초대 완료');
      } catch (e) { window.R.notice('! 초대 실패: ' + (e.message || e), 'warn'); }
      this.view = 'room';
      this.render();
    },

    // ── 렌더 ──
    render() {
      if (!this.el) return;
      if (!sb()) { this.el.innerHTML = '<div class="empty big-empty">메시지는 플래너 DB 연동 모드에서만 사용할 수 있습니다.</div>'; return; }
      if (!this.loaded) { this.el.innerHTML = '<div class="empty">메시지 불러오는 중...</div>'; this.boot(); return; }
      if (this.view !== 'conv' && this.view !== 'room' && this._cpmT) { clearInterval(this._cpmT); this._cpmT = null; }
      if (this.view === 'list') this.renderList();
      else if (this.view === 'conv' || this.view === 'room') this.renderConv();
      else if (this.view === 'new-room' || this.view === 'invite') this.renderPick();
    },
    renderList() {
      const es = this.entries();
      if (this.sel >= es.length) this.sel = Math.max(0, es.length - 1);
      const rows = es.map((p, i) => {
        const mark = p.kind === 'room' ? '#' : '@';
        const prev = p.last ? ((p.last.from_id === (meMember() || {}).id ? '나: ' : '') + window.R.esc(String(p.last.body || '').slice(0, 48))) : '';
        return '<div class="row sel-row chat-item' + (i === this.sel ? ' selected' : '') + '" data-i="' + i + '" data-kind="' + p.kind + '" data-id="' + p.id + '">'
          + '<span class="tlabel">' + mark + '</span> <span class="title">' + window.R.esc(p.name) + '</span>'
          + (p.unread ? ' <span class="warn">[' + p.unread + ']</span>' : '')
          + (p.last ? ' <span class="dim">· ' + fmtTime(p.last.created_at) + ' · ' + prev + '</span>' : ' <span class="dim">· 대화 없음</span>')
          + '</div>';
      }).join('') || '<div class="empty">대화 가능한 팀원이 없습니다.</div>';
      this.el.innerHTML =
        '<div class="panel chat-panel-t"><div class="panel-title">┌─ 대화 (# 그룹 · @ 1:1) ' + '─'.repeat(8) + '</div>'
        + rows
        + '<div class="row"><button class="lnk" data-ca="new-room">[+ 그룹 만들기]</button></div>'
        + '<div class="hint dim">j/k 이동 · Enter 열기 · 1~5 다른 모드</div></div>';
      this.el.querySelectorAll('.chat-item').forEach(r => r.addEventListener('click', () => this.open(r.dataset.kind, r.dataset.id)));
      const nb = this.el.querySelector('[data-ca="new-room"]');
      if (nb) nb.addEventListener('click', () => { this.view = 'new-room'; this.render(); });
    },
    open(kind, id) {
      if (kind === 'room') { this.view = 'room'; this.room = id; this.peer = null; }
      else { this.view = 'conv'; this.peer = id; this.room = null; }
      this.render();
    },
    renderConv() {
      const m = meMember();
      const isRoom = this.view === 'room';
      const title = isRoom
        ? (() => { const r = this.rooms.find(x => x.id === this.room); return r ? '# ' + this.roomName(r) + ' 〔' + (this.roomMems[this.room] || []).length + '명〕' : null; })()
        : (() => { const p = memberOf(this.peer); return p ? '@ ' + p.name : null; })();
      if (title === null) { this.view = 'list'; this.render(); return; }
      const msgs = isRoom ? this.roomMsgs(this.room) : this.dmWith(this.peer);
      const lines = msgs.length === 0 ? '<div class="empty">아직 메시지가 없습니다. 첫 메시지를 보내보세요.</div>'
        : msgs.map((x, i) => {
          const mine = x.from_id === m.id;
          const day = new Date(x.created_at).toLocaleDateString('ko-KR');
          const sep = (i === 0 || new Date(msgs[i - 1].created_at).toLocaleDateString('ko-KR') !== day)
            ? '<div class="row dim chat-day">── ' + day + ' ──</div>' : '';
          const who = mine ? '나' : ((memberOf(x.from_id) || {}).name || '?');
          return sep + '<div class="row chat-line' + (mine ? ' chat-mine' : '') + '">'
            + '<span class="dim">' + fmtTime(x.created_at) + '</span> '
            + '<span class="' + (mine ? 'tlabel' : 'owner') + '">' + window.R.esc(who) + '</span>'
            + '<span class="dim">│</span> <span class="chat-body">' + window.R.esc(x.body || '') + '</span>'
            + (mine && !isRoom && x.read_at ? ' <span class="dim">✓읽음</span>' : '')
            + '</div>';
        }).join('');
      this.el.innerHTML =
        '<div class="panel chat-panel-t">'
        + '<div class="panel-title">┌─ ' + window.R.esc(title) + ' ' + '─'.repeat(4)
        + ' <button class="lnk" data-ca="back">[← 목록]</button>'
        + (isRoom || !isRoom ? ' <button class="lnk" data-ca="invite">[+ 초대]</button>' : '')
        + '</div>'
        + '<div class="chat-scroll" id="chat-scroll">' + lines + '</div>'
        + '<div class="chat-input-line"><span class="prompt">&gt;</span>'
        + '<input type="text" id="chat-t-input" autocomplete="off" placeholder="메시지 ⏎ 전송 · Esc 목록">'
        + '<span class="dim chat-cpm" id="chat-cpm" title="타자 속도"></span>'
        + '<button class="lnk" data-ca="send">[보내기]</button></div>'
        + '</div>';
      const sc = document.getElementById('chat-scroll'); if (sc) sc.scrollTop = sc.scrollHeight;
      const inp = document.getElementById('chat-t-input');
      inp.value = this.drafts[this.key()] || '';
      // 타자수(속도) 표시 — 최근 10초 타수 기준 타/분
      this._taps = this._taps || [];
      const cpmEl = document.getElementById('chat-cpm');
      const updCpm = () => {
        const now = Date.now();
        this._taps = this._taps.filter(t => now - t <= 10000);
        const cpm = Math.round(this._taps.length * 6);
        if (cpmEl) cpmEl.textContent = cpm > 0 ? cpm + '타/분' : '';
      };
      if (this._cpmT) clearInterval(this._cpmT);
      this._cpmT = setInterval(updCpm, 1000);
      inp.addEventListener('input', (e) => {
        this.drafts[this.key()] = inp.value;
        if (e.data) { this._taps.push(Date.now()); updCpm(); }
      });
      inp.addEventListener('keydown', (e) => {
        if (e.isComposing || e.keyCode === 229) { e.stopPropagation(); return; } // 한글 조합 보호
        if (e.key === 'Enter') { e.preventDefault(); this._sendFromInput(); }
        else if (e.key === 'Escape') { e.preventDefault(); this.drafts[this.key()] = inp.value; this.back(); }
        e.stopPropagation();
      });
      setTimeout(() => { inp.focus(); try { inp.selectionStart = inp.selectionEnd = inp.value.length; } catch (e) { } }, 30);
      this.el.querySelector('[data-ca="back"]').addEventListener('click', () => this.back());
      const iv = this.el.querySelector('[data-ca="invite"]');
      if (iv) iv.addEventListener('click', () => {
        if (!isRoom) { // 1:1 → 현재 상대 포함 그룹 만들기
          this._preselect = this.peer;
          this.view = 'new-room';
        } else this.view = 'invite';
        this.render();
      });
      this.el.querySelector('[data-ca="send"]').addEventListener('click', () => this._sendFromInput());
      this.markRead();
    },
    _sendFromInput() {
      const inp = document.getElementById('chat-t-input');
      if (!inp) return;
      const body = inp.value.trim();
      if (!body) return;
      delete this.drafts[this.key()];
      inp.value = '';
      this.send(body);
    },
    back() { this.view = 'list'; this.peer = null; this.room = null; this.render(); },
    renderPick() {
      const m = meMember();
      const isInvite = this.view === 'invite';
      const inRoom = isInvite ? new Set(this.roomMems[this.room] || []) : null;
      const cands = S().data.members.filter(x => !x.isObserver && x.id !== m.id && (!isInvite || !inRoom.has(x.id)));
      this.el.innerHTML =
        '<div class="panel chat-panel-t">'
        + '<div class="panel-title">┌─ ' + (isInvite ? '멤버 초대' : '새 그룹 만들기') + ' ' + '─'.repeat(6)
        + ' <button class="lnk" data-ca="back">[← 취소]</button></div>'
        + (isInvite ? '' : '<div class="row"><span class="dim">그룹 이름: </span><input type="text" id="cr-name" class="seamless chat-name-input" maxlength="30" placeholder="(비우면 멤버 이름으로 표시)"></div>')
        + (cands.length === 0 ? '<div class="empty">초대할 수 있는 팀원이 없습니다.</div>'
          : cands.map(x => '<div class="row sel-row chat-pick" data-id="' + x.id + '"><span class="cb">[ ]</span> ' + window.R.esc(x.name) + '</div>').join(''))
        + '<div class="row"><button class="lnk" data-ca="go">[' + (isInvite ? '초대하기' : '그룹 만들기') + ']</button></div>'
        + '<div class="hint dim">이름 클릭으로 선택/해제</div></div>';
      const picked = new Set();
      if (this._preselect) { picked.add(this._preselect); this._preselect = null; }
      this.el.querySelectorAll('.chat-pick').forEach(r => {
        const id = r.dataset.id;
        const sync = () => { r.querySelector('.cb').textContent = picked.has(id) ? '[x]' : '[ ]'; r.classList.toggle('selected', picked.has(id)); };
        if (picked.has(id)) sync();
        r.addEventListener('click', () => { if (picked.has(id)) picked.delete(id); else picked.add(id); sync(); });
      });
      this.el.querySelector('[data-ca="back"]').addEventListener('click', () => { this.view = isInvite ? 'room' : 'list'; this.render(); });
      this.el.querySelector('[data-ca="go"]').addEventListener('click', () => {
        const ids = Array.from(picked);
        if (!ids.length) { window.R.notice('! 팀원을 선택하세요', 'warn'); return; }
        if (isInvite) this.invite(ids);
        else this.createRoom(((document.getElementById('cr-name') || {}).value || '').trim(), ids);
      });
      const ni = document.getElementById('cr-name');
      if (ni) ni.addEventListener('keydown', e => e.stopPropagation());
    },

    onKey(e) {
      const k = window.keyOf(e);
      if (this.view === 'list') {
        const es = this.entries();
        if (k === 'j' || e.key === 'ArrowDown') { this.sel = Math.min(es.length - 1, this.sel + 1); this.render(); return true; }
        if (k === 'k' || e.key === 'ArrowUp') { this.sel = Math.max(0, this.sel - 1); this.render(); return true; }
        if (e.key === 'Enter') { const p = es[this.sel]; if (p) this.open(p.kind, p.id); return true; }
        return false;
      }
      if (e.key === 'Escape') { this.back(); return true; }
      return false;
    },
  };

  window.ViewChat = ViewChat;
})();
