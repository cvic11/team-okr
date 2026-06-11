// ── [5] 관리 ──────────────────────────────────────────────────
(function () {
  'use strict';
  const S = () => window.Store;

  const ViewAdmin = {
    el: null,

    mount(el) { this.el = el; this.render(); },

    render() {
      const synced = !!(window.OKR_SYNC && window.OKR_SYNC.enabled); // 플래너 DB 연동 모드
      const members = S().data.members;
      const memberRows = members.map((m, i) =>
        '<div class="row adm-row">'
        + '<span class="title">' + window.R.esc(m.name) + '</span>'
        + (m.name === S().me() ? ' <span class="dim">(나)</span>' : '')
        + ' <span class="dim">마지막 활동: ' + (m.lastActive ? window.R.fmtTs(m.lastActive) : '—') + '</span>'
        + ' <button class="lnk" data-act="pin" data-i="' + i + '">[핀 변경]</button>'
        + (members.length > 1 ? ' <button class="lnk" data-act="del" data-i="' + i + '">[삭제]</button>' : '')
        + '</div>'
      ).join('');

      const logRows = S().data.log.slice(0, 60).map(l =>
        '<div class="row log-row"><span class="dim">' + window.R.fmtTs(l.ts) + '</span> '
        + '<span class="owner">' + window.R.esc(l.actor || '?') + '</span>: '
        + (l.target ? window.R.esc(l.target) + ' ' : '')
        + window.R.esc(l.action)
        + (l.extra ? ' <span class="dim">(' + window.R.esc(l.extra) + ')</span>' : '')
        + '</div>'
      ).join('') || '<div class="empty">기록 없음</div>';

      const archives = S().data.archives.map(a =>
        '<div class="row dim">' + a.quarter + ' — ' + window.R.fmtTs(a.closedAt) + ' 마감 (' + Object.keys(a.nodes).length + '개 항목)</div>'
      ).join('') || '<div class="dim">아카이브 없음</div>';

      this.el.innerHTML =
        '<div class="adm-grid">'
        + '<section class="panel"><div class="panel-title">┌─ 멤버 ────────</div>'
        + memberRows
        + '<div class="adm-add"><input type="text" id="adm-name" placeholder="새 멤버 이름" maxlength="12">'
        + '<input type="text" id="adm-pin" placeholder="핀 4자리" maxlength="4" inputmode="numeric">'
        + '<button class="lnk" id="adm-addbtn">[추가]</button></div>'
        + '</section>'

        + '<section class="panel"><div class="panel-title">┌─ 분기 사이클 ────────</div>'
        + '<div class="row">현재: <span class="title">' + S().data.quarter + '</span></div>'
        + archives
        + (synced
          ? '<div class="dim">플래너 DB 연동 모드 — 분기 마감은 기존 플래너 [관리]에서 진행하세요.</div>'
          : '<div class="adm-add">'
          + '<button class="lnk" id="adm-close-copy">[분기 마감 → 지난 분기 복사 후 시작]</button>'
          + '<button class="lnk" id="adm-close-empty">[분기 마감 → 빈 상태로 시작]</button>'
          + '</div>'
          + '<div class="dim">마감 시 전체 트리가 아카이브에 보존됩니다. 직후 u 키로 되돌릴 수 있습니다.</div>')
        + '</section>'

        + '<section class="panel"><div class="panel-title">┌─ 내보내기 / 데이터 ────────</div>'
        + '<div class="adm-add">'
        + '<button class="lnk" id="adm-csv">[CSV 내보내기 (트리+WBS)]</button>'
        + (synced ? '' : '<button class="lnk" id="adm-cleansim">[데모 활동 청소]</button>'
          + '<button class="lnk" id="adm-reset">[데모 데이터 초기화]</button>')
        + '<button class="lnk" id="adm-logout">[로그아웃]</button>'
        + '</div>'
        + (synced
          ? '<div class="dim">플래너 DB 연동 모드 — 모든 변경이 기존 플래너와 실시간 공유됩니다.</div>'
          : '<div class="dim">데모 활동 청소: 가상 팀원이 만든 할일을 제거하고, 가상 팀원이 완료시킨 항목을 복원합니다.</div>')
        + '</section>'

        + '<section class="panel"><div class="panel-title">┌─ 활동 로그 (최근 60건) ────────</div>'
        + '<div class="log-scroll">' + logRows + '</div>'
        + '</section>'
        + '</div>';

      this.bind();
    },

    bind() {
      const self = this;
      const sync = (window.OKR_SYNC && window.OKR_SYNC.enabled) ? window.OKR_SYNC : null;
      this.el.querySelectorAll('[data-act="pin"]').forEach(b => b.addEventListener('click', () => {
        const m = S().data.members[+b.dataset.i];
        const pin = prompt(m.name + '의 새 핀 4자리:', '');
        if (pin && /^\d{4}$/.test(pin)) {
          if (sync) {
            sync.setPin(m, pin).then(err => window.R.notice(err ? '! 핀 저장 실패: ' + err : m.name + ' 핀 변경됨 (플래너와 공유)', err ? 'warn' : ''));
          } else { m.pin = pin; S().persist(); window.R.notice(m.name + ' 핀 변경됨'); }
        }
        else if (pin !== null) window.R.notice('! 숫자 4자리만 가능합니다', 'warn');
      }));
      this.el.querySelectorAll('[data-act="del"]').forEach(b => b.addEventListener('click', () => {
        const m = S().data.members[+b.dataset.i];
        if (!confirm(m.name + ' 멤버를 삭제할까요? (담당 항목은 유지됩니다)')) return;
        if (sync) {
          sync.delMember(m).then(err => {
            if (err) { window.R.notice('! 삭제 실패 (담당 항목이 남아있을 수 있음): ' + err, 'warn'); return; }
            S().log(S().me(), '멤버삭제', null, m.name);
            self.render();
          });
          return;
        }
        S().data.members.splice(+b.dataset.i, 1);
        S().log(S().me(), '멤버삭제', null, m.name);
        S().persist(); self.render();
      }));
      this.el.querySelector('#adm-addbtn').addEventListener('click', () => {
        const name = this.el.querySelector('#adm-name').value.trim();
        const pin = this.el.querySelector('#adm-pin').value.trim();
        if (!name) { window.R.notice('! 이름을 입력하세요', 'warn'); return; }
        if (!/^\d{4}$/.test(pin)) { window.R.notice('! 핀은 숫자 4자리', 'warn'); return; }
        if (S().member(name)) { window.R.notice('! 같은 이름이 이미 있습니다', 'warn'); return; }
        if (sync) {
          sync.addMember(name, pin).then(err => {
            if (err) { window.R.notice('! 멤버 추가 실패: ' + err, 'warn'); return; }
            S().log(S().me(), '멤버추가', null, name);
            self.render();
          });
          return;
        }
        S().data.members.push({ name, pin, lastActive: null });
        S().log(S().me(), '멤버추가', null, name);
        S().persist(); this.render();
      });
      const closeCopy = this.el.querySelector('#adm-close-copy');
      if (closeCopy) closeCopy.addEventListener('click', () => {
        if (confirm(S().data.quarter + ' 분기를 마감하고, 트리를 복사하여 새 분기를 시작할까요?\n(할일은 비우고 O/KR/이니셔티브는 유지)')) {
          S().closeQuarter(true); window.R.notice('분기 마감 완료 — 지난 분기 복사로 시작');
        }
      });
      const closeEmpty = this.el.querySelector('#adm-close-empty');
      if (closeEmpty) closeEmpty.addEventListener('click', () => {
        if (confirm(S().data.quarter + ' 분기를 마감하고 빈 상태로 시작할까요?')) {
          S().closeQuarter(false); window.R.notice('분기 마감 완료 — 빈 상태로 시작');
        }
      });
      this.el.querySelector('#adm-csv').addEventListener('click', () => {
        const csv = '\uFEFF' + S().csvTree();
        const blob = new Blob([csv], { type: 'text/csv;charset=utf-8' });
        const a = document.createElement('a');
        a.href = URL.createObjectURL(blob);
        a.download = 'okr_' + S().data.quarter + '_' + window.OKRT.TODAY + '.csv';
        a.click();
        URL.revokeObjectURL(a.href);
        window.R.notice('CSV 다운로드 시작');
      });
      const cleanBtn = this.el.querySelector('#adm-cleansim');
      if (cleanBtn) cleanBtn.addEventListener('click', () => {
        const r = S().cleanSim();
        window.R.notice('데모 활동 청소 완료 — 생성 ' + r.removed + '건 제거, 완료 ' + r.reverted + '건 복원 (u 키로 되돌리기 가능)');
      });
      const resetBtn = this.el.querySelector('#adm-reset');
      if (resetBtn) resetBtn.addEventListener('click', () => {
        if (confirm('모든 데이터를 데모 시드로 초기화할까요?')) { S().resetSeed(); window.R.notice('데모 데이터로 초기화됨'); }
      });
      this.el.querySelector('#adm-logout').addEventListener('click', () => {
        S().logout(); location.reload();
      });
      this.el.querySelectorAll('#adm-name,#adm-pin').forEach(i =>
        i.addEventListener('keydown', e => e.stopPropagation()));
    },

    onKey() { return false; },
  };

  window.ViewAdmin = ViewAdmin;
})();
