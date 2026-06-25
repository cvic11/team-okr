#!/usr/bin/env bash
# 스킬 창고 → ~/.claude 설치 스크립트
# 사용법:
#   ./install.sh            # 심볼릭 링크(기본, 권장): repo를 pull 하면 자동 반영
#   ./install.sh --copy     # 파일 복사(링크 대신 실제 복사본)
set -euo pipefail

REPO_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
DEST="${CLAUDE_HOME:-$HOME/.claude}"
MODE="${1:-link}"
mkdir -p "$DEST/skills" "$DEST/agents"

install_one() {  # $1=src  $2=dst
  if [ "$MODE" = "--copy" ]; then
    rm -rf "$2"; cp -r "$1" "$2"
  else
    ln -sfn "$1" "$2"
  fi
}

# skills (자리표시자 _your-claude-ai-skill 은 내용 채워지면 자동 포함됨)
for d in "$REPO_DIR"/skills/*/; do
  name="$(basename "$d")"
  install_one "$d" "$DEST/skills/$name"
  echo "skill  → $DEST/skills/$name"
done

# agents
for f in "$REPO_DIR"/agents/*.md; do
  base="$(basename "$f")"
  install_one "$f" "$DEST/agents/$base"
  echo "agent  → $DEST/agents/$base"
done

echo "✅ 설치 완료. Claude Code를 재시작하면 인식됩니다. (mode: $MODE)"
