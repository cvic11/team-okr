// Claude Code 워크플로우 이전 완료 2026-05-21
'use strict';
// v6 CSS injection — index.html 변경 없이 새 스타일 추가
(function(){const s=document.createElement('style');s.textContent=`
.conf-chip{position:relative;transition:box-shadow .15s,opacity .15s}
.conf-chip:hover{box-shadow:0 0 0 2px currentColor;opacity:.92}
.conf-chip::after{content:' ▾';font-size:9px;margin-left:2px;opacity:.55;font-weight:600}
.kr-menu-btn{padding:4px 6px;color:var(--text-soft);border-radius:6px;cursor:pointer;font-size:14px;line-height:1;background:transparent;border:1px solid transparent}
.kr-menu-btn:hover{background:#F4F4F5;color:var(--text)}
.kr-menu-btn.open{background:#EEEAFE;color:var(--primary);border-color:#D9CFFB}
.kr-menu-panel{margin-top:6px;padding:10px 12px;background:#FAFAFA;border:1px solid var(--line);border-radius:8px;display:flex;flex-wrap:wrap;gap:8px;align-items:center}
.kr-menu-panel label{display:flex;align-items:center;gap:5px;font-size:11px;color:var(--text-soft);font-weight:600}
.save-indicator{position:fixed;bottom:24px;left:24px;padding:6px 12px;border-radius:999px;font-size:11.5px;font-weight:600;background:white;border:1px solid var(--line);color:var(--text-soft);display:flex;align-items:center;gap:6px;z-index:48;transition:all .25s;box-shadow:0 2px 6px rgba(0,0,0,.04)}
.save-indicator::before{content:'';width:7px;height:7px;border-radius:999px;background:var(--growth)}
.save-indicator.saving{color:var(--amber);border-color:#FFE4B8}
.save-indicator.saving::before{background:var(--amber);animation:pulse 1s infinite}
.save-indicator.error{color:var(--warning);border-color:#F5C2C5}
.save-indicator.error::before{background:var(--warning)}
.bell-btn{position:relative;display:inline-flex;align-items:center;justify-content:center;padding:6px 8px;border-radius:8px;color:var(--text-soft);cursor:pointer;border:none;background:transparent;font-size:13px}
.bell-btn:hover{background:#F4F4F5;color:var(--text)}
.bell-btn.has-requests{color:var(--warning)}
.bell-badge{position:absolute;top:0;right:0;background:var(--warning);color:white;font-size:9px;font-weight:800;padding:1px 5px;border-radius:999px;min-width:14px;text-align:center;line-height:1.3}
.help-req-item{padding:12px 14px;border:1px solid var(--line);border-radius:10px;margin-bottom:8px;background:white}
.help-req-head{display:flex;align-items:center;gap:8px;margin-bottom:6px;flex-wrap:wrap}
.help-req-from{font-weight:700;font-size:13px}
.help-req-date{font-size:11px;color:var(--text-soft)}
.help-req-type{font-size:10.5px;padding:2px 7px;border-radius:999px;background:var(--primary-soft);color:var(--primary);font-weight:700}
.help-req-detail{font-size:12.5px;color:var(--text);line-height:1.5;background:#FAFAFA;padding:8px 10px;border-radius:6px;margin-top:4px}
.help-req-blocker{font-size:11.5px;color:var(--text-soft);margin-top:4px;font-style:italic}
.briefing-merged{padding:18px 20px;background:linear-gradient(135deg,#FCFCFD 0%,#F4F0FE 100%);border:1px solid var(--primary-soft);border-radius:14px;margin-bottom:14px}
.briefing-merged-head{display:flex;align-items:flex-start;gap:12px;margin-bottom:12px;flex-wrap:wrap}
.briefing-merged-divider{height:1px;background:rgba(98,65,245,0.12);margin:12px 0 10px}
.collapse-toggle{font-size:11px;color:var(--text-soft);padding:2px 8px;border-radius:5px;cursor:pointer;border:1px solid var(--line);background:white}
.collapse-toggle:hover{border-color:var(--primary);color:var(--primary)}
@media (max-width:760px){
  .kr-row-line{flex-direction:column;align-items:stretch}
  .kr-title-input{min-width:0;width:100%}
}
/* v6.1 — 폰트·패딩 시인성 개선 */
body{font-size:15.5px}
.field-input{font-size:13.5px;padding:11px 13px;line-height:1.6;min-height:100px;font-family:inherit;border-radius:8px;background:#FAFAFA;border:1px solid transparent;transition:all .15s}
.field-input:hover{background:#F4F4F5}
.field-input:focus{background:white;border-color:var(--primary);box-shadow:0 0 0 3px var(--primary-soft)}
body.present .field-input{font-size:15px;min-height:130px}
.kr-title-input{font-size:15px;padding:6px 4px}
.obj-title-input{font-size:18px;padding:5px 0}
body.present .obj-title-input{font-size:22px}
.obj-desc-input{font-size:13.5px}
.kr-num-input{font-size:14px;padding:6px 9px;width:68px}
.kr-unit-input{font-size:13.5px;padding:6px 9px;width:64px}
.kr-due-input{font-size:13px;padding:6px 9px}
.kr-owner-select{font-size:12.5px;padding:4px 10px}
.init-title-input{font-size:14px;padding:4px 2px}
.init-status,.init-due{font-size:12px;padding:4px 9px}
.eval-input{font-size:14.5px;padding:11px 13px;line-height:1.55;min-height:70px}
.headline-input{font-size:23px}
body.present .headline-input{font-size:28px}
.labeled-input{font-size:14.5px;padding:9px 12px}
.member-name-input{font-size:14px;padding:6px 10px;width:150px}
.member-role-input{font-size:13.5px;padding:6px 10px}
.rt-input{font-size:14px;padding:8px 11px}
.rt-note-input{font-size:13px;padding:6px 10px;width:230px}
.reality-input{font-size:13.5px;padding:9px 12px;line-height:1.5;min-height:48px}
.kr-pct{font-size:13.5px}
.kr-id{font-size:12px}
.tag-id,.tag-owner{font-size:12px;padding:3px 9px}
.conf-chip{font-size:11.5px;padding:3px 10px}
.reality-toggle{font-size:12px;padding:3px 9px}
.member-name{font-size:15px}
.member-role{font-size:12px}
.kr-strip-title{font-size:14px}
.brand-title{font-size:16px}
.brand-sub{font-size:12px}
.tab{font-size:13.5px;padding:8px 14px}
/* v8 — 모바일 반응형 강화 */
@media (max-width:760px){
  .hdr-inner{padding:8px 14px;min-height:auto;gap:6px}
  .brand{padding:2px 4px}
  .brand-mark{width:30px;height:30px;font-size:13px}
  .brand-title{font-size:14px}
  .brand-sub{font-size:10.5px}
  main{padding:14px 10px}
  .card{padding:14px 12px;border-radius:10px}
  .tab{padding:6px 10px;font-size:12.5px}
  .conn-dot{padding:3px 8px;font-size:10px}
  .bell-btn{padding:5px 7px}
  .kr-row{padding:10px 14px}
  .kr-row-line{flex-direction:column;align-items:stretch;gap:6px}
  .kr-title-input{width:100%;font-size:14.5px;padding:8px 6px;border-bottom:1px solid var(--line)}
  .kr-num-input,.kr-unit-input,.kr-due-input{font-size:13.5px}
  .kr-id{display:inline-block;background:var(--primary-soft);color:var(--primary);padding:2px 7px;border-radius:5px;align-self:flex-start;font-size:11px}
  .kr-owner-select{font-size:12px;align-self:flex-start}
  .kr-pct{font-size:14px;font-weight:800}
  .conf-chip{font-size:12px;padding:4px 11px}
  .obj-head{padding:14px 14px;gap:8px}
  .obj-title-input{font-size:16px}
  .obj-avg{font-size:18px}
  .member-grid{grid-template-columns:1fr;gap:10px}
  .member-card{padding:14px 12px}
  .field-input{font-size:14.5px}
  .perf-grid{grid-template-columns:1fr}
  .perf-card{padding:14px 12px}
  .rt-mng-row{grid-template-columns:1fr 32px;row-gap:6px}
  .rt-mng-row select.rt-input{grid-column:1/-1}
  .modal{max-width:100%;max-height:95vh;border-radius:12px}
  .modal-head{padding:14px 16px}
  .modal-body{padding:14px 16px}
  .modal-foot{padding:12px 16px}
  .reality-row{grid-template-columns:1fr;gap:6px}
  .reality-label{padding-top:0}
  .briefing-merged{padding:14px 12px}
  .briefing-merged-head{gap:8px}
  .save-indicator{bottom:14px;left:14px;padding:5px 10px;font-size:10.5px}
  .headline-input{font-size:19px}
  .stat-row{gap:14px;padding-top:10px;margin-top:10px}
  .stat-value{font-size:17px}
}
@media (max-width:480px){
  .tabs{gap:2px}
  .tab span{display:none}
  .tab{padding:6px 8px}
  .kr-menu-panel{flex-direction:column;align-items:stretch;gap:6px}
  .perf-stats{grid-template-columns:1fr 1fr;gap:6px}
}
/* v8 — 드래그 재정렬 */
.drag-handle{cursor:grab;color:var(--text-soft);padding:4px;user-select:none;font-size:16px;line-height:1}
.drag-handle:hover{color:var(--primary)}
.dragging{opacity:.5;cursor:grabbing}
.drop-target{border-top:3px solid var(--primary)}
/* v29 — 드래그 드롭 위치 인디케이터 (before·after 양쪽 모두 명확히 표시) */
[draggable="true"].drop-target-before,[draggable="true"].drop-target-after{position:relative}
[draggable="true"].drop-target-before::before,[draggable="true"].drop-target-after::after{content:'';position:absolute;left:4px;right:4px;height:4px;background:var(--primary);border-radius:3px;box-shadow:0 0 10px rgba(98,65,245,.55),0 0 0 1px white;z-index:50;pointer-events:none;animation:dropPulse 1s ease-in-out infinite}
[draggable="true"].drop-target-before::before{top:-3px}
[draggable="true"].drop-target-after::after{bottom:-3px}
@keyframes dropPulse{0%,100%{opacity:.85}50%{opacity:1}}
/* v8 — 검색 */
.search-bar{position:relative;display:inline-flex;align-items:center;background:white;border:1px solid var(--line);border-radius:8px;padding:5px 11px;gap:6px;flex:1;max-width:400px}
.search-bar:focus-within{border-color:var(--primary);box-shadow:0 0 0 2px var(--primary-soft)}
.search-bar input{border:none;outline:none;flex:1;font-size:13px;background:transparent;font-family:inherit;min-width:0}
.search-bar .clear{cursor:pointer;color:var(--text-soft);font-size:14px;padding:2px}
mark{background:#FFF59D;color:var(--text);padding:0 2px;border-radius:3px}
/* v10 — 멤버 가로 레이아웃 + 오늘 화면 2열 */
@media (min-width:880px){
  .member-grid{grid-template-columns:1fr;gap:14px}
  .member-card{
    display:grid;
    grid-template-columns:1.35fr 1.35fr 0.85fr;
    grid-template-rows:auto auto;
    column-gap:18px;
    row-gap:14px;
    padding:18px 22px;
    align-items:stretch;
  }
  .member-card .member-head{
    grid-column:1/-1;
    margin-bottom:0;
    padding-bottom:12px;
    border-bottom:1px solid var(--line);
    flex-direction:row;
    align-items:center;
    gap:12px;
  }
  .member-card .member-head .avatar{margin-bottom:0;width:36px;height:36px;font-size:14px}
  .member-card .member-head .member-name{font-size:15px;font-weight:800}
  .member-card .member-head .member-role{font-size:12px;color:var(--text-soft)}
  .member-card .field{margin-bottom:0;min-width:0;display:flex;flex-direction:column}
  /* v62 — 3개 필드 시작 높이 통일: 도움요청 버튼 등 높이 차이 흡수 */
  .member-card .field-label{margin-bottom:6px;flex-shrink:0;min-height:32px}
  /* v61 — 3개 필드 같은 높이: textarea가 셀 남은 공간 모두 차지 */
  .member-card .field-input{flex:1 1 auto;min-height:140px;font-size:13.5px;width:100%;resize:none}
  .member-card .field > textarea.blocker-input{flex:1 1 auto;min-height:140px;resize:none}
  .member-card .field > .krl-block{flex:1;display:flex;flex-direction:column;min-height:160px}
  /* v63 — label 바로 다음 krl-block의 margin-top 제거 (오늘 할 일 시작 높이 통일) */
  .member-card .field > .field-label + .krl-block{margin-top:0 !important}
  .member-card .field > .krl-block > .krl-tasks{flex:1}
  .member-card .reality-box{margin-top:8px}
  /* KR-Link task row v14 — 2행 구조 (KR 칩 상단, 본문 꽉 차게) */
  .member-card .krl-block{padding:10px 12px}
  .member-card .krl-task-row{align-items:stretch !important;flex-wrap:nowrap !important}
  .member-card .krl-task-row textarea[data-krl-field="task-text"]{width:100% !important;min-width:0 !important;flex:1 1 auto !important}
  .member-card .krl-task-row select[data-krl-field="task-kr"]{max-width:100% !important;flex:0 1 auto !important}
}
@media (max-width:879px){
  .today-twocol{grid-template-columns:1fr !important}
  .objectives-pair-row{grid-template-columns:1fr !important}
}
.drag-handle.member-handle{display:inline-block;padding:6px 4px;color:var(--text-soft);cursor:grab;font-size:14px;line-height:1;margin-right:2px}
.drag-handle.member-handle:hover{color:var(--primary)}
/* v10 — 멤버 카드 시각 정돈 */
.member-card{border:1px solid var(--line);border-radius:12px;background:white;box-shadow:0 1px 2px rgba(0,0,0,.02);transition:box-shadow .15s}
.member-card:hover{box-shadow:0 2px 8px rgba(0,0,0,.04)}
.member-card .field-label{font-size:11.5px;font-weight:700;letter-spacing:.3px;color:var(--text-soft);text-transform:uppercase}
.member-card .field-label .field-name{font-size:12px;font-weight:700}
.member-card .field-label .field-name.accent-primary{color:var(--primary)}
.member-card .field-label .field-name.accent-warning{color:var(--warning)}
/* KR-Link 블록 내부 시각 정돈 */
.krl-block{background:#FCFCFD !important}
.krl-block-head{padding-bottom:8px;border-bottom:1px solid #F4F4F5;margin-bottom:8px !important}
.krl-task-row textarea{transition:all .15s}
.krl-task-row textarea:focus{background:white !important;border-color:var(--primary) !important;box-shadow:0 0 0 2px var(--primary-soft)}
/* v9 다크 모드 */
html.dark{color-scheme:dark}
html.dark body{background:#0F1117;color:#E5E7EB}
html.dark{--text:#E5E7EB;--text-soft:#9CA3AF;--line:#2A2D38;--bg:#0F1117;--card:#1A1D27;--primary-soft:#2A2245;--growth-soft:#1A2F25;--warning-soft:#3A1F22;--amber-soft:#3A2D1A}
html.dark .card,html.dark .obj-card,html.dark .perf-card,html.dark .member-card,html.dark .rt-item,html.dark .rt-mng-row,html.dark .help-req-item,html.dark .modal{background:#1A1D27;border-color:#2A2D38;color:#E5E7EB}
html.dark .field-input,html.dark .labeled-input,html.dark .rt-input,html.dark .reality-input,html.dark .eval-input,html.dark .kr-num-input,html.dark .kr-unit-input,html.dark .kr-due-input,html.dark .kr-owner-select,html.dark .init-status,html.dark .init-due,html.dark .member-name-input,html.dark .member-role-input,html.dark .rt-note-input,html.dark .search-bar,html.dark .search-bar input,html.dark .date-input,html.dark .date-nav-btn,html.dark .reality-toggle,html.dark .tag-owner,html.dark .conf-chip{background:#222631;color:#E5E7EB;border-color:#2A2D38}
html.dark .field-input{background:#1F222B}
html.dark header.app-header{background:rgba(15,17,23,.92);border-color:#2A2D38}
html.dark .obj-krs{background:#191B23}
html.dark .briefing-merged{background:linear-gradient(135deg,#1A1D27 0%,#221F38 100%);border-color:#3A2F5A}
html.dark .save-indicator{background:#1A1D27;border-color:#2A2D38;color:#9CA3AF}
html.dark .modal-back{background:rgba(0,0,0,.6)}
html.dark .perf-stat{background:#222631}
html.dark .review-list-item{background:#222631}
html.dark mark{background:#5A4A1A;color:#FFF59D}
html.dark .rt-item.done{background:#1A2A22;border-color:#2A4034}
html.dark .help-req-detail,html.dark .reality-box,html.dark .kr-menu-panel{background:#222631;border-color:#2A2D38}
html.dark .empty{background:#1A1D27;border-color:#2A2D38}
html.dark .add-line{background:#191B23;border-color:#2A2D38}
html.dark .progress-track,html.dark .kr-bar-track{background:#2A2D38}
html.dark .tab:hover,html.dark .btn-mode:hover,html.dark .btn-icon:hover,html.dark .btn-ghost:hover,html.dark .kr-menu-btn:hover{background:#222631}
html.dark .btn-ghost{background:#222631}
html.dark .member-row{background:#191B23}
html.dark .team-menu,html.dark .team-menu-item:hover{background:#1A1D27}
html.dark .kr-menu-btn.open{background:#2A2245;color:#A89BF5;border-color:#3A2F5A}
/* v13 — 브랜드 클릭 가능 시각 표시 (메인 홈으로 이동) */
.brand{cursor:pointer;border-radius:8px;transition:background .15s}
.brand:hover{background:rgba(98,65,245,.06)}
html.dark .brand:hover{background:rgba(168,155,245,.10)}
.brand-title{cursor:pointer}
/* v13 — 입력 완료 시 시각 표시 — 따뜻한 노란/주황 톤 (#FFF8DA 베이스) */
.field-input:not(:placeholder-shown), textarea[data-krl-field="task-text"]:not(:placeholder-shown){background:#FFF8DA !important;border-color:#F5C76A !important;color:#3D2F00 !important;box-shadow:inset 0 0 0 1px rgba(245,184,42,.10) !important}
.field-input:not(:placeholder-shown):focus, textarea[data-krl-field="task-text"]:not(:placeholder-shown):focus{background:#FFFDF2 !important;border-color:var(--primary) !important;box-shadow:0 0 0 3px var(--primary-soft) !important;color:var(--text) !important}
.headline-input:not(:placeholder-shown){background:#FFF8DA !important;border-color:#F5C76A !important;color:#3D2F00 !important}
.headline-input:not(:placeholder-shown):focus{background:#FFFDF2 !important;border-color:var(--primary) !important;color:var(--text) !important}
.field-input[readonly]:not(:placeholder-shown), textarea[readonly][data-krl-field="task-text"]:not(:placeholder-shown){background:#FFF4C4 !important;border-color:#EBB94D !important;color:#3D2F00 !important;opacity:1}
html.dark .field-input:not(:placeholder-shown), html.dark textarea[data-krl-field="task-text"]:not(:placeholder-shown){background:#3A2F0A !important;border-color:#6A5318 !important;color:#FFE9A8 !important}
html.dark .field-input:not(:placeholder-shown):focus, html.dark textarea[data-krl-field="task-text"]:not(:placeholder-shown):focus{background:#22202A !important;border-color:var(--primary) !important;color:#E5E7EB !important}
html.dark .field-input[readonly]:not(:placeholder-shown), html.dark textarea[readonly][data-krl-field="task-text"]:not(:placeholder-shown){background:#3A2F0A !important;border-color:#5A4818 !important;color:#FFE9A8 !important}
/* v13 — 자동 확장 textarea: 내용 모두 표시 (페이지 스크롤 허용) */
textarea[data-autogrow]{overflow:hidden !important;resize:none !important}
.krl-task-row > textarea[data-krl-field="task-text"]{overflow:hidden !important;resize:none !important;height:auto}
/* v12 — 발표 모드: 한 화면 + 사람별 전환 */
body.present .present-member-nav{display:flex;align-items:center;gap:8px;margin:10px 0 14px;padding:8px 12px;background:white;border:1px solid var(--line);border-radius:10px;overflow-x:auto;flex-wrap:wrap}
body.present .present-member-btn{display:inline-flex;align-items:center;gap:8px;padding:8px 14px;border-radius:8px;border:1px solid var(--line);background:white;cursor:pointer;font-size:13px;font-weight:700;color:var(--text);font-family:inherit;white-space:nowrap;flex-shrink:0;transition:all .15s}
body.present .present-member-btn:hover{background:#F4F4F5}
body.present .present-member-btn.active{background:var(--primary);color:white;border-color:var(--primary);box-shadow:0 2px 8px rgba(98,65,245,.25)}
body.present .present-member-btn .avatar{width:24px;height:24px;border-radius:50%;display:inline-flex;align-items:center;justify-content:center;color:white;font-size:11px;font-weight:800}
body.present .present-arrow{display:inline-flex;align-items:center;justify-content:center;width:36px;height:36px;border-radius:50%;background:white;border:1px solid var(--line);cursor:pointer;font-size:18px;color:var(--text);flex-shrink:0;transition:all .15s}
body.present .present-arrow:hover{background:var(--primary-soft);border-color:var(--primary);color:var(--primary)}
body.present .present-arrow:disabled{opacity:.3;cursor:not-allowed}
body.present .member-grid{display:block !important}
body.present .member-card{max-width:none;margin:0}
body.present .field-input{min-height:auto !important;max-height:none !important;overflow:hidden !important}
body.present .krl-task-row > textarea[data-krl-field="task-text"]{max-height:none !important;overflow:hidden !important}
body.present .objectives-pair-row{margin-top:8px !important}
body.present .card-section,body.present .objectives-pair-row,body.present .obj-card{margin-top:8px !important}
body.present footer.app-footer{display:none}
body.present .date-bar{margin-bottom:6px}
body.present main.view{padding-top:8px}
body.present .member-card .member-head{padding-bottom:8px;margin-bottom:6px}
html.dark body.present .present-member-nav{background:#1A1D27;border-color:#2A2D38}
html.dark body.present .present-member-btn{background:#1A1D27;color:#E5E7EB;border-color:#2A2D38}
html.dark body.present .present-arrow{background:#1A1D27;border-color:#2A2D38;color:#E5E7EB}
/* v11 — 읽기 전용 필드 시각 표시 (본인이 아닌 항목) */
textarea[readonly], input[readonly]{background:#F5F5F6 !important;color:var(--text-soft) !important;cursor:not-allowed;border-color:#EDEDEE !important}
textarea[readonly]:focus, input[readonly]:focus{outline:none;box-shadow:none}
button:disabled, select:disabled{opacity:.55;cursor:not-allowed !important;filter:grayscale(.3)}
.member-card.is-readonly{background:#FBFBFC}
.member-card.is-readonly .member-head::after{content:'읽기 전용';font-size:10px;padding:2px 7px;border-radius:999px;background:#F0F0F2;color:var(--text-soft);font-weight:700;margin-left:auto}
html.dark textarea[readonly], html.dark input[readonly]{background:#1B1E27 !important;color:#9CA3AF !important;border-color:#22252F !important}
html.dark .member-card.is-readonly{background:#15171F}
html.dark .member-card.is-readonly .member-head::after{background:#22252F;color:#9CA3AF}
/* v11 — 기록 남기기/할일 추가 입력란 크기 확대 */
.krl-task-row > textarea[data-krl-field="task-text"]{min-height:72px !important}
/* v18 — 그룹 헤더(KR/Initiative 선택기) 클릭 영역 확대 + 타격감 */
.krl-group-head.is-interactive{cursor:pointer;user-select:none;transition:transform .08s ease,box-shadow .12s ease,filter .12s ease}
.krl-group-head.is-interactive:hover{box-shadow:inset 0 0 0 999px rgba(0,0,0,.045)}
.krl-group-head.is-interactive:active{transform:translateY(1px);box-shadow:inset 0 0 0 999px rgba(0,0,0,.085)}
.krl-group-head.is-interactive:focus-within{box-shadow:inset 0 0 0 999px rgba(0,0,0,.045),0 0 0 2px rgba(98,65,245,.25)}
.krl-group-head .krl-group-caret{font-size:11px;font-weight:800;opacity:.85;line-height:1;flex-shrink:0;transition:transform .12s ease,opacity .12s ease}
.krl-group-head.is-interactive:hover .krl-group-caret{opacity:1}
.krl-group-head.is-interactive:active .krl-group-caret{transform:translateY(1px)}
/* v32 — 그룹 헤더(KR/Init)가 이미 상위 컨텍스트를 표시하므로 task 행의 상위 변경 chip 제거 */
/* v34 — 그룹 헤더 제목 인플레이스 편집 + 우측 ▾ 그룹 이동 (영역 분리) */
.krl-group-title-input{flex:1;min-width:0;border:1px solid transparent;background:transparent;color:inherit;font:inherit;font-weight:inherit;padding:2px 6px;border-radius:4px;outline:none;line-height:1.3;cursor:text;text-overflow:ellipsis;transition:background .12s,border-color .12s,box-shadow .12s}
.krl-group-title-input:hover:not([readonly]){background:rgba(255,255,255,.55)}
.krl-group-title-input:focus{background:white;border-color:rgba(98,65,245,.5);box-shadow:0 0 0 2px var(--primary-soft);color:var(--text);font-weight:700}
.krl-group-title-input[readonly]{cursor:default}
.krl-group-move-btn{position:relative;display:inline-flex;align-items:center;justify-content:center;width:22px;height:20px;cursor:pointer;border-radius:4px;flex-shrink:0;font-size:11px;opacity:.65;transition:opacity .12s,background .12s;user-select:none}
.krl-group-move-btn:hover{opacity:1;background:rgba(0,0,0,.07)}
.krl-group-move-btn select{position:absolute;inset:0;width:100%;height:100%;opacity:0;cursor:pointer;border:none;font-family:inherit;background:transparent;-webkit-appearance:none;appearance:none}
html.dark .krl-group-title-input:hover:not([readonly]){background:rgba(255,255,255,.08)}
html.dark .krl-group-title-input:focus{background:#1A1D27;color:#E5E7EB}
html.dark .krl-group-move-btn:hover{background:rgba(255,255,255,.10)}
/* v105 — 댓글 기능 제거 (관련 모든 CSS 삭제) */
.krl-task-container,.recent-task-container{position:relative}
/* v97 — 새 이니셔티브 빈 제목 입력 강조 */
@keyframes krl-pulse{0%,100%{box-shadow:0 0 0 0 rgba(229,179,64,.45)}50%{box-shadow:0 0 0 4px rgba(229,179,64,0)}}
/* v110 — KR 진척바: 클릭/드래그로 진척 입력 (일상 진척 갱신 UX) */
.progress-track,.kr-bar-track{cursor:pointer;touch-action:none;transition:box-shadow .12s}
.progress-track:hover,.kr-bar-track:hover{box-shadow:0 0 0 3px rgba(98,65,245,.14)}
.kr-bar-scrubbing{box-shadow:0 0 0 3px rgba(98,65,245,.28)!important}
.kr-num-input{transition:border-color .12s,box-shadow .12s,background-color .12s}
.kr-num-input:focus{border-color:var(--primary)!important;box-shadow:0 0 0 2px var(--primary-soft);background:#fff;outline:none}
/* v110 — 진척 % 저장 확인 펄스 */
@keyframes kr-saved-pop{0%{transform:scale(1)}40%{transform:scale(1.18)}100%{transform:scale(1)}}
.kr-pct.kr-saved,.kr-strip-pct.kr-saved{animation:kr-saved-pop .32s ease-out}
/* v110 — KR 진척 스텝 버튼 */
.kr-step{width:22px;height:24px;flex-shrink:0;border:1px solid var(--line);background:#fff;border-radius:6px;cursor:pointer;font-size:14px;font-weight:800;color:var(--primary);line-height:1;display:inline-flex;align-items:center;justify-content:center;font-family:inherit;padding:0;transition:background-color .1s,border-color .1s}
.kr-step:hover{background:var(--primary-soft);border-color:var(--primary)}
.kr-step:active{transform:scale(.92)}
/* v21 — WBS 막대 드래그 */
.wbs-bar{cursor:grab;user-select:none;touch-action:none;transition:box-shadow .12s,filter .12s;position:absolute}
.wbs-bar:hover{filter:brightness(1.05);box-shadow:0 2px 6px rgba(0,0,0,.18)!important}
.wbs-bar.dragging{cursor:grabbing;opacity:.88;box-shadow:0 6px 14px rgba(0,0,0,.28)!important;z-index:10;transition:none}
.wbs-bar.dragging.drag-resize-start,.wbs-bar.dragging.drag-resize-end{cursor:ew-resize}
/* v27 — 끝 가까이 hover 시 미세한 시각 힌트 */
.wbs-bar::before,.wbs-bar::after{content:'';position:absolute;top:2px;bottom:2px;width:3px;background:rgba(255,255,255,.0);border-radius:2px;pointer-events:none;transition:background .12s}
.wbs-bar::before{left:2px}
.wbs-bar::after{right:2px}
.wbs-bar:hover::before,.wbs-bar:hover::after{background:rgba(255,255,255,.45)}
.wbs-drag-tip{position:fixed;z-index:9999;background:#26215C;color:white;padding:6px 10px;border-radius:6px;font-size:11.5px;font-weight:700;pointer-events:none;box-shadow:0 4px 12px rgba(0,0,0,.3);white-space:nowrap;font-family:inherit;line-height:1.45}
/* v23 — 상단 날짜바의 담당자 아이콘 (클릭 점프) */
/* v40 — 아이콘은 한 줄에 고정. 좁아지면 가로 스크롤. 너비/높이 출렁이는 문제 차단 */
.date-bar-members{display:inline-flex;gap:5px;align-items:center;margin-left:6px;flex-wrap:nowrap;overflow-x:auto;overflow-y:hidden;scrollbar-width:none;max-width:100%;min-height:32px;flex-shrink:1;min-width:0}
.date-bar-members::-webkit-scrollbar{display:none}
.date-bar-member-icon{width:28px;height:28px;border-radius:50%;border:2px solid white;cursor:pointer;font-size:11.5px;font-weight:800;color:white;display:inline-flex;align-items:center;justify-content:center;font-family:inherit;box-shadow:0 1px 3px rgba(0,0,0,.12);transition:transform .12s,box-shadow .12s,filter .12s;flex-shrink:0;padding:0;line-height:1}
.date-bar-member-icon:hover{transform:translateY(-1px);box-shadow:0 3px 8px rgba(0,0,0,.22);filter:brightness(1.06)}
.date-bar-member-icon:active{transform:translateY(0)}
.date-bar-member-icon{position:relative}
@keyframes presenceSpin{to{transform:rotate(360deg)}}
.date-bar-member-icon.online::after{content:"";position:absolute;inset:-4px;border-radius:50%;background:conic-gradient(#30AB62,#B9F2D2 35%,#30AB62 60%,#E8FFF1 80%,#30AB62);-webkit-mask:radial-gradient(farthest-side,transparent calc(100% - 3px),#000 calc(100% - 2.5px));mask:radial-gradient(farthest-side,transparent calc(100% - 3px),#000 calc(100% - 2.5px));animation:presenceSpin 1.8s linear infinite;pointer-events:none}
.member-card.highlight-flash{animation:mcFlash 1.5s ease-out}
@keyframes mcFlash{0%{box-shadow:0 0 0 3px var(--primary),0 0 18px rgba(98,65,245,.4)}100%{box-shadow:0 0 0 0 transparent}}
/* v38 — WBS·기타 점프 시 강한 펄스 하이라이트 */
.jump-flash{animation:jumpFlash 1.8s ease-out;position:relative;z-index:1}
@keyframes jumpFlash{
  0%{box-shadow:0 0 0 3px var(--primary),0 0 24px rgba(98,65,245,.55);background-color:#FFF4B8 !important}
  35%{box-shadow:0 0 0 3px var(--primary),0 0 18px rgba(98,65,245,.35);background-color:#FFF8CC !important}
  100%{box-shadow:0 0 0 0 transparent;background-color:transparent}
}
/* v25 — 상단 날짜바(담당자 아이콘 포함) 스크롤 중에도 헤더 아래에 고정 (v29 — 헤더 높이 동적 측정) */
.date-bar{position:sticky;top:var(--app-header-h,64px);z-index:15;background:rgba(250,250,250,0.94);backdrop-filter:blur(10px);-webkit-backdrop-filter:blur(10px);padding:8px 8px;border-bottom:1px solid var(--line);border-radius:8px 8px 0 0;flex-wrap:nowrap !important;min-height:50px;overflow-x:auto;overflow-y:hidden;scrollbar-width:none}
.date-bar::-webkit-scrollbar{display:none}
html.dark .date-bar{background:rgba(15,17,23,0.94);border-bottom-color:#22252F}
@media(max-width:760px){.date-bar{padding:6px 4px;min-height:46px}}
/* v24 — 팀원 간 1:1 메시지 채팅 (우측 하단 플로팅) */
.chat-launcher{position:fixed;right:20px;bottom:20px;z-index:9000;width:52px;height:52px;border-radius:50%;background:var(--primary);color:white;border:none;cursor:pointer;font-size:22px;box-shadow:0 4px 14px rgba(98,65,245,.4);display:flex;align-items:center;justify-content:center;transition:transform .15s,box-shadow .15s;line-height:1;font-family:inherit}
.chat-launcher:hover{transform:translateY(-2px);box-shadow:0 6px 20px rgba(98,65,245,.55)}
.chat-launcher.has-unread{animation:chatPulse 2s infinite}
@keyframes chatPulse{0%,100%{box-shadow:0 4px 14px rgba(98,65,245,.4)}50%{box-shadow:0 4px 14px rgba(98,65,245,.4),0 0 0 9px rgba(98,65,245,.15)}}
.chat-launcher-badge{position:absolute;top:-2px;right:-2px;background:#E5484D;color:white;font-size:10.5px;font-weight:800;padding:1px 6px;border-radius:999px;min-width:18px;text-align:center;line-height:1.4;border:2px solid white}
.chat-panel{position:fixed;right:20px;bottom:84px;z-index:9001;width:340px;max-width:calc(100vw - 40px);height:520px;max-height:calc(100vh - 120px);background:white;border:1px solid var(--line);border-radius:14px;box-shadow:0 14px 40px rgba(0,0,0,.2);display:flex;flex-direction:column;overflow:hidden;font-family:inherit}
.chat-panel[hidden]{display:none}
.chat-panel-head{padding:11px 14px;background:var(--primary);color:white;font-weight:700;font-size:13px;display:flex;align-items:center;gap:8px;flex-shrink:0}
.chat-close,.chat-back{background:transparent;border:none;color:white;cursor:pointer;font-size:13px;padding:4px 8px;border-radius:5px;font-family:inherit;line-height:1}
.chat-close{margin-left:auto}
.chat-close:hover,.chat-back:hover{background:rgba(255,255,255,.18)}
.chat-back{font-size:17px;padding:2px 8px}
.chat-head-name{font-weight:700;font-size:13px}
.chat-head-avatar{width:26px;height:26px;font-size:11px;border:1.5px solid white}
.chat-head-badge{background:rgba(255,255,255,.25);font-size:11px;padding:1px 7px;border-radius:999px;font-weight:800;margin-left:4px}
.chat-panel-body{flex:1;overflow-y:auto;background:#FAFAFB}
.chat-empty{padding:30px 18px;text-align:center;color:var(--text-soft);font-size:12.5px;line-height:1.7}
.chat-list-body{padding:6px 0}
.chat-list-item{width:100%;display:flex;align-items:center;gap:10px;padding:10px 14px;background:transparent;border:none;cursor:pointer;text-align:left;border-bottom:1px solid #F0F0F2;font-family:inherit}
.chat-list-item:hover{background:#F4F4F5}
.chat-list-item.has-unread{background:#FFFBEF}
.chat-list-item.has-unread:hover{background:#FFF6D9}
.chat-avatar{width:36px;height:36px;border-radius:50%;display:inline-flex;align-items:center;justify-content:center;color:white;font-weight:800;font-size:13.5px;flex-shrink:0;line-height:1}
.chat-list-meta{flex:1;min-width:0;display:flex;flex-direction:column;gap:2px}
.chat-list-name{font-size:13px;font-weight:700;color:var(--text);display:inline-flex;align-items:center;gap:5px}
.chat-list-unread{background:#E5484D;color:white;font-size:10px;padding:1px 6px;border-radius:999px;font-weight:800}
.chat-list-preview{font-size:11.5px;color:var(--text-soft);white-space:nowrap;overflow:hidden;text-overflow:ellipsis;line-height:1.4}
.chat-list-time{font-size:10.5px;color:var(--text-soft);flex-shrink:0}
.chat-conv-body{padding:12px 14px;display:flex;flex-direction:column;gap:6px}
.chat-date-sep{text-align:center;font-size:10.5px;color:var(--text-soft);padding:8px 0 4px;font-weight:600}
.chat-msg{max-width:78%;padding:7px 11px;border-radius:14px;font-size:13px;line-height:1.45;display:inline-flex;flex-direction:column;gap:1px;word-break:break-word;white-space:pre-wrap}
.chat-msg.mine{align-self:flex-end;background:var(--primary);color:white;border-bottom-right-radius:4px}
.chat-msg.theirs{align-self:flex-start;background:white;color:var(--text);border:1px solid var(--line);border-bottom-left-radius:4px}
.chat-msg-time{font-size:9.5px;opacity:.65;text-align:right;margin-top:2px}
.chat-msg.theirs .chat-msg-time{text-align:left}
.chat-input-wrap{display:flex;gap:5px;padding:10px 12px;background:white;border-top:1px solid var(--line);flex-shrink:0;align-items:flex-end}
.chat-input{flex:1;min-width:0;border:1px solid var(--line);border-radius:16px;padding:8px 12px;font-size:13px;line-height:1.4;resize:none;outline:none;font-family:inherit;background:#FAFAFB;max-height:120px}
.chat-input:focus{border-color:var(--primary);background:white;box-shadow:0 0 0 2px var(--primary-soft)}
.chat-send{background:var(--primary);color:white;border:none;border-radius:16px;padding:8px 14px;font-weight:700;font-size:12px;cursor:pointer;font-family:inherit;flex-shrink:0;line-height:1.3}
.chat-send:hover{filter:brightness(1.08)}
.chat-msg-sender{font-size:10px;font-weight:700;color:var(--text-soft);margin:0 0 1px 2px}
.chat-mini{background:#EEEAFE;color:var(--primary);border:none;border-radius:999px;padding:3px 10px;font-size:11px;font-weight:700;cursor:pointer;font-family:inherit;flex-shrink:0}
.chat-form{padding:14px;display:flex;flex-direction:column;gap:8px;overflow-y:auto}
.chat-form input[type=text]{border:1px solid var(--line);border-radius:8px;padding:8px 10px;font-size:13px;font-family:inherit;outline:none}
.chat-check-row{display:flex;align-items:center;gap:8px;padding:7px 8px;border:1px solid var(--line);border-radius:8px;cursor:pointer;font-size:13px;font-family:inherit;background:white}
.chat-check-row input{accent-color:#6241F5}
.chat-form-btn{background:var(--primary);color:white;border:none;border-radius:8px;padding:9px;font-weight:700;font-size:13px;cursor:pointer;font-family:inherit}
.chat-room-avatar{background:#30AB62}
.chat-win{right:auto;bottom:auto}
.chat-win-head{cursor:move;user-select:none}
.chat-resize-br{position:absolute;right:0;bottom:0;width:20px;height:20px;cursor:nwse-resize;z-index:5;border-right:3px solid var(--line);border-bottom:3px solid var(--line);border-bottom-right-radius:14px}
.chat-resize-br:hover{border-color:var(--primary)}
.chat-row{display:flex;gap:6px;margin-top:7px;align-items:flex-end}
.chat-row.grp{margin-top:2px}
.chat-row.mine{justify-content:flex-end}
.chat-row .chat-col{display:flex;flex-direction:column;max-width:80%;min-width:0}
.chat-row.mine .chat-col{align-items:flex-end}
.chat-line2{display:flex;align-items:flex-end;gap:5px;max-width:100%}
.chat-bubble{padding:7px 11px;border-radius:15px;font-size:13px;line-height:1.45;word-break:break-word;white-space:pre-wrap;min-width:0}
.chat-row.mine .chat-bubble{background:var(--primary);color:#fff;border-bottom-right-radius:5px}
.chat-row.theirs .chat-bubble{background:white;color:var(--text);border:1px solid var(--line);border-bottom-left-radius:5px}
.chat-msg-av{width:24px;height:24px;font-size:10px;flex-shrink:0;align-self:flex-start;margin-top:1px}
.chat-av-sp{width:24px;flex-shrink:0}
.chat-meta{font-size:9.5px;color:var(--text-soft);flex-shrink:0;line-height:1.3;display:flex;flex-direction:column;align-items:flex-end;white-space:nowrap}
.chat-row.theirs .chat-meta{align-items:flex-start}
.chat-read{font-style:normal;color:var(--primary);font-weight:800;font-size:9px}
html.dark .chat-row.theirs .chat-bubble{background:#1A1D27;border-color:#2A2D38;color:#E6E8EE}
@keyframes chatShake{0%,100%{transform:translateX(0)}15%{transform:translateX(-9px)}30%{transform:translateX(8px)}45%{transform:translateX(-6px)}60%{transform:translateX(4px)}75%{transform:translateX(-2px)}}
.chat-panel.chat-shake{animation:chatShake .55s}
.chat-resize{position:absolute;left:0;top:0;width:20px;height:20px;cursor:nwse-resize;z-index:5;border-left:3px solid var(--line);border-top:3px solid var(--line);border-top-left-radius:14px}
.chat-resize:hover{border-color:var(--primary)}
.chat-zoom{background:none;border:none;cursor:pointer;font-size:15px;color:var(--text-soft);padding:2px 6px;font-family:inherit;flex-shrink:0;line-height:1}
.chat-zoom:hover{color:var(--primary)}
@media(max-width:480px){
  .chat-panel{right:10px;left:10px;width:auto;bottom:80px;height:70vh}
}
html.dark .chat-panel{background:#15171F;border-color:#22252F}
html.dark .chat-panel-body{background:#0F1117}
html.dark .chat-list-item{border-bottom-color:#1F222B}
html.dark .chat-list-item:hover{background:#1A1D27}
html.dark .chat-list-item.has-unread{background:#2A2410}
html.dark .chat-msg.theirs{background:#1A1D27;color:#D1D5DB;border-color:#22252F}
html.dark .chat-input-wrap{background:#15171F;border-top-color:#22252F}
html.dark .chat-input{background:#1A1D27;color:#D1D5DB;border-color:#22252F}
/* v43 — Initiative 행 1줄 통합 (이전 2행 구조 폐기). 컴팩트 + 좁아지면 가로 스크롤 */
.init-row{display:block !important;padding:0 !important;flex-direction:row !important;align-items:stretch !important}
.init-row-main{display:flex;align-items:center;gap:5px;padding:8px 22px;flex-wrap:nowrap;overflow-x:auto;overflow-y:hidden;scrollbar-width:none;min-width:0}
.init-row-main::-webkit-scrollbar{display:none}
.init-row-main .init-title-input{flex:1 1 auto;min-width:140px;width:auto;font-size:13.5px;padding:5px 8px;border-radius:6px;background:transparent;border:1px solid transparent;transition:background .12s,border-color .12s,box-shadow .12s}
.init-row-main .init-title-input:hover:not([readonly]){background:#F4F4F5}
.init-row-main .init-title-input:focus{background:white;border-color:var(--primary);box-shadow:0 0 0 2px var(--primary-soft);outline:none}
.init-row-main .init-status{flex-shrink:0;font-size:10.5px;padding:3px 7px}
.init-row-main .kr-owner-select{flex-shrink:0;font-size:10.5px;padding:3px 7px;max-width:96px}
.init-row-main .conf-chip{flex-shrink:0;font-size:10px;padding:2px 7px}
.init-row-main .reality-toggle{flex-shrink:0;font-size:10.5px;padding:3px 6px}
.init-row-main .btn-icon{flex-shrink:0;padding:3px 5px}
.init-row-main .drag-handle{flex-shrink:0}
.init-row-main .rt-check{flex-shrink:0}
.init-meta-date{flex-shrink:0;display:inline-flex;align-items:center;gap:3px;font-size:10px;color:var(--text-soft);padding:2px 6px;border-radius:5px;background:#FAFAFA;border:1px solid var(--line);font-weight:600;letter-spacing:.1px;height:24px;line-height:1}
.init-meta-date:hover{border-color:var(--primary);color:var(--primary)}
.init-meta-date input[type="date"]{border:none;background:transparent;padding:0;font-size:10.5px;color:var(--text);outline:none;width:88px;font-family:inherit;font-weight:600}
.init-meta-date.overdue{border-color:#F5C2C5;background:var(--warning-soft);color:var(--warning)}
.init-meta-date.overdue input[type="date"]{color:var(--warning)}
.init-meta-chip{flex-shrink:0;font-size:10.5px;padding:3px 8px;border-radius:5px;background:transparent;color:var(--text-soft);border:1px solid var(--line);cursor:pointer;font-family:inherit;font-weight:600;line-height:1.3}
.init-meta-chip:hover{border-color:var(--primary);color:var(--primary)}
.init-meta-chip.active{background:var(--primary-soft);color:var(--primary);border-color:#D9CFFB}
/* v46 — 할일 추가 작은 + 버튼 (init-row 안에 통합) */
.init-meta-add{flex-shrink:0;display:inline-flex;align-items:center;justify-content:center;width:22px;height:22px;border-radius:5px;background:var(--primary-soft);color:var(--primary);border:1px solid #D9CFFB;cursor:pointer;font-family:inherit;padding:0;margin-left:-2px;line-height:1}
.init-meta-add:hover{background:var(--primary);color:white;border-color:var(--primary)}
/* v43 — Init을 다른 Init의 sub-list에 떨어뜨리는 drop-zone 시각 (보조 경로: 펼쳐진 sub-list) */
.init-sub-list.drop-target-into{background:var(--primary-soft) !important;border-left-color:var(--primary) !important;outline:2px dashed var(--primary);outline-offset:-2px;transition:background .12s,outline .12s}
/* v44 — Init 행 가운데에 떨어뜨리면 nest (해당 Init의 할일로 demote) */
[draggable="true"].drop-target-nest{background:var(--primary-soft) !important;outline:2px dashed var(--primary);outline-offset:-3px;border-radius:8px;position:relative}
[draggable="true"].drop-target-nest::before,[draggable="true"].drop-target-nest::after{display:none}
/* v47 — 드롭 전 라이브 프리뷰: source 자체를 숨기고 target sub-list에 실제 task 형태로 표시 */
/* v50 — source는 가볍게 페이드만 (공간 유지) */
.drag-source-hidden{opacity:.22 !important;filter:saturate(.3);pointer-events:none;transition:opacity .12s,filter .12s}
.nest-preview-wrap{margin:6px 0 4px 28px !important;padding:6px 8px !important;background:rgba(98,65,245,.08) !important;border-left:3px solid var(--primary) !important;border-radius:0 8px 8px 0}
/* v50 — preview row: 확정 후 모습을 그대로 흐릿하게. 별도 배지·테두리 없이 fade만. */
.nest-preview-row{animation:nestPreviewIn .2s ease-out;opacity:.55;filter:saturate(.7);position:relative}
.nest-preview-row::before{content:'';position:absolute;left:-3px;top:2px;bottom:2px;width:3px;background:var(--primary);border-radius:2px;opacity:.6}
@keyframes nestPreviewIn{from{opacity:0;transform:translateY(-6px) scale(.97)}to{opacity:1;transform:translateY(0) scale(1)}}
/* v47 — sub-task 행: init-row-main과 동일 레이아웃, 축소판 */
.init-sub-row{display:block;border-bottom:1px dashed rgba(0,0,0,.04);position:relative}
.init-sub-row+.init-sub-row{margin-top:1px}
.init-sub-row .init-row-main{padding:6px 14px 6px 36px;gap:4px}
.init-sub-row .init-title-input{font-size:12.5px;padding:4px 7px;min-width:120px}
.init-sub-row .init-status{font-size:10px;padding:2px 6px}
.init-sub-row .kr-owner-select{font-size:10px;padding:2px 6px;max-width:84px}
.init-sub-row .init-meta-date{font-size:9.5px;padding:2px 5px;height:22px}
.init-sub-row .init-meta-date input[type="date"]{width:80px;font-size:10px}
.init-sub-row .btn-icon{padding:2px 4px}
.init-sub-row .drag-handle{font-size:9px}
.init-sub-row .rt-check{width:16px;height:16px;border-width:1.5px}
.init-sub-list{width:auto !important;margin:6px 0 4px 28px !important;padding:6px 8px !important;background:rgba(98,65,245,.04);border-left:3px solid var(--primary-soft);border-radius:0 8px 8px 0}
@media(max-width:760px){
  .init-row{padding:10px 12px !important}
  .init-row-meta{padding-left:0;gap:5px}
  .init-meta-date input[type="date"]{width:100px}
  .init-sub-row{flex-wrap:wrap;gap:5px}
  .init-sub-row .init-sub-title{flex:1 1 100%;order:1}
  .init-sub-list{margin-left:14px !important;padding:8px 10px !important}
}
html.dark .init-meta-date,html.dark .init-meta-chip,html.dark .init-sub-row .init-sub-meta{background:#222631;border-color:#2A2D38;color:#9CA3AF}
html.dark .init-meta-date input[type="date"]{color:#E5E7EB}
html.dark .init-sub-row .init-sub-title{background:#1A1D27;color:#E5E7EB;border-color:#2A2D38}
html.dark .init-sub-list{background:rgba(98,65,245,.10);border-left-color:var(--primary)}
html.dark .init-row-line1 .init-title-input:hover:not([readonly]){background:#222631}
html.dark .init-row-line1 .init-title-input:focus{background:#1A1D27}
/* ============================================================
   v53 — 메인 화면 시각 위계 정돈
   ① 최상단 브랜드(팀명+OKR) 가장 크게
   ② date-bar 스크롤 시 출렁임 완전 차단 (main top-padding 상쇄)
   ③ Objective 가슴 설레는 반짝임 + 글자 위계 (O > KR > Init > 할일)
   ============================================================ */
/* ① 브랜드 가장 크게 */
.brand-title{font-size:26px !important;font-weight:900 !important;letter-spacing:-0.7px;line-height:1.15;display:flex;align-items:center;gap:8px}
.brand-sub{font-size:13px !important;font-weight:600 !important;color:var(--text-soft);margin-top:2px}
.brand-mark{width:50px !important;height:50px !important;font-size:21px !important;border-radius:14px !important}
.brand-meta{gap:2px}
.team-switch{font-size:11px;padding:2px 8px;font-weight:600}
@media(max-width:760px){
  .brand-title{font-size:19px !important}
  .brand-mark{width:38px !important;height:38px !important;font-size:16px !important;border-radius:11px !important}
  .brand-sub{font-size:11.5px !important}
}
/* ② date-bar 안 움직이게 — main top padding 상쇄 (-padding-top) */
.date-bar{margin-top:-28px !important}
body.present .date-bar{margin-top:-20px !important}
@media(max-width:760px){.date-bar{margin-top:-14px !important}}
/* ③ Objective 강조 — v55: 깊은 보라 그라데이션 + 흐르는 sheen + 숨쉬는 글로우 */
.obj-title-input,.obj-shimmer{
  background:linear-gradient(
    100deg,
    #4D2BE0 0%,
    #6241F5 32%,
    #8B6FF7 45%,
    #EBE0FF 50%,
    #8B6FF7 55%,
    #6241F5 68%,
    #4D2BE0 100%
  );
  background-size:240% 100%;
  -webkit-background-clip:text;background-clip:text;
  -webkit-text-fill-color:transparent;
  animation:objShine 5.5s linear infinite,objBreathe 3.4s ease-in-out infinite;
  position:relative;
}
@keyframes objShine{0%{background-position:100% 50%}100%{background-position:-40% 50%}}
@keyframes objBreathe{
  0%,100%{filter:drop-shadow(0 0 0 rgba(98,65,245,0))}
  50%{filter:drop-shadow(0 0 10px rgba(98,65,245,.32))}
}
.obj-title-input{
  font-size:30px !important;font-weight:900 !important;letter-spacing:-0.9px !important;
  line-height:1.2 !important;padding:6px 2px !important;
}
.obj-title-input::placeholder{
  -webkit-text-fill-color:var(--text-soft);color:var(--text-soft);
  background:none;font-weight:600;letter-spacing:0;font-size:20px !important
}
.obj-title-input:focus{
  -webkit-text-fill-color:var(--text);
  animation:none;background:rgba(255,255,255,.6);border-radius:4px;filter:none;
}
.obj-shimmer{font-weight:800 !important;letter-spacing:-0.2px}
body.present .obj-title-input{font-size:36px !important}
@media(max-width:760px){.obj-title-input{font-size:22px !important}}
/* v55 — 사람 아이콘 클릭 시 sticky 헤더에 가리지 않도록 스크롤 여백 */
.member-card{scroll-margin-top:130px}
[data-obj-id],.kr-row,.init-row{scroll-margin-top:130px}
/* v58 — OKR 탭 KR 행도 단일 라인 (진척바 인라인). 좁아지면 가로 스크롤 */
.kr-row-line{flex-wrap:nowrap !important;overflow-x:auto;overflow-y:hidden;scrollbar-width:none}
.kr-row-line::-webkit-scrollbar{display:none}
.kr-row-line .kr-title-input{flex:1 1 auto;min-width:140px;overflow:hidden;text-overflow:ellipsis}
.kr-row-line .kr-num-input{flex-shrink:0}
.kr-row-line .kr-pct{flex-shrink:0;min-width:38px;text-align:right}
.kr-row-line .conf-chip,.kr-row-line .kr-menu-btn,.kr-row-line .btn-icon{flex-shrink:0}
/* v62 — WBS 라벨 제목 2줄까지 wrap (잘림 X) */
.wbs-title-clamp{flex:1;min-width:0;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;line-clamp:2;overflow:hidden;line-height:1.35;word-break:break-word}
.wbs-label-row.wbs-O-row{font-weight:800}
/* v60 — 루틴을 담당자별 열로 정렬 (1순위 멤버 좌 → 오른쪽) */
.rt-by-member-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(240px,1fr));gap:12px;margin-top:8px}
.rt-member-col{display:flex;flex-direction:column;gap:8px;min-width:0}
.rt-member-head{display:flex;align-items:center;gap:8px;padding:8px 12px;background:linear-gradient(135deg,#F4F0FE,#FAFAFB);border:1px solid var(--primary-soft);border-radius:8px;font-weight:700;font-size:13px;position:sticky;top:0}
.rt-member-avatar{display:inline-flex;align-items:center;justify-content:center;width:24px;height:24px;border-radius:50%;color:white;font-size:11.5px;font-weight:800;flex-shrink:0}
.rt-member-name{flex:1;min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.rt-member-count{flex-shrink:0;font-size:10.5px;color:var(--text-soft);font-weight:700;background:white;border:1px solid var(--line);padding:1px 7px;border-radius:999px}
.rt-item-col{flex-direction:column !important;align-items:stretch !important;gap:4px;padding:10px 12px;background:white;border:1px solid var(--line);border-radius:10px;transition:border-color .12s}
.rt-item-col:hover{border-color:var(--primary-soft)}
.rt-item-col.done{background:#F8FCF9;border-color:#CCEEDB}
.rt-item-col .rt-note-input{font-size:12px;padding:5px 9px}
html.dark .rt-member-head{background:linear-gradient(135deg,#2A2245,#191B23);border-color:#3A2F5A}
html.dark .rt-item-col{background:#1A1D27;border-color:#2A2D38}
html.dark .rt-item-col.done{background:#1A2A22;border-color:#2A4034}
html.dark .rt-member-count{background:#222631;border-color:#2A2D38}
/* v56/v57 — Objective 1개 솔로 모드: O 기준 KR 들여쓰기 + 이니셔티브 더 깊은 들여쓰기 */
.obj-solo{padding:24px 26px !important}
.obj-solo .kr-inline-row{
  padding:14px 0 14px 28px;
  position:relative;
  border-bottom:1px solid #F4F4F5;
}
.obj-solo .kr-inline-row::before{
  content:'';position:absolute;left:8px;top:0;bottom:0;width:3px;
  background:linear-gradient(to bottom,var(--primary-soft),transparent);
  border-radius:2px;
}
.obj-solo .kr-inline-title{font-size:16.5px !important;font-weight:700 !important;letter-spacing:-0.2px;line-height:1.6}
.obj-solo .kr-inline-row .kr-strip-pct{font-size:15px !important}
.obj-solo .kr-inline-row .kr-num-input{font-size:14px !important;width:64px !important;padding:5px 8px !important}
/* 이니셔티브는 KR 안에 더 들여쓰기 */
.obj-solo .kr-init-inline{margin:8px 0 4px 14px !important;padding:6px 12px !important}
@media(max-width:760px){
  .obj-solo{padding:18px 14px !important}
  .obj-solo .obj-shimmer{font-size:22px !important}
  .obj-solo .kr-inline-row{padding-left:18px}
  .obj-solo .kr-init-inline{margin-left:8px !important}
}
html.dark .obj-solo .kr-inline-row::before{background:linear-gradient(to bottom,#3A2F5A,transparent)}
/* KR 두 번째로 큰 */
.kr-title-input{font-size:17px !important;font-weight:700 !important;letter-spacing:-0.2px !important;padding:6px 4px !important}
body.present .kr-title-input{font-size:20px !important}
/* Initiative 중간 */
.init-row-main .init-title-input{font-size:14px !important;font-weight:500 !important}
/* 할일 가장 작게 (이미 12.5px이지만 명시) */
.init-sub-row .init-title-input{font-size:12.5px !important;font-weight:400 !important}
/* obj-desc 부제 — 위계 보조 */
.obj-desc-input{font-size:13px !important;font-style:italic;color:var(--text-soft);opacity:.85}
/* 다크모드: 라벤더 깊이 + 옅은 흰빛 sheen + 보라 글로우 */
html.dark .obj-title-input,html.dark .obj-shimmer{
  background:linear-gradient(
    100deg,
    #8770EE 0%,
    #A89BF5 32%,
    #C4B5FD 45%,
    #FAF5FF 50%,
    #C4B5FD 55%,
    #A89BF5 68%,
    #8770EE 100%
  );
  background-size:240% 100%;
  -webkit-background-clip:text;background-clip:text;
  -webkit-text-fill-color:transparent;
}
html.dark .obj-title-input:focus,html.dark .obj-shimmer:focus{-webkit-text-fill-color:#E5E7EB;background:rgba(26,29,39,.5);filter:none}
`;document.head.appendChild(s);
// 다크 모드 즉시 적용 (FOUC 방지)
document.documentElement.classList.toggle('dark',localStorage.getItem('team-okr-dark')==='1');
})();
let saveStatus={pending:0,error:false};
// Echo 방지 — 본인이 보낸 변경의 realtime 이벤트는 일시적으로 무시
const localChanges=new Map();
function markLocal(table,id){if(!id)return;const k=`${table}:${id}`;localChanges.set(k,Date.now());setTimeout(()=>{const t=localChanges.get(k);if(t&&Date.now()-t>=1400)localChanges.delete(k);},1500);}
function isLocal(table,id){if(!id)return false;return localChanges.has(`${table}:${id}`);}
function markSaveStart(){saveStatus.pending++;saveStatus.error=false;updateSaveIndicator();}
function markSaveEnd(err){saveStatus.pending=Math.max(0,saveStatus.pending-1);if(err)saveStatus.error=true;updateSaveIndicator();}
function updateSaveIndicator(){let el=document.getElementById('save-indicator');if(!el){el=document.createElement('div');el.id='save-indicator';el.className='save-indicator';document.body.appendChild(el);}if(saveStatus.pending>0){el.className='save-indicator saving';el.textContent='저장 중…';}else if(saveStatus.error){el.className='save-indicator error';el.textContent='⚠ 저장 실패';}else{el.className='save-indicator';el.textContent='✓ 모두 저장됨';}}
const SUPABASE_URL_HARDCODED='https://fmudqapruoppzlfhoxde.supabase.co';
const SUPABASE_ANON_HARDCODED='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZtdWRxYXBydW9wcHpsZmhveGRlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzgwNzk2NTEsImV4cCI6MjA5MzY1NTY1MX0.NLQdccHlwahIy69opYzUkPSXKGCOZIQAr5ehctCWbw0';
const CONFIG_KEY='team-okr-supabase-config';
const TEAM_KEY='team-okr-current-team';
const C={primary:'#6241F5',growth:'#30AB62',warning:'#E5484D',amber:'#F59E0B',textSoft:'#737373'};
const PALETTE=['#6241F5','#30AB62','#F59E0B','#EC4899','#0EA5E9','#8B5CF6','#14B8A6','#F97316'];
const CONF_LABELS={high:'자신있어요',mid:'해볼만합니다',low:'쉽지 않아요'};
const STATUS_LABELS={todo:'할 일',doing:'진행',done:'완료',blocked:'막힘'};
let sb=null;
let state={teams:[],currentTeamId:null,members:[],objectives:[],standups:{},routines:[],routineLogs:{},reviews:[],initiativeDailyLogs:{},initiativeTasks:{},selfId:null};
function getSelfId(){return localStorage.getItem(SELF_KEY)||null;}
function setSelfId(id){if(id==='__observer__'){localStorage.setItem(SELF_KEY,id);}else if(id){localStorage.setItem(SELF_KEY,id);}else{localStorage.removeItem(SELF_KEY);}state.selfId=id;}
function selfMember(){if(!state.selfId||state.selfId==='__observer__')return null;return state.members.find(m=>m.id===state.selfId)||null;}
function isObserver(){return state.selfId==='__observer__';}
// v11 — 본인만 본인이 작성한 것 수정 가능
// v111 — 권한은 selfId(인증) 기준. members 배열 로딩/실시간 교체 타이밍과 무관하게 본인 카드는 항상 편집 가능.
function canEditAs(memberId){
  if(!memberId)return false;
  if(!state.selfId||state.selfId==='__observer__')return false; // 옵저버/미인증 불가
  if(state.selfId===memberId)return true;                       // 본인 카드는 무조건 가능
  const s=selfMember();return !!(s&&s.isAdmin);                 // 타인 카드는 관리자만
}
// v16 — 세션 추적 (로그인 시작·하트비트)
let _currentSessionId=null,_heartbeatTimer=null;
async function startMemberSession(){
  const me=selfMember();if(!me||me.isObserver)return; // 옵저버는 세션 기록 안 함
  // v42 — 클라이언트 ID 사용. select().single() 의존 제거로 RLS SELECT 권한 없어도 heartbeat 작동
  const sessionId=(crypto&&crypto.randomUUID)?crypto.randomUUID():uid();
  try{
    const{error}=await sb.from('member_sessions').insert({
      id:sessionId,team_id:state.currentTeamId,member_id:me.id,member_name:me.name,
      login_at:new Date().toISOString(),last_active_at:new Date().toISOString(),
      user_agent:(navigator.userAgent||'').slice(0,200)
    });
    if(error){console.warn('[session] insert error',error.message||error);}
    _currentSessionId=sessionId;
    startHeartbeat();
  }catch(e){console.warn('[session] start fail',e);_currentSessionId=sessionId;startHeartbeat();}
}
function startHeartbeat(){
  if(_heartbeatTimer)clearInterval(_heartbeatTimer);
  _heartbeatTimer=setInterval(async()=>{
    if(!_currentSessionId)return;
    if(typeof isObserverMode==='function'&&isObserverMode())return;
    try{await sb.from('member_sessions').update({last_active_at:new Date().toISOString()}).eq('id',_currentSessionId);}catch(e){}
  },60000);
}
function endMemberSession(){if(_heartbeatTimer){clearInterval(_heartbeatTimer);_heartbeatTimer=null;}_currentSessionId=null;}
window.addEventListener('beforeunload',()=>{
  if(_currentSessionId&&typeof isObserverMode==='function'&&!isObserverMode()){
    try{navigator.sendBeacon&&navigator.sendBeacon(window.location.href);}catch(e){}
    // sb.update는 동기 종료 시 보장 어려움 — 마지막 heartbeat 시각만 신뢰
  }
});
// v15·v16 — 권한 모델
function isAdmin(){const s=selfMember();return !!(s&&s.isAdmin);}
function selfIsObserver(){const s=selfMember();return !!(s&&s.isObserver);}
// v16 — 옵저버 1시간 자동 로그아웃 감시 (30초 간격)
let _observerLogoutWatcher=null;
function startObserverLogoutWatcher(){
  if(_observerLogoutWatcher)return;
  _observerLogoutWatcher=setInterval(()=>{
    if(!state.selfId||state.selfId==='__observer__')return;
    const m=state.members.find(x=>x.id===state.selfId);
    if(!m||!m.isObserver)return;
    // 1시간 만료 검사
    if(!isPinAuthValid(state.selfId)){
      // 강제 로그아웃
      clearInterval(_observerLogoutWatcher);_observerLogoutWatcher=null;
      try{
        const o=JSON.parse(localStorage.getItem(PIN_AUTH_KEY)||'{}');delete o[state.selfId];
        localStorage.setItem(PIN_AUTH_KEY,JSON.stringify(o));
      }catch(e){}
      state.selfId=null;
      try{localStorage.removeItem(SELF_KEY);}catch(e){}
      showToast('옵저버 세션 1시간 만료 — 자동 로그아웃되었습니다');
      render();
    }
  },30000);
}
// v81 — 모든 팀원이 OKR 수정 가능 (옵저버는 DB 저장 우회되어 자동으로 view-only)
// v111 — 인증된 일반 멤버(비옵저버)면 편집 가능 (members 로딩 타이밍 의존 제거)
function canEditOKR(){return !!state.selfId&&state.selfId!=='__observer__';}
// v16 — Initiative 다중 담당자 + 팀 전원 지원
function getInitOwnerIds(init){
  if(!init)return[];
  const oid=init.ownerId||'';
  if(!oid)return[];
  if(oid==='__team_all__')return state.members.filter(m=>!m.isObserver).map(m=>m.id);
  return oid.split(',').map(s=>s.trim()).filter(Boolean);
}
function isInitTeamAll(init){return !!(init&&init.ownerId==='__team_all__');}
function initOwnersDisplay(init){
  if(!init||!init.ownerId)return{text:'담당 미지정',color:'var(--text-soft)',isTeamAll:false};
  if(init.ownerId==='__team_all__')return{text:'👥 팀 전원',color:'var(--primary)',isTeamAll:true};
  const ids=getInitOwnerIds(init);
  const names=ids.map(id=>state.members.find(x=>x.id===id)?.name).filter(Boolean);
  if(names.length===0)return{text:'담당 미지정',color:'var(--text-soft)',isTeamAll:false};
  if(names.length===1)return{text:names[0],color:'var(--text)',isTeamAll:false};
  if(names.length===2)return{text:names.join(', '),color:'var(--text)',isTeamAll:false};
  return{text:names[0]+' +'+(names.length-1)+'명',color:'var(--text)',isTeamAll:false};
}
// v81 — 모든 팀원이 Initiative 수정 가능
function canEditInit(init){
  return !!state.selfId&&state.selfId!=='__observer__'; // v111 — 인증 멤버면 가능
}
// 옵저버는 모든 DB 쓰기 우회 — 화면에서만 동작
function isObserverMode(){return selfIsObserver();}
function roAttr(memberId){return canEditAs(memberId)?'':'readonly';}
function disAttr(memberId){return canEditAs(memberId)?'':'disabled';}
function lockTip(memberId){return canEditAs(memberId)?'':' title="본인이 작성한 항목만 수정할 수 있습니다"';}
// 도움 요청 알림 — 캐시
let helpRequestsCache={count:null,items:null,lastFetch:0};
async function fetchHelpRequests(){
  if(!state.selfId||state.selfId==='__observer__')return [];
  const now=Date.now();if(helpRequestsCache.items&&now-helpRequestsCache.lastFetch<30000)return helpRequestsCache.items;
  const{data}=await sb.from('standup_entries').select('*').eq('team_id',state.currentTeamId).eq('helper_member_id',state.selfId).order('date',{ascending:false}).limit(50);
  helpRequestsCache.items=data||[];
  // 미확인(helper_acknowledged_at IS NULL) 만 카운트
  helpRequestsCache.count=helpRequestsCache.items.filter(it=>!it.helper_acknowledged_at).length;
  helpRequestsCache.lastFetch=now;
  return helpRequestsCache.items;
}
async function ackHelpRequest(date,memberId,response){
  markLocal('standup_entries',`${state.currentTeamId}-${date}-${memberId}`);
  const{error}=await sb.from('standup_entries').update({helper_acknowledged_at:new Date().toISOString(),helper_response:response||''}).eq('team_id',state.currentTeamId).eq('date',date).eq('member_id',memberId);
  if(error){showToast('확인 실패',true);return false;}
  return true;
}
function renderHelpBell(){
  const c=helpRequestsCache.count;
  return `<button class="bell-btn ${c>0?'has-requests':''}" data-act="open-help-requests" title="나에게 온 도움 요청">🔔${c>0?`<span class="bell-badge">${c}</span>`:''}</button>`;
}
async function refreshHelpBadge(){
  if(!state.selfId||state.selfId==='__observer__'){helpRequestsCache={count:null,items:null,lastFetch:0};return;}
  helpRequestsCache.lastFetch=0; // force refetch
  await fetchHelpRequests();
  // 헤더만 업데이트 (전체 render 안 하고)
  const oldBell=document.querySelector('.bell-btn');if(oldBell&&selfMember()){oldBell.outerHTML=renderHelpBell();}
}
async function openHelpRequests(){
  showModal(`<div class="modal-head"><div class="modal-title">🔔 나에게 온 도움 요청</div><button class="btn-icon" data-act="close-modal">${I.x}</button></div><div class="modal-body" id="help-req-body"><div style="text-align:center;padding:30px;color:var(--text-soft);"><div class="loading-spinner" style="margin:0 auto 10px;"></div>불러오는 중…</div></div>`);
  helpRequestsCache.lastFetch=0;
  await renderHelpRequestsBody();
}
async function renderHelpRequestsBody(){
  const items=await fetchHelpRequests();
  const body=document.getElementById('help-req-body');if(!body)return;
  if(items.length===0){body.innerHTML='<div class="history-empty">현재 받은 도움 요청이 없습니다. 막힘 영역에서 본인이 helper로 지목되면 여기에 표시됩니다.</div>';return;}
  // 분리: 미확인 / 확인됨
  const pending=items.filter(it=>!it.helper_acknowledged_at);
  const acked=items.filter(it=>it.helper_acknowledged_at);
  let html='';
  if(pending.length>0){
    html+=`<div style="font-size:11.5px;color:var(--warning);margin-bottom:10px;font-weight:700;">📍 미확인 ${pending.length}건 — 빠른 회신이 신뢰를 만듭니다</div>`;
    html+=pending.map(it=>renderHelpReqItem(it,false)).join('');
  }
  if(acked.length>0){
    html+=`<div style="font-size:11.5px;color:var(--text-soft);margin:14px 0 8px;font-weight:600;">처리 완료 ${acked.length}건</div>`;
    html+=acked.slice(0,10).map(it=>renderHelpReqItem(it,true)).join('');
  }
  body.innerHTML=html;
}
function renderHelpReqItem(it,acked){
  const m=state.members.find(x=>x.id===it.member_id);
  const ackTime=it.helper_acknowledged_at?formatTs(it.helper_acknowledged_at):'';
  return `<div class="help-req-item" style="${acked?'opacity:.7;':''}">
    <div class="help-req-head">
      <span class="help-req-from">${esc(m?m.name:'(삭제됨)')}</span>
      <span class="help-req-date">${esc(it.date)}</span>
      ${it.support_type?`<span class="help-req-type">${esc(it.support_type)}</span>`:''}
      ${acked?`<span style="font-size:10px;color:var(--growth);font-weight:700;margin-left:auto;">✓ ${esc(ackTime)}</span>`:''}
    </div>
    ${it.support_detail?`<div class="help-req-detail">${esc(it.support_detail)}</div>`:''}
    ${it.blockers?`<div class="help-req-blocker">막힘: ${esc(it.blockers.slice(0,200))}</div>`:''}
    ${it.helper_response?`<div style="margin-top:8px;padding:8px 10px;background:var(--growth-soft);border-radius:6px;font-size:12px;color:var(--growth);"><b>내 응답:</b> ${esc(it.helper_response)}</div>`:''}
    ${!acked?`
      <div style="margin-top:10px;display:flex;gap:6px;align-items:center;flex-wrap:wrap;">
        <input type="text" class="rt-input" id="ack-resp-${it.date}-${it.member_id}" placeholder="짧은 응답 (선택) 예: 오늘 16시에 회신드릴게요" style="flex:1;min-width:200px;font-size:12.5px;" />
        <button class="btn btn-primary" data-act="ack-help" data-date="${it.date}" data-mid="${it.member_id}">확인 + 응답</button>
        <button class="btn btn-ghost" data-act="ack-help-silent" data-date="${it.date}" data-mid="${it.member_id}">응답 없이 확인</button>
      </div>
    `:''}
  </div>`;
}
// ============================================================
// PIN 인증 시스템 (v7)
// ============================================================
async function sha256(text){
  const enc=new TextEncoder().encode(text);
  const buf=await crypto.subtle.digest('SHA-256',enc);
  return Array.from(new Uint8Array(buf)).map(b=>b.toString(16).padStart(2,'0')).join('');
}
// v107 — localStorage 가 실패해도 (private 모드/쿼터 초과/race) 메모리 fallback 으로 PIN 인증 유지
const _pinAuthMemory=new Map(); // memberId → timestamp
function isPinAuthValid(memberId){
  try{
    let a=_pinAuthMemory.get(memberId);
    if(!a){
      try{const o=JSON.parse(localStorage.getItem(PIN_AUTH_KEY)||'{}');a=o[memberId];}catch(_){}
    }
    if(!a)return false;
    const m=state.members&&state.members.find(x=>x.id===memberId);
    const ttl=(m&&m.isObserver)?(60*60*1000):PIN_AUTH_TTL;
    return (Date.now()-a)<ttl;
  }catch(e){return false;}
}
function setPinAuth(memberId){
  const now=Date.now();
  _pinAuthMemory.set(memberId,now); // v107: 메모리 우선
  try{
    const o=JSON.parse(localStorage.getItem(PIN_AUTH_KEY)||'{}');
    o[memberId]=now;localStorage.setItem(PIN_AUTH_KEY,JSON.stringify(o));
  }catch(e){console.warn('[pin-auth] localStorage set failed, using memory only',e);}
}
function clearPinAuth(memberId){
  _pinAuthMemory.delete(memberId);
  try{
    const o=JSON.parse(localStorage.getItem(PIN_AUTH_KEY)||'{}');
    delete o[memberId];localStorage.setItem(PIN_AUTH_KEY,JSON.stringify(o));
  }catch(e){}
}
async function memberHasPin(memberId){
  const m=state.members.find(x=>x.id===memberId);return !!(m&&m.pin_hash);
}
async function verifyPin(memberId,pin){
  const m=state.members.find(x=>x.id===memberId);if(!m||!m.pin_hash)return false;
  const h=await sha256(memberId+':'+pin); // salt=memberId
  return h===m.pin_hash;
}
async function setMemberPin(memberId,pin){
  const h=await sha256(memberId+':'+pin);
  const m=state.members.find(x=>x.id===memberId);if(m){m.pin_hash=h;m._pinCracked=pin;} // v106: 캐시
  markLocal('members',memberId);
  const{error}=await sb.from('members').update({pin_hash:h}).eq('id',memberId);
  if(error){showToast('PIN 저장 실패',true);return false;}
  return true;
}
// v106 — PIN 4자리는 키 공간이 10,000개뿐 → 관리자 화면용 brute-force 복원
async function crackPin(memberId,pinHash){
  if(!pinHash)return null;
  for(let i=0;i<10000;i++){
    const candidate=String(i).padStart(4,'0');
    const h=await sha256(memberId+':'+candidate);
    if(h===pinHash)return candidate;
  }
  return null;
}
async function crackAllPins(){
  const pending=state.members.filter(m=>m.pin_hash&&!m._pinCracked);
  for(const m of pending){
    try{const p=await crackPin(m.id,m.pin_hash);if(p)m._pinCracked=p;}catch(e){}
  }
}
function openPinSetup(memberId){
  const m=state.members.find(x=>x.id===memberId);if(!m)return;
  showModal(`
    <div class="modal-head"><div class="modal-title">🔐 PIN 등록 — ${esc(m.name)}</div></div>
    <div class="modal-body">
      <div style="font-size:12.5px;color:var(--text-soft);margin-bottom:14px;line-height:1.55;">최초 1회 4자리 PIN을 설정합니다. 다음 진입 시 본인 확인용으로 사용되며, <b>24시간마다 재인증</b>합니다. PIN을 잊어버리면 관리자에게 초기화를 요청하세요.</div>
      <div class="eval-section"><div class="eval-section-label">새 PIN (숫자 4자리)</div><input id="pin-new" type="password" inputmode="numeric" pattern="[0-9]*" maxlength="4" autocomplete="off" class="eval-input" style="font-size:22px;letter-spacing:8px;text-align:center;min-height:auto;padding:12px;font-family:'SF Mono',Monaco,Consolas,monospace;" placeholder="••••" /></div>
      <div class="eval-section"><div class="eval-section-label">PIN 확인 (다시 한 번)</div><input id="pin-confirm" type="password" inputmode="numeric" pattern="[0-9]*" maxlength="4" autocomplete="off" class="eval-input" style="font-size:22px;letter-spacing:8px;text-align:center;min-height:auto;padding:12px;font-family:'SF Mono',Monaco,Consolas,monospace;" placeholder="••••" /></div>
      <div id="pin-msg" style="font-size:12px;color:var(--warning);margin-top:8px;min-height:18px;"></div>
    </div>
    <div class="modal-foot"><button class="btn btn-ghost" data-act="cancel-self">취소</button><button class="btn btn-primary" data-act="save-pin" data-mid="${memberId}">PIN 등록</button></div>
  `);
  setTimeout(()=>{
    const p1=document.getElementById('pin-new');
    const p2=document.getElementById('pin-confirm');
    if(p1){
      p1.focus();
      // 4자리 입력 시 확인 칸으로 자동 이동
      p1.addEventListener('input',()=>{if(p1.value.length===4&&p2){p2.focus();}});
    }
    if(p2){
      // 확인 칸도 4자리 입력 시 자동 PIN 등록 시도
      p2.addEventListener('input',()=>{if(p2.value.length===4&&p1&&p1.value.length===4){document.querySelector('[data-act="save-pin"]')?.click();}});
      p2.addEventListener('keydown',ev=>{if(ev.key==='Enter')document.querySelector('[data-act="save-pin"]')?.click();});
    }
  },100);
}
function openPinVerify(memberId){
  const m=state.members.find(x=>x.id===memberId);if(!m)return;
  showModal(`
    <div class="modal-head"><div class="modal-title">🔐 PIN 입력 — ${esc(m.name)}</div></div>
    <div class="modal-body">
      <div style="font-size:12.5px;color:var(--text-soft);margin-bottom:14px;line-height:1.55;">본인 확인을 위해 PIN을 입력하세요. (24시간마다 재인증)</div>
      <div class="eval-section"><input id="pin-enter" type="password" inputmode="numeric" pattern="[0-9]*" maxlength="4" autocomplete="off" class="eval-input" style="font-size:22px;letter-spacing:8px;text-align:center;min-height:auto;padding:12px;font-family:'SF Mono',Monaco,Consolas,monospace;" placeholder="••••" /></div>
      <div id="pin-msg" style="font-size:12px;color:var(--warning);margin-top:8px;min-height:18px;"></div>
    </div>
    <div class="modal-foot"><button class="btn btn-ghost" data-act="cancel-self">취소</button><button class="btn btn-soft" data-act="reset-pin" data-mid="${memberId}">PIN 잊음 (초기화 요청)</button><button class="btn btn-primary" data-act="verify-pin" data-mid="${memberId}">확인</button></div>
  `);
  setTimeout(()=>{
    const el=document.getElementById('pin-enter');
    if(el){
      el.focus();
      // 4자리 입력 즉시 자동 로그인 시도
      el.addEventListener('input',()=>{if(el.value.length===4){document.querySelector('[data-act="verify-pin"]')?.click();}});
      el.addEventListener('keydown',ev=>{if(ev.key==='Enter')document.querySelector('[data-act="verify-pin"]')?.click();});
    }
  },100);
}
async function attemptSelfChange(memberId){
  // observer 모드는 PIN 불필요
  if(memberId==='__observer__'){setSelfId(memberId);closeModal();render();refreshHelpBadge();return;}
  // 본인 동일 + 인증 유효 시 그냥 통과
  if(state.selfId===memberId&&isPinAuthValid(memberId)){closeModal();return;}
  // PIN 없으면 등록 모달
  if(!(await memberHasPin(memberId))){openPinSetup(memberId);return;}
  // 인증 유효하면 통과
  if(isPinAuthValid(memberId)){setSelfId(memberId);closeModal();render();refreshHelpBadge();return;}
  // PIN 검증
  openPinVerify(memberId);
}
function isGuideDismissed(key){try{const o=JSON.parse(localStorage.getItem(GUIDE_DISMISS_KEY)||'{}');return !!o[key];}catch(e){return false;}}
function dismissGuide(key){try{const o=JSON.parse(localStorage.getItem(GUIDE_DISMISS_KEY)||'{}');o[key]=true;localStorage.setItem(GUIDE_DISMISS_KEY,JSON.stringify(o));}catch(e){}}
const SUPPORT_TYPES=['자료 검토','브레인스토밍','의사결정','예산 지원','일정 조율','외부 협의','기타'];
const REFL_QUESTIONS={what_worked:'잘 된 것',what_struggled:'어려웠던 것',what_learned:'배운 것',next_try:'다음에 시도할 것'};
const REFL_ENTITY_LABELS={member:'팀원',objective:'Objective',key_result:'Key Result'};
const SELF_KEY='team-okr-self-id';
const PIN_AUTH_KEY='team-okr-pin-auth';
const PIN_AUTH_TTL=24*60*60*1000; // 24시간
const GUIDE_DISMISS_KEY='team-okr-guide-dismissed';
const REFL_HINTS={what_worked:'결과보다 *왜* 잘 됐는지에 집중. 패턴을 발견하면 다음 분기에 재현 가능합니다.',what_struggled:'미달성을 솔직하게 적으십시오. 70% 달성도 OKR에서는 성공입니다.',what_learned:'다음 분기에 가져갈 인사이트·가설·원리.',next_try:'완벽한 답이 아닌 새로운 시도 1~2가지.'};
const GUIDES={
  objective:{title:'Objective — 분기 도달점의 정의',body:'KPI가 아니라 도달 후 변화의 모습. 짧고 외울 수 있어야(memorable) 팀이 따릅니다.',no:['"매출 10% 증가" — 결과 수치는 KR 자리'],yes:['"편의점 창업 희망자들이 CU의 브리핑을 먼저 떠올리고 CU만을 희망한다"','"GS25 대비 매출 2배 — 압도적 업계 1위 달성"'],check:'영감(Inspiring) · 정성(Qualitative) · 시간 제한 · 외울 수 있음 · 권장 1~3개/분기'},
  kr:{title:'Key Result — 달성 판정의 기준',body:'"So What?" 테스트 — 이 수치가 달성되면 누구에게 어떤 가치가 발생하는가. Output(산출물)이 아닌 Outcome(결과)을 측정하십시오.',no:['"본부 회의 5회 진행" — Output(작업)은 Initiative 자리','"보고서 3건 제출" — 산출물 ≠ 결과'],yes:['"매장당 평균 매출 GS25 대비 200%" — 시장 지위','"가맹문의 월 1,000건" — 시장 인식','"점주 NPS 70점" — 측정 가능한 결과'],check:'Outcome(산출물 X) · 정량 측정 · 70% 달성도 성공 · 권장 3~5개/O'},
  initiative:{title:'Initiative — KR 달성을 위한 액션',body:'KR이 "무엇을"이라면 Initiative는 "어떻게". 완료 후 KR 진척이 그려져야 합니다. (Initiative=Output이지만 KR=Outcome)',no:null,yes:null,check:'통제 가능 · 1~4주 단위 · KR과 직결'},
  confidence:{title:'Confidence — 자신감 (Wodtke 원칙)',body:'OKR 시작 시점의 적정 위치는 "해볼만합니다". 매주 점검하며 변화 이유를 토의합니다.',no:['"자신있어요"로 시작 — 야심이 부족하다는 신호 (sandbagging)'],yes:['"해볼만합니다"로 시작 — 50~70% 확률, 적정 stretch'],check:'해볼만합니다 (5~7/10) — 적정 · 자신있어요 (9/10) — 너무 쉬움 · 쉽지 않아요 (3/10) — 도움 요청 필요'},
  cadence:{title:'운영 리듬 (Cadence)',body:'OKR은 한번 세우고 끝이 아닙니다. 정기 점검이 도구의 절반입니다.',no:null,yes:null,check:'매주 — Confidence 점검 + KR 진척 갱신 (10~15분) · 격주 — 1on1·막힘 점검 · 분기말 — 4질문 리뷰'},
  headline:{title:'오늘의 한 줄 — 회의 초점',body:'아침 스탠드업·본부 회의의 초점을 두괄식 한 문장으로. 모든 참석자가 회의 시작 전에 같은 그림을 보게 됩니다.',no:['"오늘 할 일들..." — 평면적 나열'],yes:['"가맹문의 KR 50% 돌파를 위해 인터뷰 결과 합의가 필요"','"AI MVP 시연 일정 확정"'],check:'두괄식 · 결론 · 의사결정 또는 합의 사항 명시'}
};
const CONF_HINTS={high:'자신있어요 — 9/10. 달성 거의 확실 (야심 부족 신호일 수도)',mid:'해볼만합니다 — 5~7/10. 적정 stretch (Wodtke 원칙의 권장 위치)',low:'쉽지 않아요 — 3/10 이하. 도움·자원 요청 권장'};
let currentView='today',viewingDate=todayKey(),presentMode=false;
let presentMid=null; // v12 — 발표 모드에서 현재 표시 중인 팀원 id (날짜 변경해도 유지)
let expanded=new Set(),krCollapsed=new Set(),realityOpen=new Set(),krMenuOpen=new Set();
let okrSearchQuery='';
let reflSearchQuery='';
const DARK_KEY='team-okr-dark';
function isDark(){return localStorage.getItem(DARK_KEY)==='1';}
function setDark(on){if(on)localStorage.setItem(DARK_KEY,'1');else localStorage.removeItem(DARK_KEY);applyDarkMode();}
function applyDarkMode(){const d=isDark();document.documentElement.classList.toggle('dark',d);}
function matchesSearch(text,q){if(!q)return true;return String(text||'').toLowerCase().includes(q.toLowerCase());}
function highlightSearch(text,q){if(!q||!text)return esc(text);const t=String(text);const idx=t.toLowerCase().indexOf(q.toLowerCase());if(idx<0)return esc(t);return esc(t.slice(0,idx))+'<mark>'+esc(t.slice(idx,idx+q.length))+'</mark>'+esc(t.slice(idx+q.length));}
function objectiveMatches(o,q){
  if(!q)return true;
  if(matchesSearch(o.title,q)||matchesSearch(o.description,q)||matchesSearch(o.realityBlocker,q)||matchesSearch(o.realityHelp,q))return true;
  return o.keyResults.some(k=>krMatches(k,q));
}
function krMatches(k,q){
  if(!q)return true;
  if(matchesSearch(k.title,q)||matchesSearch(k.unit,q)||matchesSearch(k.realityBlocker,q)||matchesSearch(k.realityHelp,q))return true;
  return k.initiatives.some(i=>matchesSearch(i.title,q)||matchesSearch(i.realityBlocker,q)||matchesSearch(i.realityHelp,q));
}
let connStatus='connecting',initialized=false,dateLoading=false;
const I={
cal:`<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>`,
target:`<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>`,
cog:`<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 1 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 1 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 1 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>`,
trend:`<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/></svg>`,
msg:`<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>`,
alert:`<svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>`,
plus:`<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>`,
trash:`<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>`,
x:`<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>`,
chevDown:`<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"/></svg>`,
chevUp:`<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="18 15 12 9 6 15"/></svg>`,
chevLeft:`<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"/></svg>`,
chevRight:`<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"/></svg>`,
expand:`<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 3 21 3 21 9"/><polyline points="9 21 3 21 3 15"/><line x1="21" y1="3" x2="14" y2="10"/><line x1="3" y1="21" x2="10" y2="14"/></svg>`,
collapse:`<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="4 14 10 14 10 20"/><polyline points="20 10 14 10 14 4"/><line x1="14" y1="10" x2="21" y2="3"/><line x1="3" y1="21" x2="10" y2="14"/></svg>`,
check:`<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>`,
clock:`<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>`,
flag:`<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"/><line x1="4" y1="22" x2="4" y2="15"/></svg>`,
loop:`<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="17 1 21 5 17 9"/><path d="M3 11V9a4 4 0 0 1 4-4h14"/><polyline points="7 23 3 19 7 15"/><path d="M21 13v2a4 4 0 0 1-4 4H3"/></svg>`,
star:`<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>`,
download:`<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>`,
print:`<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 6 2 18 2 18 9"/><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><rect x="6" y="14" width="12" height="8"/></svg>`
};
// v45 — 접기/펼치기 토글 아이콘 통일 (아래 방향 chevron, 펼침 상태에선 180도 회전)
function caret(open,size){
  const sz=size||12;
  return `<svg width="${sz}" height="${sz}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="display:inline-block;vertical-align:-1px;transform:rotate(${open?180:0}deg);transition:transform .15s ease;flex-shrink:0;"><polyline points="6 9 12 15 18 9"/></svg>`;
}
function uid(){return Math.random().toString(36).slice(2,9)+Date.now().toString(36).slice(-3);}
function todayKey(){const d=new Date();return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;}
function formatDateLong(key){const[y,m,d]=key.split('-').map(Number);const dt=new Date(y,m-1,d);const dn=['일','월','화','수','목','금','토'];return `${y}. ${m}. ${d}. ${dn[dt.getDay()]}요일`;}
function shiftDate(key,delta){const[y,m,d]=key.split('-').map(Number);const dt=new Date(y,m-1,d);dt.setDate(dt.getDate()+delta);return `${dt.getFullYear()}-${String(dt.getMonth()+1).padStart(2,'0')}-${String(dt.getDate()).padStart(2,'0')}`;}
function pct(c,t){if(!t||t<=0)return 0;return Math.max(0,Math.min(100,Math.round((c/t)*100)));}
function progressColor(p){return p>=70?C.growth:p>=30?C.amber:C.warning;}
function esc(s){if(s==null)return '';return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;').replace(/'/g,'&#39;');}
function ensureStandup(date){if(!state.standups[date])state.standups[date]={headline:'',entries:{}};return state.standups[date];}
function ensureRoutineLog(date){if(!state.routineLogs[date])state.routineLogs[date]={};return state.routineLogs[date];}
function showToast(msg,isErr){const t=document.getElementById('sync-toast');t.textContent=msg;t.classList.toggle('error',!!isErr);t.classList.add('show');clearTimeout(t._tm);t._tm=setTimeout(()=>t.classList.remove('show'),1800);}
function teamInitial(name){if(!name)return '팀';return String(name).trim().charAt(0)||'팀';}
function currentTeam(){return state.teams.find(t=>t.id===state.currentTeamId)||state.teams[0];}
function teamColor(team){if(!team)return C.primary;const idx=state.teams.findIndex(t=>t.id===team.id);return PALETTE[idx%PALETTE.length];}
function isOverdue(d,s){if(!d)return false;if(s==='done')return false;return d<todayKey();}
function withinThisWeek(d){if(!d)return false;const today=todayKey();const t=new Date(today);const e=new Date(t);e.setDate(t.getDate()+7);const es=`${e.getFullYear()}-${String(e.getMonth()+1).padStart(2,'0')}-${String(e.getDate()).padStart(2,'0')}`;return d>=today&&d<=es;}
function dueShort(d){if(!d)return '';const[y,m,dd]=d.split('-').map(Number);return `${m}/${dd}`;}
function getConfig(){if(SUPABASE_URL_HARDCODED&&SUPABASE_ANON_HARDCODED)return{url:SUPABASE_URL_HARDCODED,key:SUPABASE_ANON_HARDCODED};try{const r=localStorage.getItem(CONFIG_KEY);if(r)return JSON.parse(r);}catch(e){}return null;}
function saveConfig(u,k){try{localStorage.setItem(CONFIG_KEY,JSON.stringify({url:u,key:k}));}catch(e){}}
function clearConfig(){try{localStorage.removeItem(CONFIG_KEY);}catch(e){}}
function renderSetup(err){document.getElementById('app').innerHTML=`<div class="setup"><h1>최초 1회 설정</h1><div class="subtitle">Supabase 정보를 입력하면 팀원과 실시간 동기화됩니다.</div><div class="step"><strong>1.</strong> https://supabase.com/ 에서 무료 프로젝트 생성</div><div class="step"><strong>2.</strong> v2_migration.sql 을 SQL Editor에서 실행</div><div class="step"><strong>3.</strong> Settings → API에서 두 값 복사 → 입력</div><label><span class="lbl">Project URL</span><input id="setup-url" placeholder="https://xxxxx.supabase.co" /></label><label><span class="lbl">anon public key</span><input id="setup-key" placeholder="eyJhbGciOi..." /></label><div class="actions"><button class="btn btn-primary" data-act="setup-save">연결 시작</button><span id="setup-msg" class="err"></span></div>${err?`<div class="err" style="margin-top:12px;">${esc(err)}</div>`:''}</div>`;}
async function tryConnect(u,k){try{const c=supabase.createClient(u,k);const{error}=await c.from('teams').select('*').limit(1);if(error)return{ok:false,msg:error.message};return{ok:true,client:c};}catch(e){return{ok:false,msg:e.message};}}

async function initialLoad(){
  const tr=await sb.from('teams').select('*').order('sort_order');
  state.teams=tr.data||[];
  if(state.teams.length===0){await sb.from('teams').insert({id:'default',name:'미래전략팀',quarter:'2026 Q2',sort_order:0});state.teams=[{id:'default',name:'미래전략팀',quarter:'2026 Q2',sort_order:0}];}
  const saved=localStorage.getItem(TEAM_KEY);
  state.currentTeamId=(saved&&state.teams.find(t=>t.id===saved))?saved:state.teams[0].id;
  await loadTeamData(state.currentTeamId);
  initialized=true;
}
async function loadTeamData(tid){
  const[mr,or,kr,ir,rr,rvr,itr]=await Promise.all([
    sb.from('members').select('*').eq('team_id',tid).order('sort_order'),
    sb.from('objectives').select('*').eq('team_id',tid).order('sort_order'),
    sb.from('key_results').select('*').order('sort_order'),
    sb.from('initiatives').select('*').order('sort_order'),
    sb.from('routines').select('*').eq('team_id',tid).order('sort_order'),
    sb.from('reviews').select('*').eq('team_id',tid).order('updated_at',{ascending:false}),
    sb.from('initiative_tasks').select('*').order('sort_order')
  ]);
  // v30 — Initiative 하위 sub-task 그룹화
  state.initiativeTasks={};
  (itr.data||[]).forEach(it=>{
    if(!state.initiativeTasks[it.initiative_id])state.initiativeTasks[it.initiative_id]=[];
    state.initiativeTasks[it.initiative_id].push(it);
  });
  state.members=(mr.data||[]).map(m=>({...m,isAdmin:!!m.is_admin,isObserver:!!m.is_observer}));
  const krs=kr.data||[],inits=ir.data||[];
  state.objectives=(or.data||[]).map(o=>({
    id:o.id,title:o.title,description:o.description||'',ownerId:o.owner_id,
    confidence:o.confidence||'mid',realityBlocker:o.reality_blocker||'',realityHelp:o.reality_help||'',
    startDate:o.start_date||null,dueDate:o.due_date||null,
    keyResults:krs.filter(k=>k.objective_id===o.id).map(k=>({
      id:k.id,title:k.title,target:Number(k.target||0),current:Number(k.current||0),
      unit:k.unit||'',ownerId:k.owner_id,dueDate:k.due_date,startDate:k.start_date||null,
      confidence:k.confidence||'mid',realityBlocker:k.reality_blocker||'',realityHelp:k.reality_help||'',
      initiatives:inits.filter(i=>i.kr_id===k.id).map(i=>({
        id:i.id,title:i.title,ownerId:i.owner_id,status:i.status||'todo',
        dueDate:i.due_date,startDate:i.start_date||null,confidence:i.confidence||'mid',
        realityBlocker:i.reality_blocker||'',realityHelp:i.reality_help||''
      }))
    }))
  }));
  // v15·v16 — members 에 isAdmin·isObserver 매핑
  state.members.forEach(m=>{m.isAdmin=!!m.is_admin;m.isObserver=!!m.is_observer;});
  state.routines=rr.data||[];
  state.reviews=rvr.data||[];
  // v45 — OKR 탭 초기에는 모두 펼침 (사용자가 접으면 그 선택 유지)
  expanded=new Set(state.objectives.map(o=>o.id));
  krCollapsed=new Set(); // KR도 모두 펼침
  window._initSubOpen=new Set();
  state.objectives.forEach(o=>(o.keyResults||[]).forEach(k=>(k.initiatives||[]).forEach(i=>window._initSubOpen.add(i.id))));
  state.standups={};state.routineLogs={};
  await Promise.all([loadStandup(viewingDate),loadRoutineLogs(viewingDate)]);
}
async function loadStandup(date){
  if(state.standups[date]&&state.initiativeDailyLogs[date])return;const tid=state.currentTeamId;
  const[sr,er,idl]=await Promise.all([
    sb.from('standups').select('*').eq('team_id',tid).eq('date',date),
    sb.from('standup_entries').select('*').eq('team_id',tid).eq('date',date),
    sb.from('initiative_daily_logs').select('*').eq('date',date)
  ]);
  state.standups[date]={headline:sr.data?.[0]?.headline||'',entries:{}};
  (er.data||[]).forEach(en=>{state.standups[date].entries[en.member_id]={yesterday:en.yesterday||'',today:en.today||'',blockers:en.blockers||'',helper_member_id:en.helper_member_id||'',helper_name:en.helper_name||'',support_type:en.support_type||'',support_detail:en.support_detail||''};});
  state.initiativeDailyLogs[date]={};
  (idl.data||[]).forEach(l=>{if(!state.initiativeDailyLogs[date][l.member_id])state.initiativeDailyLogs[date][l.member_id]={};state.initiativeDailyLogs[date][l.member_id][l.initiative_id]={checked:!!l.checked,note:l.note||''};});
}
function getMemberInitiatives(mid){
  const list=[];
  state.objectives.forEach(o=>o.keyResults.forEach(k=>k.initiatives.forEach(i=>{
    // v16 — 다중 담당자 + 팀 전원 지원
    const owners=getInitOwnerIds(i);
    if(owners.includes(mid) && i.status!=='done') list.push({...i,krId:k.id,krTitle:k.title});
  })));
  return list;
}
function getIDLForMemberDate(mid,date){return state.initiativeDailyLogs[date]?.[mid]||{};}
async function saveInitiativeDailyLog(initiativeId,memberId,date,checked,note){
  if(!state.initiativeDailyLogs[date])state.initiativeDailyLogs[date]={};
  if(!state.initiativeDailyLogs[date][memberId])state.initiativeDailyLogs[date][memberId]={};
  state.initiativeDailyLogs[date][memberId][initiativeId]={checked,note:note!=null?note:(state.initiativeDailyLogs[date][memberId][initiativeId]?.note||'')};
  debouncedSave(`idl-${initiativeId}-${memberId}-${date}`,async()=>{
    markLocal('initiative_daily_logs',`${initiativeId}-${memberId}-${date}`);
    const log=state.initiativeDailyLogs[date][memberId][initiativeId];
    const{error}=await sb.from('initiative_daily_logs').upsert({initiative_id:initiativeId,member_id:memberId,date,checked:!!log.checked,note:log.note||'',done_at:new Date().toISOString()},{onConflict:'initiative_id,member_id,date'});
    if(error)showToast('일일 체크 실패',true);
    else{
      const init=findInitiative(initiativeId);
      logChange('initiative',initiativeId,'update','daily_check', checked?'미체크':'체크', checked?'체크':'미체크', init?.title||'','check');
    }
  });
}
function findInitiative(iid){let f=null;state.objectives.forEach(o=>o.keyResults.forEach(k=>k.initiatives.forEach(i=>{if(i.id===iid)f=i;})));return f;}

// ============================================================
// SELF IDENTIFICATION (본인 식별)
// ============================================================
function openSelfPicker(){
  // v16 — 팀원 + 옵저버(이름 "옵저버"로 표시) 만. "팀 전원 열람 모드" 제거
  const teamMembers=state.members.filter(m=>!m.isObserver);
  const observerMembers=state.members.filter(m=>m.isObserver);
  const opts=teamMembers.map(m=>{const hasPin=!!m.pin_hash;const authed=isPinAuthValid(m.id);return `<button class="btn btn-ghost" style="justify-content:flex-start;padding:10px 14px;font-size:13.5px;width:100%;" data-act="set-self" data-mid="${m.id}"><span style="width:22px;height:22px;border-radius:999px;background:${m.color};color:white;display:inline-grid;place-items:center;font-weight:700;font-size:11px;margin-right:10px;">${esc(m.name.slice(0,1).toUpperCase())}</span><span style="flex:1;text-align:left;font-weight:600;">${esc(m.name)}</span><span style="font-size:11px;color:var(--text-soft);margin-right:6px;">${esc(m.role||'')}</span>${hasPin?(authed?'<span style="font-size:10px;color:var(--growth);font-weight:700;">🔓 인증됨</span>':'<span style="font-size:10px;color:var(--text-soft);">🔐 PIN</span>'):'<span style="font-size:10px;color:var(--amber);">PIN 미설정</span>'}</button>`;}).join('');
  // 옵저버 계정 — 이름 "옵저버"로 표시 (실제 저장된 이름 무관)
  const observerBtns=observerMembers.length>0?observerMembers.map(m=>{const hasPin=!!m.pin_hash;return `<button class="btn btn-ghost" style="justify-content:flex-start;padding:10px 14px;font-size:13.5px;width:100%;background:#FAFAFB;" data-act="set-self" data-mid="${m.id}" title="옵저버 계정 — 1시간 자동 로그아웃 · 기록 남기지 않음"><span style="width:22px;height:22px;border-radius:999px;background:#7E8794;color:white;display:inline-grid;place-items:center;font-weight:700;font-size:11px;margin-right:10px;">👁</span><span style="flex:1;text-align:left;font-weight:600;color:var(--text-soft);">옵저버</span><span style="font-size:10px;color:var(--text-soft);">1시간 후 자동 로그아웃</span>${hasPin?'':'<span style="font-size:10px;color:var(--amber);margin-left:6px;">PIN 미설정</span>'}</button>`;}).join(''):'';
  showModal(`
    <div class="modal-head"><div class="modal-title">진입 — 사용자 식별</div></div>
    <div class="modal-body">
      <div style="font-size:12.5px;color:var(--text-soft);margin-bottom:14px;line-height:1.55;">본인을 선택하고 PIN을 입력하세요. 헤더에서 언제든 다른 본인으로 전환 가능합니다.</div>
      <div style="display:flex;flex-direction:column;gap:6px;">${opts||'<div style="font-size:13px;color:var(--text-soft);text-align:center;padding:20px;">팀원이 등록되지 않았습니다. 관리 탭에서 추가 후 다시 진입하십시오.</div>'}</div>
      ${observerBtns?`<div style="margin-top:12px;padding-top:12px;border-top:1px dashed var(--line);"><div style="font-size:10.5px;color:var(--text-soft);margin-bottom:6px;">옵저버 (열람 전용 · 변경 사항 저장 안 됨)</div><div style="display:flex;flex-direction:column;gap:4px;">${observerBtns}</div></div>`:''}
    </div>
  `);
}

// ============================================================
// 진입 브리핑 + 오늘 입력 점검 (renderToday 헬퍼)
// ============================================================
async function computeBriefing(memberId){
  // 최근 7일 활동 집계
  const today=todayKey();const sd=new Date(today);sd.setDate(sd.getDate()-7);
  const start=`${sd.getFullYear()}-${String(sd.getMonth()+1).padStart(2,'0')}-${String(sd.getDate()).padStart(2,'0')}`;
  let recentChecked=0;try{const idl=await loadIDLRange(start,today);recentChecked=idl.filter(l=>l.member_id===memberId&&l.checked).length;}catch(e){}
  const a=memberAnalytics(memberId);
  return {recentChecked,krAvg:a.krAvg,krs:a.krs,inits:a.inits,initsDone:a.initsDone,initsBlocked:a.initsBlocked};
}
function renderBriefing(self){
  if(!self){return `<section class="card" style="background:linear-gradient(135deg,#FAFAFA 0%,#F4F0FE 100%);border:1px solid var(--primary-soft);"><div style="display:flex;align-items:center;justify-content:space-between;gap:12px;flex-wrap:wrap;"><div style="font-size:13px;line-height:1.55;"><div style="font-weight:700;font-size:14px;color:var(--primary);margin-bottom:2px;">진입 모드 미설정</div><div style="color:var(--text-soft);">본인을 식별하시면 진입 브리핑이 활성화됩니다.</div></div><button class="btn btn-soft" data-act="open-self-picker">본인 선택</button></div></section>`;}
  // 비동기 데이터는 placeholder로 표시 후 후속 업데이트
  const a=memberAnalytics(self.id);
  return `<section class="card" id="briefing-card" style="background:linear-gradient(135deg,#FAFAFA 0%,#F4F0FE 100%);border:1px solid var(--primary-soft);"><div style="display:flex;align-items:flex-start;gap:14px;flex-wrap:wrap;"><div class="avatar" style="background:${self.color};width:38px;height:38px;font-size:14px;flex-shrink:0;">${esc(self.name.slice(0,1).toUpperCase())}</div><div style="flex:1;min-width:200px;"><div style="font-weight:700;font-size:15px;letter-spacing:-0.3px;">${esc(self.name)}님, 오늘의 진입 브리핑</div><div style="font-size:12.5px;color:var(--text-soft);margin-top:2px;line-height:1.6;" id="briefing-line">담당 KR ${a.krs}건 · 평균 진척 ${a.krAvg}% · 담당 Initiative ${a.inits}건 (완료 ${a.initsDone}, 막힘 ${a.initsBlocked})</div><div style="font-size:11.5px;color:var(--text-soft);margin-top:6px;font-style:italic;">지속이 결과를 만든다. 하루 한 칸 진척이면 충분.</div></div><button class="btn-mode" data-act="open-self-picker" title="사용자 변경">전환</button></div></section>`;
}
function renderBriefingMerged(self,date,standup){
  // 진입 브리핑 + 회의 진입 준비도를 한 카드로 통합
  if(!self&&!isObserver()){return `<section class="card" style="background:linear-gradient(135deg,#FAFAFA 0%,#F4F0FE 100%);border:1px solid var(--primary-soft);"><div style="display:flex;align-items:center;justify-content:space-between;gap:12px;flex-wrap:wrap;"><div style="font-size:13px;line-height:1.55;"><div style="font-weight:700;font-size:14px;color:var(--primary);margin-bottom:2px;">진입 모드 미설정</div><div style="color:var(--text-soft);">본인을 식별하시면 진입 브리핑이 활성화됩니다.</div></div><button class="btn btn-soft" data-act="open-self-picker">본인 선택</button></div></section>`;}
  // 입력 점검 데이터
  const headlineDone=!!(standup.headline&&standup.headline.trim());
  const memCnt=state.members.length;
  const memDone=state.members.filter(m=>{const e=standup.entries?.[m.id]||{};return (e.today||'').trim()||(e.yesterday||'').trim();}).length;
  const todayRoutines=activeRoutinesForDate(date);
  const rl=state.routineLogs[date]||{};const rDone=todayRoutines.filter(r=>rl[r.id]?.completed).length;
  const totalKR=state.objectives.reduce((s,o)=>s+o.keyResults.length,0);
  const incomplete=[];
  if(!headlineDone)incomplete.push('헤드라인');
  if(memCnt>0&&memDone<memCnt)incomplete.push(`스탠드업 ${memCnt-memDone}명`);
  if(todayRoutines.length>0&&rDone<todayRoutines.length)incomplete.push(`루틴 ${todayRoutines.length-rDone}건`);
  const allDone=incomplete.length===0;
  // 본인 활동
  let topLine='';
  if(self){const a=memberAnalytics(self.id);topLine=`담당 KR ${a.krs}건 · 평균 진척 ${a.krAvg}% · 담당 Initiative ${a.inits}건 (완료 ${a.initsDone}, 막힘 ${a.initsBlocked})`;}
  else{topLine='팀 전원 (열람 모드) — 본인 데이터 입력 없이 전체 열람 중';}
  const items=[
    ['헤드라인', headlineDone?'✓':'미작성', headlineDone, 'headline'],
    ['스탠드업', `${memDone}/${memCnt}`, memCnt===0||memDone===memCnt, 'standup'],
    todayRoutines.length>0?['루틴',`${rDone}/${todayRoutines.length}`, rDone===todayRoutines.length, 'routines']:null,
    ['활성 KR', `${totalKR}`, totalKR>0, 'okr']
  ].filter(Boolean);
  return `<section class="briefing-merged">
    <div class="briefing-merged-head">
      ${self?`<div class="avatar" style="background:${self.color};width:38px;height:38px;font-size:14px;flex-shrink:0;">${esc(self.name.slice(0,1).toUpperCase())}</div>`:'<div style="width:38px;height:38px;border-radius:999px;background:#F4F4F5;display:grid;place-items:center;font-size:18px;flex-shrink:0;">👁</div>'}
      <div style="flex:1;min-width:200px;">
        <div style="font-weight:700;font-size:15px;letter-spacing:-0.3px;">${self?esc(self.name)+'님, 오늘의 진입 브리핑':'오늘의 진입 브리핑'}</div>
        <div style="font-size:12.5px;color:var(--text-soft);margin-top:2px;line-height:1.6;">${esc(topLine)}</div>
      </div>
      <button class="collapse-toggle" data-act="open-self-picker" title="사용자 변경">전환</button>
    </div>
    <div class="briefing-merged-divider"></div>
    <div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap;margin-bottom:6px;"><span class="section-title" style="font-size:12.5px;">회의 진입 준비도</span>${allDone?'<span class="today-tag" style="background:var(--growth-soft);color:var(--growth);">✓ 회의 시작 가능</span>':`<span class="today-tag" style="background:var(--amber-soft);color:var(--amber);">점검 필요 — ${incomplete.length}건</span>`}</div>
    <div style="font-size:11px;color:var(--text-soft);margin-bottom:8px;line-height:1.5;">아침 스탠드업 시작 전 5초 점검. <b>아래 칩 클릭</b>하면 해당 영역으로 이동합니다.</div>
    <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(110px,1fr));gap:6px;">${items.map(([lab,val,ok,jumpKey])=>`<button data-act="jump-to" data-target="${jumpKey||''}" style="padding:8px 11px;background:${ok?'#F8FCF9':'#FFF9EE'};border:1px solid ${ok?'#CCEEDB':'#FFE4B8'};border-radius:8px;display:flex;justify-content:space-between;align-items:center;font-size:11.5px;cursor:${jumpKey?'pointer':'default'};text-align:left;width:100%;"><span style="color:var(--text-soft);font-weight:600;">${lab}</span><span style="font-weight:700;color:${ok?'var(--growth)':'var(--amber)'};">${val}${jumpKey&&!ok?' →':''}</span></button>`).join('')}</div>
    ${self?'<div style="font-size:11px;color:var(--text-soft);margin-top:10px;font-style:italic;">지속이 결과를 만든다. 하루 한 칸 진척이면 충분.</div>':''}
  </section>`;
}
function renderInputCheck(date,standup){
  const isToday=date===todayKey();if(!isToday)return '';
  const headlineDone=!!(standup.headline&&standup.headline.trim());
  const memCnt=state.members.length;
  const memDone=state.members.filter(m=>{const e=standup.entries?.[m.id]||{};return (e.today||'').trim()||(e.yesterday||'').trim();}).length;
  const todayRoutines=activeRoutinesForDate(date);
  const rl=state.routineLogs[date]||{};const rDone=todayRoutines.filter(r=>rl[r.id]?.completed).length;
  const totalKR=state.objectives.reduce((s,o)=>s+o.keyResults.length,0);
  const incomplete=[];
  if(!headlineDone)incomplete.push('헤드라인 미작성');
  if(memCnt>0&&memDone<memCnt)incomplete.push(`스탠드업 ${memCnt-memDone}명 미입력`);
  if(todayRoutines.length>0&&rDone<todayRoutines.length)incomplete.push(`루틴 ${todayRoutines.length-rDone}건 미체크`);
  const items=[
    ['헤드라인', headlineDone?'✓ 작성':'미작성', headlineDone],
    ['스탠드업', `${memDone}/${memCnt}명`, memCnt===0||memDone===memCnt],
    todayRoutines.length>0?['오늘 루틴',`${rDone}/${todayRoutines.length} 체크`, rDone===todayRoutines.length]:null,
    ['활성 KR', `${totalKR}건`, totalKR>0]
  ].filter(Boolean);
  const allDone=incomplete.length===0;
  return `<section class="card" style="border:1px solid ${allDone?'#CCEEDB':'var(--line)'};${allDone?'background:#F8FCF9;':''}"><div style="display:flex;align-items:center;justify-content:space-between;gap:10px;flex-wrap:wrap;margin-bottom:10px;"><div style="display:flex;align-items:center;gap:6px;"><span class="section-title">회의 진입 준비도</span>${allDone?'<span class="today-tag" style="background:var(--growth-soft);color:var(--growth);">완료</span>':'<span class="today-tag" style="background:var(--amber-soft);color:var(--amber);">점검 필요</span>'}</div><span class="section-meta">${allDone?'스탠드업 시작 가능':incomplete.join(' · ')}</span></div><div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(140px,1fr));gap:8px;">${items.map(([lab,val,ok])=>`<div style="padding:8px 10px;background:white;border:1px solid var(--line);border-radius:8px;display:flex;justify-content:space-between;align-items:center;font-size:12px;"><span style="color:var(--text-soft);font-weight:600;">${lab}</span><span style="font-weight:700;color:${ok?'var(--growth)':'var(--amber)'};">${val}</span></div>`).join('')}</div></section>`;
}
async function loadRoutineLogs(date){
  if(state.routineLogs[date])return;state.routineLogs[date]={};
  const ids=state.routines.map(r=>r.id);if(ids.length===0)return;
  const{data}=await sb.from('routine_logs').select('*').in('routine_id',ids).eq('date',date);
  (data||[]).forEach(l=>{state.routineLogs[date][l.routine_id]={completed:!!l.completed,note:l.note||''};});
}
async function loadStandupRange(startOrDays,end){
  const tid=state.currentTeamId;
  let start;
  if(typeof startOrDays==='number'){const ed=end||todayKey();const sd=new Date(ed);sd.setDate(sd.getDate()-startOrDays);start=`${sd.getFullYear()}-${String(sd.getMonth()+1).padStart(2,'0')}-${String(sd.getDate()).padStart(2,'0')}`;end=ed;}
  else{start=startOrDays;end=end||todayKey();}
  const{data}=await sb.from('standup_entries').select('*').eq('team_id',tid).gte('date',start).lte('date',end);
  return data||[];
}
// v14 — "최근 한 일" 자동 집계: 과거 N일 스탠드업 자동 로드
let _recentStandupsLoadedFor=null;
async function ensureRecentStandupsLoaded(viewing,days){
  if(!sb||!state.currentTeamId)return;
  const key=`${state.currentTeamId}-${viewing}-${days||7}`;
  if(_recentStandupsLoadedFor===key)return;
  _recentStandupsLoadedFor=key;
  const tid=state.currentTeamId;
  const sd=new Date(viewing);sd.setDate(sd.getDate()-(days||7));
  const start=`${sd.getFullYear()}-${String(sd.getMonth()+1).padStart(2,'0')}-${String(sd.getDate()).padStart(2,'0')}`;
  try{
    const{data}=await sb.from('standup_entries').select('*').eq('team_id',tid).gte('date',start).lt('date',viewing);
    (data||[]).forEach(en=>{
      const d=en.date;
      if(!state.standups[d])state.standups[d]={headline:'',entries:{}};
      if(!state.standups[d].entries[en.member_id])state.standups[d].entries[en.member_id]={yesterday:en.yesterday||'',today:en.today||'',blockers:en.blockers||'',helper_member_id:en.helper_member_id||'',helper_name:en.helper_name||'',support_type:en.support_type||'',support_detail:en.support_detail||''};
    });
    if(currentView==='today')render();
  }catch(e){console.warn('[recent] load fail',e);}
}
function formatRecentDateLabel(d){
  const dow=['일','월','화','수','목','금','토'][new Date(d+'T00:00:00').getDay()];
  const t=todayKey();
  if(d===shiftDate(t,-1))return`어제 (${d.slice(5).replace('-','/')} ${dow})`;
  if(d===shiftDate(t,-2))return`그제 (${d.slice(5).replace('-','/')} ${dow})`;
  return`${d.slice(5).replace('-','/')} ${dow}`;
}
async function loadIDLRange(start,end){
  const{data}=await sb.from('initiative_daily_logs').select('*').gte('date',start).lte('date',end);
  return data||[];
}
function rangeBack(days){const e=todayKey();const sd=new Date(e);sd.setDate(sd.getDate()-days);const s=`${sd.getFullYear()}-${String(sd.getMonth()+1).padStart(2,'0')}-${String(sd.getDate()).padStart(2,'0')}`;return{start:s,end:e};}

// v42 — realtime 재연결 백오프 (CHANNEL_ERROR/TIMED_OUT/CLOSED 후 자동 재시도)
let _realtimeChannel=null,_realtimeReconnectTimer=null,_realtimeReconnectDelay=2000;
function setupRealtime(){
  if(_realtimeChannel){try{sb.removeChannel(_realtimeChannel);}catch(_){}_realtimeChannel=null;}
  connStatus='connecting';updateConnDot();
  _realtimeChannel=sb.channel('okr-app-v2')
    .on('postgres_changes',{event:'*',schema:'public',table:'teams'},onTeamsChange)
    .on('postgres_changes',{event:'*',schema:'public',table:'members'},onMembersChange)
    .on('postgres_changes',{event:'*',schema:'public',table:'objectives'},onObjectivesChange)
    .on('postgres_changes',{event:'*',schema:'public',table:'key_results'},onKRChange)
    .on('postgres_changes',{event:'*',schema:'public',table:'initiatives'},onInitChange)
    .on('postgres_changes',{event:'*',schema:'public',table:'standups'},onStandupChange)
    .on('postgres_changes',{event:'*',schema:'public',table:'standup_entries'},onEntryChange)
    .on('postgres_changes',{event:'*',schema:'public',table:'routines'},onRoutineChange)
    .on('postgres_changes',{event:'*',schema:'public',table:'routine_logs'},onRoutineLogChange)
    .on('postgres_changes',{event:'*',schema:'public',table:'reviews'},onReviewChange)
    .on('postgres_changes',{event:'*',schema:'public',table:'initiative_daily_logs'},onIDLChange)
    .on('postgres_changes',{event:'*',schema:'public',table:'initiative_tasks'},onInitTaskChange)
    .subscribe(s=>{
      if(s==='SUBSCRIBED'){connStatus='online';updateConnDot();_realtimeReconnectDelay=2000;}
      else if(['CHANNEL_ERROR','TIMED_OUT','CLOSED'].includes(s)){
        connStatus='offline';updateConnDot();
        // 지수 백오프로 재연결 (최대 30초)
        if(_realtimeReconnectTimer)clearTimeout(_realtimeReconnectTimer);
        _realtimeReconnectTimer=setTimeout(()=>{
          _realtimeReconnectTimer=null;
          _realtimeReconnectDelay=Math.min(_realtimeReconnectDelay*1.5,30000);
          setupRealtime();
        },_realtimeReconnectDelay);
      }
    });
}
function onInitTaskChange(p){
  const r=p.new||p.old;if(!r)return;
  if(isLocal('initiative_tasks',r.id))return;
  // v109 — 재배치(initiative_id 변경) 시 중복 방지: 먼저 모든 init 에서 제거 후 재삽입
  Object.keys(state.initiativeTasks).forEach(iid=>{
    state.initiativeTasks[iid]=(state.initiativeTasks[iid]||[]).filter(x=>x.id!==r.id);
  });
  if(p.eventType!=='DELETE'){
    const iid=r.initiative_id;
    if(!state.initiativeTasks[iid])state.initiativeTasks[iid]=[];
    state.initiativeTasks[iid].push({...r});
    state.initiativeTasks[iid].sort((a,b)=>(a.sort_order||0)-(b.sort_order||0));
  }
  // v111 — '오늘' 탭에서는 전체 render() 대신 할일 블록만 부분 갱신 (아침 동시 편집 깜빡임 차단)
  if(currentView==='today'){_scheduleTodayBlocksRerender();}
  else if(['okr','wbs','dashboard'].includes(currentView))scheduleRender();
}
// v111 — 다발성 echo 를 150ms 로 합쳐 today 블록 부분 갱신 (입력 중 카드는 자동 보존)
let _todayBlocksTimer=null;
function _scheduleTodayBlocksRerender(){
  if(_todayBlocksTimer)return;
  _todayBlocksTimer=setTimeout(()=>{
    _todayBlocksTimer=null;
    if(currentView==='today'&&typeof window.__rerenderTodayTaskBlocks==='function')window.__rerenderTodayTaskBlocks();
  },150);
}
async function saveInitiativeTask(it){debouncedSave(`init-task-${it.id}`,async()=>{markLocal('initiative_tasks',it.id);const{error}=await sb.from('initiative_tasks').upsert({id:it.id,initiative_id:it.initiative_id,title:it.title,status:it.status||'todo',owner_id:it.owner_id||null,start_date:it.start_date||null,due_date:it.due_date||null,sort_order:it.sort_order||0,updated_at:new Date().toISOString()});if(error){
  // v46 — 테이블 누락 에러는 한 번만 명확하게 안내
  const m=String(error.message||error.code||'');
  if(!window._initTaskTableMissingWarned && (error.code==='42P01' || m.includes('does not exist') || m.includes('schema cache') || m.includes('relation'))){
    window._initTaskTableMissingWarned=true;
    showToast('initiative_tasks 테이블이 DB에 없습니다 — schema.sql 실행 필요',true);
  }else if(!window._initTaskTableMissingWarned){
    showToast('할일 저장 실패: '+m.slice(0,80),true);
  }
}});}
async function deleteInitiativeTask(id){const{error}=await sb.from('initiative_tasks').delete().eq('id',id);if(error)showToast('삭제 실패',true);}
function onIDLChange(p){const r=p.new||p.old;if(!r)return;if(isLocal('initiative_daily_logs',`${r.initiative_id}-${r.member_id}-${r.date}`))return;if(!state.initiativeDailyLogs[r.date])state.initiativeDailyLogs[r.date]={};if(!state.initiativeDailyLogs[r.date][r.member_id])state.initiativeDailyLogs[r.date][r.member_id]={};if(p.eventType==='DELETE'){delete state.initiativeDailyLogs[r.date][r.member_id][r.initiative_id];}else{state.initiativeDailyLogs[r.date][r.member_id][r.initiative_id]={checked:!!r.checked,note:r.note||''};}if(currentView==='today'&&r.date===viewingDate)scheduleRender();}
function onTeamsChange(p){const r=p.new||p.old;if(!r)return;if(isLocal('teams',r.id))return;if(p.eventType==='DELETE'){state.teams=state.teams.filter(t=>t.id!==r.id);}else{const i=state.teams.findIndex(t=>t.id===r.id);if(i>=0)state.teams[i]={...r};else state.teams.push({...r});state.teams.sort((a,b)=>(a.sort_order||0)-(b.sort_order||0));}scheduleRender();}
function onMembersChange(p){const r=p.new||p.old;if(r.team_id&&r.team_id!==state.currentTeamId)return;if(isLocal('members',r.id))return;if(p.eventType==='DELETE'){state.members=state.members.filter(m=>m.id!==r.id);}else{
  // v111 — is_admin/is_observer → isAdmin/isObserver 매핑 보존 (안 하면 실시간 갱신 시 관리자 권한 소실)
  const mapped={...r,isAdmin:!!r.is_admin,isObserver:!!r.is_observer};
  const i=state.members.findIndex(m=>m.id===r.id);if(i>=0)state.members[i]=mapped;else state.members.push(mapped);state.members.sort((a,b)=>(a.sort_order||0)-(b.sort_order||0));}if(['today','manage','eval'].includes(currentView))scheduleRender();}
function onObjectivesChange(p){const r=p.new||p.old;if(r.team_id&&r.team_id!==state.currentTeamId)return;if(isLocal('objectives',r.id))return;if(p.eventType==='DELETE'){state.objectives=state.objectives.filter(o=>o.id!==r.id);}else{const i=state.objectives.findIndex(o=>o.id===r.id);if(i>=0){Object.assign(state.objectives[i],{title:r.title,description:r.description,ownerId:r.owner_id,confidence:r.confidence||'mid',realityBlocker:r.reality_blocker||'',realityHelp:r.reality_help||''});}else{state.objectives.push({id:r.id,title:r.title,description:r.description||'',ownerId:r.owner_id,confidence:r.confidence||'mid',realityBlocker:r.reality_blocker||'',realityHelp:r.reality_help||'',keyResults:[]});expanded.add(r.id);}}scheduleRender();}
function onKRChange(p){const r=p.new||p.old;if(isLocal('key_results',r.id))return;const o=state.objectives.find(x=>x.id===r.objective_id);if(!o&&p.eventType!=='DELETE')return;if(p.eventType==='DELETE'){if(o)o.keyResults=o.keyResults.filter(k=>k.id!==r.id);}else{if(!o)return;const idx=o.keyResults.findIndex(k=>k.id===r.id);const exist=idx>=0?o.keyResults[idx].initiatives:[];const oldCur=idx>=0?o.keyResults[idx].current:null;const kr={id:r.id,title:r.title,target:Number(r.target||0),current:Number(r.current||0),unit:r.unit||'',ownerId:r.owner_id,dueDate:r.due_date,confidence:r.confidence||'mid',realityBlocker:r.reality_blocker||'',realityHelp:r.reality_help||'',initiatives:exist};if(idx>=0)o.keyResults[idx]=kr;else o.keyResults.push(kr);
  // 충돌 감지: 본인이 같은 KR을 입력 중이고 다른 사람이 current를 바꿨다면 경고
  const focusedKR=document.activeElement?.dataset?.krid;
  if(focusedKR===r.id && oldCur!==null && oldCur!==kr.current && r.last_progress_by){
    const who=state.members.find(m=>m.id===r.last_progress_by);
    showToast(`⚠ ${who?who.name:'다른 사용자'}가 이 KR 진척을 ${oldCur}→${kr.current}로 변경했습니다. 본인 입력 충돌 가능`,true);
  }
}scheduleRender();}
function onInitChange(p){
  const r=p.new||p.old;if(isLocal('initiatives',r.id))return;
  // v109 — 재배치(kr_id 변경)/삭제 시 중복 방지: 먼저 모든 KR 에서 제거
  state.objectives.forEach(o=>o.keyResults.forEach(k=>{k.initiatives=k.initiatives.filter(i=>i.id!==r.id);}));
  if(p.eventType!=='DELETE'){
    let kr=null;state.objectives.forEach(o=>o.keyResults.forEach(k=>{if(k.id===r.kr_id)kr=k;}));
    if(kr){kr.initiatives.push({id:r.id,title:r.title,ownerId:r.owner_id,status:r.status||'todo',dueDate:r.due_date,startDate:r.start_date||null,confidence:r.confidence||'mid',realityBlocker:r.reality_blocker||'',realityHelp:r.reality_help||''});}
  }
  // v111 — today 탭은 부분 갱신 (깜빡임 차단), 그 외(OKR/WBS 등 구조 변동)는 전체 render
  if(currentView==='today')_scheduleTodayBlocksRerender();
  else scheduleRender();
}
function onStandupChange(p){const r=p.new||p.old;if(!r)return;if(r.team_id&&r.team_id!==state.currentTeamId)return;if(isLocal('standups',`${r.team_id}-${r.date}`))return;ensureStandup(r.date);if(p.eventType!=='DELETE')state.standups[r.date].headline=r.headline||'';if(currentView==='today'&&r.date===viewingDate){const ta=document.querySelector(`textarea[data-field="headline"][data-date="${viewingDate}"]`);if(ta&&document.activeElement!==ta)ta.value=r.headline||'';}}
function onEntryChange(p){const r=p.new||p.old;if(!r)return;if(r.team_id&&r.team_id!==state.currentTeamId)return;if(isLocal('standup_entries',`${r.team_id}-${r.date}-${r.member_id}`))return;ensureStandup(r.date);if(p.eventType==='DELETE'){delete state.standups[r.date].entries[r.member_id];}else{state.standups[r.date].entries[r.member_id]={yesterday:r.yesterday||'',today:r.today||'',blockers:r.blockers||'',helper_member_id:r.helper_member_id||'',helper_name:r.helper_name||'',support_type:r.support_type||'',support_detail:r.support_detail||''};}if(currentView==='today'&&r.date===viewingDate){['yesterday','today','blockers'].forEach(f=>{const ta=document.querySelector(`textarea[data-field="standup"][data-mid="${r.member_id}"][data-fieldname="${f}"][data-date="${viewingDate}"]`);if(ta&&document.activeElement!==ta)ta.value=(state.standups[r.date].entries[r.member_id]||{})[f]||'';});const c=document.querySelector(`[data-member-card="${r.member_id}"]`);if(c){c.classList.remove('remote-edit');void c.offsetWidth;c.classList.add('remote-edit');setTimeout(()=>c.classList.remove('remote-edit'),1500);}updateBlockerUI(r.date,r.member_id);}}
function onRoutineChange(p){const r=p.new||p.old;if(r.team_id&&r.team_id!==state.currentTeamId)return;if(isLocal('routines',r.id))return;if(p.eventType==='DELETE'){state.routines=state.routines.filter(x=>x.id!==r.id);}else{const i=state.routines.findIndex(x=>x.id===r.id);if(i>=0)state.routines[i]={...r};else state.routines.push({...r});}scheduleRender();}
function onRoutineLogChange(p){const r=p.new||p.old;if(isLocal('routine_logs',`${r.routine_id}-${r.date}`))return;ensureRoutineLog(r.date);if(p.eventType==='DELETE'){delete state.routineLogs[r.date][r.routine_id];}else{state.routineLogs[r.date][r.routine_id]={completed:!!r.completed,note:r.note||''};}if(['today','routines'].includes(currentView)&&r.date===viewingDate)scheduleRender();}
function onReviewChange(p){const r=p.new||p.old;if(r.team_id&&r.team_id!==state.currentTeamId)return;if(isLocal('reviews',r.id))return;if(p.eventType==='DELETE'){state.reviews=state.reviews.filter(x=>x.id!==r.id);}else{const i=state.reviews.findIndex(x=>x.id===r.id);if(i>=0)state.reviews[i]={...r};else state.reviews.unshift({...r});}if(currentView==='eval')scheduleRender();}
function updateConnDot(){const e=document.getElementById('conn-dot');if(!e)return;e.className=`conn-dot ${connStatus}`;e.textContent=connStatus==='online'?'실시간 연결됨':connStatus==='connecting'?'연결 중':'오프라인';}

const debouncers={};
const _pendingFns={}; // v71 — 미실행 저장 함수 보관 (페이지 이탈 시 즉시 실행용)
function debouncedSave(k,fn,d=400){
  // v16 — 옵저버는 모든 DB 쓰기 우회 (UI만 동작, 기록 남기지 않음)
  if(typeof isObserverMode==='function'&&isObserverMode())return;
  _pendingFns[k]=fn;
  clearTimeout(debouncers[k]);debouncers[k]=setTimeout(async()=>{delete _pendingFns[k];markSaveStart();let err=false;try{await fn();}catch(e){err=true;}finally{markSaveEnd(err);}},d);
}
// v71 — 탭 숨김/새로고침 시 미처리 저장 즉시 실행
async function flushPendingSaves(){
  // v72 — 초기화 전 / 옵저버 모드 시 실행 안 함 (로그인 오류 방지)
  if(!initialized)return;
  if(typeof isObserverMode==='function'&&isObserverMode())return;
  const entries=Object.entries(_pendingFns);
  if(!entries.length)return;
  entries.forEach(([k])=>clearTimeout(debouncers[k]));
  Object.keys(_pendingFns).forEach(k=>delete _pendingFns[k]);
  try{await Promise.allSettled(entries.map(([,fn])=>fn()));}catch(e){}
}
// v72 — visibilitychange만 사용 (beforeunload는 async 미지원으로 제거)
document.addEventListener('visibilitychange',()=>{
  if(document.visibilityState==='hidden'&&initialized)flushPendingSaves();
});
async function logChange(et,eid,act,fn,bv,av,lb,category){
  // v16 — 옵저버는 audit 기록 남기지 않음
  if(typeof isObserverMode==='function'&&isObserverMode())return;
  // category: 'change' (의미 있는 변경, 기본) | 'check' (일일 체크 잡음 — 이력 모달에서 제외)
  try{await sb.from('audit_log').insert({team_id:state.currentTeamId,entity_type:et,entity_id:eid,entity_label:lb||'',action:act,field_name:fn||'',before_value:String(bv??''),after_value:String(av??''),category:category||'change'});}catch(e){}
}
async function saveTeam(t){debouncedSave(`tm-${t.id}`,async()=>{markLocal('teams',t.id);const{error}=await sb.from('teams').upsert({id:t.id,name:t.name,quarter:t.quarter,sort_order:t.sort_order||0});if(error)showToast('팀 저장 실패',true);});}
async function saveMember(m){debouncedSave(`mem-${m.id}`,async()=>{markLocal('members',m.id);const{error}=await sb.from('members').upsert({id:m.id,team_id:m.team_id||state.currentTeamId,name:m.name,role:m.role||'',color:m.color||'#6241F5',is_admin:!!m.isAdmin,is_observer:!!m.isObserver,sort_order:state.members.findIndex(x=>x.id===m.id)});if(error)showToast('팀원 저장 실패',true);});}
// v37 — 자식 일정이 부모 범위를 벗어나면 부모를 자동 확장 (절대 줄이지 않음)
function propagateParentDates(level,parentId,child){
  if(!child)return;
  if(level==='init'){
    let parentKR=null,parentO=null;
    for(const o of(state.objectives||[])){
      for(const k of(o.keyResults||[])){
        if(k.id===parentId){parentKR=k;parentO=o;break;}
      }
      if(parentKR)break;
    }
    if(!parentKR||!parentO)return;
    let changed=false;
    if(child.startDate&&(!parentKR.startDate||child.startDate<parentKR.startDate)){parentKR.startDate=child.startDate;changed=true;}
    if(child.dueDate&&(!parentKR.dueDate||child.dueDate>parentKR.dueDate)){parentKR.dueDate=child.dueDate;changed=true;}
    if(changed)saveKR(parentO.id,parentKR); // saveKR이 다시 O로 전파
  }else if(level==='kr'){
    const parentO=(state.objectives||[]).find(o=>o.id===parentId);
    if(!parentO)return;
    let changed=false;
    if(child.startDate&&(!parentO.startDate||child.startDate<parentO.startDate)){parentO.startDate=child.startDate;changed=true;}
    if(child.dueDate&&(!parentO.dueDate||child.dueDate>parentO.dueDate)){parentO.dueDate=child.dueDate;changed=true;}
    if(changed)saveObjective(parentO);
  }
}
async function saveObjective(o){debouncedSave(`obj-${o.id}`,async()=>{markLocal('objectives',o.id);const{error}=await sb.from('objectives').upsert({id:o.id,team_id:state.currentTeamId,title:o.title,description:o.description||'',owner_id:o.ownerId||null,confidence:o.confidence||'mid',reality_blocker:o.realityBlocker||'',reality_help:o.realityHelp||'',start_date:o.startDate||null,due_date:o.dueDate||null,sort_order:state.objectives.findIndex(x=>x.id===o.id)});if(error)showToast('Objective 저장 실패',true);});}
async function saveKR(oid,kr){propagateParentDates('kr',oid,kr);debouncedSave(`kr-${kr.id}`,async()=>{markLocal('key_results',kr.id);const o=state.objectives.find(x=>x.id===oid);const si=o?o.keyResults.findIndex(x=>x.id===kr.id):0;const me=selfMember();const{error}=await sb.from('key_results').upsert({id:kr.id,objective_id:oid,title:kr.title,target:kr.target,current:kr.current,unit:kr.unit||'',owner_id:kr.ownerId||null,start_date:kr.startDate||null,due_date:kr.dueDate||null,confidence:kr.confidence||'mid',reality_blocker:kr.realityBlocker||'',reality_help:kr.realityHelp||'',last_progress_by:me?me.id:null,last_progress_at:new Date().toISOString(),sort_order:si});if(error)showToast('KR 저장 실패',true);});}
async function saveInitiative(krId,init){propagateParentDates('init',krId,init);debouncedSave(`init-${init.id}`,async()=>{markLocal('initiatives',init.id);let kr=null;state.objectives.forEach(o=>o.keyResults.forEach(k=>{if(k.id===krId)kr=k;}));const si=kr?kr.initiatives.findIndex(i=>i.id===init.id):0;const{error}=await sb.from('initiatives').upsert({id:init.id,kr_id:krId,title:init.title,owner_id:init.ownerId||null,status:init.status||'todo',start_date:init.startDate||null,due_date:init.dueDate||null,confidence:init.confidence||'mid',reality_blocker:init.realityBlocker||'',reality_help:init.realityHelp||'',sort_order:si});if(error)showToast('이니셔티브 저장 실패',true);});}
async function saveHeadline(date,h){ensureStandup(date);state.standups[date].headline=h;debouncedSave(`hl-${date}`,async()=>{markLocal('standups',`${state.currentTeamId}-${date}`);const{error}=await sb.from('standups').upsert({team_id:state.currentTeamId,date,headline:h,updated_at:new Date().toISOString()},{onConflict:'team_id,date'});if(error)showToast('헤드라인 저장 실패',true);});}
async function saveEntry(date,mid,f,v){ensureStandup(date);if(!state.standups[date].entries[mid])state.standups[date].entries[mid]={yesterday:'',today:'',blockers:'',helper_member_id:'',helper_name:'',support_type:'',support_detail:''};state.standups[date].entries[mid][f]=v;debouncedSave(`en-${date}-${mid}`,async()=>{markLocal('standup_entries',`${state.currentTeamId}-${date}-${mid}`);const e=state.standups[date].entries[mid];const{error}=await sb.from('standup_entries').upsert({team_id:state.currentTeamId,date,member_id:mid,yesterday:e.yesterday||'',today:e.today||'',blockers:e.blockers||'',helper_member_id:e.helper_member_id||null,helper_name:e.helper_name||'',support_type:e.support_type||'',support_detail:e.support_detail||'',updated_at:new Date().toISOString()},{onConflict:'team_id,date,member_id'});if(error)showToast('스탠드업 저장 실패',true);});}
async function saveRoutine(r){debouncedSave(`rt-${r.id}`,async()=>{markLocal('routines',r.id);const{error}=await sb.from('routines').upsert({id:r.id,team_id:state.currentTeamId,title:r.title,description:r.description||'',owner_id:r.owner_id||null,frequency:r.frequency||'weekdays',days_of_week:r.days_of_week||[1,2,3,4,5],day_of_month:r.day_of_month||null,active:r.active!==false,sort_order:state.routines.findIndex(x=>x.id===r.id)});if(error)showToast('루틴 저장 실패',true);});}
async function saveRoutineLog(rid,date,c,n){ensureRoutineLog(date);state.routineLogs[date][rid]={completed:c,note:n!=null?n:(state.routineLogs[date][rid]?.note||'')};debouncedSave(`rtl-${rid}-${date}`,async()=>{markLocal('routine_logs',`${rid}-${date}`);const l=state.routineLogs[date][rid];const{error}=await sb.from('routine_logs').upsert({routine_id:rid,date,completed:!!l.completed,note:l.note||'',done_at:new Date().toISOString()},{onConflict:'routine_id,date'});if(error)showToast('루틴 기록 실패',true);});}
async function saveReview(r){markLocal('reviews',r.id);const{error}=await sb.from('reviews').upsert({id:r.id,team_id:state.currentTeamId,member_id:r.member_id||null,period:r.period,quarter:r.quarter,entity_type:r.entity_type||'member',entity_id:r.entity_id||r.member_id,what_worked:r.what_worked||'',what_struggled:r.what_struggled||'',what_learned:r.what_learned||'',next_try:r.next_try||'',summary:r.summary||'',reviewer:r.reviewer||'',updated_at:new Date().toISOString()});if(error){showToast('리뷰 저장 실패',true);return false;}return true;}
function lastReflectionFor(entityType,entityId,period){return state.reviews.find(r=>(r.entity_type||'member')===entityType && (r.entity_id||r.member_id)===entityId && r.period===period);}

function captureFocus(){
  const el=document.activeElement;
  if(!el||(el.tagName!=='INPUT'&&el.tagName!=='TEXTAREA'&&el.tagName!=='SELECT'))return null;
  const ds=el.dataset||{};
  // v67/v102 — 모든 data-* 속성을 캡처해 정확한 행/입력창에 포커스 복원 (특히 task-textarea/init-task-textarea)
  const sig={tag:el.tagName,attrs:{}};
  Object.keys(ds).forEach(k=>{
    const v=ds[k];
    // 길이 너무 긴 값(JSON 등) 또는 빈 값은 제외
    if(typeof v==='string'&&v.length>0&&v.length<200)sig.attrs[k]=v;
  });
  if(Object.keys(sig.attrs).length===0)return null;
  try{sig.selStart=el.selectionStart;sig.selEnd=el.selectionEnd;}catch(e){}
  // v102 — 입력 중 값 캡처: 재렌더 후 state 미반영분 복원
  try{if(el.tagName==='INPUT'||el.tagName==='TEXTAREA')sig.value=el.value;}catch(e){}
  return sig;
}
function restoreFocus(sig){
  if(!sig)return;
  const parts=[sig.tag.toLowerCase()];
  Object.entries(sig.attrs).forEach(([k,v])=>{
    // dataset camelCase → kebab-case 변환
    const attrName=k.replace(/[A-Z]/g,c=>'-'+c.toLowerCase());
    parts.push(`[data-${attrName}="${String(v).replace(/"/g,'\\"')}"]`);
  });
  const sel=parts.join('');
  const el=document.querySelector(sel);
  if(el){
    el.focus();
    // v102 — 입력 중이던 값 복원 (rerender 사이 키 입력 손실 방지)
    if(sig.value!=null&&(el.tagName==='INPUT'||el.tagName==='TEXTAREA')&&el.value!==sig.value&&sig.value.length>el.value.length){
      try{el.value=sig.value;}catch(e){}
    }
    if(sig.selStart!=null){try{el.setSelectionRange(sig.selStart,sig.selEnd);}catch(e){}}
  }
}
// v42 — realtime 이벤트 폭주 시 render() 합치기 (한 프레임에 1회만)
let _renderScheduled=false;
let _lastRenderAt=0;const RENDER_MIN_GAP_MS=400; // v108 — 좀 더 적극적 throttle (팀원 끊김 완화)
// v107 — PIN 인증 진행 중에는 render 지연 (이슈: PIN 확인 도중 비동기 echo 가 login wall 을 다시 그림)
window._pinVerifyInFlight=false;
// v108 — render 의 모든 진입점에서 PIN 인증 진행중을 점검 (단일 가드)
function _renderGuarded(){
  if(window._pinVerifyInFlight){
    // 인증 완료까지 폴링 (단, 인증이 완료되면 즉시 1회 render)
    setTimeout(_renderGuarded,60);
    return;
  }
  render();
}
function scheduleRender(){
  if(_renderScheduled)return;
  if(window._pinVerifyInFlight){
    _renderScheduled=true;
    setTimeout(()=>{_renderScheduled=false;scheduleRender();},80);
    return;
  }
  // v102 — 사용자가 입력 중이면 blur 전까지 렌더 지연 (깜빡임/입력 손실 방지)
  const ae=document.activeElement;
  if(ae&&(ae.tagName==='INPUT'||ae.tagName==='TEXTAREA')&&!ae._blurRenderPending){
    ae._blurRenderPending=true;
    _renderScheduled=true;
    const onBlur=()=>{
      ae._blurRenderPending=false;
      _renderScheduled=false;
      // 사용자가 blur 한 직후에만 렌더 (포커스가 다른 입력으로 옮겨갔으면 또 지연)
      requestAnimationFrame(()=>{
        const ae2=document.activeElement;
        if(ae2&&(ae2.tagName==='INPUT'||ae2.tagName==='TEXTAREA'))scheduleRender();
        else _throttledRender();
      });
    };
    ae.addEventListener('blur',onBlur,{once:true});
    return;
  }
  _renderScheduled=true;
  requestAnimationFrame(()=>{_renderScheduled=false;_throttledRender();});
}
// v104 — 250ms 내 여러 번 호출되면 한 번만 렌더 (탭/헤더 깜빡임 차단)
let _throttleTimer=null;
function _throttledRender(){
  // v108 — PIN 인증 중이면 throttle 도 차단
  if(window._pinVerifyInFlight){setTimeout(_throttledRender,60);return;}
  const now=Date.now();const gap=now-_lastRenderAt;
  if(gap>=RENDER_MIN_GAP_MS){_lastRenderAt=now;render();return;}
  if(_throttleTimer)return;
  _throttleTimer=setTimeout(()=>{
    _throttleTimer=null;_lastRenderAt=Date.now();
    if(window._pinVerifyInFlight){_throttledRender();return;}
    render();
  },RENDER_MIN_GAP_MS-gap);
}
function render(){
  if(!initialized)return;
  // v16 — 로그인 가드: 본인 미선택 또는 PIN 만료 시 콘텐츠 차단
  if(!state.selfId||(state.selfId!=='__observer__'&&!isPinAuthValid(state.selfId))){
    renderLoginWall();return;
  }
  const focusSig=captureFocus();
  const app=document.getElementById('app');
  let html=renderHeader();
  html+='<main class="view">';
  if(dateLoading){html+='<div class="empty"><div class="loading-spinner" style="margin:0 auto 12px;"></div>날짜 데이터 불러오는 중…</div>';}
  else if(currentView==='today')html+=renderToday();
  else if(currentView==='dashboard')html+=renderDashboard();
  else if(currentView==='okr')html+=renderOKR();
  else if(currentView==='routines')html+=renderRoutinesView();
  else if(currentView==='eval')html+=renderEval();
  else if(currentView==='wbs')html+=renderWBS();
  else html+=renderManage();
  html+='</main>';
  const t=currentTeam();
  html+=`<footer class="app-footer"><span>실시간 동기화 · ${esc(t?t.name:'')} · ${esc(t?t.quarter:'')}</span><span style="margin-left:auto;"><button class="btn-mode" data-act="reset-config">설정 변경</button></span></footer>`;
  // v16 — 옵저버 모드 시각 배너 + 1시간 자동 로그아웃 남은 시간
  if(typeof isObserverMode==='function'&&isObserverMode()){
    let remainTxt='';
    try{
      const o=JSON.parse(localStorage.getItem(PIN_AUTH_KEY)||'{}');
      const a=o[state.selfId];
      if(a){
        const remainMin=Math.max(0,Math.ceil((a+60*60*1000-Date.now())/60000));
        remainTxt=` · 약 ${remainMin}분 후 자동 로그아웃`;
      }
    }catch(e){}
    html=`<div style="background:linear-gradient(90deg,#6B7280,#4B5563);color:white;font-size:12px;font-weight:700;padding:6px 16px;display:flex;align-items:center;justify-content:center;gap:8px;">👁️ 옵저버 모드 — 변경 사항은 화면에서만 보이고 저장되지 않습니다${remainTxt}</div>`+html;
  }
  app.innerHTML=html;
  document.body.classList.toggle('present',presentMode);
  restoreFocus(focusSig);
  // v13 — 모든 자동 확장 textarea 즉시 적용 (data-autogrow + data-krl-autogrow 통합)
  // 다중 timing — 첫 페인트 후 즉시 + 다음 프레임 + 200ms 후 (콘텐츠 lazy load 대응)
  // v13 — 자동 확장 textarea 적용 (rAF 1회 — layout thrashing 최소화)
  requestAnimationFrame(()=>{
    document.querySelectorAll('textarea[data-autogrow], textarea[data-krl-autogrow]').forEach(el=>{
      el.style.height='auto';el.style.height=(el.scrollHeight+2)+'px';
    });
  });
}

function renderHeader(){
  const t=currentTeam();const ini=teamInitial(t?.name);const col=teamColor(t);
  const tm=state.teams.map(x=>`<div class="team-menu-item ${x.id===state.currentTeamId?'active':''}" data-act="switch-team" data-tid="${x.id}"><span style="width:14px;height:14px;border-radius:4px;background:${teamColor(x)};display:inline-block;"></span><span style="flex:1;">${esc(x.name)}</span><span style="font-size:11px;color:var(--text-soft);">${esc(x.quarter)}</span></div>`).join('');
  return `<header class="app-header"><div class="hdr-inner"><div style="display:flex;align-items:center;gap:8px;position:relative;"><div class="brand" data-act="goto-home"><div class="brand-mark" style="background:${col};">${esc(ini)}</div><div class="brand-meta"><div class="brand-title">${esc(t?t.name:'팀')} OKR <button class="team-switch" data-act="toggle-team-menu">${state.teams.length>1?'전환 ▾':'팀 ▾'}</button></div><div class="brand-sub">${esc(t?t.quarter:'')} · 일일 스프린트</div></div></div><div class="team-menu" id="team-menu">${tm}<div class="team-menu-divider"></div><div class="team-menu-add" data-act="add-team">${I.plus} 새 팀 추가</div></div></div><nav class="tabs"><span id="conn-dot" class="conn-dot ${connStatus}">${connStatus==='online'?'실시간 연결됨':connStatus==='connecting'?'연결 중':'오프라인'}</span><button class="btn-mode" data-act="open-self-picker" title="본인 변경" style="font-size:11px;">${selfMember()?(selfMember().isObserver?'👁 옵저버':'👤 '+esc(selfMember().name)):'본인 선택'}</button>${selfMember()?renderHelpBell():''}<span class="tab-divider"></span><button class="tab ${currentView==='today'?'active':''}" data-act="view" data-view="today">${I.cal} 오늘</button><button class="tab ${currentView==='dashboard'?'active':''}" data-act="view" data-view="dashboard">📊 대시보드</button><button class="tab ${currentView==='okr'?'active':''}" data-act="view" data-view="okr">${I.target} OKR</button><button class="tab ${currentView==='wbs'?'active':''}" data-act="view" data-view="wbs">🗓️ WBS</button><button class="tab ${currentView==='routines'?'active':''}" data-act="view" data-view="routines">${I.loop} 루틴</button><button class="tab ${currentView==='eval'?'active':''}" data-act="view" data-view="eval">${I.star} 리뷰</button><button class="tab ${currentView==='manage'?'active':''}" data-act="view" data-view="manage">${I.cog} 관리${isAdmin()?' · 관리자':''}</button><span class="tab-divider"></span><button class="btn-mode" data-act="present">${presentMode?I.collapse:I.expand} ${presentMode?'일반':'발표'}</button><button class="btn-mode" data-act="toggle-dark" title="다크 모드">${isDark()?'☀️':'🌙'}</button><a class="btn-mode" href="okr/" title="MS-DOS 터미널 버전으로 전환" style="text-decoration:none;">⌨ 터미널</a></nav></div></header>`;
}

function renderToday(){
  const date=viewingDate;const isToday=date===todayKey();
  // v111 — 최근 30일 스탠드업 백그라운드 로드 (이전엔 7일이라 마지막 작성이 7일보다 오래되면 '최근 한 일'이 비었음)
  try{ensureRecentStandupsLoaded(date,30);}catch(e){}
  const standup=state.standups[date]||{headline:'',entries:{}};
  const allKR=[];state.objectives.forEach(o=>o.keyResults.forEach(k=>allKR.push({...k,objId:o.id})));
  const overall=allKR.length?Math.round(allKR.reduce((s,k)=>s+pct(k.current,k.target),0)/allKR.length):0;
  const blockers=Object.values(standup.entries||{}).filter(e=>e?.blockers?.trim()).length;
  const todayRoutines=isToday?activeRoutinesForDate(date):[];
  const rl=state.routineLogs[date]||{};
  const doneCnt=todayRoutines.filter(r=>rl[r.id]?.completed).length;
  const dueItems=collectDueThisWeek();
  const self=selfMember();
  // v12 — 발표 모드: 한 화면 + 사람별 전환
  if(presentMode&&state.members.length>0){
    // v22 — 옵저버만 있는 경우에도 renderTodayPresent가 안내 처리
    return renderTodayPresent(date,isToday,standup,todayRoutines,rl);
  }
  // v23 — 날짜 옆 담당자 아이콘 (좌클릭: 카드로 점프 · 우클릭: 메시지 — 추후)
  const dateBarMembers=state.members.filter(m=>!m.isObserver);
  const memberIconsHtml=dateBarMembers.length>0?`<span class="date-bar-members" title="아이콘 클릭 시 해당 팀원 카드로 이동">${dateBarMembers.map(m=>`<button class="date-bar-member-icon" data-act="jump-to-member" data-mid="${m.id}" style="background:${m.color||'#6241F5'};" title="${esc(m.name)} — 클릭: 카드로 이동">${esc(m.name.slice(0,1).toUpperCase())}</button>`).join('')}</span>`:'';
  return `<div class="date-bar"><button class="date-nav-btn" data-act="date-shift" data-delta="-1">${I.chevLeft}</button><input type="date" class="date-input" value="${date}" data-act="date-set"><button class="date-nav-btn" data-act="date-shift" data-delta="1">${I.chevRight}</button>${(()=>{const W=['일','월','화','수','목','금','토'];const dw=new Date(date+'T00:00:00').getDay();const col=dw===0?'var(--warning)':dw===6?'#4F6FE5':'var(--text-soft)';return `<span class="date-dow" style="font-size:13px;font-weight:700;color:${col};white-space:nowrap;margin-right:2px;">${W[dw]}요일</span>`;})()}${isToday?'<span class="today-tag">오늘</span>':`<span class="past-tag">${date<todayKey()?'지난 회의':'미래 날짜'}</span><button class="btn btn-soft" data-act="date-today">오늘로</button>`}${memberIconsHtml}</div>
  ${renderObjectivePairRow()}
  ${dueItems.length>0?`<section class="card card-section"><div class="section-head"><span style="color:var(--amber);">${I.flag}</span><span class="section-title">이번 주 마감 (${dueItems.length}건)</span></div>${dueItems.map(d=>`<div style="padding:8px 0;display:flex;align-items:center;gap:10px;border-bottom:1px solid #F4F4F5;font-size:13px;"><span style="font-size:11px;padding:2px 8px;border-radius:999px;background:${d.type==='kr'?'#EEEAFE':'#F4F4F5'};color:${d.type==='kr'?C.primary:C.textSoft};font-weight:700;">${d.type==='kr'?'KR':'Init'}</span><span style="flex:1;">${esc(d.title)}</span><span style="font-size:11.5px;color:${isOverdue(d.dueDate,d.status)?C.warning:C.textSoft};font-weight:600;">${dueShort(d.dueDate)}${isOverdue(d.dueDate,d.status)?' · 지연':''}</span></div>`).join('')}</section>`:''}
  <div class="card-section"><div class="section-head"><span style="color:var(--primary);">${I.msg}</span><span class="section-title">${isToday?'오늘의 스탠드업':`${date} 스탠드업`}</span><span class="section-meta">· 어제 / 오늘 / 막힘</span></div>${state.members.filter(m=>!m.isObserver).length===0?'<div class="empty">팀원을 먼저 등록해주세요. <strong>관리</strong> 탭에서 추가할 수 있습니다.</div>':`<div class="member-grid">${state.members.filter(m=>!m.isObserver).map(m=>renderMemberCard(m,standup.entries?.[m.id]||{})).join('')}</div>`}</div>
${''/* v15 — Initiative는 매일의 할 일에 표시하지 않음 (OKR 탭에서 관리) */}
  ${isToday&&todayRoutines.length>0?`<section class="card card-section"><div class="section-head"><span style="color:var(--primary);">${I.loop}</span><span class="section-title">오늘의 루틴</span><span class="section-meta">· 매일 챙겨야 할 일</span></div>${renderRoutinesByMember(todayRoutines,rl)}</section>`:''}`;
}

// v12 — 발표 모드 (사람별 전환, 한 화면 fit)
// v22 — 옵저버는 발표할 일이 없으므로 발표 모드 명단에서 제외
function presentableMembers(){return state.members.filter(m=>!m.isObserver);}
function renderTodayPresent(date,isToday,standup,todayRoutines,rl){
  const members=presentableMembers();
  if(members.length===0){
    return `<div class="date-bar"><button class="date-nav-btn" data-act="date-shift" data-delta="-1">${I.chevLeft}</button><input type="date" class="date-input" value="${date}" data-act="date-set"><button class="date-nav-btn" data-act="date-shift" data-delta="1">${I.chevRight}</button>${isToday?'<span class="today-tag">오늘</span>':`<span class="past-tag">${date<todayKey()?'지난 회의':'미래 날짜'}</span><button class="btn btn-soft" data-act="date-today">오늘로</button>`}<span style="margin-left:auto;font-size:11px;color:var(--text-soft);font-weight:600;">발표 모드</span></div><div class="empty">발표할 팀원이 없습니다. (옵저버만 등록되어 있음)</div>`;
  }
  // presentMid 유효성 검증 — 메인 화면 최하단 팀원부터 (members 배열 마지막)
  if(!presentMid||!members.find(m=>m.id===presentMid)){
    presentMid=members[members.length-1].id;
  }
  const curIdx=members.findIndex(m=>m.id===presentMid);
  const cur=members[curIdx];
  const prevIdx=curIdx>0?curIdx-1:members.length-1;
  const nextIdx=curIdx<members.length-1?curIdx+1:0;
  const prev=members[prevIdx];
  const next=members[nextIdx];
  const entry=standup.entries?.[cur.id]||{};
  // 진척 보기 좋게 — KR 진행
  const memberRoutines=todayRoutines.filter(r=>r.owner_id===cur.id);
  return `<div class="date-bar"><button class="date-nav-btn" data-act="date-shift" data-delta="-1">${I.chevLeft}</button><input type="date" class="date-input" value="${date}" data-act="date-set"><button class="date-nav-btn" data-act="date-shift" data-delta="1">${I.chevRight}</button>${isToday?'<span class="today-tag">오늘</span>':`<span class="past-tag">${date<todayKey()?'지난 회의':'미래 날짜'}</span><button class="btn btn-soft" data-act="date-today">오늘로</button>`}<span style="margin-left:auto;font-size:11px;color:var(--text-soft);font-weight:600;">발표 모드 · ${curIdx+1}/${members.length}</span></div>
  <div class="present-member-nav">
    <button class="present-arrow" data-act="present-prev" title="이전 팀원 (${esc(prev.name)})">${I.chevLeft}</button>
    ${members.map(m=>{
      const e=standup.entries?.[m.id]||{};
      const filled=(e.yesterday||'').trim()||(e.today||'').trim()||(e.blockers||'').trim();
      return `<button class="present-member-btn ${m.id===cur.id?'active':''}" data-act="present-set" data-mid="${m.id}">
        <span class="avatar" style="background:${m.color||'#6241F5'};">${esc(m.name.slice(0,1).toUpperCase())}</span>
        <span>${esc(m.name)}</span>
        ${filled?`<span style="font-size:9px;color:${m.id===cur.id?'white':'var(--growth)'};font-weight:800;margin-left:2px;">●</span>`:''}
        ${e.blockers&&e.blockers.trim()?`<span style="font-size:11px;margin-left:2px;">⚠</span>`:''}
      </button>`;
    }).join('')}
    <button class="present-arrow" data-act="present-next" title="다음 팀원 (${esc(next.name)})">${I.chevRight}</button>
  </div>
  ${renderMemberCard(cur,entry)}
  ${memberRoutines.length>0?`<section class="card card-section" style="margin-top:10px;"><div class="section-head"><span style="color:var(--primary);">${I.loop}</span><span class="section-title">${esc(cur.name)}님 오늘의 루틴</span><span class="section-meta">· ${memberRoutines.length}건</span></div>${memberRoutines.map(r=>renderRoutineCheck(r,rl[r.id]||{})).join('')}</section>`:''}`;
}
// ============================================================
// Initiative My Items — 오늘 화면 하단 본인 담당 Initiative 통합 뷰
// ============================================================
let myInitFilter='all'; // all | todo | doing | blocked | done
function renderMyInitiatives(self){
  // 본인 담당 Initiative 모음 + 부모 KR 정보
  const list=[];
  state.objectives.forEach(o=>o.keyResults.forEach(k=>k.initiatives.forEach(i=>{
    if(i.ownerId===self.id) list.push({...i, krId:k.id, krTitle:k.title, krCurrent:k.current, krTarget:k.target, krUnit:k.unit, krConfidence:k.confidence, objId:o.id, objTitle:o.title});
  })));
  if(list.length===0) return '';
  // 상태별 카운트
  const cnt={all:list.length,todo:0,doing:0,done:0,blocked:0};
  list.forEach(i=>{cnt[i.status||'todo']++;});
  // 필터 적용
  const filtered=myInitFilter==='all'?list:list.filter(i=>(i.status||'todo')===myInitFilter);
  // 정렬: 막힘 → 진행 → 할일 → 완료, 그 안에서 마감 임박순
  const order={blocked:0,doing:1,todo:2,done:3};
  filtered.sort((a,b)=>{
    const sa=order[a.status||'todo'],sb=order[b.status||'todo'];
    if(sa!==sb)return sa-sb;
    if(a.dueDate&&b.dueDate)return a.dueDate.localeCompare(b.dueDate);
    if(a.dueDate)return -1;if(b.dueDate)return 1;
    return 0;
  });
  const chips=[['all','전체',cnt.all],['todo','할 일',cnt.todo],['doing','진행',cnt.doing],['blocked','막힘',cnt.blocked],['done','완료',cnt.done]];
  return `<section class="card card-section">
    <div class="section-head" style="justify-content:space-between;flex-wrap:wrap;gap:8px;">
      <div style="display:flex;align-items:center;gap:8px;"><span style="color:var(--primary);">⚡</span><span class="section-title">내 Initiative 전체</span><span class="section-meta">· ${esc(self.name)}님 담당 ${list.length}건</span></div>
      <div style="display:flex;gap:4px;flex-wrap:wrap;">${chips.map(([k,l,c])=>`<button class="btn-mode" style="${myInitFilter===k?'background:var(--primary-soft);color:var(--primary);font-weight:700;':''}padding:4px 10px;font-size:11.5px;" data-act="my-init-filter" data-filter="${k}">${l} ${c>0?`<span style="background:${myInitFilter===k?'white':'var(--line)'};color:${myInitFilter===k?'var(--primary)':'var(--text-soft)'};padding:0 5px;border-radius:999px;font-size:10px;font-weight:700;margin-left:3px;">${c}</span>`:''}</button>`).join('')}</div>
    </div>
    <div style="font-size:11px;color:var(--text-soft);margin-bottom:10px;line-height:1.5;">📌 OKR 정신 유지 — 각 Initiative는 부모 KR과 함께 표시됩니다. 클릭 시 OKR 탭에서 해당 위치로 이동.</div>
    ${filtered.length===0?'<div style="font-size:13px;color:var(--text-soft);padding:12px;text-align:center;">이 필터에 해당하는 Initiative가 없습니다.</div>':filtered.map(i=>renderMyInitItem(i)).join('')}
  </section>`;
}
function renderMyInitItem(i){
  const stClr={todo:'var(--text-soft)',doing:'var(--primary)',done:'var(--growth)',blocked:'var(--warning)'}[i.status||'todo'];
  const stBg={todo:'#F4F4F5',doing:'var(--primary-soft)',done:'var(--growth-soft)',blocked:'var(--warning-soft)'}[i.status||'todo'];
  const overdue=isOverdue(i.dueDate,i.status);
  const krPct=pct(i.krCurrent,i.krTarget);
  return `<div style="padding:11px 14px;border:1px solid var(--line);border-radius:10px;margin-bottom:8px;background:white;display:grid;grid-template-columns:auto 1fr auto;gap:12px;align-items:center;">
    <span style="font-size:11px;font-weight:700;padding:3px 9px;border-radius:999px;background:${stBg};color:${stClr};white-space:nowrap;">${STATUS_LABELS[i.status||'todo']}</span>
    <div style="min-width:0;">
      <div style="font-size:13.5px;font-weight:600;line-height:1.4;${i.status==='done'?'color:var(--text-soft);text-decoration:line-through;':''}">${esc(i.title||'(제목 없음)')}</div>
      <div style="font-size:11px;color:var(--text-soft);margin-top:3px;line-height:1.4;">↳ <span style="color:var(--primary);">KR:</span> ${esc(i.krTitle)} <span style="color:${progressColor(krPct)};font-weight:700;">${krPct}%</span> · <span style="opacity:.7;">${esc(i.objTitle.slice(0,40))}${i.objTitle.length>40?'…':''}</span></div>
    </div>
    <div style="display:flex;align-items:center;gap:8px;">
      ${i.dueDate?`<span style="font-size:11px;font-weight:600;color:${overdue?'var(--warning)':'var(--text-soft)'};">${dueShort(i.dueDate)}${overdue?' 지연':''}</span>`:''}
      <button class="btn-icon" data-act="jump-to-kr" data-oid="${i.objId}" data-krid="${i.krId}" title="OKR 탭으로 이동">→</button>
    </div>
  </div>`;
}
function renderKRStrip(allKR){if(allKR.length===0)return '<div style="font-size:13px;color:var(--text-soft);">아직 등록된 KR이 없습니다.</div>';return allKR.map(kr=>{const p=pct(kr.current,kr.target);const o=state.members.find(m=>m.id===kr.ownerId);return `<div class="kr-strip-row"><div class="kr-strip-head"><div style="display:flex;align-items:center;gap:8px;min-width:0;"><span class="kr-strip-title">${esc(kr.title)}</span>${o?`<span class="kr-strip-owner">${esc(o.name)}</span>`:''}<span class="conf-chip ${kr.confidence||'mid'}" style="cursor:default;">${CONF_LABELS[kr.confidence||'mid']}</span></div><div class="kr-strip-meta">${kr.dueDate?`<span class="kr-strip-num" style="color:${isOverdue(kr.dueDate)?C.warning:C.textSoft};">${dueShort(kr.dueDate)}</span>`:''}<span class="kr-strip-num">${kr.current} / ${kr.target} ${esc(kr.unit||'')}</span><span class="kr-strip-pct" style="color:${progressColor(p)};">${p}%</span></div></div><div class="progress-track"><div class="progress-fill" style="width:${p}%;background:${progressColor(p)};"></div></div></div>`;}).join('');}

// v11 — 오늘 화면: 1번/2번 OKR 좌우 배치 + 각 KR 진척도 인라인 입력
function renderInlineKRRow(kr,oid,idx){
  const p=pct(kr.current,kr.target);
  const o=state.members.find(m=>m.id===kr.ownerId);
  const overdue=isOverdue(kr.dueDate);
  const inits=kr.initiatives||[];
  // v84 — KR별 이니셔티브 펼침 상태 (기본: 접힘)
  if(!window._krInitOpen)window._krInitOpen=new Set();
  const isInitOpen=window._krInitOpen.has(kr.id);
  // v84 — 접힘 상태면 이니셔티브 숨김
  const initsHtml=(inits.length>0&&isInitOpen)?`
    <div class="kr-init-inline" style="margin-top:8px;padding:6px 10px;background:#FAFAFB;border-left:3px solid #D9CFFB;border-radius:0 6px 6px 0;">
      <div style="font-size:10px;color:var(--text-soft);font-weight:700;letter-spacing:.3px;margin-bottom:4px;">⚡ INITIATIVES · ${inits.length}건</div>
      ${inits.map(i=>{
        const st=i.status||'todo';
        const stColors={doing:{bg:'#EEEAFE',fg:'#6241F5'},done:{bg:'#E6F6EE',fg:'#30AB62'},blocked:{bg:'#FCE8E9',fg:'#E5484D'}};
        const sc=stColors[st];
        // v16 — 다중 담당자 표시
        const ownDisp=initOwnersDisplay(i);
        const iOver=isOverdue(i.dueDate,st);
        // v15 — '할 일'(todo) 상태는 칩 숨김 (중복 표현 제거)
        const chip=sc?`<span style="font-size:10px;padding:1px 7px;border-radius:999px;background:${sc.bg};color:${sc.fg};font-weight:700;flex-shrink:0;white-space:nowrap;">${STATUS_LABELS[st]}</span>`:'';
        return `<div style="display:flex;align-items:center;gap:6px;padding:3px 0;font-size:12px;line-height:1.45;">
          ${chip}
          <span style="flex:1;min-width:0;color:${st==='done'?'var(--text-soft)':'var(--text)'};${st==='done'?'text-decoration:line-through;':''};overflow:hidden;text-overflow:ellipsis;white-space:nowrap;" title="${esc(i.title||'')}">${esc(i.title||'(제목 없음)')}</span>
          ${i.ownerId?`<span style="font-size:10.5px;color:${ownDisp.color};font-weight:600;flex-shrink:0;">${esc(ownDisp.text)}</span>`:''}
          ${i.dueDate?`<span style="font-size:10px;color:${iOver?'var(--warning)':'var(--text-soft)'};font-weight:600;flex-shrink:0;">${dueShort(i.dueDate)}${iOver?'·지연':''}</span>`:''}
        </div>`;
      }).join('')}
    </div>`:'';
  // v59 — KR 번호 칩 (KR1/KR2/…) 맨앞에 추가
  const idxBadge=(typeof idx==='number')?`<span style="font-size:10.5px;padding:2px 8px;border-radius:999px;background:var(--primary-soft);color:var(--primary);font-weight:800;flex-shrink:0;letter-spacing:.3px;">KR${idx+1}</span>`:'';
  // v57 — KR 행 1줄 통합 (좁으면 가로 스크롤). 제목/입력/진척바/%/신뢰도/마감 모두 한 줄에
  return `<div class="kr-inline-row" data-kr-id="${kr.id}" style="padding:12px 0;border-bottom:1px solid #F4F4F5;">
    <div style="display:flex;align-items:center;gap:8px;flex-wrap:nowrap;overflow-x:auto;scrollbar-width:none;line-height:1.6;">
      ${idxBadge}<span class="kr-inline-title" style="font-size:14px;font-weight:700;color:var(--text);flex:1 1 auto;min-width:0;line-height:1.6;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;padding:1px 2px;" title="${esc(kr.title||'')}">${esc(kr.title||'(제목 없음)')}</span>
      <button class="kr-step" data-act="kr-step" data-delta="-1" data-oid="${oid}" data-krid="${kr.id}" title="진척 -1" tabindex="-1">−</button>
      <input type="number" class="kr-num-input" data-field="kr-current" data-oid="${oid}" data-krid="${kr.id}" value="${kr.current}" title="현재값 입력 (바를 클릭/드래그해도 됩니다)" style="width:52px;font-size:13px;padding:5px 6px;font-weight:700;flex-shrink:0;text-align:center;" />
      <button class="kr-step" data-act="kr-step" data-delta="1" data-oid="${oid}" data-krid="${kr.id}" title="진척 +1" tabindex="-1">＋</button>
      <span style="color:var(--text-soft);font-size:12px;flex-shrink:0;">/</span>
      <span style="font-size:12.5px;color:var(--text-soft);font-weight:600;flex-shrink:0;white-space:nowrap;">${kr.target}${kr.unit?' '+esc(kr.unit):''}</span>
      <div class="progress-track" data-kr-bar-wrap title="클릭 또는 드래그로 진척 입력" style="flex:1 1 auto;min-width:70px;height:8px;border-radius:4px;background:#F0F0F2;overflow:hidden;margin:0 4px;"><div class="progress-fill" data-kr-bar style="width:${p}%;height:100%;background:${progressColor(p)};transition:width .2s;"></div></div>
      <span class="kr-strip-pct" data-kr-pct style="color:${progressColor(p)};font-weight:800;font-size:14px;flex-shrink:0;min-width:38px;text-align:right;">${p}%</span>
      <span class="conf-chip ${kr.confidence||'mid'}" style="cursor:default;font-size:10.5px;padding:1px 7px;flex-shrink:0;">${CONF_LABELS[kr.confidence||'mid']}</span>
      ${kr.dueDate?`<span style="font-size:11px;color:${overdue?'var(--warning)':'var(--text-soft)'};font-weight:600;flex-shrink:0;white-space:nowrap;">${dueShort(kr.dueDate)}${overdue?'·지연':''}</span>`:''}
      ${inits.length>0?`<button class="btn-mode" data-act="toggle-kr-init" data-krid="${kr.id}" title="이니셔티브 ${isInitOpen?'접기':'펼치기'}" style="font-size:10.5px;padding:1px 7px;flex-shrink:0;background:${isInitOpen?'var(--primary-soft)':'transparent'};color:var(--primary);border:1px solid #D9CFFB;">⚡ ${inits.length} ${isInitOpen?'▲':'▼'}</button>`:''}
    </div>
    ${initsHtml}
  </div>`;
}
function renderObjectivePanel(o,slotIdx){
  if(!o){
    return `<section class="card" style="margin:0;min-height:200px;display:flex;flex-direction:column;align-items:center;justify-content:center;color:var(--text-soft);font-size:13px;border:1px dashed var(--line);background:#FAFAFB;">
      <div style="font-size:24px;margin-bottom:6px;opacity:.5;">○</div>
      <div style="font-weight:700;margin-bottom:4px;">${slotIdx===0?'1번':'2번'} Objective 자리</div>
      <div style="font-size:12px;">OKR 탭에서 Objective를 추가하세요.</div>
    </section>`;
  }
  const krs=o.keyResults||[];
  const objAvg=krs.length?Math.round(krs.reduce((s,k)=>s+pct(k.current,k.target),0)/krs.length):0;
  // v56 — 'KR N개' 라인 제거. 평균 진척 뱃지에 (N) 작게 통합.
  return `<section class="card" style="margin:0;display:flex;flex-direction:column;">
    <div class="section-head" style="align-items:flex-start;gap:8px;">
      <span style="color:var(--primary);flex-shrink:0;margin-top:2px;">${I.target}</span>
      <span class="section-title obj-shimmer" style="line-height:1.45;flex:1;min-width:0;font-size:16px;">${esc(o.title||'(Objective 미작성)')}</span>
      <span style="font-size:11.5px;color:var(--text-soft);font-weight:600;flex-shrink:0;text-align:right;">평균 <strong style="color:${progressColor(objAvg)};font-size:13px;">${objAvg}%</strong><br><span style="font-size:10px;opacity:.7;">KR ${krs.length}</span></span>
    </div>
    <div style="flex:1;">
      ${krs.length===0?'<div style="font-size:13px;color:var(--text-soft);padding:14px 0;text-align:center;">KR을 추가하세요.</div>':krs.map((k,i)=>renderInlineKRRow(k,o.id,i)).join('')}
    </div>
  </section>`;
}
// v56 — Objective 1개일 때 OKR 탭급 크기로 풀폭 표시
function renderObjectiveSolo(o){
  const krs=o.keyResults||[];
  const objAvg=krs.length?Math.round(krs.reduce((s,k)=>s+pct(k.current,k.target),0)/krs.length):0;
  return `<section class="card obj-solo" style="margin:0;">
    <div style="display:flex;align-items:flex-start;gap:14px;padding-bottom:14px;border-bottom:1px solid var(--line);margin-bottom:10px;">
      <span style="color:var(--primary);flex-shrink:0;margin-top:8px;">${I.target}</span>
      <div style="flex:1;min-width:0;">
        <div class="obj-shimmer" style="font-size:28px;font-weight:900;letter-spacing:-0.6px;line-height:1.25;">${esc(o.title||'(Objective 미작성)')}</div>
        ${o.description?`<div style="font-size:13.5px;color:var(--text-soft);margin-top:8px;font-style:italic;line-height:1.55;">${esc(o.description)}</div>`:''}
      </div>
      <div style="text-align:right;flex-shrink:0;">
        <div style="font-size:11px;color:var(--text-soft);font-weight:600;letter-spacing:.3px;">평균 진척</div>
        <div style="font-size:26px;font-weight:900;letter-spacing:-0.5px;color:${progressColor(objAvg)};margin-top:2px;line-height:1;">${objAvg}%</div>
        <div style="font-size:10.5px;color:var(--text-soft);margin-top:4px;">KR ${krs.length}</div>
      </div>
    </div>
    <div>
      ${krs.length===0?'<div style="font-size:13px;color:var(--text-soft);padding:14px 0;text-align:center;">KR을 추가하세요.</div>':krs.map((k,i)=>renderInlineKRRow(k,o.id,i)).join('')}
    </div>
  </section>`;
}
function renderObjectivePairRow(){
  const objs=state.objectives||[];
  if(objs.length===0)return '';
  // v56 — 1개면 풀폭 OKR-탭급 사이즈
  if(objs.length===1){
    return `<div class="objectives-solo-row" style="margin-top:14px;">${renderObjectiveSolo(objs[0])}</div>`;
  }
  const first=objs[0],second=objs[1];
  const extra=objs.length>2;
  return `<div class="objectives-pair-row" style="display:grid;grid-template-columns:1fr 1fr;gap:14px;margin-top:14px;">
    ${renderObjectivePanel(first,0)}
    ${renderObjectivePanel(second,1)}
  </div>${extra?`<div style="font-size:11.5px;color:var(--text-soft);margin-top:6px;text-align:right;">+ ${objs.length-2}개 Objective는 OKR 탭에서 확인 → <button class="btn-mode" data-act="view" data-view="okr" style="font-size:11px;padding:3px 9px;">OKR 탭으로</button></div>`:''}`;
}
function renderMemberCard(m,e){
  const has=!!(e.blockers&&e.blockers.trim());
  const date=viewingDate;
  const yesterday=shiftDate(date,-1);
  const myInits=getMemberInitiatives(m.id);
  const todayChecks=getIDLForMemberDate(m.id,date);
  const yChecks=getIDLForMemberDate(m.id,yesterday);
  // 어제 체크된 Initiative 자동 요약
  const yDoneInits=Object.entries(yChecks).filter(([_,v])=>v.checked).map(([iid,v])=>{const i=findInitiative(iid);return i?{id:iid,title:i.title,note:v.note}:null;}).filter(Boolean);
  const editable=canEditAs(m.id);
  return `<div class="member-card ${has?'has-blocker':''} ${editable?'':'is-readonly'}" data-member-card="${m.id}">
    <div class="member-head"><div class="avatar" style="background:${m.color};">${esc(m.name.slice(0,1).toUpperCase())}</div><div><div class="member-name">${esc(m.name)}</div><div class="member-role">${esc(m.role||'')}</div></div>${has?`<span class="blocker-badge">${I.alert} 도움 필요</span>`:''}</div>
    ${renderYesterdaySection(m.id,e.yesterday,yDoneInits)}
    ${renderTodaySection(m.id,e.today,myInits,todayChecks)}
    ${renderBlockerSection(m.id,e)}
  </div>`;
}
function renderYesterdaySection(mid,memo,yDone){
  const summaryHtml=yDone.length>0
    ? `<div style="display:flex;flex-wrap:wrap;gap:4px;margin-bottom:6px;">${yDone.map(i=>`<span style="font-size:10.5px;padding:2px 7px;background:var(--growth-soft);color:var(--growth);border-radius:999px;font-weight:600;">${esc(i.title.slice(0,18))}${i.title.length>18?'…':''}</span>`).join('')}</div>`
    : '';
  const editable=canEditAs(mid);const ro=editable?'':' readonly';const tip=editable?'':' title="본인이 작성한 항목만 수정할 수 있습니다"';
  // v61 — data-autogrow 제거: member-card 안에서는 flex:1로 셀 높이에 맞춤
  return `<div class="field"><div class="field-label"><span class="field-dot"></span><span class="field-name">어제 한 일</span></div>${summaryHtml}<textarea class="field-input" rows="3" placeholder="추가 메모 (선택) — 어제 진행한 내용을 자유롭게" data-field="standup" data-fieldname="yesterday" data-mid="${mid}" data-date="${viewingDate}"${ro}${tip}>${esc(memo||'')}</textarea></div>`;
}
function renderTodaySection(mid,memo,myInits,checks){
  // v15 — Initiative 표시 제거 (OKR 탭의 완료 체크박스로 이관)
  const editable=canEditAs(mid);const ro=editable?'':' readonly';const tip=editable?'':' title="본인이 작성한 항목만 수정할 수 있습니다"';
  return `<div class="field"><div class="field-label"><span class="field-dot accent-primary"></span><span class="field-name accent-primary">오늘 할 일</span></div><textarea class="field-input" rows="4" placeholder="추가 메모 — 오늘 목표를 자유롭게 (여러 줄 가능)" data-field="standup" data-fieldname="today" data-mid="${mid}" data-date="${viewingDate}"${ro}${tip}>${esc(memo||'')}</textarea></div>`;
}
function renderBlockerSection(mid,e){
  const has=!!(e.blockers&&e.blockers.trim());
  const helperKey=`helper:${mid}`;
  const helpOpen=realityOpen.has(helperKey) || !!(e.helper_member_id||e.helper_name||e.support_type||e.support_detail);
  const accent=has?'accent-warning':'';
  const helper=state.members.find(x=>x.id===e.helper_member_id);
  const helperLabel=helper?helper.name:(e.helper_name||'');
  const hasAnyContent=has||!!(e.helper_member_id||e.helper_name||e.support_type||e.support_detail);
  const editable=canEditAs(mid);const ro=editable?'':' readonly';const dis=editable?'':' disabled';const tip=editable?'':' title="본인이 작성한 항목만 수정할 수 있습니다"';
  const clearBtn=(hasAnyContent&&editable)?`<button data-act="clear-blocker" data-mid="${mid}" style="background:transparent;border:none;cursor:pointer;color:var(--text-soft);font-size:10.5px;padding:2px 6px;border-radius:5px;font-weight:600;text-decoration:underline;text-underline-offset:2px;" title="막힘과 도움 요청 모두 지우기">지우기</button>`:'';
  return `<div class="field"><div class="field-label"><span class="field-dot ${accent}"></span><span class="field-name ${accent}">막힘 / 도움 필요</span>${clearBtn}<button class="reality-toggle ${(e.helper_member_id||e.helper_name||e.support_type||e.support_detail)?'has-content':''}" style="margin-left:auto;" data-act="toggle-reality" data-key="${helperKey}" data-reality-btn="${helperKey}">${helpOpen?'도움요청 ▴':'도움요청 ▾'}</button></div>
    <textarea class="field-input blocker-input" rows="5" placeholder="현실적인 어려움과 도움이 필요한게 있나요?" data-field="standup" data-fieldname="blockers" data-mid="${mid}" data-date="${viewingDate}"${ro}${tip}>${esc(e.blockers||'')}</textarea>
    <div class="reality-box" data-reality-box="${helperKey}" style="margin-top:6px;padding:8px 10px;display:${helpOpen?'block':'none'};">
      <div style="display:flex;gap:6px;align-items:center;flex-wrap:wrap;margin-bottom:6px;">
        <span style="font-size:10.5px;font-weight:700;color:var(--text-soft);">누구에게:</span>
        <select class="rt-input" style="font-size:11.5px;padding:3px 7px;" data-field="helper-member" data-mid="${mid}"${dis}>
          <option value="">팀원 선택…</option>
          ${state.members.filter(x=>x.id!==mid).map(x=>`<option value="${x.id}" ${e.helper_member_id===x.id?'selected':''}>${esc(x.name)}</option>`).join('')}
        </select>
        <input class="rt-input" style="font-size:11.5px;padding:3px 7px;flex:1;min-width:100px;" placeholder="또는 자유 입력 (예: 본부장님, 외부 자문)" data-field="helper-name" data-mid="${mid}" value="${esc(e.helper_name||'')}"${ro}${tip} />
      </div>
      <div style="display:flex;gap:4px;align-items:center;flex-wrap:wrap;margin-bottom:6px;">
        <span style="font-size:10.5px;font-weight:700;color:var(--text-soft);">유형:</span>
        ${SUPPORT_TYPES.map(t=>`<button class="btn-mode" style="${e.support_type===t?'background:var(--primary-soft);color:var(--primary);font-weight:600;':''}padding:2px 8px;font-size:11px;" data-act="set-support-type" data-mid="${mid}" data-type="${esc(t)}"${dis}${tip}>${esc(t)}</button>`).join('')}
      </div>
      <textarea class="reality-input" rows="2" placeholder="구체적으로 어떤 도움이 필요한가요?" data-field="support-detail" data-mid="${mid}"${ro}${tip}>${esc(e.support_detail||'')}</textarea>
    </div></div>`;
}
function renderField(l,f,mid,v,ph,acc){const cls=acc?`accent-${acc}`:'';return `<div class="field"><div class="field-label"><span class="field-dot ${cls}"></span><span class="field-name ${cls}">${esc(l)}</span></div><textarea class="field-input" rows="4" placeholder="${esc(ph)}" data-field="standup" data-fieldname="${f}" data-mid="${mid}" data-date="${viewingDate}">${esc(v||'')}</textarea></div>`;}
function activeRoutinesForDate(date){const dt=new Date(date+'T00:00:00');const dow=dt.getDay()===0?7:dt.getDay();const dom=dt.getDate();return state.routines.filter(r=>{if(r.active===false)return false;if(r.frequency==='daily')return true;if(r.frequency==='weekdays')return dow>=1&&dow<=5;if(r.frequency==='weekly'||r.frequency==='custom'){return(r.days_of_week||[]).includes(dow);}if(r.frequency==='monthly')return r.day_of_month===dom;return false;});}
function renderRoutineCheck(r,log){
  const o=state.members.find(m=>m.id===r.owner_id);
  const c=!!log.completed;
  const editable=o?canEditAs(o.id):true;
  const ro=editable?'':' readonly';
  const dis=editable?'':' disabled';
  const tip=editable?'':' title="담당자 본인만 수정할 수 있습니다"';
  const ownerAvatar=o?`<span class="rt-owner-chip" style="display:inline-flex;align-items:center;gap:6px;background:#F4F4F5;border:1px solid var(--line);border-radius:999px;padding:3px 10px 3px 4px;font-size:11.5px;font-weight:700;color:var(--text);margin-left:8px;flex-shrink:0;white-space:nowrap;" title="담당자 ${esc(o.name)}"><span style="display:inline-flex;align-items:center;justify-content:center;width:20px;height:20px;border-radius:50%;background:${o.color||'#6241F5'};color:white;font-size:10.5px;font-weight:800;flex-shrink:0;">${esc(o.name.slice(0,1).toUpperCase())}</span><span>${esc(o.name)}</span></span>`:'';
  return `<div class="rt-item ${c?'done':''}"><button class="rt-check ${c?'checked':''}" data-act="toggle-routine" data-rid="${r.id}"${dis}${tip}>${c?I.check:''}</button><div class="rt-info" style="min-width:0;"><div class="rt-title" style="display:flex;align-items:center;gap:6px;flex-wrap:nowrap;min-width:0;"><span style="flex:1;min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">${esc(r.title)}</span>${ownerAvatar}</div><div class="rt-meta">${freqText(r)}</div></div><input class="rt-note-input" placeholder="메모 (선택)" data-field="rt-note" data-rid="${r.id}" value="${esc(log.note||'')}"${ro}${tip} /></div>`;
}
function freqText(r){if(r.frequency==='daily')return '매일';if(r.frequency==='weekdays')return '평일';if(r.frequency==='monthly')return `매월 ${r.day_of_month||1}일`;if(r.frequency==='weekly'||r.frequency==='custom'){const dn=['월','화','수','목','금','토','일'];return(r.days_of_week||[]).map(d=>dn[d-1]).join(',');}return '';}
// v60 — 루틴을 담당자별 열로 묶어서 카드 그리드로 렌더 (옵저버 제외)
function renderRoutinesByMember(routines,rl){
  const byOwner=new Map();
  routines.forEach(r=>{const k=r.owner_id||'__unassigned__';if(!byOwner.has(k))byOwner.set(k,[]);byOwner.get(k).push(r);});
  const orderedMembers=state.members.filter(m=>!m.isObserver).sort((a,b)=>(a.sort_order||0)-(b.sort_order||0));
  const cols=[];
  orderedMembers.forEach(m=>{const rs=byOwner.get(m.id);if(rs&&rs.length)cols.push({member:m,routines:rs});});
  const un=byOwner.get('__unassigned__');
  if(un&&un.length)cols.push({member:null,routines:un});
  if(cols.length===0)return '<div class="empty" style="margin-top:8px;">오늘 루틴이 없습니다.</div>';
  return `<div class="rt-by-member-grid">${cols.map(col=>{
    const head=col.member
      ?`<div class="rt-member-head"><span class="rt-member-avatar" style="background:${col.member.color||'#6241F5'};">${esc(col.member.name.slice(0,1).toUpperCase())}</span><span class="rt-member-name">${esc(col.member.name)}</span><span class="rt-member-count">${col.routines.length}</span></div>`
      :`<div class="rt-member-head"><span style="color:var(--text-soft);font-weight:700;">담당 없음</span><span class="rt-member-count">${col.routines.length}</span></div>`;
    const items=col.routines.map(r=>renderRoutineCheckInCol(r,rl[r.id]||{})).join('');
    return `<div class="rt-member-col">${head}${items}</div>`;
  }).join('')}</div>`;
}
// v60 — 열(column) 안에 들어가는 컴팩트 루틴 카드 (담당자 칩 제거)
function renderRoutineCheckInCol(r,log){
  const o=state.members.find(m=>m.id===r.owner_id);
  const c=!!log.completed;
  const editable=o?canEditAs(o.id):true;
  const ro=editable?'':' readonly';
  const dis=editable?'':' disabled';
  const tip=editable?'':' title="담당자 본인만 수정할 수 있습니다"';
  return `<div class="rt-item rt-item-col ${c?'done':''}">
    <div style="display:flex;align-items:center;gap:8px;min-width:0;">
      <button class="rt-check ${c?'checked':''}" data-act="toggle-routine" data-rid="${r.id}"${dis}${tip}>${c?I.check:''}</button>
      <span class="rt-title" style="flex:1;min-width:0;font-size:13px;font-weight:600;line-height:1.4;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;" title="${esc(r.title)}">${esc(r.title)}</span>
      <span class="rt-meta" style="flex-shrink:0;font-size:10px;color:var(--text-soft);font-weight:600;padding:1px 6px;border-radius:4px;background:#F4F4F5;">${freqText(r)}</span>
    </div>
    <input class="rt-note-input" placeholder="메모 (선택)" data-field="rt-note" data-rid="${r.id}" value="${esc(log.note||'')}"${ro}${tip} style="width:100%;margin-top:6px;" />
  </div>`;
}
function collectDueThisWeek(){const items=[];state.objectives.forEach(o=>o.keyResults.forEach(kr=>{if(kr.dueDate&&(withinThisWeek(kr.dueDate)||isOverdue(kr.dueDate)))items.push({type:'kr',title:kr.title,dueDate:kr.dueDate});kr.initiatives.forEach(i=>{if(i.dueDate&&i.status!=='done'&&(withinThisWeek(i.dueDate)||isOverdue(i.dueDate)))items.push({type:'init',title:i.title,dueDate:i.dueDate,status:i.status});});}));return items.sort((a,b)=>String(a.dueDate).localeCompare(String(b.dueDate)));}

function renderGuideCard(key){
  const g=GUIDES[key];if(!g)return '';
  const noEx=g.no?g.no.map(x=>`<div style="font-size:12px;color:var(--warning);padding:2px 0;"><b>×</b> ${esc(x)}</div>`).join(''):'';
  const yesEx=g.yes?g.yes.map(x=>`<div style="font-size:12px;color:var(--growth);padding:2px 0;"><b>○</b> ${esc(x)}</div>`).join(''):'';
  return `<div style="border:1px solid var(--primary-soft);background:linear-gradient(135deg,#FCFCFD 0%,#F4F0FE 100%);border-radius:12px;padding:14px 16px;margin-bottom:12px;"><div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:6px;"><div style="font-weight:700;font-size:13px;color:var(--primary);">${esc(g.title)}</div></div><div style="font-size:12.5px;color:var(--text);line-height:1.55;margin-bottom:8px;">${esc(g.body)}</div>${noEx||yesEx?`<div style="background:white;border-radius:8px;padding:8px 10px;margin-bottom:6px;">${noEx}${yesEx}</div>`:''}${g.check?`<div style="font-size:11px;color:var(--text-soft);font-weight:600;">판정 기준 — ${esc(g.check)}</div>`:''}</div>`;
}
function guideHelp(key){
  const g=GUIDES[key];if(!g)return '';
  const t=`${g.title}\n${g.body}\n${g.no?g.no.map(x=>'× '+x).join('\n')+'\n':''}${g.yes?g.yes.map(x=>'○ '+x).join('\n')+'\n':''}${g.check?'판정 — '+g.check:''}`;
  return `<span style="display:inline-flex;width:14px;height:14px;border-radius:999px;border:1px solid var(--line);color:var(--text-soft);font-size:9.5px;align-items:center;justify-content:center;cursor:help;font-weight:700;" title="${esc(t)}">?</span>`;
}
// ============================================================
// DASHBOARD VIEW (v8) — 분기 종합 진척 한눈에
// ============================================================
let dashboardActivityCache={data:null,fetchedAt:0};
async function fetchDashboardActivity(){
  // 지난 30일 스탠드업 entry + IDL
  const tid=state.currentTeamId;const end=todayKey();const sd=new Date();sd.setDate(sd.getDate()-30);
  const start=`${sd.getFullYear()}-${String(sd.getMonth()+1).padStart(2,'0')}-${String(sd.getDate()).padStart(2,'0')}`;
  const now=Date.now();if(dashboardActivityCache.data&&now-dashboardActivityCache.fetchedAt<60000)return dashboardActivityCache.data;
  const[er,idl]=await Promise.all([
    sb.from('standup_entries').select('member_id,date,blockers,helper_member_id').eq('team_id',tid).gte('date',start).lte('date',end),
    sb.from('initiative_daily_logs').select('member_id,date,checked').gte('date',start).lte('date',end).eq('checked',true)
  ]);
  dashboardActivityCache.data={entries:er.data||[],idl:idl.data||[],start,end};dashboardActivityCache.fetchedAt=now;
  return dashboardActivityCache.data;
}
function renderDashboard(){
  // 비동기 로딩 후 렌더 — 첫 진입 시 placeholder
  if(!dashboardActivityCache.data){fetchDashboardActivity().then(()=>{if(currentView==='dashboard')render();});}
  const allKR=[];state.objectives.forEach(o=>o.keyResults.forEach(k=>allKR.push({...k,objId:o.id,objTitle:o.title})));
  const overall=allKR.length?Math.round(allKR.reduce((s,k)=>s+pct(k.current,k.target),0)/allKR.length):0;
  const totalInits=state.objectives.reduce((s,o)=>s+o.keyResults.reduce((s2,k)=>s2+k.initiatives.length,0),0);
  const doneInits=state.objectives.reduce((s,o)=>s+o.keyResults.reduce((s2,k)=>s2+k.initiatives.filter(i=>i.status==='done').length,0),0);
  const blockedInits=state.objectives.reduce((s,o)=>s+o.keyResults.reduce((s2,k)=>s2+k.initiatives.filter(i=>i.status==='blocked').length,0),0);
  const overdueKR=allKR.filter(k=>isOverdue(k.dueDate)).length;
  const t=currentTeam();
  return `<div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:14px;flex-wrap:wrap;gap:10px;">
    <div><h2 style="font-weight:800;font-size:23px;margin:0;">📊 분기 대시보드</h2><div style="font-size:13px;color:var(--text-soft);margin-top:2px;">${esc(t?.name||'')} · ${esc(t?.quarter||'')}</div></div>
    <div style="display:flex;gap:8px;flex-wrap:wrap;"><button class="btn btn-soft" data-act="export-excel">${I.download} Excel</button><button class="btn btn-ghost" data-act="print-report">${I.print} 리포트</button></div>
  </div>
  ${renderDashKPIs(overall,allKR.length,totalInits,doneInits,blockedInits,overdueKR)}
  <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(420px,1fr));gap:14px;margin-top:14px;">
    ${renderDashKRBars(allKR)}
    ${renderDashConfidenceDonut(allKR)}
    ${renderDashActivityHeatmap()}
    ${renderDashBlockerList()}
  </div>`;
}
function renderDashKPIs(avg,krCnt,initCnt,done,blocked,overdue){
  const cards=[
    ['OKR 평균 진척',avg+'%',progressColor(avg),`${krCnt}개 KR`],
    ['Initiative 완료',`${done}/${initCnt}`,initCnt>0&&done/initCnt>=0.5?'var(--growth)':'var(--amber)',initCnt>0?Math.round(done/initCnt*100)+'% 완료':''],
    ['막힌 Initiative',`${blocked}건`,blocked>0?'var(--warning)':'var(--growth)',blocked>0?'즉시 점검 필요':'정상'],
    ['지연 KR',`${overdue}건`,overdue>0?'var(--warning)':'var(--growth)',overdue>0?'마감 초과':'마감 정상']
  ];
  return `<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(180px,1fr));gap:10px;">${cards.map(([l,v,c,sub])=>`<div class="card" style="padding:16px 18px;"><div style="font-size:11px;color:var(--text-soft);font-weight:600;margin-bottom:4px;">${esc(l)}</div><div style="font-size:26px;font-weight:800;color:${c};letter-spacing:-0.5px;line-height:1.1;">${esc(v)}</div>${sub?`<div style="font-size:11px;color:var(--text-soft);margin-top:3px;">${esc(sub)}</div>`:''}</div>`).join('')}</div>`;
}
function renderDashKRBars(allKR){
  if(allKR.length===0)return '<div class="card"><div class="section-head"><span class="section-title">KR 진척</span></div><div style="font-size:13px;color:var(--text-soft);text-align:center;padding:20px;">KR이 없습니다</div></div>';
  // 진척률 낮은 순으로 (위에서 가장 시급한 것이 보이도록)
  const sorted=[...allKR].sort((a,b)=>pct(a.current,a.target)-pct(b.current,b.target));
  const maxBar=240;
  return `<div class="card"><div class="section-head"><span class="section-title">KR 진척 — 시급한 순</span><span class="section-meta">· 낮은 것부터</span></div><div style="display:flex;flex-direction:column;gap:8px;">${sorted.map(kr=>{const p=pct(kr.current,kr.target);const owner=state.members.find(m=>m.id===kr.ownerId);return `<div style="display:grid;grid-template-columns:1fr ${maxBar}px 50px;gap:10px;align-items:center;font-size:12px;"><div style="overflow:hidden;text-overflow:ellipsis;white-space:nowrap;"><span style="color:var(--text);font-weight:500;">${esc(kr.title)}</span>${owner?` <span style="color:var(--text-soft);font-size:10.5px;">· ${esc(owner.name)}</span>`:''}</div><div style="background:#F4F4F5;border-radius:4px;height:14px;overflow:hidden;position:relative;"><div style="background:${progressColor(p)};height:100%;width:${p}%;transition:width .4s;"></div></div><div style="font-weight:700;color:${progressColor(p)};text-align:right;">${p}%</div></div>`;}).join('')}</div></div>`;
}
function renderDashConfidenceDonut(allKR){
  const counts={high:0,mid:0,low:0};allKR.forEach(k=>counts[k.confidence||'mid']++);
  const total=counts.high+counts.mid+counts.low;
  if(total===0)return '<div class="card"><div class="section-head"><span class="section-title">Confidence 분포</span></div><div style="font-size:13px;color:var(--text-soft);text-align:center;padding:20px;">데이터 없음</div></div>';
  // 도넛 SVG
  const r=60,cx=80,cy=80,sw=22;const C=2*Math.PI*r;
  let off=0;const segs=[['high',counts.high,'#30AB62'],['mid',counts.mid,'#F59E0B'],['low',counts.low,'#E5484D']];
  const arcs=segs.filter(s=>s[1]>0).map(([k,c,col])=>{const len=(c/total)*C;const dasharray=`${len} ${C-len}`;const dashoffset=-off;off+=len;return `<circle cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="${col}" stroke-width="${sw}" stroke-dasharray="${dasharray}" stroke-dashoffset="${dashoffset}" transform="rotate(-90 ${cx} ${cy})"/>`;}).join('');
  const ideal=counts.mid;const idealPct=Math.round((ideal/total)*100);
  return `<div class="card"><div class="section-head"><span class="section-title">Confidence 분포 ${guideHelp('confidence')}</span><span class="section-meta">· "해볼만합니다"가 이상적</span></div><div style="display:flex;align-items:center;gap:20px;flex-wrap:wrap;justify-content:center;"><svg width="160" height="160" viewBox="0 0 160 160">${arcs}<text x="${cx}" y="${cy-2}" text-anchor="middle" font-size="22" font-weight="800" fill="var(--text)">${idealPct}%</text><text x="${cx}" y="${cy+18}" text-anchor="middle" font-size="10" fill="var(--text-soft)">적정 stretch</text></svg><div style="display:flex;flex-direction:column;gap:8px;font-size:12.5px;"><div style="display:flex;align-items:center;gap:8px;"><span style="width:12px;height:12px;background:#30AB62;border-radius:3px;"></span><span style="color:var(--text-soft);">자신있어요</span><span style="font-weight:700;color:var(--growth);">${counts.high}</span></div><div style="display:flex;align-items:center;gap:8px;"><span style="width:12px;height:12px;background:#F59E0B;border-radius:3px;"></span><span style="color:var(--text-soft);">해볼만합니다 (적정)</span><span style="font-weight:700;color:var(--amber);">${counts.mid}</span></div><div style="display:flex;align-items:center;gap:8px;"><span style="width:12px;height:12px;background:#E5484D;border-radius:3px;"></span><span style="color:var(--text-soft);">쉽지 않아요</span><span style="font-weight:700;color:var(--warning);">${counts.low}</span></div></div></div>${counts.high>counts.mid+counts.low?`<div style="margin-top:10px;padding:8px 10px;background:var(--amber-soft);color:var(--amber);border-radius:6px;font-size:11.5px;line-height:1.5;">💡 "자신있어요" 비율이 높습니다 — KR이 너무 쉬울 수 있어요 (야심 검토 권장)</div>`:''}</div>`;
}
function renderDashActivityHeatmap(){
  const cache=dashboardActivityCache.data;
  if(!cache)return '<div class="card"><div class="section-head"><span class="section-title">팀원 활동 (지난 30일)</span></div><div style="text-align:center;padding:30px;color:var(--text-soft);"><div class="loading-spinner" style="margin:0 auto 10px;"></div>로드 중…</div></div>';
  // 멤버별 일자별 활동 (entries + IDL 합침)
  const days=[];const today=new Date(cache.end);for(let i=29;i>=0;i--){const d=new Date(today);d.setDate(today.getDate()-i);days.push(`${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`);}
  const activity={}; // {memberId: {date: count}}
  state.members.forEach(m=>{activity[m.id]={};days.forEach(d=>activity[m.id][d]=0);});
  cache.entries.forEach(e=>{if(activity[e.member_id]&&activity[e.member_id][e.date]!==undefined)activity[e.member_id][e.date]+=1;});
  cache.idl.forEach(l=>{if(activity[l.member_id]&&activity[l.member_id][l.date]!==undefined)activity[l.member_id][l.date]+=1;});
  const cellW=14,cellH=14,gap=2;
  return `<div class="card"><div class="section-head"><span class="section-title">팀원 활동 (지난 30일)</span><span class="section-meta">· 짙을수록 활발</span></div><div style="overflow-x:auto;"><div style="display:inline-flex;flex-direction:column;gap:6px;min-width:100%;">${state.members.map(m=>{const total=days.reduce((s,d)=>s+activity[m.id][d],0);return `<div style="display:flex;align-items:center;gap:8px;font-size:11px;"><div style="width:80px;text-align:right;color:var(--text);font-weight:600;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">${esc(m.name)}</div><svg width="${(cellW+gap)*30}" height="${cellH}" viewBox="0 0 ${(cellW+gap)*30} ${cellH}">${days.map((d,i)=>{const v=activity[m.id][d];const op=v===0?0.08:Math.min(1,0.25+v*0.2);return `<rect x="${i*(cellW+gap)}" y="0" width="${cellW}" height="${cellH}" rx="2" fill="${m.color}" fill-opacity="${op}"><title>${d}: ${v}건</title></rect>`;}).join('')}</svg><div style="font-size:11px;color:var(--text-soft);min-width:50px;">${total}건</div></div>`;}).join('')}</div></div></div>`;
}
function renderDashBlockerList(){
  const cache=dashboardActivityCache.data;
  if(!cache)return '<div class="card"><div class="section-head"><span class="section-title">최근 막힘·도움요청</span></div></div>';
  const recent=cache.entries.filter(e=>(e.blockers||'').trim()).sort((a,b)=>b.date.localeCompare(a.date)).slice(0,6);
  if(recent.length===0)return `<div class="card"><div class="section-head"><span class="section-title">최근 막힘·도움요청</span></div><div style="font-size:13px;color:var(--text-soft);text-align:center;padding:20px;">최근 30일 막힘 보고 없음 — 좋은 신호</div></div>`;
  return `<div class="card"><div class="section-head"><span class="section-title">최근 막힘·도움요청 (${recent.length}건)</span><span class="section-meta">· 즉시 점검 권장</span></div>${recent.map(e=>{const m=state.members.find(x=>x.id===e.member_id);const helper=e.helper_member_id?state.members.find(x=>x.id===e.helper_member_id):null;return `<div style="padding:9px 11px;border:1px solid var(--line);border-radius:8px;margin-bottom:6px;background:var(--warning-soft);"><div style="display:flex;align-items:center;gap:8px;font-size:12px;margin-bottom:4px;"><span style="font-weight:700;">${esc(m?m.name:'-')}</span><span style="color:var(--text-soft);font-size:10.5px;">${esc(e.date)}</span>${helper?`<span style="font-size:10.5px;color:var(--primary);">→ ${esc(helper.name)}</span>`:''}</div><div style="font-size:12px;color:var(--text);line-height:1.5;">${esc(e.blockers.slice(0,160))}${e.blockers.length>160?'…':''}</div></div>`;}).join('')}</div>`;
}
function renderOKR(){
  const totalKR=state.objectives.reduce((s,o)=>s+o.keyResults.length,0);
  const isEmpty=state.objectives.length===0;
  const oCnt=state.objectives.length;const oWarn=oCnt>3?'<span style="font-size:11px;color:var(--warning);font-weight:600;margin-left:6px;">⚠ 권장 1~3개 (Less is more)</span>':'';
  const guideChips=`<div style="display:flex;gap:6px;flex-wrap:wrap;margin-bottom:12px;font-size:11px;color:var(--text-soft);"><span style="font-weight:700;color:var(--text);margin-right:4px;">OKR 가이드:</span><span style="padding:3px 9px;background:#F4F4F5;border-radius:999px;">${guideHelp('objective')} Objective</span><span style="padding:3px 9px;background:#F4F4F5;border-radius:999px;">${guideHelp('kr')} KR</span><span style="padding:3px 9px;background:#F4F4F5;border-radius:999px;">${guideHelp('initiative')} Initiative</span><span style="padding:3px 9px;background:#F4F4F5;border-radius:999px;">${guideHelp('confidence')} Confidence</span><span style="padding:3px 9px;background:#F4F4F5;border-radius:999px;">${guideHelp('cadence')} 운영 리듬</span></div>`;
  const visibleObjs=okrSearchQuery?state.objectives.filter(o=>objectiveMatches(o,okrSearchQuery)):state.objectives;
  const searchInfo=okrSearchQuery?`<span style="font-size:11px;color:var(--primary);font-weight:600;margin-left:6px;">검색 결과 ${visibleObjs.length}개</span>`:'';
  const searchBar=`<div class="search-bar"><span style="color:var(--text-soft);">🔍</span><input type="text" id="okr-search" placeholder="제목·Reality·Initiative 검색" value="${esc(okrSearchQuery)}" />${okrSearchQuery?'<span class="clear" data-act="clear-search">✕</span>':''}</div>`;
  const okrEdit=canEditOKR();
  const adminBadge=okrEdit?'<span style="font-size:11px;color:var(--growth);font-weight:700;margin-left:6px;background:var(--growth-soft);padding:2px 8px;border-radius:999px;">관리자</span>':(selfMember()?'<span style="font-size:11px;color:var(--text-soft);font-weight:600;margin-left:6px;">읽기·진척 입력만 가능 · 관리자에게 수정 요청</span>':'');
  return `<div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:10px;flex-wrap:wrap;gap:10px;"><div><h2 style="font-weight:800;font-size:23px;margin:0;">분기 OKR ${adminBadge}</h2><div style="font-size:13px;color:var(--text-soft);margin-top:2px;">${esc(currentTeam()?.quarter||'')} · O ${oCnt}개 · KR ${totalKR}개${oWarn}${searchInfo}</div></div><div style="display:flex;gap:8px;align-items:center;flex-wrap:wrap;flex:1;justify-content:flex-end;">${searchBar}${okrEdit?`<button class="btn btn-primary" data-act="add-obj">${I.plus} Objective 추가</button>`:''}</div></div>${guideChips}${isEmpty?renderGuideCard('objective')+`<div class="empty"><div style="margin-bottom:6px;">${I.target}</div>분기 도달점을 정의하는 것으로 시작하십시오. 위의 Objective 가이드 카드와 상단 가이드 칩(?)을 참고하세요.</div>`:(visibleObjs.length===0?`<div class="empty">검색 결과가 없습니다 — "${esc(okrSearchQuery)}"</div>`:visibleObjs.map((o,i)=>renderObjective(o,state.objectives.indexOf(o))).join(''))}`;
}
function renderObjective(o,idx){
  const open=expanded.has(o.id);const avg=o.keyResults.length?Math.round(o.keyResults.reduce((s,k)=>s+pct(k.current,k.target),0)/o.keyResults.length):0;
  const rk=`objective:${o.id}`;const ro=realityOpen.has(rk);const hr=(o.realityBlocker||o.realityHelp);
  // v15 — 권한: 관리자만 OKR 편집
  const okrEdit=canEditOKR();
  const okrRo=okrEdit?'':' readonly';
  const okrDis=okrEdit?'':' disabled';
  const okrTip=okrEdit?'':' title="관리자만 수정 가능"';
  return `<div class="obj-card" data-obj-id="${o.id}" draggable="${okrEdit?'true':'false'}" data-drag-type="obj"><div class="obj-head"><span class="drag-handle" title="드래그로 순서 변경" style="${okrEdit?'':'opacity:.3;'}">⋮⋮</span><button class="obj-toggle btn-icon" data-act="toggle-obj" data-oid="${o.id}" title="${open?'접기':'펼치기'}">${caret(open,18)}</button><div class="obj-body"><div class="obj-tags"><span class="tag-id">O${idx+1}</span>${guideHelp('objective')}${renderConfChip('objective',o.id,o.confidence||'mid')}<label style="font-size:10.5px;color:var(--text-soft);font-weight:600;">시작<input type="date" data-field="obj-start" data-oid="${o.id}" value="${o.startDate||''}"${okrRo}${okrTip} style="font-size:11px;padding:3px 6px;margin-left:4px;border:1px solid var(--line);border-radius:5px;font-family:inherit;" /></label><label style="font-size:10.5px;color:var(--text-soft);font-weight:600;">마감<input type="date" data-field="obj-due" data-oid="${o.id}" value="${o.dueDate||''}"${okrRo}${okrTip} style="font-size:11px;padding:3px 6px;margin-left:4px;border:1px solid var(--line);border-radius:5px;font-family:inherit;" /></label><button class="reality-toggle ${hr?'has-content':''}" data-act="toggle-reality" data-key="${rk}">${ro?'Reality ▴':'Reality ▾'}</button><button class="btn-icon" data-act="show-history" data-etype="objective" data-eid="${o.id}" title="이력">${I.clock}</button><button class="btn-icon" data-act="open-reflection" data-etype="objective" data-eid="${o.id}" data-period="final" title="리뷰 작성">${I.star}</button></div><input class="obj-title-input" data-field="obj-title" data-oid="${o.id}" value="${esc(o.title)}" placeholder="가슴 뛰는 도달점 (예: 편의점 창업 희망자들이 CU의 브리핑을 먼저 떠올리고 CU만을 희망한다)"${okrRo}${okrTip} /><input class="obj-desc-input" data-field="obj-desc" data-oid="${o.id}" placeholder="이 목표가 달성되었을 때 우리 팀·고객에게 어떤 변화가 있는가" value="${esc(o.description||'')}"${okrRo}${okrTip} />${ro?renderRealityBox('objective',o.id,o.realityBlocker,o.realityHelp):''}</div><div class="obj-avg-wrap"><div class="obj-avg-label">평균 진척</div><div class="obj-avg" data-obj-avg style="color:${progressColor(avg)};">${avg}%</div><div class="obj-actions">${okrEdit?`<button class="btn-icon" data-act="del-obj" data-oid="${o.id}" title="삭제">${I.trash}</button>`:''}</div></div></div>${open?`<div class="obj-krs">${o.keyResults.length===0?`<div style="padding:14px 22px;">${renderGuideCard('kr')}</div>`:''}${o.keyResults.map((kr,ki)=>renderKR(o.id,kr,ki)).join('')}<div class="add-line">${okrEdit?`<button class="btn btn-soft" data-act="add-kr" data-oid="${o.id}">${I.plus} KR 추가</button>`:'<span style="font-size:11.5px;color:var(--text-soft);">KR 추가는 관리자만 가능</span>'}${o.keyResults.length>5?'<span style="font-size:11px;color:var(--warning);font-weight:600;margin-left:8px;align-self:center;">⚠ 권장 3~5개</span>':o.keyResults.length<3&&o.keyResults.length>0?'<span style="font-size:11px;color:var(--text-soft);margin-left:8px;align-self:center;">권장 3~5개 (현재 '+o.keyResults.length+'개)</span>':''}</div></div>`:''}</div>`;
}
function renderKR(oid,kr,idx){
  const p=pct(kr.current,kr.target);const rk=`kr:${kr.id}`;const ro=realityOpen.has(rk);const hr=(kr.realityBlocker||kr.realityHelp);const ko=!krCollapsed.has(kr.id);
  const mo=krMenuOpen.has(kr.id);
  const dueDisp=kr.dueDate?dueShort(kr.dueDate):'';
  const dueClr=isOverdue(kr.dueDate)?'var(--warning)':'var(--text-soft)';
  const startDisp=kr.startDate?dueShort(kr.startDate):'';
  // v15 — 권한: 관리자만 OKR 수정 가능. 비관리자도 진척 입력은 가능하게 (KR current)
  const okrEdit=canEditOKR();
  const okrRo=okrEdit?'':' readonly';
  const okrDis=okrEdit?'':' disabled';
  const okrTip=okrEdit?'':' title="관리자만 수정 가능"';
  // v58 — 진척바를 kr-row-line 안으로 흡수해 단일 행 (별도 kr-bar-wrap 제거)
  const inlineBar=`<div class="kr-bar-track" data-kr-bar-wrap title="클릭 또는 드래그로 진척 입력" style="flex:1 1 auto;min-width:70px;height:8px;border-radius:4px;background:#F0F0F2;overflow:hidden;margin:0 6px;"><div class="progress-fill" data-kr-bar style="width:${p}%;height:100%;background:${progressColor(p)};transition:width .2s;"></div></div>`;
  return `<div class="kr-row" data-kr-id="${kr.id}" data-oid="${oid}" draggable="${okrEdit?'true':'false'}" data-drag-type="kr" data-drag-parent="${oid}"><div class="kr-row-line"><span class="drag-handle" style="font-size:13px;${okrEdit?'':'opacity:.3;'}" title="드래그로 순서 변경">⋮⋮</span><span class="kr-id">KR${idx+1}</span>${guideHelp('kr')}<input class="kr-title-input" data-field="kr-title" data-oid="${oid}" data-krid="${kr.id}" value="${esc(kr.title)}" placeholder="결과 측정 기준 (예: 매장당 평균 매출 GS25 대비 200% / NPS 70점 / 가맹문의 월 1,000건)"${okrRo}${okrTip} /><button class="kr-step" data-act="kr-step" data-delta="-1" data-oid="${oid}" data-krid="${kr.id}" title="진척 -1" tabindex="-1">−</button><input type="number" class="kr-num-input" data-field="kr-current" data-oid="${oid}" data-krid="${kr.id}" value="${kr.current}" title="현재 진척 (바를 클릭/드래그해도 됩니다)" style="text-align:center;" /><button class="kr-step" data-act="kr-step" data-delta="1" data-oid="${oid}" data-krid="${kr.id}" title="진척 +1" tabindex="-1">＋</button><span style="color:var(--text-soft);font-size:12px;">/</span><input type="number" class="kr-num-input" data-field="kr-target" data-oid="${oid}" data-krid="${kr.id}" value="${kr.target}"${okrRo}${okrTip} />${inlineBar}<span class="kr-pct" data-kr-pct style="color:${progressColor(p)};">${p}%</span>${renderConfChip('kr',kr.id,kr.confidence||'mid')}${startDisp?`<span style="font-size:11px;color:var(--text-soft);font-weight:600;" title="시작">${startDisp}</span>`:''}${dueDisp?`<span style="font-size:11px;color:${dueClr};font-weight:600;" title="마감">~${dueDisp}</span>`:''}${hr?`<span style="font-size:10.5px;color:var(--primary);font-weight:600;" title="Reality 작성됨">●</span>`:''}<button class="kr-menu-btn ${mo?'open':''}" data-act="toggle-kr-menu" data-krid="${kr.id}" title="추가 메뉴">⋯</button><button class="btn-icon" data-act="toggle-kr" data-krid="${kr.id}" title="이니셔티브 ${kr.initiatives.length}건">${caret(ko,16)}${kr.initiatives.length>0?`<span style="font-size:9px;margin-left:2px;color:var(--primary);font-weight:700;">${kr.initiatives.length}</span>`:''}</button></div>${mo?`<div class="kr-menu-panel"><label>단위 <input class="kr-unit-input" placeholder="%, 점, 건" data-field="kr-unit" data-oid="${oid}" data-krid="${kr.id}" value="${esc(kr.unit||'')}" style="width:80px;"${okrRo}${okrTip} /></label><label>시작 <input type="date" class="kr-due-input" data-field="kr-start" data-oid="${oid}" data-krid="${kr.id}" value="${kr.startDate||''}"${okrRo}${okrTip} /></label><label>마감 <input type="date" class="kr-due-input ${isOverdue(kr.dueDate)?'overdue':''}" data-field="kr-due" data-oid="${oid}" data-krid="${kr.id}" value="${kr.dueDate||''}"${okrRo}${okrTip} /></label><button class="reality-toggle ${hr?'has-content':''}" data-act="toggle-reality" data-key="${rk}" style="font-size:11.5px;">${ro?'Reality ▴':'Reality ▾'}</button><button class="btn-icon" data-act="show-history" data-etype="key_result" data-eid="${kr.id}" title="이력">${I.clock} 이력</button><button class="btn-icon" data-act="open-reflection" data-etype="key_result" data-eid="${kr.id}" data-period="final" title="리뷰 작성">${I.star} 리뷰</button>${okrEdit?`<button class="btn-icon" data-act="del-kr" data-oid="${oid}" data-krid="${kr.id}" title="삭제" style="color:var(--warning);margin-left:auto;">${I.trash} 삭제</button>`:''}</div>`:''}${ro?renderRealityBox('kr',kr.id,kr.realityBlocker,kr.realityHelp):''}${ko?renderInitiativesList(kr):''}</div>`;
}
function renderInitiativesList(kr){
  // v15·v16 — 본인이 본인 이니셔티브를 만들 수 있도록 (관리자 = 자유)
  const canAddInit=!!selfMember();
  // v46 — 가이드 카드 제거. 추가 버튼만 컴팩트하게.
  const addBtn=canAddInit?`<div class="add-init" data-act="add-init" data-krid="${kr.id}">${I.plus} 이니셔티브 추가 (본인 담당)</div>`:'';
  const items=kr.initiatives.map(i=>renderInitiative(kr.id,i)).join('');
  return `<div class="init-list">${items}${addBtn}</div>`;
}
function renderInitiative(krId,init){
  const rk=`initiative:${init.id}`;const ro=realityOpen.has(rk);const hr=(init.realityBlocker||init.realityHelp);
  // v15 — 권한: 본인 또는 관리자
  const initEdit=canEditInit(init);
  const initRo=initEdit?'':' readonly';
  const initDis=initEdit?'':' disabled';
  const initTip=initEdit?'':' title="본인 담당 이니셔티브 또는 관리자만 수정 가능"';
  const done=init.status==='done';
  // v15 — 완료 체크박스 (status='done' 토글)
  const checkBtn=`<button class="rt-check ${done?'checked':''}" style="width:20px;height:20px;border-width:2px;border-radius:5px;flex-shrink:0;" data-act="toggle-init-done" data-krid="${krId}" data-iid="${init.id}"${initDis}${initTip} title="완료 체크">${done?'✓':''}</button>`;
  // v16 — 담당자: 다중 + 팀 전원 지원 (버튼 + 모달)
  const od=initOwnersDisplay(init);
  const ownerBtn=`<button class="kr-owner-select" data-act="open-init-owners" data-krid="${krId}" data-iid="${init.id}" style="font-size:11px;padding:4px 9px;background:${od.isTeamAll?'#EEEAFE':'white'};color:${od.color};border:1px solid var(--line);border-radius:5px;cursor:pointer;font-family:inherit;font-weight:600;max-width:160px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;"${initDis} title="담당자 선택 (다중 가능, 팀 전원도 가능)">${esc(od.text)} ▾</button>`;
  // v30 — Initiative 하위 sub-task 영역
  const subTasks=state.initiativeTasks&&state.initiativeTasks[init.id]||[];
  const subOpen=window._initSubOpen&&window._initSubOpen.has(init.id);
  // v46 — 할일 칩 + 추가 버튼을 init-row 안에 함께 배치 (새 줄 안 만듦)
  const subHead=`<button class="init-meta-chip ${subTasks.length>0?'active':''}" data-act="toggle-init-sub" data-iid="${init.id}" title="${subOpen?'접기':'펼치기'}">${caret(subOpen)} 할일 ${subTasks.length}</button>`;
  const subAddBtn=initEdit?`<button class="init-meta-add" data-act="add-init-sub" data-iid="${init.id}" title="할일 추가">${I.plus}</button>`:'';
  let subBody='';
  if(subOpen&&subTasks.length>0){
    // v52 — 할일 있을 때만 렌더. 빈 상태에선 아무것도 안 그림 (showNestPreview가 필요 시 temp wrap 생성)
    const subRows=subTasks.map(t=>renderInitSubTaskRow(init.id,t,initEdit)).join('');
    subBody=`<div class="init-sub-list" data-init-sub="${init.id}" data-drop-zone="init-sub-list" data-parent-iid="${init.id}">${subRows}</div>`;
  }
  // v43 — 1행 통합: 모든 컨트롤을 한 줄에 컴팩트하게. flex-wrap:nowrap + overflow-x:auto로 좁아져도 줄바꿈 안 함
  const mainLine=`<div class="init-row-main">`
    +`<span class="drag-handle" style="font-size:11px;${initEdit?'':'opacity:.3;'}" title="드래그로 순서 변경 또는 다른 이니셔티브의 할일로 이동">⋮⋮</span>`
    +checkBtn
    +`<select class="init-status ${init.status||'todo'}" data-field="init-status" data-krid="${krId}" data-iid="${init.id}"${initDis}>${Object.entries(STATUS_LABELS).map(([k,v])=>`<option value="${k}" ${init.status===k?'selected':''}>${v}</option>`).join('')}</select>`
    +`<input class="init-title-input" data-field="init-title" data-krid="${krId}" data-iid="${init.id}" value="${esc(init.title)}" placeholder="구체 액션 (예: AI 어시스턴트 MVP / 가맹점주 인터뷰 30건)"${initRo}${initTip} style="${done?'text-decoration:line-through;color:var(--text-soft);':''}" />`
    +ownerBtn
    +`<label class="init-meta-date" title="시작일"><span>시작</span><input type="date" data-field="init-start" data-krid="${krId}" data-iid="${init.id}" value="${init.startDate||''}"${initRo}${initTip} /></label>`
    +`<label class="init-meta-date ${isOverdue(init.dueDate,init.status)?'overdue':''}" title="마감일"><span>마감</span><input type="date" data-field="init-due" data-krid="${krId}" data-iid="${init.id}" value="${init.dueDate||''}"${initRo}${initTip} /></label>`
    +renderConfChip('initiative',init.id,init.confidence||'mid')
    +subHead+subAddBtn
    +`<button class="reality-toggle ${hr?'has-content':''}" data-act="toggle-reality" data-key="${rk}" title="Reality 메모">${ro?'R▴':'R▾'}</button>`
    +`<button class="btn-icon" data-act="show-history" data-etype="initiative" data-eid="${init.id}" title="이력">${I.clock}</button>`
    +(initEdit?`<button class="btn-icon" data-act="del-init" data-krid="${krId}" data-iid="${init.id}" title="삭제" style="color:var(--warning);">${I.x}</button>`:'')
    +`</div>`;
  return `<div class="init-row" data-init-id="${init.id}" draggable="${initEdit?'true':'false'}" data-drag-type="init" data-drag-parent="${krId}">${mainLine}${ro?`<div style="width:100%;">${renderRealityBox('initiative',init.id,init.realityBlocker,init.realityHelp)}</div>`:''}${subBody}</div>`;
}
// v47 — Initiative 하위 sub-task 행: 이니셔티브와 동일 레이아웃(축소판), 드래그 핸들 포함
function renderInitSubTaskRow(initId,t,editable){
  const done=t.status==='done';
  const ro=editable?'':' readonly';
  const dis=editable?'':' disabled';
  const overdue=isOverdue(t.due_date,t.status);
  const ownerOpt=state.members.map(m=>`<option value="${m.id}" ${t.owner_id===m.id?'selected':''}>${esc(m.name)}</option>`).join('');
  const statusOpt=Object.entries(STATUS_LABELS).map(([k,v])=>`<option value="${k}" ${(t.status||'todo')===k?'selected':''}>${v}</option>`).join('');
  return `<div class="init-sub-row" data-init-sub-id="${t.id}" data-task-id="${t.id}" draggable="${editable?'true':'false'}" data-drag-type="init-task" data-drag-parent="${initId}">`
    +`<div class="init-row-main">`
    +`<span class="drag-handle" style="font-size:10px;${editable?'':'opacity:.3;'}" title="드래그로 순서 변경">⋮⋮</span>`
    +`<button class="rt-check ${done?'checked':''}" style="width:18px;height:18px;border-width:1.5px;border-radius:4px;flex-shrink:0;" data-act="toggle-init-sub-done" data-iid="${initId}" data-stid="${t.id}"${dis} title="완료">${done?'✓':''}</button>`
    +`<select class="init-status ${t.status||'todo'}" data-field="init-sub-status" data-iid="${initId}" data-stid="${t.id}"${dis}>${statusOpt}</select>`
    +`<input class="init-title-input" data-field="init-sub-title" data-iid="${initId}" data-stid="${t.id}" value="${esc(t.title||'')}" placeholder="할일 내용" style="${done?'text-decoration:line-through;color:var(--text-soft);':''}"${ro}/>`
    +`<select class="kr-owner-select" data-field="init-sub-owner" data-iid="${initId}" data-stid="${t.id}"${dis} title="담당자"><option value="">담당</option>${ownerOpt}</select>`
    +`<label class="init-meta-date" title="시작일"><span>시작</span><input type="date" data-field="init-sub-start" data-iid="${initId}" data-stid="${t.id}" value="${t.start_date||''}"${ro} /></label>`
    +`<label class="init-meta-date ${overdue?'overdue':''}" title="마감일"><span>마감</span><input type="date" data-field="init-sub-due" data-iid="${initId}" data-stid="${t.id}" value="${t.due_date||''}"${ro} /></label>`
    +(editable?`<button class="btn-icon" data-act="del-init-sub" data-iid="${initId}" data-stid="${t.id}" title="삭제" style="color:var(--warning);">${I.x}</button>`:'')
    +`</div></div>`;
}
// v16 — Initiative 담당자 선택 모달 (다중 + 팀 전원)
function openInitOwnersPicker(krId,iid){
  let init=null,krTitle='';
  state.objectives.forEach(o=>o.keyResults.forEach(k=>{
    if(k.id===krId){krTitle=k.title;init=k.initiatives.find(i=>i.id===iid);}
  }));
  if(!init)return;
  const isTeamAll=init.ownerId==='__team_all__';
  const currentIds=isTeamAll?[]:getInitOwnerIds(init);
  const memberList=state.members.filter(m=>!m.isObserver).map(m=>{
    const checked=isTeamAll||currentIds.includes(m.id);
    return `<label class="init-owner-row" style="display:flex;align-items:center;gap:10px;padding:9px 10px;border-radius:6px;cursor:pointer;border:1px solid transparent;background:${checked?'#F4F0FF':'transparent'};">
      <input type="checkbox" data-mid="${m.id}" ${checked?'checked':''} ${isTeamAll?'disabled':''} style="width:16px;height:16px;cursor:${isTeamAll?'not-allowed':'pointer'};" />
      <span style="width:24px;height:24px;border-radius:999px;background:${m.color};color:white;font-weight:700;font-size:11px;display:inline-grid;place-items:center;">${esc(m.name.slice(0,1).toUpperCase())}</span>
      <span style="flex:1;font-weight:600;font-size:13px;">${esc(m.name)}</span>
      <span style="font-size:11px;color:var(--text-soft);">${esc(m.role||'')}</span>
    </label>`;
  }).join('');
  showModal(`
    <div class="modal-head"><div class="modal-title">담당자 선택</div></div>
    <div class="modal-body">
      <div style="font-size:12px;color:var(--text-soft);margin-bottom:6px;line-height:1.55;">Initiative: <b style="color:var(--text);">${esc(init.title||'(제목 없음)')}</b><br/>KR: ${esc(krTitle||'')}</div>
      <label style="display:flex;align-items:center;gap:10px;padding:10px 12px;background:linear-gradient(135deg,#F4F0FF,#FFFFFF);border:1px solid var(--primary-soft);border-radius:8px;margin:12px 0;cursor:pointer;">
        <input type="checkbox" id="init-owner-team-all" ${isTeamAll?'checked':''} style="width:18px;height:18px;cursor:pointer;" />
        <span style="font-weight:700;color:var(--primary);font-size:14px;">👥 팀 전원 (전체 공동 담당)</span>
      </label>
      <div style="font-size:11px;color:var(--text-soft);margin-bottom:6px;">또는 개별 담당자 (복수 선택 가능):</div>
      <div id="init-owners-list" style="display:flex;flex-direction:column;gap:4px;${isTeamAll?'opacity:.5;pointer-events:none;':''}">${memberList}</div>
    </div>
    <div class="modal-foot">
      <button class="btn btn-ghost" data-act="close-modal">취소</button>
      <button class="btn btn-soft" data-act="save-init-owners" data-krid="${krId}" data-iid="${iid}" data-clear="1">담당 미지정</button>
      <button class="btn btn-primary" data-act="save-init-owners" data-krid="${krId}" data-iid="${iid}">저장</button>
    </div>
  `);
  setTimeout(()=>{
    const teamAllCb=document.getElementById('init-owner-team-all');
    if(teamAllCb){
      teamAllCb.addEventListener('change',()=>{
        const on=teamAllCb.checked;
        const listEl=document.getElementById('init-owners-list');
        if(listEl){
          listEl.style.opacity=on?'.5':'1';
          listEl.style.pointerEvents=on?'none':'auto';
          listEl.querySelectorAll('input[type="checkbox"]').forEach(cb=>{
            cb.disabled=on;if(on)cb.checked=true;
          });
        }
      });
    }
  },50);
}
function renderConfChip(et,eid,lv){const l=lv||'mid';return `<span class="conf-chip ${l}" data-act="cycle-conf" data-etype="${et}" data-eid="${eid}" title="${esc(CONF_HINTS[l])} (클릭하여 변경)">${CONF_LABELS[l]}</span>`;}
function renderRealityBox(et,eid,b,h){return `<div class="reality-box"><div class="reality-row"><div class="reality-label">현실적 어려움</div><textarea class="reality-input" rows="2" placeholder="지금 막혀 있는 점은?" data-field="reality-blocker" data-etype="${et}" data-eid="${eid}">${esc(b||'')}</textarea></div><div class="reality-row"><div class="reality-label">지원 요청</div><textarea class="reality-input" rows="2" placeholder="어떤 지원이 있으면 풀릴까요? (사람·예산·의사결정 등)" data-field="reality-help" data-etype="${et}" data-eid="${eid}">${esc(h||'')}</textarea></div></div>`;}

function renderRoutinesView(){
  const date=viewingDate;const isToday=date===todayKey();
  const tr=activeRoutinesForDate(date);
  const log=state.routineLogs[date]||{};
  const mngOpen=!!window._routinesMngOpen;
  // v30 — 담당자별 카드 그루핑
  const byOwner=new Map();const noOwner=[];
  tr.forEach(r=>{if(r.owner_id){if(!byOwner.has(r.owner_id))byOwner.set(r.owner_id,[]);byOwner.get(r.owner_id).push(r);}else noOwner.push(r);});
  const ownerCards=state.members.filter(m=>byOwner.has(m.id)).map(m=>{
    const list=byOwner.get(m.id);
    return `<section class="card" style="margin-bottom:10px;"><div class="section-head" style="padding-bottom:8px;border-bottom:1px solid #F4F4F5;margin-bottom:8px;"><span style="display:inline-flex;align-items:center;gap:8px;font-weight:700;font-size:14px;"><span class="avatar" style="width:28px;height:28px;border-radius:50%;background:${m.color||'#6241F5'};color:white;display:inline-flex;align-items:center;justify-content:center;font-size:12px;font-weight:800;">${esc(m.name.slice(0,1).toUpperCase())}</span>${esc(m.name)}${m.role?`<span style="font-size:11.5px;color:var(--text-soft);font-weight:500;">${esc(m.role)}</span>`:''}</span><span class="section-meta">· ${list.length}건</span></div>${list.map(r=>renderRoutineCheck(r,log[r.id]||{})).join('')}</section>`;
  }).join('');
  const noOwnerCard=noOwner.length>0?`<section class="card" style="margin-bottom:10px;"><div class="section-head"><span class="section-title">담당자 미지정</span><span class="section-meta">· ${noOwner.length}건</span></div>${noOwner.map(r=>renderRoutineCheck(r,log[r.id]||{})).join('')}</section>`:'';
  const empty=tr.length===0?`<section class="card"><div style="font-size:13px;color:var(--text-soft);padding:6px 0;">${isToday?'오늘':date}에 해당하는 루틴이 없습니다. 아래 ＋ 루틴 추가로 시작하세요.</div></section>`:'';
  // 하단 루틴 관리 (접힘 디폴트)
  const mngHead=`<div class="section-head" style="cursor:pointer;user-select:none;" data-act="toggle-routines-mng" title="${mngOpen?'접기':'펼치기'}"><span class="section-title">${caret(mngOpen,14)} 루틴 관리</span><span class="section-meta">· 전체 ${state.routines.length}건${mngOpen?'':' (펼치기)'}</span></div>`;
  const mngBody=mngOpen?`<div style="margin-top:8px;">${state.routines.length===0?'<div style="font-size:13px;color:var(--text-soft);padding:6px 0;">＋ 루틴 추가로 새 항목을 만드세요.</div>':state.routines.map(r=>renderRoutineMng(r)).join('')}<div style="margin-top:10px;display:flex;justify-content:flex-end;"><button class="btn btn-primary" data-act="add-routine">${I.plus} 루틴 추가</button></div></div>`:`<div style="margin-top:6px;display:flex;justify-content:flex-end;"><button class="btn btn-soft" data-act="add-routine">${I.plus} 루틴 추가</button></div>`;
  return `<div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:14px;flex-wrap:wrap;gap:10px;"><div><h2 style="font-weight:800;font-size:23px;margin:0;">루틴 · ${isToday?'오늘':date}</h2><div style="font-size:13px;color:var(--text-soft);margin-top:2px;">담당자별 반복 업무 · 진행 ${tr.length}건</div></div></div>${ownerCards}${noOwnerCard}${empty}<section class="card card-section">${mngHead}${mngBody}</section>`;
}
function renderRoutineMng(r){const dn=['월','화','수','목','금','토','일'];return `<div class="rt-mng-row ${r.active===false?'inactive':''}"><input class="rt-input" data-field="rt-title" data-rid="${r.id}" value="${esc(r.title)}" placeholder="루틴 이름" /><select class="rt-input" data-field="rt-frequency" data-rid="${r.id}"><option value="daily" ${r.frequency==='daily'?'selected':''}>매일</option><option value="weekdays" ${r.frequency==='weekdays'?'selected':''}>평일</option><option value="weekly" ${r.frequency==='weekly'?'selected':''}>요일 지정</option><option value="monthly" ${r.frequency==='monthly'?'selected':''}>매월 특정일</option></select><select class="rt-input" data-field="rt-owner" data-rid="${r.id}"><option value="">담당</option>${state.members.map(m=>`<option value="${m.id}" ${r.owner_id===m.id?'selected':''}>${esc(m.name)}</option>`).join('')}</select><button class="btn-icon" data-act="del-routine" data-rid="${r.id}">${I.trash}</button>${r.frequency==='weekly'||r.frequency==='custom'?`<div style="grid-column:1/-1;display:flex;gap:6px;flex-wrap:wrap;align-items:center;"><span style="font-size:11px;color:var(--text-soft);">요일:</span>${dn.map((d,i)=>`<button class="btn-mode" data-act="toggle-day" data-rid="${r.id}" data-day="${i+1}" style="${(r.days_of_week||[]).includes(i+1)?'background:var(--primary-soft);color:var(--primary);font-weight:600;':''}padding:3px 9px;font-size:11.5px;">${d}</button>`).join('')}</div>`:''}${r.frequency==='monthly'?`<div style="grid-column:1/-1;display:flex;gap:6px;align-items:center;"><span style="font-size:11px;color:var(--text-soft);">매월</span><input type="number" min="1" max="31" class="rt-input" style="width:60px;" data-field="rt-day-of-month" data-rid="${r.id}" value="${r.day_of_month||1}"/><span style="font-size:11px;color:var(--text-soft);">일</span></div>`:''}</div>`;}

function memberAnalytics(mid){
  let okrs=0,okrSum=0,krs=0,krSum=0,inits=0,initsDone=0,initsBlocked=0;
  let confSum=0,confCnt=0;const cMap={high:3,mid:2,low:1};
  state.objectives.forEach(o=>{
    if(o.ownerId===mid){okrs++;const a=o.keyResults.length?o.keyResults.reduce((s,k)=>s+pct(k.current,k.target),0)/o.keyResults.length:0;okrSum+=a;confSum+=cMap[o.confidence||'mid'];confCnt++;}
    o.keyResults.forEach(k=>{
      if(k.ownerId===mid){krs++;krSum+=pct(k.current,k.target);confSum+=cMap[k.confidence||'mid'];confCnt++;}
      k.initiatives.forEach(i=>{
        // v16 — 다중 담당자 + 팀 전원 지원
        const owners=getInitOwnerIds(i);
        if(owners.includes(mid)){inits++;if(i.status==='done')initsDone++;if(i.status==='blocked')initsBlocked++;confSum+=cMap[i.confidence||'mid'];confCnt++;}
      });
    });
  });
  return{okrs,okrAvg:okrs?Math.round(okrSum/okrs):0,krs,krAvg:krs?Math.round(krSum/krs):0,inits,initsDone,initsBlocked,confAvg:confCnt?(confSum/confCnt):0};
}
function lastReviewFor(mid,period){return state.reviews.find(r=>r.member_id===mid&&r.period===period);}

function renderEval(){
  // 검색 필터링
  const q=reflSearchQuery.trim().toLowerCase();
  const filteredReviews=q?state.reviews.filter(r=>{const txt=`${r.summary||''} ${r.what_worked||''} ${r.what_struggled||''} ${r.what_learned||''} ${r.next_try||''}`.toLowerCase();return txt.includes(q);}):state.reviews;
  // 분기별 그룹화 (지난 분기 비교용)
  const byQuarter={};filteredReviews.forEach(r=>{const k=r.quarter||'미지정';if(!byQuarter[k])byQuarter[k]=[];byQuarter[k].push(r);});
  const quarters=Object.keys(byQuarter).sort().reverse();
  const searchBar=`<div class="search-bar" style="max-width:300px;"><span style="color:var(--text-soft);">🔍</span><input type="text" id="refl-search" placeholder="리뷰 내용 검색" value="${esc(reflSearchQuery)}" />${reflSearchQuery?'<span class="clear" data-act="clear-refl-search">✕</span>':''}</div>`;
  return `<div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:14px;flex-wrap:wrap;gap:10px;"><div><h2 style="font-weight:800;font-size:23px;margin:0;">리뷰 · 학습 정리</h2><div style="font-size:13px;color:var(--text-soft);margin-top:2px;">${esc(currentTeam()?.quarter||'')} · 팀원 ${state.members.length}명 · O ${state.objectives.length}개${q?` · 검색 결과 ${filteredReviews.length}건`:''}</div></div><div style="display:flex;gap:8px;flex-wrap:wrap;align-items:center;">${searchBar}<button class="btn btn-soft" data-act="export-excel">${I.download} Excel 내보내기</button><button class="btn btn-ghost" data-act="print-report">${I.print} 리포트 출력</button></div></div>
  <div style="font-size:12px;color:var(--text-soft);background:#FAFAFA;padding:10px 14px;border-radius:8px;margin-bottom:14px;line-height:1.55;">📌 OKR은 <b>야심을 세우고 학습하는 도구</b>입니다. 이 영역은 <b>인사평가가 아닌 리뷰</b>를 위한 공간입니다 (Doerr·Grove 원칙). 점수 대신 "잘 된 것 / 어려웠던 것 / 배운 것 / 다음 시도"를 정리하세요.</div>
  <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(180px,1fr));gap:8px;margin-bottom:14px;">
    <div style="padding:11px 13px;border:1px solid var(--line);border-radius:10px;background:white;"><div style="font-size:10.5px;font-weight:700;color:var(--primary);margin-bottom:3px;">매주 (10~15분)</div><div style="font-size:12px;color:var(--text-soft);line-height:1.5;">Confidence 점검 + KR 진척 갱신. 변화 이유 토의.</div></div>
    <div style="padding:11px 13px;border:1px solid var(--line);border-radius:10px;background:white;"><div style="font-size:10.5px;font-weight:700;color:var(--primary);margin-bottom:3px;">격주 (1on1)</div><div style="font-size:12px;color:var(--text-soft);line-height:1.5;">막힘 · 도움 요청 점검. 팀원 코칭.</div></div>
    <div style="padding:11px 13px;border:1px solid var(--line);border-radius:10px;background:white;"><div style="font-size:10.5px;font-weight:700;color:var(--primary);margin-bottom:3px;">분기말 (리뷰)</div><div style="font-size:12px;color:var(--text-soft);line-height:1.5;">4질문 리뷰 + 다음 분기 OKR 정의.</div></div>
  </div>
  ${state.members.length===0?'<div class="empty">팀원을 먼저 등록해주세요.</div>':`<section class="card"><div class="section-head"><span class="section-title">팀원 종합 리뷰</span><span class="section-meta">· 분기 학습 정리</span></div><div class="perf-grid">${state.members.map(m=>renderPerfCard(m)).join('')}</div></section>`}
  ${state.objectives.length>0?`<section class="card card-section"><div class="section-head"><span class="section-title">Objective · KR 리뷰</span><span class="section-meta">· OKR 탭에서도 시계 옆 리뷰 버튼으로 진입 가능</span></div>${state.objectives.map((o,oi)=>renderObjReflectionRow(o,oi)).join('')}</section>`:''}
  ${filteredReviews.length>0?`<section class="card card-section"><div class="section-head"><span class="section-title">${q?'검색된 리뷰':'분기별 리뷰 이력'}</span><span class="section-meta">· ${filteredReviews.length}건${quarters.length>1?` · ${quarters.length}개 분기`:''}</span></div>${quarters.map(qt=>{const arr=byQuarter[qt];return `<div style="margin-bottom:14px;">${quarters.length>1?`<div style="font-size:11px;font-weight:700;color:var(--primary);margin-bottom:6px;padding:4px 10px;background:var(--primary-soft);border-radius:6px;display:inline-block;">📅 ${esc(qt)} · ${arr.length}건</div>`:''}${arr.slice(0,15).map(r=>{const et=r.entity_type||'member';let label='';if(et==='member'){const m=state.members.find(x=>x.id===(r.entity_id||r.member_id));label=m?m.name:'(삭제됨)';}else if(et==='objective'){const o=state.objectives.find(x=>x.id===r.entity_id);label=o?`O · ${o.title}`:'(삭제)';}else if(et==='key_result'){let k=null;state.objectives.forEach(o=>o.keyResults.forEach(x=>{if(x.id===r.entity_id)k=x;}));label=k?`KR · ${k.title}`:'(삭제)';}const preview=q?(r.summary||r.what_worked||r.what_struggled||r.what_learned||'').slice(0,80):'';return `<div class="review-list-item"><div style="display:flex;align-items:center;gap:8px;flex:1;min-width:0;flex-wrap:wrap;"><span class="review-period-tag ${r.period}">${r.period==='mid'?'중간':'최종'}</span><span style="font-size:10px;padding:2px 6px;border-radius:5px;background:#F4F4F5;color:var(--text-soft);font-weight:700;">${REFL_ENTITY_LABELS[et]||et}</span><span style="font-weight:600;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">${esc(label)}</span><span style="color:var(--text-soft);font-size:11px;flex-shrink:0;">${formatTs(r.updated_at)}</span>${preview?`<div style="width:100%;font-size:11.5px;color:var(--text-soft);margin-top:4px;line-height:1.5;">${highlightSearch(preview,q)}…</div>`:''}</div><button class="btn btn-ghost" data-act="open-reflection" data-etype="${et}" data-eid="${r.entity_id||r.member_id}" data-period="${r.period}">열기</button></div>`;}).join('')}</div>`;}).join('')}</section>`:(q?'<div class="empty">검색 결과가 없습니다.</div>':'')}`;
}
function renderObjReflectionRow(o,oi){
  const oMid=lastReflectionFor('objective',o.id,'mid'),oFin=lastReflectionFor('objective',o.id,'final');
  const krRows=o.keyResults.map((k,ki)=>{const m=lastReflectionFor('key_result',k.id,'mid'),f=lastReflectionFor('key_result',k.id,'final');return `<div style="display:flex;align-items:center;gap:8px;padding:8px 0;border-top:1px solid #F4F4F5;font-size:12.5px;"><span style="color:var(--text-soft);font-weight:600;min-width:32px;">KR${ki+1}</span><span style="flex:1;overflow:hidden;text-overflow:ellipsis;">${esc(k.title)}</span><button class="btn-mode" style="font-size:11px;padding:3px 9px;${m?'background:var(--amber-soft);color:var(--amber);':''}" data-act="open-reflection" data-etype="key_result" data-eid="${k.id}" data-period="mid">중간 ${m?'✓':''}</button><button class="btn-mode" style="font-size:11px;padding:3px 9px;${f?'background:var(--primary-soft);color:var(--primary);font-weight:600;':''}" data-act="open-reflection" data-etype="key_result" data-eid="${k.id}" data-period="final">최종 ${f?'✓':''}</button></div>`;}).join('');
  return `<div style="padding:14px;border:1px solid var(--line);border-radius:10px;margin-bottom:10px;"><div style="display:flex;align-items:center;gap:8px;margin-bottom:4px;"><span class="tag-id">O${oi+1}</span><span style="font-weight:700;flex:1;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">${esc(o.title)}</span><button class="btn-mode" style="font-size:11px;padding:3px 9px;${oMid?'background:var(--amber-soft);color:var(--amber);':''}" data-act="open-reflection" data-etype="objective" data-eid="${o.id}" data-period="mid">O 중간리뷰 ${oMid?'✓':''}</button><button class="btn-mode" style="font-size:11px;padding:3px 9px;${oFin?'background:var(--primary-soft);color:var(--primary);font-weight:600;':''}" data-act="open-reflection" data-etype="objective" data-eid="${o.id}" data-period="final">O 최종리뷰 ${oFin?'✓':''}</button></div>${krRows}</div>`;
}
function renderPerfCard(m){
  const a=memberAnalytics(m.id);
  const mid=lastReflectionFor('member',m.id,'mid'),fin=lastReflectionFor('member',m.id,'final');
  return `<div class="perf-card"><div class="perf-head"><div class="avatar" style="background:${m.color};">${esc(m.name.slice(0,1).toUpperCase())}</div><div><div class="perf-name">${esc(m.name)}</div><div class="perf-role">${esc(m.role||'')}</div></div></div><div class="perf-stats"><div class="perf-stat"><div class="perf-stat-label">담당 KR</div><div class="perf-stat-value" style="color:${progressColor(a.krAvg)};">${a.krs}<span style="font-size:12px;color:var(--text-soft);font-weight:500;">개 · ${a.krAvg}%</span></div></div><div class="perf-stat"><div class="perf-stat-label">이니셔티브</div><div class="perf-stat-value">${a.initsDone}<span style="font-size:12px;color:var(--text-soft);font-weight:500;">/${a.inits} 완료</span></div></div></div><div class="perf-meta">담당 Objective: ${a.okrs}개 (평균 ${a.okrAvg}%) · 막힌 Init: ${a.initsBlocked}건</div><div class="perf-actions"><button class="btn btn-soft" data-act="open-reflection" data-etype="member" data-eid="${m.id}" data-period="mid">중간 리뷰 ${mid?'✓':''}</button><button class="btn btn-primary" data-act="open-reflection" data-etype="member" data-eid="${m.id}" data-period="final">최종 리뷰 ${fin?'✓':''}</button></div></div>`;
}

// ============================================================
// v15 — WBS / 간트 차트 탭
// ============================================================
function parseQuarterRange(qStr){
  const t=todayKey();
  if(!qStr)return{start:shiftDate(t,-45),end:shiftDate(t,45)};
  const m=String(qStr).match(/(\d{4})\s*Q\s*([1-4])/i);
  if(!m)return{start:shiftDate(t,-45),end:shiftDate(t,45)};
  const year=parseInt(m[1]),q=parseInt(m[2]);
  const sm=(q-1)*3+1,em=sm+2;
  const start=`${year}-${String(sm).padStart(2,'0')}-01`;
  const lastDay=new Date(year,em,0).getDate();
  const end=`${year}-${String(em).padStart(2,'0')}-${String(lastDay).padStart(2,'0')}`;
  return{start,end};
}
function daysBetween(a,b){return Math.round((new Date(b+'T00:00:00')-new Date(a+'T00:00:00'))/86400000);}
// v25 — WBS 보기 옵션: 빈 과거 자동 절단 + 항목 있으면 분기 밖도 확장 + 뷰 모드(월/주/일) + Initiative 기본 접힘
function computeWBSRange(qRange){
  const all=[];
  state.objectives.forEach(o=>{
    if(o.startDate)all.push(o.startDate);if(o.dueDate)all.push(o.dueDate);
    (o.keyResults||[]).forEach(k=>{
      if(k.startDate)all.push(k.startDate);if(k.dueDate)all.push(k.dueDate);
      (k.initiatives||[]).forEach(i=>{
        if(i.startDate)all.push(i.startDate);if(i.dueDate)all.push(i.dueDate);
      });
    });
  });
  if(all.length===0)return qRange;
  all.sort();
  const earliest=all[0],latest=all[all.length-1];
  const today=todayKey();
  // 시작: 과거 항목이 있으면 그 시작, 아니면 오늘 (빈 과거 절단)
  const startD=earliest<today?earliest:today;
  // 종료: 분기 너머로 항목이 있으면 그 마감까지 확장
  const endD=latest>qRange.end?latest:qRange.end;
  return{start:startD,end:endD};
}
function isWBSKidsHidden(type,id){
  // v62 — 기본은 모두 펼침. 사용자가 명시적으로 접은 것만 _wbsToggled에 저장
  if(!window._wbsToggled)window._wbsToggled=new Set();
  const key=type+':'+id;
  return window._wbsToggled.has(key);
}
function renderWBS(){
  const t=currentTeam();
  const qRange=parseQuarterRange(t?.quarter);
  const range=computeWBSRange(qRange);
  const startD=range.start,endD=range.end;
  const totalDays=daysBetween(startD,endD)+1;
  const todayD=todayKey();
  const todayOffset=Math.max(0,Math.min(totalDays,daysBetween(startD,todayD)));
  // 뷰 모드 (월/주/일) — 디폴트 주
  const view=window._wbsView||(window._wbsView='week');
  const pxPerDay=view==='day'?16:view==='month'?3:7;
  window._wbsPxPerDay=pxPerDay; // 드래그 핸들러에서 사용
  // v41 — 인플레이스 업데이트(깜빡임 제거)에서 사용할 범위 정보 노출
  window._wbsStartD=startD;
  window._wbsTotalDays=totalDays;
  const timelineW=totalDays*pxPerDay;

  // 월/주 헤더 빌드
  let monthHeader='',weekHeader='';
  const startDate=new Date(startD+'T00:00:00');
  // 월 헤더 — 각 달의 시작일에 라벨
  const months={};
  for(let i=0;i<totalDays;i++){
    const d=new Date(startDate);d.setDate(d.getDate()+i);
    const key=`${d.getFullYear()}-${d.getMonth()+1}`;
    if(!months[key])months[key]={offset:i,label:`${d.getMonth()+1}월`,year:d.getFullYear()};
    months[key].width=(i-months[key].offset+1);
  }
  Object.values(months).forEach(m=>{
    monthHeader+=`<div style="position:absolute;left:${m.offset*pxPerDay}px;width:${m.width*pxPerDay}px;top:0;height:28px;border-right:1px solid #E5E5E8;display:flex;align-items:center;justify-content:center;font-size:12px;font-weight:700;color:var(--text);background:#F4F4F5;">${m.year}년 ${m.label}</div>`;
  });
  // 주/일 헤더 — 뷰 모드에 따라 라벨 빈도 조정
  if(view!=='month'){
    for(let i=0;i<totalDays;i++){
      const d=new Date(startDate);d.setDate(d.getDate()+i);
      const dow=d.getDay();
      if(view==='day'){
        // 일 뷰: 매일 표시 (요일별 색)
        const dd=`${d.getDate()}`;
        const dowColor=dow===0?'#E5484D':dow===6?'#4F6FE5':'var(--text-soft)';
        weekHeader+=`<div style="position:absolute;left:${i*pxPerDay}px;top:28px;height:24px;font-size:10px;color:${dowColor};border-left:1px solid #EDEDEE;width:${pxPerDay}px;display:flex;align-items:center;justify-content:center;font-weight:${dow===0||dow===6?'700':'500'};">${dd}</div>`;
      }else if(dow===1||i===0){
        // 주 뷰: 매주 월요일에 날짜 라벨
        const dd=`${d.getMonth()+1}/${d.getDate()}`;
        weekHeader+=`<div style="position:absolute;left:${i*pxPerDay}px;top:28px;height:24px;font-size:10px;color:var(--text-soft);padding-left:3px;border-left:1px solid #EDEDEE;width:${pxPerDay*7}px;display:flex;align-items:center;">${dd}</div>`;
      }
      // 주말 음영 (모든 비-월 뷰)
      if(dow===0||dow===6){
        weekHeader+=`<div style="position:absolute;left:${i*pxPerDay}px;top:52px;width:${pxPerDay}px;bottom:0;background:rgba(0,0,0,.02);pointer-events:none;z-index:0;"></div>`;
      }
    }
  }

  // 데이터 행 빌드
  const rows=[];
  // v15 — Objective별 색조 통일 — 같은 O 아래 KR/Init은 동일 hue
  const HUES=[250,145,30,200,340,270,80,0,165,100,310,50];
  function objColor(objIdx,type,status,progress){
    const hue=HUES[objIdx%HUES.length];
    // Initiative 상태별 우선 (완료=초록, 막힘=빨강)
    if(type==='I'){
      if(status==='done')return{bg:`hsl(140,55%,45%)`,bgGrad:`linear-gradient(90deg,hsl(140,55%,45%),hsl(140,60%,42%))`,fg:'white'};
      if(status==='blocked')return{bg:`hsl(0,70%,55%)`,bgGrad:`linear-gradient(90deg,hsl(0,70%,55%),hsl(0,75%,50%))`,fg:'white'};
      // 진행/할 일 — O hue 사용 (밝게)
      const lightness=status==='doing'?58:65;
      return{bg:`hsl(${hue},45%,${lightness}%)`,bgGrad:`linear-gradient(90deg,hsl(${hue},45%,${lightness}%),hsl(${hue},50%,${lightness-3}%))`,fg:'white'};
    }
    if(type==='T'){
      // v137 — 할일: 가장 옅은 톤 (상태별 색 우선)
      if(status==='done')return{bg:`hsl(140,45%,55%)`,bgGrad:`linear-gradient(90deg,hsl(140,45%,55%),hsl(140,48%,52%))`,fg:'white'};
      if(status==='blocked')return{bg:`hsl(0,62%,62%)`,bgGrad:`linear-gradient(90deg,hsl(0,62%,62%),hsl(0,66%,58%))`,fg:'white'};
      return{bg:`hsl(${hue},32%,74%)`,bgGrad:`linear-gradient(90deg,hsl(${hue},32%,74%),hsl(${hue},36%,71%))`,fg:'#2a2a2a'};
    }
    if(type==='KR'){
      return{bg:`hsl(${hue},55%,50%)`,bgGrad:`linear-gradient(90deg,hsl(${hue},55%,50%),hsl(${hue},60%,45%))`,fg:'white'};
    }
    // Objective — 가장 진한 톤
    return{bg:`hsl(${hue},65%,40%)`,bgGrad:`linear-gradient(90deg,hsl(${hue},65%,40%),hsl(${hue},70%,35%))`,fg:'white'};
  }
  state.objectives.forEach((o,objIdx)=>{
    const objKRs=o.keyResults||[];
    // O 시작/종료 — 명시 값 > KR/Init 범위에서 유추 > 분기 범위
    const allStarts=[o.startDate].concat(objKRs.map(k=>k.startDate)).concat(objKRs.flatMap(k=>(k.initiatives||[]).map(i=>i.startDate))).filter(Boolean).sort();
    const allEnds=[o.dueDate].concat(objKRs.map(k=>k.dueDate)).concat(objKRs.flatMap(k=>(k.initiatives||[]).map(i=>i.dueDate))).filter(Boolean).sort();
    const objStart=o.startDate||allStarts[0]||startD;
    const objEnd=o.dueDate||allEnds[allEnds.length-1]||endD;
    const objAvg=objKRs.length?Math.round(objKRs.reduce((s,k)=>s+pct(k.current,k.target),0)/objKRs.length):0;
    rows.push({type:'O',id:o.id,label:o.title||'(Objective)',level:0,start:objStart,end:objEnd,owner:o.ownerId,progress:objAvg,confidence:o.confidence,objIdx});
    if(isWBSKidsHidden('O',o.id))return;
    objKRs.forEach(k=>{
      const krP=pct(k.current,k.target);
      const krKidStarts=(k.initiatives||[]).map(i=>i.startDate).filter(Boolean).sort();
      const krKidEnds=(k.initiatives||[]).map(i=>i.dueDate).filter(Boolean).sort();
      const krStart=k.startDate||krKidStarts[0]||objStart;
      const krEnd=k.dueDate||krKidEnds[krKidEnds.length-1]||objEnd;
      rows.push({type:'KR',id:k.id,label:k.title||'(KR)',level:1,start:krStart,end:krEnd,owner:k.ownerId,progress:krP,confidence:k.confidence,objId:o.id,objIdx});
      if(isWBSKidsHidden('KR',k.id))return;
      (k.initiatives||[]).forEach(i=>{
        const iStart=i.startDate||krStart;
        const iEnd=i.dueDate||krEnd;
        const iTasks=(state.initiativeTasks&&state.initiativeTasks[i.id])||[];
        rows.push({type:'I',id:i.id,label:i.title||'(Initiative)',level:2,start:iStart,end:iEnd,owner:i.ownerId,status:i.status||'todo',objId:o.id,krId:k.id,confidence:i.confidence,objIdx,taskCount:iTasks.length});
        // v137 — 이니셔티브 하위 할일 행 (펼침 상태에서만)
        if(isWBSKidsHidden('I',i.id))return;
        iTasks.forEach(tsk=>{
          const tStart=tsk.start_date||iStart;
          const tEnd=tsk.due_date||tsk.start_date||iEnd;
          rows.push({type:'T',id:tsk.id,label:tsk.title||'(할일)',level:3,start:tStart,end:tEnd,owner:tsk.owner_id,status:tsk.status||'todo',objId:o.id,krId:k.id,initId:i.id,objIdx});
        });
      });
    });
  });

  // 좌측 라벨 + 우측 바 한 줄씩 그리기
  let labelsHtml='',barsHtml='';
  const ROW_H=48; // v62 — 행 높이 늘려 2줄 텍스트 수용
  rows.forEach((r,idx)=>{
    // v16 — 다중 담당자 + 팀 전원 지원
    // v26 — O·KR은 담당자 칩 생략 (Initiative만 표시)
    const ownerName=r.owner?memberName(r.owner):'';
    const ownerChip=(r.type==='I'&&ownerName&&ownerName!=='-')?`<span class="kr-strip-owner" style="font-size:10px;padding:1px 6px;${r.owner==='__team_all__'?'background:var(--primary-soft);color:var(--primary);':''}">${esc(ownerName)}</span>`:'';
    const lvIndent=r.level*16+8;
    // v15 — Objective별 hue를 라벨 좌측에 컬러 바로 적용
    const labelHue=HUES[r.objIdx%HUES.length];
    let icon='',badge='';
    if(r.type==='O'){icon='🎯';badge=`<span style="background:hsl(${labelHue},65%,90%);color:hsl(${labelHue},65%,30%);font-size:9px;padding:1px 6px;border-radius:999px;font-weight:700;">O</span>`;}
    else if(r.type==='KR'){icon='📌';badge=`<span style="background:hsl(${labelHue},55%,92%);color:hsl(${labelHue},55%,35%);font-size:9px;padding:1px 6px;border-radius:999px;font-weight:700;">KR</span>`;}
    else if(r.type==='I'){icon='⚡';badge=`<span style="background:hsl(${labelHue},45%,93%);color:hsl(${labelHue},45%,40%);font-size:9px;padding:1px 6px;border-radius:999px;font-weight:700;">Init</span>`;}
    else{icon='↳';badge=`<span style="background:hsl(${labelHue},30%,94%);color:hsl(${labelHue},30%,45%);font-size:9px;padding:1px 6px;border-radius:999px;font-weight:700;">할일</span>`;}
    // v137 — I(할일 보유 시)도 접기/펼치기, 할일 추가·소속 KR 변경 컨트롤
    const wbsEditable=(typeof canEditOKR==='function'&&canEditOKR());
    const canCollapse=r.type==='O'||r.type==='KR'||(r.type==='I'&&(r.taskCount||0)>0);
    const collapseKey=r.type+':'+r.id;
    const isCollapsed=isWBSKidsHidden(r.type,r.id);
    const toggleBtn=canCollapse?`<button class="btn-icon" data-act="wbs-toggle" data-key="${collapseKey}" style="padding:0 4px;flex-shrink:0;">${caret(!isCollapsed,11)}</button>`:`<span style="display:inline-block;width:14px;"></span>`;
    let wbsCtrl='';
    if(r.type==='I'&&wbsEditable){
      const krOpts=state.objectives.map(o2=>`<optgroup label="${esc((o2.title||'O').slice(0,18))}">`+(o2.keyResults||[]).map(k2=>`<option value="${k2.id}" ${k2.id===r.krId?'selected':''}>${esc((k2.title||'KR').slice(0,20))}</option>`).join('')+`</optgroup>`).join('');
      wbsCtrl=`<button class="btn-icon" data-act="wbs-add-task" data-iid="${r.id}" data-krid="${r.krId}" title="이 이니셔티브에 할일 추가" style="padding:0 4px;flex-shrink:0;font-weight:800;color:var(--primary);">＋</button>`
        +`<select class="wbs-init-kr-move" data-field="wbs-init-kr" data-iid="${r.id}" data-curkr="${r.krId}" title="소속 KR 변경(다른 KR로 이동)" style="flex-shrink:0;font-size:10px;max-width:108px;border:1px solid var(--line);border-radius:5px;padding:2px 4px;background:white;color:var(--text-soft);font-family:inherit;cursor:pointer;">${krOpts}</select>`;
    }else if(r.type==='T'&&wbsEditable){
      wbsCtrl=`<button class="btn-icon" data-act="wbs-del-task" data-iid="${r.initId}" data-tid="${r.id}" title="할일 삭제" style="padding:0 4px;flex-shrink:0;color:var(--warning);">${I.x}</button>`;
    }
    const rowBg=r.type==='O'?`background:hsl(${labelHue},60%,96%);`:r.type==='T'?`background:hsl(${labelHue},25%,98.5%);`:'';
    const sideBar=`<span style="position:absolute;left:0;top:0;bottom:0;width:3px;background:hsl(${labelHue},60%,55%);"></span>`;
    // v62 — 제목 2줄까지 wrap. O는 shimmer. 텍스트 잘림 X
    const titleCls=r.type==='O'?'wbs-title-clamp obj-shimmer':'wbs-title-clamp';
    // v137 — 할일(T) 제목은 인라인 입력칸으로 (WBS에서 직접 입력·수정·저장)
    const titleHtml=(r.type==='T'&&wbsEditable)
      ?`<input class="wbs-task-title-input" data-field="wbs-task-title" data-iid="${r.initId}" data-tid="${r.id}" value="${esc(r.label==='(할일)'?'':r.label)}" placeholder="할일 내용 입력" style="flex:1;min-width:80px;font-size:11px;padding:3px 6px;border:1px solid transparent;border-radius:5px;background:transparent;font-family:inherit;${r.status==='done'?'text-decoration:line-through;color:var(--text-soft);':''}" title="${esc(r.label)}"/>`
      :`<span class="${titleCls}" title="${esc(r.label)}">${esc(r.label)}</span>`;
    labelsHtml+=`<div class="wbs-label-row" style="position:relative;min-height:${ROW_H}px;display:flex;align-items:center;gap:6px;padding:0 10px 0 ${lvIndent}px;border-bottom:1px solid #F4F4F5;font-size:${r.type==='O'?'13':r.type==='KR'?'12.5':r.type==='T'?'11':'12'}px;${rowBg}${r.type==='O'?'font-weight:800;':r.type==='KR'?'font-weight:600;':''}">${sideBar}${toggleBtn}<span style="flex-shrink:0;">${icon}</span>${badge}${titleHtml}${ownerChip}${wbsCtrl}</div>`;

    // 바 위치
    const sOff=Math.max(0,daysBetween(startD,r.start));
    const eOff=Math.min(totalDays-1,daysBetween(startD,r.end));
    const bw=Math.max(pxPerDay,(eOff-sOff+1)*pxPerDay);
    const bl=sOff*pxPerDay;
    // v15 — Objective별 색조 통일
    const c=objColor(r.objIdx,r.type,r.status,r.progress);
    let label='';
    if(r.type==='O'||r.type==='KR')label=`${r.progress}%`;
    else label=r.status==='done'?'완료':r.status==='blocked'?'막힘':r.status==='doing'?'진행':'';
    const overdue=isOverdue(r.end,r.status);
    const startInfo=r.start?dueShort(r.start):'';
    const endInfo=r.end?dueShort(r.end):'';
    const dateLabel=startInfo&&endInfo?` · ${startInfo} ~ ${endInfo}`:'';
    barsHtml+=`<div class="wbs-bar-row" style="height:${ROW_H}px;position:relative;border-bottom:1px solid #F4F4F5;">
      <div class="wbs-bar" data-act="wbs-jump" data-type="${r.type}" data-id="${r.id}" data-oid="${r.objId||r.id}" data-krid="${r.krId||(r.type==='KR'?r.id:'')}" data-iid="${r.type==='T'?(r.initId||''):''}" data-start="${r.start||''}" data-end="${r.end||''}" style="position:absolute;left:${bl}px;top:5px;width:${bw}px;height:${r.type==='T'?'20':'24'}px;background:${c.bgGrad};color:${c.fg};border-radius:5px;display:flex;align-items:center;padding:0 8px;font-size:10.5px;font-weight:700;box-shadow:0 1px 2px rgba(0,0,0,.1);overflow:hidden;white-space:nowrap;text-overflow:ellipsis;${overdue&&r.type==='I'&&r.status!=='done'?'border:1.5px solid #B71D24;':''}" title="${esc(r.label)}${dateLabel} · 끝 잡고 드래그=마감 변경, 가운데 드래그=일정 이동, 더블클릭=날짜 직접 입력">${label?esc(label):esc(r.label).slice(0,30)}</div>
    </div>`;
  });

  if(rows.length===0){
    return `<div style="margin-bottom:14px;"><h2 style="font-weight:800;font-size:23px;margin:0;">WBS · 간트 차트</h2><div style="font-size:13px;color:var(--text-soft);margin-top:2px;">Objective → KR → Initiative 일정 한판 보기</div></div><div class="empty">OKR 탭에서 Objective와 KR을 먼저 추가하세요.</div>`;
  }

  return `<div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:14px;flex-wrap:wrap;gap:10px;">
    <div><h2 style="font-weight:800;font-size:23px;margin:0;">WBS · 간트 차트</h2><div style="font-size:13px;color:var(--text-soft);margin-top:2px;">${esc(t?.quarter||'')} · ${range.start.slice(5).replace('-','/')} ~ ${range.end.slice(5).replace('-','/')} (총 ${totalDays}일)</div></div>
    <div style="display:flex;gap:8px;align-items:center;font-size:11.5px;color:var(--text-soft);flex-wrap:wrap;">
      <button data-act="wbs-download" class="btn btn-soft" title="간트차트를 PNG 이미지로 저장" style="padding:5px 11px;font-size:11.5px;display:inline-flex;align-items:center;gap:5px;">${I.download} 다운로드</button>
      <div class="wbs-view-mode" style="display:inline-flex;border:1px solid var(--line);border-radius:7px;overflow:hidden;background:white;">
        ${(()=>{const opts=[{m:'month',l:'월'},{m:'week',l:'주'},{m:'day',l:'일'}];return opts.map((o,i)=>`<button data-act="wbs-view" data-mode="${o.m}" title="${o.m==='month'?'월별':o.m==='week'?'주차별':'일별'} 보기" style="padding:5px 11px;background:${view===o.m?'var(--primary)':'transparent'};color:${view===o.m?'white':'var(--text)'};border:none;cursor:pointer;font-family:inherit;font-size:11.5px;font-weight:${view===o.m?'700':'500'};${i<opts.length-1?'border-right:1px solid var(--line);':''}">${o.l}</button>`).join('');})()}
      </div>
      <span style="font-weight:700;color:var(--text);">색조:</span>
      ${state.objectives.map((o,oi)=>{const hue=HUES[oi%HUES.length];return `<span style="display:inline-flex;align-items:center;gap:4px;"><span style="display:inline-flex;gap:1px;"><span style="width:8px;height:14px;border-radius:2px 0 0 2px;background:hsl(${hue},65%,40%);"></span><span style="width:8px;height:14px;background:hsl(${hue},55%,50%);"></span><span style="width:8px;height:14px;border-radius:0 2px 2px 0;background:hsl(${hue},45%,65%);"></span></span>O${oi+1}</span>`;}).join('')}
      <span style="display:inline-flex;align-items:center;gap:4px;margin-left:8px;"><span style="width:12px;height:10px;border-radius:3px;background:hsl(140,55%,45%);"></span>완료</span>
      <span style="display:inline-flex;align-items:center;gap:4px;"><span style="width:12px;height:10px;border-radius:3px;background:hsl(0,70%,55%);"></span>막힘</span>
      <span style="display:inline-flex;align-items:center;gap:6px;margin-left:4px;"><span style="display:inline-block;width:2px;height:14px;background:var(--warning);"></span>오늘</span>
    </div>
  </div>
  <div class="wbs-container" style="display:grid;grid-template-columns:480px 1fr;gap:0;border:1px solid var(--line);border-radius:10px;overflow:hidden;background:white;">
    <div class="wbs-labels-col" style="border-right:1px solid var(--line);background:white;">
      <div style="height:52px;background:#F4F4F5;border-bottom:1px solid var(--line);display:flex;align-items:center;padding:0 12px;font-size:12px;font-weight:700;color:var(--text);">항목 (${rows.length}건)</div>
      ${labelsHtml}
    </div>
    <div class="wbs-timeline-col" style="overflow-x:auto;position:relative;">
      <div style="position:relative;width:${timelineW}px;min-width:100%;">
        <div style="position:relative;height:52px;background:#F4F4F5;border-bottom:1px solid var(--line);">${monthHeader}${weekHeader}</div>
        <div style="position:relative;">${barsHtml}
          <div style="position:absolute;left:${todayOffset*pxPerDay}px;top:0;bottom:0;width:2px;background:var(--warning);z-index:5;pointer-events:none;box-shadow:0 0 4px rgba(229,72,77,.5);"></div>
          <div style="position:absolute;left:${todayOffset*pxPerDay-14}px;top:-20px;background:var(--warning);color:white;font-size:10px;font-weight:700;padding:1px 5px;border-radius:3px;z-index:6;">오늘</div>
        </div>
      </div>
    </div>
  </div>
  <div style="font-size:11.5px;color:var(--text-soft);margin-top:8px;line-height:1.55;">
    💡 막대 클릭 → 점프 · 막대 가운데 드래그 → 일정 이동 · 막대 끝 잡고 드래그 → 시작/마감 변경 · 막대 더블클릭 → 날짜 직접 입력 · ▶▼ → 접기·펼치기 · Initiative 마감 지연 시 빨간 테두리
  </div>`;
}
// v62 — WBS 간트차트 PNG 다운로드 (html2canvas 동적 로드)
async function downloadWBSPng(){
  const target=document.querySelector('.wbs-container');
  if(!target){showToast('차트를 찾을 수 없습니다',true);return;}
  showToast('이미지 생성 중…');
  // html2canvas 동적 로드
  if(!window.html2canvas){
    try{
      await new Promise((resolve,reject)=>{
        const s=document.createElement('script');
        s.src='https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js';
        s.onload=resolve;s.onerror=reject;
        document.head.appendChild(s);
      });
    }catch(e){console.warn('[wbs-png] lib load failed',e);showToast('html2canvas 로드 실패',true);return;}
  }
  // 좌측 라벨 + 우측 타임라인 전체를 캡처 (timeline은 가로 스크롤 영역 전체)
  try{
    const scrollArea=target.querySelector('.wbs-timeline-col');
    const origOverflow=scrollArea?scrollArea.style.overflow:null;
    const origWidth=target.style.width;
    if(scrollArea)scrollArea.style.overflow='visible';
    target.style.width='max-content';
    await new Promise(r=>setTimeout(r,60)); // reflow 대기
    const canvas=await window.html2canvas(target,{
      scale:2,backgroundColor:'#ffffff',logging:false,
      width:target.scrollWidth,height:target.scrollHeight,
      windowWidth:target.scrollWidth+100
    });
    if(scrollArea)scrollArea.style.overflow=origOverflow;
    target.style.width=origWidth;
    const link=document.createElement('a');
    const t=currentTeam();const dateStr=todayKey();
    link.download=`WBS_${(t?.name||'team').replace(/[^\w가-힣]/g,'_')}_${dateStr}.png`;
    link.href=canvas.toDataURL('image/png');
    link.click();
    showToast('다운로드 완료');
  }catch(e){console.warn('[wbs-png] capture failed',e);showToast('이미지 생성 실패',true);}
}
// v21 — WBS 막대 드래그로 일정 이동 (시작·종료 유지 폭) + 드래그 중 날짜 툴팁
(function(){
  function pxPerDay(){return window._wbsPxPerDay||7;} // 현재 렌더 뷰의 px/day
  let drag=null,tipEl=null;
  function ensureTip(){
    if(tipEl)return tipEl;
    tipEl=document.createElement('div');
    tipEl.className='wbs-drag-tip';
    tipEl.style.display='none';
    document.body.appendChild(tipEl);
    return tipEl;
  }
  function showTip(html,x,y){const t=ensureTip();t.innerHTML=html;t.style.display='block';t.style.left=(x+14)+'px';t.style.top=(y-44)+'px';}
  function hideTip(){if(tipEl)tipEl.style.display='none';}
  function shiftYMD(ymd,days){if(!ymd)return ymd;const d=new Date(ymd+'T00:00:00');d.setDate(d.getDate()+days);return d.getFullYear()+'-'+String(d.getMonth()+1).padStart(2,'0')+'-'+String(d.getDate()).padStart(2,'0');}
  function fmtMD(ymd){return ymd?ymd.slice(5).replace('-','/'):'—';}
  function findItem(type,id){
    // v37 — state는 top-level let이라 window.state에 안 붙음 → lexical scope의 state 직접 사용
    if(typeof state==='undefined'||!state||!state.objectives)return null;
    for(const o of state.objectives){
      if(type==='O'&&o.id===id)return{kind:'O',item:o};
      for(const k of(o.keyResults||[])){
        if(type==='KR'&&k.id===id)return{kind:'KR',oid:o.id,item:k};
        for(const i of(k.initiatives||[])){
          if(type==='I'&&i.id===id)return{kind:'I',krid:k.id,item:i};
        }
      }
    }
    // v137 — 할일(T): startDate/dueDate를 가진 어댑터로 래핑해 기존 막대 드래그 재사용
    if(type==='T'&&state.initiativeTasks){
      for(const iid of Object.keys(state.initiativeTasks)){
        const tk=(state.initiativeTasks[iid]||[]).find(x=>x.id===id);
        if(tk)return{kind:'T',iid,item:{get startDate(){return tk.start_date;},set startDate(v){tk.start_date=v;},get dueDate(){return tk.due_date;},set dueDate(v){tk.due_date=v;},_raw:tk}};
      }
    }
    return null;
  }
  function canDragNow(){
    if(typeof isObserver==='function'&&isObserver())return false;
    if(typeof selfMember==='function'&&!selfMember())return false;
    return true;
  }
  function detectMode(bar,clientX){
    const r=bar.getBoundingClientRect();
    // v35 — 핸들 영역 12px로 확대 (좁은 막대에선 폭의 1/3까지)
    const handle=r.width<14?0:Math.min(12,r.width/3);
    if(handle>0){
      if(clientX-r.left<handle)return'resize-start';
      if(r.right-clientX<handle)return'resize-end';
    }
    return'move';
  }
  // v27 — 호버 시 끝 가까우면 커서 변경
  document.addEventListener('mousemove',function(e){
    if(drag)return;
    const bar=e.target.closest('.wbs-bar');
    if(!bar)return;
    const m=detectMode(bar,e.clientX);
    bar.style.cursor=m==='move'?'grab':'ew-resize';
  });
  // v36 — pointer/mouse 둘 다 받고, document/window 양쪽 등록, 디버그 로그
  const DBG=()=>!!window._wbsDragDebug;
  function startDrag(e,bar){
    if(!canDragNow()){if(DBG())console.log('[wbs-drag] canDragNow=false');return;}
    const type=bar.dataset.type,id=bar.dataset.id;
    const found=findItem(type,id);
    if(!found||!found.item){if(DBG())console.log('[wbs-drag] item not found',type,id);return;}
    const it=found.item;
    const mode=detectMode(bar,e.clientX);
    const visStart=bar.dataset.start||null;
    const visEnd=bar.dataset.end||null;
    const origStart=it.startDate||visStart;
    const origEnd=it.dueDate||visEnd;
    if(mode==='resize-start'&&!origStart){if(DBG())console.log('[wbs-drag] no start for resize-start');return;}
    if(mode==='resize-end'&&!origEnd){if(DBG())console.log('[wbs-drag] no end for resize-end');return;}
    if(mode==='move'&&!origStart&&!origEnd){if(DBG())console.log('[wbs-drag] no dates for move');return;}
    drag={
      bar,type,id,found,mode,
      origStart,origEnd,
      startX:e.clientX,
      origLeft:parseFloat(bar.style.left)||0,
      origWidth:parseFloat(bar.style.width)||bar.getBoundingClientRect().width,
      moved:false,days:0,
      pointerId:e.pointerId
    };
    try{if(e.pointerId!=null)bar.setPointerCapture(e.pointerId);}catch(_){}
    bar.classList.add('dragging');
    bar.classList.add('drag-'+mode);
    if(DBG())console.log('[wbs-drag] start',{mode,origStart,origEnd,origLeft:drag.origLeft,origWidth:drag.origWidth});
    // 기본 동작 차단 (텍스트 선택, 이미지 드래그 등)
    if(e.preventDefault)e.preventDefault();
  }
  function moveDrag(e){
    if(!drag)return;
    const dx=e.clientX-drag.startX;
    if(!drag.moved&&Math.abs(dx)<3)return; // v36 — 3px로 더 낮춤
    drag.moved=true;
    const ppd=pxPerDay();
    let days=Math.round(dx/ppd);
    if(drag.mode==='move'){
      drag.bar.style.left=(drag.origLeft+days*ppd)+'px';
    }else if(drag.mode==='resize-start'){
      const maxDays=Math.floor((drag.origWidth-ppd)/ppd);
      if(days>maxDays)days=maxDays;
      drag.bar.style.left=(drag.origLeft+days*ppd)+'px';
      drag.bar.style.width=(drag.origWidth-days*ppd)+'px';
    }else if(drag.mode==='resize-end'){
      const minDays=-Math.floor((drag.origWidth-ppd)/ppd);
      if(days<minDays)days=minDays;
      drag.bar.style.width=(drag.origWidth+days*ppd)+'px';
    }
    drag.days=days;
    const moveStart=drag.mode==='move'||drag.mode==='resize-start';
    const moveEnd=drag.mode==='move'||drag.mode==='resize-end';
    const ns=drag.origStart&&moveStart?shiftYMD(drag.origStart,days):drag.origStart;
    const ne=drag.origEnd&&moveEnd?shiftYMD(drag.origEnd,days):drag.origEnd;
    let html='';
    if(drag.mode==='resize-start'&&ns)html='시작 '+fmtMD(ns);
    else if(drag.mode==='resize-end'&&ne)html='마감 '+fmtMD(ne);
    else if(ns&&ne)html=fmtMD(ns)+' ~ '+fmtMD(ne);
    else if(ne)html='마감 '+fmtMD(ne);
    else if(ns)html='시작 '+fmtMD(ns);
    html+='<span style="opacity:.7;margin-left:6px;">('+(days>0?'+':'')+days+'일)</span>';
    showTip(html,e.clientX,e.clientY);
  }
  function endDrag(e){
    if(!drag)return;
    const d=drag;drag=null;
    try{if(e.pointerId!=null)d.bar.releasePointerCapture(e.pointerId);}catch(_){}
    d.bar.classList.remove('dragging','drag-move','drag-resize-start','drag-resize-end');
    hideTip();
    if(DBG())console.log('[wbs-drag] end',{moved:d.moved,days:d.days});
    // v39 — 사용자가 움직였다면 이후 클릭은 무조건 차단 (날짜 변경 없는 작은 드래그라도 점프 방지)
    if(d.moved){
      d.bar.dataset.justDragged='1';
      setTimeout(()=>{try{delete d.bar.dataset.justDragged;}catch(_){}},300);
      if(window._wbsJumpTimer){clearTimeout(window._wbsJumpTimer);window._wbsJumpTimer=null;}
    }
    if(!d.moved||d.days===0){
      // v41 — 움직이긴 했지만 날짜 변경 없음 → 원위치로 부드럽게 되돌림
      if(d.moved){
        d.bar.style.transition='left .15s ease, width .15s ease';
        d.bar.style.left=d.origLeft+'px';
        d.bar.style.width=d.origWidth+'px';
        setTimeout(()=>{d.bar.style.transition='';},200);
      }
      return;
    }
    const it=d.found.item;
    if(d.mode==='move'){
      if(d.origStart)it.startDate=shiftYMD(d.origStart,d.days);
      if(d.origEnd)it.dueDate=shiftYMD(d.origEnd,d.days);
    }else if(d.mode==='resize-start'){
      if(d.origStart)it.startDate=shiftYMD(d.origStart,d.days);
    }else if(d.mode==='resize-end'){
      if(d.origEnd)it.dueDate=shiftYMD(d.origEnd,d.days);
    }
    try{
      if(d.found.kind==='O'&&typeof saveObjective==='function')saveObjective(it);
      else if(d.found.kind==='KR'&&typeof saveKR==='function')saveKR(d.found.oid,it);
      else if(d.found.kind==='I'&&typeof saveInitiative==='function')saveInitiative(d.found.krid,it);
      else if(d.found.kind==='T'&&typeof saveInitiativeTask==='function')saveInitiativeTask(it._raw); // v137
    }catch(err){console.warn('[WBS drag] save failed',err);}
    // v41 — 깜빡임 제거: render() 호출 안 함. 막대 시각 상태는 이미 드래그 중 업데이트됨.
    // 드래그한 막대의 data 속성과 propagation으로 갱신된 상위 막대만 인플레이스 업데이트.
    if(it.startDate)d.bar.dataset.start=it.startDate;
    if(it.dueDate)d.bar.dataset.end=it.dueDate;
    if(typeof updateAncestorBars==='function')updateAncestorBars(d.found);
  }
  // v41 — propagation 영향 상위 막대를 인플레이스로 부드럽게 갱신 (전체 render 없이)
  function updateBarVisual(barEl,item){
    if(!barEl||!item||!item.startDate||!item.dueDate)return;
    const startD=window._wbsStartD,ppd=window._wbsPxPerDay,totalDays=window._wbsTotalDays;
    if(!startD||!ppd||!totalDays)return;
    const sOff=Math.max(0,daysBetween(startD,item.startDate));
    const eOff=Math.min(totalDays-1,daysBetween(startD,item.dueDate));
    const bw=Math.max(ppd,(eOff-sOff+1)*ppd);
    const bl=sOff*ppd;
    barEl.style.transition='left .25s ease, width .25s ease';
    barEl.style.left=bl+'px';
    barEl.style.width=bw+'px';
    barEl.dataset.start=item.startDate;
    barEl.dataset.end=item.dueDate;
    setTimeout(()=>{barEl.style.transition='';},320);
  }
  function updateAncestorBars(found){
    if(!found)return;
    if(found.kind==='I'){
      // 부모 KR
      const krBar=document.querySelector('.wbs-bar[data-type="KR"][data-id="'+found.krid+'"]');
      const krFound=findItem('KR',found.krid);
      if(krBar&&krFound)updateBarVisual(krBar,krFound.item);
      // 조부모 O
      if(krFound){
        let parentOid=null;
        if(state&&state.objectives){
          for(const o of state.objectives){if((o.keyResults||[]).some(k=>k.id===found.krid)){parentOid=o.id;break;}}
        }
        if(parentOid){
          const oBar=document.querySelector('.wbs-bar[data-type="O"][data-id="'+parentOid+'"]');
          const oFound=findItem('O',parentOid);
          if(oBar&&oFound)updateBarVisual(oBar,oFound.item);
        }
      }
    }else if(found.kind==='KR'){
      const oBar=document.querySelector('.wbs-bar[data-type="O"][data-id="'+found.oid+'"]');
      const oFound=findItem('O',found.oid);
      if(oBar&&oFound)updateBarVisual(oBar,oFound.item);
    }
  }
  function cancelDrag(e){
    if(!drag)return;
    try{if(e&&e.pointerId!=null)drag.bar.releasePointerCapture(e.pointerId);}catch(_){}
    drag.bar.classList.remove('dragging','drag-move','drag-resize-start','drag-resize-end');
    hideTip();
    drag=null;
  }
  // pointer 이벤트 (현대 브라우저)
  document.addEventListener('pointerdown',function(e){
    if(e.button!=null&&e.button!==0&&e.pointerType==='mouse')return;
    const bar=e.target.closest('.wbs-bar');if(!bar)return;
    startDrag(e,bar);
  },true);
  document.addEventListener('pointermove',moveDrag,true);
  document.addEventListener('pointerup',endDrag,true);
  document.addEventListener('pointercancel',cancelDrag,true);
  // mouse 이벤트 백업 (pointer 미지원·이벤트 누락 대비) + window 등록으로 dom 밖에서 mouseup해도 종료
  document.addEventListener('mousedown',function(e){
    if(drag)return; // pointerdown이 이미 잡았으면 skip
    if(e.button!==0)return;
    const bar=e.target.closest('.wbs-bar');if(!bar)return;
    if(DBG())console.log('[wbs-drag] fallback mousedown');
    startDrag(e,bar);
  },true);
  window.addEventListener('mousemove',function(e){if(drag)moveDrag(e);},true);
  window.addEventListener('mouseup',function(e){if(drag)endDrag(e);},true);
  // 드래그 직후의 click은 기존 wbs-jump가 받지 않도록 차단
  document.addEventListener('click',function(e){
    const bar=e.target.closest('.wbs-bar');
    if(!bar)return;
    if(bar.dataset.justDragged){e.stopImmediatePropagation();e.preventDefault();}
  },true);
  // v35 — 막대 더블클릭 시 시작·마감 직접 입력 팝오버
  let datePopover=null;
  function closeDatePopover(){
    if(datePopover){try{datePopover.remove();}catch(_){}datePopover=null;}
    document.removeEventListener('mousedown',onOutsideClick,true);
    document.removeEventListener('keydown',onPopoverKey,true);
  }
  function onOutsideClick(e){
    if(!datePopover)return;
    if(datePopover.contains(e.target))return;
    closeDatePopover();
  }
  function onPopoverKey(e){
    if(e.key==='Escape'){closeDatePopover();}
  }
  function openDatePopover(bar){
    closeDatePopover();
    const type=bar.dataset.type,id=bar.dataset.id;
    const found=findItem(type,id);
    if(!found||!found.item)return;
    const it=found.item;
    if(!canDragNow())return;
    // Init은 본인/관리자, KR/O는 관리자
    if(found.kind==='I'&&typeof canEditInit==='function'&&!canEditInit(it))return;
    if((found.kind==='KR'||found.kind==='O')&&typeof canEditOKR==='function'&&!canEditOKR())return;
    const r=bar.getBoundingClientRect();
    const curStart=it.startDate||bar.dataset.start||'';
    const curEnd=it.dueDate||bar.dataset.end||'';
    const pop=document.createElement('div');
    pop.className='wbs-date-popover';
    pop.style.cssText='position:fixed;z-index:9998;background:white;border:1px solid var(--line);border-radius:8px;padding:10px 12px;box-shadow:0 8px 24px rgba(0,0,0,.18);font-family:inherit;font-size:12px;min-width:240px;';
    pop.innerHTML=
      '<div style="font-size:11px;font-weight:700;color:var(--text-soft);margin-bottom:7px;">'+
        (type==='O'?'🎯 Objective':type==='KR'?'📌 KR':'⚡ Initiative')+' 일정 직접 입력'+
      '</div>'+
      '<div style="font-size:12px;color:var(--text);margin-bottom:8px;font-weight:600;max-width:280px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">'+escapeHtml(it.title||'')+'</div>'+
      '<label style="display:flex;align-items:center;gap:8px;margin-bottom:6px;font-size:11.5px;color:var(--text-soft);"><span style="width:36px;font-weight:700;">시작</span><input type="date" data-wbs-date="start" value="'+curStart+'" style="flex:1;padding:5px 8px;border:1px solid var(--line);border-radius:5px;font-family:inherit;font-size:12.5px;outline:none;"/></label>'+
      '<label style="display:flex;align-items:center;gap:8px;margin-bottom:8px;font-size:11.5px;color:var(--text-soft);"><span style="width:36px;font-weight:700;">마감</span><input type="date" data-wbs-date="end" value="'+curEnd+'" style="flex:1;padding:5px 8px;border:1px solid var(--line);border-radius:5px;font-family:inherit;font-size:12.5px;outline:none;"/></label>'+
      '<div style="display:flex;gap:6px;justify-content:flex-end;">'+
        '<button type="button" data-wbs-date-act="cancel" style="padding:5px 11px;font-size:11.5px;border:1px solid var(--line);background:white;border-radius:5px;cursor:pointer;font-family:inherit;">취소</button>'+
        '<button type="button" data-wbs-date-act="save" style="padding:5px 13px;font-size:11.5px;border:none;background:var(--primary);color:white;border-radius:5px;cursor:pointer;font-family:inherit;font-weight:700;">저장</button>'+
      '</div>';
    document.body.appendChild(pop);
    datePopover=pop;
    // 위치 — 막대 위/아래로 자동 배치
    const ph=pop.getBoundingClientRect().height;
    const pw=pop.getBoundingClientRect().width;
    let top=r.top-ph-6;if(top<8)top=r.bottom+6;
    let left=r.left;if(left+pw>window.innerWidth-8)left=window.innerWidth-pw-8;
    if(left<8)left=8;
    pop.style.left=left+'px';pop.style.top=top+'px';
    // 핸들러
    pop.addEventListener('click',function(e){
      const a=e.target.closest('[data-wbs-date-act]');if(!a)return;
      if(a.dataset.wbsDateAct==='cancel'){closeDatePopover();return;}
      if(a.dataset.wbsDateAct==='save'){
        const ns=pop.querySelector('input[data-wbs-date="start"]').value||null;
        const ne=pop.querySelector('input[data-wbs-date="end"]').value||null;
        if(ns&&ne&&ns>ne){if(typeof showToast==='function')showToast('시작일이 마감일보다 늦습니다',true);return;}
        it.startDate=ns;it.dueDate=ne;
        try{
          if(found.kind==='O'&&typeof saveObjective==='function')saveObjective(it);
          else if(found.kind==='KR'&&typeof saveKR==='function')saveKR(found.oid,it);
          else if(found.kind==='I'&&typeof saveInitiative==='function')saveInitiative(found.krid,it);
        }catch(err){console.warn('[WBS date popover] save failed',err);}
        closeDatePopover();
        if(typeof render==='function')render();
      }
    });
    setTimeout(()=>{
      document.addEventListener('mousedown',onOutsideClick,true);
      document.addEventListener('keydown',onPopoverKey,true);
      const first=pop.querySelector('input[data-wbs-date="start"]');if(first)first.focus();
    },0);
  }
  document.addEventListener('dblclick',function(e){
    const bar=e.target.closest('.wbs-bar');
    if(!bar)return;
    e.stopImmediatePropagation();e.preventDefault();
    // v39 — 예약된 단일클릭 점프 취소 (더블클릭이 우선)
    if(window._wbsJumpTimer){clearTimeout(window._wbsJumpTimer);window._wbsJumpTimer=null;}
    openDatePopover(bar);
  },true);
})();

function renderManage(){
  const t=currentTeam();
  const meAdmin=isAdmin();
  const adminCnt=state.members.filter(m=>m.isAdmin).length;
  // v107 — PIN 자동 brute-force 제거 (배경 작업이 '뚝뚝 끊김' 유발). '🔍 PIN 보기' 버튼 클릭 시에만 복원
  // v16 — 관리자 전용 섹션 (탭 통합)
  const adminPanel=meAdmin?renderAdminPanel():'';
  return `${adminPanel}<section class="card"><div class="section-head" style="margin-bottom:14px;"><span class="section-title">현재 팀 정보</span><span class="section-meta">· 헤더에서 다른 팀으로 전환 가능</span></div><div class="manage-grid"><label><span class="labeled-label">팀 이름</span><input class="labeled-input" data-field="team-name" value="${esc(t?.name||'')}" /></label><label><span class="labeled-label">분기</span><input class="labeled-input" data-field="team-quarter" value="${esc(t?.quarter||'')}" /></label></div>${state.teams.length>1?`<div style="margin-top:12px;"><button class="btn btn-danger" data-act="del-team">이 팀 삭제 (모든 데이터 함께)</button></div>`:''}</section><section class="card"><div class="section-head" style="margin-bottom:14px;justify-content:space-between;"><span class="section-title">팀원 (${state.members.length}) · 관리자 ${adminCnt}명</span><button class="btn btn-soft" data-act="add-member">${I.plus} 팀원 추가</button></div><div style="font-size:11.5px;color:var(--text-soft);margin-bottom:8px;line-height:1.55;">⋮⋮ 핸들 잡고 드래그로 순서 변경. <b>관리자</b>는 OKR(O·KR) 생성·수정·삭제 권한을 가집니다 — Initiative는 본인 또는 관리자가 수정 가능.${meAdmin?'':' <b style="color:var(--warning);">현재 본인은 일반 권한 — 관리자에게 권한 부여 요청</b>'}</div>${state.members.map(m=>`<div class="member-row" data-mem-id="${m.id}" draggable="true" data-drag-type="member"><span class="drag-handle member-handle" title="드래그로 순서 변경">⋮⋮</span><input type="color" class="member-color" data-field="member-color" data-mid="${m.id}" value="${m.color}" /><input class="member-name-input" data-field="member-name" data-mid="${m.id}" value="${esc(m.name)}" /><input class="member-role-input" data-field="member-role" data-mid="${m.id}" placeholder="역할" value="${esc(m.role||'')}" /><button class="btn-mode" data-act="toggle-admin" data-mid="${m.id}" style="${m.isAdmin?'background:var(--growth-soft);color:var(--growth);font-weight:700;':''}padding:4px 10px;font-size:11.5px;" title="${meAdmin?'클릭하여 관리자 권한 토글':'관리자만 변경 가능'}"${meAdmin?'':' disabled'}>${m.isAdmin?'🛡️ 관리자':'일반'}</button><button class="btn-icon" data-act="del-member" data-mid="${m.id}">${I.trash}</button></div>`).join('')}</section><section class="card"><div class="section-head" style="margin-bottom:14px;"><span class="section-title">모든 팀</span></div>${state.teams.map(t=>`<div class="member-row"><span style="width:18px;height:18px;border-radius:5px;background:${teamColor(t)};display:inline-block;"></span><span style="flex:1;font-weight:600;font-size:13.5px;">${esc(t.name)}</span><span style="font-size:11.5px;color:var(--text-soft);">${esc(t.quarter)}</span>${t.id===state.currentTeamId?'<span class="today-tag">현재</span>':`<button class="btn btn-ghost" data-act="switch-team" data-tid="${t.id}">전환</button>`}</div>`).join('')}</section>`;
}

function updateBlockerUI(date,mid){if(date!==viewingDate)return;const s=state.standups[date]||{entries:{}};const e=s.entries[mid]||{};const has=!!(e.blockers&&e.blockers.trim());const c=document.querySelector(`[data-member-card="${mid}"]`);if(c){c.classList.toggle('has-blocker',has);let b=c.querySelector('.blocker-badge');if(has&&!b){const h=c.querySelector('.member-head');if(h){const sp=document.createElement('span');sp.className='blocker-badge';sp.innerHTML=`${I.alert} 막힘`;h.appendChild(sp);}}else if(!has&&b){b.remove();}}const cnt=Object.values(s.entries||{}).filter(en=>en?.blockers?.trim()).length;const st=document.querySelector('[data-blocker-stat]');if(st){st.textContent=cnt>0?`${cnt}건`:'없음';st.style.color=cnt>0?C.warning:C.growth;}}

// ============================================================
// v16 — 로그인 가드 화면 (인증 전에는 콘텐츠 차단)
// ============================================================
// v16 — 로그인 화면에 팀원 목록 직접 표시 + 인라인 onclick (이벤트 위임/리스너 의존 X)
function renderLoginWall(){
  // 글로벌 노출 — 인라인 onclick에서 호출
  try{window.attemptSelfChange=attemptSelfChange;window.openPinSetup=openPinSetup;window.openPinVerify=openPinVerify;}catch(e){}
  const t=currentTeam();const ini=teamInitial(t?.name);const col=teamColor(t);
  const app=document.getElementById('app');
  const teamMembers=(state.members||[]).filter(m=>!m.isObserver);
  const observerMembers=(state.members||[]).filter(m=>m.isObserver);
  const memberBtns=teamMembers.length>0?teamMembers.map(m=>{
    const hasPin=!!m.pin_hash;const authed=isPinAuthValid(m.id);
    const safeId=String(m.id).replace(/'/g,"\\'");
    return `<button type="button" onclick="window.__loginPick&&window.__loginPick('${safeId}')" style="display:flex;align-items:center;gap:10px;width:100%;padding:11px 14px;background:white;border:1px solid var(--line);border-radius:8px;font-size:13.5px;cursor:pointer;font-family:inherit;text-align:left;margin-bottom:6px;"><span style="width:24px;height:24px;border-radius:999px;background:${m.color||'#6241F5'};color:white;display:inline-flex;align-items:center;justify-content:center;font-weight:700;font-size:11px;flex-shrink:0;">${esc(m.name.slice(0,1).toUpperCase())}</span><span style="flex:1;font-weight:600;color:var(--text);">${esc(m.name)}</span><span style="font-size:11px;color:var(--text-soft);">${esc(m.role||'')}</span>${hasPin?(authed?'<span style="font-size:10px;color:var(--growth);font-weight:700;">🔓 인증됨</span>':'<span style="font-size:10px;color:var(--text-soft);">🔐 PIN</span>'):'<span style="font-size:10px;color:#F59E0B;">PIN 미설정</span>'}</button>`;
  }).join(''):'<div style="font-size:12px;color:var(--text-soft);text-align:center;padding:16px;">팀원 데이터 로딩 중…</div>';
  const observerBtns=observerMembers.length>0?observerMembers.map(m=>{
    const hasPin=!!m.pin_hash;const safeId=String(m.id).replace(/'/g,"\\'");
    return `<button type="button" onclick="window.__loginPick&&window.__loginPick('${safeId}')" style="display:flex;align-items:center;gap:10px;width:100%;padding:9px 14px;background:#FAFAFB;border:1px solid var(--line);border-radius:8px;font-size:13px;cursor:pointer;font-family:inherit;text-align:left;margin-bottom:4px;"><span style="width:22px;height:22px;border-radius:999px;background:#7E8794;color:white;display:inline-flex;align-items:center;justify-content:center;font-weight:700;font-size:11px;flex-shrink:0;">👁</span><span style="flex:1;font-weight:600;color:var(--text-soft);">옵저버</span><span style="font-size:10px;color:var(--text-soft);">1시간 자동 로그아웃</span>${hasPin?'':'<span style="font-size:10px;color:#F59E0B;margin-left:6px;">PIN 미설정</span>'}</button>`;
  }).join(''):'';
  app.innerHTML=`<div id="login-wall" style="position:fixed;inset:0;display:flex;align-items:center;justify-content:center;background:linear-gradient(135deg,#F4F0FF 0%,#FAFAFA 100%);z-index:100;padding:20px;overflow-y:auto;">
    <div style="background:white;border-radius:16px;box-shadow:0 8px 32px rgba(0,0,0,.08);padding:36px 32px;max-width:460px;width:100%;">
      <div style="text-align:center;margin-bottom:24px;">
        <div style="width:56px;height:56px;border-radius:12px;background:${col||'#6241F5'};color:white;font-weight:800;font-size:20px;display:flex;align-items:center;justify-content:center;margin:0 auto 14px;">${esc(ini||'팀')}</div>
        <h1 style="font-size:20px;font-weight:800;margin:0 0 4px;color:var(--text);">${esc(t?.name||'팀')} OKR</h1>
        <div style="font-size:12.5px;color:var(--text-soft);">${esc(t?.quarter||'')} · 일일 스프린트</div>
      </div>
      <div style="font-size:12.5px;color:var(--text);font-weight:600;margin-bottom:4px;">🔐 본인을 선택하세요</div>
      <div style="font-size:11.5px;color:var(--text-soft);margin-bottom:14px;line-height:1.55;">선택 후 PIN을 입력하면 진입됩니다.</div>
      <div id="login-member-list">${memberBtns}</div>
      ${observerBtns?`<div style="margin-top:12px;padding-top:12px;border-top:1px dashed var(--line);"><div style="font-size:10.5px;color:var(--text-soft);margin-bottom:6px;">옵저버 (열람 전용 · 변경 사항 저장 안 됨)</div>${observerBtns}</div>`:''}
      <div style="font-size:10.5px;color:var(--text-soft);margin-top:16px;line-height:1.55;text-align:center;">최초 진입 시 4자리 PIN을 설정하고, 24시간마다 재인증합니다.</div>
    </div>
  </div>`;
  // v16 — 글로벌 진입 함수: 인라인 onclick에서 호출. 모달 의존 없이 직접 PIN 입력 화면으로 전환
  window.__loginPick=function(mid){
    try{
      console.log('[login] pick',mid);
      if(!mid)return;
      // v108 — PIN 입력 화면 표시 시작 → 비동기 render 가 이 화면을 덮어쓰지 못하게 차단
      window._pinVerifyInFlight=true;
      // PIN 미설정이면 등록 화면, 설정돼 있으면 입력 화면
      const m=state.members.find(x=>x.id===mid);
      if(!m){window._pinVerifyInFlight=false;alert('팀원을 찾을 수 없습니다');return;}
      if(!m.pin_hash){renderPinSetupInline(mid);}
      else{renderPinVerifyInline(mid);}
    }catch(e){window._pinVerifyInFlight=false;console.error('[login] pick fail',e);alert('오류: '+(e.message||e));}
  };
}
// v16 — PIN 등록 화면을 로그인 가드 안에 인라인으로 렌더 (모달 없이)
function renderPinSetupInline(memberId){
  const m=state.members.find(x=>x.id===memberId);if(!m){renderLoginWall();return;}
  const t=currentTeam();const col=teamColor(t);
  const app=document.getElementById('app');
  app.innerHTML=`<div id="login-wall" style="position:fixed;inset:0;display:flex;align-items:center;justify-content:center;background:linear-gradient(135deg,#F4F0FF 0%,#FAFAFA 100%);z-index:100;padding:20px;overflow-y:auto;">
    <div style="background:white;border-radius:16px;box-shadow:0 8px 32px rgba(0,0,0,.08);padding:36px 32px;max-width:420px;width:100%;">
      <div style="display:flex;align-items:center;gap:10px;margin-bottom:18px;"><div style="width:40px;height:40px;border-radius:999px;background:${m.color||'#6241F5'};color:white;font-weight:800;font-size:14px;display:flex;align-items:center;justify-content:center;">${esc(m.name.slice(0,1).toUpperCase())}</div><div><div style="font-weight:800;font-size:15px;">${esc(m.name)}</div><div style="font-size:11.5px;color:var(--text-soft);">PIN 최초 등록 (4자리)</div></div></div>
      <div style="font-size:12px;color:var(--text-soft);margin-bottom:14px;line-height:1.55;">PIN을 처음 설정합니다. 다음 진입 시 본인 확인용으로 사용되며 24시간마다 재인증합니다.</div>
      <div style="margin-bottom:10px;"><div style="font-size:11px;font-weight:700;color:var(--text-soft);margin-bottom:5px;">새 PIN</div><input id="inline-pin-new" type="password" inputmode="numeric" pattern="[0-9]*" maxlength="4" autocomplete="off" placeholder="••••" style="width:100%;font-size:22px;letter-spacing:8px;text-align:center;padding:11px;border:1px solid var(--line);border-radius:8px;font-family:'SF Mono',Monaco,Consolas,monospace;" /></div>
      <div style="margin-bottom:10px;"><div style="font-size:11px;font-weight:700;color:var(--text-soft);margin-bottom:5px;">PIN 확인</div><input id="inline-pin-confirm" type="password" inputmode="numeric" pattern="[0-9]*" maxlength="4" autocomplete="off" placeholder="••••" style="width:100%;font-size:22px;letter-spacing:8px;text-align:center;padding:11px;border:1px solid var(--line);border-radius:8px;font-family:'SF Mono',Monaco,Consolas,monospace;" /></div>
      <div id="inline-pin-msg" style="font-size:11.5px;color:var(--warning);min-height:18px;margin-bottom:10px;"></div>
      <div style="display:flex;gap:6px;"><button type="button" onclick="window.__loginBack&&window.__loginBack()" style="flex:0 0 auto;padding:11px 18px;border:1px solid var(--line);background:white;border-radius:8px;cursor:pointer;font-size:13px;font-family:inherit;">뒤로</button><button type="button" onclick="window.__doPinSetup&&window.__doPinSetup('${String(memberId).replace(/'/g,"\\'")}')" style="flex:1;padding:11px;border:none;background:var(--primary);color:white;border-radius:8px;cursor:pointer;font-size:14px;font-weight:700;font-family:inherit;">등록</button></div>
    </div>
  </div>`;
  window.__loginBack=function(){window._pinVerifyInFlight=false;renderLoginWall();};
  window.__doPinSetup=async function(mid){
    const p1=document.getElementById('inline-pin-new')?.value||'';
    const p2=document.getElementById('inline-pin-confirm')?.value||'';
    const msg=document.getElementById('inline-pin-msg');
    if(!/^[0-9]{4}$/.test(p1)){if(msg)msg.textContent='4자리 숫자만 입력 가능';return;}
    if(p1!==p2){if(msg)msg.textContent='두 PIN이 일치하지 않습니다';return;}
    if(msg){msg.textContent='저장 중...';msg.style.color='var(--text-soft)';}
    window._pinVerifyInFlight=true; // v107
    try{
      const ok=await setMemberPin(mid,p1);
      if(ok){setSelfId(mid);setPinAuth(mid);try{startMemberSession();}catch(e){}try{startObserverLogoutWatcher();}catch(e){}initialized=true;window._pinVerifyInFlight=false;render();try{refreshHelpBadge();}catch(e){}}
      else{window._pinVerifyInFlight=false;if(msg){msg.style.color='var(--warning)';msg.textContent='저장 실패. 다시 시도하세요';}}
    }catch(e){window._pinVerifyInFlight=false;console.error(e);if(msg){msg.style.color='var(--warning)';msg.textContent='오류: '+(e.message||e);}}
  };
  setTimeout(()=>{
    const p1=document.getElementById('inline-pin-new'),p2=document.getElementById('inline-pin-confirm');
    if(p1){p1.focus();p1.addEventListener('input',()=>{if(p1.value.length===4&&p2)p2.focus();});}
    if(p2){p2.addEventListener('input',()=>{if(p2.value.length===4&&p1&&p1.value.length===4)window.__doPinSetup(memberId);});p2.addEventListener('keydown',ev=>{if(ev.key==='Enter')window.__doPinSetup(memberId);});}
  },50);
}
// v16 — PIN 입력 화면 인라인
function renderPinVerifyInline(memberId){
  const m=state.members.find(x=>x.id===memberId);if(!m){renderLoginWall();return;}
  const t=currentTeam();
  const app=document.getElementById('app');
  app.innerHTML=`<div id="login-wall" style="position:fixed;inset:0;display:flex;align-items:center;justify-content:center;background:linear-gradient(135deg,#F4F0FF 0%,#FAFAFA 100%);z-index:100;padding:20px;overflow-y:auto;">
    <div style="background:white;border-radius:16px;box-shadow:0 8px 32px rgba(0,0,0,.08);padding:36px 32px;max-width:420px;width:100%;">
      <div style="display:flex;align-items:center;gap:10px;margin-bottom:18px;"><div style="width:40px;height:40px;border-radius:999px;background:${m.color||'#6241F5'};color:white;font-weight:800;font-size:14px;display:flex;align-items:center;justify-content:center;">${esc(m.name.slice(0,1).toUpperCase())}</div><div><div style="font-weight:800;font-size:15px;">${esc(m.name)}</div><div style="font-size:11.5px;color:var(--text-soft);">PIN 입력 (4자리)</div></div></div>
      <div style="font-size:12px;color:var(--text-soft);margin-bottom:14px;line-height:1.55;">본인 확인을 위해 PIN을 입력하세요. (24시간마다 재인증${m.isObserver?', 옵저버는 1시간':''})</div>
      <input id="inline-pin-enter" type="password" inputmode="numeric" pattern="[0-9]*" maxlength="4" autocomplete="off" placeholder="••••" style="width:100%;font-size:22px;letter-spacing:8px;text-align:center;padding:11px;border:1px solid var(--line);border-radius:8px;font-family:'SF Mono',Monaco,Consolas,monospace;margin-bottom:10px;" />
      <div id="inline-pin-msg" style="font-size:11.5px;color:var(--warning);min-height:18px;margin-bottom:10px;"></div>
      <div style="display:flex;gap:6px;"><button type="button" onclick="window.__loginBack&&window.__loginBack()" style="flex:0 0 auto;padding:11px 18px;border:1px solid var(--line);background:white;border-radius:8px;cursor:pointer;font-size:13px;font-family:inherit;">뒤로</button><button type="button" onclick="window.__doPinVerify&&window.__doPinVerify('${String(memberId).replace(/'/g,"\\'")}')" style="flex:1;padding:11px;border:none;background:var(--primary);color:white;border-radius:8px;cursor:pointer;font-size:14px;font-weight:700;font-family:inherit;">확인</button></div>
      <div style="margin-top:12px;text-align:center;"><button type="button" onclick="if(confirm('PIN을 초기화하고 다시 등록하시겠습니까?'))window.__doPinReset&&window.__doPinReset('${String(memberId).replace(/'/g,"\\'")}')" style="background:none;border:none;color:var(--text-soft);font-size:11px;cursor:pointer;text-decoration:underline;">PIN 잊음 (초기화)</button></div>
    </div>
  </div>`;
  window.__loginBack=function(){window._pinVerifyInFlight=false;renderLoginWall();};
  window.__doPinVerify=async function(mid){
    const p=document.getElementById('inline-pin-enter')?.value||'';
    const msg=document.getElementById('inline-pin-msg');
    if(!/^[0-9]{4}$/.test(p)){if(msg)msg.textContent='4자리 숫자만 입력 가능';return;}
    const lockKey='pin-lock-'+mid;const failKey='pin-fail-'+mid;
    const lockUntil=parseInt(localStorage.getItem(lockKey)||'0');
    if(lockUntil>Date.now()){const remain=Math.ceil((lockUntil-Date.now())/60000);if(msg)msg.textContent=`잠금 — ${remain}분 후 재시도`;return;}
    window._pinVerifyInFlight=true; // v107: 인증 도중 비동기 render 가 login wall 다시 그리지 않도록 차단
    try{
      const ok=await verifyPin(mid,p);
      if(ok){localStorage.removeItem(failKey);localStorage.removeItem(lockKey);setSelfId(mid);setPinAuth(mid);try{startMemberSession();}catch(e){}try{startObserverLogoutWatcher();}catch(e){}initialized=true;window._pinVerifyInFlight=false;render();try{refreshHelpBadge();}catch(e){}}
      else{
        window._pinVerifyInFlight=false; // v107
        const fails=parseInt(localStorage.getItem(failKey)||'0')+1;
        localStorage.setItem(failKey,String(fails));
        if(fails>=5){localStorage.setItem(lockKey,String(Date.now()+30*60*1000));localStorage.removeItem(failKey);if(msg)msg.textContent='5회 실패 — 30분 잠금됨';}
        else if(msg)msg.textContent=`PIN 불일치 (${5-fails}회 남음)`;
        const el=document.getElementById('inline-pin-enter');if(el){el.value='';el.focus();}
      }
    }catch(e){window._pinVerifyInFlight=false;console.error(e);if(msg)msg.textContent='오류: '+(e.message||e);}
  };
  window.__doPinReset=async function(mid){
    try{
      const memb=state.members.find(x=>x.id===mid);if(memb)memb.pin_hash=null;
      clearPinAuth(mid);
      await sb.from('members').update({pin_hash:null}).eq('id',mid);
      renderLoginWall();
    }catch(e){alert('초기화 실패: '+(e.message||e));}
  };
  setTimeout(()=>{
    const el=document.getElementById('inline-pin-enter');
    if(el){el.focus();el.addEventListener('input',()=>{if(el.value.length===4)window.__doPinVerify(memberId);});el.addEventListener('keydown',ev=>{if(ev.key==='Enter')window.__doPinVerify(memberId);});}
  },50);
}

// ============================================================
// v16 — 관리자 패널 (로그인 기록 · 비밀번호 관리 · 옵저버 추가)
// 관리 탭 내부에 관리자 전용 섹션으로 통합
// ============================================================
let _adminCachedSessions=null,_adminLastFetch=0,_adminFetchInFlight=false,_adminFetchError=null;
async function fetchAdminSessions(){
  if(_adminCachedSessions&&Date.now()-_adminLastFetch<15000)return _adminCachedSessions;
  if(_adminFetchInFlight)return _adminCachedSessions||[];
  _adminFetchInFlight=true;
  try{
    const res=await sb.from('member_sessions').select('*').eq('team_id',state.currentTeamId).order('login_at',{ascending:false}).limit(200);
    if(res.error)throw res.error;
    _adminCachedSessions=res.data||[];_adminLastFetch=Date.now();_adminFetchError=null;
    return _adminCachedSessions;
  }catch(e){
    _adminFetchError=e&&e.message||'세션 테이블 조회 실패 (v16_migration.sql 실행 필요)';
    _adminCachedSessions=[];_adminLastFetch=Date.now();
    return [];
  }finally{_adminFetchInFlight=false;}
}
function renderAdminPanel(){
  if(!isAdmin())return '';
  // 첫 진입 시 1회만 비동기 fetch — 무한 루프 방지
  if(_adminCachedSessions===null&&!_adminFetchInFlight){
    fetchAdminSessions().then(()=>{if(currentView==='manage')render();});
  }
  const sessions=_adminCachedSessions||[];
  const fetchErr=_adminFetchError;
  // 현재 활성 (5분 이내 활동)
  const now=Date.now();
  const active=sessions.filter(s=>s.last_active_at&&(now-new Date(s.last_active_at).getTime())<5*60000);
  // 멤버별 이번 주 누적 시간
  const weekStart=new Date(now-7*86400000);
  const weekly={};
  sessions.forEach(s=>{
    if(!s.login_at||new Date(s.login_at)<weekStart)return;
    const dur=Math.max(0,(new Date(s.last_active_at||s.login_at)-new Date(s.login_at))/1000);
    weekly[s.member_id]=(weekly[s.member_id]||0)+dur;
  });
  function fmtDuration(sec){
    if(sec<60)return Math.round(sec)+'초';
    if(sec<3600)return Math.floor(sec/60)+'분';
    const h=Math.floor(sec/3600),m=Math.floor((sec%3600)/60);
    return h+'시간 '+m+'분';
  }
  function fmtTime(ts){if(!ts)return'';const d=new Date(ts);const t=todayKey();const ds=`${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;const time=`${String(d.getHours()).padStart(2,'0')}:${String(d.getMinutes()).padStart(2,'0')}`;if(ds===t)return`오늘 ${time}`;return`${ds.slice(5).replace('-','/')} ${time}`;}
  const memberRows=state.members.map(m=>{
    const wsec=weekly[m.id]||0;
    const lastSession=sessions.find(s=>s.member_id===m.id);
    const lastLogin=lastSession?fmtTime(lastSession.login_at):'기록 없음';
    const isActive=active.find(s=>s.member_id===m.id);
    // v106/v107 — 관리자 화면 PIN: 캐시된 값이 있으면 표시, 없으면 '🔍 보기' 버튼 (클릭 시 brute-force, 끊김 방지)
    const pinShown=m.pin_hash
      ?(m._pinCracked
        ?`<span style="font-family:'SF Mono','Consolas',monospace;font-weight:700;color:var(--primary);background:#EEEAFE;padding:2px 9px;border-radius:5px;font-size:13px;letter-spacing:2px;" title="PIN 4자리">${esc(m._pinCracked)}</span>`
        :`<button class="btn-mode" data-act="admin-crack-pin" data-mid="${m.id}" style="padding:3px 9px;font-size:11px;">🔍 보기</button>`)
      :'<span style="font-size:11px;color:var(--warning);font-weight:600;">미설정</span>';
    return `<tr style="border-bottom:1px solid #F4F4F5;">
      <td style="padding:9px 10px;"><span class="avatar" style="background:${m.color};width:24px;height:24px;font-size:11px;display:inline-flex;align-items:center;justify-content:center;border-radius:50%;color:white;font-weight:800;vertical-align:middle;margin-right:8px;">${esc(m.name.slice(0,1).toUpperCase())}</span><strong>${esc(m.name)}</strong>${m.isAdmin?'<span style="font-size:9px;background:var(--growth-soft);color:var(--growth);padding:1px 6px;border-radius:999px;font-weight:700;margin-left:6px;">🛡️ 관리자</span>':''}${m.isObserver?'<span style="font-size:9px;background:#E5E5E8;color:var(--text-soft);padding:1px 6px;border-radius:999px;font-weight:700;margin-left:6px;">👁️ 옵저버</span>':''}${isActive?'<span style="font-size:9px;background:#E6F6EE;color:var(--growth);padding:1px 6px;border-radius:999px;font-weight:700;margin-left:6px;">● 활성</span>':''}</td>
      <td style="padding:9px 10px;font-size:12px;color:var(--text-soft);">${lastLogin}</td>
      <td style="padding:9px 10px;font-size:12px;font-weight:600;color:${wsec>0?'var(--text)':'var(--text-soft)'};">${fmtDuration(wsec)}</td>
      <td style="padding:9px 10px;text-align:center;">${pinShown}</td>
      <td style="padding:9px 10px;font-size:11.5px;text-align:right;">
        <button class="btn btn-soft" data-act="admin-reset-pin" data-mid="${m.id}" style="padding:4px 10px;font-size:11px;">🔄 초기화</button>
        <button class="btn-mode" data-act="admin-set-pin" data-mid="${m.id}" style="padding:4px 10px;font-size:11px;">PIN 지정…</button>
      </td>
    </tr>`;
  }).join('');
  const sessionRows=sessions.slice(0,30).map(s=>{
    const dur=Math.max(0,(new Date(s.last_active_at||s.login_at)-new Date(s.login_at))/1000);
    return `<tr style="border-bottom:1px solid #F4F4F5;font-size:12px;">
      <td style="padding:7px 10px;">${esc(s.member_name||'(이름 없음)')}</td>
      <td style="padding:7px 10px;color:var(--text-soft);">${fmtTime(s.login_at)}</td>
      <td style="padding:7px 10px;color:var(--text-soft);">${fmtTime(s.last_active_at)}</td>
      <td style="padding:7px 10px;font-weight:600;">${fmtDuration(dur)}</td>
    </tr>`;
  }).join('');
  const hasObserver=state.members.some(m=>m.isObserver);
  const errBox=fetchErr?`<div style="background:var(--warning-soft);color:var(--warning);padding:10px 12px;border-radius:6px;font-size:12px;margin-bottom:10px;line-height:1.55;">⚠ 세션 기록을 불러올 수 없습니다 — <code>v16_migration.sql</code>을 Supabase에 먼저 실행해 주세요. <br><span style="font-size:11px;opacity:.8;">상세: ${esc(fetchErr)}</span></div>`:'';
  return `<section class="card" style="margin-bottom:14px;background:linear-gradient(135deg,#FAF8FF 0%,#FFFFFF 100%);border:1px solid #E5DFFA;">
    <div class="section-head"><span class="section-title">🛡️ 관리자 전용</span><span class="section-meta">· 로그인 기록 · 머문 시간 · 비밀번호 관리</span></div>
    ${errBox}
  </section>
  <section class="card" style="margin-bottom:14px;">
    <div class="section-head"><span class="section-title">📊 계정 현황 — ${state.members.length}명 (관리자 ${state.members.filter(m=>m.isAdmin).length} · 옵저버 ${state.members.filter(m=>m.isObserver).length} · 현재 활성 ${active.length})</span></div>
    <div style="overflow-x:auto;"><table style="width:100%;border-collapse:collapse;font-size:13px;">
      <thead><tr style="background:#F4F4F5;text-align:left;font-size:11.5px;font-weight:700;color:var(--text-soft);"><th style="padding:9px 10px;">팀원</th><th style="padding:9px 10px;">최근 로그인</th><th style="padding:9px 10px;">지난 7일 누적</th><th style="padding:9px 10px;text-align:center;">PIN</th><th style="padding:9px 10px;text-align:right;">관리</th></tr></thead>
      <tbody>${memberRows}</tbody>
    </table></div>
  </section>
  <section class="card" style="margin-bottom:14px;">
    <div class="section-head" style="justify-content:space-between;"><span class="section-title">📜 최근 로그인 기록 — ${sessions.length}건</span>${selfIsObserver()?'<span style="font-size:11px;color:var(--text-soft);">옵저버 모드 — 본 화면은 기록되지 않음</span>':''}</div>
    <div id="admin-sessions-body" style="overflow-x:auto;max-height:400px;overflow-y:auto;"><table style="width:100%;border-collapse:collapse;font-size:12.5px;">
      <thead style="position:sticky;top:0;background:white;"><tr style="background:#F4F4F5;text-align:left;font-size:11.5px;font-weight:700;color:var(--text-soft);"><th style="padding:7px 10px;">팀원</th><th style="padding:7px 10px;">로그인</th><th style="padding:7px 10px;">마지막 활동</th><th style="padding:7px 10px;">머문 시간</th></tr></thead>
      <tbody>${sessionRows||'<tr><td colspan="4" style="padding:20px;text-align:center;color:var(--text-soft);">아직 로그인 기록이 없습니다</td></tr>'}</tbody>
    </table></div>
  </section>
  <section class="card" style="margin-bottom:14px;">
    <div class="section-head"><span class="section-title">⚙️ 빠른 작업</span></div>
    <div style="display:flex;gap:8px;flex-wrap:wrap;padding:6px 0;">
      ${hasObserver?'<span style="font-size:12px;color:var(--text-soft);padding:8px 12px;background:var(--growth-soft);color:var(--growth);border-radius:6px;">✓ 옵저버 계정 등록됨</span>':'<button class="btn btn-primary" data-act="admin-add-observer">👁️ 옵저버 계정 추가 (PIN: 3962, 1시간 자동 로그아웃)</button>'}
      <button class="btn btn-soft" data-act="admin-clear-sessions">🗑️ 30일 이상 된 세션 기록 정리</button>
      <button class="btn btn-soft" data-act="admin-refresh">🔄 세션 데이터 새로고침</button>
    </div>
  </section>
  <div style="font-size:11.5px;color:var(--text-soft);line-height:1.55;">💡 PIN 초기화 → 해당 팀원이 다음 진입 시 새 PIN 등록 / PIN 지정 → 관리자가 임시 PIN 부여 / 옵저버 — 모든 작업 시도 가능하나 DB에 저장되지 않음</div>`;
}

async function openHistory(et,eid){
  showModal(`<div class="modal-head"><div class="modal-title">${I.clock} 변경 이력</div><button class="btn-icon" data-act="close-modal">${I.x}</button></div><div class="modal-body" id="history-body"><div style="text-align:center;padding:30px;color:var(--text-soft);"><div class="loading-spinner" style="margin:0 auto 10px;"></div>불러오는 중…</div></div>`);
  // 의미 있는 변경(category='change')만 표시. 일일 체크 같은 잡음은 제외
  const{data,error}=await sb.from('audit_log').select('*').eq('entity_type',et).eq('entity_id',eid).neq('category','check').order('ts',{ascending:false}).limit(30);
  const body=document.getElementById('history-body');if(!body)return;
  if(error){body.innerHTML=`<div class="history-empty">에러: ${esc(error.message)}</div>`;return;}
  if(!data||data.length===0){body.innerHTML='<div class="history-empty">아직 변경 이력이 없습니다.</div>';return;}
  body.innerHTML=data.map(h=>`<div class="history-row"><div class="history-time">${formatTs(h.ts)}</div><div><div class="history-act">${actionLabel(h.action,h.field_name)}</div>${h.before_value||h.after_value?`<div class="history-detail">${esc((h.before_value||'(없음)')+' → '+(h.after_value||'(없음)'))}</div>`:''}</div></div>`).join('');
}
function actionLabel(act,f){const fm={title:'제목',current:'진척',target:'목표값',unit:'단위',description:'설명',confidence:'자신감',reality_blocker:'어려움',reality_help:'지원요청',due_date:'마감일',status:'상태',owner_id:'담당자',name:'이름',quarter:'분기'};if(act==='create')return '생성';if(act==='delete')return '삭제';return `${fm[f]||f||'필드'} 변경`;}
function formatTs(ts){if(!ts)return '';const d=new Date(ts);return `${d.getMonth()+1}/${d.getDate()} ${String(d.getHours()).padStart(2,'0')}:${String(d.getMinutes()).padStart(2,'0')}`;}
function showModal(h){const b=document.getElementById('modal-back');document.getElementById('modal').innerHTML=h;b.classList.add('show');}
function closeModal(){document.getElementById('modal-back').classList.remove('show');}

async function openReview(entityIdOrMid,period,opts){
  // 호환: 옛 호출(openReview(mid,period))은 entity_type='member'로 처리
  const o=opts||{};
  const entityType=o.entityType||'member';
  const entityId=entityIdOrMid;
  return openReflection(entityType,entityId,period,opts);
}
async function openReflection(entityType,entityId,period,opts){
  // 대상 정보 조회
  let title='', subtitle='', mid=null;
  if(entityType==='member'){const m=state.members.find(x=>x.id===entityId);if(!m)return;title=m.name;subtitle='팀원 종합 리뷰';mid=m.id;}
  else if(entityType==='objective'){const o=state.objectives.find(x=>x.id===entityId);if(!o)return;title=o.title;subtitle='Objective 리뷰';}
  else if(entityType==='key_result'){let k=null,po=null;state.objectives.forEach(o=>o.keyResults.forEach(x=>{if(x.id===entityId){k=x;po=o;}}));if(!k)return;title=k.title;subtitle=`Key Result 리뷰 · ${po.title}`;}
  else return;
  let r=lastReflectionFor(entityType,entityId,period);
  if(!r){r={id:uid(),entity_type:entityType,entity_id:entityId,member_id:mid,team_id:state.currentTeamId,period,quarter:currentTeam()?.quarter||'',what_worked:'',what_struggled:'',what_learned:'',next_try:'',summary:'',reviewer:'',_new:true};}
  // 기간 결정
  const o=opts||{};
  const today=todayKey();
  let preset=o.preset||'14';
  let start=o.start, end=o.end||today;
  if(!start){const days=parseInt(preset)||14;const sd=new Date(end);sd.setDate(sd.getDate()-days);start=`${sd.getFullYear()}-${String(sd.getMonth()+1).padStart(2,'0')}-${String(sd.getDate()).padStart(2,'0')}`;}
  const days=Math.max(1,Math.round((new Date(end)-new Date(start))/86400000));
  // 컨텍스트 집계 (entity_type별 다른 데이터)
  let contextHtml='';
  if(entityType==='member' && mid){
    const a=memberAnalytics(mid);
    const recent=await loadStandupRange(start,end);
    const myRecent=recent.filter(e=>e.member_id===mid);
    const activeDays=new Set(myRecent.map(e=>e.date)).size;
    const blockerCnt=myRecent.filter(e=>(e.blockers||'').trim()).length;
    const idl=await loadIDLRange(start,end);
    const myIDL=idl.filter(l=>l.member_id===mid && l.checked);
    const idlByInit={};myIDL.forEach(l=>{idlByInit[l.initiative_id]=(idlByInit[l.initiative_id]||0)+1;});
    const topInits=Object.entries(idlByInit).sort((a,b)=>b[1]-a[1]).slice(0,5).map(([iid,cnt])=>{const i=findInitiative(iid);return i?`<div style="font-size:12px;padding:4px 0;display:flex;justify-content:space-between;border-bottom:1px solid #F4F4F5;"><span>${esc(i.title)}</span><span style="color:var(--primary);font-weight:700;">${cnt}일</span></div>`:'';}).join('');
    const blockers=myRecent.filter(e=>(e.blockers||'').trim()).slice(0,3).map(e=>`<div style="font-size:12px;color:var(--text-soft);padding:4px 0;">${e.date}: ${esc((e.blockers||'').slice(0,80))}</div>`).join('');
    const supportNeeds=myRecent.filter(e=>(e.support_type||'').trim()||(e.support_detail||'').trim()).slice(0,3).map(e=>{const helper=state.members.find(x=>x.id===e.helper_member_id);const h=helper?helper.name:(e.helper_name||'');return `<div style="font-size:11.5px;color:var(--text-soft);padding:4px 0;">${e.date}: ${esc(e.support_type||'-')}${h?` → ${esc(h)}`:''}${e.support_detail?` · ${esc(e.support_detail.slice(0,40))}`:''}</div>`;}).join('');
    contextHtml=`<div style="display:grid;grid-template-columns:1fr 1fr 1fr 1fr;gap:8px;margin-bottom:14px;"><div class="perf-stat"><div class="perf-stat-label">KR 진척</div><div class="perf-stat-value" style="color:${progressColor(a.krAvg)};">${a.krAvg}%</div></div><div class="perf-stat"><div class="perf-stat-label">Init 완료</div><div class="perf-stat-value">${a.initsDone}/${a.inits}</div></div><div class="perf-stat"><div class="perf-stat-label">스탠드업 활동</div><div class="perf-stat-value">${activeDays}<span style="font-size:11px;color:var(--text-soft);">/${days}일</span></div></div><div class="perf-stat"><div class="perf-stat-label">막힘 보고</div><div class="perf-stat-value" style="color:${blockerCnt>3?C.warning:'#262626'};">${blockerCnt}</div></div></div>`+(topInits?`<div style="margin-bottom:14px;padding:10px 12px;background:#FAFAFA;border-radius:8px;"><div style="font-size:11px;font-weight:700;color:var(--text-soft);margin-bottom:4px;">기간 내 일일 체크 TOP Initiative</div>${topInits}</div>`:'')+(blockers?`<div style="margin-bottom:14px;padding:10px;background:#FAFAFA;border-radius:8px;"><div style="font-size:11px;font-weight:700;color:var(--text-soft);margin-bottom:4px;">최근 막힘</div>${blockers}</div>`:'')+(supportNeeds?`<div style="margin-bottom:14px;padding:10px;background:#FAFAFA;border-radius:8px;"><div style="font-size:11px;font-weight:700;color:var(--text-soft);margin-bottom:4px;">최근 도움 요청</div>${supportNeeds}</div>`:'');
  } else if(entityType==='objective'){
    const obj=state.objectives.find(x=>x.id===entityId);
    if(obj){const avg=obj.keyResults.length?Math.round(obj.keyResults.reduce((s,k)=>s+pct(k.current,k.target),0)/obj.keyResults.length):0;
      const krList=obj.keyResults.map(k=>`<div style="font-size:12px;padding:4px 0;display:flex;justify-content:space-between;border-bottom:1px solid #F4F4F5;"><span>${esc(k.title)} <span class="conf-chip ${k.confidence||'mid'}" style="cursor:default;font-size:9.5px;">${CONF_LABELS[k.confidence||'mid']}</span></span><span style="color:${progressColor(pct(k.current,k.target))};font-weight:700;">${pct(k.current,k.target)}%</span></div>`).join('');
      contextHtml=`<div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-bottom:14px;"><div class="perf-stat"><div class="perf-stat-label">평균 진척</div><div class="perf-stat-value" style="color:${progressColor(avg)};">${avg}%</div></div><div class="perf-stat"><div class="perf-stat-label">KR 개수</div><div class="perf-stat-value">${obj.keyResults.length}</div></div></div>`+(krList?`<div style="margin-bottom:14px;padding:10px 12px;background:#FAFAFA;border-radius:8px;"><div style="font-size:11px;font-weight:700;color:var(--text-soft);margin-bottom:4px;">산하 KR 현황</div>${krList}</div>`:'');
    }
  } else if(entityType==='key_result'){
    let kr=null;state.objectives.forEach(o=>o.keyResults.forEach(x=>{if(x.id===entityId)kr=x;}));
    if(kr){const p=pct(kr.current,kr.target);
      const idl=await loadIDLRange(start,end);
      const krIDL=idl.filter(l=>{const i=findInitiative(l.initiative_id);return i && kr.initiatives.some(x=>x.id===l.initiative_id) && l.checked;});
      const checkByInit={};krIDL.forEach(l=>{checkByInit[l.initiative_id]=(checkByInit[l.initiative_id]||0)+1;});
      const initSummary=kr.initiatives.map(i=>{const cnt=checkByInit[i.id]||0;return `<div style="font-size:12px;padding:4px 0;display:flex;justify-content:space-between;border-bottom:1px solid #F4F4F5;"><span>${esc(i.title)} <span class="init-status ${i.status||'todo'}" style="cursor:default;font-size:9.5px;padding:1px 6px;">${STATUS_LABELS[i.status||'todo']}</span></span><span style="color:var(--primary);font-weight:700;">${cnt}일 체크</span></div>`;}).join('');
      contextHtml=`<div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:8px;margin-bottom:14px;"><div class="perf-stat"><div class="perf-stat-label">진척률</div><div class="perf-stat-value" style="color:${progressColor(p)};">${p}%</div></div><div class="perf-stat"><div class="perf-stat-label">자신감</div><div class="perf-stat-value" style="font-size:14px;"><span class="conf-chip ${kr.confidence||'mid'}" style="cursor:default;">${CONF_LABELS[kr.confidence||'mid']}</span></div></div><div class="perf-stat"><div class="perf-stat-label">Initiative</div><div class="perf-stat-value">${kr.initiatives.length}</div></div></div>`+(initSummary?`<div style="margin-bottom:14px;padding:10px 12px;background:#FAFAFA;border-radius:8px;"><div style="font-size:11px;font-weight:700;color:var(--text-soft);margin-bottom:4px;">산하 Initiative 진행</div>${initSummary}</div>`:'')+((kr.realityBlocker||kr.realityHelp)?`<div style="margin-bottom:14px;padding:10px;background:#FAFAFA;border-radius:8px;"><div style="font-size:11px;font-weight:700;color:var(--text-soft);margin-bottom:4px;">Reality (전략 차원)</div><div style="font-size:11.5px;color:var(--text-soft);">어려움: ${esc(kr.realityBlocker||'-')}<br>지원요청: ${esc(kr.realityHelp||'-')}</div></div>`:'');
    }
  }
  const periodChips=(entityType==='member')?`<div style="display:flex;align-items:center;gap:6px;flex-wrap:wrap;margin-bottom:12px;padding-bottom:10px;border-bottom:1px dashed var(--line);"><span style="font-size:11.5px;font-weight:700;color:var(--text-soft);">기간:</span>${[['7','최근 7일'],['14','최근 14일'],['30','최근 30일'],['90','최근 90일'],['custom','직접 선택']].map(([v,l])=>`<button class="btn-mode" style="${preset===v?'background:var(--primary-soft);color:var(--primary);font-weight:600;':''}padding:3px 9px;font-size:11.5px;" data-act="review-period" data-mid="${entityId}" data-etype="${entityType}" data-period="${period}" data-preset="${v}">${l}</button>`).join('')}${preset==='custom'?`<input type="date" class="rt-input" style="font-size:11px;padding:3px 6px;" data-act="review-custom" data-mid="${entityId}" data-etype="${entityType}" data-period="${period}" data-which="start" value="${start}"/><span style="font-size:11px;">~</span><input type="date" class="rt-input" style="font-size:11px;padding:3px 6px;" data-act="review-custom" data-mid="${entityId}" data-etype="${entityType}" data-period="${period}" data-which="end" value="${end}"/>`:''}<span style="font-size:11px;color:var(--text-soft);margin-left:auto;">${start} ~ ${end} (${days}일)</span></div>`:'';
  showModal(`
    <div class="modal-head"><div class="modal-title">${period==='mid'?'중간 리뷰':'최종 리뷰'} · ${esc(title)}</div><button class="btn-icon" data-act="close-modal">${I.x}</button></div>
    <div class="modal-body">
      <div style="font-size:11.5px;color:var(--text-soft);margin-bottom:10px;padding:8px 10px;background:#FAFAFA;border-radius:6px;line-height:1.5;">📌 ${esc(subtitle)} · 이 기록은 <b>학습과 리뷰</b>를 위한 것이며, <b>인사평가와 무관</b>합니다. OKR은 야심을 세우고 배우는 도구입니다.</div>
      ${periodChips}
      ${contextHtml}
      <div style="display:flex;align-items:center;gap:8px;margin-bottom:12px;padding-bottom:8px;border-bottom:1px dashed var(--line);"><span style="font-size:11.5px;font-weight:700;color:var(--text-soft);">기록 깊이:</span><button class="btn-mode" data-act="refl-mode" data-mode="full" style="${(window._reflMode||'full')==='full'?'background:var(--primary-soft);color:var(--primary);font-weight:700;':''}padding:4px 11px;font-size:11.5px;">전체 (4질문)</button><button class="btn-mode" data-act="refl-mode" data-mode="light" style="${window._reflMode==='light'?'background:var(--primary-soft);color:var(--primary);font-weight:700;':''}padding:4px 11px;font-size:11.5px;">가벼운 메모</button><span style="font-size:11px;color:var(--text-soft);margin-left:auto;">매주 부담 없는 리뷰는 가벼운 메모로 충분</span></div>
      <div class="eval-section"><div class="eval-section-label">${(window._reflMode||'full')==='light'?'한 줄 리뷰':'한 줄 총평 (선택)'}</div><textarea class="eval-input" data-field="r-summary" rows="${(window._reflMode||'full')==='light'?'4':'2'}" placeholder="${(window._reflMode||'full')==='light'?'이번 기간 가장 인상적이었던 것을 한 문장 또는 한 단락으로':'이번 기간을 한 문장으로 요약한다면'}">${esc(r.summary||'')}</textarea></div>
      <div class="eval-section" style="${(window._reflMode||'full')==='light'?'display:none;':''}"><div class="eval-section-label">잘 된 것</div><div style="font-size:11px;color:var(--text-soft);margin-bottom:5px;line-height:1.5;">${esc(REFL_HINTS.what_worked).replace(/\*([^*]+)\*/g,'<i>$1</i>')}</div><textarea class="eval-input" data-field="r-worked" rows="3" placeholder="가장 잘 작동한 것">${esc(r.what_worked||'')}</textarea></div>
      <div class="eval-section" style="${(window._reflMode||'full')==='light'?'display:none;':''}"><div class="eval-section-label">어려웠던 것</div><div style="font-size:11px;color:var(--text-soft);margin-bottom:5px;line-height:1.5;">${esc(REFL_HINTS.what_struggled)}</div><textarea class="eval-input" data-field="r-struggled" rows="3" placeholder="미달성·블로커·갈등 — 솔직하게">${esc(r.what_struggled||'')}</textarea></div>
      <div class="eval-section" style="${(window._reflMode||'full')==='light'?'display:none;':''}"><div class="eval-section-label">배운 것</div><div style="font-size:11px;color:var(--text-soft);margin-bottom:5px;line-height:1.5;">${esc(REFL_HINTS.what_learned)}</div><textarea class="eval-input" data-field="r-learned" rows="3" placeholder="다음 분기에 가져갈 인사이트">${esc(r.what_learned||'')}</textarea></div>
      <div class="eval-section" style="${(window._reflMode||'full')==='light'?'display:none;':''}"><div class="eval-section-label">다음에 시도할 것</div><div style="font-size:11px;color:var(--text-soft);margin-bottom:5px;line-height:1.5;">${esc(REFL_HINTS.next_try)}</div><textarea class="eval-input" data-field="r-nexttry" rows="2" placeholder="새로운 시도 1~2가지">${esc(r.next_try||'')}</textarea></div>
      <div class="eval-section"><div class="eval-section-label">작성자</div><input class="eval-input" data-field="r-reviewer" style="min-height:auto;" value="${esc(r.reviewer||'')}" placeholder="이름 또는 본인"/></div>
    </div>
    <div class="modal-foot"><button class="btn btn-ghost" data-act="close-modal">취소</button><button class="btn btn-primary" data-act="save-review">리뷰 저장</button></div>
  `);
  window._editingReview=r;
  window._reviewOpts={preset,start,end,entityType,entityId,period};
}

function memberName(id){
  if(!id)return '-';
  // v16 — '__team_all__' 또는 콤마 분리된 다중 ID 지원
  if(id==='__team_all__')return '팀 전원';
  if(String(id).indexOf(',')>=0){
    return id.split(',').map(x=>x.trim()).map(x=>state.members.find(m=>m.id===x)?.name||'?').join(', ');
  }
  return state.members.find(m=>m.id===id)?.name||'-';
}

function exportExcel(){
  if(typeof XLSX==='undefined'){showToast('Excel 라이브러리 로딩 실패',true);return;}
  const wb=XLSX.utils.book_new();const t=currentTeam();
  const okrRows=[['Objective','KR','담당자','현재','목표','단위','진척률(%)','마감일','자신감','어려움','지원요청']];
  state.objectives.forEach((o,oi)=>{
    if(o.keyResults.length===0){okrRows.push([`O${oi+1}. ${o.title}`,'',memberName(o.ownerId),'','','','','',CONF_LABELS[o.confidence||'mid'],o.realityBlocker||'',o.realityHelp||'']);}
    o.keyResults.forEach((k,ki)=>{okrRows.push([ki===0?`O${oi+1}. ${o.title}`:'',`KR${ki+1}. ${k.title}`,memberName(k.ownerId),k.current,k.target,k.unit||'',pct(k.current,k.target),k.dueDate||'',CONF_LABELS[k.confidence||'mid'],k.realityBlocker||'',k.realityHelp||'']);});
  });
  const ws1=XLSX.utils.aoa_to_sheet(okrRows);ws1['!cols']=[{wch:32},{wch:32},{wch:12},{wch:8},{wch:8},{wch:8},{wch:10},{wch:12},{wch:8},{wch:24},{wch:24}];
  XLSX.utils.book_append_sheet(wb,ws1,'OKR 요약');
  const initRows=[['상위 KR','이니셔티브','담당자','상태','마감일','자신감','어려움','지원요청']];
  state.objectives.forEach(o=>o.keyResults.forEach(k=>{k.initiatives.forEach(i=>{initRows.push([k.title,i.title,memberName(i.ownerId),STATUS_LABELS[i.status||'todo'],i.dueDate||'',CONF_LABELS[i.confidence||'mid'],i.realityBlocker||'',i.realityHelp||'']);});}));
  const ws2=XLSX.utils.aoa_to_sheet(initRows);ws2['!cols']=[{wch:32},{wch:32},{wch:12},{wch:10},{wch:12},{wch:8},{wch:24},{wch:24}];
  XLSX.utils.book_append_sheet(wb,ws2,'이니셔티브');
  const memRows=[['팀원','역할','담당 O','담당 KR','KR 평균진척(%)','담당 Init','Init 완료','Init 막힘','자신감 평균','중간리뷰','최종리뷰']];
  state.members.forEach(m=>{const a=memberAnalytics(m.id);const md=lastReflectionFor('member',m.id,'mid');const fn=lastReflectionFor('member',m.id,'final');memRows.push([m.name,m.role||'',a.okrs,a.krs,a.krAvg,a.inits,a.initsDone,a.initsBlocked,a.confAvg.toFixed(2),md?'작성됨':'',fn?'작성됨':'']);});
  const ws3=XLSX.utils.aoa_to_sheet(memRows);ws3['!cols']=[{wch:14},{wch:14},{wch:8},{wch:8},{wch:14},{wch:10},{wch:10},{wch:10},{wch:14},{wch:10},{wch:10}];
  XLSX.utils.book_append_sheet(wb,ws3,'팀원 성과');
  const evRows=[['대상 유형','대상','구분','분기','잘 된 것','어려웠던 것','배운 것','다음 시도','한줄 총평','작성자','일시']];
  state.reviews.forEach(r=>{const et=r.entity_type||'member';let label='';if(et==='member'){const m=state.members.find(x=>x.id===(r.entity_id||r.member_id));label=m?m.name:'(삭제)';}else if(et==='objective'){const o=state.objectives.find(x=>x.id===r.entity_id);label=o?o.title:'(삭제)';}else if(et==='key_result'){let k=null;state.objectives.forEach(o=>o.keyResults.forEach(x=>{if(x.id===r.entity_id)k=x;}));label=k?k.title:'(삭제)';}evRows.push([REFL_ENTITY_LABELS[et]||et,label,r.period==='mid'?'중간':'최종',r.quarter||'',r.what_worked||'',r.what_struggled||'',r.what_learned||'',r.next_try||'',r.summary||'',r.reviewer||'',r.updated_at?new Date(r.updated_at).toLocaleString('ko-KR'):'']);});
  const ws4=XLSX.utils.aoa_to_sheet(evRows);ws4['!cols']=[{wch:10},{wch:24},{wch:8},{wch:10},{wch:30},{wch:30},{wch:30},{wch:30},{wch:24},{wch:12},{wch:18}];
  XLSX.utils.book_append_sheet(wb,ws4,'리뷰 상세');
  const rtRows=[['루틴','담당자','주기','요일/일','활성']];
  state.routines.forEach(r=>{rtRows.push([r.title,memberName(r.owner_id),r.frequency,freqText(r),r.active===false?'비활성':'활성']);});
  const ws5=XLSX.utils.aoa_to_sheet(rtRows);ws5['!cols']=[{wch:24},{wch:12},{wch:12},{wch:18},{wch:8}];
  XLSX.utils.book_append_sheet(wb,ws5,'루틴');
  const fn=`OKR_${(t?.name||'team').replace(/\s/g,'')}_${(t?.quarter||'').replace(/\s/g,'')}_${todayKey()}.xlsx`;
  XLSX.writeFile(wb,fn);
  showToast('Excel 파일이 다운로드되었습니다');
}

function printReport(){
  const t=currentTeam();const w=window.open('','_blank');
  if(!w){showToast('팝업 차단을 해제해주세요',true);return;}
  let html=`<!DOCTYPE html><html lang="ko"><head><meta charset="UTF-8"><title>${esc(t?.name||'팀')} OKR 리포트</title><style>
    body{font-family:'Pretendard','맑은 고딕',sans-serif;max-width:900px;margin:30px auto;padding:0 24px;color:#1a1a1a;font-size:13px;line-height:1.55}
    h1{font-size:24px;letter-spacing:-0.5px;margin:0 0 4px}
    h2{font-size:17px;margin:24px 0 8px;border-bottom:2px solid #6241F5;padding-bottom:4px}
    .meta{color:#666;font-size:12px;margin-bottom:20px}
    .obj{margin-bottom:18px;padding:12px 14px;border:1px solid #ccc;border-radius:8px;break-inside:avoid}
    .obj-h{display:flex;justify-content:space-between;align-items:flex-start;gap:10px}
    .obj-t{font-weight:700;font-size:15px}
    .obj-d{font-size:12px;color:#555;margin-top:2px}
    .obj-avg{font-size:18px;font-weight:800;color:#6241F5}
    table{width:100%;border-collapse:collapse;margin-top:8px;font-size:11.5px}
    th,td{padding:6px 8px;border:1px solid #ddd;text-align:left;vertical-align:top}
    th{background:#f0f0f0;font-weight:700}
    .conf{display:inline-block;padding:1px 6px;border-radius:6px;font-size:10px;font-weight:700}
    .conf.high{background:#E6F6EE;color:#30AB62} .conf.mid{background:#FFF4E5;color:#F59E0B} .conf.low{background:#FCE8E9;color:#E5484D}
    .reality{font-size:11px;color:#555;background:#FAFAFA;padding:6px 8px;border-radius:4px;margin-top:4px}
    .pg-break{page-break-before:always}
    @media print{button{display:none}}
  </style></head><body>
  <button onclick="window.print()" style="position:fixed;top:14px;right:14px;padding:8px 14px;background:#6241F5;color:white;border:none;border-radius:6px;cursor:pointer;font-weight:600;">${I.print} 인쇄</button>
  <h1>${esc(t?.name||'팀')} OKR 리포트</h1>
  <div class="meta">${esc(t?.quarter||'')} · 출력일 ${todayKey()} · O ${state.objectives.length}개 / KR ${state.objectives.reduce((s,o)=>s+o.keyResults.length,0)}개 / 팀원 ${state.members.length}명</div>
  <h2>1. Objective · KR 진척</h2>`;
  state.objectives.forEach((o,oi)=>{
    const avg=o.keyResults.length?Math.round(o.keyResults.reduce((s,k)=>s+pct(k.current,k.target),0)/o.keyResults.length):0;
    html+=`<div class="obj"><div class="obj-h"><div><div class="obj-t">O${oi+1}. ${esc(o.title)} <span class="conf ${o.confidence||'mid'}">${CONF_LABELS[o.confidence||'mid']}</span></div><div class="obj-d">${esc(o.description||'')} · 담당 ${esc(memberName(o.ownerId))}</div></div><div class="obj-avg">${avg}%</div></div>${o.realityBlocker||o.realityHelp?`<div class="reality"><b>어려움:</b> ${esc(o.realityBlocker||'-')} <br><b>지원요청:</b> ${esc(o.realityHelp||'-')}</div>`:''}<table><tr><th>KR</th><th>담당</th><th>진척</th><th>마감</th><th>자신감</th><th>이니셔티브</th></tr>`;
    o.keyResults.forEach((k,ki)=>{const inits=k.initiatives.map(i=>`${STATUS_LABELS[i.status||'todo']} · ${esc(i.title)}${i.dueDate?` (${i.dueDate})`:''}`).join('<br>');html+=`<tr><td><b>KR${ki+1}.</b> ${esc(k.title)}</td><td>${esc(memberName(k.ownerId))}</td><td>${k.current}/${k.target} ${esc(k.unit||'')} · ${pct(k.current,k.target)}%</td><td>${k.dueDate||'-'}</td><td><span class="conf ${k.confidence||'mid'}">${CONF_LABELS[k.confidence||'mid']}</span></td><td>${inits||'-'}</td></tr>`;});
    html+=`</table></div>`;
  });
  html+=`<h2>2. 팀원별 활동 요약</h2><table><tr><th>팀원</th><th>역할</th><th>담당 O</th><th>담당 KR</th><th>KR 평균</th><th>Init 완료</th><th>중간리뷰</th><th>최종리뷰</th></tr>`;
  state.members.forEach(m=>{const a=memberAnalytics(m.id);const md=lastReflectionFor('member',m.id,'mid');const fn=lastReflectionFor('member',m.id,'final');html+=`<tr><td><b>${esc(m.name)}</b></td><td>${esc(m.role||'')}</td><td>${a.okrs}</td><td>${a.krs}</td><td>${a.krAvg}%</td><td>${a.initsDone}/${a.inits}</td><td>${md?'✓':'-'}</td><td>${fn?'✓':'-'}</td></tr>`;});
  html+=`</table>`;
  if(state.reviews.length>0){
    html+=`<h2 class="pg-break">3. 리뷰 상세 (Doerr 4질문)</h2><div style="font-size:11px;color:#666;margin-bottom:10px;">잘 된 것 / 어려웠던 것 / 배운 것 / 다음에 시도할 것 — OKR은 학습 도구이며 인사평가가 아닙니다.</div>`;
    state.reviews.forEach(r=>{const et=r.entity_type||'member';let label='';if(et==='member'){const m=state.members.find(x=>x.id===(r.entity_id||r.member_id));label=m?m.name:'-';}else if(et==='objective'){const o=state.objectives.find(x=>x.id===r.entity_id);label=o?`O · ${o.title}`:'-';}else if(et==='key_result'){let k=null;state.objectives.forEach(o=>o.keyResults.forEach(x=>{if(x.id===r.entity_id)k=x;}));label=k?`KR · ${k.title}`:'-';}html+=`<div class="obj"><div class="obj-h"><div class="obj-t">${esc(label)} · ${r.period==='mid'?'중간 리뷰':'최종 리뷰'} · ${esc(r.quarter||'')}</div></div>${r.summary?`<div style="margin-top:6px;font-weight:600;">${esc(r.summary)}</div>`:''}${r.what_worked?`<div style="margin-top:8px;"><b>잘 된 것</b><br>${esc(r.what_worked).replace(/\n/g,'<br>')}</div>`:''}${r.what_struggled?`<div style="margin-top:8px;"><b>어려웠던 것</b><br>${esc(r.what_struggled).replace(/\n/g,'<br>')}</div>`:''}${r.what_learned?`<div style="margin-top:8px;"><b>배운 것</b><br>${esc(r.what_learned).replace(/\n/g,'<br>')}</div>`:''}${r.next_try?`<div style="margin-top:8px;"><b>다음에 시도할 것</b><br>${esc(r.next_try).replace(/\n/g,'<br>')}</div>`:''}<div style="margin-top:6px;color:#666;font-size:10.5px;">작성자: ${esc(r.reviewer||'-')} · ${r.updated_at?new Date(r.updated_at).toLocaleString('ko-KR'):''}</div></div>`;});
  }
  html+=`</body></html>`;
  w.document.write(html);w.document.close();
  setTimeout(()=>{try{w.focus();}catch(e){}},300);
}

document.addEventListener('click',async e=>{
  const btn=e.target.closest('[data-act]');
  if(!btn){const m=document.getElementById('team-menu');if(m&&m.classList.contains('show')&&!e.target.closest('#team-menu'))m.classList.remove('show');return;}
  const a=btn.dataset.act;
  if(a==='setup-save'){const u=document.getElementById('setup-url').value.trim();const k=document.getElementById('setup-key').value.trim();const m=document.getElementById('setup-msg');if(!u||!k){m.textContent='두 값 모두 입력';return;}m.textContent='연결 중…';const r=await tryConnect(u,k);if(!r.ok){m.textContent='실패: '+r.msg;return;}saveConfig(u,k);location.reload();return;}
  if(a==='reset-config'){if(!confirm('연결 정보를 초기화할까요?'))return;clearConfig();location.reload();return;}
  if(a==='goto-home'){currentView='today';presentMode=false;viewingDate=todayKey();render();window.scrollTo({top:0,behavior:'smooth'});return;}
  // v110 — KR 진척 ± 스텝 (일상 진척 갱신: 전체 재렌더 없이 즉시 반영)
  if(a==='kr-step'){
    if(!selfMember()){showToast('진척 입력은 본인 인증 후 가능합니다',true);return;}
    const oid=btn.dataset.oid,krid=btn.dataset.krid,delta=Number(btn.dataset.delta)||0;
    let kr=null;const o=state.objectives.find(x=>x.id===oid);if(o)kr=o.keyResults.find(k=>k.id===krid);
    if(!kr)return;
    const oldCur=Number(kr.current)||0;let nc=oldCur+delta;if(nc<0)nc=0;
    if(nc===oldCur)return;
    kr.current=nc;
    updateKRRowDom(oid,krid);
    document.querySelectorAll('input[data-field="kr-current"][data-krid="'+krid+'"]').forEach(inp=>{if(document.activeElement!==inp)inp.value=nc;});
    logChange('key_result',krid,'update','current',oldCur,nc,kr.title);
    saveKR(oid,kr);
    return;
  }
  if(a==='my-init-filter'){myInitFilter=btn.dataset.filter;render();return;}
  if(a==='clear-search'){okrSearchQuery='';render();return;}
  if(a==='clear-refl-search'){reflSearchQuery='';render();return;}
  if(a==='jump-to-kr'){
    const oid=btn.dataset.oid,krid=btn.dataset.krid;
    currentView='okr';
    if(!expanded.has(oid))expanded.add(oid);
    krCollapsed.delete(krid);
    render();
    setTimeout(()=>{
      const el=document.querySelector(`[data-kr-id="${krid}"]`);
      if(!el)return;
      el.scrollIntoView({behavior:'smooth',block:'center'});
      setTimeout(()=>{el.classList.remove('jump-flash');void el.offsetWidth;el.classList.add('jump-flash');setTimeout(()=>el.classList.remove('jump-flash'),1900);},200);
    },150);
    return;
  }
  if(a==='jump-to'){
    const t=btn.dataset.target;
    if(t==='okr'){currentView='okr';render();return;}
    if(t==='routines'){currentView='routines';render();return;}
    // 같은 화면 내 점프 (스크롤 + 포커스)
    setTimeout(()=>{
      let el=null;
      if(t==='headline')el=document.querySelector('textarea[data-field="headline"]');
      else if(t==='standup')el=document.querySelector('textarea[data-field="standup"][data-fieldname="today"]');
      if(el){el.scrollIntoView({behavior:'smooth',block:'center'});setTimeout(()=>el.focus(),350);}
    },50);
    return;
  }
  if(a==='toggle-team-menu'){e.stopPropagation();document.getElementById('team-menu').classList.toggle('show');return;}
  if(a==='switch-team'){const tid=btn.dataset.tid;if(!tid||tid===state.currentTeamId){document.getElementById('team-menu')?.classList.remove('show');return;}state.currentTeamId=tid;localStorage.setItem(TEAM_KEY,tid);document.getElementById('team-menu')?.classList.remove('show');initialized=false;render();await loadTeamData(tid);initialized=true;render();return;}
  if(a==='add-team'){const n=prompt('새 팀 이름','새 팀');if(!n)return;const id=uid();const t={id,name:n,quarter:currentTeam()?.quarter||'2026 Q2',sort_order:state.teams.length};state.teams.push(t);state.currentTeamId=id;localStorage.setItem(TEAM_KEY,id);initialized=false;render();await sb.from('teams').insert(t);await loadTeamData(id);initialized=true;render();return;}
  if(a==='del-team'){if(state.teams.length<=1){showToast('마지막 팀은 삭제 불가',true);return;}const t=currentTeam();if(!t)return;if(!confirm(`팀 "${t.name}"과 모든 데이터를 삭제할까요?`))return;const oid=t.id;state.teams=state.teams.filter(x=>x.id!==oid);state.currentTeamId=state.teams[0].id;localStorage.setItem(TEAM_KEY,state.currentTeamId);initialized=false;render();await sb.from('teams').delete().eq('id',oid);await loadTeamData(state.currentTeamId);initialized=true;render();return;}
  if(a==='view'){currentView=btn.dataset.view;render();return;}
  if(a==='present'){presentMode=!presentMode;if(presentMode){const pm=presentableMembers();presentMid=pm.length>0?pm[pm.length-1].id:null;}render();return;}
  if(a==='present-set'){presentMid=btn.dataset.mid;render();return;}
  if(a==='jump-to-member'){
    const mid=btn.dataset.mid;
    const card=document.querySelector('[data-member-card="'+mid+'"]');
    if(card){
      // v55 — sticky 헤더+date-bar 가림 보정 (scroll-margin-top + 수동 보정 모두 적용)
      const headerH=(document.querySelector('header.app-header')?.offsetHeight)||64;
      const dateBarH=(document.querySelector('.date-bar')?.offsetHeight)||50;
      const top=window.scrollY+card.getBoundingClientRect().top-headerH-dateBarH-12;
      window.scrollTo({top,behavior:'smooth'});
      card.classList.add('highlight-flash');
      setTimeout(()=>card.classList.remove('highlight-flash'),1500);
    }
    return;
  }
  if(a==='present-prev'){const pm=presentableMembers();if(pm.length===0)return;const i=pm.findIndex(m=>m.id===presentMid);const ni=i>0?i-1:pm.length-1;presentMid=pm[ni].id;render();return;}
  if(a==='present-next'){const pm=presentableMembers();if(pm.length===0)return;const i=pm.findIndex(m=>m.id===presentMid);const ni=i<pm.length-1?i+1:0;presentMid=pm[ni].id;render();return;}
  if(a==='toggle-dark'){setDark(!isDark());render();return;}
  if(a==='date-shift'){viewingDate=shiftDate(viewingDate,parseInt(btn.dataset.delta));if(!state.standups[viewingDate]||!state.routineLogs[viewingDate]){dateLoading=true;render();await Promise.all([loadStandup(viewingDate),loadRoutineLogs(viewingDate)]);dateLoading=false;}render();return;}
  if(a==='date-today'){viewingDate=todayKey();render();return;}
  if(a==='toggle-obj'){const oid=btn.dataset.oid;expanded.has(oid)?expanded.delete(oid):expanded.add(oid);render();return;}
  if(a==='toggle-kr'){const k=btn.dataset.krid;krCollapsed.has(k)?krCollapsed.delete(k):krCollapsed.add(k);render();return;}
  // v84 — 메인화면 KR 행에서 이니셔티브 펼침/접힘 토글
  if(a==='toggle-kr-init'){const k=btn.dataset.krid;if(!window._krInitOpen)window._krInitOpen=new Set();window._krInitOpen.has(k)?window._krInitOpen.delete(k):window._krInitOpen.add(k);render();return;}
  // v15 — WBS 간트
  if(a==='wbs-toggle'){const key=btn.dataset.key;const set=window._wbsToggled||(window._wbsToggled=new Set());set.has(key)?set.delete(key):set.add(key);render();return;}
  if(a==='wbs-view'){window._wbsView=btn.dataset.mode;render();return;}
  if(a==='wbs-download'){downloadWBSPng();return;}
  // v137 — WBS에서 이니셔티브에 할일 추가 (펼친 뒤 새 행 입력)
  if(a==='wbs-add-task'){
    const iid=btn.dataset.iid;
    if(typeof selfMember==='function'&&!selfMember()){showToast('본인 선택 필요',true);return;}
    const list=state.initiativeTasks[iid]||(state.initiativeTasks[iid]=[]);
    const newT={id:uid(),initiative_id:iid,title:'',status:'todo',owner_id:(selfMember()&&selfMember().id)||null,start_date:null,due_date:null,sort_order:list.length};
    list.push(newT);
    const set=window._wbsToggled||(window._wbsToggled=new Set());set.delete('I:'+iid); // 펼침 보장
    saveInitiativeTask(newT);
    render();
    setTimeout(()=>{const el=document.querySelector(`input[data-field="wbs-task-title"][data-tid="${newT.id}"]`);if(el){el.focus();el.scrollIntoView({block:'center',behavior:'smooth'});}},60);
    return;
  }
  if(a==='wbs-del-task'){
    if(!confirm('이 할일을 삭제할까요?'))return;
    const iid=btn.dataset.iid,tid=btn.dataset.tid;
    state.initiativeTasks[iid]=(state.initiativeTasks[iid]||[]).filter(x=>x.id!==tid);
    await deleteInitiativeTask(tid);
    render();return;
  }
  if(a==='wbs-jump'){
    // v39 — 더블클릭(날짜 팝오버) 가능성을 위해 280ms 지연, dblclick 발동 시 취소
    const type=btn.dataset.type;const id=btn.dataset.id;
    const oid=btn.dataset.oid;const krid=btn.dataset.krid;
    if(window._wbsJumpTimer){clearTimeout(window._wbsJumpTimer);window._wbsJumpTimer=null;}
    window._wbsJumpTimer=setTimeout(()=>{
      window._wbsJumpTimer=null;
      currentView='okr';
      if(type==='O'){expanded.add(id);}
      else if(type==='KR'){expanded.add(oid);krCollapsed.delete(id);}
      else if(type==='I'){expanded.add(oid);krCollapsed.delete(krid);}
      else if(type==='T'){expanded.add(oid);krCollapsed.delete(krid);if(window._initSubOpen)window._initSubOpen.add(btn.dataset.iid);else window._initSubOpen=new Set([btn.dataset.iid]);} // v137 — 할일 → 소속 이니셔티브로 점프
      render();
      // v38 — 점프 후 펄스 하이라이트로 시각 cue 강화
      setTimeout(()=>{
        const sel=type==='O'?`[data-obj-id="${id}"]`:type==='KR'?`[data-kr-id="${id}"]`:type==='T'?`[data-init-id="${btn.dataset.iid}"]`:`[data-init-id="${id}"]`;
        const el=document.querySelector(sel);
        if(!el)return;
        el.scrollIntoView({behavior:'smooth',block:'center'});
        setTimeout(()=>{
          el.classList.remove('jump-flash');
          void el.offsetWidth;
          el.classList.add('jump-flash');
          setTimeout(()=>el.classList.remove('jump-flash'),1900);
        },200);
      },150);
    },280);
    return;
  }
  if(a==='toggle-kr-menu'){const k=btn.dataset.krid;krMenuOpen.has(k)?krMenuOpen.delete(k):krMenuOpen.add(k);render();return;}
  if(a==='toggle-reality'){
    const k=btn.dataset.key;
    const wasOpen=realityOpen.has(k);
    wasOpen?realityOpen.delete(k):realityOpen.add(k);
    // v14 — helper:* (도움요청) 토글은 로컬 DOM만 갱신 → 깜빡임 방지
    if(k&&k.startsWith('helper:')){
      const box=document.querySelector(`[data-reality-box="${k}"]`);
      const tBtn=document.querySelector(`[data-reality-btn="${k}"]`);
      if(box)box.style.display=wasOpen?'none':'block';
      if(tBtn)tBtn.textContent=wasOpen?'도움요청 ▾':'도움요청 ▴';
      return;
    }
    render();return;
  }
  // v16 — 관리자 패널 액션들
  if(a==='admin-refresh'){_adminCachedSessions=null;_adminLastFetch=0;render();return;}
  // v107 — PIN 1명만 클릭 시 복원 (background 부하 없음)
  if(a==='admin-crack-pin'){
    if(!isAdmin()){showToast('관리자만 가능',true);return;}
    const mid=btn.dataset.mid;const m=state.members.find(x=>x.id===mid);if(!m||!m.pin_hash)return;
    btn.disabled=true;btn.textContent='🔍 해독 중...';
    try{
      const pin=await crackPin(mid,m.pin_hash);
      if(pin){m._pinCracked=pin;render();}
      else{btn.disabled=false;btn.textContent='⚠ 실패';showToast('PIN 해독 실패',true);}
    }catch(e){btn.disabled=false;btn.textContent='⚠ 오류';}
    return;
  }
  if(a==='admin-reset-pin'){
    if(!isAdmin()){showToast('관리자만 가능',true);return;}
    const mid=btn.dataset.mid;const m=state.members.find(x=>x.id===mid);if(!m)return;
    if(!confirm(`${m.name}님의 PIN을 초기화합니다. 다음 진입 시 새 PIN을 등록하게 됩니다. 계속할까요?`))return;
    markLocal('members',mid);
    m.pin_hash=null;
    const{error}=await sb.from('members').update({pin_hash:null}).eq('id',mid);
    if(error){showToast('초기화 실패',true);return;}
    showToast(`${m.name} PIN 초기화 완료`);render();return;
  }
  if(a==='admin-set-pin'){
    if(!isAdmin()){showToast('관리자만 가능',true);return;}
    const mid=btn.dataset.mid;const m=state.members.find(x=>x.id===mid);if(!m)return;
    const pin=prompt(`${m.name}님께 임시 PIN을 지정합니다.\n새 PIN (숫자 4자리):`);
    if(!pin)return;
    if(!/^[0-9]{4}$/.test(pin)){showToast('4자리 숫자만 가능',true);return;}
    const ok=await setMemberPin(mid,pin);
    if(ok)showToast(`${m.name} PIN 설정 완료 — ${m.name}에게 PIN을 전달하세요`);
    return;
  }
  if(a==='admin-add-observer'){
    if(!isAdmin()){showToast('관리자만 가능',true);return;}
    if(state.members.some(m=>m.isObserver)){showToast('이미 옵저버 계정이 있습니다',true);return;}
    const i=state.members.length;
    const obs={id:uid(),team_id:state.currentTeamId,name:'옵저버',role:'열람 전용',color:'#7E8794',isObserver:true,isAdmin:false};
    state.members.push(obs);
    render();
    const{error}=await sb.from('members').insert({id:obs.id,team_id:obs.team_id,name:obs.name,role:obs.role,color:obs.color,is_observer:true,is_admin:false,sort_order:i});
    if(error){showToast('생성 실패',true);state.members.pop();render();return;}
    // PIN '3962' 자동 설정
    await setMemberPin(obs.id,'3962');
    logChange('member',obs.id,'create','','','옵저버 (PIN 3962, 1시간 자동 로그아웃)','옵저버');
    showToast('옵저버 계정 추가 완료 — PIN: 3962, 1시간 후 자동 로그아웃');render();return;
  }
  if(a==='admin-clear-sessions'){
    if(!isAdmin()){showToast('관리자만 가능',true);return;}
    if(!confirm('30일 이상 된 로그인 세션을 삭제합니다. 계속할까요?'))return;
    const cutoff=new Date(Date.now()-30*86400000).toISOString();
    const{error}=await sb.from('member_sessions').delete().lt('login_at',cutoff);
    if(error){showToast('삭제 실패',true);return;}
    _adminCachedSessions=null;_adminLastFetch=0;
    showToast('오래된 세션 기록 정리 완료');render();return;
  }
  // v15 — 관리자 권한 토글 (관리자만 가능)
  if(a==='toggle-admin'){
    if(!isAdmin()){showToast('관리자만 권한 변경 가능',true);return;}
    const mid=btn.dataset.mid;const m=state.members.find(x=>x.id===mid);if(!m)return;
    // 마지막 관리자 해제 방지
    if(m.isAdmin&&state.members.filter(x=>x.isAdmin).length<=1){showToast('관리자 최소 1명 유지 필요',true);return;}
    m.isAdmin=!m.isAdmin;
    saveMember(m);
    logChange('member',m.id,'update','is_admin',!m.isAdmin,m.isAdmin,m.name);
    render();
    return;
  }
  // v16 — Initiative 담당자 선택 (다중 + 팀 전원)
  if(a==='open-init-owners'){
    const krid=btn.dataset.krid,iid=btn.dataset.iid;
    let init=null;state.objectives.forEach(o=>o.keyResults.forEach(k=>{if(k.id===krid)init=k.initiatives.find(i=>i.id===iid);}));
    if(!init){showToast('Initiative를 찾을 수 없습니다',true);return;}
    if(!canEditInit(init)){showToast('본인 담당 또는 관리자만 변경 가능',true);return;}
    openInitOwnersPicker(krid,iid);
    return;
  }
  if(a==='save-init-owners'){
    const krid=btn.dataset.krid,iid=btn.dataset.iid;
    let init=null;state.objectives.forEach(o=>o.keyResults.forEach(k=>{if(k.id===krid)init=k.initiatives.find(i=>i.id===iid);}));
    if(!init)return;
    if(!canEditInit(init)){showToast('변경 권한 없음',true);return;}
    if(btn.dataset.clear){
      init.ownerId='';
    }else{
      const teamAllEl=document.getElementById('init-owner-team-all');
      if(teamAllEl&&teamAllEl.checked){
        init.ownerId='__team_all__';
      }else{
        const checked=[...document.querySelectorAll('#init-owners-list input[type="checkbox"]:checked')].map(cb=>cb.dataset.mid).filter(Boolean);
        init.ownerId=checked.join(',');
      }
    }
    saveInitiative(krid,init);
    logChange('initiative',iid,'update','owners','',init.ownerId||'(없음)',init.title);
    closeModal();render();
    return;
  }
  // v15 — Initiative 완료 체크박스 (OKR 탭)
  if(a==='toggle-init-done'){
    const krid=btn.dataset.krid;const iid=btn.dataset.iid;
    let init=null;state.objectives.forEach(o=>o.keyResults.forEach(k=>{if(k.id===krid)init=k.initiatives.find(i=>i.id===iid);}));
    if(!init)return;
    if(!canEditInit(init)){showToast('본인 담당 또는 관리자만 체크 가능',true);return;}
    const old=init.status;
    init.status=(init.status==='done')?'todo':'done';
    saveInitiative(krid,init);
    logChange('initiative',iid,'update','status',old,init.status,init.title);
    // v110 — 전체 render() 대신 해당 init 행만 부분 갱신 (스크롤 점프 제거)
    if(!rerenderInitRowOKR(krid,iid))render();
    return;
  }
  // v121 — "최근 한 일" DB 할일 체크 토글 (updated_at 미변경 → 표시 날짜 유지)
  if(a==='recent-toggle-db'){
    const tid=btn.dataset.tid,iid=btn.dataset.iid;
    const arr=state.initiativeTasks&&state.initiativeTasks[iid];
    const t=arr&&arr.find(x=>x.id===tid);
    if(!t){showToast('작업을 찾을 수 없습니다',true);return;}
    t.status=t.status==='done'?'todo':'done';
    markLocal('initiative_tasks',tid);
    sb.from('initiative_tasks').update({status:t.status}).eq('id',tid).then(({error})=>{if(error)showToast('저장 실패',true);});
    const done=t.status==='done';
    btn.classList.toggle('checked',done);btn.textContent=done?'✓':'';
    const row=btn.closest('.recent-task-row');
    const txt=row&&row.querySelector('.recent-task-text');
    if(txt){txt.style.color=done?'var(--text-soft)':'var(--text)';txt.style.textDecoration=done?'line-through':'';}
    return;
  }
  // v121 — "최근 한 일" DB 할일 삭제
  if(a==='recent-del-db'){
    const tid=btn.dataset.tid,iid=btn.dataset.iid;
    const arr=state.initiativeTasks&&state.initiativeTasks[iid];
    const t=arr&&arr.find(x=>x.id===tid);
    if(!t){showToast('작업을 찾을 수 없습니다',true);return;}
    if(!confirm('"'+(t.title||'(제목 없음)')+'" 작업을 삭제할까요?'))return;
    state.initiativeTasks[iid]=arr.filter(x=>x.id!==tid);
    markLocal('initiative_tasks',tid);
    sb.from('initiative_tasks').delete().eq('id',tid).then(({error})=>{if(error)showToast('삭제 실패',true);});
    const c=btn.closest('.recent-task-container');if(c)c.remove();
    return;
  }
  // v121 — "최근 한 일" JSON(스탠드업) 작업 삭제
  if(a==='recent-del-task'){
    const mid=btn.dataset.mid;const date=btn.dataset.date;const tid=btn.dataset.tid;
    if(!canEditAs(mid)){showToast('본인 항목만 삭제 가능',true);return;}
    const entry=state.standups[date]?.entries?.[mid];
    if(!entry){showToast('데이터를 찾을 수 없습니다',true);return;}
    const raw=entry.today||'';
    let parsed={legacy:'',tasks:[]};
    if(raw.trim().startsWith('{')&&raw.indexOf('"_krlv":1')>0){
      try{const p=JSON.parse(raw);parsed={legacy:p.legacy||'',tasks:Array.isArray(p.tasks)?p.tasks:[]};}catch(e){}
    }else parsed.legacy=raw;
    const i=(parsed.tasks||[]).findIndex(x=>x.id===tid);
    if(i<0){showToast('작업을 찾을 수 없습니다',true);return;}
    if(!confirm('"'+(parsed.tasks[i].t||'(제목 없음)')+'" 작업을 삭제할까요?'))return;
    parsed.tasks.splice(i,1);
    const newText=(parsed.tasks.length>0||((parsed.legacy||'').trim()))?JSON.stringify({_krlv:1,legacy:parsed.legacy||'',tasks:parsed.tasks}):'';
    entry.today=newText;
    saveEntry(date,mid,'today',newText);
    const c=btn.closest('.recent-task-container');if(c)c.remove();
    return;
  }
  // v14 — "최근 한 일"에서 담당자 본인이 과거 작업을 ✓ 체크 가능
  if(a==='recent-toggle-task'){
    const mid=btn.dataset.mid;const date=btn.dataset.date;const tid=btn.dataset.tid;
    if(!canEditAs(mid)){showToast('본인 항목만 체크 가능',true);return;}
    const entry=state.standups[date]?.entries?.[mid];
    if(!entry){showToast('데이터를 찾을 수 없습니다',true);return;}
    // 파싱 — JSON 또는 평문
    const raw=entry.today||'';
    let parsed={legacy:'',tasks:[]};
    if(raw.trim().startsWith('{')&&raw.indexOf('"_krlv":1')>0){
      try{const p=JSON.parse(raw);parsed={legacy:p.legacy||'',tasks:Array.isArray(p.tasks)?p.tasks:[]};}catch(e){}
    }else parsed.legacy=raw;
    const task=(parsed.tasks||[]).find(x=>x.id===tid);
    if(!task){showToast('작업을 찾을 수 없습니다',true);return;}
    task.d=!task.d;
    // 재직렬화
    const newText=parsed.tasks.length>0?JSON.stringify({_krlv:1,legacy:parsed.legacy||'',tasks:parsed.tasks}):(parsed.legacy||'');
    entry.today=newText;
    saveEntry(date,mid,'today',newText);
    // 로컬 UI 갱신 (전체 render 회피 → 깜빡임 없음)
    btn.classList.toggle('checked',task.d);
    btn.textContent=task.d?'✓':'';
    const row=btn.closest('.recent-task-row');
    if(row){
      const txt=row.querySelector('.recent-task-text');
      if(txt){
        txt.style.color=task.d?'var(--text-soft)':'var(--text)';
        txt.style.textDecoration=task.d?'line-through':'';
      }
    }
    return;
  }
  if(a==='cycle-conf'){const et=btn.dataset.etype,eid=btn.dataset.eid;const order=['high','mid','low'];let nx=null,old=null,saveFn=null,label='';
    if(et==='objective'){const o=state.objectives.find(x=>x.id===eid);if(!o)return;nx=order[(order.indexOf(o.confidence||'mid')+1)%3];old=o.confidence;o.confidence=nx;saveObjective(o);label=o.title;}
    else if(et==='kr'){let oid=null,kr=null;state.objectives.forEach(o=>o.keyResults.forEach(k=>{if(k.id===eid){oid=o.id;kr=k;}}));if(!kr)return;nx=order[(order.indexOf(kr.confidence||'mid')+1)%3];old=kr.confidence;kr.confidence=nx;saveKR(oid,kr);label=kr.title;}
    else if(et==='initiative'){let krid=null,init=null;state.objectives.forEach(o=>o.keyResults.forEach(k=>k.initiatives.forEach(i=>{if(i.id===eid){krid=k.id;init=i;}})));if(!init)return;nx=order[(order.indexOf(init.confidence||'mid')+1)%3];old=init.confidence;init.confidence=nx;saveInitiative(krid,init);label=init.title;}
    if(nx){logChange(et==='kr'?'key_result':et,eid,'update','confidence',old,nx,label);
      // 부분 업데이트 — 해당 칩만 색·라벨·호버 갱신
      btn.classList.remove('high','mid','low');btn.classList.add(nx);btn.textContent=CONF_LABELS[nx];btn.title=CONF_HINTS[nx]+' (클릭하여 변경)';
    }
    return;
  }
  if(a==='show-history'){openHistory(btn.dataset.etype,btn.dataset.eid);return;}
  if(a==='close-modal'){closeModal();return;}
  if(a==='add-obj'){if(!canEditOKR()){showToast('관리자만 추가 가능',true);return;}const id=uid();const o={id,title:'',description:'',ownerId:state.members[0]?.id||null,confidence:'mid',realityBlocker:'',realityHelp:'',keyResults:[]};state.objectives.push(o);expanded.add(id);render();const{error}=await sb.from('objectives').insert({id,team_id:state.currentTeamId,title:'',description:'',owner_id:o.ownerId,confidence:'mid',sort_order:state.objectives.length-1});if(error)showToast('저장 실패',true);else logChange('objective',id,'create','','','(작성 중)','(작성 중)');setTimeout(()=>{const el=document.querySelector(`input[data-field="obj-title"][data-oid="${id}"]`);if(el){el.focus();el.scrollIntoView({block:"center",behavior:"smooth"});}},100);return;}
  if(a==='del-obj'){if(!canEditOKR()){showToast('관리자만 삭제 가능',true);return;}if(!confirm('이 Objective와 하위 KR/Initiative를 삭제할까요?'))return;const oid=btn.dataset.oid;const o=state.objectives.find(x=>x.id===oid);state.objectives=state.objectives.filter(x=>x.id!==oid);render();await sb.from('objectives').delete().eq('id',oid);logChange('objective',oid,'delete','',o?.title||'','',o?.title||'');return;}
  if(a==='add-kr'){if(!canEditOKR()){showToast('관리자만 추가 가능',true);return;}const oid=btn.dataset.oid;const o=state.objectives.find(x=>x.id===oid);if(!o)return;const id=uid();const kr={id,title:'',target:100,current:0,unit:'%',ownerId:null,confidence:'mid',realityBlocker:'',realityHelp:'',initiatives:[]};o.keyResults.push(kr);render();const{error}=await sb.from('key_results').insert({id,objective_id:oid,title:'',target:kr.target,current:kr.current,unit:kr.unit,owner_id:null,confidence:'mid',sort_order:o.keyResults.length-1});if(error)showToast('저장 실패',true);else logChange('key_result',id,'create','','','(작성 중)','(작성 중)');setTimeout(()=>{const el=document.querySelector(`input[data-field="kr-title"][data-krid="${id}"]`);if(el){el.focus();el.scrollIntoView({block:"center",behavior:"smooth"});}},100);return;}
  if(a==='del-kr'){if(!canEditOKR()){showToast('관리자만 삭제 가능',true);return;}if(!confirm('이 KR을 삭제할까요?'))return;const oid=btn.dataset.oid,krid=btn.dataset.krid;const o=state.objectives.find(x=>x.id===oid);const kr=o?.keyResults.find(k=>k.id===krid);if(o)o.keyResults=o.keyResults.filter(k=>k.id!==krid);render();await sb.from('key_results').delete().eq('id',krid);logChange('key_result',krid,'delete','',kr?.title||'','',kr?.title||'');return;}
  if(a==='add-init'){
    // v15 — 본인 담당 Initiative만 추가 (관리자는 누구든 추가)
    const me=selfMember();if(!me){showToast('본인 선택 필요',true);return;}
    const krid=btn.dataset.krid;let kr=null;state.objectives.forEach(o=>o.keyResults.forEach(k=>{if(k.id===krid)kr=k;}));if(!kr)return;
    const id=uid();
    const init={id,title:'',ownerId:me.id,status:'todo',confidence:'mid',realityBlocker:'',realityHelp:''};
    kr.initiatives.push(init);render();const{error}=await sb.from('initiatives').insert({id,kr_id:krid,title:'',status:'todo',owner_id:me.id,confidence:'mid',sort_order:kr.initiatives.length-1});if(error)showToast('저장 실패',true);else logChange('initiative',id,'create','','','(작성 중)','(작성 중)');setTimeout(()=>{const el=document.querySelector(`input[data-field="init-title"][data-iid="${id}"]`);if(el){el.focus();el.scrollIntoView({block:"center",behavior:"smooth"});}},100);return;
  }
  if(a==='del-init'){
    const krid=btn.dataset.krid,iid=btn.dataset.iid;let kr=null,init=null;state.objectives.forEach(o=>o.keyResults.forEach(k=>{if(k.id===krid){kr=k;init=k.initiatives.find(i=>i.id===iid);}}));
    if(!init)return;
    if(!canEditInit(init)){showToast('본인 담당 또는 관리자만 삭제 가능',true);return;}
    if(!confirm('이 Initiative를 삭제할까요?'))return;
    if(kr)kr.initiatives=kr.initiatives.filter(i=>i.id!==iid);render();await sb.from('initiatives').delete().eq('id',iid);logChange('initiative',iid,'delete','',init?.title||'','',init?.title||'');return;
  }
  if(a==='add-member'){const i=state.members.length;const m={id:uid(),team_id:state.currentTeamId,name:`팀원 ${i+1}`,role:'팀원',color:PALETTE[i%PALETTE.length]};state.members.push(m);render();const{error}=await sb.from('members').insert({...m,sort_order:i});if(error)showToast('저장 실패',true);else logChange('member',m.id,'create','','',m.name,m.name);return;}
  if(a==='del-member'){if(!confirm('팀원을 삭제할까요?'))return;const mid=btn.dataset.mid;const m=state.members.find(x=>x.id===mid);state.members=state.members.filter(x=>x.id!==mid);render();await sb.from('members').delete().eq('id',mid);logChange('member',mid,'delete','',m?.name||'','',m?.name||'');return;}
  if(a==='add-routine'){window._routinesMngOpen=true;const id=uid();const i=state.routines.length;const r={id,team_id:state.currentTeamId,title:'새 루틴',description:'',owner_id:state.members[0]?.id||null,frequency:'weekdays',days_of_week:[1,2,3,4,5],active:true,sort_order:i};state.routines.push(r);render();setTimeout(()=>{const inp=document.querySelector('input[data-field="rt-title"][data-rid="'+id+'"]');if(inp){inp.focus();inp.select();inp.scrollIntoView({behavior:'smooth',block:'center'});}},0);const{error}=await sb.from('routines').insert(r);if(error)showToast('저장 실패',true);else logChange('routine',id,'create','','',r.title,r.title);return;}
  if(a==='toggle-routines-mng'){window._routinesMngOpen=!window._routinesMngOpen;render();return;}
  // v30 — Initiative 하위 sub-task 액션
  if(a==='toggle-init-sub'){
    if(!window._initSubOpen)window._initSubOpen=new Set();
    const iid=btn.dataset.iid;
    if(window._initSubOpen.has(iid))window._initSubOpen.delete(iid);else window._initSubOpen.add(iid);
    render();return;
  }
  if(a==='add-init-sub'){
    const iid=btn.dataset.iid;
    // v68 — render() 전에 DOM의 현재 입력값을 state에 동기화 (타이핑 중 클릭 시 손실 방지)
    document.querySelectorAll('input[data-field="init-sub-title"]').forEach(inp=>{
      const t2=(state.initiativeTasks[inp.dataset.iid]||[]).find(x=>x.id===inp.dataset.stid);
      if(t2&&inp.value!==t2.title){t2.title=inp.value;saveInitiativeTask(t2);}
    });
    document.querySelectorAll('input[data-field="init-sub-due"]').forEach(inp=>{
      const t2=(state.initiativeTasks[inp.dataset.iid]||[]).find(x=>x.id===inp.dataset.stid);
      if(t2&&(inp.value||null)!==t2.due_date){t2.due_date=inp.value||null;saveInitiativeTask(t2);}
    });
    document.querySelectorAll('input[data-field="init-sub-start"]').forEach(inp=>{
      const t2=(state.initiativeTasks[inp.dataset.iid]||[]).find(x=>x.id===inp.dataset.stid);
      if(t2&&(inp.value||null)!==t2.start_date){t2.start_date=inp.value||null;saveInitiativeTask(t2);}
    });
    if(!window._initSubOpen)window._initSubOpen=new Set();
    window._initSubOpen.add(iid);
    const list=state.initiativeTasks[iid]||(state.initiativeTasks[iid]=[]);
    const newT={id:uid(),initiative_id:iid,title:'',status:'todo',owner_id:selfMember()?.id||null,start_date:null,due_date:null,sort_order:list.length};
    list.push(newT);
    saveInitiativeTask(newT);
    render();
    setTimeout(()=>{const inp=document.querySelector('input[data-field="init-sub-title"][data-stid="'+newT.id+'"]');if(inp){inp.focus();}},0);
    return;
  }
  if(a==='toggle-init-sub-done'){
    const iid=btn.dataset.iid,stid=btn.dataset.stid;
    const list=state.initiativeTasks[iid]||[];const t=list.find(x=>x.id===stid);
    if(!t)return;
    t.status=t.status==='done'?'todo':'done';
    saveInitiativeTask(t);render();return;
  }
  if(a==='del-init-sub'){
    if(!confirm('이 할일을 삭제할까요?'))return;
    const iid=btn.dataset.iid,stid=btn.dataset.stid;
    state.initiativeTasks[iid]=(state.initiativeTasks[iid]||[]).filter(x=>x.id!==stid);
    await deleteInitiativeTask(stid);
    render();return;
  }
  if(a==='del-routine'){if(!confirm('이 루틴과 모든 수행 기록을 삭제할까요?'))return;const rid=btn.dataset.rid;const r=state.routines.find(x=>x.id===rid);state.routines=state.routines.filter(x=>x.id!==rid);render();await sb.from('routines').delete().eq('id',rid);logChange('routine',rid,'delete','',r?.title||'','',r?.title||'');return;}
  if(a==='toggle-day'){const rid=btn.dataset.rid;const day=parseInt(btn.dataset.day);const r=state.routines.find(x=>x.id===rid);if(!r)return;const arr=r.days_of_week||[];const i=arr.indexOf(day);if(i>=0)arr.splice(i,1);else arr.push(day);r.days_of_week=arr.sort((a,b)=>a-b);saveRoutine(r);render();return;}
  if(a==='toggle-routine'){const rid=btn.dataset.rid;ensureRoutineLog(viewingDate);const cur=state.routineLogs[viewingDate][rid]?.completed||false;saveRoutineLog(rid,viewingDate,!cur);render();return;}
  if(a==='toggle-init-check'){const iid=btn.dataset.iid;const mid=btn.dataset.mid;const cur=getIDLForMemberDate(mid,viewingDate)[iid]?.checked||false;saveInitiativeDailyLog(iid,mid,viewingDate,!cur);
    // 부분 업데이트 — 전체 render 대신 해당 체크박스만 토글
    const checks=document.querySelectorAll(`[data-act="toggle-init-check"][data-iid="${iid}"][data-mid="${mid}"]`);
    checks.forEach(el=>{if(el.tagName==='BUTTON'){el.classList.toggle('checked',!cur);el.innerHTML=!cur?I.check:'';}else if(el.tagName==='SPAN'){el.style.textDecoration=!cur?'line-through':'';el.style.color=!cur?'var(--text-soft)':'';}});
    return;
  }
  if(a==='set-support-type'){
    const mid=btn.dataset.mid;const type=btn.dataset.type;
    const ensure=ensureStandup(viewingDate);
    if(!ensure.entries[mid])ensure.entries[mid]={yesterday:'',today:'',blockers:'',helper_member_id:'',helper_name:'',support_type:'',support_detail:''};
    const old=ensure.entries[mid].support_type;
    const next=(old===type)?'':type;
    ensure.entries[mid].support_type=next;
    saveEntry(viewingDate,mid,'support_type',next);
    // v14 — 칩만 로컬 갱신 → 전체 render() 회피로 깜빡임 방지
    const grp=btn.parentElement;
    if(grp){
      grp.querySelectorAll('[data-act="set-support-type"][data-mid="'+mid+'"]').forEach(b=>{
        const isActive=b.dataset.type===next;
        b.style.background=isActive?'var(--primary-soft)':'';
        b.style.color=isActive?'var(--primary)':'';
        b.style.fontWeight=isActive?'600':'';
      });
    }
    return;
  }
  if(a==='clear-blocker'){
    const mid=btn.dataset.mid;
    if(!confirm('막힘과 도움 요청을 모두 지울까요?'))return;
    const s=ensureStandup(viewingDate);
    if(!s.entries[mid])s.entries[mid]={yesterday:'',today:'',blockers:'',helper_member_id:'',helper_name:'',support_type:'',support_detail:''};
    s.entries[mid].blockers='';s.entries[mid].helper_member_id='';s.entries[mid].helper_name='';s.entries[mid].support_type='';s.entries[mid].support_detail='';
    // 한 번에 전체 저장 (saveEntry는 마지막 호출로 전체 row를 upsert함)
    saveEntry(viewingDate,mid,'support_detail','');
    realityOpen.delete(`helper:${mid}`);
    render();
    showToast('지웠습니다');
    return;
  }
  if(a==='open-review'){openReflection('member',btn.dataset.mid,btn.dataset.period);return;}
  if(a==='open-reflection'){openReflection(btn.dataset.etype,btn.dataset.eid,btn.dataset.period);return;}
  if(a==='refl-mode'){window._reflMode=btn.dataset.mode;const opts=window._reviewOpts||{};const r=window._editingReview;if(r)openReflection(r.entity_type||'member',r.entity_id||r.member_id,r.period,opts);return;}
  if(a==='review-period'){const preset=btn.dataset.preset;const et=btn.dataset.etype||'member';openReflection(et,btn.dataset.mid,btn.dataset.period,{preset});return;}
  if(a==='review-custom'){const which=btn.dataset.which;const v=btn.value;const cur=window._reviewOpts||{preset:'14',start:null,end:todayKey()};const et=btn.dataset.etype||'member';const opts={preset:'custom',start:which==='start'?v:cur.start,end:which==='end'?v:cur.end};if(!opts.start){const sd=new Date(opts.end);sd.setDate(sd.getDate()-14);opts.start=`${sd.getFullYear()}-${String(sd.getMonth()+1).padStart(2,'0')}-${String(sd.getDate()).padStart(2,'0')}`;}openReflection(et,btn.dataset.mid,btn.dataset.period,opts);return;}
  if(a==='set-score'){if(window._editingReview){window._editingReview.score=parseInt(btn.dataset.score);document.querySelectorAll('.eval-score-btn').forEach(b=>b.classList.toggle('active',parseInt(b.dataset.score)===window._editingReview.score));}return;}
  if(a==='save-review'){const r=window._editingReview;if(!r)return;const ok=await saveReview(r);if(ok){if(r._new){delete r._new;state.reviews.unshift(r);}else{const i=state.reviews.findIndex(x=>x.id===r.id);if(i>=0)state.reviews[i]={...r};}closeModal();showToast('리뷰 저장됨');render();}return;}
  if(a==='export-excel'){exportExcel();return;}
  if(a==='print-report'){printReport();return;}
  if(a==='open-self-picker'){openSelfPicker();return;}
  if(a==='set-self'){attemptSelfChange(btn.dataset.mid);return;}
  if(a==='cancel-self'){closeModal();return;}
  if(a==='save-pin'){
    const mid=btn.dataset.mid;const p1=document.getElementById('pin-new')?.value||'';const p2=document.getElementById('pin-confirm')?.value||'';const msg=document.getElementById('pin-msg');
    if(!/^[0-9]{4}$/.test(p1)){msg.textContent='4자리 숫자만 입력 가능';return;}
    if(p1!==p2){msg.textContent='두 PIN이 일치하지 않습니다';return;}
    msg.textContent='저장 중...';msg.style.color='var(--text-soft)';
    const ok=await setMemberPin(mid,p1);
    if(ok){setSelfId(mid);setPinAuth(mid);startMemberSession();startObserverLogoutWatcher();closeModal();showToast('PIN 등록 완료');render();refreshHelpBadge();}
    else{msg.style.color='var(--warning)';msg.textContent='저장 실패. 다시 시도하세요';}
    return;
  }
  if(a==='verify-pin'){
    const mid=btn.dataset.mid;const p=document.getElementById('pin-enter')?.value||'';const msg=document.getElementById('pin-msg');
    if(!/^[0-9]{4}$/.test(p)){msg.textContent='4자리 숫자만 입력 가능';return;}
    // 시도 제한 — 5회 실패 시 30분 잠금
    const lockKey='pin-lock-'+mid;const failKey='pin-fail-'+mid;
    const lockUntil=parseInt(localStorage.getItem(lockKey)||'0');
    if(lockUntil>Date.now()){const remain=Math.ceil((lockUntil-Date.now())/60000);msg.textContent=`잠금 상태 — ${remain}분 후 재시도 가능`;return;}
    const ok=await verifyPin(mid,p);
    if(ok){localStorage.removeItem(failKey);localStorage.removeItem(lockKey);setSelfId(mid);setPinAuth(mid);startMemberSession();startObserverLogoutWatcher();closeModal();showToast('인증 완료');render();refreshHelpBadge();}
    else{
      const fails=parseInt(localStorage.getItem(failKey)||'0')+1;
      localStorage.setItem(failKey,String(fails));
      if(fails>=5){localStorage.setItem(lockKey,String(Date.now()+30*60*1000));localStorage.removeItem(failKey);msg.textContent='5회 실패 — 30분 잠금됨';}
      else msg.textContent=`PIN 불일치 (${5-fails}회 남음)`;
      const el=document.getElementById('pin-enter');if(el){el.value='';el.focus();}
    }
    return;
  }
  if(a==='reset-pin'){
    const mid=btn.dataset.mid;const m=state.members.find(x=>x.id===mid);if(!m)return;
    if(!confirm(`${m.name}님의 PIN을 초기화합니다. 다음 진입 시 새 PIN을 등록하게 됩니다. 계속할까요? (관리자 권한이 있는 다른 사람도 본인 데이터에 접근할 수 있게 되니 주의)`))return;
    markLocal('members',mid);
    const{error}=await sb.from('members').update({pin_hash:null}).eq('id',mid);
    if(error){showToast('초기화 실패',true);return;}
    if(m)m.pin_hash=null;clearPinAuth(mid);closeModal();showToast('PIN 초기화됨. 다시 선택해 주세요');setTimeout(()=>openSelfPicker(),300);
    return;
  }
  if(a==='open-help-requests'){openHelpRequests();return;}
  if(a==='ack-help'||a==='ack-help-silent'){
    const date=btn.dataset.date,mid=btn.dataset.mid;
    const resp=a==='ack-help'?(document.getElementById(`ack-resp-${date}-${mid}`)?.value||''):'';
    const ok=await ackHelpRequest(date,mid,resp);
    if(ok){
      // 캐시 즉시 업데이트
      const item=helpRequestsCache.items.find(x=>x.date===date&&x.member_id===mid);
      if(item){item.helper_acknowledged_at=new Date().toISOString();item.helper_response=resp;}
      helpRequestsCache.count=helpRequestsCache.items.filter(it=>!it.helper_acknowledged_at).length;
      await renderHelpRequestsBody();
      // 헤더 종 카운트 갱신
      const oldBell=document.querySelector('.bell-btn');if(oldBell)oldBell.outerHTML=renderHelpBell();
      showToast('확인 처리됨');
    }
    return;
  }
});
document.addEventListener('click',e=>{if(e.target.id==='modal-back')closeModal();});

// ============================================================
// 드래그 재정렬 (v8)
// ============================================================
let dragSrc=null,_dragStartX=null;
document.addEventListener('dragstart',e=>{
  const el=e.target.closest('[draggable="true"]');if(!el||!el.dataset.dragType)return;
  dragSrc=el;el.classList.add('dragging');
  _dragStartX=e.clientX; // v52 — 좌측 드래그 promote 판정용
  e.dataTransfer.effectAllowed='move';try{e.dataTransfer.setData('text/plain',el.dataset.dragType);}catch(err){}
});
function _clearDropTargets(){document.querySelectorAll('.drop-target,.drop-target-before,.drop-target-after,.drop-target-nest,.drop-target-into').forEach(el=>el.classList.remove('drop-target','drop-target-before','drop-target-after','drop-target-nest','drop-target-into'));}
// v47/v50 — 드롭 전 라이브 프리뷰: source를 ghost로, target sub-list에 실제 task 형태 행 표시
// v50 — task→init nest(부모 이동) 케이스도 동일 미리보기
let _nestPreview=null;
function showNestPreview(srcEl,tgtEl){
  const tgtIid=tgtEl.dataset.initId;
  if(_nestPreview&&_nestPreview.tgtIid===tgtIid)return;
  clearNestPreview();
  const srcType=srcEl.dataset.dragType;
  let fakeTask=null;
  if(srcType==='init'){
    const srcIid=srcEl.dataset.initId;
    let srcInit=null;
    (state.objectives||[]).forEach(o=>(o.keyResults||[]).forEach(k=>(k.initiatives||[]).forEach(i=>{
      if(i.id===srcIid)srcInit=i;
    })));
    if(!srcInit)return;
    const ownerIds=(srcInit.ownerId||'').split(',').map(s=>s.trim()).filter(Boolean);
    const ownerId=(ownerIds[0]&&ownerIds[0]!=='__team_all__')?ownerIds[0]:null;
    fakeTask={
      id:'__nest-preview__',
      title:srcInit.title||'',
      status:srcInit.status||'todo',
      owner_id:ownerId,
      start_date:srcInit.startDate||null,
      due_date:srcInit.dueDate||null
    };
  }else if(srcType==='init-task'){
    const srcParent=srcEl.dataset.dragParent;
    const taskId=srcEl.dataset.taskId;
    const task=(state.initiativeTasks[srcParent]||[]).find(t=>t.id===taskId);
    if(!task)return;
    fakeTask={
      id:'__nest-preview__',
      title:task.title||'',
      status:task.status||'todo',
      owner_id:task.owner_id||null,
      start_date:task.start_date||null,
      due_date:task.due_date||null
    };
  }else return;
  // 실제 task 행 HTML 생성 (renderInitSubTaskRow 재사용)
  let html='';
  try{html=renderInitSubTaskRow(tgtIid,fakeTask,false);}catch(_){return;}
  // 대상 sub-list 찾기 (없으면 임시 wrap 생성)
  let subList=tgtEl.querySelector('.init-sub-list');
  let tempWrap=null;
  if(!subList){
    tempWrap=document.createElement('div');
    tempWrap.className='init-sub-list nest-preview-wrap';
    tempWrap.dataset.dropZone='init-sub-list';
    tempWrap.dataset.parentIid=tgtIid;
    tgtEl.appendChild(tempWrap);
    subList=tempWrap;
  }
  const wrapper=document.createElement('div');
  wrapper.innerHTML=html;
  const previewRow=wrapper.firstElementChild;
  if(!previewRow)return;
  previewRow.classList.add('nest-preview-row');
  previewRow.removeAttribute('draggable');
  previewRow.style.pointerEvents='none';
  subList.appendChild(previewRow);
  // source 완전 숨김 (실제 사라진 듯)
  srcEl.classList.add('drag-source-hidden');
  _nestPreview={srcEl,tgtEl,tgtIid,previewRow,tempWrap};
}
function clearNestPreview(){
  if(!_nestPreview)return;
  try{_nestPreview.srcEl.classList.remove('drag-source-hidden');}catch(_){}
  try{_nestPreview.previewRow.remove();}catch(_){}
  if(_nestPreview.tempWrap){try{_nestPreview.tempWrap.remove();}catch(_){}}
  _nestPreview=null;
}
// v29 — 헤더 실제 높이를 CSS 변수로 노출 (date-bar 등 sticky 요소가 정확한 오프셋 사용)
(function(){
  function update(){const h=document.querySelector('header.app-header');if(h)document.documentElement.style.setProperty('--app-header-h',h.offsetHeight+'px');}
  function watch(){
    const h=document.querySelector('header.app-header');
    if(!h){setTimeout(watch,200);return;}
    update();
    if(typeof ResizeObserver!=='undefined'){try{new ResizeObserver(update).observe(h);}catch(_){}}
    window.addEventListener('resize',update);
  }
  if(document.readyState!=='loading')watch();else document.addEventListener('DOMContentLoaded',watch);
})();
document.addEventListener('dragend',e=>{
  if(dragSrc)dragSrc.classList.remove('dragging');
  _clearDropTargets();
  clearNestPreview();
  _lastDropState='';
  _dragStartX=null;
  dragSrc=null;
});
// v48 — zone 계산은 .init-row-main 기준 (preview row가 추가되어도 높이 변하지 않음 → 깜빡임 차단)
function _resolveDragZone(tgt,clientY,src){
  const main=tgt.querySelector(':scope > .init-row-main')||tgt;
  const r=main.getBoundingClientRect();
  const rel=(clientY-r.top)/Math.max(1,r.height);
  // v50 — nest 가능 케이스: init→init (demote), init-task→init (다른 init으로 이동)
  const srcT=src&&src.dataset.dragType;
  const tgtT=tgt.dataset.dragType;
  // v138/v139 — init→init: 가운데 1/3만 '할일 변환'. 헤더 아래는 이동(after)으로.
  //   (이전엔 '헤더 아래=nest'였는데, nest 미리보기가 대상 행을 세로로 키워 커진 박스 기준
  //    nest 영역이 아래로 확장 → 아래로 드래그 시 demote에 갇혀 '이동이 안 되던' 버그.)
  if(srcT==='init'&&tgtT==='init'){
    if(rel>=0.33&&rel<=0.67)return{zone:'nest',rect:r};
    return{zone:rel>0.5?'after':'before',rect:r};
  }
  // init-task→init: 서브리스트 영역(헤더 아래)에 떨어뜨리면 그 init의 할일로 이동(nest)
  if(srcT==='init-task'&&tgtT==='init'){
    const fullBottom=tgt.getBoundingClientRect().bottom;
    if(clientY>r.bottom&&clientY<=fullBottom)return{zone:'nest',rect:r};
    if(rel>=0.33&&rel<=0.67)return{zone:'nest',rect:r};
  }
  return{zone:rel>0.5?'after':'before',rect:r};
}
// v51 — sub-task 행 위로 호버 시 부모 init-row로 재타겟 (할일 영역에 떨어뜨리는 케이스 지원)
function _retargetForNest(tgt,src){
  if(!tgt||!src)return tgt;
  if(tgt.dataset.dragType!=='init-task')return tgt;
  const sameParent=(src.dataset.dragType==='init-task'&&tgt.dataset.dragParent===src.dataset.dragParent);
  if(sameParent)return tgt; // 같은 부모 task끼리 = 정상 reorder
  // 그 외(다른 부모 task, 또는 init source)는 부모 init-row로 재타겟
  const parentInit=tgt.closest('.init-row[data-drag-type="init"]');
  if(!parentInit||parentInit===src)return tgt;
  // src가 init인데 그 init의 자기 자식 task였다면 무효 (자기 자신으로 nest 불가)
  if(src.dataset.dragType==='init'&&parentInit.dataset.initId===src.dataset.initId)return null;
  return parentInit;
}
// v48 — drop 상태 캐시 (불필요한 class toggle 차단)
let _lastDropState='';
document.addEventListener('dragover',e=>{
  if(!dragSrc)return;
  let tgt=e.target.closest('[draggable="true"]');if(!tgt||tgt===dragSrc)return;
  tgt=_retargetForNest(tgt,dragSrc);
  if(!tgt||tgt===dragSrc)return;
  const srcType=dragSrc.dataset.dragType,tgtType=tgt.dataset.dragType;
  const sameType=srcType===tgtType;
  const isPromote=srcType==='init-task'&&tgtType==='init';
  const isInitToKR=srcType==='init'&&tgtType==='kr'; // v137 — 이니셔티브를 KR 행에 직접 드롭 = 그 KR로 이동
  if(!sameType&&!isPromote&&!isInitToKR)return;
  e.preventDefault();
  if(isInitToKR){
    const ns='kr-into:'+tgt.dataset.krId;
    if(ns===_lastDropState)return;
    _lastDropState=ns;_clearDropTargets();clearNestPreview();
    tgt.classList.add('drop-target-nest');
    return;
  }
  const{zone}=_resolveDragZone(tgt,e.clientY,dragSrc);
  // v52/v137 — reorder(before/after)는 같은 부모만. 단 init은 다른 KR로의 before/after = 이동 허용. nest는 KR 가로질러도 허용.
  if(zone!=='nest'&&sameType&&srcType!=='init'&&tgt.dataset.dragParent!==dragSrc.dataset.dragParent)return;
  const newState=tgt.dataset.dragType+':'+(tgt.dataset.initId||tgt.dataset.taskId||tgt.dataset.krId||tgt.dataset.objId||tgt.dataset.memId||'')+':'+zone;
  if(newState===_lastDropState)return; // 변화 없음 → 아무것도 안 함 (깜빡임 차단)
  _lastDropState=newState;
  _clearDropTargets();
  if(zone==='nest'){
    tgt.classList.add('drop-target-nest');
    showNestPreview(dragSrc,tgt);
  }else{
    clearNestPreview();
    tgt.classList.add(zone==='after'?'drop-target-after':'drop-target-before');
  }
});
document.addEventListener('drop',async e=>{
  if(!dragSrc)return;
  const srcType0=dragSrc.dataset.dragType;
  // v52 — task를 제자리에서 좌측으로 드래그하면 부모의 sibling init으로 승격
  if(srcType0==='init-task'&&_dragStartX!=null){
    const dx=e.clientX-_dragStartX;
    const tmpTgt=e.target.closest('[draggable="true"]');
    const noUsefulTgt=!tmpTgt||tmpTgt===dragSrc||tmpTgt.dataset.dragParent===dragSrc.dataset.dragParent;
    if(dx<-50&&noUsefulTgt){
      e.preventDefault();
      const src=dragSrc;dragSrc=null;_lastDropState='';_dragStartX=null;
      _clearDropTargets();clearNestPreview();
      // 부모를 target init으로, after=true → 부모 바로 아래에 sibling init으로 삽입
      await promoteTaskToInit(src.dataset.dragParent,src.dataset.taskId,src.dataset.dragParent,true);
      return;
    }
  }
  let tgt=e.target.closest('[draggable="true"]');if(!tgt||tgt===dragSrc)return;
  tgt=_retargetForNest(tgt,dragSrc);
  if(!tgt||tgt===dragSrc)return;
  const srcType=dragSrc.dataset.dragType,tgtType=tgt.dataset.dragType;
  const sameType=srcType===tgtType;
  const isPromote=srcType==='init-task'&&tgtType==='init';
  const isInitToKR=srcType==='init'&&tgtType==='kr'; // v137
  if(!sameType&&!isPromote&&!isInitToKR)return;
  e.preventDefault();
  if(isInitToKR){
    const src=dragSrc;dragSrc=null;_lastDropState='';
    _clearDropTargets();clearNestPreview();
    await moveInitToKR(src.dataset.dragParent,src.dataset.initId,tgt.dataset.krId,null,true);
    return;
  }
  const{zone}=_resolveDragZone(tgt,e.clientY,dragSrc);
  if(zone!=='nest'&&sameType&&srcType!=='init'&&tgt.dataset.dragParent!==dragSrc.dataset.dragParent)return;
  const after=zone==='after';
  // v44 — Init 가운데 zone = demote-to-task
  if(srcType==='init'&&zone==='nest'){
    const src=dragSrc;dragSrc=null;_lastDropState='';
    _clearDropTargets();clearNestPreview();
    await demoteInitToTask(src.dataset.initId,tgt.dataset.initId,src.dataset.dragParent);
    return;
  }
  // v48 — Task → Init: top/bottom = sibling init으로 promote, middle = 다른 init의 task로 이동
  if(isPromote){
    const src=dragSrc;dragSrc=null;_lastDropState='';
    _clearDropTargets();clearNestPreview();
    if(zone==='nest'){
      await moveTaskToInit(src.dataset.dragParent,src.dataset.taskId,tgt.dataset.initId);
    }else{
      await promoteTaskToInit(src.dataset.dragParent,src.dataset.taskId,tgt.dataset.initId,after);
    }
    return;
  }
  if(srcType==='obj'){await reorderObjectives(dragSrc.dataset.objId,tgt.dataset.objId,after);}
  else if(srcType==='kr'){await reorderKRs(dragSrc.dataset.dragParent,dragSrc.dataset.krId,tgt.dataset.krId,after);}
  else if(srcType==='init'){
    if(dragSrc.dataset.dragParent===tgt.dataset.dragParent){await reorderInits(dragSrc.dataset.dragParent,dragSrc.dataset.initId,tgt.dataset.initId,after);}
    else{await moveInitToKR(dragSrc.dataset.dragParent,dragSrc.dataset.initId,tgt.dataset.dragParent,tgt.dataset.initId,after);} // v137 — 다른 KR의 위/아래에 드롭 = 이동
  }
  else if(srcType==='init-task'){await reorderInitTasks(dragSrc.dataset.dragParent,dragSrc.dataset.taskId,tgt.dataset.taskId,after);}
  else if(srcType==='member'){await reorderMembers(dragSrc.dataset.memId,tgt.dataset.memId,after);}
  _clearDropTargets();
  _lastDropState='';
  dragSrc=null;
});
// v43 — Initiative을 다른 Init의 할일(sub-task)로 변환
async function demoteInitToTask(srcInitId,targetParentIid,sourceKrId){
  let srcInit=null,srcKR=null;
  state.objectives.forEach(o=>o.keyResults.forEach(k=>k.initiatives.forEach(i=>{
    if(i.id===srcInitId){srcInit=i;srcKR=k;}
  })));
  let targetInit=null;
  state.objectives.forEach(o=>o.keyResults.forEach(k=>k.initiatives.forEach(i=>{
    if(i.id===targetParentIid)targetInit=i;
  })));
  if(!srcInit||!targetInit){showToast('변환 대상을 찾을 수 없습니다',true);return;}
  // v49 — confirm 팝업 제거. 즉시 변환, 토스트로만 알림 (실수 시 새로 만들어 복구 가능)
  // 담당자 — 다중이면 첫 번째 사용
  const ownerIds=(srcInit.ownerId||'').split(',').map(s=>s.trim()).filter(Boolean);
  const owner_id=ownerIds[0]&&ownerIds[0]!=='__team_all__'?ownerIds[0]:null;
  // 새 task 생성
  const list=state.initiativeTasks[targetParentIid]||(state.initiativeTasks[targetParentIid]=[]);
  const newTask={
    id:uid(),initiative_id:targetParentIid,
    title:srcInit.title||'',
    status:srcInit.status||'todo',
    owner_id,
    start_date:srcInit.startDate||null,
    due_date:srcInit.dueDate||null,
    sort_order:list.length
  };
  list.push(newTask);
  // src init이 하위 task를 갖고 있다면 새 부모로 이전
  const orphanTasks=state.initiativeTasks[srcInitId]||[];
  if(orphanTasks.length){
    orphanTasks.forEach(t=>{t.initiative_id=targetParentIid;list.push(t);});
    delete state.initiativeTasks[srcInitId];
  }
  // src init 메모리에서 제거
  if(srcKR)srcKR.initiatives=srcKR.initiatives.filter(i=>i.id!==srcInitId);
  scheduleRender();
  // DB 작업
  try{
    if(typeof saveInitiativeTask==='function')saveInitiativeTask(newTask);
    for(const t of orphanTasks){
      markLocal('initiative_tasks',t.id);
      await sb.from('initiative_tasks').update({initiative_id:targetParentIid}).eq('id',t.id);
    }
    markLocal('initiatives',srcInitId);
    const{error}=await sb.from('initiatives').delete().eq('id',srcInitId);
    if(error)showToast('이니셔티브 삭제 실패 — 새로고침 권장',true);
    else showToast('할일로 변환됨'+(orphanTasks.length?` (하위 ${orphanTasks.length}건 같이 이동)`:''));
    logChange('initiative',srcInitId,'delete','demote-to-task',srcInit.title||'',`→ ${targetInit.title||''}의 할일`,srcInit.title||'');
  }catch(err){console.warn('[demote] failed',err);showToast('변환 실패',true);}
}
// v48 — Task를 Initiative로 promote (드래그하여 init 행 위/아래에 떨어뜨림)
async function promoteTaskToInit(srcInitId,taskId,targetInitId,after){
  const list=state.initiativeTasks[srcInitId]||[];
  const task=list.find(t=>t.id===taskId);
  if(!task){showToast('할일을 찾을 수 없습니다',true);return;}
  // target init이 속한 KR 찾기
  let targetKR=null,targetIdx=-1;
  state.objectives.forEach(o=>o.keyResults.forEach(k=>{
    const idx=(k.initiatives||[]).findIndex(i=>i.id===targetInitId);
    if(idx>=0){targetKR=k;targetIdx=idx;}
  }));
  if(!targetKR){showToast('대상 KR을 찾을 수 없습니다',true);return;}
  // v49 — confirm 팝업 제거
  // 새 initiative 생성
  const newInit={
    id:uid(),title:task.title||'',status:task.status||'todo',
    ownerId:task.owner_id||null,startDate:task.start_date||null,dueDate:task.due_date||null,
    confidence:'mid',realityBlocker:'',realityHelp:''
  };
  const insertIdx=after?targetIdx+1:targetIdx;
  targetKR.initiatives.splice(insertIdx,0,newInit);
  // task 제거
  state.initiativeTasks[srcInitId]=list.filter(t=>t.id!==taskId);
  scheduleRender();
  // DB 작업
  try{
    markLocal('initiatives',newInit.id);
    const{error:e1}=await sb.from('initiatives').insert({
      id:newInit.id,kr_id:targetKR.id,title:newInit.title,status:newInit.status,
      owner_id:newInit.ownerId,start_date:newInit.startDate,due_date:newInit.dueDate,
      confidence:'mid',sort_order:insertIdx
    });
    if(e1){showToast('이니셔티브 생성 실패',true);console.warn(e1);return;}
    // 같은 KR의 다른 init들 sort_order 재정렬
    for(let i=0;i<targetKR.initiatives.length;i++){
      if(targetKR.initiatives[i].id!==newInit.id){
        markLocal('initiatives',targetKR.initiatives[i].id);
        await sb.from('initiatives').update({sort_order:i}).eq('id',targetKR.initiatives[i].id);
      }
    }
    // 원래 task 삭제
    markLocal('initiative_tasks',taskId);
    await sb.from('initiative_tasks').delete().eq('id',taskId);
    showToast('이니셔티브로 변환됨');
    logChange('initiative',newInit.id,'create','promote-from-task','',newInit.title,newInit.title);
  }catch(err){console.warn('[promote] failed',err);showToast('변환 실패',true);}
}
// v48 — Task를 다른 Init의 할일로 이동 (부모만 바꿈)
async function moveTaskToInit(srcInitId,taskId,targetInitId){
  if(srcInitId===targetInitId)return;
  const srcList=state.initiativeTasks[srcInitId]||[];
  const task=srcList.find(t=>t.id===taskId);
  if(!task)return;
  state.initiativeTasks[srcInitId]=srcList.filter(t=>t.id!==taskId);
  if(!state.initiativeTasks[targetInitId])state.initiativeTasks[targetInitId]=[];
  task.initiative_id=targetInitId;
  task.sort_order=state.initiativeTasks[targetInitId].length;
  state.initiativeTasks[targetInitId].push(task);
  scheduleRender();
  try{
    markLocal('initiative_tasks',taskId);
    const{error}=await sb.from('initiative_tasks').update({initiative_id:targetInitId,sort_order:task.sort_order}).eq('id',taskId);
    if(error){showToast('이동 실패',true);console.warn(error);}
    else showToast('다른 이니셔티브의 할일로 이동');
  }catch(err){console.warn('[moveTaskToInit] failed',err);}
}
function _reinsert(arr,sIdx,tIdx,after){
  const[item]=arr.splice(sIdx,1);
  let insertIdx=tIdx;
  if(sIdx<tIdx)insertIdx--; // src 제거로 인한 보정
  if(after)insertIdx++;
  arr.splice(insertIdx,0,item);
}
async function reorderObjectives(srcId,tgtId,after){
  const arr=state.objectives;const sIdx=arr.findIndex(o=>o.id===srcId);const tIdx=arr.findIndex(o=>o.id===tgtId);
  if(sIdx<0||tIdx<0)return;
  _reinsert(arr,sIdx,tIdx,after);
  render();
  // sort_order 업데이트
  for(let i=0;i<arr.length;i++){markLocal('objectives',arr[i].id);await sb.from('objectives').update({sort_order:i}).eq('id',arr[i].id);}
  showToast('순서 저장됨');
}
async function reorderKRs(oid,srcId,tgtId,after){
  const o=state.objectives.find(x=>x.id===oid);if(!o)return;
  const sIdx=o.keyResults.findIndex(k=>k.id===srcId);const tIdx=o.keyResults.findIndex(k=>k.id===tgtId);
  if(sIdx<0||tIdx<0)return;
  _reinsert(o.keyResults,sIdx,tIdx,after);
  render();
  for(let i=0;i<o.keyResults.length;i++){markLocal('key_results',o.keyResults[i].id);await sb.from('key_results').update({sort_order:i}).eq('id',o.keyResults[i].id);}
  showToast('순서 저장됨');
}
async function reorderInits(krid,srcId,tgtId,after){
  let kr=null;state.objectives.forEach(o=>o.keyResults.forEach(k=>{if(k.id===krid)kr=k;}));if(!kr)return;
  const sIdx=kr.initiatives.findIndex(i=>i.id===srcId);const tIdx=kr.initiatives.findIndex(i=>i.id===tgtId);
  if(sIdx<0||tIdx<0)return;
  _reinsert(kr.initiatives,sIdx,tIdx,after);
  render();
  for(let i=0;i<kr.initiatives.length;i++){markLocal('initiatives',kr.initiatives[i].id);await sb.from('initiatives').update({sort_order:i}).eq('id',kr.initiatives[i].id);}
  showToast('순서 저장됨');
}
// v137 — 이니셔티브를 다른 KR로 이동 (이니셔티브 그대로 유지, kr_id 변경). tgtId=null이면 맨 끝.
async function moveInitToKR(srcKrId,initId,targetKrId,targetInitId,after){
  if(!srcKrId||!targetKrId||srcKrId===targetKrId&&!targetInitId)return;
  let srcKR=null,targetKR=null;
  state.objectives.forEach(o=>o.keyResults.forEach(k=>{if(k.id===srcKrId)srcKR=k;if(k.id===targetKrId)targetKR=k;}));
  if(!srcKR||!targetKR){showToast('KR을 찾을 수 없습니다',true);return;}
  const sIdx=(srcKR.initiatives||[]).findIndex(i=>i.id===initId);
  if(sIdx<0)return;
  const init=srcKR.initiatives[sIdx];
  if(typeof canEditInit==='function'&&!canEditInit(init)){showToast('본인 담당 또는 관리자만 이동 가능',true);return;}
  if(srcKrId===targetKrId){await reorderInits(srcKrId,initId,targetInitId,after);return;}
  srcKR.initiatives.splice(sIdx,1);
  if(!targetKR.initiatives)targetKR.initiatives=[];
  let tIdx=targetInitId?targetKR.initiatives.findIndex(i=>i.id===targetInitId):-1;
  let insertIdx=tIdx<0?targetKR.initiatives.length:(tIdx+(after?1:0));
  if(insertIdx<0)insertIdx=0;
  targetKR.initiatives.splice(insertIdx,0,init);
  scheduleRender();
  try{
    markLocal('initiatives',init.id);
    const{error}=await sb.from('initiatives').update({kr_id:targetKrId,sort_order:insertIdx}).eq('id',init.id);
    if(error){showToast('이동 저장 실패',true);console.warn('[moveInitToKR]',error);return;}
    for(let i=0;i<targetKR.initiatives.length;i++){markLocal('initiatives',targetKR.initiatives[i].id);await sb.from('initiatives').update({sort_order:i}).eq('id',targetKR.initiatives[i].id);}
    for(let i=0;i<srcKR.initiatives.length;i++){markLocal('initiatives',srcKR.initiatives[i].id);await sb.from('initiatives').update({sort_order:i}).eq('id',srcKR.initiatives[i].id);}
    showToast(`'${(targetKR.title||'KR').slice(0,16)}'(으)로 이동됨`);
    logChange('initiative',init.id,'update','kr_id',srcKR.title||'',targetKR.title||'',init.title||'');
  }catch(err){console.warn('[moveInitToKR] failed',err);showToast('이동 실패',true);}
}
async function reorderInitTasks(initId,srcId,tgtId,after){
  const arr=state.initiativeTasks[initId]||[];
  const sIdx=arr.findIndex(t=>t.id===srcId);const tIdx=arr.findIndex(t=>t.id===tgtId);
  if(sIdx<0||tIdx<0)return;
  _reinsert(arr,sIdx,tIdx,after);
  scheduleRender();
  for(let i=0;i<arr.length;i++){
    arr[i].sort_order=i;
    markLocal('initiative_tasks',arr[i].id);
    try{await sb.from('initiative_tasks').update({sort_order:i}).eq('id',arr[i].id);}catch(_){}
  }
  showToast('할일 순서 저장됨');
}
async function reorderMembers(srcId,tgtId,after){
  const arr=state.members;const sIdx=arr.findIndex(m=>m.id===srcId);const tIdx=arr.findIndex(m=>m.id===tgtId);
  if(sIdx<0||tIdx<0||srcId===tgtId)return;
  _reinsert(arr,sIdx,tIdx,after);
  render();
  for(let i=0;i<arr.length;i++){markLocal('members',arr[i].id);await sb.from('members').update({sort_order:i}).eq('id',arr[i].id);}
  showToast('팀원 순서 저장됨');
}

// 달력 날짜 변경 처리 (input/change 모두에서 호출되도록 함수 분리)
async function handleDateChange(newDate){
  if(!newDate || newDate === viewingDate)return;
  viewingDate = newDate;
  if(!state.standups[newDate] || !state.routineLogs[newDate]){
    dateLoading = true; render();
    try{ await Promise.all([loadStandup(newDate), loadRoutineLogs(newDate)]); }finally{ dateLoading = false; }
  }
  render();
}
// v12 — 발표 모드 키보드 단축 (← → 으로 사람 이동, ESC로 발표 모드 종료)
document.addEventListener('keydown',e=>{
  if(!presentMode||currentView!=='today')return;
  const tag=document.activeElement?.tagName;
  if(tag==='INPUT'||tag==='TEXTAREA'||tag==='SELECT')return; // 입력 중에는 무시
  if(e.key==='ArrowLeft'){document.querySelector('[data-act="present-prev"]')?.click();e.preventDefault();}
  else if(e.key==='ArrowRight'){document.querySelector('[data-act="present-next"]')?.click();e.preventDefault();}
  else if(e.key==='Escape'){presentMode=false;render();e.preventDefault();}
});
document.addEventListener('input',e=>{
  const el=e.target;
  // v13 — 자동 확장 textarea (data-autogrow + data-krl-autogrow 통합)
  // v17 — krl-autogrow는 KR-Link 핸들러가 전담 (중복 reflow 방지). 여기선 data-autogrow만
  if(el.tagName==='TEXTAREA'&&el.dataset.autogrow!==undefined&&el.dataset.krlAutogrow===undefined){el.style.height='auto';el.style.height=(el.scrollHeight+2)+'px';}
  // 달력 즉시 연동 (input 이벤트로도 처리 — Edge/일부 브라우저는 change보다 input이 빠름)
  if(el.dataset.act==='date-set'){handleDateChange(el.value);return;}
  // 검색 인풋 (저장 인디케이터 영향 없는 별도 디바운스)
  if(el.id==='okr-search'){okrSearchQuery=el.value;clearTimeout(window._searchDeb);window._searchDeb=setTimeout(()=>render(),200);return;}
  if(el.id==='refl-search'){reflSearchQuery=el.value;clearTimeout(window._reflSearchDeb);window._reflSearchDeb=setTimeout(()=>render(),200);return;}
  const f=el.dataset.field;if(!f)return;
  if(f==='headline'){saveHeadline(el.dataset.date,el.value);}
  else if(f==='standup'){saveEntry(el.dataset.date,el.dataset.mid,el.dataset.fieldname,el.value);if(el.dataset.fieldname==='blockers')updateBlockerUI(el.dataset.date,el.dataset.mid);}
  else if(f==='team-name'){const t=currentTeam();if(t){const old=t.name;t.name=el.value;saveTeam(t);logChange('team',t.id,'update','name',old,el.value,el.value);updateBrand();}}
  else if(f==='team-quarter'){const t=currentTeam();if(t){const old=t.quarter;t.quarter=el.value;saveTeam(t);logChange('team',t.id,'update','quarter',old,el.value);updateBrand();}}
  else if(f==='member-name'){const m=state.members.find(x=>x.id===el.dataset.mid);if(m){const old=m.name;m.name=el.value;saveMember(m);logChange('member',m.id,'update','name',old,el.value,el.value);}}
  else if(f==='member-role'){const m=state.members.find(x=>x.id===el.dataset.mid);if(m){m.role=el.value;saveMember(m);}}
  else if(f==='member-color'){const m=state.members.find(x=>x.id===el.dataset.mid);if(m){m.color=el.value;saveMember(m);}}
  else if(f==='obj-title'){const o=state.objectives.find(x=>x.id===el.dataset.oid);if(o){const old=o.title;o.title=el.value;saveObjective(o);logChange('objective',o.id,'update','title',old,el.value,el.value);}}
  else if(f==='obj-desc'){const o=state.objectives.find(x=>x.id===el.dataset.oid);if(o){o.description=el.value;saveObjective(o);}}
  else if(f==='obj-start'){const o=state.objectives.find(x=>x.id===el.dataset.oid);if(o){o.startDate=el.value||null;saveObjective(o);}}
  else if(f==='obj-due'){const o=state.objectives.find(x=>x.id===el.dataset.oid);if(o){o.dueDate=el.value||null;saveObjective(o);}}
  else if(f&&f.startsWith('kr-')){const oid=el.dataset.oid,krid=el.dataset.krid;const o=state.objectives.find(x=>x.id===oid);const kr=o?.keyResults.find(k=>k.id===krid);if(!kr)return;if(f==='kr-title'){const old=kr.title;kr.title=el.value;logChange('key_result',krid,'update','title',old,el.value,el.value);}else if(f==='kr-current'){const old=kr.current;kr.current=Number(el.value)||0;logChange('key_result',krid,'update','current',old,kr.current,kr.title);updateKRRowDom(oid,krid);}else if(f==='kr-target'){kr.target=Number(el.value)||0;updateKRRowDom(oid,krid);}else if(f==='kr-unit'){kr.unit=el.value;}else if(f==='kr-due'){const old=kr.dueDate;kr.dueDate=el.value||null;logChange('key_result',krid,'update','due_date',old,el.value,kr.title);}else if(f==='kr-start'){const old=kr.startDate;kr.startDate=el.value||null;logChange('key_result',krid,'update','start_date',old,el.value,kr.title);}saveKR(oid,kr);}
  else if(f&&f.startsWith('init-')){const krid=el.dataset.krid,iid=el.dataset.iid;let init=null;state.objectives.forEach(o=>o.keyResults.forEach(k=>{if(k.id===krid)init=k.initiatives.find(i=>i.id===iid);}));if(!init)return;if(f==='init-title'){const old=init.title;init.title=el.value;logChange('initiative',iid,'update','title',old,el.value,el.value);}else if(f==='init-due'){const old=init.dueDate;init.dueDate=el.value||null;logChange('initiative',iid,'update','due_date',old,el.value,init.title);}else if(f==='init-start'){const old=init.startDate;init.startDate=el.value||null;logChange('initiative',iid,'update','start_date',old,el.value,init.title);}saveInitiative(krid,init);}
  else if(f==='reality-blocker'||f==='reality-help'){const et=el.dataset.etype,eid=el.dataset.eid;const fn=f==='reality-blocker'?'realityBlocker':'realityHelp';if(et==='objective'){const o=state.objectives.find(x=>x.id===eid);if(o){o[fn]=el.value;saveObjective(o);}}else if(et==='kr'){let oid=null,kr=null;state.objectives.forEach(o=>o.keyResults.forEach(k=>{if(k.id===eid){oid=o.id;kr=k;}}));if(kr){kr[fn]=el.value;saveKR(oid,kr);}}else if(et==='initiative'){let krid=null,init=null;state.objectives.forEach(o=>o.keyResults.forEach(k=>k.initiatives.forEach(i=>{if(i.id===eid){krid=k.id;init=i;}})));if(init){init[fn]=el.value;saveInitiative(krid,init);}}}
  else if(f==='rt-title'){const r=state.routines.find(x=>x.id===el.dataset.rid);if(r){r.title=el.value;saveRoutine(r);}}
  else if(f==='rt-day-of-month'){const r=state.routines.find(x=>x.id===el.dataset.rid);if(r){r.day_of_month=parseInt(el.value)||1;saveRoutine(r);}}
  // v30 — Initiative 하위 sub-task 필드
  else if(f==='init-sub-title'){const iid=el.dataset.iid,stid=el.dataset.stid;const t=(state.initiativeTasks[iid]||[]).find(x=>x.id===stid);if(t){t.title=el.value;saveInitiativeTask(t);}}
  else if(f==='wbs-task-title'){const iid=el.dataset.iid,tid=el.dataset.tid;const t=(state.initiativeTasks[iid]||[]).find(x=>x.id===tid);if(t){t.title=el.value;saveInitiativeTask(t);}} /* v137 — WBS 할일 제목 */
  else if(f==='init-sub-due'){const iid=el.dataset.iid,stid=el.dataset.stid;const t=(state.initiativeTasks[iid]||[]).find(x=>x.id===stid);if(t){t.due_date=el.value||null;saveInitiativeTask(t);}}
  else if(f==='init-sub-start'){const iid=el.dataset.iid,stid=el.dataset.stid;const t=(state.initiativeTasks[iid]||[]).find(x=>x.id===stid);if(t){t.start_date=el.value||null;saveInitiativeTask(t);}}
  else if(f==='rt-note'){saveRoutineLog(el.dataset.rid,viewingDate,!!(state.routineLogs[viewingDate]?.[el.dataset.rid]?.completed),el.value);}
  else if(f==='r-summary'){if(window._editingReview)window._editingReview.summary=el.value;}
  else if(f==='r-worked'){if(window._editingReview)window._editingReview.what_worked=el.value;}
  else if(f==='r-struggled'){if(window._editingReview)window._editingReview.what_struggled=el.value;}
  else if(f==='r-learned'){if(window._editingReview)window._editingReview.what_learned=el.value;}
  else if(f==='r-nexttry'){if(window._editingReview)window._editingReview.next_try=el.value;}
  else if(f==='r-reviewer'){if(window._editingReview)window._editingReview.reviewer=el.value;}
  else if(f==='helper-name'){saveEntry(viewingDate,el.dataset.mid,'helper_name',el.value);}
  else if(f==='support-detail'){saveEntry(viewingDate,el.dataset.mid,'support_detail',el.value);}
});

document.addEventListener('change',async e=>{
  const el=e.target;
  // 달력 변경 시 즉시 데이터 연동 (input 이벤트와 동일 함수 사용 — 안전 백업)
  if(el.dataset.act==='date-set'){handleDateChange(el.value);return;}
  // review custom date inputs (use change event)
  if(el.dataset.act==='review-custom'){const which=el.dataset.which;const v=el.value;const cur=window._reviewOpts||{preset:'14',start:null,end:todayKey()};const et=el.dataset.etype||'member';const opts={preset:'custom',start:which==='start'?v:cur.start,end:which==='end'?v:cur.end};openReflection(et,el.dataset.mid,el.dataset.period,opts);return;}
  const f=el.dataset.field;if(!f)return;
  if(f==='kr-owner'){const oid=el.dataset.oid;const kr=state.objectives.find(x=>x.id===oid)?.keyResults.find(k=>k.id===el.dataset.krid);if(kr){kr.ownerId=el.value||null;saveKR(oid,kr);}}
  else if(f==='obj-owner'){const o=state.objectives.find(x=>x.id===el.dataset.oid);if(o){o.ownerId=el.value||null;saveObjective(o);}}
  else if(f==='init-status'){const krid=el.dataset.krid;let init=null;state.objectives.forEach(o=>o.keyResults.forEach(k=>{if(k.id===krid)init=k.initiatives.find(i=>i.id===el.dataset.iid);}));if(init){const old=init.status;init.status=el.value;saveInitiative(krid,init);logChange('initiative',init.id,'update','status',old,el.value,init.title);if(!rerenderInitRowOKR(krid,init.id))render();}}/* v110 — 부분 갱신 */
  else if(f==='init-owner'){const krid=el.dataset.krid;let init=null;state.objectives.forEach(o=>o.keyResults.forEach(k=>{if(k.id===krid)init=k.initiatives.find(i=>i.id===el.dataset.iid);}));if(init){init.ownerId=el.value||null;saveInitiative(krid,init);}}
  else if(f==='rt-frequency'){const r=state.routines.find(x=>x.id===el.dataset.rid);if(r){r.frequency=el.value;if(r.frequency==='weekdays'&&(!r.days_of_week||r.days_of_week.length===0))r.days_of_week=[1,2,3,4,5];saveRoutine(r);render();}}
  else if(f==='rt-owner'){const r=state.routines.find(x=>x.id===el.dataset.rid);if(r){r.owner_id=el.value||null;saveRoutine(r);}}
  // v30 — Initiative 하위 sub-task 담당자
  else if(f==='init-sub-owner'){const iid=el.dataset.iid,stid=el.dataset.stid;const t=(state.initiativeTasks[iid]||[]).find(x=>x.id===stid);if(t){t.owner_id=el.value||null;saveInitiativeTask(t);}}
  else if(f==='wbs-init-kr'){ /* v137 — WBS에서 이니셔티브를 다른 KR로 이동 */
    const iid=el.dataset.iid,curKr=el.dataset.curkr,newKr=el.value;
    if(newKr&&newKr!==curKr)await moveInitToKR(curKr,iid,newKr,null,true);
  }
  // v71 — init-sub-title: blur/Enter 시 즉시 저장 (debounce 타이머 미실행 시 손실 방지)
  else if(f==='init-sub-title'){const iid=el.dataset.iid,stid=el.dataset.stid;const t=(state.initiativeTasks[iid]||[]).find(x=>x.id===stid);if(t){t.title=el.value;saveInitiativeTask(t);}}
  else if(f==='init-sub-status'){const iid=el.dataset.iid,stid=el.dataset.stid;const t=(state.initiativeTasks[iid]||[]).find(x=>x.id===stid);if(t){t.status=el.value;saveInitiativeTask(t);let krid=null;state.objectives.forEach(o=>o.keyResults.forEach(k=>{if((k.initiatives||[]).some(i=>i.id===iid))krid=k.id;}));if(!(krid&&rerenderInitRowOKR(krid,iid)))scheduleRender();}}/* v110 — 부분 갱신 */
  else if(f==='member-color'){const m=state.members.find(x=>x.id===el.dataset.mid);if(m){m.color=el.value;saveMember(m);}}
  else if(f==='helper-member'){saveEntry(viewingDate,el.dataset.mid,'helper_member_id',el.value);}
});

function updateKRRowDom(oid,krid){const o=state.objectives.find(x=>x.id===oid);const kr=o?.keyResults.find(k=>k.id===krid);if(!kr)return;const p=pct(kr.current,kr.target);const col=progressColor(p);
  // v110 — 같은 KR 이 여러 화면(대시보드/OKR 탭)에 동시에 있을 수 있어 전부 갱신
  document.querySelectorAll(`[data-kr-id="${krid}"]`).forEach(row=>{
    const pe=row.querySelector('[data-kr-pct]');if(pe){pe.textContent=p+'%';pe.style.color=col;pe.classList.remove('kr-saved');void pe.offsetWidth;pe.classList.add('kr-saved');}
    const bar=row.querySelector('[data-kr-bar]');if(bar){bar.style.width=p+'%';bar.style.background=col;}
  });
  if(o){const avg=o.keyResults.length?Math.round(o.keyResults.reduce((s,k)=>s+pct(k.current,k.target),0)/o.keyResults.length):0;document.querySelectorAll(`[data-obj-id="${oid}"]`).forEach(oe=>{const av=oe.querySelector('[data-obj-avg]');if(av){av.textContent=avg+'%';av.style.color=progressColor(avg);}});}}
// v110 — OKR 탭 이니셔티브 행만 부분 재렌더 (상태 변경 시 전체 render() 의 스크롤 점프 제거)
function rerenderInitRowOKR(krid,iid){
  const el=document.querySelector('.init-row[data-init-id="'+iid+'"]');
  if(!el)return false;
  let init=null;state.objectives.forEach(o=>o.keyResults.forEach(k=>{if(k.id===krid){const f=(k.initiatives||[]).find(i=>i.id===iid);if(f)init=f;}}));
  if(!init)return false;
  try{const tmp=document.createElement('div');tmp.innerHTML=renderInitiative(krid,init);const nw=tmp.firstElementChild;if(nw){el.replaceWith(nw);return true;}}catch(_){}
  return false;
}
// v110 — KR 진척바 클릭/드래그로 진척 입력 (일상 진척 갱신을 빠르고 직관적으로)
(function(){
  let dragWrap=null,dragOid=null,dragKrid=null,moved=false;
  function findKR(krid){let oid=null,kr=null;state.objectives.forEach(o=>o.keyResults.forEach(k=>{if(k.id===krid){oid=o.id;kr=k;}}));return{oid,kr};}
  function applyAt(wrap,clientX){
    const {oid,kr}=findKR(dragKrid);if(!kr)return;
    const rect=wrap.getBoundingClientRect();if(rect.width<=0)return;
    let frac=(clientX-rect.left)/rect.width;frac=frac<0?0:frac>1?1:frac;
    const target=Number(kr.target)||0;if(target<=0)return;
    const nc=Math.round(frac*target);
    if(nc===Number(kr.current))return;
    kr.current=nc;
    updateKRRowDom(oid,dragKrid);
    document.querySelectorAll('input[data-field="kr-current"][data-krid="'+dragKrid+'"]').forEach(inp=>{if(document.activeElement!==inp)inp.value=nc;});
  }
  document.addEventListener('pointerdown',function(e){
    const wrap=e.target.closest('[data-kr-bar-wrap]');if(!wrap)return;
    if(typeof selfMember==='function'&&!selfMember())return; // 옵저버/미인증은 진척 입력 불가
    const row=wrap.closest('[data-kr-id]');if(!row)return;
    dragKrid=row.dataset.krId;const {oid}=findKR(dragKrid);if(!oid)return;
    dragOid=oid;dragWrap=wrap;moved=false;wrap.classList.add('kr-bar-scrubbing');
    try{wrap.setPointerCapture(e.pointerId);}catch(_){}
    e.preventDefault();
    applyAt(wrap,e.clientX);
  });
  document.addEventListener('pointermove',function(e){if(dragWrap){moved=true;applyAt(dragWrap,e.clientX);}});
  function endDrag(){
    if(!dragWrap)return;
    dragWrap.classList.remove('kr-bar-scrubbing');
    const {oid,kr}=findKR(dragKrid);
    if(kr&&oid){if(typeof logChange==='function')logChange('key_result',dragKrid,'update','current','',kr.current,kr.title);saveKR(oid,kr);}
    dragWrap=null;dragOid=null;dragKrid=null;
  }
  document.addEventListener('pointerup',endDrag);
  document.addEventListener('pointercancel',endDrag);
  // 진척바에서 시작한 드래그가 행 순서변경(HTML5 drag)을 트리거하지 않도록 차단
  document.addEventListener('dragstart',function(e){if(e.target.closest&&e.target.closest('[data-kr-bar-wrap]'))e.preventDefault();},true);
  // 진척 숫자 입력 포커스 시 전체 선택 → 빠른 덮어쓰기
  document.addEventListener('focusin',function(e){const el=e.target;if(el.classList&&el.classList.contains('kr-num-input')){try{el.select();}catch(_){}}});
})();
function updateBrand(){const t=currentTeam();if(!t)return;const tt=document.querySelector('.brand-title');const s=document.querySelector('.brand-sub');if(tt&&tt.firstChild)tt.firstChild.textContent=`${t.name} OKR `;if(s)s.textContent=`${t.quarter} · 일일 스프린트`;const m=document.querySelector('.brand-mark');if(m){m.textContent=teamInitial(t.name);m.style.background=teamColor(t);}}

async function init(){
  const cfg=getConfig();if(!cfg){renderSetup();return;}
  const r=await tryConnect(cfg.url,cfg.key);if(!r.ok){renderSetup('연결 실패: '+r.msg);return;}
  // v16 — 옵저버 모드에서만 DB 쓰기 우회. 일반 모드에선 raw client 그대로 사용 (안전)
  const rawSb=r.client;
  function makeDummyBuilder(){
    const dummyRes={data:null,error:null};
    const handler={get(_,prop){
      if(prop==='then')return (cb)=>Promise.resolve(dummyRes).then(cb);
      if(prop==='catch')return (cb)=>Promise.resolve(dummyRes).catch(cb);
      if(prop==='finally')return (cb)=>Promise.resolve(dummyRes).finally(cb);
      if(prop===Symbol.toPrimitive)return()=>dummyRes;
      // 체인 호환 — 어떤 메서드든 자기 자신을 반환
      return (..._a)=>proxy;
    }};
    const proxy=new Proxy({},handler);
    return proxy;
  }
  sb=new Proxy(rawSb,{get(t,p){
    if(p==='from'){
      return (tbl)=>{
        // 옵저버일 때만 더미 빌더 반환. 그 외엔 raw 그대로
        if(typeof isObserverMode==='function'&&isObserverMode()){
          return makeDummyBuilder();
        }
        return t.from(tbl);
      };
    }
    return t[p];
  }});
  setupRealtime();
  try{
    await initialLoad();
    state.selfId=getSelfId();
    initialized=true;
    // PIN 인증 만료 체크 (24시간)
    if(state.selfId&&state.selfId!=='__observer__'){
      const m=state.members.find(x=>x.id===state.selfId);
      if(m && m.pin_hash && !isPinAuthValid(state.selfId)){
        // 인증 만료 → 다시 본인 인증 필요
        const expiredId=state.selfId;
        state.selfId=null; // 임시 해제
        render();
        setTimeout(()=>openPinVerify(expiredId),300);
      } else if(m && m.pin_hash){
        // 유효 인증 → 세션 시작
        await fetchHelpRequests();
        render();
        startMemberSession();
        startObserverLogoutWatcher();
        // v16 — 관리자라면 옵저버 PIN 자동 부트스트랩 (3962)
        if(m.isAdmin){
          state.members.filter(x=>x.isObserver&&!x.pin_hash).forEach(async ob=>{
            await setMemberPin(ob.id,'3962');
            console.log('[observer] PIN auto-set for',ob.name);
          });
        }
      } else {
        // PIN 미설정 멤버 — 세션 시작 안 함
        await fetchHelpRequests();
        render();
      }
    } else {
      render();
    }
    // 첫 진입 시 본인 식별 모달 (로그인 가드가 보여줌)
    // v119 — 인증 만료 재인증(PIN 모달) 경로에서는 열지 않음: getSelfId()가 남아있으면
    // 위에서 openPinVerify 가 예약돼 있는데, 이 모달이 300ms 뒤 PIN 모달을 덮어쓰는 버그가 있었음
    if(!state.selfId && !getSelfId() && state.members.length>0){setTimeout(()=>openSelfPicker(),300);}
    // 저장 인디케이터 초기 표시
    updateSaveIndicator();
  }catch(e){console.error(e);renderSetup('초기 로드 실패: '+(e.message||e));}
}
init();

// ============================================================
// KR-Link Addon v4 · 일일 스탠드업 "오늘 할 일 / 최근 한 일"을 KR과 직접 연결
// monkey-patch (v9 코드를 손대지 않고 기능 추가)
// 장점:
//  - 할일별 KR 드롭다운 연결 (OKR↔스탠드업 연결고리)
//  - 자동 확장 textarea (입력량 따라 칸 자동 확장)
//  - KR 분포 차트 (오늘 어떤 KR이 활동/방치되는지 한눈에)
//  - 저장 배지, 동적 드롭다운 (KR 늦게 로드되어도 자동 갱신)
// ============================================================
(function(){
  'use strict';
  function escapeHtml(s){if(s==null)return'';return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;').replace(/'/g,'&#39;');}
  function newTaskId(){return't_'+Math.random().toString(36).slice(2,9)+Date.now().toString(36).slice(-3);}
  function getState(){try{if(typeof state!=='undefined'&&state)return state;}catch(e){}try{if(window.state)return window.state;}catch(e){}return null;}
  function getViewingDate(){try{if(typeof viewingDate!=='undefined'&&viewingDate)return viewingDate;}catch(e){}try{if(window.viewingDate)return window.viewingDate;}catch(e){}return null;}
  function parseTasksField(text){
    if(!text)return{legacy:'',tasks:[]};
    const trimmed=String(text).trim();
    if(trimmed.startsWith('{')&&trimmed.indexOf('"_krlv":1')>0){
      try{const p=JSON.parse(trimmed);return{legacy:p.legacy||'',tasks:Array.isArray(p.tasks)?p.tasks:[]};}catch(e){}
    }
    return{legacy:text,tasks:[]};
  }
  function serializeTasks(legacy,tasks){
    const hasTasks=tasks&&tasks.length>0;
    if(!hasTasks&&!legacy)return'';
    if(!hasTasks)return legacy;
    return JSON.stringify({_krlv:1,legacy:legacy||'',tasks});
  }
  function collectAllKR(){
    // v101 — ownerId 등 전체 필드 유지 (v86/renderKRTree 의 owned-init 필터가 동작하려면 필수)
    // v109 — 제목은 원본 그대로 보존 (빈 제목을 placeholder 로 치환하면 가시성 판단(hasTitle)이 오작동)
    //        표시용 placeholder 는 각 렌더 함수에서 (title||'(제목 없는 …)') 로 처리.
    const list=[];const st=getState();if(!st||!st.objectives)return list;
    st.objectives.forEach(o=>{(o.keyResults||[]).forEach(k=>{list.push({id:k.id,title:k.title||'',objTitle:o.title||'(이름 없는 Objective)',ownerId:k.ownerId,startDate:k.startDate,dueDate:k.dueDate,initiatives:(k.initiatives||[]).map(i=>({id:i.id,title:i.title||'',krId:k.id,status:i.status||'todo',ownerId:i.ownerId,startDate:i.startDate,dueDate:i.dueDate,confidence:i.confidence}))});});});
    return list;
  }
  // v15 — Initiative 포함 평탄화된 옵션 목록 (값 prefix로 KR/Init 구분)
  function collectAllInit(){
    const list=[];const st=getState();if(!st||!st.objectives)return list;
    st.objectives.forEach(o=>{(o.keyResults||[]).forEach(k=>{(k.initiatives||[]).forEach(i=>{list.push({id:i.id,title:i.title||'(제목 없는 Initiative)',krId:k.id,krTitle:k.title||'(KR)',objTitle:o.title||'(O)',status:i.status||'todo'});});});});
    return list;
  }
  function getMemberTasks(mid,kind,date){
    const st=getState();const d=date||getViewingDate();
    if(!st||!d||!st.standups||!st.standups[d])return{legacy:'',tasks:[]};
    const e=st.standups[d].entries[mid]||{};
    return parseTasksField(e[kind]||'');
  }
  function updateMemberTasks(mid,kind,legacy,tasks,date){
    const st=getState();const d=date||getViewingDate();
    if(!st||!d)return;
    if(!st.standups[d])st.standups[d]={headline:'',entries:{}};
    if(!st.standups[d].entries[mid]){st.standups[d].entries[mid]={yesterday:'',today:'',blockers:'',helper_member_id:'',helper_name:'',support_type:'',support_detail:''};}
    const text=serializeTasks(legacy,tasks);
    st.standups[d].entries[mid][kind]=text;
    try{saveEntry(d,mid,kind,text);}catch(e){console.warn('[KR-Link] save failed',e);}
    showSaveBadge(mid,kind);
  }
  const badgeTimers=new Map();
  function showSaveBadge(mid,kind){
    const key=mid+':'+kind;
    if(badgeTimers.has(key))clearTimeout(badgeTimers.get(key));
    const headEl=document.querySelector('[data-krl-head="'+mid+':'+kind+'"]');
    if(headEl){
      let badge=headEl.querySelector('.krl-save-badge');
      if(!badge){badge=document.createElement('span');badge.className='krl-save-badge';badge.style.cssText='font-size:11px;color:#30AB62;font-weight:700;background:#E6F6EE;padding:2px 9px;border-radius:999px;margin-right:6px;transition:opacity .4s;flex-shrink:0;';const right=headEl.querySelector('.krl-right');if(right)right.insertBefore(badge,right.firstChild);else headEl.appendChild(badge);}
      badge.textContent='✓ 저장됨';badge.style.opacity='1';
    }
    badgeTimers.set(key,setTimeout(()=>{const h=document.querySelector('[data-krl-head="'+mid+':'+kind+'"]');if(h){const b=h.querySelector('.krl-save-badge');if(b){b.style.opacity='0';setTimeout(()=>{if(b.parentNode)b.parentNode.removeChild(b);},420);}}badgeTimers.delete(key);},2500));
  }
  function autoGrow(el){if(!el)return;el.style.height='auto';el.style.height=(el.scrollHeight+2)+'px';}
  function autoGrowAll(){document.querySelectorAll('textarea[data-krl-autogrow]').forEach(autoGrow);}
  // v15 — selectedId는 "kr:{id}", "init:{id}" 또는 bare {id}(legacy=KR) 형식 지원
  function normalizeSel(selectedId){
    if(!selectedId)return{type:'',id:''};
    const s=String(selectedId);
    if(s.startsWith('kr:'))return{type:'kr',id:s.slice(3)};
    if(s.startsWith('init:'))return{type:'init',id:s.slice(5)};
    return{type:'kr',id:s}; // 레거시 호환
  }
  // v109 — mode: 'task'(할일→이니셔티브 이동: init만 선택 가능), 'group'(이니셔티브→KR 이동: KR만 선택 가능), 'all'(레거시)
  function buildKROptions(selectedId,allKR,mode){
    mode=mode||'all';
    const krDisabled=mode==='task';     // 할일 이동 시 KR 행은 헤더(선택 불가)
    const initDisabled=mode==='group';  // 이니셔티브/그룹 이동 시 init 행은 맥락용(선택 불가)
    const sel=normalizeSel(selectedId);
    // v82 — 운영(KR 무관) 옵션 제거. 모든 할일은 이니셔티브에 속함.
    let html='';
    if(!sel.id)html+='<option value="" disabled selected>'+(mode==='group'?'KR 선택…':'이니셔티브 선택…')+'</option>';
    if(allKR.length===0){
      const st=getState();let msg='— 데이터 로딩 중 —';
      if(!st)msg='⚠ state 접근 불가';
      else if(!st.objectives||st.objectives.length===0)msg='— OKR 탭에서 Objective를 먼저 추가하세요 —';
      else {const withKR=st.objectives.filter(o=>(o.keyResults||[]).length>0);if(withKR.length===0)msg='— 각 Objective에 KR을 추가하세요 —';}
      html+='<option disabled>'+msg+'</option>';
      if(sel.id)html+='<option value="'+escapeHtml(selectedId)+'" selected>● 이전 선택 유지</option>';
      return html;
    }
    const order=[];const groups={};
    allKR.forEach(k=>{const ot=k.objTitle||'(미분류)';if(!groups[ot]){groups[ot]=[];order.push(ot);}groups[ot].push(k);});
    order.forEach(ot=>{
      const label=ot.length>45?ot.slice(0,45)+'…':ot;
      html+='<optgroup label="'+escapeHtml(label)+'">';
      groups[ot].forEach(k=>{
        const ktitle=k.title||'(제목 없는 KR)'; // v109 — collectAllKR 빈 제목 보존 → 표시용 fallback
        const title=ktitle.length>40?ktitle.slice(0,40)+'…':ktitle;
        const krVal='kr:'+k.id;
        const isSel=sel.type==='kr'&&sel.id===k.id;
        // v19 — 헤더 아이콘(h.icon)에서 📌 표시하므로 옵션 텍스트는 이모지 제거 (중복 방지)
        html+='<option value="'+escapeHtml(krVal)+'"'+(isSel?' selected':'')+(krDisabled?' disabled':'')+'>KR · '+escapeHtml(title)+'</option>';
        // Initiative들도 같은 optgroup 안에 자식으로 표시
        (k.initiatives||[]).filter(i=>i.title&&i.title.trim()).forEach(i=>{
          const itTitle=i.title.length>36?i.title.slice(0,36)+'…':i.title;
          const initVal='init:'+i.id;
          const isInitSel=sel.type==='init'&&sel.id===i.id;
          // v19 — 헤더 아이콘(h.icon)에서 ⚡ 표시하므로 옵션 텍스트는 이모지 제거 (중복 방지). 들여쓰기 ↳ 유지
          html+='<option value="'+escapeHtml(initVal)+'"'+(isInitSel?' selected':'')+(initDisabled?' disabled':'')+'>  ↳ '+escapeHtml(itTitle)+'</option>';
        });
      });
      html+='</optgroup>';
    });
    return html;
  }
  // v20 — 댓글 유틸 & 렌더
  function newCommentId(){return'c_'+Math.random().toString(36).slice(2,9)+Date.now().toString(36).slice(-3);}
  function formatCmtTime(ts){
    if(!ts)return'';
    const diff=Date.now()-ts;
    if(diff<60000)return'방금 전';
    if(diff<3600000)return Math.floor(diff/60000)+'분 전';
    if(diff<86400000)return Math.floor(diff/3600000)+'시간 전';
    const d=new Date(ts);
    return(d.getMonth()+1)+'/'+d.getDate()+' '+String(d.getHours()).padStart(2,'0')+':'+String(d.getMinutes()).padStart(2,'0');
  }
  function findTaskRef(mid,kind,tid,date){
    const d=date||getViewingDate();
    const data=getMemberTasks(mid,kind,d);
    return{data,task:(data.tasks||[]).find(x=>x.id===tid),date:d};
  }
  // v105 — 댓글 기능 제거 (사용자 요청). 호출부 안전을 위해 stub 만 남김.
  function renderCommentItem(){return '';}
  function renderCommentsThread(){return '';}
  function rerenderTaskCommentsThread(){}
  // v16 — 그룹화된 작업 행 (KR/Init 칩은 상위 그룹 헤더에 한 번만 표시 → 행 자체는 간결)
  function renderTaskRowGrouped(task,mid,kind){
    const editable=(typeof canEditAs==='function')?canEditAs(mid):true;
    const ro=editable?'':' readonly';
    const dis=editable?'':' disabled';
    const tip=editable?'':' title="본인이 작성한 항목만 수정할 수 있습니다"';
    // v103 — 한 줄일 때 높이 축소 (min-height 60→32). 여러 줄은 autoGrow가 키움
    const textStyle='width:100%;padding:6px 11px;border:1px solid var(--line);border-radius:6px;background:#FAFAFA;outline:none;font-size:13.5px;line-height:1.6;font-family:inherit;color:var(--text);resize:none;overflow:hidden;min-height:32px;box-sizing:border-box;'+(task.d?'text-decoration:line-through;color:var(--text-soft);':'');
    // v29 — 컨텍스트별 placeholder: KR 선택→Init 입력, Init 선택→할일 입력
    let placeholder='할일 내용을 적어주세요';
    if(task.i)placeholder='할일을 적어주세요';
    else if(task.k)placeholder='이니셔티브를 입력하세요';
    // v32 — 상위 KR/Init 정보는 그룹 헤더(renderInitSub/renderKRTree)에 이미 표시되므로
    // task 행에는 별도 칩 표시하지 않음 (중복 제거). 상위 변경이 필요하면 별도 UI로 처리.
    // v26 — 댓글은 토글 없이 행 아래에 바로 표시
    // v105 — 댓글 기능 제거
    return '<div class="krl-task-container" data-task-container="'+task.id+'">'+
      '<div class="krl-task-row" data-tid="'+task.id+'" data-mid="'+mid+'" data-kind="'+kind+'" style="display:flex;align-items:flex-start;gap:6px;padding:6px 0;border-bottom:1px dashed #F0F0F2;">'+
        '<button class="rt-check '+(task.d?'checked':'')+'" style="width:18px;height:18px;border-width:1.5px;border-radius:4px;flex-shrink:0;margin-top:9px;" data-act="krl-toggle-task" data-mid="'+mid+'" data-kind="'+kind+'" data-tid="'+task.id+'"'+dis+tip+'>'+(task.d?'✓':'')+'</button>'+
        '<textarea data-krl-field="task-text" data-krl-autogrow data-mid="'+mid+'" data-kind="'+kind+'" data-tid="'+task.id+'" rows="1" placeholder="'+placeholder+'" style="'+textStyle+'"'+ro+tip+'>'+escapeHtml(task.t||'')+'</textarea>'+
        (editable?'<button data-act="krl-del-task" data-mid="'+mid+'" data-kind="'+kind+'" data-tid="'+task.id+'" style="padding:4px 6px;margin-top:6px;background:none;border:1px solid transparent;border-radius:5px;cursor:pointer;color:var(--text-soft);font-size:12px;flex-shrink:0;line-height:1;" title="이 작업 삭제">✕</button>':'')+
      '</div>'+
    '</div>';
  }
  // 호환성 — 기존 호출은 그룹 헤더가 없는 단독 행 (예: krl-add-task 후 신규 행 추가)
  function renderTaskRowHtml(task,mid,kind){return renderTaskRowGrouped(task,mid,kind);}
  // v16 — KR/Init별로 작업 그룹화
  function groupTasksByLink(tasks){
    const order=[],groups=new Map();
    tasks.forEach(t=>{
      // v19 — KR/Init 미선택 작업은 작업별 독립 그룹(각자 KR 선택기 보장)
      const key=t.i?'init:'+t.i:(t.k?'kr:'+t.k:'task:'+t.id);
      if(!groups.has(key)){groups.set(key,[]);order.push(key);}
      groups.get(key).push(t);
    });
    return{order,groups};
  }
  // v28 — KR > Init > 할일 트리 구조 빌드 (이니셔티브 하위에 할일 묶기)
  function buildTaskTree(tasks){
    const allKR=collectAllKR();
    const krById={};const initToKr={};
    allKR.forEach(k=>{krById[k.id]=k;(k.initiatives||[]).forEach(i=>{initToKr[i.id]=k.id;});});
    // v64 — task ID 맵: task.i가 실제 initiative가 아닌 다른 task(pseudo-init)를 가리킬 수 있음
    const taskById={};tasks.forEach(t=>{taskById[t.id]=t;});
    const tree={krOrder:[],krGroups:{},individualTasks:[]};
    function ensureKR(krId){
      if(!tree.krGroups[krId]){
        tree.krGroups[krId]={krId,kr:krById[krId]||null,directTasks:[],initGroups:{},initOrder:[]};
        tree.krOrder.push(krId);
      }
      return tree.krGroups[krId];
    }
    tasks.forEach(t=>{
      if(t.i){
        const krId=initToKr[t.i]||t.k||'__orphan';
        const g=ensureKR(krId);
        const realInit=g.kr&&(g.kr.initiatives||[]).find(i=>i.id===t.i);
        const pseudoParent=!realInit&&taskById[t.i];
        const initObj=realInit||(pseudoParent?{id:t.i,title:pseudoParent.t||'이니셔티브',isPseudo:true}:{id:t.i,title:'(삭제된 Initiative)'});
        if(!g.initGroups[t.i]){g.initGroups[t.i]={init:initObj,tasks:[]};g.initOrder.push(t.i);}
        g.initGroups[t.i].tasks.push(t);
      }else if(t.k){
        ensureKR(t.k).directTasks.push(t);
      }else{
        tree.individualTasks.push(t);
      }
    });
    return tree;
  }
  // v69 — initiative_tasks를 standup 할일 형식으로 변환 (날짜 필터 포함)
  function buildInitTasksForToday(mid){
    const allKR=collectAllKR();
    const initToKr={};
    allKR.forEach(k=>(k.initiatives||[]).forEach(i=>{initToKr[i.id]=k.id;}));
    const vDate=typeof viewingDate!=='undefined'?viewingDate:todayKey();
    const tasks=[];
    Object.entries(state.initiativeTasks||{}).forEach(([iid,arr])=>{
      (arr||[]).forEach(t=>{
        if(!t.owner_id||t.owner_id===mid){
          const isDone=t.status==='done';
          // 시작일이 없거나 시작일이 오늘 이하인 미완료 → 오늘 할일
          const hasStarted=!t.start_date||t.start_date<=vDate;
          // v141/v142 — 과거(어제 이전) 항목은 '오늘 할 일'에서 제외(→ 최근 한 일).
          //   마감일이 있으면 마감 기준, 없으면(날짜 미입력이 흔함) 작성일(created_at) 기준.
          //   마감 없고 오늘 작성/오늘·미래 마감 항목은 오늘 할일 유지.
          const createdDay=(t.created_at||'').slice(0,10);
          const isPast=t.due_date?(t.due_date<vDate):(createdDay&&createdDay<vDate);
          if(!isDone&&hasStarted&&!isPast){
            // v104 — _dueDate, _startDate 함께 전달 (오늘 탭에서도 날짜 편집 가능)
            tasks.push({id:t.id,t:t.title||'',i:iid,k:initToKr[iid]||'',d:false,_isInitTask:true,_iid:iid,c:[],_dueDate:t.due_date||'',_startDate:t.start_date||''});
          }
        }
      });
    });
    return tasks;
  }
  // v69 — 최근 한 일용: 특정 날짜에 완료된 initiative_tasks
  function buildInitTasksForYesterday(mid,targetDate){
    const allKR=collectAllKR();
    const initToKr={};
    allKR.forEach(k=>(k.initiatives||[]).forEach(i=>{initToKr[i.id]=k.id;}));
    const tasks=[];
    Object.entries(state.initiativeTasks||{}).forEach(([iid,arr])=>{
      (arr||[]).forEach(t=>{
        if((!t.owner_id||t.owner_id===mid)&&t.status==='done'){
          const doneDate=t.updated_at?(t.updated_at.slice?t.updated_at.slice(0,10):''):'';
          if(doneDate===targetDate){
            tasks.push({id:t.id,t:t.title||'',i:iid,k:initToKr[iid]||'',d:true,_isInitTask:true,_iid:iid,c:[]});
          }
        }
      });
    });
    return tasks;
  }
  function renderTaskGroupHead(key){
    let icon='⚪',title='운영 (KR 무관)',bg='#F4F4F5',fg='#737373',border='#E5E5E8';
    if(key.startsWith('kr:')){
      const kr=collectAllKR().find(k=>k.id===key.slice(3));
      if(kr){icon='📌';title=kr.title||'(제목 없는 KR)';bg='#EEEAFE';fg='#6241F5';border='#D9CFFB';}
    }else if(key.startsWith('init:')){
      const init=collectAllInit().find(x=>x.id===key.slice(5));
      if(init){icon='⚡';title=init.title||'(제목 없는 Initiative)';bg='#D9CFFB';fg='#3A2670';border='#B5A0F0';}
    }
    return{icon,title,bg,fg,border};
  }
  // v69/v77 — initiative_tasks 행 렌더링 (카테고리 변경 selector 포함)
  function renderInitTaskRowInline(t,mid,kind){
    const ed=(typeof canEditAs==='function')?canEditAs(mid):true;
    const dis=ed?'':' disabled';const tip=ed?'':' title="본인이 작성한 항목만 수정할 수 있습니다"';
    // v103 — 한 줄일 때 높이 축소 (min-height 60→32)
    const textSt='width:100%;padding:6px 11px;border:1px solid var(--line);border-radius:6px;background:#FAFAFA;outline:none;font-size:13.5px;line-height:1.6;font-family:inherit;color:'+(t.d?'var(--text-soft)':'var(--text)')+';'+(t.d?'text-decoration:line-through;':'')+'resize:none;overflow:hidden;min-height:32px;box-sizing:border-box;';
    // v77 — 카테고리 변경 selector (현재 init: 선택된 상태)
    const allKR=collectAllKR();
    const currentVal='init:'+(t._iid||'');
    const moveSelect=ed?'<span class="krl-task-move" title="이 할일을 다른 이니셔티브로 이동" style="display:inline-flex;align-items:center;flex-shrink:0;margin-top:5px;font-size:10px;color:var(--text-soft);position:relative;">▾<select data-krl-field="init-task-kr" data-mid="'+escapeHtml(mid)+'" data-kind="'+escapeHtml(kind)+'" data-tid="'+escapeHtml(t.id)+'" data-init-id="'+escapeHtml(t._iid||'')+'" style="position:absolute;inset:0;opacity:0;cursor:pointer;">'+buildKROptions(currentVal,allKR,'task')+'</select></span>':'';
    // v105 — From-To 날짜 입력 (시작일, 마감일) — OKR 탭과 동일 개념
    const startVal=t._startDate||'';
    const dueVal=t._dueDate||'';
    const today=(typeof todayKey==='function')?todayKey():'';
    const overdue=dueVal&&dueVal<today&&!t.d;
    const startColor='var(--text-soft)';
    const dueColor=overdue?'#E5343B':'var(--text-soft)';
    const fmtShort=(v)=>v?v.slice(5):'';
    const makeDate=(field,val,colr,placeholder,isOverdue,titleTxt)=>{
      if(!ed)return val?'<span style="font-size:11px;color:'+colr+';margin-top:5px;flex-shrink:0;">'+fmtShort(val)+'</span>':'';
      const labelTxt=val?fmtShort(val):placeholder;
      const borderC=val?colr:'transparent';
      const bg=isOverdue?'background:#FFF1F1;font-weight:700;':'';
      return '<label class="krl-task-date" title="'+titleTxt+'" style="display:inline-flex;align-items:center;gap:2px;flex-shrink:0;margin-top:5px;font-size:11px;color:'+colr+';position:relative;cursor:pointer;padding:2px 5px;border:1px solid '+borderC+';border-radius:4px;'+bg+'"><span style="pointer-events:none;">'+labelTxt+'</span><input type="date" data-krl-field="'+field+'" data-mid="'+escapeHtml(mid)+'" data-kind="'+escapeHtml(kind)+'" data-tid="'+escapeHtml(t.id)+'" data-init-id="'+escapeHtml(t._iid||'')+'" value="'+escapeHtml(val)+'" style="position:absolute;inset:0;opacity:0;cursor:pointer;border:none;padding:0;" /></label>';
    };
    const startInput=makeDate('init-task-start',startVal,startColor,'시작',false,'시작일');
    const dueInput=makeDate('init-task-due',dueVal,dueColor,'마감',overdue,'마감일');
    const arrow=ed&&(startVal||dueVal)?'<span style="font-size:9px;color:var(--text-soft);margin-top:7px;flex-shrink:0;">→</span>':'';
    const dateGroup=ed||startVal||dueVal?'<span style="display:inline-flex;align-items:center;gap:3px;flex-shrink:0;">'+startInput+arrow+dueInput+'</span>':'';
    return '<div class="krl-task-container" data-task-container="'+escapeHtml(t.id)+'">' +
      '<div class="krl-task-row" data-tid="'+escapeHtml(t.id)+'" data-mid="'+escapeHtml(mid)+'" data-kind="'+escapeHtml(kind)+'" style="display:flex;align-items:flex-start;gap:6px;padding:4px 0;border-bottom:1px dashed #F0F0F2;">'+
        '<button class="rt-check '+(t.d?'checked':'')+'" style="width:18px;height:18px;border-width:1.5px;border-radius:4px;flex-shrink:0;margin-top:6px;" data-act="krl-toggle-init-task" data-mid="'+escapeHtml(mid)+'" data-kind="'+escapeHtml(kind)+'" data-tid="'+escapeHtml(t.id)+'" data-init-id="'+escapeHtml(t._iid||'')+'"'+dis+tip+'>'+(t.d?'✓':'')+'</button>'+
        '<textarea data-krl-field="task-text" data-krl-autogrow data-mid="'+escapeHtml(mid)+'" data-kind="'+escapeHtml(kind)+'" data-tid="'+escapeHtml(t.id)+'" data-is-init-task="1" data-init-id="'+escapeHtml(t._iid||'')+'" rows="1" placeholder="할일을 적어주세요" style="'+textSt+'"'+(ed?'':' readonly')+tip+'>'+escapeHtml(t.t||'')+'</textarea>'+
        dateGroup+
        moveSelect+
        (ed?'<button data-act="krl-del-init-task" data-mid="'+escapeHtml(mid)+'" data-kind="'+escapeHtml(kind)+'" data-tid="'+escapeHtml(t.id)+'" data-init-id="'+escapeHtml(t._iid||'')+'" style="padding:2px 5px;margin-top:4px;background:none;border:1px solid transparent;border-radius:5px;cursor:pointer;color:var(--text-soft);font-size:12px;flex-shrink:0;line-height:1;" title="삭제">✕</button>':'')+
      '</div></div>';
  }
  function renderTaskListBlock(mid,kind,label){
    const data=getMemberTasks(mid,kind);
    const legacy=data.legacy;
    // v28 — KR > Init > 할일 트리 구조
    const allKR=collectAllKR();
    // v69/v75 — initiative_tasks 연동 (allKR 선언 후에 사용)
    const vDate=typeof viewingDate!=='undefined'?viewingDate:todayKey();
    const _realInitIds=new Set(allKR.flatMap(k=>(k.initiatives||[]).map(i=>i.id)));
    const tasks=kind==='today'
      ?[...buildInitTasksForToday(mid),...data.tasks]
      :kind==='yesterday'
        ?[...buildInitTasksForYesterday(mid,shiftDate(vDate,-1)),...data.tasks]
        :data.tasks;
    const addLabel=(kind==='today'?'할일 추가':'기록 남기기');
    const editable=(typeof canEditAs==='function')?canEditAs(mid):true;
    const dis=editable?'':' disabled';
    const tip=editable?'':' title="본인이 작성한 항목만 수정할 수 있습니다"';
    const tree=buildTaskTree(tasks);
    // v109 — kind='today': 본인(mid) 담당 이니셔티브는 task가 없어도 항상 표시
    //   조건: 본인 담당 && (제목 있고 미완료 || 방금 생성) → 제목 입력 후에도 절대 사라지지 않음 (핵심 버그 수정)
    if(kind==='today'){
      if(!window._krlJustCreatedInits)window._krlJustCreatedInits=new Set();
      const justSet=window._krlJustCreatedInits;
      const isVisibleOwnedInit=(init)=>{
        const owners=(typeof getInitOwnerIds==='function')?getInitOwnerIds(init):(init.ownerId?String(init.ownerId).split(','):[]);
        const owned=init.ownerId==='__team_all__'||owners.includes(mid);
        if(!owned)return false;
        const hasTitle=!!(init.title&&init.title.trim());
        return justSet.has(init.id)||(hasTitle&&init.status!=='done');
      };
      allKR.forEach(krObj=>{
        const inits=krObj.initiatives||[];
        if(inits.some(isVisibleOwnedInit)&&!tree.krGroups[krObj.id]){
          tree.krGroups[krObj.id]={krId:krObj.id,kr:krObj,directTasks:[],initGroups:{},initOrder:[]};
          tree.krOrder.push(krObj.id);
        }
      });
      // 트리에서 본인 visible-init 목록을 renderKRTree가 쓸 수 있게 저장
      renderTaskListBlock._isVisibleOwnedInit=isVisibleOwnedInit;
    }
    function renderInitSub(ig,krId){
      const init=ig.init;
      const hasTitleSub=!!(init.title&&init.title.trim());
      const title=init.title||'';
      const bg='#D9CFFB',fg='#3A2670',border='#B5A0F0';
      const addBtn=editable?'<button class="krl-add-mini" data-act="krl-add-task-in-init" data-mid="'+mid+'" data-kind="'+kind+'" data-init-id="'+escapeHtml(init.id)+'" data-kr-id="'+escapeHtml(krId)+'" title="이 Initiative에 할일 추가" style="background:transparent;border:1px solid '+fg+';color:'+fg+';border-radius:4px;cursor:pointer;font-size:11px;padding:1px 7px;font-family:inherit;line-height:1;font-weight:800;flex-shrink:0;">＋</button>':'';
      // v34 — 제목 클릭 = 인플레이스 편집 / 우측 ▾ 클릭 = 그룹 이동 (영역 분리)
      const groupKey='init:'+init.id;
      const titleEditable=(typeof canEditInit==='function')?canEditInit(init):editable;
      const titleRo=titleEditable?'':' readonly';
      const titleTip=titleEditable?' title="클릭하여 Initiative 제목 편집"':' title="본인 담당 Initiative 또는 관리자만 수정 가능"';
      // v97 — 빈 제목 init은 placeholder + 강조 테두리로 표시 (값을 비워두어 바로 타이핑 가능)
      const emptyStyle=hasTitleSub?'':' style="background:#FFF7E0;border:2px dashed #E5B340;font-weight:700;color:#3A2670;animation:krl-pulse 1.4s ease-in-out infinite;"';
      const titleInput='<input class="krl-group-title-input" data-field="init-title" data-krid="'+escapeHtml(krId)+'" data-iid="'+escapeHtml(init.id)+'" value="'+escapeHtml(title)+'" placeholder="새 이니셔티브 제목을 입력하세요…"'+titleRo+titleTip+emptyStyle+' />';
      // v109 — 이니셔티브의 상위 KR 변경 (할일이 아니라 이니셔티브 자체를 이동). KR만 선택 가능.
      const moveBtn=editable
        ? '<span class="krl-group-move-btn" title="이 이니셔티브를 다른 KR로 이동">▾<select data-krl-field="group-kr" data-mid="'+mid+'" data-kind="'+kind+'" data-groupkey="'+escapeHtml(groupKey)+'">'+buildKROptions('kr:'+krId,allKR,'group')+'</select></span>'
        : '';
      // v82 — Initiative ✕ 삭제 버튼 (실제 init이고 편집 가능한 경우만)
      const isReal=!init.isPseudo;
      const delInitBtn=editable&&isReal?'<button data-act="krl-del-init" data-iid="'+escapeHtml(init.id)+'" data-krid="'+escapeHtml(krId)+'" title="이 이니셔티브 삭제" style="background:transparent;border:1px solid '+border+';color:'+fg+';border-radius:4px;cursor:pointer;font-size:11px;padding:1px 6px;font-family:inherit;line-height:1;flex-shrink:0;">✕</button>':'';
      const head='<div class="krl-subgroup-head" style="background:'+bg+';color:'+fg+';padding:5px 10px 5px 22px;font-size:11px;font-weight:700;display:flex;align-items:center;gap:6px;border-top:1px solid '+border+';">'+
        '<span style="flex-shrink:0;">⚡</span>'+
        titleInput+
        moveBtn+
        '<span style="font-size:10px;opacity:.75;flex-shrink:0;">'+ig.tasks.length+'건</span>'+
        addBtn+
        delInitBtn+
      '</div>';
      // v69 — _isInitTask 여부에 따라 렌더러 분기
      const rows='<div class="krl-subgroup-tasks" style="padding:2px 10px 2px 22px;">'+
        ig.tasks.map(t=>t._isInitTask?renderInitTaskRowInline(t,mid,kind):renderTaskRowGrouped(t,mid,kind)).join('')+
      '</div>';
      return '<div class="krl-subgroup" data-init-id="'+escapeHtml(init.id)+'">'+head+rows+'</div>';
    }
    // v64 — directTask(KR 직속)를 ⚡ 이니셔티브 헤더 + 하위 할일로 렌더링
    function renderDirectInitRow(t,g){
      const subGroup=g.initGroups[t.id];
      const subTasks=subGroup?subGroup.tasks:[];
      const doneSub=subTasks.filter(s=>s.d).length;
      const ed=(typeof canEditAs==='function')?canEditAs(mid):true;
      const ro=ed?'':' readonly';const dis=ed?'':' disabled';const tip=ed?'':' title="본인이 작성한 항목만 수정할 수 있습니다"';
      const textSt='flex:1;min-width:0;padding:0;border:none;background:transparent;outline:none;font-size:13px;font-weight:600;font-family:inherit;color:'+(t.d?'var(--text-soft)':'#3A2670')+';'+(t.d?'text-decoration:line-through;':'')+'resize:none;overflow:hidden;min-height:20px;line-height:1.4;';
      const subCountHtml=subTasks.length>0?'<span style="font-size:10px;color:#6241F5;font-weight:700;flex-shrink:0;background:#EDE8FB;padding:1px 6px;border-radius:10px;">'+doneSub+'/'+subTasks.length+'</span>':'';
      const addSubBtn=ed?'<button class="krl-add-mini" data-act="krl-add-subtask" data-mid="'+mid+'" data-kind="'+kind+'" data-parent-tid="'+escapeHtml(t.id)+'" data-kr-id="'+escapeHtml(t.k||'')+'" title="하위 할일 추가" style="background:transparent;border:1px solid #B5A0F0;color:#3A2670;border-radius:4px;cursor:pointer;font-size:11px;padding:1px 7px;font-family:inherit;line-height:1;font-weight:800;flex-shrink:0;">＋</button>':'';
      const delBtn=ed?'<button data-act="krl-del-task" data-mid="'+mid+'" data-kind="'+kind+'" data-tid="'+escapeHtml(t.id)+'" style="padding:2px 5px;background:none;border:1px solid transparent;border-radius:4px;cursor:pointer;color:var(--text-soft);font-size:11px;flex-shrink:0;line-height:1;" title="삭제">✕</button>':'';
      // v78 — directTask(KR pseudo)도 카테고리 selector 추가
      const directGroupKey='task:'+t.id;
      const directMoveSel=ed?'<span class="krl-task-move" title="다른 KR/Initiative/운영으로 이동" style="display:inline-flex;align-items:center;flex-shrink:0;margin-top:2px;font-size:10px;color:#3A2670;position:relative;">▾<select data-krl-field="group-kr" data-mid="'+mid+'" data-kind="'+kind+'" data-groupkey="'+escapeHtml(directGroupKey)+'" style="position:absolute;inset:0;opacity:0;cursor:pointer;">'+buildKROptions('kr:'+(t.k||''),allKR)+'</select></span>':'';
      const head='<div class="krl-direct-init-head" style="display:flex;align-items:flex-start;gap:6px;padding:7px 10px;background:#F3F0FD;border-bottom:1px solid #E8E3FA;">'+
        '<button class="rt-check '+(t.d?'checked':'')+'" style="width:16px;height:16px;border-width:1.5px;border-radius:4px;flex-shrink:0;margin-top:2px;" data-act="krl-toggle-task" data-mid="'+mid+'" data-kind="'+kind+'" data-tid="'+escapeHtml(t.id)+'"'+dis+tip+'>'+(t.d?'✓':'')+'</button>'+
        '<span style="flex-shrink:0;font-size:12px;margin-top:2px;">⚡</span>'+
        '<textarea data-krl-field="task-text" data-krl-autogrow data-mid="'+mid+'" data-kind="'+kind+'" data-tid="'+escapeHtml(t.id)+'" rows="1" placeholder="이니셔티브를 입력하세요" style="'+textSt+'"'+ro+tip+'>'+escapeHtml(t.t||'')+'</textarea>'+
        subCountHtml+directMoveSel+addSubBtn+delBtn+
      '</div>';
      const subRows=subTasks.length>0?'<div style="padding:2px 10px 4px 30px;background:#FDFCFF;">'+subTasks.map(st=>renderTaskRowGrouped(st,mid,kind)).join('')+'</div>':'';
      return '<div class="krl-direct-init" data-direct-init-id="'+escapeHtml(t.id)+'">'+head+subRows+'</div>';
    }
    function renderKRTree(g){
      const kr=g.kr;
      const title=kr?(kr.title||'(제목 없는 KR)'):'(삭제된 KR)';
      const bg='#EEEAFE',fg='#6241F5',border='#D9CFFB';
      // v109 — 본인 담당 init은 task 없어도 표시 (제목 있고 미완료 || 방금 생성). 사라짐 버그 근본 수정.
      if(!window._krlJustCreatedInits)window._krlJustCreatedInits=new Set();
      const allKRInits=(kr&&kr.initiatives)||[];
      const visFn=(kind==='today'&&renderTaskListBlock._isVisibleOwnedInit)?renderTaskListBlock._isVisibleOwnedInit:null;
      allKRInits.forEach(init=>{
        if(g.initGroups[init.id])return; // 이미 task 있는 init
        const show=visFn?visFn(init):window._krlJustCreatedInits.has(init.id);
        if(show){
          g.initGroups[init.id]={init,tasks:[]};
          g.initOrder.push(init.id);
        }
      });
      // v64 — total: directTask 자신 + 하위 subtask + real-init tasks
      const directInitIds=new Set(g.directTasks.map(t=>t.id));
      const total=g.directTasks.reduce((s,t)=>{const sub=g.initGroups[t.id];return s+(sub?sub.tasks.length:0)+1;},0)+
        g.initOrder.filter(iid=>!directInitIds.has(iid)).reduce((s,iid)=>s+g.initGroups[iid].tasks.length,0);
      // v82 — KR + 버튼: 실제 Initiative를 DB에 생성 (pseudo task 아님)
      const addBtn=editable?'<button class="krl-add-mini" data-act="krl-add-real-init" data-mid="'+mid+'" data-kind="'+kind+'" data-kr-id="'+escapeHtml(g.krId)+'" title="새 이니셔티브 추가" style="background:transparent;border:1px solid '+fg+';color:'+fg+';border-radius:4px;cursor:pointer;font-size:11px;padding:1px 7px;font-family:inherit;line-height:1;font-weight:800;flex-shrink:0;">＋ 이니셔티브</button>':'';
      const groupKey='kr:'+g.krId;
      let krOid=null;
      if(typeof state!=='undefined'&&state.objectives){
        for(const o of state.objectives){if((o.keyResults||[]).some(k=>k.id===g.krId)){krOid=o.id;break;}}
      }
      const titleEditable=(typeof canEditOKR==='function')?canEditOKR():editable;
      const titleRo=titleEditable?'':' readonly';
      const titleTip=titleEditable?' title="클릭하여 KR 제목 편집"':' title="관리자만 수정 가능"';
      const titleInput='<span style="flex-shrink:0;">KR · </span><input class="krl-group-title-input" data-field="kr-title" data-oid="'+escapeHtml(krOid||'')+'" data-krid="'+escapeHtml(g.krId)+'" value="'+escapeHtml(title)+'"'+titleRo+titleTip+' />';
      const moveBtn=editable
        ? '<span class="krl-group-move-btn" title="이 KR 직속 이니셔티브들을 다른 KR로 이동">▾<select data-krl-field="group-kr" data-mid="'+mid+'" data-kind="'+kind+'" data-groupkey="'+escapeHtml(groupKey)+'">'+buildKROptions(groupKey,allKR,'group')+'</select></span>'
        : '';
      const head='<div class="krl-group-head" style="background:'+bg+';color:'+fg+';padding:6px 10px;font-size:11.5px;font-weight:700;display:flex;align-items:center;gap:6px;">'+
        '<span style="flex-shrink:0;">📌</span>'+
        titleInput+
        moveBtn+
        '<span style="font-size:10px;opacity:.75;flex-shrink:0;">'+total+'건</span>'+
        addBtn+
      '</div>';
      // v64 — directTasks → ⚡ 이니셔티브 행, real initGroups는 별도 렌더
      const directRows=g.directTasks.map(t=>renderDirectInitRow(t,g)).join('');
      const initSubs=g.initOrder.filter(iid=>!directInitIds.has(iid)).map(iid=>renderInitSub(g.initGroups[iid],g.krId)).join('');
      return '<div class="krl-group krl-group-kr" data-kr-id="'+escapeHtml(g.krId)+'" style="margin-bottom:8px;border:1px solid '+border+';border-radius:7px;overflow:hidden;background:white;">'+
        head+directRows+initSubs+
      '</div>';
    }
    function renderIndividual(t){
      // 미선택 task — KR 선택 드롭다운이 있는 단일 그룹
      const key='task:'+t.id;
      const bg='#F4F4F5',fg='#737373',border='#E5E5E8';
      const headInner=editable
        ? '<select data-krl-field="group-kr" data-mid="'+mid+'" data-kind="'+kind+'" data-groupkey="'+escapeHtml(key)+'" title="클릭하여 KR/Initiative 선택" style="flex:1;min-width:0;font-size:11.5px;font-weight:700;background:transparent;color:'+fg+';border:none;outline:none;cursor:pointer;font-family:inherit;-webkit-appearance:none;appearance:none;padding:0;">'+buildKROptions('',allKR)+'</select><span class="krl-group-caret" title="클릭하여 변경" aria-hidden="true">▼</span>'
        : '<span style="flex:1;min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">운영 (KR 무관)</span>';
      return '<div class="krl-group" data-group-key="'+escapeHtml(key)+'" style="margin-bottom:8px;border:1px solid '+border+';border-radius:7px;overflow:hidden;background:white;">'+
        '<div class="krl-group-head'+(editable?' is-interactive':'')+'" style="background:'+bg+';color:'+fg+';padding:6px 10px;font-size:11.5px;font-weight:700;display:flex;align-items:center;gap:6px;">'+
          '<span style="flex-shrink:0;">⚪</span>'+
          headInner+
          '<span style="font-size:10px;opacity:.75;flex-shrink:0;">1건</span>'+
        '</div>'+
        '<div class="krl-group-tasks" style="padding:2px 10px;">'+
          renderTaskRowGrouped(t,mid,kind)+
        '</div>'+
      '</div>';
    }
    // v82 — 운영(KR 무관) 제거: individualTasks 렌더링 안 함
    const groupsHtml=tree.krOrder.map(krId=>renderKRTree(tree.krGroups[krId])).join('');
    // v89/v90 — 비어있을 때 계층 드롭다운: KR > 이니셔티브 선택 OR 새 이니셔티브 등록
    let emptyAddHtml='';
    if(kind==='today'&&tree.krOrder.length===0&&editable){
      if(allKR.length>0){
        // v94 — optgroup으로 KR 묶고, 각 KR 하단 한 곳에만 + 새 이니셔티브 등록
        const tShort=(s,n)=>{const t=String(s||'');return t.length>n?t.slice(0,n)+'…':t;};
        let opts='<option value="" disabled selected hidden style="display:none">+ 할일 추가</option>';
        allKR.forEach(kr=>{
          opts+='<optgroup label="📌 '+escapeHtml(tShort(kr.title||'(KR)',30))+'">';
          (kr.initiatives||[]).filter(i=>i.title&&i.title.trim()).forEach(i=>{
            opts+='<option value="init:'+escapeHtml(i.id)+'">⚡ '+escapeHtml(tShort(i.title,30))+'</option>';
          });
          opts+='<option value="newinit:'+escapeHtml(kr.id)+'">＋ 새 이니셔티브</option>';
          opts+='</optgroup>';
        });
        emptyAddHtml='<div style="padding:20px 12px;text-align:center;"><div style="font-size:12.5px;color:var(--text-soft);margin-bottom:10px;">오늘 할 일이 없습니다.</div><select data-krl-field="empty-add-picker" data-mid="'+escapeHtml(mid)+'" data-kind="'+escapeHtml(kind)+'" style="font-size:12.5px;padding:6px 10px;border:1px solid #D9CFFB;background:#EEEAFE;color:#6241F5;border-radius:6px;cursor:pointer;font-family:inherit;font-weight:700;max-width:100%;width:100%;box-sizing:border-box;">'+opts+'</select></div>';
      }else{
        emptyAddHtml='<div style="padding:20px 12px;text-align:center;font-size:12.5px;color:var(--text-soft);">KR이 없습니다.<br>OKR 탭에서 먼저 Objective와 KR을 추가해주세요.</div>';
      }
    }
    return '<div class="krl-block" data-krl-block="'+mid+':'+kind+'" style="background:#FAFAFB;border:1px solid var(--line);border-radius:8px;padding:10px 12px;margin-top:8px;">'+
      '<div class="krl-block-head" data-krl-head="'+mid+':'+kind+'" style="font-size:12px;color:var(--text-soft);font-weight:600;margin-bottom:6px;display:flex;align-items:center;justify-content:space-between;gap:8px;flex-wrap:wrap;">'+
        (tasks.length>0?'<span style="display:inline-flex;align-items:center;gap:6px;">'+escapeHtml(label)+'<span class="krl-count" style="font-size:11px;color:var(--text-soft);font-weight:600;">'+tasks.length+'건</span></span>':'<span></span>')+
        '<span class="krl-right" style="display:inline-flex;align-items:center;gap:6px;">'+
      '</div>'+
      '<div class="krl-tasks" data-krl-tasks="'+mid+':'+kind+'">'+groupsHtml+emptyAddHtml+'</div>'+
      (legacy?'<div class="krl-legacy" data-krl-legacy="'+mid+':'+kind+'" style="font-size:12.5px;color:var(--text);background:#FFF8E1;border:1px dashed #E5B340;border-radius:6px;padding:8px 10px;margin-top:6px;line-height:1.55;"><div style="font-size:10.5px;font-weight:700;color:#946800;margin-bottom:3px;">기존 평문 메모</div>'+escapeHtml(legacy)+'<br><button data-act="krl-clear-legacy" data-mid="'+mid+'" data-kind="'+kind+'" style="margin-top:5px;font-size:11px;color:#6241F5;background:none;border:none;cursor:pointer;padding:0;font-weight:700;">이 메모 정리 →</button></div>':'')+
      '</div>';
  }
  // v69/v72 — initiative_tasks.status 기반 KR 진척률 자동 계산
  // v72: 디바운스 추가 — 연속 토글 시 500ms 후 1회만 실행 (saveKR 중복 방지)
  let _recalcInitTimer=null;
  function autoRecalcKRFromInitTasks(){
    clearTimeout(_recalcInitTimer);
    _recalcInitTimer=setTimeout(_doRecalcKRFromInitTasks,500);
  }
  function _doRecalcKRFromInitTasks(){
    const allKR=collectAllKR();
    allKR.forEach(kr=>{
      const inits=kr.initiatives||[];
      if(!inits.length)return;
      let totalPct=0,cnt=0;
      inits.forEach(init=>{
        const tasks=state.initiativeTasks[init.id]||[];
        if(!tasks.length)return;
        const done=tasks.filter(t=>t.status==='done').length;
        totalPct+=done/tasks.length*100;
        cnt++;
      });
      if(!cnt)return;
      const avgPct=totalPct/cnt;
      let targetKR=null,targetOid=null;
      (state.objectives||[]).forEach(o=>(o.keyResults||[]).forEach(k=>{if(k.id===kr.id){targetKR=k;targetOid=o.id;}}));
      if(!targetKR||!targetOid)return;
      const newCur=Math.round(avgPct/100*(targetKR.target||100));
      if(newCur===targetKR.current)return;
      targetKR.current=newCur;
      if(typeof updateKRRowDom==='function')updateKRRowDom(targetOid,kr.id);
      if(typeof saveKR==='function')saveKR(targetOid,targetKR);
    });
  }
  // v64 — 할일 완료 상태 → initiative 완료율 → KR current 자동 계산
  function autoRecalcKRFromTasks(){
    const date=viewingDate;
    const standup=state&&state.standups&&state.standups[date];
    if(!standup)return;
    const krAgg={}; // krId -> [{done,total}]
    (state.members||[]).forEach(m=>{
      const entry=(standup.entries||{})[m.id]||{};
      const parsed=parseTasksField(entry.today||'');
      const tasks=parsed.tasks||[];
      const taskById2={};tasks.forEach(t=>{taskById2[t.id]=t;});
      const tree2=buildTaskTree(tasks);
      tree2.krOrder.forEach(krId=>{
        if(!krAgg[krId])krAgg[krId]=[];
        const g2=tree2.krGroups[krId];
        const dIds=new Set(g2.directTasks.map(t=>t.id));
        // directTasks → pseudo-initiative: sub-tasks 있으면 sub 기준, 없으면 자신
        g2.directTasks.forEach(t=>{
          const subG=g2.initGroups[t.id];
          const subs=subG?subG.tasks:[];
          if(subs.length>0){krAgg[krId].push({done:subs.filter(s=>s.d).length,total:subs.length});}
          else{krAgg[krId].push({done:t.d?1:0,total:1});}
        });
        // real initiative groups
        g2.initOrder.filter(iid=>!dIds.has(iid)).forEach(iid=>{
          const ig=g2.initGroups[iid];
          if(ig.tasks.length>0)krAgg[krId].push({done:ig.tasks.filter(t=>t.d).length,total:ig.tasks.length});
        });
      });
    });
    Object.entries(krAgg).forEach(([krId,entries])=>{
      const valid=entries.filter(x=>x.total>0);
      if(!valid.length)return;
      const avgPct=valid.reduce((s,x)=>s+x.done/x.total*100,0)/valid.length;
      let targetKR=null,targetOid=null;
      (state.objectives||[]).forEach(o=>(o.keyResults||[]).forEach(kr=>{if(kr.id===krId){targetKR=kr;targetOid=o.id;}}));
      if(!targetKR||!targetOid)return;
      const newCur=Math.round(avgPct/100*(targetKR.target||100));
      if(newCur===targetKR.current)return;
      targetKR.current=newCur;
      if(typeof updateKRRowDom==='function')updateKRRowDom(targetOid,krId);
      if(typeof saveKR==='function')saveKR(targetOid,targetKR);
    });
  }
  let distributionTimer=null;
  function scheduleDistributionUpdate(){
    // v10 — 분포 비활성. 혹시 DOM에 남아 있으면 자동 제거
    const el=document.querySelector('[data-krl-distribution]');
    if(el)el.remove();
  }
  function renderKRDistributionInner(){
    return ''; // v10 — 사용자 요청으로 KR 분포 차트 비활성화
    /* 아래는 보존(향후 재활성 가능)
    const st=getState();const date=getViewingDate();
    if(!st||!date||!st.standups||!st.standups[date])return '';
    const standup=st.standups[date];
    const allKR=collectAllKR();
    if(allKR.length===0)return '';
    const counts={};allKR.forEach(k=>{counts[k.id]=0;});
    let opsCount=0;
    (st.members||[]).forEach(m=>{
      const idl=(st.initiativeDailyLogs&&st.initiativeDailyLogs[date]&&st.initiativeDailyLogs[date][m.id])||{};
      Object.entries(idl).forEach(entry=>{const iid=entry[0],v=entry[1];if(!v||!v.checked)return;st.objectives.forEach(o=>(o.keyResults||[]).forEach(k=>{if((k.initiatives||[]).some(i=>i.id===iid))counts[k.id]=(counts[k.id]||0)+1;}));});
    });
    (st.members||[]).forEach(m=>{const e=(standup.entries||{})[m.id]||{};['today','yesterday'].forEach(kind=>{const data=parseTasksField(e[kind]||'');data.tasks.forEach(t=>{if(t.k&&counts[t.k]!==undefined)counts[t.k]++;else if(!t.k)opsCount++;});});});
    const total=Object.values(counts).reduce((s,n)=>s+n,0)+opsCount;
    if(total===0)return '';
    const neglected=allKR.filter(k=>counts[k.id]===0);
    let html='<section class="card card-section" data-krl-distribution><div class="section-head"><span style="color:#6241F5;">📊</span><span class="section-title">오늘 KR 분포</span><span class="section-meta">· Initiative 체크 + KR 연결 할일</span></div>';
    html+='<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(150px,1fr));gap:8px;">';
    allKR.forEach(k=>{const c=counts[k.id];const active=c>0;const title=k.title.length>22?k.title.slice(0,22)+'…':k.title;html+='<div style="background:'+(active?'#EEEAFE':'#FAFAFA')+';border-radius:8px;padding:10px 12px;border:1px solid '+(active?'#D9CFFB':'var(--line)')+';"><div style="font-size:11px;color:'+(active?'#6241F5':'var(--text-soft)')+';font-weight:700;margin-bottom:3px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;" title="'+escapeHtml(k.title)+'">'+escapeHtml(title)+'</div><div style="font-size:20px;font-weight:800;color:'+(active?'#26215C':'var(--text-soft)')+';">'+c+'건</div></div>';});
    if(opsCount>0){html+='<div style="background:#FAFAFA;border-radius:8px;padding:10px 12px;border:1px solid var(--line);"><div style="font-size:11px;color:var(--text-soft);font-weight:700;margin-bottom:3px;">운영 (KR 무관)</div><div style="font-size:20px;font-weight:800;color:var(--text);">'+opsCount+'건</div></div>';}
    html+='</div>';
    if(neglected.length>0){html+='<div style="font-size:12px;color:#E5484D;margin-top:10px;line-height:1.55;background:#FCE8E9;padding:9px 12px;border-radius:6px;"><b>⚠ 오늘 활동 0건:</b> '+neglected.map(k=>{const t=k.title.length>20?k.title.slice(0,20)+'…':k.title;return escapeHtml(t);}).join(' · ')+' — 방치 신호</div>';}
    html+='</section>';
    return html;
    */
  }
  function updateCount(mid,kind,n){const head=document.querySelector('[data-krl-head="'+mid+':'+kind+'"]');if(head){const c=head.querySelector('.krl-count');if(c)c.textContent=n+'건';}}
  function applyPatches(){
    if(typeof renderTodaySection!=='function'||typeof renderYesterdaySection!=='function'||typeof renderToday!=='function'){setTimeout(applyPatches,150);return;}
    window.renderTodaySection=function(mid,memo,myInits,checks){
      // v15 — Initiative 표시 제거 (OKR 탭의 완료 체크박스로 이관)
      return '<div class="field"><div class="field-label"><span class="field-dot accent-primary"></span><span class="field-name accent-primary">오늘 할 일</span></div>'+renderTaskListBlock(mid,'today','추가 할일')+'</div>';
    };
    window.renderYesterdaySection=function(mid,memo,yDone){
      const summaryHtml=yDone.length>0
        ? '<div style="display:flex;flex-wrap:wrap;gap:5px;margin-bottom:6px;">'+yDone.map(i=>'<span style="font-size:11.5px;padding:3px 4px 3px 10px;background:var(--growth-soft);color:var(--growth);border-radius:999px;font-weight:600;display:inline-flex;align-items:center;gap:4px;">'+esc(i.title.slice(0,20))+(i.title.length>20?'…':'')+'<button data-act="krl-del-yesterday-check" data-mid="'+mid+'" data-iid="'+(i.id||'')+'" title="이 체크 지우기" style="background:transparent;border:none;cursor:pointer;color:var(--growth);font-size:13px;line-height:1;padding:0 4px;border-radius:999px;opacity:.7;font-weight:700;">✕</button></span>').join('')+'</div>'
        : '';
      const hasAny=yDone.length>0;
      const clearBtn=hasAny?`<button data-act="krl-clear-all-yesterday" data-mid="${mid}" style="background:transparent;border:none;cursor:pointer;color:var(--text-soft);font-size:10.5px;padding:2px 6px;border-radius:5px;font-weight:600;text-decoration:underline;text-underline-offset:2px;" title="어제 체크된 Initiative 해제 + 추가 작업 모두 삭제">모두 비우기</button>`:'';
      // v14 — 과거 7일 "오늘 할 일" 자동 집계 (실제 최근 작성한 내용)
      let recentHtml='';
      try{
        const st=getState();const viewing=getViewingDate();
        if(st&&viewing){
          const allKR=collectAllKR();
          const krMap={};allKR.forEach(k=>{krMap[k.id]=k;});
          const initMap={};collectAllInit().forEach(i=>{initMap[i.id]=i;});
          const recent=[];
          const itAll=(st.initiativeTasks)||{};
          // v112 — 가장 가까운 '오늘 외' 날짜 1건. JSON 스탠드업 + DB initiative_tasks(그 날 작업분) 모두 집계.
          for(let i=1;i<=30;i++){
            const d=window.shiftDate?window.shiftDate(viewing,-i):(()=>{const x=new Date(viewing);x.setDate(x.getDate()-i);return `${x.getFullYear()}-${String(x.getMonth()+1).padStart(2,'0')}-${String(x.getDate()).padStart(2,'0')}`;})();
            const e=st.standups&&st.standups[d]&&st.standups[d].entries&&st.standups[d].entries[mid];
            const parsed=e?parseTasksField(e.today||''):{tasks:[],legacy:''};
            // v88 — 제목이 비어있는 task는 제외
            const nonEmptyTasks=(parsed.tasks||[]).filter(t=>(t.t||'').trim());
            // v142 — 그 날 '작성(입력)'된 DB 할일. 날짜 미입력이 흔하므로 작성일(created_at) 기준으로
            //   분류(없으면 updated_at fallback). 완료 여부와 무관하게 노출(완료는 d 플래그로 체크 표시).
            const dbDay=[];
            Object.keys(itAll).forEach(iid=>{(itAll[iid]||[]).forEach(t=>{
              if(!t.owner_id||t.owner_id===mid){
                const dd=(t.created_at?String(t.created_at).slice(0,10):'')||(t.updated_at?String(t.updated_at).slice(0,10):'');
                if(dd===d&&(t.title||'').trim())dbDay.push({id:t.id,t:t.title||'',i:iid,k:(initMap[iid]&&initMap[iid].krId)||'',d:t.status==='done',_isInitTask:true});
              }
            });});
            const hasLegacy=parsed.legacy&&parsed.legacy.trim();
            if(nonEmptyTasks.length||dbDay.length||hasLegacy){recent.push({date:d,tasks:nonEmptyTasks.concat(dbDay),legacy:parsed.legacy||''});break;}
          }
          if(recent.length>0){
            const fmtDate=window.formatRecentDateLabel||(d=>d);
            // v14 — 담당자(본인) 여부 확인: 본인은 다음 날에도 체크박스 토글 가능
            const ownerEditable=(typeof canEditAs==='function')&&canEditAs(mid);
            recentHtml='<div class="krl-recent" style="margin-bottom:8px;background:#FFFDF2;border:1px solid #F5C76A;border-radius:8px;padding:10px 12px;">'+
              '<div style="font-size:11px;color:#946800;font-weight:700;margin-bottom:8px;letter-spacing:.3px;">📅 직전 작성 내역 (담당자 본인은 ✓ 체크 가능)</div>'+
              recent.map(r=>{
                const dateLabel=fmtDate(r.date);
                // v16 — 날짜 내에서 KR/Init별 그룹화
                const tGroups=new Map();const tOrder=[];
                (r.tasks||[]).forEach(t=>{
                  const key=t.i?'init:'+t.i:(t.k?'kr:'+t.k:'none');
                  if(!tGroups.has(key)){tGroups.set(key,[]);tOrder.push(key);}
                  tGroups.get(key).push(t);
                });
                const groupedTasksHtml=tOrder.map(key=>{
                  const gTasks=tGroups.get(key);
                  // 그룹 헤더
                  let icon='⚪',title='운영 (KR 무관)',bg='#F5F5F6',fg='#737373';
                  if(key.startsWith('init:')){
                    const init=initMap[key.slice(5)];
                    if(init){icon='⚡';title=init.title;bg='#D9CFFB';fg='#3A2670';}
                  }else if(key.startsWith('kr:')){
                    const kr=krMap[key.slice(3)];
                    if(kr){icon='📌';title=kr.title;bg='#EEEAFE';fg='#6241F5';}
                  }
                  const head=`<div style="display:inline-flex;align-items:center;gap:4px;background:${bg};color:${fg};padding:2px 8px;border-radius:999px;font-size:10px;font-weight:700;margin-bottom:3px;"><span>${icon}</span><span style="max-width:200px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;" title="${esc(title)}">${esc(title)}</span><span style="opacity:.7;">${gTasks.length}</span></div>`;
                  const taskItems=gTasks.map(t=>{
                    let checkHtml;
                    if(t._isInitTask){
                      // v121 — DB 할일도 본인/관리자는 체크 토글 가능 (updated_at은 건드리지 않아 날짜 유지)
                      checkHtml=ownerEditable
                        ?'<button class="rt-check '+(t.d?'checked':'')+'" style="width:16px;height:16px;border-width:1.5px;border-radius:4px;flex-shrink:0;margin-top:2px;margin-right:6px;display:inline-flex;align-items:center;justify-content:center;font-size:11px;padding:0;line-height:1;" data-act="recent-toggle-db" data-tid="'+esc(t.id)+'" data-iid="'+esc(t._iid||t.i||'')+'" title="이 작업 완료 토글">'+(t.d?'✓':'')+'</button>'
                        :'<span style="display:inline-block;width:16px;text-align:center;margin-right:4px;color:'+(t.d?'var(--growth)':'var(--text-soft)')+';">'+(t.d?'✓':'•')+'</span>';
                    }else if(ownerEditable){
                      checkHtml='<button class="rt-check '+(t.d?'checked':'')+'" style="width:16px;height:16px;border-width:1.5px;border-radius:4px;flex-shrink:0;margin-top:2px;margin-right:6px;display:inline-flex;align-items:center;justify-content:center;font-size:11px;padding:0;line-height:1;" data-act="recent-toggle-task" data-mid="'+mid+'" data-date="'+r.date+'" data-tid="'+t.id+'" title="이 작업 완료 토글">'+(t.d?'✓':'')+'</button>';
                    }else{
                      checkHtml='<span style="display:inline-block;width:16px;text-align:center;margin-right:4px;color:'+(t.d?'var(--growth)':'var(--text-soft)')+';">'+(t.d?'✓':'•')+'</span>';
                    }
                    // v121 — 행별 삭제 버튼 (본인/관리자)
                    const delHtml=ownerEditable
                      ?'<button style="border:none;background:none;color:var(--text-soft);cursor:pointer;font-size:13px;padding:0 4px;flex-shrink:0;line-height:1.4;" title="이 작업 삭제" data-act="'+(t._isInitTask?'recent-del-db':'recent-del-task')+'" data-tid="'+esc(t.id)+'" data-iid="'+esc(t._iid||t.i||'')+'" data-mid="'+mid+'" data-date="'+r.date+'">✕</button>'
                      :'';
                    // v105 — 댓글 기능 제거
                    return '<div class="recent-task-container" data-task-container="'+t.id+'" data-recent-date="'+r.date+'">'+
                      '<div class="recent-task-row" data-recent-tid="'+t.id+'" data-recent-mid="'+mid+'" data-recent-date="'+r.date+'" style="font-size:12.5px;line-height:1.55;padding:2px 0 2px 8px;display:flex;align-items:flex-start;">'+
                        checkHtml+
                        '<span class="recent-task-text" style="flex:1;color:'+(t.d?'var(--text-soft)':'var(--text)')+';'+(t.d?'text-decoration:line-through;':'')+'">'+esc((t.t||'').slice(0,300))+'</span>'+
                        delHtml+
                      '</div>'+
                    '</div>';
                  }).join('');
                  return `<div style="margin-bottom:6px;">${head}${taskItems}</div>`;
                }).join('');
                const legacyHtml=r.legacy&&r.legacy.trim()?'<div style="font-size:12.5px;color:var(--text);line-height:1.55;padding:2px 0;white-space:pre-wrap;">'+esc(r.legacy)+'</div>':'';
                return '<div style="margin-bottom:10px;padding-bottom:8px;border-bottom:1px dashed #F5E0A8;">'+
                  '<div style="font-size:11px;color:#946800;font-weight:700;margin-bottom:5px;">'+dateLabel+'</div>'+
                  groupedTasksHtml+legacyHtml+
                '</div>';
              }).join('')+
            '</div>';
          }
        }
      }catch(err){console.warn('[recent] render fail',err);}
      // v143 — '최근 한 일'은 상단 '직전 작성 내역' 카드 하나로 통일. 하단 '추가 작업' 박스는
      //   통일감을 해치고 중복 느낌이라 제거(작성 이력 기반 직전 작성 내역으로 충분).
      return '<div class="field"><div class="field-label"><span class="field-dot"></span><span class="field-name">최근 한 일</span>'+(hasAny?'<span style="font-size:10.5px;color:var(--text-soft);margin-left:auto;font-weight:600;">최근 완료 작업</span>':'')+clearBtn+'</div>'+recentHtml+summaryHtml+'</div>';
    };
    const _origRenderToday=window.renderToday;
    window.renderToday=function(){return _origRenderToday.apply(this,arguments);}; // v10 — 분포 차트 호출 제거
    const _origRender=window.render;
    window.render=function(){_origRender.apply(this,arguments);if(window.currentView==='today')setTimeout(autoGrowAll,0);};
    if(typeof render==='function'&&currentView==='today')render();
    console.log('[KR-Link v4] 패치 적용 완료');
  }
  applyPatches();
  // v109 — select 의 용도에 따른 mode 결정 (재생성 시 동일 mode 유지 → 선택 제약 보존)
  function _krlSelMode(sel){
    const f=sel.dataset.krlField;
    if(f==='init-task-kr')return 'task';
    if(f==='group-kr'){
      const gk=sel.dataset.groupkey||'';
      if(gk.startsWith('task:'))return 'all'; // 레거시 directTask 마이그레이션
      return 'group'; // 이니셔티브/KR 그룹 이동 → KR만 선택
    }
    return 'all';
  }
  // 드롭다운 열리는 순간 최신 state로 옵션 재생성 (task-kr 구버전 + group-kr 신버전)
  document.addEventListener('mousedown',function(e){const sel=e.target.closest('select[data-krl-field="task-kr"],select[data-krl-field="group-kr"],select[data-krl-field="init-task-kr"]');if(!sel)return;const cur=sel.value;sel.innerHTML=buildKROptions(cur,collectAllKR(),_krlSelMode(sel));},true);
  document.addEventListener('focusin',function(e){const sel=e.target;if(sel.tagName!=='SELECT'||(sel.dataset.krlField!=='task-kr'&&sel.dataset.krlField!=='group-kr'&&sel.dataset.krlField!=='init-task-kr'))return;sel.innerHTML=buildKROptions(sel.value,collectAllKR(),_krlSelMode(sel));},true);
  // v18 — 그룹 헤더 어디를 눌러도 KR/Initiative 드롭다운 열기 (운영 그룹 = renderIndividual용)
  // v34 — KR/Init 그룹은 제목 input + 별도 ▾ 이동 칩으로 분리되어 이 핸들러 적용 안 됨
  document.addEventListener('click',function(e){
    const head=e.target.closest('.krl-group-head.is-interactive');
    if(!head)return;
    if(e.target.closest('select[data-krl-field="group-kr"]'))return; // select 자체 클릭은 브라우저 기본 동작
    if(e.target.closest('[data-act]'))return; // + 버튼 등 다른 액션은 자기 핸들러로
    const sel=head.querySelector('select[data-krl-field="group-kr"]');
    if(!sel||sel.disabled)return;
    try{sel.innerHTML=buildKROptions(sel.value,collectAllKR(),_krlSelMode(sel));}catch(_){}
    if(typeof sel.showPicker==='function'){
      try{sel.focus();sel.showPicker();return;}catch(_){}
    }
    sel.focus();
  });
  document.addEventListener('click',function(e){
    const btn=e.target.closest('[data-act]');if(!btn)return;
    const a=btn.dataset.act;
    if(a==='krl-del-yesterday-check'){
      // 어제 체크된 Initiative의 체크 해제 (자동 요약 칩에서 X 클릭)
      const mid=btn.dataset.mid;const iid=btn.dataset.iid;
      if(!iid){return;}
      try{
        const yDate=shiftDate(getViewingDate(),-1);
        saveInitiativeDailyLog(iid,mid,yDate,false);
        // 즉시 UI에서 칩 제거
        const sp=btn.closest('span');if(sp)sp.remove();
        scheduleDistributionUpdate();
      }catch(err){console.warn('[KR-Link] del-yesterday-check failed',err);}
      return;
    }
    if(a==='krl-clear-all-yesterday'){
      // 어제 체크된 Initiative 모두 해제 + 추가 작업 모두 삭제
      const mid=btn.dataset.mid;
      if(!confirm('이 팀원의 "최근 한 일"을 모두 비울까요? (어제 체크된 Initiative 해제 + 추가 작업 삭제)'))return;
      try{
        const yDate=shiftDate(getViewingDate(),-1);
        const yChecks=(getState().initiativeDailyLogs[yDate]&&getState().initiativeDailyLogs[yDate][mid])||{};
        Object.entries(yChecks).forEach(([iid,v])=>{if(v&&v.checked)saveInitiativeDailyLog(iid,mid,yDate,false);});
        // 추가 작업도 비움 (legacy도 함께)
        updateMemberTasks(mid,'yesterday','',[]);
        // 즉시 재렌더
        if(typeof render==='function')render();
      }catch(err){console.warn('[KR-Link] clear-all-yesterday failed',err);}
      return;
    }
    // v105 — 댓글 기능 제거 (cmt-submit/cmt-edit/cmt-del 핸들러 삭제)
    // v82 — KR 헤더의 "+ 이니셔티브" 버튼: 실제 Initiative를 DB에 신규 생성
    if(a==='krl-add-real-init'){
      const mid=btn.dataset.mid,kind=btn.dataset.kind,krId=btn.dataset.krId;
      if(!krId){showToast('KR 정보 없음',true);return;}
      // KR을 state에서 찾기
      let targetKR=null;
      (state.objectives||[]).forEach(o=>(o.keyResults||[]).forEach(k=>{if(k.id===krId)targetKR=k;}));
      if(!targetKR){showToast('KR을 찾을 수 없음',true);return;}
      const newId=(typeof uid==='function'?uid():('i_'+Math.random().toString(36).slice(2,10)));
      // v92 — ownerId는 카드 담당자(mid). 관리자가 다른 카드에서 추가해도 그 사람 거가 됨
      const newInit={id:newId,title:'',ownerId:mid||state.selfId||null,status:'todo',dueDate:null,confidence:'mid',realityBlocker:'',realityHelp:''};
      if(!targetKR.initiatives)targetKR.initiatives=[];
      targetKR.initiatives.push(newInit);
      // v93 — 방금 만든 빈 init임을 표시 (제목 채우면 자동 해제됨)
      if(!window._krlJustCreatedInits)window._krlJustCreatedInits=new Set();
      window._krlJustCreatedInits.add(newId);
      if(typeof saveInitiative==='function')saveInitiative(krId,newInit);
      rerenderTaskBlock(mid,kind);
      // 새 이니셔티브 제목 input에 포커스
      setTimeout(()=>{const inp=document.querySelector('input[data-field="init-title"][data-iid="'+newId+'"]');if(inp)inp.focus();},80);
      return;
    }
    // v98/v99 — 새 이니셔티브 인라인 폼 저장
    if(a==='newinit-save'){
      const krId=btn.dataset.krId,mid=btn.dataset.mid,kind=btn.dataset.kind;
      const form=btn.parentElement;
      const wrap=form&&form.parentElement; // picker를 감싸는 div
      const inp=form&&form.querySelector('input[data-krl-field="newinit-title-pending"]');
      const title=(inp&&inp.value||'').trim();
      if(!title){if(inp){inp.focus();inp.style.borderColor='#E5343B';}showToast('제목을 입력하세요',true);return;}
      let targetKR=null;
      (state.objectives||[]).forEach(o=>(o.keyResults||[]).forEach(k=>{if(k.id===krId)targetKR=k;}));
      if(!targetKR){showToast('KR을 찾을 수 없음',true);return;}
      const newId=(typeof uid==='function'?uid():('i_'+Math.random().toString(36).slice(2,10)));
      const newInit={id:newId,title:title,ownerId:mid||state.selfId||null,status:'todo',dueDate:null,confidence:'mid',realityBlocker:'',realityHelp:''};
      if(!targetKR.initiatives)targetKR.initiatives=[];
      targetKR.initiatives.push(newInit);
      // v99 — JustCreated 셋에 추가해 빈 init도 보장 표시
      if(!window._krlJustCreatedInits)window._krlJustCreatedInits=new Set();
      window._krlJustCreatedInits.add(newId);
      if(typeof saveInitiative==='function')saveInitiative(krId,newInit);
      if(typeof showToast==='function')showToast('이니셔티브 등록 완료');
      // v103 — 정식 트리(normal KR tree)에 동일한 비주얼로 즉시 노출
      //   v86 force-add는 justCreated init만 띄우므로, set 에 추가된 새 init이 KR 그룹과 함께 정상 표시됨
      //   별도 폴백카드 없음 → 입력 화면과 완료 화면의 비주얼이 동일
      rerenderTaskBlock(mid,kind);
      requestAnimationFrame(()=>requestAnimationFrame(()=>{
        const okEl=document.querySelector('[data-krl-block="'+mid+':'+kind+'"] [data-init-id="'+newId+'"]');
        if(okEl){
          // 새 init 헤더의 + 버튼(할일 추가)에 시각적 강조
          const addBtn=okEl.querySelector('[data-act="krl-add-task-in-init"]');
          if(addBtn){addBtn.scrollIntoView({block:'nearest',behavior:'smooth'});addBtn.style.boxShadow='0 0 0 3px rgba(98,65,245,.3)';setTimeout(()=>{addBtn.style.boxShadow='';},1200);}
        }
      }));
      return;
    }
    // v99/v100 — 성공 상태 카드의 + 할일 추가
    if(a==='newinit-add-task'){
      const initId=btn.dataset.initId,mid=btn.dataset.mid,kind=btn.dataset.kind;
      const newT={id:newTaskId(),initiative_id:initId,title:'',status:'todo',owner_id:mid||null,start_date:null,due_date:null,sort_order:(state.initiativeTasks[initId]||[]).length};
      if(!state.initiativeTasks[initId])state.initiativeTasks[initId]=[];
      state.initiativeTasks[initId].push(newT);
      if(typeof saveInitiativeTask==='function')saveInitiativeTask(newT);
      // 이제 정상 트리로 전환 (task가 생겼으니 v86 + tasks 기반 트리 모두 표시)
      rerenderTaskBlock(mid,kind);
      setTimeout(()=>{const ta=document.querySelector('textarea[data-krl-field="task-text"][data-tid="'+newT.id+'"]');if(ta){ta.focus();autoGrow(ta);}},80);
      return;
    }
    // v98 — 새 이니셔티브 인라인 폼 취소 (picker 복원)
    if(a==='newinit-cancel'){
      const mid=btn.dataset.mid,kind=btn.dataset.kind;
      rerenderTaskBlock(mid,kind);
      return;
    }
    // v82 — Initiative 삭제 (오늘 할 일 화면에서)
    if(a==='krl-del-init'){
      const iid=btn.dataset.iid,krid=btn.dataset.krid;
      const tasksUnder=(state.initiativeTasks[iid]||[]).length;
      const confirmMsg=tasksUnder>0?`이 이니셔티브와 하위 할일 ${tasksUnder}건을 모두 삭제할까요?`:'이 이니셔티브를 삭제할까요?';
      if(!confirm(confirmMsg))return;
      // 1. 하위 init_tasks DB 삭제
      (state.initiativeTasks[iid]||[]).forEach(t=>{if(typeof deleteInitiativeTask==='function')deleteInitiativeTask(t.id);});
      delete state.initiativeTasks[iid];
      // 2. state에서 initiative 제거
      (state.objectives||[]).forEach(o=>(o.keyResults||[]).forEach(k=>{if(k.id===krid){k.initiatives=(k.initiatives||[]).filter(i=>i.id!==iid);}}));
      // 3. DB에서 initiative 삭제
      if(typeof sb!=='undefined'){sb.from('initiatives').delete().eq('id',iid).then(()=>{});}
      render();
      return;
    }
    // v28 — KR/Init 헤더 ＋ 버튼: 그 KR/Init에 직접 묶이는 할일을 즉시 추가
    if(a==='krl-add-task-in-kr'||a==='krl-add-task-in-init'){
      const mid=btn.dataset.mid,kind=btn.dataset.kind;
      const krId=btn.dataset.krId||'';
      const initId=a==='krl-add-task-in-init'?(btn.dataset.initId||''):'';
      // v103 — 다른 task 입력값 손실 방지: 재렌더 전에 모든 textarea 값 state에 강제 반영
      flushTaskInputs(mid,kind);
      // v69 — 실제 initiative이면 initiative_tasks 테이블에 추가
      const isRealInit=initId&&(typeof collectAllInit==='function')&&!!collectAllInit().find(x=>x.id===initId);
      if(isRealInit&&kind==='today'){
        // v74 — owner_id = mid (카드 담당자), selfId(관리자) 아님 → 담당자가 편집 가능
        const newT={id:newTaskId(),initiative_id:initId,title:'',status:'todo',owner_id:mid||null,start_date:null,due_date:null,sort_order:(state.initiativeTasks[initId]||[]).length};
        if(!state.initiativeTasks[initId])state.initiativeTasks[initId]=[];
        state.initiativeTasks[initId].push(newT);
        if(typeof saveInitiativeTask==='function')saveInitiativeTask(newT);
        rerenderTaskBlock(mid,kind);
        setTimeout(()=>{const ta=document.querySelector('textarea[data-krl-field="task-text"][data-tid="'+newT.id+'"]');if(ta){ta.focus();autoGrow(ta);}},50);
        return;
      }
      const data=getMemberTasks(mid,kind);
      const newTask={id:newTaskId(),t:'',k:krId,i:initId,d:false};
      data.tasks.push(newTask);
      updateMemberTasks(mid,kind,data.legacy,data.tasks);
      rerenderTaskBlock(mid,kind);
      setTimeout(()=>{const ta=document.querySelector('textarea[data-krl-field="task-text"][data-tid="'+newTask.id+'"]');if(ta){ta.focus();autoGrow(ta);}},0);
      scheduleDistributionUpdate();
      return;
    }
    if(a!=='krl-add-task'&&a!=='krl-toggle-task'&&a!=='krl-del-task'&&a!=='krl-clear-legacy'&&a!=='krl-add-subtask'&&a!=='krl-toggle-init-task'&&a!=='krl-del-init-task')return;
    const mid=btn.dataset.mid,kind=btn.dataset.kind,tid=btn.dataset.tid;
    const data=getMemberTasks(mid,kind);
    if(a==='krl-add-task'){
      flushTaskInputs(mid,kind); // v103
      const newTask={id:newTaskId(),t:'',k:'',d:false};
      data.tasks.push(newTask);
      updateMemberTasks(mid,kind,data.legacy,data.tasks);
      rerenderTaskBlock(mid,kind);
      setTimeout(()=>{
        const ta=document.querySelector('textarea[data-krl-field="task-text"][data-tid="'+newTask.id+'"]');
        if(ta){ta.focus();autoGrow(ta);}
      },0);
      scheduleDistributionUpdate();
    }
    else if(a==='krl-toggle-task'){
      const t=data.tasks.find(x=>x.id===tid);if(!t)return;
      t.d=!t.d;updateMemberTasks(mid,kind,data.legacy,data.tasks);
      // 이니셔티브 행(direct-init-head) 체크 UI 업데이트
      const initHead=document.querySelector('.krl-direct-init-head [data-tid="'+tid+'"]');
      if(initHead){const ch=initHead.closest('.krl-direct-init-head');if(ch){const ck=ch.querySelector('.rt-check');if(ck){ck.classList.toggle('checked',t.d);ck.innerHTML=t.d?'✓':'';}const ta=ch.querySelector('textarea');if(ta){ta.style.color=t.d?'var(--text-soft)':'#3A2670';ta.style.textDecoration=t.d?'line-through':'';}}}
      // 일반 task 행 체크 UI 업데이트
      const row=document.querySelector('.krl-task-row[data-tid="'+tid+'"][data-mid="'+mid+'"][data-kind="'+kind+'"]');
      if(row){const check=row.querySelector('.rt-check');if(check){check.classList.toggle('checked',t.d);check.innerHTML=t.d?'✓':'';}const ta=row.querySelector('textarea[data-krl-field="task-text"]');if(ta){ta.style.textDecoration=t.d?'line-through':'';ta.style.color=t.d?'var(--text-soft)':'var(--text)';}}
      // v64 — 완료 상태 변경 시 KR 진척률 자동 재계산
      autoRecalcKRFromTasks();
      scheduleDistributionUpdate();
    }
    // v64 — 이니셔티브 하위 할일 추가
    else if(a==='krl-add-subtask'){
      const parentTid=btn.dataset.parentTid;
      const krId=btn.dataset.krId||'';
      if(!parentTid)return;
      const newTask={id:newTaskId(),t:'',d:false,k:krId,i:parentTid,c:[]};
      data.tasks.push(newTask);
      updateMemberTasks(mid,kind,data.legacy,data.tasks);
      rerenderTaskBlock(mid,kind);
      updateCount(mid,kind,data.tasks.length);
      setTimeout(()=>{const ta=document.querySelector('textarea[data-krl-field="task-text"][data-tid="'+newTask.id+'"]');if(ta){ta.focus();autoGrow(ta);}},50);
    }
    else if(a==='krl-del-task'){
      const next=data.tasks.filter(x=>x.id!==tid);
      updateMemberTasks(mid,kind,data.legacy,next);
      // v18 — 그룹의 마지막 작업이 삭제되면 KR 선택 헤더(빈 그룹)도 함께 사라지도록 블록 전체 재렌더
      rerenderTaskBlock(mid,kind);
      updateCount(mid,kind,next.length);
      scheduleDistributionUpdate();
    }
    else if(a==='krl-clear-legacy'){
      if(!confirm('기존 평문 메모를 비울까요? (구조화된 할일 목록만 남깁니다)'))return;
      updateMemberTasks(mid,kind,'',data.tasks);
      const legacyEl=document.querySelector('[data-krl-legacy="'+mid+':'+kind+'"]');
      if(legacyEl)legacyEl.remove();
    }
    // v69 — initiative_tasks 체크 토글
    else if(a==='krl-toggle-init-task'){
      const initId=btn.dataset.initId;
      const arr=state.initiativeTasks[initId]||[];
      const t=arr.find(x=>x.id===tid);if(!t)return;
      t.status=t.status==='done'?'todo':'done';
      if(typeof saveInitiativeTask==='function')saveInitiativeTask(t);
      // DOM 즉시 업데이트
      const row=document.querySelector('.krl-task-row[data-tid="'+tid+'"]');
      if(row){const ck=row.querySelector('.rt-check');if(ck){ck.classList.toggle('checked',t.status==='done');ck.innerHTML=t.status==='done'?'✓':'';}const ta=row.querySelector('textarea');if(ta){ta.style.textDecoration=t.status==='done'?'line-through':'';ta.style.color=t.status==='done'?'var(--text-soft)':'var(--text)';}}
      autoRecalcKRFromInitTasks();
    }
    // v69 — initiative_tasks 삭제
    else if(a==='krl-del-init-task'){
      const initId=btn.dataset.initId;
      if(state.initiativeTasks[initId]){state.initiativeTasks[initId]=state.initiativeTasks[initId].filter(x=>x.id!==tid);}
      if(typeof deleteInitiativeTask==='function')deleteInitiativeTask(tid);
      rerenderTaskBlock(mid,kind);
    }
  });
  // v26 — 댓글 textarea: Enter=저장, Alt+Enter=줄바꿈
  document.addEventListener('keydown',function(e){
    const el=e.target;
    if(!el||el.tagName!=='TEXTAREA')return;
    if(e.key!=='Enter'||e.shiftKey||e.isComposing||e.keyCode===229)return; // 한글 IME 조합 중 무시
    if(e.altKey)return; // Alt+Enter → 기본 동작(줄바꿈)
    // v98 — 새 이니셔티브 인라인 폼: Enter → 저장 버튼 클릭
    if(el.dataset&&el.dataset.krlField==='newinit-title-pending'){
      e.preventDefault();
      const wrap=el.parentElement;
      const sav=wrap&&wrap.querySelector('[data-act="newinit-save"]');
      if(sav)sav.click();
      return;
    }
    // v103 — 할일 textarea: Enter = 저장 완료(blur). Shift+Enter / Alt+Enter 는 줄바꿈
    if(el.dataset&&el.dataset.krlField==='task-text'){
      e.preventDefault();
      // input 이벤트로 이미 state 반영 + debouncedSave 가 진행. blur 로 명시적 완료 처리.
      el.blur();
    }
  });
  document.addEventListener('input',function(e){
    const el=e.target;
    // v105 — 댓글 기능 제거 (krl-cmt-input 자동 확장 분기 삭제)
    if(el.dataset.krlField!=='task-text')return;
    autoGrow(el);
    const mid=el.dataset.mid,kind=el.dataset.kind,tid=el.dataset.tid;
    // v69 — initiative_tasks textarea 저장
    if(el.dataset.isInitTask==='1'){
      const initId=el.dataset.initId;
      const arr=state.initiativeTasks[initId]||[];
      const t=arr.find(x=>x.id===tid);
      if(t&&typeof saveInitiativeTask==='function'){t.title=el.value;saveInitiativeTask(t);}
      return;
    }
    const data=getMemberTasks(mid,kind);
    const t=data.tasks.find(x=>x.id===tid);
    if(t){t.t=el.value;updateMemberTasks(mid,kind,data.legacy,data.tasks);}
  });
  // val("kr:..","init:..","" 또는 레거시 bare id) → {k,i}
  function parseKRSelectValue(val){
    val=val||'';
    if(val.startsWith('init:')){const initId=val.slice(5);const found=collectAllInit().find(x=>x.id===initId);return{k:found?found.krId:'',i:initId};}
    if(val.startsWith('kr:'))return{k:val.slice(3),i:''};
    if(val)return{k:val,i:''}; // 레거시
    return{k:'',i:''};
  }
  // v103 — 재렌더 전에 모든 task-text textarea 의 현재 값을 state 에 강제 반영 (IME 중간/디바운스 미반영 보호)
  function flushTaskInputs(mid,kind){
    const block=document.querySelector('[data-krl-block="'+mid+':'+kind+'"]');
    if(!block)return;
    block.querySelectorAll('textarea[data-krl-field="task-text"]').forEach(ta=>{
      const tid=ta.dataset.tid;
      if(!tid)return;
      if(ta.dataset.isInitTask==='1'){
        const initId=ta.dataset.initId;
        const t=(state.initiativeTasks[initId]||[]).find(x=>x.id===tid);
        if(t&&t.title!==ta.value){
          t.title=ta.value;
          if(typeof saveInitiativeTask==='function')saveInitiativeTask(t);
        }
      }else{
        const data=getMemberTasks(mid,kind);
        const t=data.tasks.find(x=>x.id===tid);
        if(t&&t.t!==ta.value){
          t.t=ta.value;
          updateMemberTasks(mid,kind,data.legacy,data.tasks);
        }
      }
    });
  }
  function rerenderTaskBlock(mid,kind){
    flushTaskInputs(mid,kind);
    const block=document.querySelector('[data-krl-block="'+mid+':'+kind+'"]');
    if(block){
      const tmp=document.createElement('div');
      tmp.innerHTML=renderTaskListBlock(mid,kind,kind==='today'?'추가 할일':'추가 작업');
      const newBlock=tmp.firstElementChild;
      if(newBlock){
        block.replaceWith(newBlock);
        // v103 — 기존 task 내용에 맞춰 autoGrow 적용 (한 줄은 그대로, 긴 글은 늘어남)
        newBlock.querySelectorAll('textarea[data-krl-autogrow]').forEach(autoGrow);
      }
    }
  }
  // v111 — 실시간 echo 가 전체 render() 대신 '오늘' 할일 블록만 부분 갱신 (아침 동시 편집 깜빡임 차단)
  //   - 입력 중인(active element 포함) 블록은 건드리지 않음 → 포커스/입력 손실 방지
  window.__rerenderTodayTaskBlocks=function(){
    const active=document.activeElement;
    const blocks=document.querySelectorAll('[data-krl-block$=":today"]');
    blocks.forEach(block=>{
      if(active&&block.contains(active))return; // 내가 타이핑 중인 카드는 보존
      const key=block.getAttribute('data-krl-block')||'';
      const mid=key.split(':')[0];
      if(mid)try{rerenderTaskBlock(mid,'today');}catch(_){}
    });
  };
  // v74 — JSON 태스크를 실제 initiative에 연결할 때 initiative_tasks로 마이그레이션
  function migrateJsonTaskToInitiative(mid,kind,title,done){
    // 이미 선택된 sel.i를 사용하므로 호출 측에서 initId 전달
    // ← 이 함수는 아래 핸들러에서 직접 처리
  }
  const _realInitIdsForChange=()=>new Set(collectAllKR().flatMap(k=>(k.initiatives||[]).map(i=>i.id)));
  function migrateToRealInit(mid,kind,matchedTasks,initId,removeIds){
    // JSON 태스크 → state.initiativeTasks 이동
    if(!state.initiativeTasks[initId])state.initiativeTasks[initId]=[];
    matchedTasks.forEach(t=>{
      const newT={id:newTaskId(),initiative_id:initId,title:t.t||'',status:t.d?'done':'todo',owner_id:mid,start_date:null,due_date:null,sort_order:(state.initiativeTasks[initId]||[]).length};
      state.initiativeTasks[initId].push(newT);
      if(typeof saveInitiativeTask==='function')saveInitiativeTask(newT);
      removeIds.add(t.id);
    });
  }
  document.addEventListener('change',function(e){
    const el=e.target;
    // v89/v90 — 비어있는 오늘 할 일에서 + 할일 추가 (이니셔티브 선택 OR 새 이니셔티브 등록)
    if(el.dataset.krlField==='empty-add-picker'){
      const mid=el.dataset.mid,kind=el.dataset.kind;
      const val=el.value||'';
      if(!val)return;
      if(val.startsWith('init:')){
        // 기존 이니셔티브에 빈 task 추가
        const initId=val.slice(5);
        const newT={id:newTaskId(),initiative_id:initId,title:'',status:'todo',owner_id:mid||null,start_date:null,due_date:null,sort_order:(state.initiativeTasks[initId]||[]).length};
        if(!state.initiativeTasks[initId])state.initiativeTasks[initId]=[];
        state.initiativeTasks[initId].push(newT);
        if(typeof saveInitiativeTask==='function')saveInitiativeTask(newT);
        rerenderTaskBlock(mid,kind);
        setTimeout(()=>{const ta=document.querySelector('textarea[data-krl-field="task-text"][data-tid="'+newT.id+'"]');if(ta){ta.focus();autoGrow(ta);}},80);
      }else if(val.startsWith('newinit:')){
        // v98 — 오늘 탭의 picker 자리에 인라인 입력 폼을 즉시 띄움 (KR tree 의존 X)
        const krId=val.slice(8);
        let targetKR=null;
        (state.objectives||[]).forEach(o=>(o.keyResults||[]).forEach(k=>{if(k.id===krId)targetKR=k;}));
        if(!targetKR){showToast('KR을 찾을 수 없음',true);el.value='';return;}
        const wrap=el.parentElement; // picker를 감싸는 div
        if(!wrap){showToast('UI 오류 — 새로고침 필요',true);return;}
        const krTitle=(targetKR.title||'').replace(/"/g,'&quot;');
        wrap.innerHTML=
          '<div style="font-size:11px;color:var(--text-soft);margin-bottom:6px;text-align:left;">📌 '+escapeHtml(krTitle)+' 하위 · 새 이니셔티브</div>'+
          '<div style="display:flex;gap:5px;align-items:stretch;">'+
            '<input data-krl-field="newinit-title-pending" data-kr-id="'+escapeHtml(krId)+'" data-mid="'+escapeHtml(mid)+'" data-kind="'+escapeHtml(kind)+'" placeholder="새 이니셔티브 제목을 입력하세요…" style="flex:1;min-width:0;padding:8px 10px;border:2px solid #6241F5;border-radius:6px;font-size:13px;font-family:inherit;outline:none;background:white;color:var(--text);" />'+
            '<button data-act="newinit-save" data-kr-id="'+escapeHtml(krId)+'" data-mid="'+escapeHtml(mid)+'" data-kind="'+escapeHtml(kind)+'" style="padding:8px 14px;background:#6241F5;color:white;border:none;border-radius:6px;cursor:pointer;font-size:12.5px;font-weight:700;font-family:inherit;flex-shrink:0;">등록</button>'+
            '<button data-act="newinit-cancel" data-mid="'+escapeHtml(mid)+'" data-kind="'+escapeHtml(kind)+'" style="padding:8px 10px;background:transparent;color:var(--text-soft);border:1px solid var(--line);border-radius:6px;cursor:pointer;font-size:12px;font-family:inherit;flex-shrink:0;">취소</button>'+
          '</div>';
        const inp=wrap.querySelector('input[data-krl-field="newinit-title-pending"]');
        if(inp){inp.focus();inp.scrollIntoView({block:'center',behavior:'smooth'});}
      }
      return;
    }
    // v17 — 그룹 헤더 KR 선택: 그룹 내 모든 작업 일괄 재배치
    if(el.dataset.krlField==='group-kr'){
      const mid=el.dataset.mid,kind=el.dataset.kind,oldKey=el.dataset.groupkey;
      const data=getMemberTasks(mid,kind);
      const sel=parseKRSelectValue(el.value||'');
      // v109 — init: 헤더의 ▾ = 이니셔티브 자체를 다른 KR로 이동 (할일이 아니라 init 의 상위 KR 변경)
      //   초기화 행위가 아니라 부모 재연결. 하위 DB 할일은 initiative_id 유지 → 자동으로 따라감.
      if(oldKey&&oldKey.startsWith('init:')){
        const movingInitId=oldKey.slice(5);
        let curKr=null,initObj=null;
        (state.objectives||[]).forEach(o=>(o.keyResults||[]).forEach(k=>{const f=(k.initiatives||[]).find(i=>i.id===movingInitId);if(f){curKr=k;initObj=f;}}));
        if(!initObj){rerenderTaskBlock(mid,kind);return;}
        // 목표 KR 결정: sel.k (KR 선택) 우선, init 선택 시 그 init 의 부모 KR
        const targetKrId=sel.k||'';
        if(targetKrId&&(!curKr||targetKrId!==curKr.id)){
          let targetKr=null;
          (state.objectives||[]).forEach(o=>(o.keyResults||[]).forEach(k=>{if(k.id===targetKrId)targetKr=k;}));
          if(targetKr){
            if(curKr)curKr.initiatives=(curKr.initiatives||[]).filter(i=>i.id!==movingInitId);
            if(!targetKr.initiatives)targetKr.initiatives=[];
            targetKr.initiatives.push(initObj);
            if(typeof saveInitiative==='function')saveInitiative(targetKrId,initObj);
            if(typeof showToast==='function')showToast('이니셔티브를 다른 KR로 이동했습니다');
          }
        }
        rerenderTaskBlock(mid,kind);autoRecalcKRFromInitTasks();return;
      }
      // v78 — oldKey가 'task:xxx'면 task ID로 직접 매칭 (directTask selector도 지원)
      const matchByOldKey=(t)=>{
        if(oldKey&&oldKey.startsWith('task:')){return oldKey.slice(5)===t.id;}
        const tKey=t.i?'init:'+t.i:(t.k?'kr:'+t.k:'task:'+t.id);
        return tKey===oldKey;
      };
      // v74/v75 — 실제 initiative 선택 시 JSON 태스크 → initiative_tasks 마이그레이션
      if(sel.i&&kind==='today'&&_realInitIdsForChange().has(sel.i)){
        const matched=data.tasks.filter(matchByOldKey);
        if(matched.length){const removeIds=new Set();migrateToRealInit(mid,kind,matched,sel.i,removeIds);const next=data.tasks.filter(t=>!removeIds.has(t.id));updateMemberTasks(mid,kind,data.legacy,next);}
        rerenderTaskBlock(mid,kind);scheduleDistributionUpdate();return;
      }
      let changed=false;
      data.tasks.forEach(t=>{
        if(matchByOldKey(t)){t.k=sel.k;t.i=sel.i;changed=true;}
      });
      if(changed)updateMemberTasks(mid,kind,data.legacy,data.tasks);
      rerenderTaskBlock(mid,kind);
      scheduleDistributionUpdate();
      return;
    }
    // v104/v105 — initiative_task 시작일/마감일 변경 (오늘 탭에서 직접 입력 · From-To)
    if(el.dataset.krlField==='init-task-due'||el.dataset.krlField==='init-task-start'){
      const isDue=el.dataset.krlField==='init-task-due';
      const tid=el.dataset.tid,initId=el.dataset.initId;
      const t=(state.initiativeTasks[initId]||[]).find(x=>x.id===tid);
      if(t){
        if(isDue)t.due_date=el.value||null;
        else t.start_date=el.value||null;
        if(typeof saveInitiativeTask==='function')saveInitiativeTask(t);
        // 즉시 UI 갱신: 라벨 텍스트/색 (전체 재렌더 X)
        const label=el.parentElement;
        if(label){
          const today=(typeof todayKey==='function')?todayKey():'';
          const overdue=isDue&&t.due_date&&t.due_date<today&&t.status!=='done';
          const span=label.querySelector('span');
          const val=isDue?t.due_date:t.start_date;
          if(span)span.textContent=val?val.slice(5):(isDue?'마감':'시작');
          label.style.color=overdue?'#E5343B':'var(--text-soft)';
          label.style.borderColor=val?(overdue?'#E5343B':'var(--text-soft)'):'transparent';
          label.style.background=overdue?'#FFF1F1':'';
          label.style.fontWeight=overdue?'700':'';
        }
      }
      return;
    }
    // v109 — initiative_task 이동: 다른 "실제 이니셔티브" 로만 이동 가능 (할일은 항상 이니셔티브 하위, DB 동기화 유지)
    if(el.dataset.krlField==='init-task-kr'){
      const mid=el.dataset.mid,kind=el.dataset.kind,tid=el.dataset.tid,oldInitId=el.dataset.initId;
      const sel=parseKRSelectValue(el.value||'');
      const arr=state.initiativeTasks[oldInitId]||[];
      const t=arr.find(x=>x.id===tid);if(!t){rerenderTaskBlock(mid,kind);return;}
      const realInitIds=_realInitIdsForChange();
      if(sel.i&&realInitIds.has(sel.i)){
        if(sel.i===oldInitId){rerenderTaskBlock(mid,kind);return;}
        state.initiativeTasks[oldInitId]=arr.filter(x=>x.id!==tid);
        if(!state.initiativeTasks[sel.i])state.initiativeTasks[sel.i]=[];
        t.initiative_id=sel.i;
        state.initiativeTasks[sel.i].push(t);
        if(typeof saveInitiativeTask==='function')saveInitiativeTask(t);
        rerenderTaskBlock(mid,kind);
        autoRecalcKRFromInitTasks();
      }else{
        // KR만 선택 등 잘못된 선택 → 변경 없이 복원 (할일은 이니셔티브 하위로만)
        if(typeof showToast==='function')showToast('할일은 이니셔티브 하위로만 이동할 수 있습니다',true);
        rerenderTaskBlock(mid,kind);
      }
      return;
    }
    // v29 — 할일 행 안의 KR/Init 변경 chip (개별 task 재배치)
    if(el.dataset.krlField==='task-link'||el.dataset.krlField==='task-kr'){
      const mid=el.dataset.mid,kind=el.dataset.kind,tid=el.dataset.tid;
      const data=getMemberTasks(mid,kind);
      const t=data.tasks.find(x=>x.id===tid);if(!t)return;
      const sel=parseKRSelectValue(el.value||'');
      // v74 — 실제 initiative 선택 시 마이그레이션
      if(sel.i&&kind==='today'&&_realInitIdsForChange().has(sel.i)){
        const removeIds=new Set();migrateToRealInit(mid,kind,[t],sel.i,removeIds);const next=data.tasks.filter(x=>!removeIds.has(x.id));updateMemberTasks(mid,kind,data.legacy,next);
        rerenderTaskBlock(mid,kind);scheduleDistributionUpdate();return;
      }
      t.k=sel.k;t.i=sel.i;
      updateMemberTasks(mid,kind,data.legacy,data.tasks);
      rerenderTaskBlock(mid,kind);
      scheduleDistributionUpdate();
      return;
    }
  });
  document.addEventListener('focusin',function(e){const el=e.target;if(el.tagName==='TEXTAREA'&&el.dataset.krlField==='task-text'){el.style.background='white';el.style.borderColor='#6241F5';}});
  document.addEventListener('focusout',function(e){
    const el=e.target;
    if(el.tagName==='TEXTAREA'&&el.dataset.krlField==='task-text'){
      el.style.background='#FAFAFA';el.style.borderColor='var(--line)';
      // v92 — 빈 task는 blur 시 자동 삭제 (initiative_task 한정)
      if(el.dataset.isInitTask==='1'&&(el.value||'').trim()===''){
        const tid=el.dataset.tid,initId=el.dataset.initId,mid=el.dataset.mid,kind=el.dataset.kind;
        // 약간 지연 (다른 핸들러 완료 후)
        setTimeout(()=>{
          if(state.initiativeTasks[initId]){
            const t=state.initiativeTasks[initId].find(x=>x.id===tid);
            if(t&&!(t.title||'').trim()){
              state.initiativeTasks[initId]=state.initiativeTasks[initId].filter(x=>x.id!==tid);
              if(typeof deleteInitiativeTask==='function')deleteInitiativeTask(tid);
              if(mid&&kind)rerenderTaskBlock(mid,kind);
            }
          }
        },200);
      }
    }
    // v92 — 빈 initiative 제목은 blur 시 자동 삭제
    if(el.tagName==='INPUT'&&el.dataset.field==='init-title'&&(el.value||'').trim()===''){
      const iid=el.dataset.iid,krid=el.dataset.krid;
      setTimeout(()=>{
        let init=null;
        (state.objectives||[]).forEach(o=>(o.keyResults||[]).forEach(k=>{if(k.id===krid){init=(k.initiatives||[]).find(i=>i.id===iid);}}));
        if(init&&!(init.title||'').trim()){
          // 하위 init_tasks도 삭제
          (state.initiativeTasks[iid]||[]).forEach(t=>{if(typeof deleteInitiativeTask==='function')deleteInitiativeTask(t.id);});
          delete state.initiativeTasks[iid];
          (state.objectives||[]).forEach(o=>(o.keyResults||[]).forEach(k=>{if(k.id===krid){k.initiatives=(k.initiatives||[]).filter(i=>i.id!==iid);}}));
          if(typeof sb!=='undefined')sb.from('initiatives').delete().eq('id',iid).then(()=>{});
          // v93 — JustCreated 셋에서도 제거
          if(window._krlJustCreatedInits)window._krlJustCreatedInits.delete(iid);
          render();
        }
      },200);
    }
    // v93 — init-title에 내용 채워지면 JustCreated 셋에서 제거 (다음 새로고침부터 일반 init으로 표시)
    if(el.tagName==='INPUT'&&el.dataset.field==='init-title'&&(el.value||'').trim()!==''){
      const iid=el.dataset.iid;
      if(window._krlJustCreatedInits)window._krlJustCreatedInits.delete(iid);
    }
  });
})();
// v24/v126 — 팀원 메시지: 1:1 + 그룹 + 멀티 채팅창 (messages / chat_rooms / chat_room_members)
(function(){
  let messages=[],rooms=[],roomMems={},myRead={};
  let mainOpen=false,mainView='list',nrPreselect=null;
  let lastBootTeamId=null,realtimeReady=false,zTop=9050;
  const drafts={};            // 대화별 입력 초안 — 어떤 재렌더링에도 유지
  const wins=new Map();       // key('p:'|'r:'+id) → {kind,id,el,view,max,pre,wantFocus}
  function kOf(kind,id){return(kind==='room'?'r:':'p:')+id;}
  function me(){return(typeof selfMember==='function')?selfMember():null;}
  function tid(){return state&&state.currentTeamId;}
  function nowIso(){return new Date().toISOString();}
  function newMsgId(){return'm_'+Math.random().toString(36).slice(2,9)+Date.now().toString(36).slice(-4);}
  function newRoomId(){return'r_'+Math.random().toString(36).slice(2,9)+Date.now().toString(36).slice(-4);}
  function _esc(x){return(typeof escapeHtml==='function')?escapeHtml(x):String(x||'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));}
  function fmtTime(ts){if(!ts)return'';const d=new Date(ts);const tod=new Date();if(d.toDateString()===tod.toDateString())return String(d.getHours()).padStart(2,'0')+':'+String(d.getMinutes()).padStart(2,'0');return(d.getMonth()+1)+'/'+d.getDate()+' '+String(d.getHours()).padStart(2,'0')+':'+String(d.getMinutes()).padStart(2,'0');}
  function memberOf(id){return state.members.find(x=>x.id===id);}
  function roomName(r){if(r.name)return r.name;const m=me();const names=(roomMems[r.id]||[]).filter(x=>!m||x!==m.id).map(x=>(memberOf(x)||{}).name||'?');return names.join(', ')||'그룹';}
  async function loadAll(){
    const m=me();if(!m||!tid())return;
    try{
      const rm=await sb.from('chat_room_members').select('*');
      const allRm=rm.data||[];
      roomMems={};allRm.forEach(x=>{(roomMems[x.room_id]=roomMems[x.room_id]||[]).push(x.member_id);});
      const myRows=allRm.filter(x=>x.member_id===m.id);
      myRead={};myRows.forEach(x=>{myRead[x.room_id]=x.last_read_at;});
      const ids=myRows.map(x=>x.room_id);
      if(ids.length){const rr=await sb.from('chat_rooms').select('*').in('id',ids);rooms=(rr.data||[]).filter(r=>r.team_id===tid());}
      else rooms=[];
      let orExpr='from_id.eq.'+m.id+',to_id.eq.'+m.id;
      const rids=rooms.map(r=>r.id);
      if(rids.length)orExpr+=',room_id.in.('+rids.join(',')+')';
      const{data,error}=await sb.from('messages').select('*').eq('team_id',tid()).or(orExpr).order('created_at',{ascending:true});
      if(error){console.warn('[chat] load error',error.message);return;}
      messages=data||[];
    }catch(e){console.warn('[chat] load fail',e);}
  }
  async function sendMessage(toId,roomId,body){
    const m=me();if(!m||(!toId&&!roomId)||!body)return;
    const row={id:newMsgId(),team_id:tid(),from_id:m.id,to_id:toId||null,room_id:roomId||null,body:body,created_at:nowIso()};
    messages.push(row);
    const key=roomId?kOf('room',roomId):kOf('dm',toId);
    if(wins.has(key))renderWin(key);
    if(mainOpen)renderMain();
    try{const{error}=await sb.from('messages').insert(row);if(error){console.warn('[chat] send error',error.message);if(typeof showToast==='function')showToast('메시지 전송 실패',true);}}
    catch(e){console.warn('[chat] send fail',e);}
  }
  async function markRead(peerId){
    const m=me();if(!m)return;
    const unread=messages.filter(x=>!x.room_id&&x.from_id===peerId&&x.to_id===m.id&&!x.read_at);
    if(unread.length===0)return;
    const now=nowIso();unread.forEach(x=>{x.read_at=now;});
    updateBadge();
    try{await sb.from('messages').update({read_at:now}).eq('to_id',m.id).eq('from_id',peerId).is('read_at',null);}catch(e){}
  }
  async function markRoomRead(roomId){
    const m=me();if(!m)return;
    myRead[roomId]=nowIso();updateBadge();
    try{await sb.from('chat_room_members').update({last_read_at:myRead[roomId]}).eq('room_id',roomId).eq('member_id',m.id);}catch(e){}
  }
  function getMessagesWith(peerId){const m=me();if(!m)return[];return messages.filter(x=>!x.room_id&&((x.from_id===m.id&&x.to_id===peerId)||(x.from_id===peerId&&x.to_id===m.id)));}
  function roomMessages(roomId){return messages.filter(x=>x.room_id===roomId);}
  function roomUnread(roomId){const m=me();if(!m)return 0;const lr=myRead[roomId];return messages.filter(x=>x.room_id===roomId&&x.from_id!==m.id&&(!lr||x.created_at>lr)).length;}
  function getTotalUnread(){
    const m=me();if(!m)return 0;
    const dm=messages.filter(x=>!x.room_id&&x.to_id===m.id&&!x.read_at).length;
    return dm+rooms.reduce((s,r)=>s+roomUnread(r.id),0);
  }
  function ensureUI(){
    if(document.getElementById('chat-launcher'))return;
    const b=document.createElement('button');
    b.id='chat-launcher';b.className='chat-launcher';b.title='메시지';
    b.innerHTML='💬<span class="chat-launcher-badge" id="chat-launcher-badge" hidden>0</span>';
    b.addEventListener('click',()=>{if(!me()){if(typeof showToast==='function')showToast('로그인 후 이용 가능합니다.',false);return;}mainOpen=!mainOpen;if(mainOpen)mainView='list';renderMain();});
    document.body.appendChild(b);
    const p=document.createElement('div');p.id='chat-panel';p.className='chat-panel';p.hidden=true;
    try{const sz=JSON.parse(localStorage.getItem('team-okr-chat-size')||'null');if(sz&&sz.w&&sz.h){p.style.width=sz.w+'px';p.style.height=sz.h+'px';}}catch(e){}
    document.body.appendChild(p);
  }
  function updateBadge(){
    const lc=document.getElementById('chat-launcher');if(!lc)return;
    const m=me();
    lc.style.display=m?'flex':'none';
    if(!m)return;
    const bd=document.getElementById('chat-launcher-badge');if(!bd)return;
    const n=getTotalUnread();
    if(n>0){bd.hidden=false;bd.textContent=n>99?'99+':String(n);lc.classList.add('has-unread');}
    else{bd.hidden=true;lc.classList.remove('has-unread');}
  }
  let sndOn=localStorage.getItem('team-okr-chat-sound')!=='0';let _chatACtx=null;
  function chime(){ // 메신저식 수신음 (두 음 차임)
    if(!sndOn)return;
    try{
      const C=window.AudioContext||window.webkitAudioContext;
      _chatACtx=_chatACtx||new C();
      const c=_chatACtx,t=c.currentTime;
      [[880,0],[1174.7,0.09]].forEach(([f,d])=>{
        const o=c.createOscillator(),g=c.createGain();
        o.type='sine';o.frequency.value=f;
        g.gain.setValueAtTime(0.0001,t+d);
        g.gain.exponentialRampToValueAtTime(0.07,t+d+0.02);
        g.gain.exponentialRampToValueAtTime(0.0001,t+d+0.3);
        o.connect(g);g.connect(c.destination);o.start(t+d);o.stop(t+d+0.32);
      });
    }catch(e){}
  }
  function shakeEl(el){
    if(!el||el.hidden)return;
    el.classList.remove('chat-shake');void el.offsetWidth;el.classList.add('chat-shake');
    setTimeout(()=>el.classList.remove('chat-shake'),650);
  }
  // ── 메인 패널: 대화 목록(채팅중인 방 목록) + 새 그룹 ──
  function renderMain(){
    ensureUI();
    const panel=document.getElementById('chat-panel');if(!panel)return;
    panel.hidden=!mainOpen;updateBadge();
    if(!mainOpen)return;
    panel.style.zIndex=++zTop;
    const m=me();
    if(!m){panel.innerHTML='<div class="chat-panel-head"><span>메시지</span><button class="chat-close" data-chat-act="close">✕</button></div><div class="chat-panel-body"><div class="chat-empty">로그인 후 이용 가능합니다.</div></div>';return;}
    if(mainView==='new-room'){
      const cands=state.members.filter(mm=>!mm.isObserver&&mm.id!==m.id);
      panel.innerHTML='<div class="chat-panel-head"><button class="chat-back" data-chat-act="back" title="목록">←</button><span class="chat-head-name">새 그룹 대화</span><button class="chat-close" data-chat-act="close">✕</button></div>'+
        '<div class="chat-panel-body chat-form">'+
        '<input type="text" id="nr-name" maxlength="30" placeholder="그룹 이름 (비우면 멤버 이름으로 표시)">'+
        '<div style="font-size:11px;color:var(--text-soft);font-weight:700;">초대할 팀원</div>'+
        cands.map(mm=>'<label class="chat-check-row"><input type="checkbox" class="nr-mem" value="'+mm.id+'"'+(nrPreselect===mm.id?' checked':'')+'><span class="chat-avatar" style="background:'+(mm.color||'#6241F5')+';width:22px;height:22px;font-size:10px;">'+_esc((mm.name||'?').slice(0,1).toUpperCase())+'</span>'+_esc(mm.name)+'</label>').join('')+
        '<button class="chat-form-btn" data-chat-act="create-room">그룹 만들기</button>'+
        '</div>';
      nrPreselect=null;
      decorate(panel);
      setTimeout(()=>{const el=document.getElementById('nr-name');if(el)el.focus();},40);
      return;
    }
    // list — 그룹·1:1 전체 + 열린 창 표시
    const entries=[];
    rooms.forEach(r=>{
      const msgs=roomMessages(r.id);
      entries.push({kind:'room',id:r.id,name:roomName(r),last:msgs[msgs.length-1]||null,unread:roomUnread(r.id),count:(roomMems[r.id]||[]).length});
    });
    const peers=new Map();
    messages.forEach(x=>{
      if(x.room_id)return;
      const peer=x.from_id===m.id?x.to_id:x.from_id;
      if(!peers.has(peer))peers.set(peer,{last:x,unread:0,peerId:peer});
      else{const e=peers.get(peer);if(new Date(x.created_at)>new Date(e.last.created_at))e.last=x;}
      if(x.from_id!==m.id&&!x.read_at)peers.get(peer).unread++;
    });
    state.members.filter(mm=>!mm.isObserver&&mm.id!==m.id).forEach(mm=>{if(!peers.has(mm.id))peers.set(mm.id,{last:null,unread:0,peerId:mm.id});});
    peers.forEach(p=>{const mem=memberOf(p.peerId);if(mem)entries.push({kind:'dm',id:mem.id,name:mem.name,color:mem.color,last:p.last,unread:p.unread});});
    entries.sort((a,b)=>{
      const ao=wins.has(kOf(a.kind,a.id))?1:0,bo=wins.has(kOf(b.kind,b.id))?1:0;
      if(ao!==bo)return bo-ao; // 채팅중(열린 창) 우선
      if(a.unread&&!b.unread)return-1;if(!a.unread&&b.unread)return 1;
      const at=a.last?new Date(a.last.created_at).getTime():0;const bt=b.last?new Date(b.last.created_at).getTime():0;return bt-at;
    });
    const totU=getTotalUnread();
    panel.innerHTML='<div class="chat-panel-head"><span>메시지'+(totU>0?' <span class="chat-head-badge">'+totU+'</span>':'')+'</span><button class="chat-mini" data-chat-act="new-room" title="여러 명을 초대해 그룹 대화를 시작합니다">+ 그룹</button><button class="chat-zoom" data-chat-act="sound" title="수신음 켬/끔">'+(sndOn?'🔔':'🔕')+'</button><button class="chat-close" data-chat-act="close">✕</button></div><div class="chat-panel-body chat-list-body">'+(entries.length===0?'<div class="chat-empty">대화 가능한 팀원이 없습니다.</div>':entries.map(p=>{
      const open=wins.has(kOf(p.kind,p.id));
      const preview=p.last?((p.last.from_id===m.id?'나: ':'')+_esc(String(p.last.body||'').slice(0,42))+(String(p.last.body||'').length>42?'…':'')):'<span style="opacity:.55;">대화 없음</span>';
      const time=p.last?fmtTime(p.last.created_at):'';
      const avatar=p.kind==='room'
        ?'<span class="chat-avatar chat-room-avatar">👥</span>'
        :'<span class="chat-avatar" style="background:'+(p.color||'#6241F5')+';">'+_esc((p.name||'?').slice(0,1).toUpperCase())+'</span>';
      return'<button class="chat-list-item'+(p.unread>0?' has-unread':'')+'" data-chat-act="open" data-kind="'+p.kind+'" data-id="'+p.id+'">'+
        avatar+
        '<span class="chat-list-meta"><span class="chat-list-name">'+_esc(p.name||'')+(p.kind==='room'?' <span style="font-weight:500;color:var(--text-soft);font-size:10.5px;">'+p.count+'명</span>':'')+(open?' <span style="font-size:9.5px;color:var(--growth);font-weight:800;">● 대화중</span>':'')+(p.unread>0?' <span class="chat-list-unread">'+p.unread+'</span>':'')+'</span><span class="chat-list-preview">'+preview+'</span></span>'+
        (time?'<span class="chat-list-time">'+time+'</span>':'')+
      '</button>';
    }).join(''))+'</div>';
    decorate(panel);
  }
  function decorate(panel){ // 리사이즈 핸들(좌상단) — 메인 패널
    if(!panel.querySelector('.chat-resize'))panel.insertAdjacentHTML('afterbegin','<div class="chat-resize" title="드래그로 크기 조절"></div>');
  }
  // ── 대화 창 (여러 개 동시) ──
  function openWindow(kind,id,focus){
    const key=kOf(kind,id);
    let w=wins.get(key);
    if(w){w.el.style.zIndex=++zTop;if(focus){w.wantFocus=true;renderWin(key);}return;}
    const el=document.createElement('div');
    el.className='chat-panel chat-win';
    const wW=320,wH=440;
    const n=wins.size;
    const left=Math.max(8,window.innerWidth-20-352-(n*(wW+12))-wW);
    const top=Math.max(8,window.innerHeight-84-wH);
    el.style.left=left+'px';el.style.top=top+'px';
    el.style.width=wW+'px';el.style.height=wH+'px';
    el.style.zIndex=++zTop;
    document.body.appendChild(el);
    el.addEventListener('pointerdown',()=>{el.style.zIndex=++zTop;});
    w={kind,id,el,view:'chat',wantFocus:!!focus};
    wins.set(key,w);
    renderWin(key);
    if(mainOpen)renderMain();
  }
  function closeWindow(key){
    const w=wins.get(key);if(!w)return;
    const inp=w.el.querySelector('.chat-input');
    if(inp)drafts[key]=inp.value;
    w.el.remove();wins.delete(key);
    if(mainOpen)renderMain();
  }
  function renderWin(key){
    const w=wins.get(key);if(!w)return;
    const m=me();if(!m)return;
    const el=w.el;
    const prevInp=el.querySelector('.chat-input');
    if(prevInp)drafts[key]=prevInp.value;
    const hadFocus=prevInp&&document.activeElement===prevInp;
    const isRoom=w.kind==='room';
    let title='',color='#6241F5';
    if(isRoom){
      const r=rooms.find(x=>x.id===w.id);
      if(!r){closeWindow(key);return;}
      title=roomName(r)+' <span style="font-weight:500;font-size:10.5px;color:var(--text-soft);">'+(roomMems[w.id]||[]).length+'명</span>';
    }else{
      const peer=memberOf(w.id);
      if(!peer){closeWindow(key);return;}
      title=_esc(peer.name||'');color=peer.color||'#6241F5';
    }
    const head='<div class="chat-panel-head chat-win-head" data-win="'+key+'">'
      +(isRoom?'<span class="chat-avatar chat-head-avatar chat-room-avatar">👥</span>':'<span class="chat-avatar chat-head-avatar" style="background:'+color+';">'+_esc(title.slice(0,1).toUpperCase())+'</span>')
      +'<span class="chat-head-name">'+title+'</span>'
      +'<button class="chat-mini" data-wact="invite" title="'+(isRoom?'팀원 초대':'이 상대를 포함한 그룹 만들기')+'">+ 초대</button>'
      +'<button class="chat-zoom" data-wact="zoom" title="확대/축소">⤢</button>'
      +'<button class="chat-close" data-wact="close">✕</button></div>';
    if(w.view==='invite'&&isRoom){
      const inRoom=new Set(roomMems[w.id]||[]);
      const cands=state.members.filter(mm=>!mm.isObserver&&!inRoom.has(mm.id));
      el.innerHTML=head+'<div class="chat-panel-body chat-form">'
        +(cands.length===0?'<div class="chat-empty">초대할 수 있는 팀원이 없습니다.<br>(모두 참여 중)</div>'
        :cands.map(mm=>'<label class="chat-check-row"><input type="checkbox" class="iv-mem" value="'+mm.id+'"><span class="chat-avatar" style="background:'+(mm.color||'#6241F5')+';width:22px;height:22px;font-size:10px;">'+_esc((mm.name||'?').slice(0,1).toUpperCase())+'</span>'+_esc(mm.name)+'</label>').join('')
        +'<button class="chat-form-btn" data-wact="do-invite">초대하기</button>')
        +'<button class="chat-form-btn" style="background:none;color:var(--text-soft);border:1px solid var(--line);" data-wact="back-chat">← 대화로</button>'
        +'</div>';
    }else{
      const msgs=isRoom?roomMessages(w.id):getMessagesWith(w.id);
      // v126 — 메신저식 말풍선: 같은 사람·같은 분(分) 메시지는 그룹화, 시각·읽음은 말풍선 밖
      // (읽음 여부가 바뀌어도 말풍선 크기는 변하지 않는다)
      const bodyHtml=msgs.length===0?'<div class="chat-empty">아직 메시지가 없습니다.<br>첫 메시지를 보내보세요.</div>':msgs.map((x,i)=>{
        const mine=x.from_id===m.id;
        const prev=msgs[i-1],next=msgs[i+1];
        const dayStr=new Date(x.created_at).toDateString();
        const newDay=i===0||new Date(prev.created_at).toDateString()!==dayStr;
        const dateSep=newDay?'<div class="chat-date-sep">'+new Date(x.created_at).toLocaleDateString('ko-KR',{month:'long',day:'numeric',weekday:'long'})+'</div>':'';
        const grpPrev=!newDay&&prev&&prev.from_id===x.from_id&&fmtTime(prev.created_at)===fmtTime(x.created_at);
        const grpNext=next&&new Date(next.created_at).toDateString()===dayStr&&next.from_id===x.from_id&&fmtTime(next.created_at)===fmtTime(x.created_at);
        const meta='<span class="chat-meta">'+(grpNext?'':((mine&&!isRoom&&x.read_at?'<em class="chat-read">읽음</em>':'')+fmtTime(x.created_at)))+'</span>';
        let av='';
        if(!mine){
          const mem=memberOf(x.from_id)||{};
          av=grpPrev?'<span class="chat-av-sp"></span>':'<span class="chat-avatar chat-msg-av" style="background:'+(mem.color||'#6241F5')+';">'+_esc((mem.name||'?').slice(0,1).toUpperCase())+'</span>';
        }
        const sender=(!mine&&isRoom&&!grpPrev)?'<div class="chat-msg-sender">'+_esc((memberOf(x.from_id)||{}).name||'?')+'</div>':'';
        const bubble='<div class="chat-bubble">'+_esc(x.body||'')+'</div>';
        const line=mine?(meta+bubble):(bubble+meta);
        return dateSep+'<div class="chat-row '+(mine?'mine':'theirs')+(grpPrev?' grp':'')+'">'+av+'<div class="chat-col">'+sender+'<div class="chat-line2">'+line+'</div></div></div>';
      }).join('');
      el.innerHTML=head
        +'<div class="chat-panel-body chat-conv-body">'+bodyHtml+'</div>'
        +'<div class="chat-input-wrap"><textarea class="chat-input" rows="1" placeholder="메시지 입력..." title="Enter 보내기 · Shift+Enter 줄바꿈"></textarea><button class="chat-send" data-wact="send">보내기</button></div>'
        +'<div class="chat-resize-br" title="드래그로 크기 조절"></div>';
      const cb=el.querySelector('.chat-conv-body');if(cb)cb.scrollTop=cb.scrollHeight;
      const inp=el.querySelector('.chat-input');
      inp.value=drafts[key]||'';
      const autogrow=()=>{inp.style.height='auto';inp.style.height=Math.min(120,inp.scrollHeight)+'px';};
      inp.addEventListener('input',()=>{drafts[key]=inp.value;autogrow();});
      autogrow();
      inp.addEventListener('keydown',(e)=>{
        if(e.isComposing||e.keyCode===229){e.stopPropagation();return;}
        if(e.key==='Enter'&&!e.shiftKey){
          e.preventDefault();
          const body=inp.value.trim();if(!body)return;
          delete drafts[key];inp.value='';
          if(isRoom)sendMessage(null,w.id,body);else sendMessage(w.id,null,body);
        }
        e.stopPropagation();
      });
      // 직접 연 창이거나 입력 중이던 창만 포커스 — 다른 작업 방해 금지
      if(hadFocus||w.wantFocus){setTimeout(()=>{inp.focus();try{inp.selectionStart=inp.selectionEnd=inp.value.length;}catch(e){}},40);}
      w.wantFocus=false;
      if(isRoom)markRoomRead(w.id);else markRead(w.id);
    }
    // 창 버튼/드래그 바인딩
    el.querySelectorAll('[data-wact]').forEach(b=>b.addEventListener('click',(e)=>{
      e.stopPropagation();
      const act=b.dataset.wact;
      if(act==='close')closeWindow(key);
      else if(act==='zoom'){
        if(!w.max){w.pre={w:el.offsetWidth,h:el.offsetHeight};el.style.width=Math.min(880,window.innerWidth-40)+'px';el.style.height=Math.min(800,window.innerHeight-60)+'px';el.style.left=Math.max(8,window.innerWidth-el.offsetWidth-20)+'px';el.style.top=Math.max(8,window.innerHeight-el.offsetHeight-40)+'px';w.max=true;}
        else{if(w.pre){el.style.width=w.pre.w+'px';el.style.height=w.pre.h+'px';}w.max=false;}
      }
      else if(act==='send'){const inp=el.querySelector('.chat-input');if(!inp)return;const body=inp.value.trim();if(!body)return;delete drafts[key];inp.value='';if(isRoom)sendMessage(null,w.id,body);else sendMessage(w.id,null,body);}
      else if(act==='invite'){
        if(isRoom){w.view='invite';renderWin(key);}
        else{nrPreselect=w.id;mainOpen=true;mainView='new-room';renderMain();}
      }
      else if(act==='do-invite'){
        const ids=Array.from(el.querySelectorAll('.iv-mem:checked')).map(x=>x.value);
        if(!ids.length){if(typeof showToast==='function')showToast('초대할 팀원을 선택하세요',true);return;}
        inviteMembers(w.id,ids).then(()=>{w.view='chat';renderWin(key);});
      }
      else if(act==='back-chat'){w.view='chat';renderWin(key);}
    }));
    const headEl=el.querySelector('.chat-win-head');
    if(headEl)headEl.addEventListener('pointerdown',(e)=>{
      if(e.target.closest('button'))return;
      e.preventDefault();
      const r=el.getBoundingClientRect();
      const dx=e.clientX-r.left,dy=e.clientY-r.top;
      const move=ev=>{el.style.left=Math.max(0,Math.min(window.innerWidth-80,ev.clientX-dx))+'px';el.style.top=Math.max(0,Math.min(window.innerHeight-40,ev.clientY-dy))+'px';};
      const up=()=>{window.removeEventListener('pointermove',move);window.removeEventListener('pointerup',up);};
      window.addEventListener('pointermove',move);window.addEventListener('pointerup',up);
    });
  }
  async function createRoom(name,memberIds){
    const m=me();if(!m)return;
    const id=newRoomId();const now=nowIso();
    const room={id,team_id:tid(),name:name||'',created_by:m.id,created_at:now};
    rooms.push(room);
    roomMems[id]=[m.id].concat(memberIds);
    myRead[id]=now;
    try{
      const r1=await sb.from('chat_rooms').insert(room);if(r1.error)throw r1.error;
      const rows=[{room_id:id,member_id:m.id,last_read_at:now}].concat(memberIds.map(x=>({room_id:id,member_id:x})));
      const r2=await sb.from('chat_room_members').insert(rows);if(r2.error)throw r2.error;
    }catch(e){console.warn('[chat] room create fail',e);if(typeof showToast==='function')showToast('그룹 생성 실패: '+(e.message||e),true);}
    mainView='list';renderMain();
    openWindow('room',id,true);
  }
  async function inviteMembers(roomId,memberIds){
    if(!memberIds.length)return;
    roomMems[roomId]=(roomMems[roomId]||[]).concat(memberIds);
    try{
      const{error}=await sb.from('chat_room_members').insert(memberIds.map(x=>({room_id:roomId,member_id:x})));
      if(error)throw error;
      if(typeof showToast==='function')showToast(memberIds.length+'명 초대 완료');
    }catch(e){console.warn('[chat] invite fail',e);if(typeof showToast==='function')showToast('초대 실패: '+(e.message||e),true);}
  }
  function openChatWith(peerId){openWindow('dm',peerId,true);}
  // 메인 패널 액션
  document.addEventListener('click',function(e){
    const t=e.target.closest('[data-chat-act]');if(!t)return;
    const act=t.dataset.chatAct;
    if(act==='close'){mainOpen=false;renderMain();}
    else if(act==='back'){mainView='list';renderMain();}
    else if(act==='new-room'){mainView='new-room';renderMain();}
    else if(act==='sound'){sndOn=!sndOn;try{localStorage.setItem('team-okr-chat-sound',sndOn?'1':'0');}catch(err){}renderMain();if(sndOn)chime();}
    else if(act==='open'){openWindow(t.dataset.kind,t.dataset.id,true);}
    else if(act==='create-room'){
      const name=(document.getElementById('nr-name')||{}).value||'';
      const ids=Array.from(document.querySelectorAll('#chat-panel .nr-mem:checked')).map(x=>x.value);
      if(ids.length===0){if(typeof showToast==='function')showToast('초대할 팀원을 선택하세요',true);return;}
      createRoom(name.trim(),ids);
    }
  });
  // 좌상단(메인)·우하단(창) 리사이즈
  document.addEventListener('pointerdown',function(e){
    const h=e.target.closest('.chat-resize,.chat-resize-br');if(!h)return;
    e.preventDefault();e.stopPropagation();
    const panel=h.closest('.chat-panel');if(!panel)return;
    const br=h.classList.contains('chat-resize-br');
    const r=panel.getBoundingClientRect();
    const move=ev=>{
      let w,hh;
      if(br){w=ev.clientX-r.left;hh=ev.clientY-r.top;}
      else{w=r.right-ev.clientX;hh=r.bottom-ev.clientY;}
      panel.style.width=Math.max(260,Math.min(window.innerWidth-30,w))+'px';
      panel.style.height=Math.max(300,Math.min(window.innerHeight-60,hh))+'px';
    };
    const up=()=>{
      window.removeEventListener('pointermove',move);window.removeEventListener('pointerup',up);
      if(panel.id==='chat-panel'){try{localStorage.setItem('team-okr-chat-size',JSON.stringify({w:panel.offsetWidth,h:panel.offsetHeight}));}catch(err){}}
    };
    window.addEventListener('pointermove',move);window.addEventListener('pointerup',up);
  });
  // 우클릭 (담당자 아이콘) → 그 멤버와 채팅 창 열기
  document.addEventListener('contextmenu',function(e){
    const icon=e.target.closest('.date-bar-member-icon');if(!icon)return;
    const mid=icon.dataset.mid;if(!mid)return;
    e.preventDefault();
    const m=me();if(!m){if(typeof showToast==='function')showToast('메시지는 로그인 후 가능합니다.',false);return;}
    if(mid===m.id){if(typeof showToast==='function')showToast('본인에게는 메시지를 보낼 수 없습니다.',false);return;}
    openChatWith(mid);
  });
  let refreshTimer=null;
  function scheduleRefresh(){
    if(refreshTimer)clearTimeout(refreshTimer);
    refreshTimer=setTimeout(async()=>{refreshTimer=null;await loadAll();wins.forEach((w,key)=>renderWin(key));if(mainOpen)renderMain();updateBadge();},700);
  }
  function setupChatRealtime(){
    if(realtimeReady)return;realtimeReady=true;
    try{
      sb.channel('messages-rt')
      .on('postgres_changes',{event:'*',schema:'public',table:'messages'},function(p){
        const r=p.new||p.old;if(!r||r.team_id!==tid())return;
        const m=me();if(!m)return;
        const isMyRoom=r.room_id&&rooms.some(x=>x.id===r.room_id);
        if(!isMyRoom&&r.from_id!==m.id&&r.to_id!==m.id)return;
        if(p.eventType==='DELETE'){messages=messages.filter(x=>x.id!==r.id);}
        else if(p.eventType==='UPDATE'){const i=messages.findIndex(x=>x.id===r.id);if(i>=0)messages[i]=r;else messages.push(r);}
        else{if(!messages.find(x=>x.id===r.id))messages.push(r);}
        messages.sort((a,b)=>new Date(a.created_at)-new Date(b.created_at));
        // v126 — 수신 알림: 해당 대화 창이 있으면 그 창 갱신+흔들기, 없으면 메인 목록 팝업+흔들기
        const incoming=p.eventType==='INSERT'&&r.from_id!==m.id;
        const key=r.room_id?kOf('room',r.room_id):kOf('dm',r.from_id===m.id?r.to_id:r.from_id);
        if(wins.has(key)){
          renderWin(key); // 초안·포커스 보존됨
          if(incoming){shakeEl(wins.get(key).el);chime();}
        }else if(incoming){
          if(!mainOpen){mainOpen=true;mainView='list';}
          renderMain();shakeEl(document.getElementById('chat-panel'));chime();
        }
        if(mainOpen)renderMain();
        updateBadge();
      })
      .on('postgres_changes',{event:'*',schema:'public',table:'chat_rooms'},function(){scheduleRefresh();})
      .on('postgres_changes',{event:'*',schema:'public',table:'chat_room_members'},function(p){
        const r=p.new||p.old;const m=me();if(!m||!r)return;
        if(p.eventType==='UPDATE'&&r.member_id===m.id)return;
        scheduleRefresh();
      })
      .subscribe();
    }catch(e){console.warn('[chat] realtime setup fail',e);}
  }
  async function bootChat(){
    if(!me()||!tid()){updateBadge();return;}
    if(lastBootTeamId===tid())return;
    lastBootTeamId=tid();
    messages=[];rooms=[];roomMems={};myRead={};mainOpen=false;mainView='list';
    wins.forEach(w=>w.el.remove());wins.clear();
    await loadAll();
    renderMain();updateBadge();setupChatRealtime();
  }
  setInterval(bootChat,1500);
})();

// v123 — 타자 스탬프 효과: 터미널 모드와 같은 "게임 같은" 타격감 (플래너에도 적용)
// 끄기: localStorage 'team-okr-typefx' = '0'
(function(){
  const st=document.createElement('style');
  st.textContent=''
    +'.tk-stamp{position:fixed;z-index:99999;pointer-events:none;display:inline-flex;align-items:center;background:#6241F5;color:#fff;border-radius:3px;padding:0 1px;transform:scale(1.18)}'
    +'.tk-jolt{transform:translateY(1.5px)}';
  document.head.appendChild(st);
  const fx={
    enabled:localStorage.getItem('team-okr-typefx')!=='0',
    _ctx:null,_canvas:document.createElement('canvas'),
    toggle(){this.enabled=!this.enabled;try{localStorage.setItem('team-okr-typefx',this.enabled?'1':'0');}catch(e){}return this.enabled;},
    click(){
      try{
        if(!this._ctx)this._ctx=new(window.AudioContext||window.webkitAudioContext)();
        const c=this._ctx,t=c.currentTime;
        const o=c.createOscillator(),g=c.createGain();
        o.type='square';o.frequency.value=95+Math.random()*45;
        g.gain.setValueAtTime(0.035,t);g.gain.exponentialRampToValueAtTime(0.0008,t+0.045);
        o.connect(g);g.connect(c.destination);o.start(t);o.stop(t+0.05);
      }catch(e){}
    },
    _caretXY(el,cs){ // v134 — textarea 캐럿 좌표: 미러 div로 측정
      const d=document.createElement('div');
      ['fontFamily','fontSize','fontWeight','lineHeight','letterSpacing','paddingTop','paddingRight','paddingBottom','paddingLeft','borderTopWidth','borderRightWidth','borderBottomWidth','borderLeftWidth','boxSizing'].forEach(k=>{d.style[k]=cs[k];});
      d.style.cssText+=';position:fixed;left:-9999px;top:0;visibility:hidden;white-space:pre-wrap;word-wrap:break-word;overflow-wrap:break-word;';
      d.style.width=el.clientWidth+'px';
      const caret=el.selectionStart!=null?el.selectionStart:el.value.length;
      d.textContent=el.value.slice(0,caret);
      const mark=document.createElement('span');mark.textContent='\u200b';d.appendChild(mark);
      document.body.appendChild(d);
      const r=el.getBoundingClientRect();
      const x=r.left+mark.offsetLeft-el.scrollLeft;
      const y=r.top+mark.offsetTop-el.scrollTop;
      const h=parseFloat(cs.lineHeight)||18;
      d.remove();
      return {x,y,h,r};
    },
    stamp(el,ch){
      if(!this.enabled)return;
      // v129 — 입력칸을 위아래로 흔들던 jolt 제거: 스탬프·타건음만 유지
      this.click();
      if(!ch)return;
      const cs=getComputedStyle(el);
      const c=this._canvas.getContext('2d');
      c.font=cs.fontWeight+' '+cs.fontSize+' '+cs.fontFamily;
      const chW=c.measureText(ch).width;
      let x,y,h;
      const r=el.getBoundingClientRect();
      if(el.tagName==='TEXTAREA'){ // v134 — 여러 줄 입력칸에서도 캐럿 위치에 도장
        const pos=this._caretXY(el,cs);
        x=pos.x-chW;y=pos.y;h=pos.h;
        if(y<r.top-2||y>r.bottom-h*0.5||x<r.left-chW||x>r.right)return;
      }else{
        const caret=el.selectionStart!=null?el.selectionStart:el.value.length;
        const before=c.measureText(el.value.slice(0,caret)).width;
        x=r.left+(parseFloat(cs.paddingLeft)||0)+before-el.scrollLeft-chW;
        y=r.top;h=r.height;
        if(x>r.right||x<r.left-chW)return;
      }
      document.querySelectorAll('.tk-stamp').forEach(e=>e.remove()); // v136 — 다음 타이핑 즉시 이전 도장 제거 (속도감)
      const s=document.createElement('span');
      s.className='tk-stamp';s.textContent=ch;
      s.style.left=x+'px';s.style.top=y+'px';s.style.height=h+'px';s.style.font=c.font;
      document.body.appendChild(s);
      setTimeout(()=>s.remove(),170);
    },
  };
  document.addEventListener('input',(e)=>{
    const el=e.target;
    if(el.tagName!=='TEXTAREA'&&!(el.tagName==='INPUT'&&(!el.type||el.type==='text')))return;
    if(el.closest&&el.closest('.chat-panel'))return; // 채팅 입력란은 떨림 제외 (v126)
    if(e.inputType&&e.inputType!=='insertText'&&e.inputType!=='insertCompositionText')return;
    fx.stamp(el,e.data?e.data.slice(-1):'');
  },true);
  window.typeFX=fx;
})();

// v131 — 접속중 표시: 터미널과 같은 presence 채널(okrterm-presence) 공유.
// 접속 중인 멤버의 원형 아이콘 둘레에 색상이 도는 링을 표시한다.
(function(){
  let ch=null,joinedAs=null;
  window._onlineNames=new Set();
  function applyIcons(){
    try{
      const self=(typeof selfMember==='function')?selfMember():null;
      document.querySelectorAll('.date-bar-member-icon').forEach(b=>{
        const m=state.members.find(x=>x.id===b.dataset.mid);
        const on=!!(m&&(window._onlineNames.has(m.name)||(self&&m.id===self.id))); // 본인은 로그인 중이면 항상 접속중
        b.classList.toggle('online',on);
      });
    }catch(e){}
  }
  window._applyPresenceIcons=applyIcons;
  function ensure(){
    const m=(typeof selfMember==='function')?selfMember():null;
    if(!m||typeof sb==='undefined'||!sb)return;
    if(joinedAs===m.name){applyIcons();return;}
    try{if(ch)sb.removeChannel(ch);}catch(e){}
    joinedAs=m.name;
    try{
      ch=sb.channel('okrterm-presence',{config:{presence:{key:m.name}}});
      ch.on('presence',{event:'sync'},()=>{
        window._onlineNames=new Set(Object.keys(ch.presenceState()));
        applyIcons();
      });
      ch.subscribe(st=>{if(st==='SUBSCRIBED')ch.track({at:Date.now()});});
    }catch(e){console.warn('[presence] setup fail',e);}
    applyIcons(); // 조인 직후에도 본인 링 즉시 표시
  }
  setInterval(ensure,2500);
})();
