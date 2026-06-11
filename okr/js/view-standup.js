// ── [4] 스탠드업 — 아침 회의 모드 ──────────────────────────────
(function () {
  'use strict';
  const S = () => window.Store;
  const D = () => window.OKRD;

  const ViewStandup = {
    el: null,
    step: 0,          // 0..N-1 멤버, N = 팀 요약
    history: false,

    mount(el) { this.el = el; this.step = 0; this.render(); },

    members() { return S().data.members.map(m => m.name); },

    yesterdayDone(member) {
      const cut = D().add(window.OKRT.TODAY, -1);
      return S().recentDone(2).filter(t =>
        (t.updatedBy === member || t.owner === member) && t.completedAt && t.completedAt.slice(0, 10) >= cut);
    },
    todayFor(member) {
      return S().todayTasks().filter(t => t.owner === member);
    },

    render() {
      if (this.history) { this.renderHistory(); return; }
      const members = this.members();
      const N = members.length;
      const today = window.OKRT.TODAY;

      // 상단 진행 표시
      const dots = members.map((m, i) =>
        '<span class="' + (i === this.step ? 'su-dot-on' : 'dim') + '">' + (i + 1) + ' ' + window.R.esc(m) + '</span>'
      ).join('<span class="dim"> · </span>')
        + '<span class="dim"> · </span><span class="' + (this.step === N ? 'su-dot-on' : 'dim') + '">요약</span>';

      const head = '<div class="su-head">'
        + '<div class="su-meta dim">스탠드업 · ' + today + ' (' + D().dow(today) + ') · → 다음 / ← 이전 / h 지난 기록</div>'
        + '<div class="su-dots">' + dots + '</div></div>';

      if (this.step >= N) { this.renderSummary(head); return; }

      const m = members[this.step];
      const done = this.yesterdayDone(m);
      const todo = this.todayFor(m);
      const note = S().standupNote(today, m);

      const doneHtml = done.length
        ? done.map(t => '<div class="su-item done-text">[x] ' + window.R.esc(t.title) + ' <span class="dim su-path">' + window.R.esc(S().pathStr(t.id)) + '</span></div>').join('')
        : '<div class="su-item dim">— 없음</div>';
      const todoHtml = todo.length
        ? todo.map(t => '<div class="su-item">[ ] ' + window.R.esc(t.title) + window.R.carryTag(t) + ' <span class="dim su-path">' + window.R.esc(S().pathStr(t.id)) + '</span></div>').join('')
        : '<div class="su-item dim">— 오늘의 할일 없음</div>';

      this.el.innerHTML = head
        + '<div class="su-stage">'
        + '<div class="su-name">' + window.R.esc(m) + '</div>'
        + '<div class="su-sec"><div class="su-sec-title">① 어제 완료한 것</div>' + doneHtml + '</div>'
        + '<div class="su-sec"><div class="su-sec-title">② 오늘 할 것 <span class="dim">(오늘의 할일 자동 인용)</span></div>' + todoHtml + '</div>'
        + '<div class="su-sec"><div class="su-sec-title">③ 막힌 것</div>'
        + '<textarea class="su-blocked" rows="2" placeholder="막힌 것이 있으면 입력... (자동 저장)">' + window.R.esc(note.blocked || '') + '</textarea></div>'
        + '</div>';

      const ta = this.el.querySelector('.su-blocked');
      ta.addEventListener('input', () => S().saveStandupNote(today, m, { blocked: ta.value }));
      ta.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') return; // 전역 핸들러가 blur 처리
        // 내용 끝에서 → 키 = 다음 사람 (F7: textarea에 갇히지 않게)
        if (e.key === 'ArrowRight' && !e.isComposing
          && ta.selectionStart === ta.value.length && ta.selectionEnd === ta.value.length) {
          e.preventDefault();
          e.stopPropagation(); // 전역 핸들러로 버블되어 2번 진행되는 것 방지
          ta.blur();
          const N = this.members().length;
          this.step = this.step >= N ? 0 : this.step + 1;
          this.render();
          return;
        }
        e.stopPropagation();
      });
    },

    renderSummary(head) {
      const today = window.OKRT.TODAY;
      // O별 진척
      const oHtml = S().roots().map((o, i) =>
        '<div class="su-item"><span class="tlabel">O' + (i + 1) + '</span> ' + window.R.esc(o.title)
        + '<div class="su-gauge">' + window.R.gauge(S().percent(o.id), 24) + '</div></div>'
      ).join('');
      // 이번 주 마감 임박
      const soon = S().dueSoon(7);
      const soonHtml = soon.length
        ? soon.map(t => '<div class="su-item">' + D().fmt(t.due) + '(' + D().dow(t.due) + ') ' + window.R.esc(t.title) + ' <span class="owner">@' + window.R.esc(t.owner) + '</span></div>').join('')
        : '<div class="su-item dim">— 없음</div>';
      // 이월 3회+ 경고
      const carried = S().todayTasks().filter(t => S().carryDays(t) >= 3);
      const carriedHtml = carried.length
        ? carried.map(t => '<div class="su-item warn">! ' + window.R.esc(t.title) + ' (+' + S().carryDays(t) + 'd) <span class="owner">@' + window.R.esc(t.owner) + '</span></div>').join('')
        : '<div class="su-item dim">— 없음</div>';
      // 오늘 막힌 것 모음
      const notes = S().data.standup[today] || {};
      const blockedList = this.members().filter(m => notes[m] && notes[m].blocked && notes[m].blocked.trim());
      const blockedHtml = blockedList.length
        ? blockedList.map(m => '<div class="su-item">' + window.R.esc(m) + ': ' + window.R.esc(notes[m].blocked) + '</div>').join('')
        : '<div class="su-item dim">— 없음</div>';

      this.el.innerHTML = head
        + '<div class="su-stage su-summary">'
        + '<div class="su-name">팀 요약</div>'
        + '<div class="su-cols">'
        + '<div><div class="su-sec"><div class="su-sec-title">O별 진척</div>' + oHtml + '</div>'
        + '<div class="su-sec"><div class="su-sec-title">오늘 막힌 것</div>' + blockedHtml + '</div></div>'
        + '<div><div class="su-sec"><div class="su-sec-title">이번 주 마감 임박</div>' + soonHtml + '</div>'
        + '<div class="su-sec"><div class="su-sec-title">이월 3회 이상 경고</div>' + carriedHtml + '</div></div>'
        + '</div>'
        + '<div class="dim">회의 내용은 standup_notes에 저장되었습니다. → 처음으로</div>'
        + '</div>';
    },

    renderHistory() {
      const dates = Object.keys(S().data.standup).sort().reverse();
      const html = dates.length ? dates.map(d => {
        const notes = S().data.standup[d];
        const lines = Object.keys(notes).map(m =>
          '<div class="su-item">' + window.R.esc(m) + ': ' + (notes[m].blocked ? window.R.esc(notes[m].blocked) : '<span class="dim">막힌 것 없음</span>') + '</div>').join('');
        return '<div class="su-sec"><div class="su-sec-title">' + d + ' (' + D().dow(d) + ')</div>' + lines + '</div>';
      }).join('') : '<div class="empty">기록이 없습니다.</div>';
      this.el.innerHTML = '<div class="su-head"><span class="dim">스탠드업 지난 기록 · h 또는 Esc 로 돌아가기</span></div>'
        + '<div class="su-stage">' + html + '</div>';
    },

    onKey(e) {
      const k = window.keyOf(e);
      if (this.history) {
        if (k === 'h' || e.key === 'Escape') { this.history = false; this.render(); return true; }
        return false;
      }
      const N = this.members().length;
      if (e.key === 'ArrowRight' || e.key === ' ' || e.key === 'Enter') {
        this.step = this.step >= N ? 0 : this.step + 1;
        this.render(); return true;
      }
      if (e.key === 'ArrowLeft') { this.step = Math.max(0, this.step - 1); this.render(); return true; }
      if (k === 'h') { this.history = true; this.render(); return true; }
      return false;
    },
  };

  window.ViewStandup = ViewStandup;
})();
