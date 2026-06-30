// 런칭 전 다각도 통합 테스트 — 도메인별 순수 로직 전수 검증 (KST 고정)
// 날짜/진척 · 권한/소유 · 검색 · 집계 · 루틴 · 분기/WBS · 날짜전파 · 스탠드업 직렬화
process.env.TZ = 'Asia/Seoul';
const fs = require('fs'), vm = require('vm'), path = require('path');
const src = fs.readFileSync(path.join(__dirname, 'app.js'), 'utf8');

function extractFn(name, occurrence) {
  const re = new RegExp('function\\s+' + name + '\\s*\\(', 'g');
  let m, count = 0, target = null;
  while ((m = re.exec(src))) { count++; if (count === (occurrence || 1)) { target = m; break; } }
  if (!target) throw new Error('not found: ' + name);
  // 따옴표 문자열('...', "...") 과 라인 주석 안의 중괄호는 무시해야 균형이 맞는다 (예: startsWith('{')).
  let i = src.indexOf('{', target.index), depth = 1, j = i + 1, q = null, line = false;
  while (j < src.length && depth > 0) {
    const c = src[j], p = src[j - 1];
    if (line) { if (c === '\n') line = false; }
    else if (q) { if (c === q && p !== '\\') q = null; }
    else if (c === "'" || c === '"') q = c;
    else if (c === '/' && src[j + 1] === '/') line = true;
    else if (c === '{') depth++;
    else if (c === '}') depth--;
    j++;
  }
  return src.slice(target.index, j);
}

const TODAY = '2026-06-28';
const sandbox = { state: null, window: {}, console };
sandbox.todayKey = () => TODAY;
sandbox.kstDay=(d)=>new Intl.DateTimeFormat('en-CA',{timeZone:'Asia/Seoul',year:'numeric',month:'2-digit',day:'2-digit'}).format(d);
sandbox.C = { growth: 'GROWTH', amber: 'AMBER', warning: 'WARNING' };
sandbox.esc = s => s == null ? '' : String(s);
sandbox.getState = () => sandbox.state;
sandbox.saveCalls = [];
sandbox.saveKR = (oid, kr) => sandbox.saveCalls.push(['kr', oid, kr.id]);
sandbox.saveObjective = (o) => sandbox.saveCalls.push(['obj', o.id]);

// 최상위 named function 추출 (todayKey/esc/C 는 stub 사용 → 추출 제외)
const TOP = ['pct', 'progressColor', 'isOverdue', 'withinThisWeek', 'daysBetween',
  'parseQuarterRange', 'computeWBSRange', 'shiftDate', 'isoToLocalDay',
  'activeRoutinesForDate', 'freqText', 'matchesSearch', 'objectiveMatches', 'krMatches',
  'getInitOwnerIds', 'isInitTeamAll', 'initOwnersDisplay', 'memberAnalytics',
  'collectDueThisWeek', 'propagateParentDates',
  '_tasksByInit', 'buildDeleteSubtree', 'confirmCascadeDelete'];
let code = TOP.map(n => extractFn(n)).join('\n');
// 중첩 함수(애드온 내부) — 선언문이라 추출 가능
code += '\n' + extractFn('parseTasksField') + '\n' + extractFn('serializeTasks');
vm.createContext(sandbox);
vm.runInContext(code, sandbox);
const S = sandbox;

// ── 러너 ──
let pass = 0, fail = 0; const fails = [];
function eq(a, e, msg) {
  const A = JSON.stringify(a), E = JSON.stringify(e);
  if (A === E) pass++; else { fail++; fails.push(`✗ ${msg}\n    기대:${E}\n    실제:${A}`); }
}

// ════ 1. 진척률/색상 (pct, progressColor) ════
eq(S.pct(5, 10), 50, '1.1 기본 50%');
eq(S.pct(0, 10), 0, '1.2 0%');
eq(S.pct(10, 10), 100, '1.3 100%');
eq(S.pct(15, 10), 100, '1.4 초과는 100 캡');
eq(S.pct(-3, 10), 0, '1.5 음수는 0 캡');
eq(S.pct(5, 0), 0, '1.6 목표 0 → 0 (0나눗셈 방지)');
eq(S.pct(5, -1), 0, '1.7 목표 음수 → 0');
eq(S.pct(1, 3), 33, '1.8 반올림(33.3→33)');
eq(S.pct(2, 3), 67, '1.9 반올림(66.6→67)');
eq(S.progressColor(70), 'GROWTH', '1.10 70=growth');
eq(S.progressColor(69), 'AMBER', '1.11 69=amber');
eq(S.progressColor(30), 'AMBER', '1.12 30=amber');
eq(S.progressColor(29), 'WARNING', '1.13 29=warning');
eq(S.progressColor(0), 'WARNING', '1.14 0=warning');

// ════ 2. 날짜 (isOverdue, withinThisWeek, daysBetween, shiftDate) ════
// TODAY=2026-06-28
eq(S.isOverdue('2026-06-27'), true, '2.1 어제 마감=지연');
eq(S.isOverdue('2026-06-28'), false, '2.2 오늘 마감=지연 아님');
eq(S.isOverdue('2026-06-29'), false, '2.3 내일=지연 아님');
eq(S.isOverdue('2026-06-27', 'done'), false, '2.4 완료는 지연 아님');
eq(S.isOverdue(''), false, '2.5 빈 마감=지연 아님');
eq(S.withinThisWeek('2026-06-28'), true, '2.6 오늘=이번주');
eq(S.withinThisWeek('2026-07-05'), true, '2.7 +7일=경계 포함');
eq(S.withinThisWeek('2026-07-06'), false, '2.8 +8일=제외');
eq(S.withinThisWeek('2026-06-27'), false, '2.9 과거=제외');
eq(S.daysBetween('2026-06-01', '2026-06-28'), 27, '2.10 날짜차');
eq(S.daysBetween('2026-06-28', '2026-06-28'), 0, '2.11 같은날 0');
eq(S.shiftDate('2026-06-28', -1), '2026-06-27', '2.12 하루 전');
eq(S.shiftDate('2026-02-28', 1), '2026-03-01', '2.13 월말 넘김(2026 비윤년)');
eq(S.shiftDate('2026-12-31', 1), '2027-01-01', '2.14 연말 넘김');

// ════ 3. 분기/WBS 범위 (parseQuarterRange, computeWBSRange) ════
eq(S.parseQuarterRange('2026 Q2'), { start: '2026-04-01', end: '2026-06-30' }, '3.1 Q2 범위');
eq(S.parseQuarterRange('2026 Q1'), { start: '2026-01-01', end: '2026-03-31' }, '3.2 Q1 범위');
eq(S.parseQuarterRange('2026 Q4'), { start: '2026-10-01', end: '2026-12-31' }, '3.3 Q4 범위');
eq(S.parseQuarterRange('2024 Q1'), { start: '2024-01-01', end: '2024-03-31' }, '3.4 윤년 Q1');
// 잘못된 형식 → ±45일 fallback (오늘 기준)
eq(S.parseQuarterRange('이상한값'), { start: S.shiftDate(TODAY, -45), end: S.shiftDate(TODAY, 45) }, '3.5 형식오류 fallback');
{
  // 항목 없음 → qRange 그대로
  S.state = { objectives: [] };
  const q = { start: '2026-04-01', end: '2026-06-30' };
  eq(S.computeWBSRange(q), q, '3.6 항목 없으면 분기 그대로');
  // 과거 시작 항목 → 시작 당김 / 분기 밖 마감 → 끝 확장
  S.state = { objectives: [{ startDate: '2026-03-01', dueDate: '2026-08-15', keyResults: [] }] };
  eq(S.computeWBSRange(q), { start: '2026-03-01', end: '2026-08-15' }, '3.7 과거시작+미래마감 확장');
  // 미래 시작만(과거 없음) → 시작은 오늘로 절단
  S.state = { objectives: [{ startDate: '2026-06-30', dueDate: '2026-06-30', keyResults: [] }] };
  eq(S.computeWBSRange(q).start, TODAY, '3.8 미래시작은 오늘로 절단');
}

// ════ 4. 검색 (matchesSearch, objectiveMatches, krMatches) ════
eq(S.matchesSearch('Hello World', 'world'), true, '4.1 대소문자 무시 포함');
eq(S.matchesSearch('Hello', 'xyz'), false, '4.2 불포함');
eq(S.matchesSearch('Hello', ''), true, '4.3 빈 쿼리=전부 매치');
eq(S.matchesSearch(null, 'a'), false, '4.4 null 텍스트');
{
  const o = { title: '매출 성장', description: '', realityBlocker: '', realityHelp: '',
    keyResults: [{ title: 'NPS 70', unit: '점', realityBlocker: '', realityHelp: '',
      initiatives: [{ title: '온보딩 개선', realityBlocker: '', realityHelp: '' }] }] };
  eq(S.objectiveMatches(o, '성장'), true, '4.5 O 제목 매치');
  eq(S.objectiveMatches(o, 'NPS'), true, '4.6 하위 KR 제목 매치');
  eq(S.objectiveMatches(o, '온보딩'), true, '4.7 손자 Init 제목 매치');
  eq(S.objectiveMatches(o, '없는말'), false, '4.8 전혀 불일치');
  eq(S.krMatches(o.keyResults[0], '점'), true, '4.9 KR 단위 매치');
}

// ════ 5. 소유/권한 (getInitOwnerIds, isInitTeamAll, initOwnersDisplay) ════
{
  S.state = { members: [{ id: 'm1', name: '리오' }, { id: 'm2', name: '나라' }, { id: 'm3', name: '옵저버', isObserver: true }] };
  eq(S.getInitOwnerIds(null), [], '5.1 null init');
  eq(S.getInitOwnerIds({ ownerId: '' }), [], '5.2 미지정');
  eq(S.getInitOwnerIds({ ownerId: 'm1' }), ['m1'], '5.3 단일');
  eq(S.getInitOwnerIds({ ownerId: 'm1,m2' }), ['m1', 'm2'], '5.4 복수');
  eq(S.getInitOwnerIds({ ownerId: 'm1, m2 ' }), ['m1', 'm2'], '5.5 공백 트림');
  eq(S.getInitOwnerIds({ ownerId: '__team_all__' }), ['m1', 'm2'], '5.6 팀전원=옵저버 제외');
  eq(S.isInitTeamAll({ ownerId: '__team_all__' }), true, '5.7 팀전원 판별');
  eq(S.isInitTeamAll({ ownerId: 'm1' }), false, '5.8 비팀전원');
  eq(S.initOwnersDisplay({ ownerId: '__team_all__' }).isTeamAll, true, '5.9 표시:팀전원');
  eq(S.initOwnersDisplay({ ownerId: 'm1' }).text, '리오', '5.10 표시:단일이름');
  eq(S.initOwnersDisplay({ ownerId: 'm1,m2' }).text, '리오, 나라', '5.11 표시:두명');
  eq(S.initOwnersDisplay({ ownerId: 'm1,m2,m1' }).text, '리오 +2명', '5.12 표시:3+ 요약');
  eq(S.initOwnersDisplay({ ownerId: '' }).text, '담당 미지정', '5.13 표시:미지정');
}

// ════ 6. 집계 (memberAnalytics, collectDueThisWeek) ════
{
  S.state = { members: [{ id: 'm1' }], objectives: [
    { id: 'o1', ownerId: 'm1', confidence: 'high', keyResults: [
      { id: 'k1', ownerId: 'm1', current: 5, target: 10, confidence: 'mid', initiatives: [
        { id: 'i1', ownerId: 'm1', status: 'done', confidence: 'high' },
        { id: 'i2', ownerId: 'm1', status: 'blocked', confidence: 'low' },
        { id: 'i3', ownerId: 'm2', status: 'todo', confidence: 'mid' } ] } ] } ] };
  const a = S.memberAnalytics('m1');
  eq([a.okrs, a.krs, a.inits, a.initsDone, a.initsBlocked], [1, 1, 2, 1, 1], '6.1 멤버 집계 수량');
  eq(a.krAvg, 50, '6.2 KR 평균 진척 50%');
  eq(a.okrAvg, 50, '6.3 O 평균(하위 KR 평균) 50%');
}
{
  S.state = { objectives: [
    { keyResults: [
      { title: '이번주 KR', dueDate: '2026-06-30', current: 0, target: 1, initiatives: [
        { title: '지연 Init', dueDate: '2026-06-25', status: 'todo' },
        { title: '완료 Init', dueDate: '2026-06-25', status: 'done' },
        { title: '먼 미래 Init', dueDate: '2026-09-01', status: 'todo' } ] } ] } ] };
  const due = S.collectDueThisWeek();
  const titles = due.map(d => d.title);
  eq(titles.includes('이번주 KR'), true, '6.4 이번주 마감 KR 포함');
  eq(titles.includes('지연 Init'), true, '6.5 지연 미완료 Init 포함');
  eq(titles.includes('완료 Init'), false, '6.6 완료 Init 제외');
  eq(titles.includes('먼 미래 Init'), false, '6.7 먼 미래 제외');
}

// ════ 7. 루틴 (activeRoutinesForDate, freqText) ════
{
  // 2026-06-28 = 일요일(dow=7), 2026-06-29 = 월요일(dow=1)
  S.state = { routines: [
    { id: 'r1', frequency: 'daily', active: true },
    { id: 'r2', frequency: 'weekdays', active: true },
    { id: 'r3', frequency: 'weekly', days_of_week: [7], active: true },
    { id: 'r4', frequency: 'monthly', day_of_month: 28, active: true },
    { id: 'r5', frequency: 'daily', active: false } ] };
  eq(S.activeRoutinesForDate('2026-06-28').map(r => r.id), ['r1', 'r3', 'r4'], '7.1 일요일 활성 루틴(평일 제외, 비활성 제외)');
  eq(S.activeRoutinesForDate('2026-06-29').map(r => r.id), ['r1', 'r2'], '7.2 월요일 활성(평일 포함, 일요지정/월간 제외)');
  eq(S.freqText({ frequency: 'daily' }), '매일', '7.3 매일');
  eq(S.freqText({ frequency: 'weekdays' }), '평일', '7.4 평일');
  eq(S.freqText({ frequency: 'monthly', day_of_month: 15 }), '매월 15일', '7.5 매월');
  eq(S.freqText({ frequency: 'weekly', days_of_week: [1, 3, 5] }), '월,수,금', '7.6 요일 표기');
}

// ════ 8. 날짜 상향 전파 (propagateParentDates) ════
{
  // Init 의 시작/마감이 부모 KR, 그리고 O 로 확장되는지 (saveKR 호출 = KR 변경 발생)
  S.saveCalls = [];
  S.state = { objectives: [{ id: 'o1', startDate: '2026-05-01', dueDate: '2026-05-10',
    keyResults: [{ id: 'k1', startDate: '2026-05-02', dueDate: '2026-05-09', initiatives: [] }] }] };
  const kr = S.state.objectives[0].keyResults[0];
  S.propagateParentDates('init', 'k1', { startDate: '2026-04-20', dueDate: '2026-06-15' });
  eq([kr.startDate, kr.dueDate], ['2026-04-20', '2026-06-15'], '8.1 자식이 KR 범위 확장');
  eq(S.saveCalls.some(c => c[0] === 'kr' && c[2] === 'k1'), true, '8.2 KR 저장 트리거됨');
  // 자식이 부모 안쪽이면 변경 없음 → 저장 안 함
  S.saveCalls = [];
  S.propagateParentDates('init', 'k1', { startDate: '2026-05-01', dueDate: '2026-05-01' });
  eq(S.saveCalls.length, 0, '8.3 범위 안쪽이면 전파/저장 없음');
  // kr→o 전파
  S.saveCalls = [];
  const o = S.state.objectives[0];
  S.propagateParentDates('kr', 'o1', { startDate: '2026-01-01', dueDate: '2026-12-31' });
  eq([o.startDate, o.dueDate], ['2026-01-01', '2026-12-31'], '8.4 KR이 O 범위 확장');
  eq(S.saveCalls.some(c => c[0] === 'obj' && c[1] === 'o1'), true, '8.5 O 저장 트리거됨');
}

// ════ 9. 스탠드업 직렬화 왕복 (parseTasksField / serializeTasks) ════
{
  eq(S.parseTasksField(''), { legacy: '', tasks: [] }, '9.1 빈 문자열');
  eq(S.parseTasksField('그냥 메모'), { legacy: '그냥 메모', tasks: [] }, '9.2 레거시 평문');
  const tasks = [{ t: '할일1', d: false }, { t: '할일2', d: true }];
  const ser = S.serializeTasks('메모', tasks);
  const back = S.parseTasksField(ser);
  eq(back.legacy, '메모', '9.3 왕복: legacy 보존');
  eq(back.tasks, tasks, '9.4 왕복: tasks 보존');
  eq(S.serializeTasks('', []), '', '9.5 빈 직렬화는 빈 문자열');
  eq(S.serializeTasks('메모만', []), '메모만', '9.6 tasks 없으면 legacy 평문');
}

// ════ 10. 삭제 안전장치 (buildDeleteSubtree, confirmCascadeDelete) ════
{
  S.state = { initiativeTasks: { i1: [{ id: 't1' }, { id: 't2' }], i2: [{ id: 't3' }] },
    objectives: [{ id: 'o1', title: 'O', keyResults: [
      { id: 'k1', title: 'KR1', initiatives: [{ id: 'i1', title: 'I1' }, { id: 'i2', title: 'I2' }] },
      { id: 'k2', title: 'KR2', initiatives: [] } ] }] };
  const o = S.state.objectives[0], kr = o.keyResults[0];
  // Objective: 하위 init 2 + task 3
  const so = S.buildDeleteSubtree('objective', { o });
  eq([so.initCount, so.taskCount], [2, 3], '10.1 Objective 하위 집계');
  eq(!!so.payload.objective, true, '10.2 payload에 objective 보존');
  // KR: 하위 init 2 + task 3
  const sk = S.buildDeleteSubtree('key_result', { o, kr });
  eq([sk.initCount, sk.taskCount], [2, 3], '10.3 KR 하위 집계');
  eq(Object.keys(sk.payload.initiativeTasks).sort(), ['i1', 'i2'], '10.4 payload에 할일 백업 포함');
  // Initiative: 자신 1 + task 2
  const si = S.buildDeleteSubtree('initiative', { kr, init: kr.initiatives[0] });
  eq([si.initCount, si.taskCount], [1, 2], '10.5 Initiative 하위 집계');
  // 빈 KR
  const sk2 = S.buildDeleteSubtree('key_result', { o, kr: o.keyResults[1] });
  eq([sk2.initCount, sk2.taskCount], [0, 0], '10.6 빈 KR은 0/0');
  // confirm 메시지: 하위 개수 명시
  let captured = '';
  S.confirm = (m) => { captured = m; return true; };
  S.confirmCascadeDelete('KR', 'KR1', 2, 3);
  eq(/이니셔티브 2개/.test(captured) && /할일 3개/.test(captured), true, '10.7 KR 삭제 경고에 하위 개수 표기');
  // 이니셔티브 삭제 경고엔 '하위 이니셔티브' 줄 없음
  captured = '';
  S.confirmCascadeDelete('이니셔티브', 'I1', 1, 2);
  eq(/하위 이니셔티브/.test(captured), false, '10.8 이니셔티브 경고엔 이니셔티브 줄 생략');
  eq(/할일 2개/.test(captured), true, '10.9 이니셔티브 경고에 할일 개수 표기');
  // 하위 없으면 경고 줄 없음(단순 확인)
  captured = '';
  S.confirmCascadeDelete('KR', 'KR2', 0, 0);
  eq(/함께 영구 삭제/.test(captured), false, '10.10 하위 없으면 cascade 경고 생략');
}

// ── 결과 ──
console.log(`\n런칭 전 통합 스위트: ${pass} 통과, ${fail} 실패`);
if (fail) { console.log('\n' + fails.join('\n') + '\n'); process.exit(1); }
else console.log('✅ 전 도메인 통과');
