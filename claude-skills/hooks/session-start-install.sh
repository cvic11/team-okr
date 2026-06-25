#!/usr/bin/env bash
# SessionStart 훅: 새 Claude Code 세션이 열릴 때 스킬 창고를 ~/.claude 에 자동 설치한다.
# - 이 repo 안에서 실행되면 repo의 claude-skills/ 를 설치
# - 환경변수 SKILLS_REPO 가 있으면 거기서 clone/pull 후 설치 (다른 머신/세션용)
set -euo pipefail

# 1) 같은 repo 안에 창고가 있으면 그걸 사용
SELF_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"   # = claude-skills/
WAREHOUSE="$SELF_DIR"

# 2) 외부 창고 repo 지정 시 clone/pull (예: export SKILLS_REPO=https://github.com/me/my-skills)
if [ -n "${SKILLS_REPO:-}" ]; then
  CACHE="${CLAUDE_HOME:-$HOME/.claude}/skills-repo"
  if [ -d "$CACHE/.git" ]; then
    git -C "$CACHE" pull --quiet --ff-only || true
  else
    git clone --quiet "$SKILLS_REPO" "$CACHE" || true
  fi
  [ -d "$CACHE/claude-skills" ] && WAREHOUSE="$CACHE/claude-skills" || WAREHOUSE="$CACHE"
fi

if [ -x "$WAREHOUSE/install.sh" ]; then
  bash "$WAREHOUSE/install.sh" >/dev/null 2>&1 || true
  echo "[skills] 창고 설치 완료: $WAREHOUSE" >&2
fi
exit 0
