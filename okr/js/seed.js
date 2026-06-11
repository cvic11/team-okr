// ── 시드 데이터: AX(AI Transformation) 팀 OKR ─────────────────
// 모든 날짜는 "오늘" 기준 상대값으로 생성 → 언제 열어도 데모가 살아있음
window.OKR_SEED = function (D, uid, TODAY) {
  const Q = D.quarterOf(TODAY);
  const t = n => D.add(TODAY, n);

  const nodes = {};
  let sortCnt = {};
  function add(type, parentId, title, owner, start, end, extra) {
    const key = parentId || 'root';
    sortCnt[key] = (sortCnt[key] || 0);
    const n = Object.assign({
      id: uid(), type, parentId: parentId || null, title, owner,
      start, end, status: 'active', sort: sortCnt[key]++,
      createdAt: new Date().toISOString(), updatedAt: new Date().toISOString(),
      updatedBy: owner, completedAt: null, carry: 0,
    }, extra || {});
    if (type === 'task') { n.due = n.due || end; }
    nodes[n.id] = n;
    return n;
  }
  const doneAt = nd => ({ status: 'done', completedAt: D.parse(t(nd)).toISOString().slice(0, 10) + 'T18:00:00.000Z' });

  // ════ O1 ════
  const o1 = add('o', null, 'AX에 성공하여 팀원 전원이 관련 팀의 리드가 된다', 'Leo', Q.start, Q.end);

  // KR1.1
  const kr11 = add('kr', o1.id, '핵심 반복업무 5건을 AI 파이프라인으로 전환', 'Nara', Q.start, Q.end);
  const i111 = add('init', kr11.id, '발주 가이드 자동 생성 파이프라인', 'Nara', t(-21), t(14));
  add('task', i111.id, '발주 데이터 정제 스크립트 작성', 'Nara', t(-14), t(-1), doneAt(-1));
  add('task', i111.id, '프롬프트 v2 평가셋 30건 작성', 'Nara', t(-3), t(0));
  add('task', i111.id, '예외 케이스(신규점) 처리 규칙 정리', 'Heo', t(-7), t(-2));   // 이월 +2d
  add('task', i111.id, '파일럿 매장 3곳 결과 리뷰', 'Leo', t(1), t(3));

  const i112 = add('init', kr11.id, '주간 리포트 자동화', 'Choi', t(-14), t(10));
  add('task', i112.id, '리포트 템플릿 확정', 'Choi', t(-10), t(-3), doneAt(-3));
  add('task', i112.id, '데이터 소스 연결(매출 시트)', 'Choi', t(-2), t(0));
  add('task', i112.id, '리뷰어 검수 플로우 정의', 'Hunter7', t(-9), t(-5));          // 이월 +5d → 황색 경고
  add('task', i112.id, '실패 알림 규칙 정의', 'Nara', t(2), t(6));

  // KR1.2
  const kr12 = add('kr', o1.id, '팀원 5인 전원 사내 AX 인증 취득', 'Heo', Q.start, Q.end);
  const i121 = add('init', kr12.id, 'AX 인증 스터디 운영', 'Heo', t(-28), t(12));
  add('task', i121.id, '스터디 커리큘럼 확정', 'Heo', t(-25), t(-6), doneAt(-6));
  add('task', i121.id, '모의시험 1회차 진행', 'Hunter7', t(-2), t(0));
  add('task', i121.id, '모의시험 2회차 진행', 'Heo', t(5), t(7));

  const i122 = add('init', kr12.id, '실무 적용 사례 1인 1건 제출', 'Leo', t(-7), t(9));
  add('task', i122.id, '사례 제출 양식 배포', 'Leo', t(-7), t(-2), doneAt(-2));
  add('task', i122.id, 'Leo — 발주 자동화 사례 초안', 'Leo', t(0), t(2));
  add('task', i122.id, 'Nara — 리포트 자동화 사례 초안', 'Nara', t(0), t(2));
  add('task', i122.id, 'Hunter7 — 측정 대시보드 사례 초안', 'Hunter7', t(3), t(13)); // 부모 기간 이탈 → ! 경고

  // KR1.3
  const kr13 = add('kr', o1.id, 'AI 도입 업무 리드타임 40% 단축', 'Hunter7', Q.start, Q.end);
  const i131 = add('init', kr13.id, '리드타임 측정 체계 구축', 'Hunter7', t(-10), t(8));
  add('task', i131.id, '기준 리드타임 측정(현행 프로세스)', 'Hunter7', t(-8), t(-1), doneAt(-1));
  add('task', i131.id, '자동 측정 대시보드 v1', 'Hunter7', t(-4), t(0));
  add('task', i131.id, '병목 구간 분석 리포트', 'Choi', t(1), t(5));

  // ════ O2 ════
  const o2 = add('o', null, 'AX 성과를 전사에 증명한다', 'Choi', Q.start, Q.end);

  const kr21 = add('kr', o2.id, '사내 AX 사례 발표 3회', 'Choi', Q.start, Q.end);
  const i211 = add('init', kr21.id, '6월 전사 공유회 발표', 'Choi', t(-12), t(6));
  add('task', i211.id, '발표 주제 확정', 'Choi', t(-5), t(-1), doneAt(-1));
  add('task', i211.id, '발표 자료 초안 작성', 'Choi', t(-3), t(0));
  add('task', i211.id, '리허설 및 피드백 반영', 'Leo', t(3), t(5));

  const kr22 = add('kr', o2.id, '타 팀 AX 도입 지원 2건', 'Leo', Q.start, Q.end);
  const i221 = add('init', kr22.id, 'CS팀 도입 지원', 'Leo', t(-15), t(15));
  add('task', i221.id, 'CS팀 요구사항 인터뷰', 'Leo', t(-10), t(-4), doneAt(-4));
  add('task', i221.id, '지원 범위 합의', 'Leo', t(-3), t(-1));                       // 이월 +1d
  add('task', i221.id, 'CS팀 파일럿 셋업', 'Nara', t(4), t(11));

  // ── 멤버 ──
  const members = ['Leo', 'Nara', 'Heo', 'Choi', 'Hunter7'].map(name => ({
    name, pin: '0000', lastActive: null,
  }));

  // ── 어제 스탠드업 노트 (이력 데모용) ──
  const standup = {};
  standup[t(-1)] = {
    Leo: { blocked: 'CS팀 일정 회신 대기 중' },
    Nara: { blocked: '' },
    Heo: { blocked: '예외 케이스 기준을 Nara와 합의 필요' },
    Choi: { blocked: '' },
    Hunter7: { blocked: '검수 플로우 결정권자 불명확 — 계속 밀리는 중' },
  };

  // ── 활동 로그 ──
  const log = [
    { ts: new Date(Date.now() - 3600e3).toISOString(), actor: 'Nara', action: '완료', target: '할일 "발주 데이터 정제 스크립트 작성"', extra: '' },
    { ts: new Date(Date.now() - 7200e3).toISOString(), actor: 'Choi', action: '수정', target: '이니셔티브 "6월 전사 공유회 발표"', extra: '종료일 변경' },
    { ts: new Date(Date.now() - 86400e3).toISOString(), actor: 'Heo', action: '생성', target: '할일 "모의시험 2회차 진행"', extra: '' },
  ];

  return { nodes, members, standup, log, archives: [], quarter: Q.label };
};
