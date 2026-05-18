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
  .member-card .field-label{margin-bottom:6px}
  .member-card .field-input{min-height:100px;font-size:13.5px;width:100%}
  .member-card .field > textarea.blocker-input{flex:1;min-height:160px;resize:vertical}
  .member-card .field > .krl-block{flex:1;display:flex;flex-direction:column;min-height:160px}
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
const CONF_LABELS={high:'상',mid:'중',low:'하'};
const STATUS_LABELS={todo:'할 일',doing:'진행',done:'완료',blocked:'막힘'};
let sb=null;
let state={teams:[],currentTeamId:null,members:[],objectives:[],standups:{},routines:[],routineLogs:{},reviews:[],initiativeDailyLogs:{},selfId:null};
function getSelfId(){return localStorage.getItem(SELF_KEY)||null;}
function setSelfId(id){if(id==='__observer__'){localStorage.setItem(SELF_KEY,id);}else if(id){localStorage.setItem(SELF_KEY,id);}else{localStorage.removeItem(SELF_KEY);}state.selfId=id;}
function selfMember(){if(!state.selfId||state.selfId==='__observer__')return null;return state.members.find(m=>m.id===state.selfId)||null;}
function isObserver(){return state.selfId==='__observer__';}
// v11 — 본인만 본인이 작성한 것 수정 가능
function canEditAs(memberId){const s=selfMember();return !!(s&&memberId&&s.id===memberId);}
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
function isPinAuthValid(memberId){
  try{
    const o=JSON.parse(localStorage.getItem(PIN_AUTH_KEY)||'{}');
    const a=o[memberId];if(!a)return false;
    return (Date.now()-a)<PIN_AUTH_TTL;
  }catch(e){return false;}
}
function setPinAuth(memberId){
  try{
    const o=JSON.parse(localStorage.getItem(PIN_AUTH_KEY)||'{}');
    o[memberId]=Date.now();localStorage.setItem(PIN_AUTH_KEY,JSON.stringify(o));
  }catch(e){}
}
function clearPinAuth(memberId){
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
  const m=state.members.find(x=>x.id===memberId);if(m)m.pin_hash=h;
  markLocal('members',memberId);
  const{error}=await sb.from('members').update({pin_hash:h}).eq('id',memberId);
  if(error){showToast('PIN 저장 실패',true);return false;}
  return true;
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
  confidence:{title:'Confidence — 자신감 (Wodtke 원칙)',body:'OKR 시작 시점의 적정 위치는 "중". 매주 점검하며 변화 이유를 토의합니다.',no:['상(高)으로 시작 — 야심이 부족하다는 신호 (sandbagging)'],yes:['중(中)으로 시작 — 50~70% 확률, 적정 stretch'],check:'중(5~7/10) — 적정 · 상(9/10) — 너무 쉬움 · 하(3/10) — 위험·도움 요청'},
  cadence:{title:'운영 리듬 (Cadence)',body:'OKR은 한번 세우고 끝이 아닙니다. 정기 점검이 도구의 절반입니다.',no:null,yes:null,check:'매주 — Confidence 점검 + KR 진척 갱신 (10~15분) · 격주 — 1on1·막힘 점검 · 분기말 — 4질문 회고'},
  headline:{title:'오늘의 한 줄 — 회의 초점',body:'아침 스탠드업·본부 회의의 초점을 두괄식 한 문장으로. 모든 참석자가 회의 시작 전에 같은 그림을 보게 됩니다.',no:['"오늘 할 일들..." — 평면적 나열'],yes:['"가맹문의 KR 50% 돌파를 위해 인터뷰 결과 합의가 필요"','"AI MVP 시연 일정 확정"'],check:'두괄식 · 결론 · 의사결정 또는 합의 사항 명시'}
};
const CONF_HINTS={high:'9/10 — 거의 확실. 야심 부족 가능성 (sandbag 신호)',mid:'5~7/10 — 적정 stretch. 시작 시점 권장 위치 (Wodtke 원칙)',low:'3/10 이하 — 위험 신호. 도움 요청 권장'};
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
  const[mr,or,kr,ir,rr,rvr]=await Promise.all([
    sb.from('members').select('*').eq('team_id',tid).order('sort_order'),
    sb.from('objectives').select('*').eq('team_id',tid).order('sort_order'),
    sb.from('key_results').select('*').order('sort_order'),
    sb.from('initiatives').select('*').order('sort_order'),
    sb.from('routines').select('*').eq('team_id',tid).order('sort_order'),
    sb.from('reviews').select('*').eq('team_id',tid).order('updated_at',{ascending:false})
  ]);
  state.members=mr.data||[];
  const krs=kr.data||[],inits=ir.data||[];
  state.objectives=(or.data||[]).map(o=>({
    id:o.id,title:o.title,description:o.description||'',ownerId:o.owner_id,
    confidence:o.confidence||'mid',realityBlocker:o.reality_blocker||'',realityHelp:o.reality_help||'',
    keyResults:krs.filter(k=>k.objective_id===o.id).map(k=>({
      id:k.id,title:k.title,target:Number(k.target||0),current:Number(k.current||0),
      unit:k.unit||'',ownerId:k.owner_id,dueDate:k.due_date,
      confidence:k.confidence||'mid',realityBlocker:k.reality_blocker||'',realityHelp:k.reality_help||'',
      initiatives:inits.filter(i=>i.kr_id===k.id).map(i=>({
        id:i.id,title:i.title,ownerId:i.owner_id,status:i.status||'todo',
        dueDate:i.due_date,confidence:i.confidence||'mid',
        realityBlocker:i.reality_blocker||'',realityHelp:i.reality_help||''
      }))
    }))
  }));
  state.routines=rr.data||[];
  state.reviews=rvr.data||[];
  expanded=new Set(state.objectives.map(o=>o.id));
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
    if(i.ownerId===mid && i.status!=='done') list.push({...i,krId:k.id,krTitle:k.title});
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
  const opts=state.members.map(m=>{const hasPin=!!m.pin_hash;const authed=isPinAuthValid(m.id);return `<button class="btn btn-ghost" style="justify-content:flex-start;padding:10px 14px;font-size:13.5px;width:100%;" data-act="set-self" data-mid="${m.id}"><span style="width:22px;height:22px;border-radius:999px;background:${m.color};color:white;display:inline-grid;place-items:center;font-weight:700;font-size:11px;margin-right:10px;">${esc(m.name.slice(0,1).toUpperCase())}</span><span style="flex:1;text-align:left;font-weight:600;">${esc(m.name)}</span><span style="font-size:11px;color:var(--text-soft);margin-right:6px;">${esc(m.role||'')}</span>${hasPin?(authed?'<span style="font-size:10px;color:var(--growth);font-weight:700;">🔓 인증됨</span>':'<span style="font-size:10px;color:var(--text-soft);">🔐 PIN</span>'):'<span style="font-size:10px;color:var(--amber);">PIN 미설정</span>'}</button>`;}).join('');
  showModal(`
    <div class="modal-head"><div class="modal-title">진입 — 사용자 식별</div></div>
    <div class="modal-body">
      <div style="font-size:12.5px;color:var(--text-soft);margin-bottom:14px;line-height:1.55;">본인을 선택하시면 <b>오늘의 진입 브리핑</b>과 <b>담당 Initiative 체크리스트</b>가 본인 데이터 중심으로 구성됩니다. 헤더에서 언제든 변경 가능합니다.</div>
      <div style="display:flex;flex-direction:column;gap:6px;">${opts||'<div style="font-size:13px;color:var(--text-soft);text-align:center;padding:20px;">팀원이 등록되지 않았습니다. 관리 탭에서 추가 후 다시 진입하십시오.</div>'}</div>
      <div style="border-top:1px solid var(--line);margin-top:14px;padding-top:14px;"><button class="btn btn-ghost" style="width:100%;padding:10px 14px;font-size:13px;" data-act="set-self" data-mid="__observer__">관찰자 모드 — 본인 데이터 입력 없이 열람만</button></div>
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
  else{topLine='관찰자 모드 — 본인 데이터 입력 없이 열람 중';}
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

function setupRealtime(){
  sb.channel('okr-app-v2')
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
    .subscribe(s=>{if(s==='SUBSCRIBED'){connStatus='online';updateConnDot();}else if(['CHANNEL_ERROR','TIMED_OUT','CLOSED'].includes(s)){connStatus='offline';updateConnDot();}});
}
function onIDLChange(p){const r=p.new||p.old;if(!r)return;if(isLocal('initiative_daily_logs',`${r.initiative_id}-${r.member_id}-${r.date}`))return;if(!state.initiativeDailyLogs[r.date])state.initiativeDailyLogs[r.date]={};if(!state.initiativeDailyLogs[r.date][r.member_id])state.initiativeDailyLogs[r.date][r.member_id]={};if(p.eventType==='DELETE'){delete state.initiativeDailyLogs[r.date][r.member_id][r.initiative_id];}else{state.initiativeDailyLogs[r.date][r.member_id][r.initiative_id]={checked:!!r.checked,note:r.note||''};}if(currentView==='today'&&r.date===viewingDate)render();}
function onTeamsChange(p){const r=p.new||p.old;if(!r)return;if(isLocal('teams',r.id))return;if(p.eventType==='DELETE'){state.teams=state.teams.filter(t=>t.id!==r.id);}else{const i=state.teams.findIndex(t=>t.id===r.id);if(i>=0)state.teams[i]={...r};else state.teams.push({...r});state.teams.sort((a,b)=>(a.sort_order||0)-(b.sort_order||0));}render();}
function onMembersChange(p){const r=p.new||p.old;if(r.team_id&&r.team_id!==state.currentTeamId)return;if(isLocal('members',r.id))return;if(p.eventType==='DELETE'){state.members=state.members.filter(m=>m.id!==r.id);}else{const i=state.members.findIndex(m=>m.id===r.id);if(i>=0)state.members[i]={...r};else state.members.push({...r});state.members.sort((a,b)=>(a.sort_order||0)-(b.sort_order||0));}if(['today','manage','eval'].includes(currentView))render();}
function onObjectivesChange(p){const r=p.new||p.old;if(r.team_id&&r.team_id!==state.currentTeamId)return;if(isLocal('objectives',r.id))return;if(p.eventType==='DELETE'){state.objectives=state.objectives.filter(o=>o.id!==r.id);}else{const i=state.objectives.findIndex(o=>o.id===r.id);if(i>=0){Object.assign(state.objectives[i],{title:r.title,description:r.description,ownerId:r.owner_id,confidence:r.confidence||'mid',realityBlocker:r.reality_blocker||'',realityHelp:r.reality_help||''});}else{state.objectives.push({id:r.id,title:r.title,description:r.description||'',ownerId:r.owner_id,confidence:r.confidence||'mid',realityBlocker:r.reality_blocker||'',realityHelp:r.reality_help||'',keyResults:[]});expanded.add(r.id);}}render();}
function onKRChange(p){const r=p.new||p.old;if(isLocal('key_results',r.id))return;const o=state.objectives.find(x=>x.id===r.objective_id);if(!o&&p.eventType!=='DELETE')return;if(p.eventType==='DELETE'){if(o)o.keyResults=o.keyResults.filter(k=>k.id!==r.id);}else{if(!o)return;const idx=o.keyResults.findIndex(k=>k.id===r.id);const exist=idx>=0?o.keyResults[idx].initiatives:[];const oldCur=idx>=0?o.keyResults[idx].current:null;const kr={id:r.id,title:r.title,target:Number(r.target||0),current:Number(r.current||0),unit:r.unit||'',ownerId:r.owner_id,dueDate:r.due_date,confidence:r.confidence||'mid',realityBlocker:r.reality_blocker||'',realityHelp:r.reality_help||'',initiatives:exist};if(idx>=0)o.keyResults[idx]=kr;else o.keyResults.push(kr);
  // 충돌 감지: 본인이 같은 KR을 입력 중이고 다른 사람이 current를 바꿨다면 경고
  const focusedKR=document.activeElement?.dataset?.krid;
  if(focusedKR===r.id && oldCur!==null && oldCur!==kr.current && r.last_progress_by){
    const who=state.members.find(m=>m.id===r.last_progress_by);
    showToast(`⚠ ${who?who.name:'다른 사용자'}가 이 KR 진척을 ${oldCur}→${kr.current}로 변경했습니다. 본인 입력 충돌 가능`,true);
  }
}render();}
function onInitChange(p){const r=p.new||p.old;if(isLocal('initiatives',r.id))return;let kr=null;state.objectives.forEach(o=>o.keyResults.forEach(k=>{if(k.id===r.kr_id)kr=k;}));if(!kr){state.objectives.forEach(o=>o.keyResults.forEach(k=>{k.initiatives=k.initiatives.filter(i=>i.id!==r.id);}));render();return;}if(p.eventType==='DELETE'){kr.initiatives=kr.initiatives.filter(i=>i.id!==r.id);}else{const init={id:r.id,title:r.title,ownerId:r.owner_id,status:r.status||'todo',dueDate:r.due_date,confidence:r.confidence||'mid',realityBlocker:r.reality_blocker||'',realityHelp:r.reality_help||''};const i=kr.initiatives.findIndex(x=>x.id===r.id);if(i>=0)kr.initiatives[i]=init;else kr.initiatives.push(init);}render();}
function onStandupChange(p){const r=p.new||p.old;if(!r)return;if(r.team_id&&r.team_id!==state.currentTeamId)return;if(isLocal('standups',`${r.team_id}-${r.date}`))return;ensureStandup(r.date);if(p.eventType!=='DELETE')state.standups[r.date].headline=r.headline||'';if(currentView==='today'&&r.date===viewingDate){const ta=document.querySelector(`textarea[data-field="headline"][data-date="${viewingDate}"]`);if(ta&&document.activeElement!==ta)ta.value=r.headline||'';}}
function onEntryChange(p){const r=p.new||p.old;if(!r)return;if(r.team_id&&r.team_id!==state.currentTeamId)return;if(isLocal('standup_entries',`${r.team_id}-${r.date}-${r.member_id}`))return;ensureStandup(r.date);if(p.eventType==='DELETE'){delete state.standups[r.date].entries[r.member_id];}else{state.standups[r.date].entries[r.member_id]={yesterday:r.yesterday||'',today:r.today||'',blockers:r.blockers||'',helper_member_id:r.helper_member_id||'',helper_name:r.helper_name||'',support_type:r.support_type||'',support_detail:r.support_detail||''};}if(currentView==='today'&&r.date===viewingDate){['yesterday','today','blockers'].forEach(f=>{const ta=document.querySelector(`textarea[data-field="standup"][data-mid="${r.member_id}"][data-fieldname="${f}"][data-date="${viewingDate}"]`);if(ta&&document.activeElement!==ta)ta.value=(state.standups[r.date].entries[r.member_id]||{})[f]||'';});const c=document.querySelector(`[data-member-card="${r.member_id}"]`);if(c){c.classList.remove('remote-edit');void c.offsetWidth;c.classList.add('remote-edit');setTimeout(()=>c.classList.remove('remote-edit'),1500);}updateBlockerUI(r.date,r.member_id);}}
function onRoutineChange(p){const r=p.new||p.old;if(r.team_id&&r.team_id!==state.currentTeamId)return;if(isLocal('routines',r.id))return;if(p.eventType==='DELETE'){state.routines=state.routines.filter(x=>x.id!==r.id);}else{const i=state.routines.findIndex(x=>x.id===r.id);if(i>=0)state.routines[i]={...r};else state.routines.push({...r});}render();}
function onRoutineLogChange(p){const r=p.new||p.old;if(isLocal('routine_logs',`${r.routine_id}-${r.date}`))return;ensureRoutineLog(r.date);if(p.eventType==='DELETE'){delete state.routineLogs[r.date][r.routine_id];}else{state.routineLogs[r.date][r.routine_id]={completed:!!r.completed,note:r.note||''};}if(['today','routines'].includes(currentView)&&r.date===viewingDate)render();}
function onReviewChange(p){const r=p.new||p.old;if(r.team_id&&r.team_id!==state.currentTeamId)return;if(isLocal('reviews',r.id))return;if(p.eventType==='DELETE'){state.reviews=state.reviews.filter(x=>x.id!==r.id);}else{const i=state.reviews.findIndex(x=>x.id===r.id);if(i>=0)state.reviews[i]={...r};else state.reviews.unshift({...r});}if(currentView==='eval')render();}
function updateConnDot(){const e=document.getElementById('conn-dot');if(!e)return;e.className=`conn-dot ${connStatus}`;e.textContent=connStatus==='online'?'실시간 연결됨':connStatus==='connecting'?'연결 중':'오프라인';}

const debouncers={};
function debouncedSave(k,fn,d=400){clearTimeout(debouncers[k]);debouncers[k]=setTimeout(async()=>{markSaveStart();let err=false;try{await fn();}catch(e){err=true;}finally{markSaveEnd(err);}},d);}
async function logChange(et,eid,act,fn,bv,av,lb,category){
  // category: 'change' (의미 있는 변경, 기본) | 'check' (일일 체크 잡음 — 이력 모달에서 제외)
  try{await sb.from('audit_log').insert({team_id:state.currentTeamId,entity_type:et,entity_id:eid,entity_label:lb||'',action:act,field_name:fn||'',before_value:String(bv??''),after_value:String(av??''),category:category||'change'});}catch(e){}
}
async function saveTeam(t){debouncedSave(`tm-${t.id}`,async()=>{markLocal('teams',t.id);const{error}=await sb.from('teams').upsert({id:t.id,name:t.name,quarter:t.quarter,sort_order:t.sort_order||0});if(error)showToast('팀 저장 실패',true);});}
async function saveMember(m){debouncedSave(`mem-${m.id}`,async()=>{markLocal('members',m.id);const{error}=await sb.from('members').upsert({id:m.id,team_id:m.team_id||state.currentTeamId,name:m.name,role:m.role||'',color:m.color||'#6241F5',sort_order:state.members.findIndex(x=>x.id===m.id)});if(error)showToast('팀원 저장 실패',true);});}
async function saveObjective(o){debouncedSave(`obj-${o.id}`,async()=>{markLocal('objectives',o.id);const{error}=await sb.from('objectives').upsert({id:o.id,team_id:state.currentTeamId,title:o.title,description:o.description||'',owner_id:o.ownerId||null,confidence:o.confidence||'mid',reality_blocker:o.realityBlocker||'',reality_help:o.realityHelp||'',sort_order:state.objectives.findIndex(x=>x.id===o.id)});if(error)showToast('Objective 저장 실패',true);});}
async function saveKR(oid,kr){debouncedSave(`kr-${kr.id}`,async()=>{markLocal('key_results',kr.id);const o=state.objectives.find(x=>x.id===oid);const si=o?o.keyResults.findIndex(x=>x.id===kr.id):0;const me=selfMember();const{error}=await sb.from('key_results').upsert({id:kr.id,objective_id:oid,title:kr.title,target:kr.target,current:kr.current,unit:kr.unit||'',owner_id:kr.ownerId||null,due_date:kr.dueDate||null,confidence:kr.confidence||'mid',reality_blocker:kr.realityBlocker||'',reality_help:kr.realityHelp||'',last_progress_by:me?me.id:null,last_progress_at:new Date().toISOString(),sort_order:si});if(error)showToast('KR 저장 실패',true);});}
async function saveInitiative(krId,init){debouncedSave(`init-${init.id}`,async()=>{markLocal('initiatives',init.id);let kr=null;state.objectives.forEach(o=>o.keyResults.forEach(k=>{if(k.id===krId)kr=k;}));const si=kr?kr.initiatives.findIndex(i=>i.id===init.id):0;const{error}=await sb.from('initiatives').upsert({id:init.id,kr_id:krId,title:init.title,owner_id:init.ownerId||null,status:init.status||'todo',due_date:init.dueDate||null,confidence:init.confidence||'mid',reality_blocker:init.realityBlocker||'',reality_help:init.realityHelp||'',sort_order:si});if(error)showToast('이니셔티브 저장 실패',true);});}
async function saveHeadline(date,h){ensureStandup(date);state.standups[date].headline=h;debouncedSave(`hl-${date}`,async()=>{markLocal('standups',`${state.currentTeamId}-${date}`);const{error}=await sb.from('standups').upsert({team_id:state.currentTeamId,date,headline:h,updated_at:new Date().toISOString()},{onConflict:'team_id,date'});if(error)showToast('헤드라인 저장 실패',true);});}
async function saveEntry(date,mid,f,v){ensureStandup(date);if(!state.standups[date].entries[mid])state.standups[date].entries[mid]={yesterday:'',today:'',blockers:'',helper_member_id:'',helper_name:'',support_type:'',support_detail:''};state.standups[date].entries[mid][f]=v;debouncedSave(`en-${date}-${mid}`,async()=>{markLocal('standup_entries',`${state.currentTeamId}-${date}-${mid}`);const e=state.standups[date].entries[mid];const{error}=await sb.from('standup_entries').upsert({team_id:state.currentTeamId,date,member_id:mid,yesterday:e.yesterday||'',today:e.today||'',blockers:e.blockers||'',helper_member_id:e.helper_member_id||null,helper_name:e.helper_name||'',support_type:e.support_type||'',support_detail:e.support_detail||'',updated_at:new Date().toISOString()},{onConflict:'team_id,date,member_id'});if(error)showToast('스탠드업 저장 실패',true);});}
async function saveRoutine(r){debouncedSave(`rt-${r.id}`,async()=>{markLocal('routines',r.id);const{error}=await sb.from('routines').upsert({id:r.id,team_id:state.currentTeamId,title:r.title,description:r.description||'',owner_id:r.owner_id||null,frequency:r.frequency||'weekdays',days_of_week:r.days_of_week||[1,2,3,4,5],day_of_month:r.day_of_month||null,active:r.active!==false,sort_order:state.routines.findIndex(x=>x.id===r.id)});if(error)showToast('루틴 저장 실패',true);});}
async function saveRoutineLog(rid,date,c,n){ensureRoutineLog(date);state.routineLogs[date][rid]={completed:c,note:n!=null?n:(state.routineLogs[date][rid]?.note||'')};debouncedSave(`rtl-${rid}-${date}`,async()=>{markLocal('routine_logs',`${rid}-${date}`);const l=state.routineLogs[date][rid];const{error}=await sb.from('routine_logs').upsert({routine_id:rid,date,completed:!!l.completed,note:l.note||'',done_at:new Date().toISOString()},{onConflict:'routine_id,date'});if(error)showToast('루틴 기록 실패',true);});}
async function saveReview(r){markLocal('reviews',r.id);const{error}=await sb.from('reviews').upsert({id:r.id,team_id:state.currentTeamId,member_id:r.member_id||null,period:r.period,quarter:r.quarter,entity_type:r.entity_type||'member',entity_id:r.entity_id||r.member_id,what_worked:r.what_worked||'',what_struggled:r.what_struggled||'',what_learned:r.what_learned||'',next_try:r.next_try||'',summary:r.summary||'',reviewer:r.reviewer||'',updated_at:new Date().toISOString()});if(error){showToast('회고 저장 실패',true);return false;}return true;}
function lastReflectionFor(entityType,entityId,period){return state.reviews.find(r=>(r.entity_type||'member')===entityType && (r.entity_id||r.member_id)===entityId && r.period===period);}

function captureFocus(){
  const el=document.activeElement;
  if(!el||(el.tagName!=='INPUT'&&el.tagName!=='TEXTAREA'&&el.tagName!=='SELECT'))return null;
  const ds=el.dataset||{};
  const keys=['field','fieldname','mid','oid','krid','iid','eid','etype','date','rid','key','which'];
  const sig={tag:el.tagName,attrs:{}};
  keys.forEach(k=>{if(ds[k])sig.attrs[k]=ds[k];});
  if(Object.keys(sig.attrs).length===0)return null;
  try{sig.selStart=el.selectionStart;sig.selEnd=el.selectionEnd;}catch(e){}
  return sig;
}
function restoreFocus(sig){
  if(!sig)return;
  const parts=[sig.tag.toLowerCase()];
  Object.entries(sig.attrs).forEach(([k,v])=>{parts.push(`[data-${k.replace(/([A-Z])/g,'-$1').toLowerCase()}="${v.replace(/"/g,'\\"')}"]`);});
  const sel=parts.join('');
  const el=document.querySelector(sel);
  if(el){
    el.focus();
    if(sig.selStart!=null){try{el.setSelectionRange(sig.selStart,sig.selEnd);}catch(e){}}
  }
}
function render(){
  if(!initialized)return;
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
  app.innerHTML=html;
  document.body.classList.toggle('present',presentMode);
  restoreFocus(focusSig);
  // v13 — 모든 자동 확장 textarea 즉시 적용 (data-autogrow + data-krl-autogrow 통합)
  // 다중 timing — 첫 페인트 후 즉시 + 다음 프레임 + 200ms 후 (콘텐츠 lazy load 대응)
  const _autoGrowSweep=()=>{
    document.querySelectorAll('textarea[data-autogrow], textarea[data-krl-autogrow]').forEach(el=>{
      el.style.height='auto';el.style.height=(el.scrollHeight+2)+'px';
    });
  };
  requestAnimationFrame(_autoGrowSweep);
  setTimeout(_autoGrowSweep,0);
  setTimeout(_autoGrowSweep,200);
}

function renderHeader(){
  const t=currentTeam();const ini=teamInitial(t?.name);const col=teamColor(t);
  const tm=state.teams.map(x=>`<div class="team-menu-item ${x.id===state.currentTeamId?'active':''}" data-act="switch-team" data-tid="${x.id}"><span style="width:14px;height:14px;border-radius:4px;background:${teamColor(x)};display:inline-block;"></span><span style="flex:1;">${esc(x.name)}</span><span style="font-size:11px;color:var(--text-soft);">${esc(x.quarter)}</span></div>`).join('');
  return `<header class="app-header"><div class="hdr-inner"><div style="display:flex;align-items:center;gap:8px;position:relative;"><div class="brand" data-act="goto-home"><div class="brand-mark" style="background:${col};">${esc(ini)}</div><div class="brand-meta"><div class="brand-title">${esc(t?t.name:'팀')} OKR <button class="team-switch" data-act="toggle-team-menu">${state.teams.length>1?'전환 ▾':'팀 ▾'}</button></div><div class="brand-sub">${esc(t?t.quarter:'')} · 일일 스프린트</div></div></div><div class="team-menu" id="team-menu">${tm}<div class="team-menu-divider"></div><div class="team-menu-add" data-act="add-team">${I.plus} 새 팀 추가</div></div></div><nav class="tabs"><span id="conn-dot" class="conn-dot ${connStatus}">${connStatus==='online'?'실시간 연결됨':connStatus==='connecting'?'연결 중':'오프라인'}</span><button class="btn-mode" data-act="open-self-picker" title="본인 변경" style="font-size:11px;">${selfMember()?'👤 '+esc(selfMember().name):isObserver()?'관찰자':'본인 선택'}</button>${selfMember()?renderHelpBell():''}<span class="tab-divider"></span><button class="tab ${currentView==='today'?'active':''}" data-act="view" data-view="today">${I.cal} 오늘</button><button class="tab ${currentView==='dashboard'?'active':''}" data-act="view" data-view="dashboard">📊 대시보드</button><button class="tab ${currentView==='okr'?'active':''}" data-act="view" data-view="okr">${I.target} OKR</button><button class="tab ${currentView==='wbs'?'active':''}" data-act="view" data-view="wbs">🗓️ WBS</button><button class="tab ${currentView==='routines'?'active':''}" data-act="view" data-view="routines">${I.loop} 루틴</button><button class="tab ${currentView==='eval'?'active':''}" data-act="view" data-view="eval">${I.star} 회고</button><button class="tab ${currentView==='manage'?'active':''}" data-act="view" data-view="manage">${I.cog} 관리</button><span class="tab-divider"></span><button class="btn-mode" data-act="present">${presentMode?I.collapse:I.expand} ${presentMode?'일반':'발표'}</button><button class="btn-mode" data-act="toggle-dark" title="다크 모드">${isDark()?'☀️':'🌙'}</button></nav></div></header>`;
}

function renderToday(){
  const date=viewingDate;const isToday=date===todayKey();
  // v14 — 최근 7일 스탠드업 백그라운드 로드 (비동기)
  try{ensureRecentStandupsLoaded(date,7);}catch(e){}
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
    return renderTodayPresent(date,isToday,standup,todayRoutines,rl);
  }
  return `<div class="date-bar"><button class="date-nav-btn" data-act="date-shift" data-delta="-1">${I.chevLeft}</button><input type="date" class="date-input" value="${date}" data-act="date-set"><button class="date-nav-btn" data-act="date-shift" data-delta="1">${I.chevRight}</button>${isToday?'<span class="today-tag">오늘</span>':`<span class="past-tag">${date<todayKey()?'지난 회의':'미래 날짜'}</span><button class="btn btn-soft" data-act="date-today">오늘로</button>`}</div>
  ${renderObjectivePairRow()}
  ${dueItems.length>0?`<section class="card card-section"><div class="section-head"><span style="color:var(--amber);">${I.flag}</span><span class="section-title">이번 주 마감 (${dueItems.length}건)</span></div>${dueItems.map(d=>`<div style="padding:8px 0;display:flex;align-items:center;gap:10px;border-bottom:1px solid #F4F4F5;font-size:13px;"><span style="font-size:11px;padding:2px 8px;border-radius:999px;background:${d.type==='kr'?'#EEEAFE':'#F4F4F5'};color:${d.type==='kr'?C.primary:C.textSoft};font-weight:700;">${d.type==='kr'?'KR':'Init'}</span><span style="flex:1;">${esc(d.title)}</span><span style="font-size:11.5px;color:${isOverdue(d.dueDate,d.status)?C.warning:C.textSoft};font-weight:600;">${dueShort(d.dueDate)}${isOverdue(d.dueDate,d.status)?' · 지연':''}</span></div>`).join('')}</section>`:''}
  <div class="card-section"><div class="section-head"><span style="color:var(--primary);">${I.msg}</span><span class="section-title">${isToday?'오늘의 스탠드업':`${date} 스탠드업`}</span><span class="section-meta">· 어제 / 오늘 / 막힘</span></div>${state.members.length===0?'<div class="empty">팀원을 먼저 등록해주세요. <strong>관리</strong> 탭에서 추가할 수 있습니다.</div>':`<div class="member-grid">${state.members.map(m=>renderMemberCard(m,standup.entries?.[m.id]||{})).join('')}</div>`}</div>
  ${self?renderMyInitiatives(self):''}
  ${isToday&&todayRoutines.length>0?`<section class="card card-section"><div class="section-head"><span style="color:var(--primary);">${I.loop}</span><span class="section-title">오늘의 루틴</span><span class="section-meta">· 매일 챙겨야 할 일</span></div>${todayRoutines.map(r=>renderRoutineCheck(r,rl[r.id]||{})).join('')}</section>`:''}`;
}

// v12 — 발표 모드 (사람별 전환, 한 화면 fit)
function renderTodayPresent(date,isToday,standup,todayRoutines,rl){
  // presentMid 유효성 검증 — 메인 화면 최하단 팀원부터 (members 배열 마지막)
  if(!presentMid||!state.members.find(m=>m.id===presentMid)){
    presentMid=state.members[state.members.length-1].id;
  }
  const curIdx=state.members.findIndex(m=>m.id===presentMid);
  const cur=state.members[curIdx];
  const prevIdx=curIdx>0?curIdx-1:state.members.length-1;
  const nextIdx=curIdx<state.members.length-1?curIdx+1:0;
  const prev=state.members[prevIdx];
  const next=state.members[nextIdx];
  const entry=standup.entries?.[cur.id]||{};
  // 진척 보기 좋게 — KR 진행
  const memberRoutines=todayRoutines.filter(r=>r.owner_id===cur.id);
  return `<div class="date-bar"><button class="date-nav-btn" data-act="date-shift" data-delta="-1">${I.chevLeft}</button><input type="date" class="date-input" value="${date}" data-act="date-set"><button class="date-nav-btn" data-act="date-shift" data-delta="1">${I.chevRight}</button>${isToday?'<span class="today-tag">오늘</span>':`<span class="past-tag">${date<todayKey()?'지난 회의':'미래 날짜'}</span><button class="btn btn-soft" data-act="date-today">오늘로</button>`}<span style="margin-left:auto;font-size:11px;color:var(--text-soft);font-weight:600;">발표 모드 · ${curIdx+1}/${state.members.length}</span></div>
  <div class="present-member-nav">
    <button class="present-arrow" data-act="present-prev" title="이전 팀원 (${esc(prev.name)})">${I.chevLeft}</button>
    ${state.members.map(m=>{
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
function renderInlineKRRow(kr,oid){
  const p=pct(kr.current,kr.target);
  const o=state.members.find(m=>m.id===kr.ownerId);
  const overdue=isOverdue(kr.dueDate);
  const inits=kr.initiatives||[];
  // v15 — Initiative 인라인 표시 (메인 화면 상단 OKR 패널)
  const initsHtml=inits.length>0?`
    <div class="kr-init-inline" style="margin-top:8px;padding:6px 10px;background:#FAFAFB;border-left:3px solid #D9CFFB;border-radius:0 6px 6px 0;">
      <div style="font-size:10px;color:var(--text-soft);font-weight:700;letter-spacing:.3px;margin-bottom:4px;">⚡ INITIATIVES · ${inits.length}건</div>
      ${inits.map(i=>{
        const st=i.status||'todo';
        const stColors={doing:{bg:'#EEEAFE',fg:'#6241F5'},done:{bg:'#E6F6EE',fg:'#30AB62'},blocked:{bg:'#FCE8E9',fg:'#E5484D'}};
        const sc=stColors[st];
        const iOwn=state.members.find(m=>m.id===i.ownerId);
        const iOver=isOverdue(i.dueDate,st);
        // v15 — '할 일'(todo) 상태는 칩 숨김 (중복 표현 제거)
        const chip=sc?`<span style="font-size:10px;padding:1px 7px;border-radius:999px;background:${sc.bg};color:${sc.fg};font-weight:700;flex-shrink:0;white-space:nowrap;">${STATUS_LABELS[st]}</span>`:'';
        return `<div style="display:flex;align-items:center;gap:6px;padding:3px 0;font-size:12px;line-height:1.45;">
          ${chip}
          <span style="flex:1;min-width:0;color:${st==='done'?'var(--text-soft)':'var(--text)'};${st==='done'?'text-decoration:line-through;':''};overflow:hidden;text-overflow:ellipsis;white-space:nowrap;" title="${esc(i.title||'')}">${esc(i.title||'(제목 없음)')}</span>
          ${iOwn?`<span style="font-size:10.5px;color:var(--text-soft);font-weight:600;flex-shrink:0;">${esc(iOwn.name)}</span>`:''}
          ${i.dueDate?`<span style="font-size:10px;color:${iOver?'var(--warning)':'var(--text-soft)'};font-weight:600;flex-shrink:0;">${dueShort(i.dueDate)}${iOver?'·지연':''}</span>`:''}
        </div>`;
      }).join('')}
    </div>`:'';
  return `<div class="kr-inline-row" data-kr-id="${kr.id}" style="padding:10px 0;border-bottom:1px solid #F4F4F5;">
    <div style="display:flex;align-items:center;gap:8px;margin-bottom:6px;flex-wrap:wrap;">
      <span style="font-size:13.5px;font-weight:700;color:var(--text);flex:1;min-width:120px;line-height:1.4;">${esc(kr.title||'(제목 없음)')}</span>
      ${o?`<span class="kr-strip-owner" style="font-size:11px;">${esc(o.name)}</span>`:''}
      <span class="conf-chip ${kr.confidence||'mid'}" style="cursor:default;font-size:10.5px;padding:1px 7px;">${CONF_LABELS[kr.confidence||'mid']}</span>
    </div>
    <div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap;">
      <input type="number" class="kr-num-input" data-field="kr-current" data-oid="${oid}" data-krid="${kr.id}" value="${kr.current}" title="현재값 입력" style="width:74px;font-size:14px;padding:6px 9px;font-weight:700;" />
      <span style="color:var(--text-soft);font-size:12px;">/</span>
      <span style="font-size:13px;color:var(--text-soft);font-weight:600;">${kr.target}${kr.unit?' '+esc(kr.unit):''}</span>
      <span class="kr-strip-pct" data-kr-pct style="color:${progressColor(p)};font-weight:800;font-size:14px;margin-left:4px;">${p}%</span>
      ${kr.dueDate?`<span style="font-size:11px;color:${overdue?'var(--warning)':'var(--text-soft)'};font-weight:600;margin-left:auto;">${dueShort(kr.dueDate)}${overdue?' · 지연':''}</span>`:'<span style="margin-left:auto;"></span>'}
    </div>
    <div class="progress-track" data-kr-bar-wrap style="margin-top:7px;height:6px;border-radius:3px;background:#F0F0F2;overflow:hidden;"><div class="progress-fill" data-kr-bar style="width:${p}%;height:100%;background:${progressColor(p)};transition:width .2s;"></div></div>
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
  const owner=state.members.find(m=>m.id===o.ownerId);
  const objAvg=krs.length?Math.round(krs.reduce((s,k)=>s+pct(k.current,k.target),0)/krs.length):0;
  return `<section class="card" style="margin:0;display:flex;flex-direction:column;">
    <div class="section-head" style="align-items:flex-start;gap:8px;">
      <span style="color:var(--primary);flex-shrink:0;margin-top:2px;">${I.target}</span>
      <span class="section-title" style="line-height:1.45;flex:1;min-width:0;font-size:15px;">${esc(o.title||'(Objective 미작성)')}</span>
      <span style="font-size:11.5px;color:var(--text-soft);font-weight:600;flex-shrink:0;">평균 <strong style="color:${progressColor(objAvg)};font-size:13px;">${objAvg}%</strong></span>
    </div>
    ${owner?`<div style="font-size:11px;color:var(--text-soft);margin-bottom:4px;">담당 ${esc(owner.name)} · KR ${krs.length}개</div>`:`<div style="font-size:11px;color:var(--text-soft);margin-bottom:4px;">KR ${krs.length}개</div>`}
    <div style="flex:1;">
      ${krs.length===0?'<div style="font-size:13px;color:var(--text-soft);padding:14px 0;text-align:center;">KR을 추가하세요.</div>':krs.map(k=>renderInlineKRRow(k,o.id)).join('')}
    </div>
  </section>`;
}
function renderObjectivePairRow(){
  const first=state.objectives[0]||null;
  const second=state.objectives[1]||null;
  const extra=state.objectives.length>2;
  return `<div class="objectives-pair-row" style="display:grid;grid-template-columns:1fr 1fr;gap:14px;margin-top:14px;">
    ${renderObjectivePanel(first,0)}
    ${renderObjectivePanel(second,1)}
  </div>${extra?`<div style="font-size:11.5px;color:var(--text-soft);margin-top:6px;text-align:right;">+ ${state.objectives.length-2}개 Objective는 OKR 탭에서 확인 → <button class="btn-mode" data-act="view" data-view="okr" style="font-size:11px;padding:3px 9px;">OKR 탭으로</button></div>`:''}`;
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
  return `<div class="field"><div class="field-label"><span class="field-dot"></span><span class="field-name">어제 한 일</span></div>${summaryHtml}<textarea class="field-input" rows="3" data-autogrow placeholder="추가 메모 (선택) — 어제 진행한 내용을 자유롭게" data-field="standup" data-fieldname="yesterday" data-mid="${mid}" data-date="${viewingDate}"${ro}${tip}>${esc(memo||'')}</textarea></div>`;
}
function renderTodaySection(mid,memo,myInits,checks){
  const editable=canEditAs(mid);const ro=editable?'':' readonly';const dis=editable?'':' disabled';const tip=editable?'':' title="본인이 작성한 항목만 수정할 수 있습니다"';
  const checklistHtml=myInits.length===0
    ? ''
    : myInits.map(i=>{const c=!!checks[i.id]?.checked;return `<div style="display:flex;align-items:center;gap:8px;padding:5px 0;font-size:13.5px;"><button class="rt-check ${c?'checked':''}" style="width:18px;height:18px;border-width:1.5px;border-radius:4px;flex-shrink:0;" data-act="toggle-init-check" data-iid="${i.id}" data-mid="${mid}"${dis}${tip}>${c?I.check:''}</button><span style="${c?'text-decoration:line-through;color:var(--text-soft);':''}flex:1;${editable?'cursor:pointer;':''}line-height:1.45;" ${editable?`data-act="toggle-init-check" data-iid="${i.id}" data-mid="${mid}"`:''}>${esc(i.title)}</span><span style="font-size:11px;color:var(--text-soft);flex-shrink:0;">${esc(i.krTitle.slice(0,14))}${i.krTitle.length>14?'…':''}</span></div>`;}).join('');
  const initBlock=myInits.length>0?`<div style="background:#FAFAFA;border-radius:8px;padding:10px 12px;margin-bottom:8px;">${checklistHtml}</div>`:'';
  return `<div class="field"><div class="field-label"><span class="field-dot accent-primary"></span><span class="field-name accent-primary">오늘 할 일</span>${myInits.length>0?`<span style="font-size:11px;color:var(--text-soft);margin-left:auto;">담당 Initiative ${myInits.length}건</span>`:''}</div>${initBlock}<textarea class="field-input" rows="4" data-autogrow placeholder="추가 메모 — Initiative 외 오늘 목표를 자유롭게 (여러 줄 가능)" data-field="standup" data-fieldname="today" data-mid="${mid}" data-date="${viewingDate}"${ro}${tip}>${esc(memo||'')}</textarea></div>`;
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
    <textarea class="field-input blocker-input" rows="5" data-autogrow placeholder="현실적인 어려움과 도움이 필요한게 있나요?" data-field="standup" data-fieldname="blockers" data-mid="${mid}" data-date="${viewingDate}"${ro}${tip}>${esc(e.blockers||'')}</textarea>
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
    <div><h2 style="font-weight:800;font-size:23px;margin:0;">📊 분기 대시보드</h2><div style="font-size:13px;color:var(--text-soft);margin-top:2px;">${esc(t?.name||'')} · ${esc(t?.quarter||'')} · 임원 보고용 한판</div></div>
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
  return `<div class="card"><div class="section-head"><span class="section-title">Confidence 분포 ${guideHelp('confidence')}</span><span class="section-meta">· 중(stretch)이 이상적</span></div><div style="display:flex;align-items:center;gap:20px;flex-wrap:wrap;justify-content:center;"><svg width="160" height="160" viewBox="0 0 160 160">${arcs}<text x="${cx}" y="${cy-2}" text-anchor="middle" font-size="22" font-weight="800" fill="var(--text)">${idealPct}%</text><text x="${cx}" y="${cy+18}" text-anchor="middle" font-size="10" fill="var(--text-soft)">적정 stretch</text></svg><div style="display:flex;flex-direction:column;gap:8px;font-size:12.5px;"><div style="display:flex;align-items:center;gap:8px;"><span style="width:12px;height:12px;background:#30AB62;border-radius:3px;"></span><span style="color:var(--text-soft);">상 (sandbag 위험)</span><span style="font-weight:700;color:var(--growth);">${counts.high}</span></div><div style="display:flex;align-items:center;gap:8px;"><span style="width:12px;height:12px;background:#F59E0B;border-radius:3px;"></span><span style="color:var(--text-soft);">중 (적정)</span><span style="font-weight:700;color:var(--amber);">${counts.mid}</span></div><div style="display:flex;align-items:center;gap:8px;"><span style="width:12px;height:12px;background:#E5484D;border-radius:3px;"></span><span style="color:var(--text-soft);">하 (위험)</span><span style="font-weight:700;color:var(--warning);">${counts.low}</span></div></div></div>${counts.high>counts.mid+counts.low?`<div style="margin-top:10px;padding:8px 10px;background:var(--amber-soft);color:var(--amber);border-radius:6px;font-size:11.5px;line-height:1.5;">⚠ "상" 비율이 높습니다 — Sandbagging 신호일 수 있습니다 (KR 야심 부족)</div>`:''}</div>`;
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
  return `<div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:10px;flex-wrap:wrap;gap:10px;"><div><h2 style="font-weight:800;font-size:23px;margin:0;">분기 OKR</h2><div style="font-size:13px;color:var(--text-soft);margin-top:2px;">${esc(currentTeam()?.quarter||'')} · O ${oCnt}개 · KR ${totalKR}개${oWarn}${searchInfo}</div></div><div style="display:flex;gap:8px;align-items:center;flex-wrap:wrap;flex:1;justify-content:flex-end;">${searchBar}<button class="btn btn-primary" data-act="add-obj">${I.plus} Objective 추가</button></div></div>${guideChips}${isEmpty?renderGuideCard('objective')+`<div class="empty"><div style="margin-bottom:6px;">${I.target}</div>분기 도달점을 정의하는 것으로 시작하십시오. 위의 Objective 가이드 카드와 상단 가이드 칩(?)을 참고하세요.</div>`:(visibleObjs.length===0?`<div class="empty">검색 결과가 없습니다 — "${esc(okrSearchQuery)}"</div>`:visibleObjs.map((o,i)=>renderObjective(o,state.objectives.indexOf(o))).join(''))}`;
}
function renderObjective(o,idx){
  const open=expanded.has(o.id);const avg=o.keyResults.length?Math.round(o.keyResults.reduce((s,k)=>s+pct(k.current,k.target),0)/o.keyResults.length):0;
  const rk=`objective:${o.id}`;const ro=realityOpen.has(rk);const hr=(o.realityBlocker||o.realityHelp);
  return `<div class="obj-card" data-obj-id="${o.id}" draggable="true" data-drag-type="obj"><div class="obj-head"><span class="drag-handle" title="드래그로 순서 변경">⋮⋮</span><button class="obj-toggle btn-icon" data-act="toggle-obj" data-oid="${o.id}">${open?I.chevUp:I.chevDown}</button><div class="obj-body"><div class="obj-tags"><span class="tag-id">O${idx+1}</span>${guideHelp('objective')}<select class="tag-owner" data-field="obj-owner" data-oid="${o.id}"><option value="">담당 미지정</option>${state.members.map(m=>`<option value="${m.id}" ${o.ownerId===m.id?'selected':''}>${esc(m.name)}</option>`).join('')}</select>${renderConfChip('objective',o.id,o.confidence||'mid')}<button class="reality-toggle ${hr?'has-content':''}" data-act="toggle-reality" data-key="${rk}">${ro?'Reality ▴':'Reality ▾'}</button><button class="btn-icon" data-act="show-history" data-etype="objective" data-eid="${o.id}" title="이력">${I.clock}</button><button class="btn-icon" data-act="open-reflection" data-etype="objective" data-eid="${o.id}" data-period="final" title="회고 작성">${I.star}</button></div><input class="obj-title-input" data-field="obj-title" data-oid="${o.id}" value="${esc(o.title)}" placeholder="가슴 뛰는 도달점 (예: 편의점 창업 희망자들이 CU의 브리핑을 먼저 떠올리고 CU만을 희망한다)" /><input class="obj-desc-input" data-field="obj-desc" data-oid="${o.id}" placeholder="이 목표가 달성되었을 때 우리 팀·고객에게 어떤 변화가 있는가" value="${esc(o.description||'')}" />${ro?renderRealityBox('objective',o.id,o.realityBlocker,o.realityHelp):''}</div><div class="obj-avg-wrap"><div class="obj-avg-label">평균 진척</div><div class="obj-avg" data-obj-avg style="color:${progressColor(avg)};">${avg}%</div><div class="obj-actions"><button class="btn-icon" data-act="del-obj" data-oid="${o.id}" title="삭제">${I.trash}</button></div></div></div>${open?`<div class="obj-krs">${o.keyResults.length===0?`<div style="padding:14px 22px;">${renderGuideCard('kr')}</div>`:''}${o.keyResults.map((kr,ki)=>renderKR(o.id,kr,ki)).join('')}<div class="add-line"><button class="btn btn-soft" data-act="add-kr" data-oid="${o.id}">${I.plus} KR 추가</button>${o.keyResults.length>5?'<span style="font-size:11px;color:var(--warning);font-weight:600;margin-left:8px;align-self:center;">⚠ 권장 3~5개</span>':o.keyResults.length<3&&o.keyResults.length>0?'<span style="font-size:11px;color:var(--text-soft);margin-left:8px;align-self:center;">권장 3~5개 (현재 '+o.keyResults.length+'개)</span>':''}</div></div>`:''}</div>`;
}
function renderKR(oid,kr,idx){
  const p=pct(kr.current,kr.target);const rk=`kr:${kr.id}`;const ro=realityOpen.has(rk);const hr=(kr.realityBlocker||kr.realityHelp);const ko=!krCollapsed.has(kr.id);
  const mo=krMenuOpen.has(kr.id);
  const dueDisp=kr.dueDate?dueShort(kr.dueDate):'';
  const dueClr=isOverdue(kr.dueDate)?'var(--warning)':'var(--text-soft)';
  return `<div class="kr-row" data-kr-id="${kr.id}" data-oid="${oid}" draggable="true" data-drag-type="kr" data-drag-parent="${oid}"><div class="kr-row-line"><span class="drag-handle" style="font-size:13px;" title="드래그로 순서 변경">⋮⋮</span><span class="kr-id">KR${idx+1}</span>${guideHelp('kr')}<input class="kr-title-input" data-field="kr-title" data-oid="${oid}" data-krid="${kr.id}" value="${esc(kr.title)}" placeholder="결과 측정 기준 (예: 매장당 평균 매출 GS25 대비 200% / NPS 70점 / 가맹문의 월 1,000건)" /><select class="kr-owner-select" data-field="kr-owner" data-oid="${oid}" data-krid="${kr.id}"><option value="">담당</option>${state.members.map(m=>`<option value="${m.id}" ${kr.ownerId===m.id?'selected':''}>${esc(m.name)}</option>`).join('')}</select><input type="number" class="kr-num-input" data-field="kr-current" data-oid="${oid}" data-krid="${kr.id}" value="${kr.current}" /><span style="color:var(--text-soft);font-size:12px;">/</span><input type="number" class="kr-num-input" data-field="kr-target" data-oid="${oid}" data-krid="${kr.id}" value="${kr.target}" />${renderConfChip('kr',kr.id,kr.confidence||'mid')}<span class="kr-pct" data-kr-pct style="color:${progressColor(p)};">${p}%</span>${dueDisp?`<span style="font-size:11px;color:${dueClr};font-weight:600;">${dueDisp}</span>`:''}${hr?`<span style="font-size:10.5px;color:var(--primary);font-weight:600;" title="Reality 작성됨">●</span>`:''}<button class="kr-menu-btn ${mo?'open':''}" data-act="toggle-kr-menu" data-krid="${kr.id}" title="추가 메뉴">⋯</button><button class="btn-icon" data-act="toggle-kr" data-krid="${kr.id}" title="이니셔티브 ${kr.initiatives.length}건">${ko?I.chevUp:I.chevDown}${kr.initiatives.length>0?`<span style="font-size:9px;margin-left:2px;color:var(--primary);font-weight:700;">${kr.initiatives.length}</span>`:''}</button></div><div class="kr-bar-wrap"><div class="kr-bar-track"><div class="progress-fill" data-kr-bar style="width:${p}%;background:${progressColor(p)};"></div></div></div>${mo?`<div class="kr-menu-panel"><label>단위 <input class="kr-unit-input" placeholder="%, 점, 건" data-field="kr-unit" data-oid="${oid}" data-krid="${kr.id}" value="${esc(kr.unit||'')}" style="width:80px;" /></label><label>마감 <input type="date" class="kr-due-input ${isOverdue(kr.dueDate)?'overdue':''}" data-field="kr-due" data-oid="${oid}" data-krid="${kr.id}" value="${kr.dueDate||''}" /></label><button class="reality-toggle ${hr?'has-content':''}" data-act="toggle-reality" data-key="${rk}" style="font-size:11.5px;">${ro?'Reality ▴':'Reality ▾'}</button><button class="btn-icon" data-act="show-history" data-etype="key_result" data-eid="${kr.id}" title="이력">${I.clock} 이력</button><button class="btn-icon" data-act="open-reflection" data-etype="key_result" data-eid="${kr.id}" data-period="final" title="회고 작성">${I.star} 회고</button><button class="btn-icon" data-act="del-kr" data-oid="${oid}" data-krid="${kr.id}" title="삭제" style="color:var(--warning);margin-left:auto;">${I.trash} 삭제</button></div>`:''}${ro?renderRealityBox('kr',kr.id,kr.realityBlocker,kr.realityHelp):''}${ko?renderInitiativesList(kr):''}</div>`;
}
function renderInitiativesList(kr){return `<div class="init-list">${kr.initiatives.length===0?`<div style="padding:6px 0;">${renderGuideCard('initiative')}</div>`:kr.initiatives.map(i=>renderInitiative(kr.id,i)).join('')}<div class="add-init" data-act="add-init" data-krid="${kr.id}">${I.plus} 이니셔티브 추가</div></div>`;}
function renderInitiative(krId,init){const rk=`initiative:${init.id}`;const ro=realityOpen.has(rk);const hr=(init.realityBlocker||init.realityHelp);return `<div class="init-row" data-init-id="${init.id}" draggable="true" data-drag-type="init" data-drag-parent="${krId}"><span class="drag-handle" style="font-size:11px;" title="드래그로 순서 변경">⋮⋮</span><select class="init-status ${init.status||'todo'}" data-field="init-status" data-krid="${krId}" data-iid="${init.id}">${Object.entries(STATUS_LABELS).map(([k,v])=>`<option value="${k}" ${init.status===k?'selected':''}>${v}</option>`).join('')}</select><input class="init-title-input" data-field="init-title" data-krid="${krId}" data-iid="${init.id}" value="${esc(init.title)}" placeholder="구체 액션 (예: AI 어시스턴트 MVP 개발 / 가맹점주 인터뷰 30건 / 경쟁사 매출 분석)" /><select class="kr-owner-select" data-field="init-owner" data-krid="${krId}" data-iid="${init.id}" style="font-size:11px;"><option value="">담당</option>${state.members.map(m=>`<option value="${m.id}" ${init.ownerId===m.id?'selected':''}>${esc(m.name)}</option>`).join('')}</select><input type="date" class="init-due ${isOverdue(init.dueDate,init.status)?'overdue':''}" data-field="init-due" data-krid="${krId}" data-iid="${init.id}" value="${init.dueDate||''}" />${renderConfChip('initiative',init.id,init.confidence||'mid')}<button class="reality-toggle ${hr?'has-content':''}" data-act="toggle-reality" data-key="${rk}">${ro?'R ▴':'R ▾'}</button><button class="btn-icon" data-act="show-history" data-etype="initiative" data-eid="${init.id}" title="이력">${I.clock}</button><button class="btn-icon" data-act="del-init" data-krid="${krId}" data-iid="${init.id}">${I.x}</button>${ro?`<div style="width:100%;">${renderRealityBox('initiative',init.id,init.realityBlocker,init.realityHelp)}</div>`:''}</div>`;}
function renderConfChip(et,eid,lv){const l=lv||'mid';return `<span class="conf-chip ${l}" data-act="cycle-conf" data-etype="${et}" data-eid="${eid}" title="${esc(CONF_HINTS[l])} (클릭하여 변경)">${CONF_LABELS[l]}</span>`;}
function renderRealityBox(et,eid,b,h){return `<div class="reality-box"><div class="reality-row"><div class="reality-label">현실적 어려움</div><textarea class="reality-input" rows="2" placeholder="지금 막혀 있는 점은?" data-field="reality-blocker" data-etype="${et}" data-eid="${eid}">${esc(b||'')}</textarea></div><div class="reality-row"><div class="reality-label">지원 요청</div><textarea class="reality-input" rows="2" placeholder="어떤 지원이 있으면 풀릴까요? (사람·예산·의사결정 등)" data-field="reality-help" data-etype="${et}" data-eid="${eid}">${esc(h||'')}</textarea></div></div>`;}

function renderRoutinesView(){
  const date=viewingDate;const isToday=date===todayKey();const tr=activeRoutinesForDate(date);const log=state.routineLogs[date]||{};
  return `<div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:14px;flex-wrap:wrap;gap:10px;"><div><h2 style="font-weight:800;font-size:23px;margin:0;">루틴 (반복 업무)</h2><div style="font-size:13px;color:var(--text-soft);margin-top:2px;">매일 매주 매월 반복되는 업무를 한 번에 관리합니다.</div></div><button class="btn btn-primary" data-act="add-routine">${I.plus} 루틴 추가</button></div><section class="card"><div class="section-head"><span class="section-title">${isToday?'오늘의 루틴':`${date} 루틴`}</span><span class="section-meta">· ${tr.length}건</span></div>${tr.length===0?'<div style="font-size:13px;color:var(--text-soft);padding:6px 0;">이 날짜에 해당하는 루틴이 없습니다.</div>':tr.map(r=>renderRoutineCheck(r,log[r.id]||{})).join('')}</section><section class="card card-section"><div class="section-head"><span class="section-title">루틴 관리</span><span class="section-meta">· 전체 ${state.routines.length}건</span></div>${state.routines.length===0?'<div style="font-size:13px;color:var(--text-soft);padding:6px 0;">루틴을 추가하세요. 예: "일일 매출 보고", "주간 본부 회의 준비", "월말 결산 점검"</div>':state.routines.map(r=>renderRoutineMng(r)).join('')}</section>`;
}
function renderRoutineMng(r){const dn=['월','화','수','목','금','토','일'];return `<div class="rt-mng-row ${r.active===false?'inactive':''}"><input class="rt-input" data-field="rt-title" data-rid="${r.id}" value="${esc(r.title)}" placeholder="루틴 이름" /><select class="rt-input" data-field="rt-frequency" data-rid="${r.id}"><option value="daily" ${r.frequency==='daily'?'selected':''}>매일</option><option value="weekdays" ${r.frequency==='weekdays'?'selected':''}>평일</option><option value="weekly" ${r.frequency==='weekly'?'selected':''}>요일 지정</option><option value="monthly" ${r.frequency==='monthly'?'selected':''}>매월 특정일</option></select><select class="rt-input" data-field="rt-owner" data-rid="${r.id}"><option value="">담당</option>${state.members.map(m=>`<option value="${m.id}" ${r.owner_id===m.id?'selected':''}>${esc(m.name)}</option>`).join('')}</select><button class="btn-icon" data-act="del-routine" data-rid="${r.id}">${I.trash}</button>${r.frequency==='weekly'||r.frequency==='custom'?`<div style="grid-column:1/-1;display:flex;gap:6px;flex-wrap:wrap;align-items:center;"><span style="font-size:11px;color:var(--text-soft);">요일:</span>${dn.map((d,i)=>`<button class="btn-mode" data-act="toggle-day" data-rid="${r.id}" data-day="${i+1}" style="${(r.days_of_week||[]).includes(i+1)?'background:var(--primary-soft);color:var(--primary);font-weight:600;':''}padding:3px 9px;font-size:11.5px;">${d}</button>`).join('')}</div>`:''}${r.frequency==='monthly'?`<div style="grid-column:1/-1;display:flex;gap:6px;align-items:center;"><span style="font-size:11px;color:var(--text-soft);">매월</span><input type="number" min="1" max="31" class="rt-input" style="width:60px;" data-field="rt-day-of-month" data-rid="${r.id}" value="${r.day_of_month||1}"/><span style="font-size:11px;color:var(--text-soft);">일</span></div>`:''}</div>`;}

function memberAnalytics(mid){
  let okrs=0,okrSum=0,krs=0,krSum=0,inits=0,initsDone=0,initsBlocked=0;
  let confSum=0,confCnt=0;const cMap={high:3,mid:2,low:1};
  state.objectives.forEach(o=>{
    if(o.ownerId===mid){okrs++;const a=o.keyResults.length?o.keyResults.reduce((s,k)=>s+pct(k.current,k.target),0)/o.keyResults.length:0;okrSum+=a;confSum+=cMap[o.confidence||'mid'];confCnt++;}
    o.keyResults.forEach(k=>{
      if(k.ownerId===mid){krs++;krSum+=pct(k.current,k.target);confSum+=cMap[k.confidence||'mid'];confCnt++;}
      k.initiatives.forEach(i=>{if(i.ownerId===mid){inits++;if(i.status==='done')initsDone++;if(i.status==='blocked')initsBlocked++;confSum+=cMap[i.confidence||'mid'];confCnt++;}});
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
  const searchBar=`<div class="search-bar" style="max-width:300px;"><span style="color:var(--text-soft);">🔍</span><input type="text" id="refl-search" placeholder="회고 내용 검색" value="${esc(reflSearchQuery)}" />${reflSearchQuery?'<span class="clear" data-act="clear-refl-search">✕</span>':''}</div>`;
  return `<div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:14px;flex-wrap:wrap;gap:10px;"><div><h2 style="font-weight:800;font-size:23px;margin:0;">회고 · 학습 정리</h2><div style="font-size:13px;color:var(--text-soft);margin-top:2px;">${esc(currentTeam()?.quarter||'')} · 팀원 ${state.members.length}명 · O ${state.objectives.length}개${q?` · 검색 결과 ${filteredReviews.length}건`:''}</div></div><div style="display:flex;gap:8px;flex-wrap:wrap;align-items:center;">${searchBar}<button class="btn btn-soft" data-act="export-excel">${I.download} Excel 내보내기</button><button class="btn btn-ghost" data-act="print-report">${I.print} 리포트 출력</button></div></div>
  <div style="font-size:12px;color:var(--text-soft);background:#FAFAFA;padding:10px 14px;border-radius:8px;margin-bottom:14px;line-height:1.55;">📌 OKR은 <b>야심을 세우고 학습하는 도구</b>입니다. 이 영역은 <b>인사평가가 아닌 회고</b>를 위한 공간입니다 (Doerr·Grove 원칙). 점수 대신 "잘 된 것 / 어려웠던 것 / 배운 것 / 다음 시도"를 정리하세요.</div>
  <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(180px,1fr));gap:8px;margin-bottom:14px;">
    <div style="padding:11px 13px;border:1px solid var(--line);border-radius:10px;background:white;"><div style="font-size:10.5px;font-weight:700;color:var(--primary);margin-bottom:3px;">매주 (10~15분)</div><div style="font-size:12px;color:var(--text-soft);line-height:1.5;">Confidence 점검 + KR 진척 갱신. 변화 이유 토의.</div></div>
    <div style="padding:11px 13px;border:1px solid var(--line);border-radius:10px;background:white;"><div style="font-size:10.5px;font-weight:700;color:var(--primary);margin-bottom:3px;">격주 (1on1)</div><div style="font-size:12px;color:var(--text-soft);line-height:1.5;">막힘 · 도움 요청 점검. 팀원 코칭.</div></div>
    <div style="padding:11px 13px;border:1px solid var(--line);border-radius:10px;background:white;"><div style="font-size:10.5px;font-weight:700;color:var(--primary);margin-bottom:3px;">분기말 (회고)</div><div style="font-size:12px;color:var(--text-soft);line-height:1.5;">4질문 회고 + 다음 분기 OKR 정의.</div></div>
  </div>
  ${state.members.length===0?'<div class="empty">팀원을 먼저 등록해주세요.</div>':`<section class="card"><div class="section-head"><span class="section-title">팀원 종합 회고</span><span class="section-meta">· 분기 학습 정리</span></div><div class="perf-grid">${state.members.map(m=>renderPerfCard(m)).join('')}</div></section>`}
  ${state.objectives.length>0?`<section class="card card-section"><div class="section-head"><span class="section-title">Objective · KR 회고</span><span class="section-meta">· OKR 탭에서도 시계 옆 회고 버튼으로 진입 가능</span></div>${state.objectives.map((o,oi)=>renderObjReflectionRow(o,oi)).join('')}</section>`:''}
  ${filteredReviews.length>0?`<section class="card card-section"><div class="section-head"><span class="section-title">${q?'검색된 회고':'분기별 회고 이력'}</span><span class="section-meta">· ${filteredReviews.length}건${quarters.length>1?` · ${quarters.length}개 분기`:''}</span></div>${quarters.map(qt=>{const arr=byQuarter[qt];return `<div style="margin-bottom:14px;">${quarters.length>1?`<div style="font-size:11px;font-weight:700;color:var(--primary);margin-bottom:6px;padding:4px 10px;background:var(--primary-soft);border-radius:6px;display:inline-block;">📅 ${esc(qt)} · ${arr.length}건</div>`:''}${arr.slice(0,15).map(r=>{const et=r.entity_type||'member';let label='';if(et==='member'){const m=state.members.find(x=>x.id===(r.entity_id||r.member_id));label=m?m.name:'(삭제됨)';}else if(et==='objective'){const o=state.objectives.find(x=>x.id===r.entity_id);label=o?`O · ${o.title}`:'(삭제)';}else if(et==='key_result'){let k=null;state.objectives.forEach(o=>o.keyResults.forEach(x=>{if(x.id===r.entity_id)k=x;}));label=k?`KR · ${k.title}`:'(삭제)';}const preview=q?(r.summary||r.what_worked||r.what_struggled||r.what_learned||'').slice(0,80):'';return `<div class="review-list-item"><div style="display:flex;align-items:center;gap:8px;flex:1;min-width:0;flex-wrap:wrap;"><span class="review-period-tag ${r.period}">${r.period==='mid'?'중간':'최종'}</span><span style="font-size:10px;padding:2px 6px;border-radius:5px;background:#F4F4F5;color:var(--text-soft);font-weight:700;">${REFL_ENTITY_LABELS[et]||et}</span><span style="font-weight:600;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">${esc(label)}</span><span style="color:var(--text-soft);font-size:11px;flex-shrink:0;">${formatTs(r.updated_at)}</span>${preview?`<div style="width:100%;font-size:11.5px;color:var(--text-soft);margin-top:4px;line-height:1.5;">${highlightSearch(preview,q)}…</div>`:''}</div><button class="btn btn-ghost" data-act="open-reflection" data-etype="${et}" data-eid="${r.entity_id||r.member_id}" data-period="${r.period}">열기</button></div>`;}).join('')}</div>`;}).join('')}</section>`:(q?'<div class="empty">검색 결과가 없습니다.</div>':'')}`;
}
function renderObjReflectionRow(o,oi){
  const oMid=lastReflectionFor('objective',o.id,'mid'),oFin=lastReflectionFor('objective',o.id,'final');
  const krRows=o.keyResults.map((k,ki)=>{const m=lastReflectionFor('key_result',k.id,'mid'),f=lastReflectionFor('key_result',k.id,'final');return `<div style="display:flex;align-items:center;gap:8px;padding:8px 0;border-top:1px solid #F4F4F5;font-size:12.5px;"><span style="color:var(--text-soft);font-weight:600;min-width:32px;">KR${ki+1}</span><span style="flex:1;overflow:hidden;text-overflow:ellipsis;">${esc(k.title)}</span><button class="btn-mode" style="font-size:11px;padding:3px 9px;${m?'background:var(--amber-soft);color:var(--amber);':''}" data-act="open-reflection" data-etype="key_result" data-eid="${k.id}" data-period="mid">중간 ${m?'✓':''}</button><button class="btn-mode" style="font-size:11px;padding:3px 9px;${f?'background:var(--primary-soft);color:var(--primary);font-weight:600;':''}" data-act="open-reflection" data-etype="key_result" data-eid="${k.id}" data-period="final">최종 ${f?'✓':''}</button></div>`;}).join('');
  return `<div style="padding:14px;border:1px solid var(--line);border-radius:10px;margin-bottom:10px;"><div style="display:flex;align-items:center;gap:8px;margin-bottom:4px;"><span class="tag-id">O${oi+1}</span><span style="font-weight:700;flex:1;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">${esc(o.title)}</span><button class="btn-mode" style="font-size:11px;padding:3px 9px;${oMid?'background:var(--amber-soft);color:var(--amber);':''}" data-act="open-reflection" data-etype="objective" data-eid="${o.id}" data-period="mid">O 중간회고 ${oMid?'✓':''}</button><button class="btn-mode" style="font-size:11px;padding:3px 9px;${oFin?'background:var(--primary-soft);color:var(--primary);font-weight:600;':''}" data-act="open-reflection" data-etype="objective" data-eid="${o.id}" data-period="final">O 최종회고 ${oFin?'✓':''}</button></div>${krRows}</div>`;
}
function renderPerfCard(m){
  const a=memberAnalytics(m.id);
  const mid=lastReflectionFor('member',m.id,'mid'),fin=lastReflectionFor('member',m.id,'final');
  return `<div class="perf-card"><div class="perf-head"><div class="avatar" style="background:${m.color};">${esc(m.name.slice(0,1).toUpperCase())}</div><div><div class="perf-name">${esc(m.name)}</div><div class="perf-role">${esc(m.role||'')}</div></div></div><div class="perf-stats"><div class="perf-stat"><div class="perf-stat-label">담당 KR</div><div class="perf-stat-value" style="color:${progressColor(a.krAvg)};">${a.krs}<span style="font-size:12px;color:var(--text-soft);font-weight:500;">개 · ${a.krAvg}%</span></div></div><div class="perf-stat"><div class="perf-stat-label">이니셔티브</div><div class="perf-stat-value">${a.initsDone}<span style="font-size:12px;color:var(--text-soft);font-weight:500;">/${a.inits} 완료</span></div></div></div><div class="perf-meta">담당 Objective: ${a.okrs}개 (평균 ${a.okrAvg}%) · 막힌 Init: ${a.initsBlocked}건</div><div class="perf-actions"><button class="btn btn-soft" data-act="open-reflection" data-etype="member" data-eid="${m.id}" data-period="mid">중간 회고 ${mid?'✓':''}</button><button class="btn btn-primary" data-act="open-reflection" data-etype="member" data-eid="${m.id}" data-period="final">최종 회고 ${fin?'✓':''}</button></div></div>`;
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
function renderWBS(){
  const t=currentTeam();
  const range=parseQuarterRange(t?.quarter);
  const startD=range.start,endD=range.end;
  const totalDays=daysBetween(startD,endD)+1;
  const todayD=todayKey();
  const todayOffset=Math.max(0,Math.min(totalDays,daysBetween(startD,todayD)));
  // px per day — 화면 폭에 맞춰 자동
  const pxPerDay=10;
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
  // 주 헤더 — 매주 월요일 표시
  for(let i=0;i<totalDays;i++){
    const d=new Date(startDate);d.setDate(d.getDate()+i);
    const dow=d.getDay();
    if(dow===1||i===0){
      const dd=`${d.getMonth()+1}/${d.getDate()}`;
      weekHeader+=`<div style="position:absolute;left:${i*pxPerDay}px;top:28px;height:24px;font-size:10px;color:var(--text-soft);padding-left:3px;border-left:1px solid #EDEDEE;width:${pxPerDay*7}px;display:flex;align-items:center;">${dd}</div>`;
    }
    // 주말 음영
    if(dow===0||dow===6){
      weekHeader+=`<div style="position:absolute;left:${i*pxPerDay}px;top:52px;width:${pxPerDay}px;bottom:0;background:rgba(0,0,0,.02);pointer-events:none;z-index:0;"></div>`;
    }
  }

  // 데이터 행 빌드
  const rows=[];
  const expandSet=window._wbsCollapsed||(window._wbsCollapsed=new Set());
  state.objectives.forEach(o=>{
    const objKRs=o.keyResults||[];
    const krDues=objKRs.map(k=>k.dueDate).filter(Boolean).sort();
    const objEnd=krDues.length>0?krDues[krDues.length-1]:endD;
    const objAvg=objKRs.length?Math.round(objKRs.reduce((s,k)=>s+pct(k.current,k.target),0)/objKRs.length):0;
    rows.push({type:'O',id:o.id,label:o.title||'(Objective)',level:0,start:startD,end:objEnd,owner:o.ownerId,progress:objAvg,confidence:o.confidence});
    if(expandSet.has('O:'+o.id))return; // 접힘
    objKRs.forEach(k=>{
      const krP=pct(k.current,k.target);
      rows.push({type:'KR',id:k.id,label:k.title||'(KR)',level:1,start:startD,end:k.dueDate||endD,owner:k.ownerId,progress:krP,confidence:k.confidence,objId:o.id});
      if(expandSet.has('KR:'+k.id))return;
      (k.initiatives||[]).forEach(i=>{
        rows.push({type:'I',id:i.id,label:i.title||'(Initiative)',level:2,start:startD,end:i.dueDate||endD,owner:i.ownerId,status:i.status||'todo',objId:o.id,krId:k.id,confidence:i.confidence});
      });
    });
  });

  // 좌측 라벨 + 우측 바 한 줄씩 그리기
  let labelsHtml='',barsHtml='';
  const ROW_H=34;
  rows.forEach((r,idx)=>{
    const owner=state.members.find(m=>m.id===r.owner);
    const ownerChip=owner?`<span class="kr-strip-owner" style="font-size:10px;padding:1px 6px;">${esc(owner.name)}</span>`:'';
    const lvIndent=r.level*16+8;
    let icon='',badge='';
    if(r.type==='O'){icon='🎯';badge=`<span style="background:#FFE9A8;color:#946800;font-size:9px;padding:1px 6px;border-radius:999px;font-weight:700;">O</span>`;}
    else if(r.type==='KR'){icon='📌';badge=`<span style="background:#EEEAFE;color:#6241F5;font-size:9px;padding:1px 6px;border-radius:999px;font-weight:700;">KR</span>`;}
    else{icon='⚡';badge=`<span style="background:#D9CFFB;color:#3A2670;font-size:9px;padding:1px 6px;border-radius:999px;font-weight:700;">Init</span>`;}
    const canCollapse=r.type==='O'||r.type==='KR';
    const collapseKey=r.type+':'+r.id;
    const isCollapsed=expandSet.has(collapseKey);
    const toggleBtn=canCollapse?`<button class="btn-icon" data-act="wbs-toggle" data-key="${collapseKey}" style="padding:0 4px;font-size:10px;flex-shrink:0;">${isCollapsed?'▶':'▼'}</button>`:`<span style="display:inline-block;width:14px;"></span>`;
    labelsHtml+=`<div class="wbs-label-row" style="height:${ROW_H}px;display:flex;align-items:center;gap:6px;padding:0 10px 0 ${lvIndent}px;border-bottom:1px solid #F4F4F5;font-size:${r.type==='O'?'13':r.type==='KR'?'12.5':'12'}px;${r.type==='O'?'background:#FFFDF2;font-weight:700;':r.type==='KR'?'font-weight:600;':''}">${toggleBtn}<span style="flex-shrink:0;">${icon}</span>${badge}<span style="flex:1;min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;" title="${esc(r.label)}">${esc(r.label)}</span>${ownerChip}</div>`;

    // 바 위치
    const sOff=Math.max(0,daysBetween(startD,r.start));
    const eOff=Math.min(totalDays-1,daysBetween(startD,r.end));
    const bw=Math.max(pxPerDay,(eOff-sOff+1)*pxPerDay);
    const bl=sOff*pxPerDay;
    // 색
    let bg='#A8A8B0',fg='white',label='';
    if(r.type==='O'){bg='linear-gradient(90deg,#FFCE5B,#FFB02E)';fg='#3D2F00';label=`${r.progress}%`;}
    else if(r.type==='KR'){
      const col=progressColor(r.progress);
      bg=`linear-gradient(90deg,${col},${col}dd)`;fg='white';label=`${r.progress}%`;
    }
    else{
      const stCol={todo:'#A8A8B0',doing:'#6241F5',done:'#30AB62',blocked:'#E5484D'};
      bg=stCol[r.status]||'#A8A8B0';fg='white';
      label=r.status==='done'?'완료':r.status==='blocked'?'막힘':r.status==='doing'?'진행':'';
    }
    const overdue=isOverdue(r.end,r.status);
    const dueLabel=r.end&&r.end!==endD?` · ~${dueShort(r.end)}${overdue&&r.type==='I'?'·지연':''}`:'';
    barsHtml+=`<div class="wbs-bar-row" style="height:${ROW_H}px;position:relative;border-bottom:1px solid #F4F4F5;">
      <div class="wbs-bar" data-act="wbs-jump" data-type="${r.type}" data-id="${r.id}" data-oid="${r.objId||r.id}" data-krid="${r.krId||(r.type==='KR'?r.id:'')}" style="position:absolute;left:${bl}px;top:5px;width:${bw}px;height:24px;background:${bg};color:${fg};border-radius:5px;display:flex;align-items:center;padding:0 8px;font-size:10.5px;font-weight:700;cursor:pointer;box-shadow:0 1px 2px rgba(0,0,0,.1);overflow:hidden;white-space:nowrap;text-overflow:ellipsis;${overdue&&r.type==='I'?'border:1.5px solid #B71D24;':''}" title="${esc(r.label)}${dueLabel}">${label?esc(label):esc(r.label).slice(0,30)}</div>
    </div>`;
  });

  if(rows.length===0){
    return `<div style="margin-bottom:14px;"><h2 style="font-weight:800;font-size:23px;margin:0;">WBS · 간트 차트</h2><div style="font-size:13px;color:var(--text-soft);margin-top:2px;">Objective → KR → Initiative 일정 한판 보기</div></div><div class="empty">OKR 탭에서 Objective와 KR을 먼저 추가하세요.</div>`;
  }

  return `<div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:14px;flex-wrap:wrap;gap:10px;">
    <div><h2 style="font-weight:800;font-size:23px;margin:0;">WBS · 간트 차트</h2><div style="font-size:13px;color:var(--text-soft);margin-top:2px;">${esc(t?.quarter||'')} · ${range.start.slice(5).replace('-','/')} ~ ${range.end.slice(5).replace('-','/')} (총 ${totalDays}일)</div></div>
    <div style="display:flex;gap:6px;align-items:center;font-size:11.5px;color:var(--text-soft);flex-wrap:wrap;">
      <span style="display:inline-flex;align-items:center;gap:4px;"><span style="width:12px;height:10px;border-radius:3px;background:linear-gradient(90deg,#FFCE5B,#FFB02E);"></span>Objective</span>
      <span style="display:inline-flex;align-items:center;gap:4px;"><span style="width:12px;height:10px;border-radius:3px;background:#6241F5;"></span>KR</span>
      <span style="display:inline-flex;align-items:center;gap:4px;"><span style="width:12px;height:10px;border-radius:3px;background:#6241F5;"></span>진행</span>
      <span style="display:inline-flex;align-items:center;gap:4px;"><span style="width:12px;height:10px;border-radius:3px;background:#30AB62;"></span>완료</span>
      <span style="display:inline-flex;align-items:center;gap:4px;"><span style="width:12px;height:10px;border-radius:3px;background:#E5484D;"></span>막힘</span>
      <span style="display:inline-flex;align-items:center;gap:4px;"><span style="width:12px;height:10px;border-radius:3px;background:#A8A8B0;"></span>할 일</span>
      <span style="display:inline-flex;align-items:center;gap:6px;margin-left:4px;"><span style="display:inline-block;width:2px;height:14px;background:var(--warning);"></span>오늘</span>
    </div>
  </div>
  <div class="wbs-container" style="display:grid;grid-template-columns:340px 1fr;gap:0;border:1px solid var(--line);border-radius:10px;overflow:hidden;background:white;">
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
    💡 막대 클릭 → 해당 항목으로 점프 / ▶▼ 클릭 → 하위 항목 접기·펼치기 / Initiative 마감 지연 시 빨간 테두리
  </div>`;
}

function renderManage(){
  const t=currentTeam();
  return `<section class="card"><div class="section-head" style="margin-bottom:14px;"><span class="section-title">현재 팀 정보</span><span class="section-meta">· 헤더에서 다른 팀으로 전환 가능</span></div><div class="manage-grid"><label><span class="labeled-label">팀 이름</span><input class="labeled-input" data-field="team-name" value="${esc(t?.name||'')}" /></label><label><span class="labeled-label">분기</span><input class="labeled-input" data-field="team-quarter" value="${esc(t?.quarter||'')}" /></label></div>${state.teams.length>1?`<div style="margin-top:12px;"><button class="btn btn-danger" data-act="del-team">이 팀 삭제 (모든 데이터 함께)</button></div>`:''}</section><section class="card"><div class="section-head" style="margin-bottom:14px;justify-content:space-between;"><span class="section-title">팀원 (${state.members.length})</span><button class="btn btn-soft" data-act="add-member">${I.plus} 팀원 추가</button></div><div style="font-size:11px;color:var(--text-soft);margin-bottom:8px;">⋮⋮ 핸들 잡고 드래그로 순서 변경 — 변경된 순서는 모든 팀원에게 동일하게 보입니다</div>${state.members.map(m=>`<div class="member-row" data-mem-id="${m.id}" draggable="true" data-drag-type="member"><span class="drag-handle member-handle" title="드래그로 순서 변경">⋮⋮</span><input type="color" class="member-color" data-field="member-color" data-mid="${m.id}" value="${m.color}" /><input class="member-name-input" data-field="member-name" data-mid="${m.id}" value="${esc(m.name)}" /><input class="member-role-input" data-field="member-role" data-mid="${m.id}" placeholder="역할" value="${esc(m.role||'')}" /><button class="btn-icon" data-act="del-member" data-mid="${m.id}">${I.trash}</button></div>`).join('')}</section><section class="card"><div class="section-head" style="margin-bottom:14px;"><span class="section-title">모든 팀</span></div>${state.teams.map(t=>`<div class="member-row"><span style="width:18px;height:18px;border-radius:5px;background:${teamColor(t)};display:inline-block;"></span><span style="flex:1;font-weight:600;font-size:13.5px;">${esc(t.name)}</span><span style="font-size:11.5px;color:var(--text-soft);">${esc(t.quarter)}</span>${t.id===state.currentTeamId?'<span class="today-tag">현재</span>':`<button class="btn btn-ghost" data-act="switch-team" data-tid="${t.id}">전환</button>`}</div>`).join('')}</section>`;
}

function updateBlockerUI(date,mid){if(date!==viewingDate)return;const s=state.standups[date]||{entries:{}};const e=s.entries[mid]||{};const has=!!(e.blockers&&e.blockers.trim());const c=document.querySelector(`[data-member-card="${mid}"]`);if(c){c.classList.toggle('has-blocker',has);let b=c.querySelector('.blocker-badge');if(has&&!b){const h=c.querySelector('.member-head');if(h){const sp=document.createElement('span');sp.className='blocker-badge';sp.innerHTML=`${I.alert} 막힘`;h.appendChild(sp);}}else if(!has&&b){b.remove();}}const cnt=Object.values(s.entries||{}).filter(en=>en?.blockers?.trim()).length;const st=document.querySelector('[data-blocker-stat]');if(st){st.textContent=cnt>0?`${cnt}건`:'없음';st.style.color=cnt>0?C.warning:C.growth;}}

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
  if(entityType==='member'){const m=state.members.find(x=>x.id===entityId);if(!m)return;title=m.name;subtitle='팀원 종합 회고';mid=m.id;}
  else if(entityType==='objective'){const o=state.objectives.find(x=>x.id===entityId);if(!o)return;title=o.title;subtitle='Objective 회고';}
  else if(entityType==='key_result'){let k=null,po=null;state.objectives.forEach(o=>o.keyResults.forEach(x=>{if(x.id===entityId){k=x;po=o;}}));if(!k)return;title=k.title;subtitle=`Key Result 회고 · ${po.title}`;}
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
    <div class="modal-head"><div class="modal-title">${period==='mid'?'중간 회고':'최종 회고'} · ${esc(title)}</div><button class="btn-icon" data-act="close-modal">${I.x}</button></div>
    <div class="modal-body">
      <div style="font-size:11.5px;color:var(--text-soft);margin-bottom:10px;padding:8px 10px;background:#FAFAFA;border-radius:6px;line-height:1.5;">📌 ${esc(subtitle)} · 이 기록은 <b>학습과 회고</b>를 위한 것이며, <b>인사평가와 무관</b>합니다. OKR은 야심을 세우고 배우는 도구입니다.</div>
      ${periodChips}
      ${contextHtml}
      <div style="display:flex;align-items:center;gap:8px;margin-bottom:12px;padding-bottom:8px;border-bottom:1px dashed var(--line);"><span style="font-size:11.5px;font-weight:700;color:var(--text-soft);">기록 깊이:</span><button class="btn-mode" data-act="refl-mode" data-mode="full" style="${(window._reflMode||'full')==='full'?'background:var(--primary-soft);color:var(--primary);font-weight:700;':''}padding:4px 11px;font-size:11.5px;">전체 (4질문)</button><button class="btn-mode" data-act="refl-mode" data-mode="light" style="${window._reflMode==='light'?'background:var(--primary-soft);color:var(--primary);font-weight:700;':''}padding:4px 11px;font-size:11.5px;">가벼운 메모</button><span style="font-size:11px;color:var(--text-soft);margin-left:auto;">매주 부담 없는 회고는 가벼운 메모로 충분</span></div>
      <div class="eval-section"><div class="eval-section-label">${(window._reflMode||'full')==='light'?'한 줄 회고':'한 줄 총평 (선택)'}</div><textarea class="eval-input" data-field="r-summary" rows="${(window._reflMode||'full')==='light'?'4':'2'}" placeholder="${(window._reflMode||'full')==='light'?'이번 기간 가장 인상적이었던 것을 한 문장 또는 한 단락으로':'이번 기간을 한 문장으로 요약한다면'}">${esc(r.summary||'')}</textarea></div>
      <div class="eval-section" style="${(window._reflMode||'full')==='light'?'display:none;':''}"><div class="eval-section-label">잘 된 것</div><div style="font-size:11px;color:var(--text-soft);margin-bottom:5px;line-height:1.5;">${esc(REFL_HINTS.what_worked).replace(/\*([^*]+)\*/g,'<i>$1</i>')}</div><textarea class="eval-input" data-field="r-worked" rows="3" placeholder="가장 잘 작동한 것">${esc(r.what_worked||'')}</textarea></div>
      <div class="eval-section" style="${(window._reflMode||'full')==='light'?'display:none;':''}"><div class="eval-section-label">어려웠던 것</div><div style="font-size:11px;color:var(--text-soft);margin-bottom:5px;line-height:1.5;">${esc(REFL_HINTS.what_struggled)}</div><textarea class="eval-input" data-field="r-struggled" rows="3" placeholder="미달성·블로커·갈등 — 솔직하게">${esc(r.what_struggled||'')}</textarea></div>
      <div class="eval-section" style="${(window._reflMode||'full')==='light'?'display:none;':''}"><div class="eval-section-label">배운 것</div><div style="font-size:11px;color:var(--text-soft);margin-bottom:5px;line-height:1.5;">${esc(REFL_HINTS.what_learned)}</div><textarea class="eval-input" data-field="r-learned" rows="3" placeholder="다음 분기에 가져갈 인사이트">${esc(r.what_learned||'')}</textarea></div>
      <div class="eval-section" style="${(window._reflMode||'full')==='light'?'display:none;':''}"><div class="eval-section-label">다음에 시도할 것</div><div style="font-size:11px;color:var(--text-soft);margin-bottom:5px;line-height:1.5;">${esc(REFL_HINTS.next_try)}</div><textarea class="eval-input" data-field="r-nexttry" rows="2" placeholder="새로운 시도 1~2가지">${esc(r.next_try||'')}</textarea></div>
      <div class="eval-section"><div class="eval-section-label">작성자</div><input class="eval-input" data-field="r-reviewer" style="min-height:auto;" value="${esc(r.reviewer||'')}" placeholder="이름 또는 본인"/></div>
    </div>
    <div class="modal-foot"><button class="btn btn-ghost" data-act="close-modal">취소</button><button class="btn btn-primary" data-act="save-review">회고 저장</button></div>
  `);
  window._editingReview=r;
  window._reviewOpts={preset,start,end,entityType,entityId,period};
}

function memberName(id){return id?(state.members.find(m=>m.id===id)?.name||'-'):'-';}

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
  const memRows=[['팀원','역할','담당 O','담당 KR','KR 평균진척(%)','담당 Init','Init 완료','Init 막힘','자신감 평균','중간회고','최종회고']];
  state.members.forEach(m=>{const a=memberAnalytics(m.id);const md=lastReflectionFor('member',m.id,'mid');const fn=lastReflectionFor('member',m.id,'final');memRows.push([m.name,m.role||'',a.okrs,a.krs,a.krAvg,a.inits,a.initsDone,a.initsBlocked,a.confAvg.toFixed(2),md?'작성됨':'',fn?'작성됨':'']);});
  const ws3=XLSX.utils.aoa_to_sheet(memRows);ws3['!cols']=[{wch:14},{wch:14},{wch:8},{wch:8},{wch:14},{wch:10},{wch:10},{wch:10},{wch:14},{wch:10},{wch:10}];
  XLSX.utils.book_append_sheet(wb,ws3,'팀원 성과');
  const evRows=[['대상 유형','대상','구분','분기','잘 된 것','어려웠던 것','배운 것','다음 시도','한줄 총평','작성자','일시']];
  state.reviews.forEach(r=>{const et=r.entity_type||'member';let label='';if(et==='member'){const m=state.members.find(x=>x.id===(r.entity_id||r.member_id));label=m?m.name:'(삭제)';}else if(et==='objective'){const o=state.objectives.find(x=>x.id===r.entity_id);label=o?o.title:'(삭제)';}else if(et==='key_result'){let k=null;state.objectives.forEach(o=>o.keyResults.forEach(x=>{if(x.id===r.entity_id)k=x;}));label=k?k.title:'(삭제)';}evRows.push([REFL_ENTITY_LABELS[et]||et,label,r.period==='mid'?'중간':'최종',r.quarter||'',r.what_worked||'',r.what_struggled||'',r.what_learned||'',r.next_try||'',r.summary||'',r.reviewer||'',r.updated_at?new Date(r.updated_at).toLocaleString('ko-KR'):'']);});
  const ws4=XLSX.utils.aoa_to_sheet(evRows);ws4['!cols']=[{wch:10},{wch:24},{wch:8},{wch:10},{wch:30},{wch:30},{wch:30},{wch:30},{wch:24},{wch:12},{wch:18}];
  XLSX.utils.book_append_sheet(wb,ws4,'회고 상세');
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
  html+=`<h2>2. 팀원별 활동 요약</h2><table><tr><th>팀원</th><th>역할</th><th>담당 O</th><th>담당 KR</th><th>KR 평균</th><th>Init 완료</th><th>중간회고</th><th>최종회고</th></tr>`;
  state.members.forEach(m=>{const a=memberAnalytics(m.id);const md=lastReflectionFor('member',m.id,'mid');const fn=lastReflectionFor('member',m.id,'final');html+=`<tr><td><b>${esc(m.name)}</b></td><td>${esc(m.role||'')}</td><td>${a.okrs}</td><td>${a.krs}</td><td>${a.krAvg}%</td><td>${a.initsDone}/${a.inits}</td><td>${md?'✓':'-'}</td><td>${fn?'✓':'-'}</td></tr>`;});
  html+=`</table>`;
  if(state.reviews.length>0){
    html+=`<h2 class="pg-break">3. 회고 상세 (Doerr 4질문)</h2><div style="font-size:11px;color:#666;margin-bottom:10px;">잘 된 것 / 어려웠던 것 / 배운 것 / 다음에 시도할 것 — OKR은 학습 도구이며 인사평가가 아닙니다.</div>`;
    state.reviews.forEach(r=>{const et=r.entity_type||'member';let label='';if(et==='member'){const m=state.members.find(x=>x.id===(r.entity_id||r.member_id));label=m?m.name:'-';}else if(et==='objective'){const o=state.objectives.find(x=>x.id===r.entity_id);label=o?`O · ${o.title}`:'-';}else if(et==='key_result'){let k=null;state.objectives.forEach(o=>o.keyResults.forEach(x=>{if(x.id===r.entity_id)k=x;}));label=k?`KR · ${k.title}`:'-';}html+=`<div class="obj"><div class="obj-h"><div class="obj-t">${esc(label)} · ${r.period==='mid'?'중간 회고':'최종 회고'} · ${esc(r.quarter||'')}</div></div>${r.summary?`<div style="margin-top:6px;font-weight:600;">${esc(r.summary)}</div>`:''}${r.what_worked?`<div style="margin-top:8px;"><b>잘 된 것</b><br>${esc(r.what_worked).replace(/\n/g,'<br>')}</div>`:''}${r.what_struggled?`<div style="margin-top:8px;"><b>어려웠던 것</b><br>${esc(r.what_struggled).replace(/\n/g,'<br>')}</div>`:''}${r.what_learned?`<div style="margin-top:8px;"><b>배운 것</b><br>${esc(r.what_learned).replace(/\n/g,'<br>')}</div>`:''}${r.next_try?`<div style="margin-top:8px;"><b>다음에 시도할 것</b><br>${esc(r.next_try).replace(/\n/g,'<br>')}</div>`:''}<div style="margin-top:6px;color:#666;font-size:10.5px;">작성자: ${esc(r.reviewer||'-')} · ${r.updated_at?new Date(r.updated_at).toLocaleString('ko-KR'):''}</div></div>`;});
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
  if(a==='my-init-filter'){myInitFilter=btn.dataset.filter;render();return;}
  if(a==='clear-search'){okrSearchQuery='';render();return;}
  if(a==='clear-refl-search'){reflSearchQuery='';render();return;}
  if(a==='jump-to-kr'){
    const oid=btn.dataset.oid,krid=btn.dataset.krid;
    currentView='okr';
    if(!expanded.has(oid))expanded.add(oid);
    krCollapsed.delete(krid);
    render();
    setTimeout(()=>{const el=document.querySelector(`[data-kr-id="${krid}"]`);if(el){el.scrollIntoView({behavior:'smooth',block:'center'});el.style.transition='background .8s';el.style.background='#FFF8DC';setTimeout(()=>el.style.background='',1500);}},150);
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
  if(a==='present'){presentMode=!presentMode;if(presentMode){presentMid=state.members.length>0?state.members[state.members.length-1].id:null;}render();return;}
  if(a==='present-set'){presentMid=btn.dataset.mid;render();return;}
  if(a==='present-prev'){if(state.members.length===0)return;const i=state.members.findIndex(m=>m.id===presentMid);const ni=i>0?i-1:state.members.length-1;presentMid=state.members[ni].id;render();return;}
  if(a==='present-next'){if(state.members.length===0)return;const i=state.members.findIndex(m=>m.id===presentMid);const ni=i<state.members.length-1?i+1:0;presentMid=state.members[ni].id;render();return;}
  if(a==='toggle-dark'){setDark(!isDark());render();return;}
  if(a==='date-shift'){viewingDate=shiftDate(viewingDate,parseInt(btn.dataset.delta));if(!state.standups[viewingDate]||!state.routineLogs[viewingDate]){dateLoading=true;render();await Promise.all([loadStandup(viewingDate),loadRoutineLogs(viewingDate)]);dateLoading=false;}render();return;}
  if(a==='date-today'){viewingDate=todayKey();render();return;}
  if(a==='toggle-obj'){const oid=btn.dataset.oid;expanded.has(oid)?expanded.delete(oid):expanded.add(oid);render();return;}
  if(a==='toggle-kr'){const k=btn.dataset.krid;krCollapsed.has(k)?krCollapsed.delete(k):krCollapsed.add(k);render();return;}
  // v15 — WBS 간트
  if(a==='wbs-toggle'){const key=btn.dataset.key;const set=window._wbsCollapsed||(window._wbsCollapsed=new Set());set.has(key)?set.delete(key):set.add(key);render();return;}
  if(a==='wbs-jump'){
    const type=btn.dataset.type;const id=btn.dataset.id;
    currentView='okr';
    if(type==='O'){expanded.add(id);}
    else if(type==='KR'){expanded.add(btn.dataset.oid);krCollapsed.delete(id);}
    else if(type==='I'){expanded.add(btn.dataset.oid);krCollapsed.delete(btn.dataset.krid);}
    render();
    setTimeout(()=>{
      const sel=type==='O'?`[data-obj-id="${id}"]`:type==='KR'?`[data-kr-id="${id}"]`:`[data-init-id="${id}"]`;
      const el=document.querySelector(sel);
      if(el){el.scrollIntoView({behavior:'smooth',block:'center'});el.style.transition='background .8s';el.style.background='#FFF8DC';setTimeout(()=>el.style.background='',1500);}
    },150);
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
  if(a==='add-obj'){const id=uid();const o={id,title:'',description:'',ownerId:state.members[0]?.id||null,confidence:'mid',realityBlocker:'',realityHelp:'',keyResults:[]};state.objectives.push(o);expanded.add(id);render();const{error}=await sb.from('objectives').insert({id,team_id:state.currentTeamId,title:'',description:'',owner_id:o.ownerId,confidence:'mid',sort_order:state.objectives.length-1});if(error)showToast('저장 실패',true);else logChange('objective',id,'create','','','(작성 중)','(작성 중)');setTimeout(()=>{const el=document.querySelector(`input[data-field="obj-title"][data-oid="${id}"]`);if(el)el.focus();},100);return;}
  if(a==='del-obj'){if(!confirm('이 Objective와 하위 KR/Initiative를 삭제할까요?'))return;const oid=btn.dataset.oid;const o=state.objectives.find(x=>x.id===oid);state.objectives=state.objectives.filter(x=>x.id!==oid);render();await sb.from('objectives').delete().eq('id',oid);logChange('objective',oid,'delete','',o?.title||'','',o?.title||'');return;}
  if(a==='add-kr'){const oid=btn.dataset.oid;const o=state.objectives.find(x=>x.id===oid);if(!o)return;const id=uid();const kr={id,title:'',target:100,current:0,unit:'%',ownerId:state.members[0]?.id||null,confidence:'mid',realityBlocker:'',realityHelp:'',initiatives:[]};o.keyResults.push(kr);render();const{error}=await sb.from('key_results').insert({id,objective_id:oid,title:'',target:kr.target,current:kr.current,unit:kr.unit,owner_id:kr.ownerId,confidence:'mid',sort_order:o.keyResults.length-1});if(error)showToast('저장 실패',true);else logChange('key_result',id,'create','','','(작성 중)','(작성 중)');setTimeout(()=>{const el=document.querySelector(`input[data-field="kr-title"][data-krid="${id}"]`);if(el)el.focus();},100);return;}
  if(a==='del-kr'){if(!confirm('이 KR을 삭제할까요?'))return;const oid=btn.dataset.oid,krid=btn.dataset.krid;const o=state.objectives.find(x=>x.id===oid);const kr=o?.keyResults.find(k=>k.id===krid);if(o)o.keyResults=o.keyResults.filter(k=>k.id!==krid);render();await sb.from('key_results').delete().eq('id',krid);logChange('key_result',krid,'delete','',kr?.title||'','',kr?.title||'');return;}
  if(a==='add-init'){const krid=btn.dataset.krid;let kr=null;state.objectives.forEach(o=>o.keyResults.forEach(k=>{if(k.id===krid)kr=k;}));if(!kr)return;const id=uid();const init={id,title:'',ownerId:state.members[0]?.id||null,status:'todo',confidence:'mid',realityBlocker:'',realityHelp:''};kr.initiatives.push(init);render();const{error}=await sb.from('initiatives').insert({id,kr_id:krid,title:'',status:'todo',owner_id:init.ownerId,confidence:'mid',sort_order:kr.initiatives.length-1});if(error)showToast('저장 실패',true);else logChange('initiative',id,'create','','','(작성 중)','(작성 중)');setTimeout(()=>{const el=document.querySelector(`input[data-field="init-title"][data-iid="${id}"]`);if(el)el.focus();},100);return;}
  if(a==='del-init'){const krid=btn.dataset.krid,iid=btn.dataset.iid;let kr=null,init=null;state.objectives.forEach(o=>o.keyResults.forEach(k=>{if(k.id===krid){kr=k;init=k.initiatives.find(i=>i.id===iid);}}));if(kr)kr.initiatives=kr.initiatives.filter(i=>i.id!==iid);render();await sb.from('initiatives').delete().eq('id',iid);logChange('initiative',iid,'delete','',init?.title||'','',init?.title||'');return;}
  if(a==='add-member'){const i=state.members.length;const m={id:uid(),team_id:state.currentTeamId,name:`팀원 ${i+1}`,role:'팀원',color:PALETTE[i%PALETTE.length]};state.members.push(m);render();const{error}=await sb.from('members').insert({...m,sort_order:i});if(error)showToast('저장 실패',true);else logChange('member',m.id,'create','','',m.name,m.name);return;}
  if(a==='del-member'){if(!confirm('팀원을 삭제할까요?'))return;const mid=btn.dataset.mid;const m=state.members.find(x=>x.id===mid);state.members=state.members.filter(x=>x.id!==mid);render();await sb.from('members').delete().eq('id',mid);logChange('member',mid,'delete','',m?.name||'','',m?.name||'');return;}
  if(a==='add-routine'){const id=uid();const i=state.routines.length;const r={id,team_id:state.currentTeamId,title:'새 루틴',description:'',owner_id:state.members[0]?.id||null,frequency:'weekdays',days_of_week:[1,2,3,4,5],active:true,sort_order:i};state.routines.push(r);render();const{error}=await sb.from('routines').insert(r);if(error)showToast('저장 실패',true);else logChange('routine',id,'create','','',r.title,r.title);return;}
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
  if(a==='save-review'){const r=window._editingReview;if(!r)return;const ok=await saveReview(r);if(ok){if(r._new){delete r._new;state.reviews.unshift(r);}else{const i=state.reviews.findIndex(x=>x.id===r.id);if(i>=0)state.reviews[i]={...r};}closeModal();showToast('회고 저장됨');render();}return;}
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
    if(ok){setSelfId(mid);setPinAuth(mid);closeModal();showToast('PIN 등록 완료');render();refreshHelpBadge();}
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
    if(ok){localStorage.removeItem(failKey);localStorage.removeItem(lockKey);setSelfId(mid);setPinAuth(mid);closeModal();showToast('인증 완료');render();refreshHelpBadge();}
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
let dragSrc=null;
document.addEventListener('dragstart',e=>{
  const el=e.target.closest('[draggable="true"]');if(!el||!el.dataset.dragType)return;
  dragSrc=el;el.classList.add('dragging');
  e.dataTransfer.effectAllowed='move';try{e.dataTransfer.setData('text/plain',el.dataset.dragType);}catch(err){}
});
document.addEventListener('dragend',e=>{
  if(dragSrc)dragSrc.classList.remove('dragging');
  document.querySelectorAll('.drop-target').forEach(el=>el.classList.remove('drop-target'));
  dragSrc=null;
});
document.addEventListener('dragover',e=>{
  if(!dragSrc)return;
  const tgt=e.target.closest('[draggable="true"]');if(!tgt||tgt===dragSrc)return;
  if(tgt.dataset.dragType!==dragSrc.dataset.dragType)return;
  if(tgt.dataset.dragParent!==dragSrc.dataset.dragParent)return; // 같은 부모만
  e.preventDefault();
  document.querySelectorAll('.drop-target').forEach(el=>el.classList.remove('drop-target'));
  tgt.classList.add('drop-target');
});
document.addEventListener('drop',async e=>{
  if(!dragSrc)return;
  const tgt=e.target.closest('[draggable="true"]');if(!tgt||tgt===dragSrc)return;
  if(tgt.dataset.dragType!==dragSrc.dataset.dragType)return;
  if(tgt.dataset.dragParent!==dragSrc.dataset.dragParent)return;
  e.preventDefault();
  const type=dragSrc.dataset.dragType;
  if(type==='obj'){await reorderObjectives(dragSrc.dataset.objId,tgt.dataset.objId);}
  else if(type==='kr'){await reorderKRs(dragSrc.dataset.dragParent,dragSrc.dataset.krId,tgt.dataset.krId);}
  else if(type==='init'){await reorderInits(dragSrc.dataset.dragParent,dragSrc.dataset.initId,tgt.dataset.initId);}
  else if(type==='member'){await reorderMembers(dragSrc.dataset.memId,tgt.dataset.memId);}
  document.querySelectorAll('.drop-target').forEach(el=>el.classList.remove('drop-target'));
  dragSrc=null;
});
async function reorderObjectives(srcId,tgtId){
  const arr=state.objectives;const sIdx=arr.findIndex(o=>o.id===srcId);const tIdx=arr.findIndex(o=>o.id===tgtId);
  if(sIdx<0||tIdx<0)return;
  const[item]=arr.splice(sIdx,1);arr.splice(tIdx,0,item);
  render();
  // sort_order 업데이트
  for(let i=0;i<arr.length;i++){markLocal('objectives',arr[i].id);await sb.from('objectives').update({sort_order:i}).eq('id',arr[i].id);}
  showToast('순서 저장됨');
}
async function reorderKRs(oid,srcId,tgtId){
  const o=state.objectives.find(x=>x.id===oid);if(!o)return;
  const sIdx=o.keyResults.findIndex(k=>k.id===srcId);const tIdx=o.keyResults.findIndex(k=>k.id===tgtId);
  if(sIdx<0||tIdx<0)return;
  const[item]=o.keyResults.splice(sIdx,1);o.keyResults.splice(tIdx,0,item);
  render();
  for(let i=0;i<o.keyResults.length;i++){markLocal('key_results',o.keyResults[i].id);await sb.from('key_results').update({sort_order:i}).eq('id',o.keyResults[i].id);}
  showToast('순서 저장됨');
}
async function reorderInits(krid,srcId,tgtId){
  let kr=null;state.objectives.forEach(o=>o.keyResults.forEach(k=>{if(k.id===krid)kr=k;}));if(!kr)return;
  const sIdx=kr.initiatives.findIndex(i=>i.id===srcId);const tIdx=kr.initiatives.findIndex(i=>i.id===tgtId);
  if(sIdx<0||tIdx<0)return;
  const[item]=kr.initiatives.splice(sIdx,1);kr.initiatives.splice(tIdx,0,item);
  render();
  for(let i=0;i<kr.initiatives.length;i++){markLocal('initiatives',kr.initiatives[i].id);await sb.from('initiatives').update({sort_order:i}).eq('id',kr.initiatives[i].id);}
  showToast('순서 저장됨');
}
async function reorderMembers(srcId,tgtId){
  const arr=state.members;const sIdx=arr.findIndex(m=>m.id===srcId);const tIdx=arr.findIndex(m=>m.id===tgtId);
  if(sIdx<0||tIdx<0||srcId===tgtId)return;
  const[item]=arr.splice(sIdx,1);arr.splice(tIdx,0,item);
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
  if(el.tagName==='TEXTAREA'&&(el.dataset.autogrow!==undefined||el.dataset.krlAutogrow!==undefined)){el.style.height='auto';el.style.height=(el.scrollHeight+2)+'px';}
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
  else if(f&&f.startsWith('kr-')){const oid=el.dataset.oid,krid=el.dataset.krid;const o=state.objectives.find(x=>x.id===oid);const kr=o?.keyResults.find(k=>k.id===krid);if(!kr)return;if(f==='kr-title'){const old=kr.title;kr.title=el.value;logChange('key_result',krid,'update','title',old,el.value,el.value);}else if(f==='kr-current'){const old=kr.current;kr.current=Number(el.value)||0;logChange('key_result',krid,'update','current',old,kr.current,kr.title);updateKRRowDom(oid,krid);}else if(f==='kr-target'){kr.target=Number(el.value)||0;updateKRRowDom(oid,krid);}else if(f==='kr-unit'){kr.unit=el.value;}else if(f==='kr-due'){const old=kr.dueDate;kr.dueDate=el.value||null;logChange('key_result',krid,'update','due_date',old,el.value,kr.title);}saveKR(oid,kr);}
  else if(f&&f.startsWith('init-')){const krid=el.dataset.krid,iid=el.dataset.iid;let init=null;state.objectives.forEach(o=>o.keyResults.forEach(k=>{if(k.id===krid)init=k.initiatives.find(i=>i.id===iid);}));if(!init)return;if(f==='init-title'){const old=init.title;init.title=el.value;logChange('initiative',iid,'update','title',old,el.value,el.value);}else if(f==='init-due'){const old=init.dueDate;init.dueDate=el.value||null;logChange('initiative',iid,'update','due_date',old,el.value,init.title);}saveInitiative(krid,init);}
  else if(f==='reality-blocker'||f==='reality-help'){const et=el.dataset.etype,eid=el.dataset.eid;const fn=f==='reality-blocker'?'realityBlocker':'realityHelp';if(et==='objective'){const o=state.objectives.find(x=>x.id===eid);if(o){o[fn]=el.value;saveObjective(o);}}else if(et==='kr'){let oid=null,kr=null;state.objectives.forEach(o=>o.keyResults.forEach(k=>{if(k.id===eid){oid=o.id;kr=k;}}));if(kr){kr[fn]=el.value;saveKR(oid,kr);}}else if(et==='initiative'){let krid=null,init=null;state.objectives.forEach(o=>o.keyResults.forEach(k=>k.initiatives.forEach(i=>{if(i.id===eid){krid=k.id;init=i;}})));if(init){init[fn]=el.value;saveInitiative(krid,init);}}}
  else if(f==='rt-title'){const r=state.routines.find(x=>x.id===el.dataset.rid);if(r){r.title=el.value;saveRoutine(r);}}
  else if(f==='rt-day-of-month'){const r=state.routines.find(x=>x.id===el.dataset.rid);if(r){r.day_of_month=parseInt(el.value)||1;saveRoutine(r);}}
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
  else if(f==='init-status'){const krid=el.dataset.krid;let init=null;state.objectives.forEach(o=>o.keyResults.forEach(k=>{if(k.id===krid)init=k.initiatives.find(i=>i.id===el.dataset.iid);}));if(init){const old=init.status;init.status=el.value;saveInitiative(krid,init);logChange('initiative',init.id,'update','status',old,el.value,init.title);render();}}
  else if(f==='init-owner'){const krid=el.dataset.krid;let init=null;state.objectives.forEach(o=>o.keyResults.forEach(k=>{if(k.id===krid)init=k.initiatives.find(i=>i.id===el.dataset.iid);}));if(init){init.ownerId=el.value||null;saveInitiative(krid,init);}}
  else if(f==='rt-frequency'){const r=state.routines.find(x=>x.id===el.dataset.rid);if(r){r.frequency=el.value;if(r.frequency==='weekdays'&&(!r.days_of_week||r.days_of_week.length===0))r.days_of_week=[1,2,3,4,5];saveRoutine(r);render();}}
  else if(f==='rt-owner'){const r=state.routines.find(x=>x.id===el.dataset.rid);if(r){r.owner_id=el.value||null;saveRoutine(r);}}
  else if(f==='member-color'){const m=state.members.find(x=>x.id===el.dataset.mid);if(m){m.color=el.value;saveMember(m);}}
  else if(f==='helper-member'){saveEntry(viewingDate,el.dataset.mid,'helper_member_id',el.value);}
});

function updateKRRowDom(oid,krid){const o=state.objectives.find(x=>x.id===oid);const kr=o?.keyResults.find(k=>k.id===krid);if(!kr)return;const p=pct(kr.current,kr.target);const col=progressColor(p);const row=document.querySelector(`[data-kr-id="${krid}"]`);if(!row)return;const pe=row.querySelector('[data-kr-pct]');if(pe){pe.textContent=p+'%';pe.style.color=col;}const bar=row.querySelector('[data-kr-bar]');if(bar){bar.style.width=p+'%';bar.style.background=col;}if(o){const avg=o.keyResults.length?Math.round(o.keyResults.reduce((s,k)=>s+pct(k.current,k.target),0)/o.keyResults.length):0;const oe=document.querySelector(`[data-obj-id="${oid}"]`);if(oe){const av=oe.querySelector('[data-obj-avg]');if(av){av.textContent=avg+'%';av.style.color=progressColor(avg);}}}}
function updateBrand(){const t=currentTeam();if(!t)return;const tt=document.querySelector('.brand-title');const s=document.querySelector('.brand-sub');if(tt&&tt.firstChild)tt.firstChild.textContent=`${t.name} OKR `;if(s)s.textContent=`${t.quarter} · 일일 스프린트`;const m=document.querySelector('.brand-mark');if(m){m.textContent=teamInitial(t.name);m.style.background=teamColor(t);}}

async function init(){
  const cfg=getConfig();if(!cfg){renderSetup();return;}
  const r=await tryConnect(cfg.url,cfg.key);if(!r.ok){renderSetup('연결 실패: '+r.msg);return;}
  sb=r.client;setupRealtime();
  try{
    await initialLoad();
    state.selfId=getSelfId();
    // PIN 인증 만료 체크 (24시간)
    if(state.selfId&&state.selfId!=='__observer__'){
      const m=state.members.find(x=>x.id===state.selfId);
      if(m && m.pin_hash && !isPinAuthValid(state.selfId)){
        // 인증 만료 → 다시 본인 인증 필요
        const expiredId=state.selfId;
        state.selfId=null; // 임시 해제
        render();
        setTimeout(()=>openPinVerify(expiredId),300);
      } else {
        await fetchHelpRequests();
        render();
      }
    } else {
      render();
    }
    // 첫 진입 시 본인 식별 모달
    if(!state.selfId && state.members.length>0){setTimeout(()=>openSelfPicker(),300);}
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
    const list=[];const st=getState();if(!st||!st.objectives)return list;
    st.objectives.forEach(o=>{(o.keyResults||[]).forEach(k=>{list.push({id:k.id,title:k.title||'(제목 없는 KR)',objTitle:o.title||'(이름 없는 Objective)',initiatives:(k.initiatives||[]).map(i=>({id:i.id,title:i.title||'(제목 없는 Initiative)',krId:k.id,status:i.status||'todo'}))});});});
    return list;
  }
  // v15 — Initiative 포함 평탄화된 옵션 목록 (값 prefix로 KR/Init 구분)
  function collectAllInit(){
    const list=[];const st=getState();if(!st||!st.objectives)return list;
    st.objectives.forEach(o=>{(o.keyResults||[]).forEach(k=>{(k.initiatives||[]).forEach(i=>{list.push({id:i.id,title:i.title||'(제목 없는 Initiative)',krId:k.id,krTitle:k.title||'(KR)',objTitle:o.title||'(O)',status:i.status||'todo'});});});});
    return list;
  }
  function getMemberTasks(mid,kind){
    const st=getState();const date=getViewingDate();
    if(!st||!date||!st.standups||!st.standups[date])return{legacy:'',tasks:[]};
    const e=st.standups[date].entries[mid]||{};
    return parseTasksField(e[kind]||'');
  }
  function updateMemberTasks(mid,kind,legacy,tasks){
    const st=getState();const date=getViewingDate();
    if(!st||!date)return;
    if(!st.standups[date])st.standups[date]={headline:'',entries:{}};
    if(!st.standups[date].entries[mid]){st.standups[date].entries[mid]={yesterday:'',today:'',blockers:'',helper_member_id:'',helper_name:'',support_type:'',support_detail:''};}
    const text=serializeTasks(legacy,tasks);
    st.standups[date].entries[mid][kind]=text;
    try{saveEntry(date,mid,kind,text);}catch(e){console.warn('[KR-Link] save failed',e);}
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
  function buildKROptions(selectedId,allKR){
    const sel=normalizeSel(selectedId);
    let html='<option value=""'+(!sel.id?' selected':'')+'>운영 (KR 무관)</option>';
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
        const title=k.title.length>40?k.title.slice(0,40)+'…':k.title;
        const krVal='kr:'+k.id;
        const isSel=sel.type==='kr'&&sel.id===k.id;
        html+='<option value="'+escapeHtml(krVal)+'"'+(isSel?' selected':'')+'>📌 KR · '+escapeHtml(title)+'</option>';
        // Initiative들도 같은 optgroup 안에 자식으로 표시
        (k.initiatives||[]).forEach(i=>{
          const itTitle=i.title.length>36?i.title.slice(0,36)+'…':i.title;
          const initVal='init:'+i.id;
          const isInitSel=sel.type==='init'&&sel.id===i.id;
          html+='<option value="'+escapeHtml(initVal)+'"'+(isInitSel?' selected':'')+'>  ↳ ⚡ '+escapeHtml(itTitle)+'</option>';
        });
      });
      html+='</optgroup>';
    });
    return html;
  }
  function renderTaskRowHtml(task,mid,kind){
    const allKR=collectAllKR();
    const krInfo=task.k?allKR.find(k=>k.id===task.k):null;
    // v15 — Initiative 우선 색 적용
    const initInfo=task.i?collectAllInit().find(x=>x.id===task.i):null;
    const tagBg=initInfo?'#D9CFFB':(krInfo?'#EEEAFE':'#F4F4F5');
    const tagFg=initInfo?'#3A2670':(krInfo?'#6241F5':'#737373');
    const tagBorder=initInfo?'#B5A0F0':(krInfo?'#D9CFFB':'var(--line)');
    // select 초기 value — kr:/init: prefix 사용
    const selValue=initInfo?('init:'+task.i):(krInfo?('kr:'+task.k):'');
    const editable=(typeof canEditAs==='function')?canEditAs(mid):true;
    const ro=editable?'':' readonly';
    const dis=editable?'':' disabled';
    const tip=editable?'':' title="본인이 작성한 항목만 수정할 수 있습니다"';
    const textStyle='width:100%;padding:11px 13px;border:1px solid var(--line);border-radius:6px;background:#FAFAFA;outline:none;font-size:13.5px;line-height:1.6;font-family:inherit;color:var(--text);resize:none;overflow:hidden;min-height:72px;box-sizing:border-box;'+(task.d?'text-decoration:line-through;color:var(--text-soft);':'');
    // v14 — 2행 구조: 위 = KR 칩 + 삭제, 아래 = 체크 + 본문 (꽉 차게)
    return '<div class="krl-task-row" data-tid="'+task.id+'" data-mid="'+mid+'" data-kind="'+kind+'" style="display:flex;flex-direction:column;gap:6px;padding:10px 0;border-bottom:1px dashed #F0F0F2;">'+
      // 1행 — KR 선택 + 삭제
      '<div style="display:flex;align-items:center;gap:8px;width:100%;">'+
        '<select data-krl-field="task-kr" data-mid="'+mid+'" data-kind="'+kind+'" data-tid="'+task.id+'" style="font-size:12px;padding:6px 10px;background:'+tagBg+';color:'+tagFg+';font-weight:700;border:1px solid '+tagBorder+';border-radius:999px;outline:none;cursor:pointer;font-family:inherit;max-width:100%;flex:0 1 auto;" title="클릭하여 KR 선택"'+dis+'>'+
        buildKROptions(selValue,allKR)+'</select>'+
        '<span style="flex:1;"></span>'+
        (editable?'<button data-act="krl-del-task" data-mid="'+mid+'" data-kind="'+kind+'" data-tid="'+task.id+'" style="padding:4px 8px;background:none;border:1px solid transparent;border-radius:6px;cursor:pointer;color:var(--text-soft);font-size:13px;line-height:1;flex-shrink:0;" title="이 작업 삭제">✕</button>':'')+
      '</div>'+
      // 2행 — 체크박스 + 본문 (꽉 차게)
      '<div style="display:flex;align-items:flex-start;gap:8px;width:100%;">'+
        '<button class="rt-check '+(task.d?'checked':'')+'" style="width:20px;height:20px;border-width:2px;border-radius:5px;flex-shrink:0;margin-top:10px;" data-act="krl-toggle-task" data-mid="'+mid+'" data-kind="'+kind+'" data-tid="'+task.id+'"'+dis+tip+'>'+(task.d?'✓':'')+'</button>'+
        '<textarea data-krl-field="task-text" data-krl-autogrow data-mid="'+mid+'" data-kind="'+kind+'" data-tid="'+task.id+'" rows="3" placeholder="할일 내용을 적어주세요 (여러 줄 가능)" style="'+textStyle+'"'+ro+tip+'>'+escapeHtml(task.t||'')+'</textarea>'+
      '</div>'+
      '</div>';
  }
  function renderTaskListBlock(mid,kind,label){
    const data=getMemberTasks(mid,kind);
    const legacy=data.legacy,tasks=data.tasks;
    const addLabel=(kind==='today'?'할일 추가':'기록 남기기');
    const editable=(typeof canEditAs==='function')?canEditAs(mid):true;
    const dis=editable?'':' disabled';
    const tip=editable?'':' title="본인이 작성한 항목만 수정할 수 있습니다"';
    return '<div class="krl-block" data-krl-block="'+mid+':'+kind+'" style="background:white;border:1px solid var(--line);border-radius:8px;padding:10px 12px;margin-top:8px;">'+
      '<div class="krl-block-head" data-krl-head="'+mid+':'+kind+'" style="font-size:12px;color:var(--text-soft);font-weight:600;margin-bottom:6px;display:flex;align-items:center;justify-content:space-between;gap:8px;flex-wrap:wrap;">'+
        (tasks.length>0?'<span style="display:inline-flex;align-items:center;gap:6px;">'+escapeHtml(label)+'<span class="krl-count" style="font-size:11px;color:var(--text-soft);font-weight:600;">'+tasks.length+'건</span></span>':'<span></span>')+
        '<span class="krl-right" style="display:inline-flex;align-items:center;gap:6px;">'+
          (editable?'<button data-act="krl-add-task" data-mid="'+mid+'" data-kind="'+kind+'" style="padding:4px 10px;font-size:11px;color:#6241F5;background:#EEEAFE;border:1px dashed #D9CFFB;border-radius:5px;cursor:pointer;font-weight:700;font-family:inherit;line-height:1.4;"'+dis+tip+'>＋ '+addLabel+'</button>':'')+
        '</span>'+
      '</div>'+
      '<div class="krl-tasks" data-krl-tasks="'+mid+':'+kind+'">'+tasks.map(t=>renderTaskRowHtml(t,mid,kind)).join('')+'</div>'+
      (legacy?'<div class="krl-legacy" data-krl-legacy="'+mid+':'+kind+'" style="font-size:12.5px;color:var(--text);background:#FFF8E1;border:1px dashed #E5B340;border-radius:6px;padding:8px 10px;margin-top:6px;line-height:1.55;"><div style="font-size:10.5px;font-weight:700;color:#946800;margin-bottom:3px;">기존 평문 메모</div>'+escapeHtml(legacy)+'<br><button data-act="krl-clear-legacy" data-mid="'+mid+'" data-kind="'+kind+'" style="margin-top:5px;font-size:11px;color:#6241F5;background:none;border:none;cursor:pointer;padding:0;font-weight:700;">이 메모 정리 →</button></div>':'')+
      '</div>';
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
      const checklistHtml=myInits.length===0
        ? ''
        : myInits.map(i=>{const c=!!(checks[i.id]&&checks[i.id].checked);return '<div style="display:flex;align-items:center;gap:8px;padding:5px 0;font-size:13px;"><button class="rt-check '+(c?'checked':'')+'" style="width:18px;height:18px;border-width:1.5px;border-radius:4px;flex-shrink:0;" data-act="toggle-init-check" data-iid="'+i.id+'" data-mid="'+mid+'">'+(c?I.check:'')+'</button><span style="'+(c?'text-decoration:line-through;color:var(--text-soft);':'')+'flex:1;cursor:pointer;line-height:1.5;" data-act="toggle-init-check" data-iid="'+i.id+'" data-mid="'+mid+'">'+esc(i.title)+'</span><span style="font-size:11px;color:var(--text-soft);flex-shrink:0;">'+esc(i.krTitle.slice(0,14))+(i.krTitle.length>14?'…':'')+'</span></div>';}).join('');
      const initBlock=myInits.length>0?'<div style="background:#FAFAFA;border-radius:8px;padding:10px 12px;margin-bottom:6px;">'+checklistHtml+'</div>':'';
      return '<div class="field"><div class="field-label"><span class="field-dot accent-primary"></span><span class="field-name accent-primary">오늘 할 일</span>'+(myInits.length>0?'<span style="font-size:10.5px;color:var(--text-soft);margin-left:auto;font-weight:600;">담당 Initiative '+myInits.length+'건</span>':'')+'</div>'+initBlock+renderTaskListBlock(mid,'today','추가 할일')+'</div>';
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
          for(let i=1;i<=7;i++){
            const d=window.shiftDate?window.shiftDate(viewing,-i):(()=>{const x=new Date(viewing);x.setDate(x.getDate()-i);return `${x.getFullYear()}-${String(x.getMonth()+1).padStart(2,'0')}-${String(x.getDate()).padStart(2,'0')}`;})();
            const e=st.standups&&st.standups[d]&&st.standups[d].entries&&st.standups[d].entries[mid];
            if(!e)continue;
            const parsed=parseTasksField(e.today||'');
            const hasTask=parsed.tasks&&parsed.tasks.length>0;
            const hasLegacy=parsed.legacy&&parsed.legacy.trim();
            if(hasTask||hasLegacy)recent.push({date:d,tasks:parsed.tasks||[],legacy:parsed.legacy||''});
          }
          if(recent.length>0){
            const fmtDate=window.formatRecentDateLabel||(d=>d);
            // v14 — 담당자(본인) 여부 확인: 본인은 다음 날에도 체크박스 토글 가능
            const ownerEditable=(typeof canEditAs==='function')&&canEditAs(mid);
            recentHtml='<div class="krl-recent" style="margin-bottom:8px;background:#FFFDF2;border:1px solid #F5C76A;border-radius:8px;padding:10px 12px;">'+
              '<div style="font-size:11px;color:#946800;font-weight:700;margin-bottom:8px;letter-spacing:.3px;">📅 최근 7일 작성 내역 (담당자 본인은 ✓ 체크 가능)</div>'+
              recent.map(r=>{
                const dateLabel=fmtDate(r.date);
                const tasksHtml=r.tasks.map(t=>{
                  const initInfo=t.i?initMap[t.i]:null;
                  const krInfo=t.k?krMap[t.k]:null;
                  const tagChip=initInfo
                    ?'<span style="font-size:10px;background:#D9CFFB;color:#3A2670;padding:1px 7px;border-radius:999px;font-weight:700;margin-right:5px;white-space:nowrap;">⚡ '+esc(initInfo.title.slice(0,14))+(initInfo.title.length>14?'…':'')+'</span>'
                    :(krInfo?'<span style="font-size:10px;background:#EEEAFE;color:#6241F5;padding:1px 7px;border-radius:999px;font-weight:700;margin-right:5px;white-space:nowrap;">📌 '+esc(krInfo.title.slice(0,14))+(krInfo.title.length>14?'…':'')+'</span>':'');
                  const krChip=tagChip;
                  // 체크박스: 담당자 본인이면 클릭 가능 버튼, 아니면 plain 표시
                  let checkHtml;
                  if(ownerEditable){
                    checkHtml='<button class="rt-check '+(t.d?'checked':'')+'" style="width:16px;height:16px;border-width:1.5px;border-radius:4px;flex-shrink:0;margin-top:2px;margin-right:6px;display:inline-flex;align-items:center;justify-content:center;font-size:11px;padding:0;line-height:1;" data-act="recent-toggle-task" data-mid="'+mid+'" data-date="'+r.date+'" data-tid="'+t.id+'" title="이 작업 완료 토글">'+(t.d?'✓':'')+'</button>';
                  }else{
                    checkHtml='<span style="display:inline-block;width:16px;text-align:center;margin-right:4px;color:'+(t.d?'var(--growth)':'var(--text-soft)')+';">'+(t.d?'✓':'•')+'</span>';
                  }
                  return '<div class="recent-task-row" data-recent-tid="'+t.id+'" data-recent-mid="'+mid+'" data-recent-date="'+r.date+'" style="font-size:12.5px;line-height:1.55;padding:3px 0;display:flex;align-items:flex-start;">'+
                    checkHtml+
                    '<span class="recent-task-text" style="flex:1;color:'+(t.d?'var(--text-soft)':'var(--text)')+';'+(t.d?'text-decoration:line-through;':'')+'">'+krChip+esc((t.t||'').slice(0,300))+'</span>'+
                  '</div>';
                }).join('');
                const legacyHtml=r.legacy&&r.legacy.trim()?'<div style="font-size:12.5px;color:var(--text);line-height:1.55;padding:2px 0;white-space:pre-wrap;">'+esc(r.legacy)+'</div>':'';
                return '<div style="margin-bottom:8px;padding-bottom:6px;border-bottom:1px dashed #F5E0A8;">'+
                  '<div style="font-size:11px;color:#946800;font-weight:700;margin-bottom:3px;">'+dateLabel+'</div>'+
                  tasksHtml+legacyHtml+
                '</div>';
              }).join('')+
            '</div>';
          }
        }
      }catch(err){console.warn('[recent] render fail',err);}
      return '<div class="field"><div class="field-label"><span class="field-dot"></span><span class="field-name">최근 한 일</span>'+(hasAny?'<span style="font-size:10.5px;color:var(--text-soft);margin-left:auto;font-weight:600;">최근 완료 작업</span>':'')+clearBtn+'</div>'+recentHtml+summaryHtml+renderTaskListBlock(mid,'yesterday','추가 작업')+'</div>';
    };
    const _origRenderToday=window.renderToday;
    window.renderToday=function(){return _origRenderToday.apply(this,arguments);}; // v10 — 분포 차트 호출 제거
    const _origRender=window.render;
    window.render=function(){_origRender.apply(this,arguments);if(window.currentView==='today')setTimeout(autoGrowAll,0);};
    if(typeof render==='function'&&currentView==='today')render();
    console.log('[KR-Link v4] 패치 적용 완료');
  }
  applyPatches();
  // 드롭다운 열리는 순간 최신 state로 옵션 재생성
  document.addEventListener('mousedown',function(e){const sel=e.target.closest('select[data-krl-field="task-kr"]');if(!sel)return;const cur=sel.value;sel.innerHTML=buildKROptions(cur,collectAllKR());},true);
  document.addEventListener('focusin',function(e){const sel=e.target;if(sel.tagName!=='SELECT'||sel.dataset.krlField!=='task-kr')return;sel.innerHTML=buildKROptions(sel.value,collectAllKR());},true);
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
    if(a!=='krl-add-task'&&a!=='krl-toggle-task'&&a!=='krl-del-task'&&a!=='krl-clear-legacy')return;
    const mid=btn.dataset.mid,kind=btn.dataset.kind,tid=btn.dataset.tid;
    const data=getMemberTasks(mid,kind);
    if(a==='krl-add-task'){
      const newTask={id:newTaskId(),t:'',k:'',d:false};
      data.tasks.push(newTask);
      updateMemberTasks(mid,kind,data.legacy,data.tasks);
      const container=document.querySelector('[data-krl-tasks="'+mid+':'+kind+'"]');
      if(container){const tmp=document.createElement('div');tmp.innerHTML=renderTaskRowHtml(newTask,mid,kind);const newRow=tmp.firstElementChild;container.appendChild(newRow);updateCount(mid,kind,data.tasks.length);const ta=newRow.querySelector('textarea[data-krl-field="task-text"]');if(ta){ta.focus();autoGrow(ta);}}
      scheduleDistributionUpdate();
    }
    else if(a==='krl-toggle-task'){
      const t=data.tasks.find(x=>x.id===tid);if(!t)return;
      t.d=!t.d;updateMemberTasks(mid,kind,data.legacy,data.tasks);
      const row=document.querySelector('.krl-task-row[data-tid="'+tid+'"][data-mid="'+mid+'"][data-kind="'+kind+'"]');
      if(row){const check=row.querySelector('.rt-check');if(check){check.classList.toggle('checked',t.d);check.innerHTML=t.d?'✓':'';}const ta=row.querySelector('textarea[data-krl-field="task-text"]');if(ta){ta.style.textDecoration=t.d?'line-through':'';ta.style.color=t.d?'var(--text-soft)':'var(--text)';}}
      scheduleDistributionUpdate();
    }
    else if(a==='krl-del-task'){
      const next=data.tasks.filter(x=>x.id!==tid);
      updateMemberTasks(mid,kind,data.legacy,next);
      const row=document.querySelector('.krl-task-row[data-tid="'+tid+'"][data-mid="'+mid+'"][data-kind="'+kind+'"]');
      if(row)row.remove();
      updateCount(mid,kind,next.length);
      scheduleDistributionUpdate();
    }
    else if(a==='krl-clear-legacy'){
      if(!confirm('기존 평문 메모를 비울까요? (구조화된 할일 목록만 남깁니다)'))return;
      updateMemberTasks(mid,kind,'',data.tasks);
      const legacyEl=document.querySelector('[data-krl-legacy="'+mid+':'+kind+'"]');
      if(legacyEl)legacyEl.remove();
    }
  });
  document.addEventListener('input',function(e){
    const el=e.target;if(el.dataset.krlField!=='task-text')return;
    autoGrow(el);
    const mid=el.dataset.mid,kind=el.dataset.kind,tid=el.dataset.tid;
    const data=getMemberTasks(mid,kind);
    const t=data.tasks.find(x=>x.id===tid);
    if(t){t.t=el.value;updateMemberTasks(mid,kind,data.legacy,data.tasks);}
  });
  document.addEventListener('change',function(e){
    const el=e.target;if(el.dataset.krlField!=='task-kr')return;
    const mid=el.dataset.mid,kind=el.dataset.kind,tid=el.dataset.tid;
    const data=getMemberTasks(mid,kind);
    const t=data.tasks.find(x=>x.id===tid);if(!t)return;
    // v15 — "kr:..." 또는 "init:..." 형식 처리
    const val=el.value||'';
    if(val.startsWith('init:')){
      const initId=val.slice(5);
      // 부모 KR id 찾기
      const all=collectAllInit();const found=all.find(x=>x.id===initId);
      t.k=found?found.krId:'';
      t.i=initId;
    }else if(val.startsWith('kr:')){
      t.k=val.slice(3);
      t.i='';
    }else if(val){
      // 레거시 호환: bare id = KR
      t.k=val;t.i='';
    }else{
      t.k='';t.i='';
    }
    updateMemberTasks(mid,kind,data.legacy,data.tasks);
    const isInit=!!t.i;const hasKR=!!t.k;
    // 칩 색 — Initiative는 좀 더 진한 보라, KR은 연한 보라
    if(isInit){el.style.background='#D9CFFB';el.style.color='#3A2670';el.style.borderColor='#B5A0F0';}
    else if(hasKR){el.style.background='#EEEAFE';el.style.color='#6241F5';el.style.borderColor='#D9CFFB';}
    else{el.style.background='#F4F4F5';el.style.color='#737373';el.style.borderColor='var(--line)';}
    scheduleDistributionUpdate();
  });
  document.addEventListener('focusin',function(e){const el=e.target;if(el.tagName==='TEXTAREA'&&el.dataset.krlField==='task-text'){el.style.background='white';el.style.borderColor='#6241F5';}});
  document.addEventListener('focusout',function(e){const el=e.target;if(el.tagName==='TEXTAREA'&&el.dataset.krlField==='task-text'){el.style.background='#FAFAFA';el.style.borderColor='var(--line)';}});
})();
