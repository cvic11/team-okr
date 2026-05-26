// 푸시 전 사전 검증 스크립트
// 사용: node .preflight.js
const fs = require('fs');
const code = fs.readFileSync('app.js', 'utf8');
let pass = true;

// 1) 문법 검사
try { new Function(code); console.log('✓ 1/3 syntax OK'); }
catch (e) { console.log('✗ 1/3 SYNTAX ERROR:', e.message); pass = false; }

// 2) Click 핸들러 안에 잘못된 el.dataset 사용 검사
//    클릭 핸들러는 'btn' 변수만 정의함. el이 정의되지 않은 곳에서 el.dataset 쓰면 ReferenceError
function findClickHandlerRanges(src) {
  const ranges = [];
  const re = /document\.addEventListener\(['"]click['"]/g;
  let m;
  while ((m = re.exec(src))) {
    const start = m.index;
    // 매칭되는 '{' 부터 균형 '}' 찾기
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
const clickRanges = findClickHandlerRanges(code);
const violations = [];
clickRanges.forEach(([s, e], idx) => {
  const block = code.slice(s, e);
  // 'el'을 정의하는지 확인
  const definesEl = /\bconst el\s*=|\blet el\s*=|\bvar el\s*=/.test(block);
  if (!definesEl) {
    // 'el.dataset' 또는 'el.value' 등 el 참조 찾기 (하지만 다른 사람이 정의한 변수일 수 있어 false-positive 있음)
    // 가장 신뢰성 있는 검사: el.dataset만 검사 (이게 가장 흔한 버그 패턴)
    const matches = block.matchAll(/\bel\.dataset\./g);
    for (const mm of matches) {
      // 해당 위치의 라인 번호
      const pos = s + mm.index;
      const line = code.slice(0, pos).split('\n').length;
      violations.push({ line, handler: 'click@' + (code.slice(0, s).split('\n').length) });
    }
  }
});
if (violations.length === 0) console.log('✓ 2/3 click handler scope OK');
else { console.log('✗ 2/3 SCOPE BUG:', JSON.stringify(violations, null, 2)); pass = false; }

// 3) TDZ 잠재 검사: const X = ... ; ... 사용한 const X 가 위쪽에 나오는지 (간단 휴리스틱)
//    동일 함수 안에서 변수 사용이 선언보다 먼저 나오면 의심
function checkTDZ(src) {
  // 큰 함수 단위로 분리하기는 복잡, 일단 알려진 패턴 (allKR 같은 const)
  const issues = [];
  const fnPattern = /function\s+\w+[^{]*\{([\s\S]*?)\n\s{0,4}\}/g; // 대략적
  // 더 단순한 검사: const X = collectAllKR\(\); 가 있는데 그 위쪽에 X. 가 있으면 의심
  const lines = src.split('\n');
  for (let i = 0; i < lines.length; i++) {
    const m = lines[i].match(/const (\w+)\s*=\s*collectAllKR\(\)/);
    if (!m) continue;
    const varName = m[1];
    // 위로 30줄 안에서 같은 varName.X 사용 검사
    for (let j = Math.max(0, i - 30); j < i; j++) {
      if (lines[j].match(new RegExp('\\b' + varName + '\\.'))) {
        // 같은 함수 안인지 대략 확인 (의심만)
        issues.push({ line: j + 1, var: varName, declaredAt: i + 1 });
        break;
      }
    }
  }
  return issues;
}
const tdz = checkTDZ(code);
if (tdz.length === 0) console.log('✓ 3/3 TDZ check OK');
else { console.log('⚠ 3/3 POSSIBLE TDZ:', JSON.stringify(tdz, null, 2)); /* 경고만, 차단 안함 */ }

console.log(pass ? '\n✅ PASS — 푸시 가능' : '\n❌ FAIL — 푸시 전 수정 필요');
process.exit(pass ? 0 : 1);
