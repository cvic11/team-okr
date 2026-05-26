// 푸시 전 사전 검증 스크립트
// 사용: node .preflight.js
const fs = require('fs');
const code = fs.readFileSync('app.js', 'utf8');
let pass = true;
let warnCount = 0;

// 1) 문법 검사
try { new Function(code); console.log('✓ 1/5 syntax OK'); }
catch (e) { console.log('✗ 1/5 SYNTAX ERROR:', e.message); pass = false; }

// 2) Click 핸들러 안에 잘못된 el.dataset 사용 검사
//    클릭 핸들러는 'btn' 변수만 정의함. el이 정의되지 않은 곳에서 el.dataset 쓰면 ReferenceError
function findHandlerRanges(src, eventName) {
  const ranges = [];
  const re = new RegExp(`document\\.addEventListener\\(['"]${eventName}['"]`, 'g');
  let m;
  while ((m = re.exec(src))) {
    const start = m.index;
    let i = src.indexOf('{', start);
    let brace = 1, j = i + 1;
    while (j < src.length && brace > 0) {
      if (src[j] === '{') brace++;
      else if (src[j] === '}') brace--;
      j++;
    }
    ranges.push([i, j]);
  }
  return ranges;
}
const clickRanges = findHandlerRanges(code, 'click');
const violations = [];
clickRanges.forEach(([s, e]) => {
  const block = code.slice(s, e);
  const definesEl = /\bconst el\s*=|\blet el\s*=|\bvar el\s*=/.test(block);
  if (!definesEl) {
    const matches = block.matchAll(/\bel\.dataset\./g);
    for (const mm of matches) {
      const pos = s + mm.index;
      const line = code.slice(0, pos).split('\n').length;
      violations.push({ line, handler: 'click@' + (code.slice(0, s).split('\n').length) });
    }
  }
});
if (violations.length === 0) console.log('✓ 2/5 click handler scope OK');
else { console.log('✗ 2/5 SCOPE BUG:', JSON.stringify(violations, null, 2)); pass = false; }

// 3) TDZ 잠재 검사: const X = ... ; ... 사용한 const X 가 위쪽에 나오는지
function checkTDZ(src) {
  const issues = [];
  const lines = src.split('\n');
  for (let i = 0; i < lines.length; i++) {
    const m = lines[i].match(/const (\w+)\s*=\s*collectAllKR\(\)/);
    if (!m) continue;
    const varName = m[1];
    for (let j = Math.max(0, i - 30); j < i; j++) {
      if (lines[j].match(new RegExp('\\b' + varName + '\\.'))) {
        issues.push({ line: j + 1, var: varName, declaredAt: i + 1 });
        break;
      }
    }
  }
  return issues;
}
const tdz = checkTDZ(code);
if (tdz.length === 0) console.log('✓ 3/5 TDZ check OK');
else { console.log('⚠ 3/5 POSSIBLE TDZ:', JSON.stringify(tdz, null, 2)); warnCount++; }

// 4) collectAllKR이 init.ownerId 를 포함하는지 (v86, renderKRTree 의 owned-init 필터 의존)
//    이 필드가 빠지면 빈 init 가시성 버그 재발
function checkCollectAllKRFields(src) {
  const collectMatch = src.match(/function\s+collectAllKR\s*\([^)]*\)\s*\{[\s\S]*?\n\s{0,4}\}/);
  if (!collectMatch) return ['collectAllKR not found'];
  const body = collectMatch[0];
  const missing = [];
  // init 객체 매핑 안에 ownerId 포함 여부
  const initMapMatch = body.match(/initiatives\s*:[\s\S]*?map\([^)]*=>\s*\(\{([^}]+)\}\)/);
  if (!initMapMatch) return ['init mapping not found in collectAllKR'];
  const initFields = initMapMatch[1];
  const required = ['ownerId'];
  required.forEach(f => { if (!initFields.includes(f)) missing.push(`init.${f}`); });
  return missing;
}
const collectMissing = checkCollectAllKRFields(code);
if (collectMissing.length === 0) console.log('✓ 4/5 collectAllKR fields OK');
else { console.log('✗ 4/5 collectAllKR MISSING:', collectMissing, '\n   → v86 force-add 및 renderKRTree owned-init 필터 동작 안 함. 빈 init 사라짐 버그 재발 위험.'); pass = false; }

// 5) onChange/click 핸들러가 setTimeout(render, ...) 또는 render() 즉시 호출로 깜빡임 야기하는 패턴
//    인라인 사용자 입력 폼 직후 render() 호출은 폼을 덮어쓰므로 위험
function checkDangerousRender(src) {
  const issues = [];
  const lines = src.split('\n');
  for (let i = 0; i < lines.length; i++) {
    // setTimeout(render 또는 setTimeout(()=>render() 패턴
    if (/setTimeout\([^)]*\brender\s*\(/.test(lines[i])) {
      issues.push({ line: i + 1, content: lines[i].trim().slice(0, 100) });
    }
  }
  return issues;
}
const dangerousRender = checkDangerousRender(code);
if (dangerousRender.length === 0) console.log('✓ 5/5 no dangerous setTimeout(render) calls');
else { console.log('⚠ 5/5 setTimeout(render) found (UI 깜빡임 위험):', JSON.stringify(dangerousRender.slice(0, 5), null, 2)); warnCount++; }

console.log(pass ? `\n✅ PASS — 푸시 가능${warnCount > 0 ? ' (경고 ' + warnCount + '건)' : ''}` : '\n❌ FAIL — 푸시 전 수정 필요');
process.exit(pass ? 0 : 1);
