'use strict';
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
function isGuideDismissed(key){try{const o=JSON.parse(localStorage.getItem(GUIDE_DISMISS_KEY)||'{}');return !!o[key];}catch(e){return false;}}
function dismissGuide(key){try{const o=JSON.parse(localStorage.getItem(GUIDE_DISMISS_KEY)||'{}');o[key]=true;localStorage.setItem(GUIDE_DISMISS_KEY,JSON.stringify(o));}catch(e){}}
const SUPPORT_TYPES=['자료 검토','브레인스토밍','의사결정','예산 지원','일정 조율','외부 협의','기타'];
const REFL_QUESTIONS={what_worked:'잘 된 것',what_struggled:'어려웠던 것',what_learned:'배운 것',next_try:'다음에 시도할 것'};
const REFL_ENTITY_LABELS={member:'팀원',objective:'Objective',key_result:'Key Result'};
const SELF_KEY='team-okr-self-id';
const GUIDE_DISMISS_KEY='team-okr-guide-dismissed';
const REFL_HINTS={what_worked:'결과보다 *왜* 잘 됐는지에 집중. 패턴을 발견하면 다음 분기에 재현 가능합니다.',what_struggled:'미달성을 솔직하게 적으십시오. 70% 달성도 OKR에서는 성공입니다.',what_learned:'다음 분기에 가져갈 인사이트·가설·원리.',next_try:'완벽한 답이 아닌 새로운 시도 1~2가지.'};
const GUIDES={
  objective:{title:'Objective — 분기 도달점의 정의',body:'KPI가 아니라 도달 후 변화의 모습. 짧고 외울 수 있어야(memorable) 팀이 따릅니다.',no:['"매출 10% 증가" — 결과 수치는 KR 자리'],yes:['"점주가 본부에 먼저 전화하는 신뢰 관계 구축"'],check:'영감(Inspiring) · 정성(Qualitative) · 시간 제한 · 외울 수 있음 · 권장 1~3개/분기'},
  kr:{title:'Key Result — 달성 판정의 기준',body:'"So What?" 테스트 — 이 수치가 달성되면 누구에게 어떤 가치가 발생하는가. Output(산출물)이 아닌 Outcome(결과)을 측정하십시오.',no:['"본부 회의 5회 진행" — Output(작업)은 Initiative 자리','"보고서 3건 제출" — 산출물 ≠ 결과'],yes:['"점주 만족도 70 → 80점" — Outcome(가치)','"NPS +15점" — 측정 가능한 결과'],check:'Outcome(산출물 X) · 정량 측정 · 70% 달성도 성공 · 권장 3~5개/O'},
  initiative:{title:'Initiative — KR 달성을 위한 액션',body:'KR이 "무엇을"이라면 Initiative는 "어떻게". 완료 후 KR 진척이 그려져야 합니다. (Initiative=Output이지만 KR=Outcome)',no:null,yes:null,check:'통제 가능 · 1~4주 단위 · KR과 직결'},
  confidence:{title:'Confidence — 자신감 (Wodtke 원칙)',body:'OKR 시작 시점의 적정 위치는 "중". 매주 점검하며 변화 이유를 토의합니다.',no:['상(高)으로 시작 — 야심이 부족하다는 신호 (sandbagging)'],yes:['중(中)으로 시작 — 50~70% 확률, 적정 stretch'],check:'중(5~7/10) — 적정 · 상(9/10) — 너무 쉬움 · 하(3/10) — 위험·도움 요청'},
  cadence:{title:'운영 리듬 (Cadence)',body:'OKR은 한번 세우고 끝이 아닙니다. 정기 점검이 도구의 절반입니다.',no:null,yes:null,check:'매주 — Confidence 점검 + KR 진척 갱신 (10~15분) · 격주 — 1on1·막힘 점검 · 분기말 — 4질문 회고'}
};
const CONF_HINTS={high:'9/10 — 거의 확실. 야심 부족 가능성 (sandbag 신호)',mid:'5~7/10 — 적정 stretch. 시작 시점 권장 위치 (Wodtke 원칙)',low:'3/10 이하 — 위험 신호. 도움 요청 권장'};
let currentView='today',viewingDate=todayKey(),presentMode=false;
let expanded=new Set(),krExpanded=new Set(),realityOpen=new Set();
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
    const log=state.initiativeDailyLogs[date][memberId][initiativeId];
    const{error}=await sb.from('initiative_daily_logs').upsert({initiative_id:initiativeId,member_id:memberId,date,checked:!!log.checked,note:log.note||'',done_at:new Date().toISOString()},{onConflict:'initiative_id,member_id,date'});
    if(error)showToast('일일 체크 실패',true);
    else{
      const init=findInitiative(initiativeId);
      logChange('initiative',initiativeId,'update','daily_check', checked?'미체크':'체크', checked?'체크':'미체크', init?.title||'');
    }
  });
}
function findInitiative(iid){let f=null;state.objectives.forEach(o=>o.keyResults.forEach(k=>k.initiatives.forEach(i=>{if(i.id===iid)f=i;})));return f;}

// ============================================================
// SELF IDENTIFICATION (본인 식별)
// ============================================================
function openSelfPicker(){
  const opts=state.members.map(m=>`<button class="btn btn-ghost" style="justify-content:flex-start;padding:10px 14px;font-size:13.5px;width:100%;" data-act="set-self" data-mid="${m.id}"><span style="width:22px;height:22px;border-radius:999px;background:${m.color};color:white;display:inline-grid;place-items:center;font-weight:700;font-size:11px;margin-right:10px;">${esc(m.name.slice(0,1).toUpperCase())}</span><span style="flex:1;text-align:left;font-weight:600;">${esc(m.name)}</span><span style="font-size:11px;color:var(--text-soft);">${esc(m.role||'')}</span></button>`).join('');
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
function onIDLChange(p){const r=p.new||p.old;if(!r)return;if(!state.initiativeDailyLogs[r.date])state.initiativeDailyLogs[r.date]={};if(!state.initiativeDailyLogs[r.date][r.member_id])state.initiativeDailyLogs[r.date][r.member_id]={};if(p.eventType==='DELETE'){delete state.initiativeDailyLogs[r.date][r.member_id][r.initiative_id];}else{state.initiativeDailyLogs[r.date][r.member_id][r.initiative_id]={checked:!!r.checked,note:r.note||''};}if(currentView==='today'&&r.date===viewingDate)render();}
function onTeamsChange(p){const r=p.new||p.old;if(!r)return;if(p.eventType==='DELETE'){state.teams=state.teams.filter(t=>t.id!==r.id);}else{const i=state.teams.findIndex(t=>t.id===r.id);if(i>=0)state.teams[i]={...r};else state.teams.push({...r});state.teams.sort((a,b)=>(a.sort_order||0)-(b.sort_order||0));}render();}
function onMembersChange(p){const r=p.new||p.old;if(r.team_id&&r.team_id!==state.currentTeamId)return;if(p.eventType==='DELETE'){state.members=state.members.filter(m=>m.id!==r.id);}else{const i=state.members.findIndex(m=>m.id===r.id);if(i>=0)state.members[i]={...r};else state.members.push({...r});state.members.sort((a,b)=>(a.sort_order||0)-(b.sort_order||0));}if(['today','manage','eval'].includes(currentView))render();}
function onObjectivesChange(p){const r=p.new||p.old;if(r.team_id&&r.team_id!==state.currentTeamId)return;if(p.eventType==='DELETE'){state.objectives=state.objectives.filter(o=>o.id!==r.id);}else{const i=state.objectives.findIndex(o=>o.id===r.id);if(i>=0){Object.assign(state.objectives[i],{title:r.title,description:r.description,ownerId:r.owner_id,confidence:r.confidence||'mid',realityBlocker:r.reality_blocker||'',realityHelp:r.reality_help||''});}else{state.objectives.push({id:r.id,title:r.title,description:r.description||'',ownerId:r.owner_id,confidence:r.confidence||'mid',realityBlocker:r.reality_blocker||'',realityHelp:r.reality_help||'',keyResults:[]});expanded.add(r.id);}}render();}
function onKRChange(p){const r=p.new||p.old;const o=state.objectives.find(x=>x.id===r.objective_id);if(!o&&p.eventType!=='DELETE')return;if(p.eventType==='DELETE'){if(o)o.keyResults=o.keyResults.filter(k=>k.id!==r.id);}else{if(!o)return;const idx=o.keyResults.findIndex(k=>k.id===r.id);const exist=idx>=0?o.keyResults[idx].initiatives:[];const kr={id:r.id,title:r.title,target:Number(r.target||0),current:Number(r.current||0),unit:r.unit||'',ownerId:r.owner_id,dueDate:r.due_date,confidence:r.confidence||'mid',realityBlocker:r.reality_blocker||'',realityHelp:r.reality_help||'',initiatives:exist};if(idx>=0)o.keyResults[idx]=kr;else o.keyResults.push(kr);}render();}
function onInitChange(p){const r=p.new||p.old;let kr=null;state.objectives.forEach(o=>o.keyResults.forEach(k=>{if(k.id===r.kr_id)kr=k;}));if(!kr){state.objectives.forEach(o=>o.keyResults.forEach(k=>{k.initiatives=k.initiatives.filter(i=>i.id!==r.id);}));render();return;}if(p.eventType==='DELETE'){kr.initiatives=kr.initiatives.filter(i=>i.id!==r.id);}else{const init={id:r.id,title:r.title,ownerId:r.owner_id,status:r.status||'todo',dueDate:r.due_date,confidence:r.confidence||'mid',realityBlocker:r.reality_blocker||'',realityHelp:r.reality_help||''};const i=kr.initiatives.findIndex(x=>x.id===r.id);if(i>=0)kr.initiatives[i]=init;else kr.initiatives.push(init);}render();}
function onStandupChange(p){const r=p.new||p.old;if(!r)return;if(r.team_id&&r.team_id!==state.currentTeamId)return;ensureStandup(r.date);if(p.eventType!=='DELETE')state.standups[r.date].headline=r.headline||'';if(currentView==='today'&&r.date===viewingDate){const ta=document.querySelector(`textarea[data-field="headline"][data-date="${viewingDate}"]`);if(ta&&document.activeElement!==ta)ta.value=r.headline||'';}}
function onEntryChange(p){const r=p.new||p.old;if(!r)return;if(r.team_id&&r.team_id!==state.currentTeamId)return;ensureStandup(r.date);if(p.eventType==='DELETE'){delete state.standups[r.date].entries[r.member_id];}else{state.standups[r.date].entries[r.member_id]={yesterday:r.yesterday||'',today:r.today||'',blockers:r.blockers||'',helper_member_id:r.helper_member_id||'',helper_name:r.helper_name||'',support_type:r.support_type||'',support_detail:r.support_detail||''};}if(currentView==='today'&&r.date===viewingDate){['yesterday','today','blockers'].forEach(f=>{const ta=document.querySelector(`textarea[data-field="standup"][data-mid="${r.member_id}"][data-fieldname="${f}"][data-date="${viewingDate}"]`);if(ta&&document.activeElement!==ta)ta.value=(state.standups[r.date].entries[r.member_id]||{})[f]||'';});const c=document.querySelector(`[data-member-card="${r.member_id}"]`);if(c){c.classList.remove('remote-edit');void c.offsetWidth;c.classList.add('remote-edit');setTimeout(()=>c.classList.remove('remote-edit'),1500);}updateBlockerUI(r.date,r.member_id);}}
function onRoutineChange(p){const r=p.new||p.old;if(r.team_id&&r.team_id!==state.currentTeamId)return;if(p.eventType==='DELETE'){state.routines=state.routines.filter(x=>x.id!==r.id);}else{const i=state.routines.findIndex(x=>x.id===r.id);if(i>=0)state.routines[i]={...r};else state.routines.push({...r});}render();}
function onRoutineLogChange(p){const r=p.new||p.old;ensureRoutineLog(r.date);if(p.eventType==='DELETE'){delete state.routineLogs[r.date][r.routine_id];}else{state.routineLogs[r.date][r.routine_id]={completed:!!r.completed,note:r.note||''};}if(['today','routines'].includes(currentView)&&r.date===viewingDate)render();}
function onReviewChange(p){const r=p.new||p.old;if(r.team_id&&r.team_id!==state.currentTeamId)return;if(p.eventType==='DELETE'){state.reviews=state.reviews.filter(x=>x.id!==r.id);}else{const i=state.reviews.findIndex(x=>x.id===r.id);if(i>=0)state.reviews[i]={...r};else state.reviews.unshift({...r});}if(currentView==='eval')render();}
function updateConnDot(){const e=document.getElementById('conn-dot');if(!e)return;e.className=`conn-dot ${connStatus}`;e.textContent=connStatus==='online'?'실시간 연결됨':connStatus==='connecting'?'연결 중':'오프라인';}

const debouncers={};
function debouncedSave(k,fn,d=400){clearTimeout(debouncers[k]);debouncers[k]=setTimeout(fn,d);}
async function logChange(et,eid,act,fn,bv,av,lb){try{await sb.from('audit_log').insert({team_id:state.currentTeamId,entity_type:et,entity_id:eid,entity_label:lb||'',action:act,field_name:fn||'',before_value:String(bv??''),after_value:String(av??'')});}catch(e){}}
async function saveTeam(t){debouncedSave(`tm-${t.id}`,async()=>{const{error}=await sb.from('teams').upsert({id:t.id,name:t.name,quarter:t.quarter,sort_order:t.sort_order||0});if(error)showToast('팀 저장 실패',true);});}
async function saveMember(m){debouncedSave(`mem-${m.id}`,async()=>{const{error}=await sb.from('members').upsert({id:m.id,team_id:m.team_id||state.currentTeamId,name:m.name,role:m.role||'',color:m.color||'#6241F5',sort_order:state.members.findIndex(x=>x.id===m.id)});if(error)showToast('팀원 저장 실패',true);});}
async function saveObjective(o){debouncedSave(`obj-${o.id}`,async()=>{const{error}=await sb.from('objectives').upsert({id:o.id,team_id:state.currentTeamId,title:o.title,description:o.description||'',owner_id:o.ownerId||null,confidence:o.confidence||'mid',reality_blocker:o.realityBlocker||'',reality_help:o.realityHelp||'',sort_order:state.objectives.findIndex(x=>x.id===o.id)});if(error)showToast('Objective 저장 실패',true);});}
async function saveKR(oid,kr){debouncedSave(`kr-${kr.id}`,async()=>{const o=state.objectives.find(x=>x.id===oid);const si=o?o.keyResults.findIndex(x=>x.id===kr.id):0;const{error}=await sb.from('key_results').upsert({id:kr.id,objective_id:oid,title:kr.title,target:kr.target,current:kr.current,unit:kr.unit||'',owner_id:kr.ownerId||null,due_date:kr.dueDate||null,confidence:kr.confidence||'mid',reality_blocker:kr.realityBlocker||'',reality_help:kr.realityHelp||'',sort_order:si});if(error)showToast('KR 저장 실패',true);});}
async function saveInitiative(krId,init){debouncedSave(`init-${init.id}`,async()=>{let kr=null;state.objectives.forEach(o=>o.keyResults.forEach(k=>{if(k.id===krId)kr=k;}));const si=kr?kr.initiatives.findIndex(i=>i.id===init.id):0;const{error}=await sb.from('initiatives').upsert({id:init.id,kr_id:krId,title:init.title,owner_id:init.ownerId||null,status:init.status||'todo',due_date:init.dueDate||null,confidence:init.confidence||'mid',reality_blocker:init.realityBlocker||'',reality_help:init.realityHelp||'',sort_order:si});if(error)showToast('이니셔티브 저장 실패',true);});}
async function saveHeadline(date,h){ensureStandup(date);state.standups[date].headline=h;debouncedSave(`hl-${date}`,async()=>{const{error}=await sb.from('standups').upsert({team_id:state.currentTeamId,date,headline:h,updated_at:new Date().toISOString()},{onConflict:'team_id,date'});if(error)showToast('헤드라인 저장 실패',true);});}
async function saveEntry(date,mid,f,v){ensureStandup(date);if(!state.standups[date].entries[mid])state.standups[date].entries[mid]={yesterday:'',today:'',blockers:'',helper_member_id:'',helper_name:'',support_type:'',support_detail:''};state.standups[date].entries[mid][f]=v;debouncedSave(`en-${date}-${mid}`,async()=>{const e=state.standups[date].entries[mid];const{error}=await sb.from('standup_entries').upsert({team_id:state.currentTeamId,date,member_id:mid,yesterday:e.yesterday||'',today:e.today||'',blockers:e.blockers||'',helper_member_id:e.helper_member_id||null,helper_name:e.helper_name||'',support_type:e.support_type||'',support_detail:e.support_detail||'',updated_at:new Date().toISOString()},{onConflict:'team_id,date,member_id'});if(error)showToast('스탠드업 저장 실패',true);});}
async function saveRoutine(r){debouncedSave(`rt-${r.id}`,async()=>{const{error}=await sb.from('routines').upsert({id:r.id,team_id:state.currentTeamId,title:r.title,description:r.description||'',owner_id:r.owner_id||null,frequency:r.frequency||'weekdays',days_of_week:r.days_of_week||[1,2,3,4,5],day_of_month:r.day_of_month||null,active:r.active!==false,sort_order:state.routines.findIndex(x=>x.id===r.id)});if(error)showToast('루틴 저장 실패',true);});}
async function saveRoutineLog(rid,date,c,n){ensureRoutineLog(date);state.routineLogs[date][rid]={completed:c,note:n!=null?n:(state.routineLogs[date][rid]?.note||'')};debouncedSave(`rtl-${rid}-${date}`,async()=>{const l=state.routineLogs[date][rid];const{error}=await sb.from('routine_logs').upsert({routine_id:rid,date,completed:!!l.completed,note:l.note||'',done_at:new Date().toISOString()},{onConflict:'routine_id,date'});if(error)showToast('루틴 기록 실패',true);});}
async function saveReview(r){const{error}=await sb.from('reviews').upsert({id:r.id,team_id:state.currentTeamId,member_id:r.member_id||null,period:r.period,quarter:r.quarter,entity_type:r.entity_type||'member',entity_id:r.entity_id||r.member_id,what_worked:r.what_worked||'',what_struggled:r.what_struggled||'',what_learned:r.what_learned||'',next_try:r.next_try||'',summary:r.summary||'',reviewer:r.reviewer||'',updated_at:new Date().toISOString()});if(error){showToast('회고 저장 실패',true);return false;}return true;}
function lastReflectionFor(entityType,entityId,period){return state.reviews.find(r=>(r.entity_type||'member')===entityType && (r.entity_id||r.member_id)===entityId && r.period===period);}

function render(){
  if(!initialized)return;
  const app=document.getElementById('app');
  let html=renderHeader();
  html+='<main class="view">';
  if(dateLoading){html+='<div class="empty"><div class="loading-spinner" style="margin:0 auto 12px;"></div>날짜 데이터 불러오는 중…</div>';}
  else if(currentView==='today')html+=renderToday();
  else if(currentView==='okr')html+=renderOKR();
  else if(currentView==='routines')html+=renderRoutinesView();
  else if(currentView==='eval')html+=renderEval();
  else html+=renderManage();
  html+='</main>';
  const t=currentTeam();
  html+=`<footer class="app-footer"><span>실시간 동기화 · ${esc(t?t.name:'')} · ${esc(t?t.quarter:'')}</span><span style="margin-left:auto;"><button class="btn-mode" data-act="reset-config">설정 변경</button></span></footer>`;
  app.innerHTML=html;
  document.body.classList.toggle('present',presentMode);
}

function renderHeader(){
  const t=currentTeam();const ini=teamInitial(t?.name);const col=teamColor(t);
  const tm=state.teams.map(x=>`<div class="team-menu-item ${x.id===state.currentTeamId?'active':''}" data-act="switch-team" data-tid="${x.id}"><span style="width:14px;height:14px;border-radius:4px;background:${teamColor(x)};display:inline-block;"></span><span style="flex:1;">${esc(x.name)}</span><span style="font-size:11px;color:var(--text-soft);">${esc(x.quarter)}</span></div>`).join('');
  return `<header class="app-header"><div class="hdr-inner"><div style="display:flex;align-items:center;gap:8px;position:relative;"><div class="brand" data-act="goto-home"><div class="brand-mark" style="background:${col};">${esc(ini)}</div><div class="brand-meta"><div class="brand-title">${esc(t?t.name:'팀')} OKR <button class="team-switch" data-act="toggle-team-menu">${state.teams.length>1?'전환 ▾':'팀 ▾'}</button></div><div class="brand-sub">${esc(t?t.quarter:'')} · 일일 스프린트</div></div></div><div class="team-menu" id="team-menu">${tm}<div class="team-menu-divider"></div><div class="team-menu-add" data-act="add-team">${I.plus} 새 팀 추가</div></div></div><nav class="tabs"><span id="conn-dot" class="conn-dot ${connStatus}">${connStatus==='online'?'실시간 연결됨':connStatus==='connecting'?'연결 중':'오프라인'}</span><button class="btn-mode" data-act="open-self-picker" title="본인 변경" style="font-size:11px;">${selfMember()?'👤 '+esc(selfMember().name):isObserver()?'관찰자':'본인 선택'}</button><span class="tab-divider"></span><button class="tab ${currentView==='today'?'active':''}" data-act="view" data-view="today">${I.cal} 오늘</button><button class="tab ${currentView==='okr'?'active':''}" data-act="view" data-view="okr">${I.target} OKR</button><button class="tab ${currentView==='routines'?'active':''}" data-act="view" data-view="routines">${I.loop} 루틴</button><button class="tab ${currentView==='eval'?'active':''}" data-act="view" data-view="eval">${I.star} 회고</button><button class="tab ${currentView==='manage'?'active':''}" data-act="view" data-view="manage">${I.cog} 관리</button><span class="tab-divider"></span><button class="btn-mode" data-act="present">${presentMode?I.collapse:I.expand} ${presentMode?'일반':'발표'}</button></nav></div></header>`;
}

function renderToday(){
  const date=viewingDate;const isToday=date===todayKey();
  const standup=state.standups[date]||{headline:'',entries:{}};
  const allKR=[];state.objectives.forEach(o=>o.keyResults.forEach(k=>allKR.push({...k,objId:o.id})));
  const overall=allKR.length?Math.round(allKR.reduce((s,k)=>s+pct(k.current,k.target),0)/allKR.length):0;
  const blockers=Object.values(standup.entries||{}).filter(e=>e?.blockers?.trim()).length;
  const todayRoutines=isToday?activeRoutinesForDate(date):[];
  const rl=state.routineLogs[date]||{};
  const doneCnt=todayRoutines.filter(r=>rl[r.id]?.completed).length;
  const dueItems=collectDueThisWeek();
  const self=selfMember();
  return `<div class="date-bar"><button class="date-nav-btn" data-act="date-shift" data-delta="-1">${I.chevLeft}</button><input type="date" class="date-input" value="${date}" data-act="date-set"><button class="date-nav-btn" data-act="date-shift" data-delta="1">${I.chevRight}</button>${isToday?'<span class="today-tag">오늘</span>':`<span class="past-tag">${date<todayKey()?'지난 회의':'미래 날짜'}</span><button class="btn btn-soft" data-act="date-today">오늘로</button>`}</div>
  ${isToday?renderBriefing(self):''}
  ${isToday?`<div class="card-section">${renderInputCheck(date,standup)}</div>`:''}
  <section class="card card-section"><div class="headline-meta">${I.cal} ${formatDateLong(date)}</div><textarea class="headline-input" rows="2" placeholder="오늘의 한 줄 — 두괄식 결론으로 이번 회의의 초점을 적어주세요" data-field="headline" data-date="${date}">${esc(standup.headline||'')}</textarea><div class="stat-row"><div><div class="stat-label">OKR 평균 진척</div><div class="stat-value" style="color:${progressColor(overall)};">${overall}%</div></div><div class="stat-divider"></div><div><div class="stat-label">진행 중 KR</div><div class="stat-value">${allKR.length}개</div></div><div class="stat-divider"></div><div><div class="stat-label">${isToday?'오늘 막힘':'그날 막힘'}</div><div class="stat-value" data-blocker-stat style="color:${blockers>0?C.warning:C.growth};">${blockers>0?`${blockers}건`:'없음'}</div></div>${isToday&&todayRoutines.length>0?`<div class="stat-divider"></div><div><div class="stat-label">오늘 루틴</div><div class="stat-value" style="color:${doneCnt===todayRoutines.length?C.growth:C.amber};">${doneCnt}/${todayRoutines.length}</div></div>`:''}</div></section>
  ${isToday&&todayRoutines.length>0?`<section class="card card-section"><div class="section-head"><span style="color:var(--primary);">${I.loop}</span><span class="section-title">오늘의 루틴</span><span class="section-meta">· 매일 챙겨야 할 일</span></div>${todayRoutines.map(r=>renderRoutineCheck(r,rl[r.id]||{})).join('')}</section>`:''}
  ${dueItems.length>0?`<section class="card card-section"><div class="section-head"><span style="color:var(--amber);">${I.flag}</span><span class="section-title">이번 주 마감 (${dueItems.length}건)</span></div>${dueItems.map(d=>`<div style="padding:8px 0;display:flex;align-items:center;gap:10px;border-bottom:1px solid #F4F4F5;font-size:13px;"><span style="font-size:11px;padding:2px 8px;border-radius:999px;background:${d.type==='kr'?'#EEEAFE':'#F4F4F5'};color:${d.type==='kr'?C.primary:C.textSoft};font-weight:700;">${d.type==='kr'?'KR':'Init'}</span><span style="flex:1;">${esc(d.title)}</span><span style="font-size:11.5px;color:${isOverdue(d.dueDate,d.status)?C.warning:C.textSoft};font-weight:600;">${dueShort(d.dueDate)}${isOverdue(d.dueDate,d.status)?' · 지연':''}</span></div>`).join('')}</section>`:''}
  <section class="card card-section"><div class="section-head"><span style="color:var(--primary);">${I.trend}</span><span class="section-title">이번 분기 KR 한판 보기</span><span class="section-meta" style="margin-left:auto;">${esc(currentTeam()?.quarter||'')}</span></div>${renderKRStrip(allKR)}</section>
  <div class="card-section"><div class="section-head"><span style="color:var(--primary);">${I.msg}</span><span class="section-title">${isToday?'오늘의 스탠드업':`${date} 스탠드업`}</span><span class="section-meta">· 어제 / 오늘 / 막힘</span></div>${state.members.length===0?'<div class="empty">팀원을 먼저 등록해주세요. <strong>관리</strong> 탭에서 추가할 수 있습니다.</div>':`<div class="member-grid">${state.members.map(m=>renderMemberCard(m,standup.entries?.[m.id]||{})).join('')}</div>`}</div>`;
}
function renderKRStrip(allKR){if(allKR.length===0)return '<div style="font-size:13px;color:var(--text-soft);">아직 등록된 KR이 없습니다.</div>';return allKR.map(kr=>{const p=pct(kr.current,kr.target);const o=state.members.find(m=>m.id===kr.ownerId);return `<div class="kr-strip-row"><div class="kr-strip-head"><div style="display:flex;align-items:center;gap:8px;min-width:0;"><span class="kr-strip-title">${esc(kr.title)}</span>${o?`<span class="kr-strip-owner">${esc(o.name)}</span>`:''}<span class="conf-chip ${kr.confidence||'mid'}" style="cursor:default;">${CONF_LABELS[kr.confidence||'mid']}</span></div><div class="kr-strip-meta">${kr.dueDate?`<span class="kr-strip-num" style="color:${isOverdue(kr.dueDate)?C.warning:C.textSoft};">${dueShort(kr.dueDate)}</span>`:''}<span class="kr-strip-num">${kr.current} / ${kr.target} ${esc(kr.unit||'')}</span><span class="kr-strip-pct" style="color:${progressColor(p)};">${p}%</span></div></div><div class="progress-track"><div class="progress-fill" style="width:${p}%;background:${progressColor(p)};"></div></div></div>`;}).join('');}
function renderMemberCard(m,e){
  const has=!!(e.blockers&&e.blockers.trim());
  const date=viewingDate;
  const yesterday=shiftDate(date,-1);
  const myInits=getMemberInitiatives(m.id);
  const todayChecks=getIDLForMemberDate(m.id,date);
  const yChecks=getIDLForMemberDate(m.id,yesterday);
  // 어제 체크된 Initiative 자동 요약
  const yDoneInits=Object.entries(yChecks).filter(([_,v])=>v.checked).map(([iid,v])=>{const i=findInitiative(iid);return i?{title:i.title,note:v.note}:null;}).filter(Boolean);
  return `<div class="member-card ${has?'has-blocker':''}" data-member-card="${m.id}">
    <div class="member-head"><div class="avatar" style="background:${m.color};">${esc(m.name.slice(0,1).toUpperCase())}</div><div><div class="member-name">${esc(m.name)}</div><div class="member-role">${esc(m.role||'')}</div></div>${has?`<span class="blocker-badge">${I.alert} 도움 필요</span>`:''}</div>
    ${renderYesterdaySection(m.id,e.yesterday,yDoneInits)}
    ${renderTodaySection(m.id,e.today,myInits,todayChecks)}
    ${renderBlockerSection(m.id,e)}
  </div>`;
}
function renderYesterdaySection(mid,memo,yDone){
  const summaryHtml=yDone.length>0
    ? `<div style="display:flex;flex-wrap:wrap;gap:4px;margin-bottom:6px;">${yDone.map(i=>`<span style="font-size:10.5px;padding:2px 7px;background:var(--growth-soft);color:var(--growth);border-radius:999px;font-weight:600;">${esc(i.title.slice(0,18))}${i.title.length>18?'…':''}</span>`).join('')}</div>`
    : '<div style="font-size:11px;color:var(--text-soft);margin-bottom:6px;">어제 체크된 Initiative 없음</div>';
  return `<div class="field"><div class="field-label"><span class="field-dot"></span><span class="field-name">어제 한 일</span></div>${summaryHtml}<textarea class="field-input" rows="1" placeholder="추가 메모 (선택)" data-field="standup" data-fieldname="yesterday" data-mid="${mid}" data-date="${viewingDate}">${esc(memo||'')}</textarea></div>`;
}
function renderTodaySection(mid,memo,myInits,checks){
  const checklistHtml=myInits.length===0
    ? '<div style="font-size:11px;color:var(--text-soft);padding:4px 0;">담당 Initiative가 없습니다. OKR 탭에서 배정하세요.</div>'
    : myInits.map(i=>{const c=!!checks[i.id]?.checked;return `<div style="display:flex;align-items:center;gap:6px;padding:3px 0;font-size:12px;"><button class="rt-check ${c?'checked':''}" style="width:16px;height:16px;border-width:1.5px;border-radius:4px;" data-act="toggle-init-check" data-iid="${i.id}" data-mid="${mid}">${c?I.check:''}</button><span style="${c?'text-decoration:line-through;color:var(--text-soft);':''}flex:1;cursor:pointer;" data-act="toggle-init-check" data-iid="${i.id}" data-mid="${mid}">${esc(i.title)}</span><span style="font-size:10px;color:var(--text-soft);">${esc(i.krTitle.slice(0,12))}${i.krTitle.length>12?'…':''}</span></div>`;}).join('');
  return `<div class="field"><div class="field-label"><span class="field-dot accent-primary"></span><span class="field-name accent-primary">오늘 할 일</span><span style="font-size:10px;color:var(--text-soft);margin-left:auto;">담당 Initiative ${myInits.length}건</span></div><div style="background:#FAFAFA;border-radius:6px;padding:6px 8px;margin-bottom:6px;">${checklistHtml}</div><textarea class="field-input" rows="1" placeholder="추가 메모 — Initiative 외 오늘의 목표" data-field="standup" data-fieldname="today" data-mid="${mid}" data-date="${viewingDate}">${esc(memo||'')}</textarea></div>`;
}
function renderBlockerSection(mid,e){
  const has=!!(e.blockers&&e.blockers.trim());
  const helperKey=`helper:${mid}`;
  const helpOpen=realityOpen.has(helperKey) || !!(e.helper_member_id||e.helper_name||e.support_type||e.support_detail);
  const accent=has?'accent-warning':'';
  const helper=state.members.find(x=>x.id===e.helper_member_id);
  const helperLabel=helper?helper.name:(e.helper_name||'');
  return `<div class="field"><div class="field-label"><span class="field-dot ${accent}"></span><span class="field-name ${accent}">막힘 / 도움 필요</span><button class="reality-toggle ${(e.helper_member_id||e.helper_name||e.support_type||e.support_detail)?'has-content':''}" style="margin-left:auto;" data-act="toggle-reality" data-key="${helperKey}">${helpOpen?'도움요청 ▴':'도움요청 ▾'}</button></div>
    <textarea class="field-input" rows="2" placeholder="없으면 비워두기 — 무엇이 막혔나" data-field="standup" data-fieldname="blockers" data-mid="${mid}" data-date="${viewingDate}">${esc(e.blockers||'')}</textarea>
    ${helpOpen?`<div class="reality-box" style="margin-top:6px;padding:8px 10px;">
      <div style="display:flex;gap:6px;align-items:center;flex-wrap:wrap;margin-bottom:6px;">
        <span style="font-size:10.5px;font-weight:700;color:var(--text-soft);">누구에게:</span>
        <select class="rt-input" style="font-size:11.5px;padding:3px 7px;" data-field="helper-member" data-mid="${mid}">
          <option value="">팀원 선택…</option>
          ${state.members.filter(x=>x.id!==mid).map(x=>`<option value="${x.id}" ${e.helper_member_id===x.id?'selected':''}>${esc(x.name)}</option>`).join('')}
        </select>
        <input class="rt-input" style="font-size:11.5px;padding:3px 7px;flex:1;min-width:100px;" placeholder="또는 자유 입력 (예: 본부장님, 외부 자문)" data-field="helper-name" data-mid="${mid}" value="${esc(e.helper_name||'')}" />
      </div>
      <div style="display:flex;gap:4px;align-items:center;flex-wrap:wrap;margin-bottom:6px;">
        <span style="font-size:10.5px;font-weight:700;color:var(--text-soft);">유형:</span>
        ${SUPPORT_TYPES.map(t=>`<button class="btn-mode" style="${e.support_type===t?'background:var(--primary-soft);color:var(--primary);font-weight:600;':''}padding:2px 8px;font-size:11px;" data-act="set-support-type" data-mid="${mid}" data-type="${esc(t)}">${esc(t)}</button>`).join('')}
      </div>
      <textarea class="reality-input" rows="2" placeholder="구체적으로 어떤 도움이 필요한가요?" data-field="support-detail" data-mid="${mid}">${esc(e.support_detail||'')}</textarea>
    </div>`:''}</div>`;
}
function renderField(l,f,mid,v,ph,acc){const cls=acc?`accent-${acc}`:'';return `<div class="field"><div class="field-label"><span class="field-dot ${cls}"></span><span class="field-name ${cls}">${esc(l)}</span></div><textarea class="field-input" rows="2" placeholder="${esc(ph)}" data-field="standup" data-fieldname="${f}" data-mid="${mid}" data-date="${viewingDate}">${esc(v||'')}</textarea></div>`;}
function activeRoutinesForDate(date){const dt=new Date(date+'T00:00:00');const dow=dt.getDay()===0?7:dt.getDay();const dom=dt.getDate();return state.routines.filter(r=>{if(r.active===false)return false;if(r.frequency==='daily')return true;if(r.frequency==='weekdays')return dow>=1&&dow<=5;if(r.frequency==='weekly'||r.frequency==='custom'){return(r.days_of_week||[]).includes(dow);}if(r.frequency==='monthly')return r.day_of_month===dom;return false;});}
function renderRoutineCheck(r,log){const o=state.members.find(m=>m.id===r.owner_id);const c=!!log.completed;return `<div class="rt-item ${c?'done':''}"><button class="rt-check ${c?'checked':''}" data-act="toggle-routine" data-rid="${r.id}">${c?I.check:''}</button><div class="rt-info"><div class="rt-title">${esc(r.title)}</div><div class="rt-meta">${o?esc(o.name)+' · ':''}${freqText(r)}</div></div><input class="rt-note-input" placeholder="메모 (선택)" data-field="rt-note" data-rid="${r.id}" value="${esc(log.note||'')}" /></div>`;}
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
function renderOKR(){
  const totalKR=state.objectives.reduce((s,o)=>s+o.keyResults.length,0);
  const isEmpty=state.objectives.length===0;
  const oCnt=state.objectives.length;const oWarn=oCnt>3?'<span style="font-size:11px;color:var(--warning);font-weight:600;margin-left:6px;">⚠ 권장 1~3개 (Less is more)</span>':'';
  return `<div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:14px;flex-wrap:wrap;gap:10px;"><div><h2 style="font-weight:800;font-size:23px;margin:0;">분기 OKR</h2><div style="font-size:13px;color:var(--text-soft);margin-top:2px;">${esc(currentTeam()?.quarter||'')} · O ${oCnt}개 · KR ${totalKR}개${oWarn}</div></div><button class="btn btn-primary" data-act="add-obj">${I.plus} Objective 추가</button></div>${isEmpty?renderGuideCard('objective')+renderGuideCard('kr')+renderGuideCard('initiative')+renderGuideCard('confidence')+renderGuideCard('cadence')+`<div class="empty"><div style="margin-bottom:6px;">${I.target}</div>분기 도달점을 정의하는 것으로 시작하십시오.</div>`:state.objectives.map((o,i)=>renderObjective(o,i)).join('')}`;
}
function renderObjective(o,idx){
  const open=expanded.has(o.id);const avg=o.keyResults.length?Math.round(o.keyResults.reduce((s,k)=>s+pct(k.current,k.target),0)/o.keyResults.length):0;
  const rk=`objective:${o.id}`;const ro=realityOpen.has(rk);const hr=(o.realityBlocker||o.realityHelp);
  return `<div class="obj-card" data-obj-id="${o.id}"><div class="obj-head"><button class="obj-toggle btn-icon" data-act="toggle-obj" data-oid="${o.id}">${open?I.chevUp:I.chevDown}</button><div class="obj-body"><div class="obj-tags"><span class="tag-id">O${idx+1}</span>${guideHelp('objective')}<select class="tag-owner" data-field="obj-owner" data-oid="${o.id}"><option value="">담당 미지정</option>${state.members.map(m=>`<option value="${m.id}" ${o.ownerId===m.id?'selected':''}>${esc(m.name)}</option>`).join('')}</select>${renderConfChip('objective',o.id,o.confidence||'mid')}<button class="reality-toggle ${hr?'has-content':''}" data-act="toggle-reality" data-key="${rk}">${ro?'Reality ▴':'Reality ▾'}</button><button class="btn-icon" data-act="show-history" data-etype="objective" data-eid="${o.id}" title="이력">${I.clock}</button><button class="btn-icon" data-act="open-reflection" data-etype="objective" data-eid="${o.id}" data-period="final" title="회고 작성">${I.star}</button></div><input class="obj-title-input" data-field="obj-title" data-oid="${o.id}" value="${esc(o.title)}" placeholder="가슴 뛰는 도달점 (예: 점주가 본부에 먼저 전화하는 신뢰 관계)" /><input class="obj-desc-input" data-field="obj-desc" data-oid="${o.id}" placeholder="이 목표가 달성되었을 때 우리 팀·고객에게 어떤 변화가 있는가" value="${esc(o.description||'')}" />${ro?renderRealityBox('objective',o.id,o.realityBlocker,o.realityHelp):''}</div><div class="obj-avg-wrap"><div class="obj-avg-label">평균 진척</div><div class="obj-avg" data-obj-avg style="color:${progressColor(avg)};">${avg}%</div><div class="obj-actions"><button class="btn-icon" data-act="del-obj" data-oid="${o.id}" title="삭제">${I.trash}</button></div></div></div>${open?`<div class="obj-krs">${o.keyResults.map((kr,ki)=>renderKR(o.id,kr,ki)).join('')}<div class="add-line"><button class="btn btn-soft" data-act="add-kr" data-oid="${o.id}">${I.plus} KR 추가</button>${o.keyResults.length>5?'<span style="font-size:11px;color:var(--warning);font-weight:600;margin-left:8px;align-self:center;">⚠ 권장 3~5개</span>':o.keyResults.length<3&&o.keyResults.length>0?'<span style="font-size:11px;color:var(--text-soft);margin-left:8px;align-self:center;">권장 3~5개 (현재 '+o.keyResults.length+'개)</span>':''}</div></div>`:''}</div>`;
}
function renderKR(oid,kr,idx){
  const p=pct(kr.current,kr.target);const rk=`kr:${kr.id}`;const ro=realityOpen.has(rk);const hr=(kr.realityBlocker||kr.realityHelp);const ko=krExpanded.has(kr.id);
  return `<div class="kr-row" data-kr-id="${kr.id}" data-oid="${oid}"><div class="kr-row-line"><span class="kr-id">KR${idx+1}</span>${guideHelp('kr')}<input class="kr-title-input" data-field="kr-title" data-oid="${oid}" data-krid="${kr.id}" value="${esc(kr.title)}" placeholder="결과 측정 기준 (예: 점주 만족도 70 → 80)" /><select class="kr-owner-select" data-field="kr-owner" data-oid="${oid}" data-krid="${kr.id}"><option value="">담당</option>${state.members.map(m=>`<option value="${m.id}" ${kr.ownerId===m.id?'selected':''}>${esc(m.name)}</option>`).join('')}</select><input type="number" class="kr-num-input" data-field="kr-current" data-oid="${oid}" data-krid="${kr.id}" value="${kr.current}" /><span style="color:var(--text-soft);font-size:12px;">/</span><input type="number" class="kr-num-input" data-field="kr-target" data-oid="${oid}" data-krid="${kr.id}" value="${kr.target}" /><input class="kr-unit-input" placeholder="단위" data-field="kr-unit" data-oid="${oid}" data-krid="${kr.id}" value="${esc(kr.unit||'')}" /><input type="date" class="kr-due-input ${isOverdue(kr.dueDate)?'overdue':''}" data-field="kr-due" data-oid="${oid}" data-krid="${kr.id}" value="${kr.dueDate||''}" />${renderConfChip('kr',kr.id,kr.confidence||'mid')}<button class="reality-toggle ${hr?'has-content':''}" data-act="toggle-reality" data-key="${rk}">${ro?'R ▴':'R ▾'}</button><span class="kr-pct" data-kr-pct style="color:${progressColor(p)};">${p}%</span><button class="btn-icon" data-act="show-history" data-etype="key_result" data-eid="${kr.id}" title="이력">${I.clock}</button><button class="btn-icon" data-act="open-reflection" data-etype="key_result" data-eid="${kr.id}" data-period="final" title="회고 작성">${I.star}</button><button class="btn-icon" data-act="toggle-kr" data-krid="${kr.id}" title="이니셔티브">${ko?I.chevUp:I.chevDown}</button><button class="btn-icon" data-act="del-kr" data-oid="${oid}" data-krid="${kr.id}" title="삭제">${I.x}</button></div><div class="kr-bar-wrap"><div class="kr-bar-track"><div class="progress-fill" data-kr-bar style="width:${p}%;background:${progressColor(p)};"></div></div></div>${ro?renderRealityBox('kr',kr.id,kr.realityBlocker,kr.realityHelp):''}${ko?renderInitiativesList(kr):''}</div>`;
}
function renderInitiativesList(kr){return `<div class="init-list">${kr.initiatives.length===0?`<div style="font-size:12px;color:var(--text-soft);padding:6px 0;line-height:1.55;">Initiative를 추가해 이 KR을 <b>어떻게</b> 달성할지 구체화하십시오. ${guideHelp('initiative')}</div>`:kr.initiatives.map(i=>renderInitiative(kr.id,i)).join('')}<div class="add-init" data-act="add-init" data-krid="${kr.id}">${I.plus} 이니셔티브 추가</div></div>`;}
function renderInitiative(krId,init){const rk=`initiative:${init.id}`;const ro=realityOpen.has(rk);const hr=(init.realityBlocker||init.realityHelp);return `<div class="init-row" data-init-id="${init.id}"><select class="init-status ${init.status||'todo'}" data-field="init-status" data-krid="${krId}" data-iid="${init.id}">${Object.entries(STATUS_LABELS).map(([k,v])=>`<option value="${k}" ${init.status===k?'selected':''}>${v}</option>`).join('')}</select><input class="init-title-input" data-field="init-title" data-krid="${krId}" data-iid="${init.id}" value="${esc(init.title)}" placeholder="구체 액션 (예: 점주 인터뷰 30건 분석)" /><select class="kr-owner-select" data-field="init-owner" data-krid="${krId}" data-iid="${init.id}" style="font-size:11px;"><option value="">담당</option>${state.members.map(m=>`<option value="${m.id}" ${init.ownerId===m.id?'selected':''}>${esc(m.name)}</option>`).join('')}</select><input type="date" class="init-due ${isOverdue(init.dueDate,init.status)?'overdue':''}" data-field="init-due" data-krid="${krId}" data-iid="${init.id}" value="${init.dueDate||''}" />${renderConfChip('initiative',init.id,init.confidence||'mid')}<button class="reality-toggle ${hr?'has-content':''}" data-act="toggle-reality" data-key="${rk}">${ro?'R ▴':'R ▾'}</button><button class="btn-icon" data-act="show-history" data-etype="initiative" data-eid="${init.id}" title="이력">${I.clock}</button><button class="btn-icon" data-act="del-init" data-krid="${krId}" data-iid="${init.id}">${I.x}</button>${ro?`<div style="width:100%;">${renderRealityBox('initiative',init.id,init.realityBlocker,init.realityHelp)}</div>`:''}</div>`;}
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
  return `<div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:14px;flex-wrap:wrap;gap:10px;"><div><h2 style="font-weight:800;font-size:23px;margin:0;">회고 · 학습 정리</h2><div style="font-size:13px;color:var(--text-soft);margin-top:2px;">${esc(currentTeam()?.quarter||'')} · 팀원 ${state.members.length}명 · O ${state.objectives.length}개</div></div><div style="display:flex;gap:8px;flex-wrap:wrap;"><button class="btn btn-soft" data-act="export-excel">${I.download} Excel 내보내기</button><button class="btn btn-ghost" data-act="print-report">${I.print} 리포트 출력</button></div></div>
  <div style="font-size:12px;color:var(--text-soft);background:#FAFAFA;padding:10px 14px;border-radius:8px;margin-bottom:14px;line-height:1.55;">📌 OKR은 <b>야심을 세우고 학습하는 도구</b>입니다. 이 영역은 <b>인사평가가 아닌 회고</b>를 위한 공간입니다 (Doerr·Grove 원칙). 점수 대신 "잘 된 것 / 어려웠던 것 / 배운 것 / 다음 시도"를 정리하세요.</div>
  <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(180px,1fr));gap:8px;margin-bottom:14px;">
    <div style="padding:11px 13px;border:1px solid var(--line);border-radius:10px;background:white;"><div style="font-size:10.5px;font-weight:700;color:var(--primary);margin-bottom:3px;">매주 (10~15분)</div><div style="font-size:12px;color:var(--text-soft);line-height:1.5;">Confidence 점검 + KR 진척 갱신. 변화 이유 토의.</div></div>
    <div style="padding:11px 13px;border:1px solid var(--line);border-radius:10px;background:white;"><div style="font-size:10.5px;font-weight:700;color:var(--primary);margin-bottom:3px;">격주 (1on1)</div><div style="font-size:12px;color:var(--text-soft);line-height:1.5;">막힘 · 도움 요청 점검. 팀원 코칭.</div></div>
    <div style="padding:11px 13px;border:1px solid var(--line);border-radius:10px;background:white;"><div style="font-size:10.5px;font-weight:700;color:var(--primary);margin-bottom:3px;">분기말 (회고)</div><div style="font-size:12px;color:var(--text-soft);line-height:1.5;">4질문 회고 + 다음 분기 OKR 정의.</div></div>
  </div>
  ${state.members.length===0?'<div class="empty">팀원을 먼저 등록해주세요.</div>':`<section class="card"><div class="section-head"><span class="section-title">팀원 종합 회고</span><span class="section-meta">· 분기 학습 정리</span></div><div class="perf-grid">${state.members.map(m=>renderPerfCard(m)).join('')}</div></section>`}
  ${state.objectives.length>0?`<section class="card card-section"><div class="section-head"><span class="section-title">Objective · KR 회고</span><span class="section-meta">· OKR 탭에서도 시계 옆 회고 버튼으로 진입 가능</span></div>${state.objectives.map((o,oi)=>renderObjReflectionRow(o,oi)).join('')}</section>`:''}
  ${state.reviews.length>0?`<section class="card card-section"><div class="section-head"><span class="section-title">최근 회고 이력</span><span class="section-meta">· ${state.reviews.length}건</span></div>${state.reviews.slice(0,15).map(r=>{const et=r.entity_type||'member';let label='';if(et==='member'){const m=state.members.find(x=>x.id===(r.entity_id||r.member_id));label=m?m.name:'(삭제됨)';}else if(et==='objective'){const o=state.objectives.find(x=>x.id===r.entity_id);label=o?`O · ${o.title}`:'(삭제)';}else if(et==='key_result'){let k=null;state.objectives.forEach(o=>o.keyResults.forEach(x=>{if(x.id===r.entity_id)k=x;}));label=k?`KR · ${k.title}`:'(삭제)';}return `<div class="review-list-item"><div style="display:flex;align-items:center;gap:8px;flex:1;min-width:0;"><span class="review-period-tag ${r.period}">${r.period==='mid'?'중간':'최종'}</span><span style="font-size:10px;padding:2px 6px;border-radius:5px;background:#F4F4F5;color:var(--text-soft);font-weight:700;">${REFL_ENTITY_LABELS[et]||et}</span><span style="font-weight:600;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">${esc(label)}</span><span style="color:var(--text-soft);font-size:11px;flex-shrink:0;">${formatTs(r.updated_at)}</span></div><button class="btn btn-ghost" data-act="open-reflection" data-etype="${et}" data-eid="${r.entity_id||r.member_id}" data-period="${r.period}">열기</button></div>`;}).join('')}</section>`:''}`;
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

function renderManage(){
  const t=currentTeam();
  return `<section class="card"><div class="section-head" style="margin-bottom:14px;"><span class="section-title">현재 팀 정보</span><span class="section-meta">· 헤더에서 다른 팀으로 전환 가능</span></div><div class="manage-grid"><label><span class="labeled-label">팀 이름</span><input class="labeled-input" data-field="team-name" value="${esc(t?.name||'')}" /></label><label><span class="labeled-label">분기</span><input class="labeled-input" data-field="team-quarter" value="${esc(t?.quarter||'')}" /></label></div>${state.teams.length>1?`<div style="margin-top:12px;"><button class="btn btn-danger" data-act="del-team">이 팀 삭제 (모든 데이터 함께)</button></div>`:''}</section><section class="card"><div class="section-head" style="margin-bottom:14px;justify-content:space-between;"><span class="section-title">팀원 (${state.members.length})</span><button class="btn btn-soft" data-act="add-member">${I.plus} 팀원 추가</button></div>${state.members.map(m=>`<div class="member-row"><input type="color" class="member-color" data-field="member-color" data-mid="${m.id}" value="${m.color}" /><input class="member-name-input" data-field="member-name" data-mid="${m.id}" value="${esc(m.name)}" /><input class="member-role-input" data-field="member-role" data-mid="${m.id}" placeholder="역할" value="${esc(m.role||'')}" /><button class="btn-icon" data-act="del-member" data-mid="${m.id}">${I.trash}</button></div>`).join('')}</section><section class="card"><div class="section-head" style="margin-bottom:14px;"><span class="section-title">모든 팀</span></div>${state.teams.map(t=>`<div class="member-row"><span style="width:18px;height:18px;border-radius:5px;background:${teamColor(t)};display:inline-block;"></span><span style="flex:1;font-weight:600;font-size:13.5px;">${esc(t.name)}</span><span style="font-size:11.5px;color:var(--text-soft);">${esc(t.quarter)}</span>${t.id===state.currentTeamId?'<span class="today-tag">현재</span>':`<button class="btn btn-ghost" data-act="switch-team" data-tid="${t.id}">전환</button>`}</div>`).join('')}</section>`;
}

function updateBlockerUI(date,mid){if(date!==viewingDate)return;const s=state.standups[date]||{entries:{}};const e=s.entries[mid]||{};const has=!!(e.blockers&&e.blockers.trim());const c=document.querySelector(`[data-member-card="${mid}"]`);if(c){c.classList.toggle('has-blocker',has);let b=c.querySelector('.blocker-badge');if(has&&!b){const h=c.querySelector('.member-head');if(h){const sp=document.createElement('span');sp.className='blocker-badge';sp.innerHTML=`${I.alert} 막힘`;h.appendChild(sp);}}else if(!has&&b){b.remove();}}const cnt=Object.values(s.entries||{}).filter(en=>en?.blockers?.trim()).length;const st=document.querySelector('[data-blocker-stat]');if(st){st.textContent=cnt>0?`${cnt}건`:'없음';st.style.color=cnt>0?C.warning:C.growth;}}

async function openHistory(et,eid){
  showModal(`<div class="modal-head"><div class="modal-title">${I.clock} 변경 이력</div><button class="btn-icon" data-act="close-modal">${I.x}</button></div><div class="modal-body" id="history-body"><div style="text-align:center;padding:30px;color:var(--text-soft);"><div class="loading-spinner" style="margin:0 auto 10px;"></div>불러오는 중…</div></div>`);
  const{data,error}=await sb.from('audit_log').select('*').eq('entity_type',et).eq('entity_id',eid).order('ts',{ascending:false}).limit(30);
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
      <div class="eval-section"><div class="eval-section-label">한 줄 총평 (선택)</div><textarea class="eval-input" data-field="r-summary" rows="2" placeholder="이번 기간을 한 문장으로 요약한다면">${esc(r.summary||'')}</textarea></div>
      <div class="eval-section"><div class="eval-section-label">잘 된 것</div><div style="font-size:11px;color:var(--text-soft);margin-bottom:5px;line-height:1.5;">${esc(REFL_HINTS.what_worked).replace(/\*([^*]+)\*/g,'<i>$1</i>')}</div><textarea class="eval-input" data-field="r-worked" rows="3" placeholder="가장 잘 작동한 것">${esc(r.what_worked||'')}</textarea></div>
      <div class="eval-section"><div class="eval-section-label">어려웠던 것</div><div style="font-size:11px;color:var(--text-soft);margin-bottom:5px;line-height:1.5;">${esc(REFL_HINTS.what_struggled)}</div><textarea class="eval-input" data-field="r-struggled" rows="3" placeholder="미달성·블로커·갈등 — 솔직하게">${esc(r.what_struggled||'')}</textarea></div>
      <div class="eval-section"><div class="eval-section-label">배운 것</div><div style="font-size:11px;color:var(--text-soft);margin-bottom:5px;line-height:1.5;">${esc(REFL_HINTS.what_learned)}</div><textarea class="eval-input" data-field="r-learned" rows="3" placeholder="다음 분기에 가져갈 인사이트">${esc(r.what_learned||'')}</textarea></div>
      <div class="eval-section"><div class="eval-section-label">다음에 시도할 것</div><div style="font-size:11px;color:var(--text-soft);margin-bottom:5px;line-height:1.5;">${esc(REFL_HINTS.next_try)}</div><textarea class="eval-input" data-field="r-nexttry" rows="2" placeholder="새로운 시도 1~2가지">${esc(r.next_try||'')}</textarea></div>
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
  if(a==='goto-home'){currentView='today';render();return;}
  if(a==='toggle-team-menu'){e.stopPropagation();document.getElementById('team-menu').classList.toggle('show');return;}
  if(a==='switch-team'){const tid=btn.dataset.tid;if(!tid||tid===state.currentTeamId){document.getElementById('team-menu')?.classList.remove('show');return;}state.currentTeamId=tid;localStorage.setItem(TEAM_KEY,tid);document.getElementById('team-menu')?.classList.remove('show');initialized=false;render();await loadTeamData(tid);initialized=true;render();return;}
  if(a==='add-team'){const n=prompt('새 팀 이름','새 팀');if(!n)return;const id=uid();const t={id,name:n,quarter:currentTeam()?.quarter||'2026 Q2',sort_order:state.teams.length};state.teams.push(t);state.currentTeamId=id;localStorage.setItem(TEAM_KEY,id);initialized=false;render();await sb.from('teams').insert(t);await loadTeamData(id);initialized=true;render();return;}
  if(a==='del-team'){if(state.teams.length<=1){showToast('마지막 팀은 삭제 불가',true);return;}const t=currentTeam();if(!t)return;if(!confirm(`팀 "${t.name}"과 모든 데이터를 삭제할까요?`))return;const oid=t.id;state.teams=state.teams.filter(x=>x.id!==oid);state.currentTeamId=state.teams[0].id;localStorage.setItem(TEAM_KEY,state.currentTeamId);initialized=false;render();await sb.from('teams').delete().eq('id',oid);await loadTeamData(state.currentTeamId);initialized=true;render();return;}
  if(a==='view'){currentView=btn.dataset.view;render();return;}
  if(a==='present'){presentMode=!presentMode;render();return;}
  if(a==='date-shift'){viewingDate=shiftDate(viewingDate,parseInt(btn.dataset.delta));if(!state.standups[viewingDate]||!state.routineLogs[viewingDate]){dateLoading=true;render();await Promise.all([loadStandup(viewingDate),loadRoutineLogs(viewingDate)]);dateLoading=false;}render();return;}
  if(a==='date-today'){viewingDate=todayKey();render();return;}
  if(a==='toggle-obj'){const oid=btn.dataset.oid;expanded.has(oid)?expanded.delete(oid):expanded.add(oid);render();return;}
  if(a==='toggle-kr'){const k=btn.dataset.krid;krExpanded.has(k)?krExpanded.delete(k):krExpanded.add(k);render();return;}
  if(a==='toggle-reality'){const k=btn.dataset.key;realityOpen.has(k)?realityOpen.delete(k):realityOpen.add(k);render();return;}
  if(a==='cycle-conf'){const et=btn.dataset.etype,eid=btn.dataset.eid;const order=['high','mid','low'];if(et==='objective'){const o=state.objectives.find(x=>x.id===eid);if(!o)return;const nx=order[(order.indexOf(o.confidence||'mid')+1)%3];const old=o.confidence;o.confidence=nx;saveObjective(o);logChange('objective',eid,'update','confidence',old,nx,o.title);render();}else if(et==='kr'){let oid=null,kr=null;state.objectives.forEach(o=>o.keyResults.forEach(k=>{if(k.id===eid){oid=o.id;kr=k;}}));if(!kr)return;const nx=order[(order.indexOf(kr.confidence||'mid')+1)%3];const old=kr.confidence;kr.confidence=nx;saveKR(oid,kr);logChange('key_result',eid,'update','confidence',old,nx,kr.title);render();}else if(et==='initiative'){let krid=null,init=null;state.objectives.forEach(o=>o.keyResults.forEach(k=>k.initiatives.forEach(i=>{if(i.id===eid){krid=k.id;init=i;}})));if(!init)return;const nx=order[(order.indexOf(init.confidence||'mid')+1)%3];const old=init.confidence;init.confidence=nx;saveInitiative(krid,init);logChange('initiative',eid,'update','confidence',old,nx,init.title);render();}return;}
  if(a==='show-history'){openHistory(btn.dataset.etype,btn.dataset.eid);return;}
  if(a==='close-modal'){closeModal();return;}
  if(a==='add-obj'){const id=uid();const o={id,title:'새 Objective',description:'',ownerId:state.members[0]?.id||null,confidence:'mid',realityBlocker:'',realityHelp:'',keyResults:[]};state.objectives.push(o);expanded.add(id);render();const{error}=await sb.from('objectives').insert({id,team_id:state.currentTeamId,title:o.title,description:'',owner_id:o.ownerId,confidence:'mid',sort_order:state.objectives.length-1});if(error)showToast('저장 실패',true);else logChange('objective',id,'create','','',o.title,o.title);return;}
  if(a==='del-obj'){if(!confirm('이 Objective와 하위 KR/Initiative를 삭제할까요?'))return;const oid=btn.dataset.oid;const o=state.objectives.find(x=>x.id===oid);state.objectives=state.objectives.filter(x=>x.id!==oid);render();await sb.from('objectives').delete().eq('id',oid);logChange('objective',oid,'delete','',o?.title||'','',o?.title||'');return;}
  if(a==='add-kr'){const oid=btn.dataset.oid;const o=state.objectives.find(x=>x.id===oid);if(!o)return;const id=uid();const kr={id,title:'새 Key Result',target:100,current:0,unit:'%',ownerId:state.members[0]?.id||null,confidence:'mid',realityBlocker:'',realityHelp:'',initiatives:[]};o.keyResults.push(kr);render();const{error}=await sb.from('key_results').insert({id,objective_id:oid,title:kr.title,target:kr.target,current:kr.current,unit:kr.unit,owner_id:kr.ownerId,confidence:'mid',sort_order:o.keyResults.length-1});if(error)showToast('저장 실패',true);else logChange('key_result',id,'create','','',kr.title,kr.title);return;}
  if(a==='del-kr'){if(!confirm('이 KR을 삭제할까요?'))return;const oid=btn.dataset.oid,krid=btn.dataset.krid;const o=state.objectives.find(x=>x.id===oid);const kr=o?.keyResults.find(k=>k.id===krid);if(o)o.keyResults=o.keyResults.filter(k=>k.id!==krid);render();await sb.from('key_results').delete().eq('id',krid);logChange('key_result',krid,'delete','',kr?.title||'','',kr?.title||'');return;}
  if(a==='add-init'){const krid=btn.dataset.krid;let kr=null;state.objectives.forEach(o=>o.keyResults.forEach(k=>{if(k.id===krid)kr=k;}));if(!kr)return;const id=uid();const init={id,title:'새 이니셔티브',ownerId:state.members[0]?.id||null,status:'todo',confidence:'mid',realityBlocker:'',realityHelp:''};kr.initiatives.push(init);render();const{error}=await sb.from('initiatives').insert({id,kr_id:krid,title:init.title,status:'todo',owner_id:init.ownerId,confidence:'mid',sort_order:kr.initiatives.length-1});if(error)showToast('저장 실패',true);else logChange('initiative',id,'create','','',init.title,init.title);return;}
  if(a==='del-init'){const krid=btn.dataset.krid,iid=btn.dataset.iid;let kr=null,init=null;state.objectives.forEach(o=>o.keyResults.forEach(k=>{if(k.id===krid){kr=k;init=k.initiatives.find(i=>i.id===iid);}}));if(kr)kr.initiatives=kr.initiatives.filter(i=>i.id!==iid);render();await sb.from('initiatives').delete().eq('id',iid);logChange('initiative',iid,'delete','',init?.title||'','',init?.title||'');return;}
  if(a==='add-member'){const i=state.members.length;const m={id:uid(),team_id:state.currentTeamId,name:`팀원 ${i+1}`,role:'팀원',color:PALETTE[i%PALETTE.length]};state.members.push(m);render();const{error}=await sb.from('members').insert({...m,sort_order:i});if(error)showToast('저장 실패',true);else logChange('member',m.id,'create','','',m.name,m.name);return;}
  if(a==='del-member'){if(!confirm('팀원을 삭제할까요?'))return;const mid=btn.dataset.mid;const m=state.members.find(x=>x.id===mid);state.members=state.members.filter(x=>x.id!==mid);render();await sb.from('members').delete().eq('id',mid);logChange('member',mid,'delete','',m?.name||'','',m?.name||'');return;}
  if(a==='add-routine'){const id=uid();const i=state.routines.length;const r={id,team_id:state.currentTeamId,title:'새 루틴',description:'',owner_id:state.members[0]?.id||null,frequency:'weekdays',days_of_week:[1,2,3,4,5],active:true,sort_order:i};state.routines.push(r);render();const{error}=await sb.from('routines').insert(r);if(error)showToast('저장 실패',true);else logChange('routine',id,'create','','',r.title,r.title);return;}
  if(a==='del-routine'){if(!confirm('이 루틴과 모든 수행 기록을 삭제할까요?'))return;const rid=btn.dataset.rid;const r=state.routines.find(x=>x.id===rid);state.routines=state.routines.filter(x=>x.id!==rid);render();await sb.from('routines').delete().eq('id',rid);logChange('routine',rid,'delete','',r?.title||'','',r?.title||'');return;}
  if(a==='toggle-day'){const rid=btn.dataset.rid;const day=parseInt(btn.dataset.day);const r=state.routines.find(x=>x.id===rid);if(!r)return;const arr=r.days_of_week||[];const i=arr.indexOf(day);if(i>=0)arr.splice(i,1);else arr.push(day);r.days_of_week=arr.sort((a,b)=>a-b);saveRoutine(r);render();return;}
  if(a==='toggle-routine'){const rid=btn.dataset.rid;ensureRoutineLog(viewingDate);const cur=state.routineLogs[viewingDate][rid]?.completed||false;saveRoutineLog(rid,viewingDate,!cur);render();return;}
  if(a==='toggle-init-check'){const iid=btn.dataset.iid;const mid=btn.dataset.mid;const cur=getIDLForMemberDate(mid,viewingDate)[iid]?.checked||false;saveInitiativeDailyLog(iid,mid,viewingDate,!cur);render();return;}
  if(a==='set-support-type'){const mid=btn.dataset.mid;const type=btn.dataset.type;const e=ensureStandup(viewingDate);if(!e.entries[mid])e.entries[mid]={yesterday:'',today:'',blockers:'',helper_member_id:'',helper_name:'',support_type:'',support_detail:''};const old=e.entries[mid].support_type;e.entries[mid].support_type=(old===type)?'':type;saveEntry(viewingDate,mid,'support_type',e.entries[mid].support_type);render();return;}
  if(a==='open-review'){openReflection('member',btn.dataset.mid,btn.dataset.period);return;}
  if(a==='open-reflection'){openReflection(btn.dataset.etype,btn.dataset.eid,btn.dataset.period);return;}
  if(a==='review-period'){const preset=btn.dataset.preset;const et=btn.dataset.etype||'member';openReflection(et,btn.dataset.mid,btn.dataset.period,{preset});return;}
  if(a==='review-custom'){const which=btn.dataset.which;const v=btn.value;const cur=window._reviewOpts||{preset:'14',start:null,end:todayKey()};const et=btn.dataset.etype||'member';const opts={preset:'custom',start:which==='start'?v:cur.start,end:which==='end'?v:cur.end};if(!opts.start){const sd=new Date(opts.end);sd.setDate(sd.getDate()-14);opts.start=`${sd.getFullYear()}-${String(sd.getMonth()+1).padStart(2,'0')}-${String(sd.getDate()).padStart(2,'0')}`;}openReflection(et,btn.dataset.mid,btn.dataset.period,opts);return;}
  if(a==='set-score'){if(window._editingReview){window._editingReview.score=parseInt(btn.dataset.score);document.querySelectorAll('.eval-score-btn').forEach(b=>b.classList.toggle('active',parseInt(b.dataset.score)===window._editingReview.score));}return;}
  if(a==='save-review'){const r=window._editingReview;if(!r)return;const ok=await saveReview(r);if(ok){if(r._new){delete r._new;state.reviews.unshift(r);}else{const i=state.reviews.findIndex(x=>x.id===r.id);if(i>=0)state.reviews[i]={...r};}closeModal();showToast('회고 저장됨');render();}return;}
  if(a==='export-excel'){exportExcel();return;}
  if(a==='print-report'){printReport();return;}
  if(a==='open-self-picker'){openSelfPicker();return;}
  if(a==='set-self'){setSelfId(btn.dataset.mid);closeModal();render();return;}
});
document.addEventListener('click',e=>{if(e.target.id==='modal-back')closeModal();});

document.addEventListener('input',e=>{
  const el=e.target;const f=el.dataset.field;if(!f)return;
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

document.addEventListener('change',e=>{
  const el=e.target;
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
    render();
    // 첫 진입 시 본인 식별 모달
    if(!state.selfId && state.members.length>0){setTimeout(()=>openSelfPicker(),300);}
  }catch(e){console.error(e);renderSetup('초기 로드 실패: '+(e.message||e));}
}
init();
