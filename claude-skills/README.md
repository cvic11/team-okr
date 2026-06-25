# claude-skills — 내 스킬 창고 (어느 컴퓨터에서나)

이 대화에서 만든 스킬들을 한 곳에 모아 **어느 컴퓨터/세션에서든 꺼내 쓰도록** 만든 묶음입니다.
스킬은 자동 동기화되지 않으므로(표면마다 분리), **이 repo를 단일 출처(source of truth)**로 두고
각 머신에서 당겨와 설치합니다.

## 들어있는 것
```
claude-skills/
├─ skills/
│  ├─ research-harness/        멀티 에이전트 리서치 하네스 (오케스트레이터)
│  ├─ cardnews/                요약/리포트 → SNS 카드뉴스 PNG·PDF·PPTX
│  └─ _your-claude-ai-skill/   ⛳ claude.ai에서 만든 '핵심 재료' 들어갈 슬롯(비어 있음)
├─ agents/                     리서치 하네스용 서브에이전트 5종
├─ install.sh                  ~/.claude 에 설치(심볼릭 링크 또는 복사)
├─ hooks/session-start-install.sh   세션 시작 시 자동 설치 스크립트
└─ settings.snippet.json       SessionStart 훅 스니펫(전역 설정용)
```

## 설치 (수동) — 어느 머신에서나
```bash
git clone https://github.com/cvic11/team-okr ~/team-okr   # 이미 있으면 생략
cd ~/team-okr/claude-skills
./install.sh          # 심볼릭 링크(권장): repo pull 하면 자동 반영
# ./install.sh --copy # 링크 대신 복사본을 원하면
```
→ `~/.claude/skills/`, `~/.claude/agents/` 에 깔리고, Claude Code 재시작 시 인식됩니다.

## 설치 (자동) — SessionStart 훅
- **이 repo의 세션:** `.claude/settings.json` 에 이미 SessionStart 훅이 들어 있어,
  team-okr 에서 Claude Code 세션이 열리면 **자동으로 설치**됩니다(웹 세션 포함).
- **모든 프로젝트/전역에 적용:** `settings.snippet.json` 의 `hooks` 블록을
  `~/.claude/settings.json` 에 합치세요.
- **다른 머신에서 자동으로 당겨오기:** 환경변수로 창고 위치를 지정하면 훅이 clone/pull 합니다.
  ```bash
  export SKILLS_REPO=https://github.com/cvic11/team-okr
  ```

## "어느 컴퓨터에서나" 정리
| 표면 | 방법 |
|---|---|
| **claude.ai (채팅)** | 스킬을 계정에 업로드 → 로그인하면 어느 PC든 자동 사용 |
| **Claude Code (로컬/웹)** | 이 repo가 단일 출처 → `install.sh` 또는 SessionStart 훅으로 각 머신에 설치 |
| **API/Console** | 동일 SKILL.md 폴더를 별도 업로드 |

## ⛳ 핵심 재료(claude.ai 스킬) 채우는 법
`skills/_your-claude-ai-skill/SKILL.md` 참고. claude.ai에서 그 스킬을 다운로드해
이 폴더를 교체하거나, 내용을 Claude에게 주면 대신 채워 커밋해 줍니다.
