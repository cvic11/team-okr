// 오늘 탭 이니셔티브/할일 가시성·트리 로직 통합 테스트 (경우의 수 전수)
// 실제 app.js 의 함수(collectAllKR/buildInitTasksForToday/buildTaskTree)를 추출해 검증.
const fs=require('fs');
const vm=require('vm');
const src=fs.readFileSync(require('path').join(__dirname,'app.js'),'utf8');

// --- app.js 에서 named function 소스 추출 (중괄호 균형) ---
function extractFn(name){
  const re=new RegExp('function\\s+'+name+'\\s*\\(');
  const m=re.exec(src);
  if(!m)throw new Error('not found: '+name);
  let i=src.indexOf('{',m.index);
  let depth=1,j=i+1;
  while(j<src.length&&depth>0){const c=src[j];if(c==='{')depth++;else if(c==='}')depth--;j++;}
  return src.slice(m.index,j);
}
const fnNames=['collectAllKR','getInitOwnerIds','buildInitTasksForToday','buildInitTasksForYesterday','buildTaskTree','selfMember','canEditAs','canEditInit','canEditOKR'];
const fnSrc=fnNames.map(extractFn).join('\n');

// --- 샌드박스 globals ---
const TODAY='2026-06-01';
const sandbox={
  state:null,
  viewingDate:TODAY,
  window:{_krlJustCreatedInits:new Set()},
  console,
};
sandbox.getState=function(){return sandbox.state;};
sandbox.todayKey=function(){return TODAY;};
sandbox.shiftDate=function(d,n){const x=new Date(d);x.setDate(x.getDate()+n);return x.toISOString().slice(0,10);};
sandbox.collectAllInit=function(){const list=[];(sandbox.state.objectives||[]).forEach(o=>(o.keyResults||[]).forEach(k=>(k.initiatives||[]).forEach(i=>list.push({id:i.id,title:i.title||'',krId:k.id}))));return list;};
vm.createContext(sandbox);
vm.runInContext(fnSrc,sandbox);

// --- v109 가시성 파이프라인 재현 (renderTaskListBlock + renderKRTree 의 injection 과 1:1) ---
function computeTodayVisible(mid){
  const collectAllKR=sandbox.collectAllKR, buildInitTasksForToday=sandbox.buildInitTasksForToday, buildTaskTree=sandbox.buildTaskTree, getInitOwnerIds=sandbox.getInitOwnerIds;
  const allKR=collectAllKR();
  const tasks=buildInitTasksForToday(mid); // (Today 탭 DB 경로; JSON data.tasks 는 별도)
  const tree=buildTaskTree(tasks);
  const justSet=sandbox.window._krlJustCreatedInits||new Set();
  const isVisibleOwnedInit=(init)=>{
    const owners=getInitOwnerIds(init);
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
  tree.krOrder.forEach(krId=>{
    const g=tree.krGroups[krId];const kr=g.kr;const allKRInits=(kr&&kr.initiatives)||[];
    allKRInits.forEach(init=>{
      if(g.initGroups[init.id])return;
      if(isVisibleOwnedInit(init)){g.initGroups[init.id]={init,tasks:[]};g.initOrder.push(init.id);}
    });
  });
  const visibleInits=new Set();
  const taskByInit={};
  tree.krOrder.forEach(krId=>{const g=tree.krGroups[krId];g.initOrder.forEach(iid=>{visibleInits.add(iid);taskByInit[iid]=(g.initGroups[iid].tasks||[]).length;});});
  return {visibleInits,krOrder:tree.krOrder.slice(),taskByInit};
}

// --- 테스트 빌더 ---
let pass=0,fail=0;const failures=[];
function assert(cond,msg){if(cond)pass++;else{fail++;failures.push(msg);}}
function mkState(inits){ // inits: [{id,title,ownerId,status,tasks:[{id,owner_id,status,start_date,due_date}]}]
  const initiatives=inits.map(i=>({id:i.id,title:i.title,ownerId:i.ownerId,status:i.status||'todo',startDate:null,dueDate:null,confidence:'mid'}));
  const initiativeTasks={};
  inits.forEach(i=>{if(i.tasks)initiativeTasks[i.id]=i.tasks.map((t,n)=>({id:t.id,initiative_id:i.id,title:t.title||('task'+n),status:t.status||'todo',owner_id:t.owner_id===undefined?null:t.owner_id,start_date:t.start_date||null,due_date:t.due_date||null,sort_order:n}));});
  return {objectives:[{id:'O1',title:'Obj',keyResults:[{id:'KR1',title:'KR one',initiatives}]}],initiativeTasks,members:[{id:'m1',name:'M1'},{id:'m2',name:'M2'}]};
}

// ===== 전수 케이스: 단일 init 가시성 =====
const TITLES=['','T'];
const OWNERS=['m1','m2','__team_all__',null];
const STATUS=['todo','done'];
const JUST=[false,true];
const TASKS=[
  {label:'none',tasks:[]},
  {label:'mine-todo',tasks:[{id:'t',owner_id:'m1',status:'todo'}]},
  {label:'mine-done',tasks:[{id:'t',owner_id:'m1',status:'done'}]},
  {label:'other',tasks:[{id:'t',owner_id:'m2',status:'todo'}]},
  {label:'unowned',tasks:[{id:'t',owner_id:null,status:'todo'}]},
  {label:'future-start',tasks:[{id:'t',owner_id:'m1',status:'todo',start_date:'2099-01-01'}]},
];
const mid='m1';
for(const title of TITLES)for(const owner of OWNERS)for(const status of STATUS)for(const just of JUST)for(const tc of TASKS){
  sandbox.window._krlJustCreatedInits=new Set(just?['I']:[]);
  sandbox.state=mkState([{id:'I',title,ownerId:owner,status,tasks:tc.tasks}]);
  const {visibleInits,taskByInit}=computeTodayVisible(mid);
  // 기대치 계산
  const ownedByM1 = owner==='__team_all__' || owner==='m1';
  const hasTitle = title.trim()!=='';
  const ownedVisible = ownedByM1 && (just || (hasTitle && status!=='done'));
  const taskShows = tc.tasks.some(t=>(!t.owner_id||t.owner_id===mid)&&(t.status||'todo')!=='done'&&(!t.start_date||t.start_date<=TODAY));
  const expectVisible = ownedVisible || taskShows;
  const got=visibleInits.has('I');
  assert(got===expectVisible,`vis title=${title||'∅'} owner=${owner} status=${status} just=${just} task=${tc.label} → got ${got}, expect ${expectVisible}`);
}

// ===== 핵심 무회귀: 제목 입력 후 절대 사라지지 않음 =====
// 시나리오: 본인 init, 제목 있음, todo, justCreated=false(제목 입력 후 blur로 해제됨), task 0개
sandbox.window._krlJustCreatedInits=new Set();
sandbox.state=mkState([{id:'I',title:'My Initiative',ownerId:'m1',status:'todo',tasks:[]}]);
assert(computeTodayVisible('m1').visibleInits.has('I'),'무회귀: 제목 입력 후 justCreated 해제·task0 인 본인 init 은 보여야 함(사라짐 금지)');

// 시나리오: 방금 생성(빈 제목, justCreated) → 보여야 함
sandbox.window._krlJustCreatedInits=new Set(['I']);
sandbox.state=mkState([{id:'I',title:'',ownerId:'m1',status:'todo',tasks:[]}]);
assert(computeTodayVisible('m1').visibleInits.has('I'),'무회귀: 방금 생성한 빈 init 은 보여야 함');

// 시나리오: 빈 제목 + justCreated 해제 → 숨김(잔재 제거)
sandbox.window._krlJustCreatedInits=new Set();
sandbox.state=mkState([{id:'I',title:'',ownerId:'m1',status:'todo',tasks:[]}]);
assert(!computeTodayVisible('m1').visibleInits.has('I'),'빈 제목·미생성 init 은 숨겨야 함');

// ===== 다른 멤버 화면 격리 =====
sandbox.window._krlJustCreatedInits=new Set();
sandbox.state=mkState([{id:'I',title:'A의 것',ownerId:'m1',status:'todo',tasks:[]}]);
assert(!computeTodayVisible('m2').visibleInits.has('I'),'m1 의 init 은 m2 화면에 안 보여야 함');

// ===== 팀 전원 init 은 모두에게 보임 =====
sandbox.state=mkState([{id:'I',title:'팀공통',ownerId:'__team_all__',status:'todo',tasks:[]}]);
assert(computeTodayVisible('m1').visibleInits.has('I')&&computeTodayVisible('m2').visibleInits.has('I'),'team_all init 은 전원에게 보여야 함');

// ===== buildInitTasksForToday 필터 검증 =====
sandbox.state=mkState([{id:'I',title:'T',ownerId:'m1',status:'todo',tasks:[
  {id:'a',owner_id:'m1',status:'todo'},
  {id:'b',owner_id:'m1',status:'done'},        // done 제외
  {id:'c',owner_id:'m1',status:'todo',start_date:'2099-01-01'}, // 미래시작 제외
  {id:'d',owner_id:'m2',status:'todo'},         // 타인 제외(owner 있음)
  {id:'e',owner_id:null,status:'todo'},         // 무소속 포함
]}]);
const built=sandbox.buildInitTasksForToday('m1').map(t=>t.id).sort();
assert(JSON.stringify(built)===JSON.stringify(['a','e']),'buildInitTasksForToday 필터: done/미래/타인 제외, 본인+무소속 포함 → '+JSON.stringify(built));

// ===== 여러 KR/여러 init 동시 가시성 =====
sandbox.window._krlJustCreatedInits=new Set();
sandbox.state={objectives:[{id:'O1',title:'O',keyResults:[
  {id:'KR1',title:'KR1',initiatives:[{id:'I1',title:'I1',ownerId:'m1',status:'todo'},{id:'I2',title:'',ownerId:'m1',status:'todo'}]},
  {id:'KR2',title:'KR2',initiatives:[{id:'I3',title:'I3',ownerId:'m2',status:'todo'},{id:'I4',title:'I4done',ownerId:'m1',status:'done'}]},
]}],initiativeTasks:{},members:[{id:'m1'},{id:'m2'}]};
const r=computeTodayVisible('m1');
assert(r.visibleInits.has('I1'),'I1(제목·본인) 보임');
assert(!r.visibleInits.has('I2'),'I2(빈제목·미생성) 숨김');
assert(!r.visibleInits.has('I3'),'I3(타인) 숨김');
assert(!r.visibleInits.has('I4'),'I4(완료) 숨김');
assert(r.krOrder.includes('KR1')&&!r.krOrder.includes('KR2'),'KR1 만 노출(KR2 는 본인 가시 init 없음)');

// ===== 권한(#3): 본인 콘텐츠 편집권은 members 로딩 타이밍과 무관해야 함 =====
const {canEditAs,canEditInit,canEditOKR}=sandbox;
// 본인 카드: members 배열이 비어 있어도(로딩 전/실시간 교체 중) 편집 가능해야 함
sandbox.state={selfId:'m1',members:[],objectives:[]};
assert(canEditAs('m1')===true,'본인 카드는 members 비어있어도 편집 가능(전역 transient null 방어)');
assert(canEditOKR()===true,'인증 멤버는 members 비어있어도 OKR 편집 가능');
assert(canEditInit({})===true,'인증 멤버는 members 비어있어도 이니셔티브 편집 가능');
assert(canEditAs('m2')===false,'타인 카드는 비관리자가 편집 불가(members 미로딩 시 안전하게 거부)');
// 정상 멤버 로딩 상태
sandbox.state={selfId:'m1',members:[{id:'m1',isAdmin:false},{id:'m2',isAdmin:false}],objectives:[]};
assert(canEditAs('m1')===true,'본인 카드 편집 가능');
assert(canEditAs('m2')===false,'비관리자는 타인 카드 편집 불가');
// 관리자
sandbox.state={selfId:'m1',members:[{id:'m1',isAdmin:true},{id:'m2',isAdmin:false}],objectives:[]};
assert(canEditAs('m2')===true,'관리자는 타인 카드 편집 가능');
// 옵저버
sandbox.state={selfId:'__observer__',members:[{id:'m1',isAdmin:false}],objectives:[]};
assert(canEditAs('m1')===false,'옵저버는 편집 불가');
assert(canEditOKR()===false,'옵저버는 OKR 편집 불가');
assert(canEditInit({})===false,'옵저버는 이니셔티브 편집 불가');
// 미인증
sandbox.state={selfId:null,members:[],objectives:[]};
assert(canEditAs('m1')===false,'미인증은 편집 불가');
assert(canEditOKR()===false,'미인증은 OKR 편집 불가');

// ===== 결과 =====
console.log(`\n테스트: ${pass} 통과, ${fail} 실패`);
if(fail){console.log('\n실패 목록:');failures.forEach(f=>console.log('  ✗ '+f));process.exit(1);}
console.log('✅ 전 케이스 통과');
