// 통합 테스트: "오늘의 할일 작성" · "최근 한 일 연동" · timezone 경계 · 트리/가시성 상호배제
// 실제 app.js 의 함수를 추출(소스 그대로 vm 실행)해 검증한다. KST(UTC+9) 기준으로 실행.
process.env.TZ = 'Asia/Seoul';
const fs = require('fs');
const vm = require('vm');
const path = require('path');
const src = fs.readFileSync(path.join(__dirname, 'app.js'), 'utf8');

// --- app.js 에서 named function 소스 추출 (중괄호 균형) ---
function extractFn(name) {
  const re = new RegExp('function\\s+' + name + '\\s*\\(');
  const m = re.exec(src);
  if (!m) throw new Error('not found: ' + name);
  let i = src.indexOf('{', m.index);
  let depth = 1, j = i + 1;
  while (j < src.length && depth > 0) { const c = src[j]; if (c === '{') depth++; else if (c === '}') depth--; j++; }
  return src.slice(m.index, j);
}
const fnNames = ['isoToLocalDay', 'shiftDate', 'collectAllKR', 'getInitOwnerIds',
  'buildInitTasksForToday', 'buildInitTasksForYesterday', 'buildTaskTree'];
const fnSrc = fnNames.map(extractFn).join('\n');

// --- 샌드박스 ---
let TODAY = '2026-06-28';
const sandbox = { state: null, viewingDate: TODAY, window: {}, console };
sandbox.getState = () => sandbox.state;
sandbox.todayKey = () => TODAY;
sandbox.collectAllInit = function () {
  const list = [];
  (sandbox.state.objectives || []).forEach(o => (o.keyResults || []).forEach(k =>
    (k.initiatives || []).forEach(i => list.push({ id: i.id, title: i.title || '', krId: k.id }))));
  return list;
};
vm.createContext(sandbox);
vm.runInContext(fnSrc, sandbox);
const { isoToLocalDay, buildInitTasksForToday, buildInitTasksForYesterday, buildTaskTree } = sandbox;

// --- "최근 한 일(직전 작성 내역)" 핵심 로직 포트 (app.js 5162~5185 와 1:1) ---
// 가장 가까운 '오늘 외' 날짜 1건을 작성일(created_at→로컬) 기준으로 집계, upcoming(마감 오늘/미래 미완료) 제외.
function recentDayTasks(mid) {
  const st = sandbox.state, viewing = sandbox.viewingDate;
  const itAll = st.initiativeTasks || {};
  for (let i = 1; i <= 30; i++) {
    const d = sandbox.shiftDate(viewing, -i);
    const dbDay = [];
    Object.keys(itAll).forEach(iid => (itAll[iid] || []).forEach(t => {
      if (!t.owner_id || t.owner_id === mid) {
        const dd = isoToLocalDay(t.created_at) || isoToLocalDay(t.updated_at);
        const upcoming = t.status !== 'done' && t.due_date && t.due_date >= viewing;
        if (dd === d && (t.title || '').trim() && !upcoming)
          dbDay.push({ id: t.id, t: t.title || '', d: t.status === 'done' });
      }
    }));
    if (dbDay.length) return { date: d, tasks: dbDay };
  }
  return null;
}

// --- 테스트 러너 ---
let pass = 0, fail = 0; const fails = [];
function eq(actual, expected, msg) {
  const a = JSON.stringify(actual), e = JSON.stringify(expected);
  if (a === e) { pass++; } else { fail++; fails.push(`✗ ${msg}\n    기대: ${e}\n    실제: ${a}`); }
}
function ok(cond, msg) { eq(!!cond, true, msg); }

// 공통 state 빌더
function mkState(tasks) {
  return {
    objectives: [{ id: 'o1', keyResults: [{ id: 'kr1', initiatives: [{ id: 'init1', title: '데이터 과제' }, { id: 'init2', title: '런칭' }] }] }],
    initiativeTasks: tasks,
  };
}
const idOf = arr => arr.map(t => t.id).sort();

// ════════════════════════════════════════════════
// 시나리오 A — isoToLocalDay (timezone 변환)
// ════════════════════════════════════════════════
// KST 06-28 08:00 = UTC 06-27 23:00Z → 로컬 날짜는 06-28 이어야 한다 (핵심 회귀)
eq(isoToLocalDay('2026-06-27T23:00:00.000Z'), '2026-06-28', 'A1 UTC 전날밤→KST 오늘');
eq(isoToLocalDay('2026-06-28T00:30:00.000Z'), '2026-06-28', 'A2 UTC 자정직후→KST 오전');
eq(isoToLocalDay('2026-06-28T14:59:00.000Z'), '2026-06-28', 'A3 KST 같은날 밤');
eq(isoToLocalDay('2026-06-28T15:00:00.000Z'), '2026-06-29', 'A4 UTC 15시→KST 익일 0시');
eq(isoToLocalDay(''), '', 'A5 빈 값');
eq(isoToLocalDay(null), '', 'A6 null');

// ════════════════════════════════════════════════
// 시나리오 B — 오늘의 할일 작성 직후 가시성 (buildInitTasksForToday)
// ════════════════════════════════════════════════
{
  // 오전 8시(KST) 작성, 날짜 미입력, 미완료 → 오늘 할일에 보여야 함 (이전 버그: 사라짐)
  const st = mkState({ init1: [{ id: 't1', title: '아침 작성 할일', status: 'todo', created_at: '2026-06-27T23:00:00Z' }] });
  sandbox.state = st;
  const today = buildInitTasksForToday('m1');
  eq(idOf(today), ['t1'], 'B1 오전 작성 할일이 오늘에 표시됨(timezone 회귀)');
}
{
  // 일반: 오늘 작성(낮), 날짜 미입력, 미완료 → 오늘
  const st = mkState({ init1: [{ id: 't1', title: '오늘 작성', status: 'todo', created_at: '2026-06-28T03:00:00Z' }] });
  sandbox.state = st;
  eq(idOf(buildInitTasksForToday('m1')), ['t1'], 'B2 오늘 낮 작성→오늘');
}
{
  // 완료된 할일 → 오늘에서 제외
  const st = mkState({ init1: [{ id: 't1', title: '완료됨', status: 'done', created_at: '2026-06-28T03:00:00Z' }] });
  sandbox.state = st;
  eq(idOf(buildInitTasksForToday('m1')), [], 'B3 완료 할일은 오늘 제외');
}
{
  // 마감이 어제(과거) 미완료 → 오늘에서 제외 (최근 한 일로)
  const st = mkState({ init1: [{ id: 't1', title: '지연', status: 'todo', due_date: '2026-06-27', created_at: '2026-06-25T03:00:00Z' }] });
  sandbox.state = st;
  eq(idOf(buildInitTasksForToday('m1')), [], 'B4 마감 지난 미완료는 오늘 제외');
}
{
  // 마감이 미래 미완료 → 오늘 유지
  const st = mkState({ init1: [{ id: 't1', title: '예정', status: 'todo', due_date: '2026-06-30', created_at: '2026-06-20T03:00:00Z' }] });
  sandbox.state = st;
  eq(idOf(buildInitTasksForToday('m1')), ['t1'], 'B5 마감 미래 미완료→오늘 유지');
}
{
  // 시작일이 미래 → 아직 시작 안 함, 오늘 제외
  const st = mkState({ init1: [{ id: 't1', title: '미래시작', status: 'todo', start_date: '2026-06-30', created_at: '2026-06-28T03:00:00Z' }] });
  sandbox.state = st;
  eq(idOf(buildInitTasksForToday('m1')), [], 'B6 시작일 미래→오늘 제외');
}
{
  // 다른 사람 소유 → 내 오늘에서 제외
  const st = mkState({ init1: [{ id: 't1', title: '남의일', status: 'todo', owner_id: 'm2', created_at: '2026-06-28T03:00:00Z' }] });
  sandbox.state = st;
  eq(idOf(buildInitTasksForToday('m1')), [], 'B7 타인 소유 할일 제외');
}

// ════════════════════════════════════════════════
// 시나리오 C — 최근 한 일 연동 (recentDayTasks) + 상호배제
// ════════════════════════════════════════════════
{
  // 어제(06-27) 작성·미완료, 날짜 미입력 → 최근 한 일에 표시 / 오늘엔 없음
  const st = mkState({ init1: [{ id: 't1', title: '어제 작성', status: 'todo', created_at: '2026-06-26T23:00:00Z' /* KST 06-27 08:00 */ }] });
  sandbox.state = st;
  eq(idOf(buildInitTasksForToday('m1')), [], 'C1 어제 작성분은 오늘 없음');
  const r = recentDayTasks('m1');
  eq([r && r.date, r ? idOf(r.tasks) : null], ['2026-06-27', ['t1']], 'C2 어제 작성분이 최근 한 일에 표시');
}
{
  // 과거 작성이지만 마감이 오늘/미래인 미완료 → 최근에서 제외(오늘 할일 소속, 중복방지: v145)
  const st = mkState({ init1: [{ id: 't1', title: '과거작성 미래마감', status: 'todo', due_date: '2026-06-28', created_at: '2026-06-25T03:00:00Z' }] });
  sandbox.state = st;
  const r = recentDayTasks('m1');
  eq(r, null, 'C3 과거작성+마감 오늘/미래 미완료는 최근에서 제외');
  eq(idOf(buildInitTasksForToday('m1')), ['t1'], 'C3b 동일 항목은 오늘 할일에 표시(상호배제 성립)');
}
{
  // 오늘 작성분은 최근 한 일에 안 나옴(가장 가까운 '오늘 외' 날짜만)
  const st = mkState({ init1: [{ id: 't1', title: '오늘작성', status: 'todo', created_at: '2026-06-28T03:00:00Z' }] });
  sandbox.state = st;
  eq(recentDayTasks('m1'), null, 'C4 오늘 작성분은 최근 한 일에 없음');
}
{
  // 가장 가까운 1일치만: 06-27, 06-25 둘 다 있으면 06-27만
  const st = mkState({ init1: [
    { id: 'a', title: '그제', status: 'todo', created_at: '2026-06-25T03:00:00Z' },
    { id: 'b', title: '어제', status: 'todo', created_at: '2026-06-27T03:00:00Z' },
  ] });
  sandbox.state = st;
  const r = recentDayTasks('m1');
  eq([r.date, idOf(r.tasks)], ['2026-06-27', ['b']], 'C5 가장 가까운 작성일 1건만 집계');
}

// ════════════════════════════════════════════════
// 시나리오 D — buildInitTasksForYesterday (완료일 기준)
// ════════════════════════════════════════════════
{
  // 06-27에 완료(updated_at KST 06-27) → targetDate 06-27 에 표시
  const st = mkState({ init1: [{ id: 't1', title: '어제완료', status: 'done', updated_at: '2026-06-27T05:00:00Z' /* KST 14:00 */ }] });
  sandbox.state = st;
  eq(idOf(buildInitTasksForYesterday('m1', '2026-06-27')), ['t1'], 'D1 어제 완료 항목');
  eq(idOf(buildInitTasksForYesterday('m1', '2026-06-26')), [], 'D2 다른 날짜엔 없음');
}
{
  // timezone 경계: UTC 06-26 23:00 = KST 06-27 08:00 완료 → 06-27 로 잡혀야
  const st = mkState({ init1: [{ id: 't1', title: '경계완료', status: 'done', updated_at: '2026-06-26T23:00:00Z' }] });
  sandbox.state = st;
  eq(idOf(buildInitTasksForYesterday('m1', '2026-06-27')), ['t1'], 'D3 완료일 timezone 경계');
}

// ════════════════════════════════════════════════
// 시나리오 E — buildTaskTree (KR>Init>할일 묶기)
// ════════════════════════════════════════════════
{
  const st = mkState({});
  sandbox.state = st;
  const tasks = [
    { id: 't1', t: '일1', i: 'init1', k: 'kr1' },
    { id: 't2', t: '일2', i: 'init2', k: 'kr1' },
    { id: 't3', t: '운영', i: '', k: '' },
  ];
  const tree = buildTaskTree(tasks);
  eq(tree.krOrder, ['kr1'], 'E1 KR 그룹 1개');
  eq(tree.krGroups['kr1'].initOrder, ['init1', 'init2'], 'E2 init 2개 순서');
  eq(tree.individualTasks.map(t => t.id), ['t3'], 'E3 KR무관 개별 할일');
}

// ── 결과 ──
console.log(`\n통합 테스트: ${pass} 통과, ${fail} 실패`);
if (fail) { console.log('\n' + fails.join('\n') + '\n'); process.exit(1); }
else { console.log('✅ 전 시나리오 통과'); }
