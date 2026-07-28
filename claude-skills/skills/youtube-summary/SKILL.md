---
name: youtube-summary
description: >
  유튜브(또는 자막 있는 영상) URL을 받아 자막을 추출하고 핵심을 요약한다.
  WebFetch가 봇 차단으로 막힐 때 yt-dlp로 자막을 직접 받아 처리한다. 타임스탬프가
  필요하면 구간별로 정리한다. "유튜브 요약해줘", "이 영상 요약", "영상 자막 뽑아줘",
  유튜브 링크와 함께 "요약" 요청이 오면 사용한다.
---

# 유튜브 영상 요약 (youtube-summary)

영상 URL → 자막 추출 → 정리/요약. 화면 캡처가 아니라 **자막(텍스트) 기반**이라 빠르고 정확하다.

## 핵심 원칙
- **WebFetch로 youtube.com 직접 접근은 보통 막힌다**(구글 "sorry" 봇 차단 페이지로 리다이렉트). 곧장 yt-dlp로 간다.
- 영상 **스트림/썸네일(googlevideo·ytimg)** 은 egress 정책상 403일 수 있다 → 자막 엔드포인트는 대개 허용되니 **자막만** 받는다.

## 절차

### 1) yt-dlp 준비 (없으면)
```bash
command -v yt-dlp || pip install -q yt-dlp
```

### 2) 자막 다운로드 (수동 자막 → 자동 생성 자막 순)
```bash
VID="https://www.youtube.com/watch?v=XXXXXXXXXXX"   # 또는 11자리 ID
cd "$(mktemp -d)"
yt-dlp --skip-download --write-subs --write-auto-subs \
  --sub-langs "ko,ko-orig,en,en-orig" --sub-format vtt \
  -o "vid.%(ext)s" "$VID" 2>&1 | tail -15
ls *.vtt
```
- 한국어 영상은 `ko-orig`(원본) 또는 `ko`(번역) 중 하나가 나온다. 둘 다 있으면 `ko-orig` 우선.
- 자막이 아예 없으면 그 사실을 사용자에게 알리고 대안(설명/검색 기반 요약)을 제시.

### 3) VTT 정리 (타임스탬프·태그 제거 + 롤링자막 중복 제거)
```python
import re, glob, sys
f = sorted(glob.glob("*.ko-orig.vtt") or glob.glob("*.ko.vtt") or glob.glob("*.vtt"))[0]
out=[]
for ln in open(f, encoding="utf-8"):
    if '-->' in ln or ln.startswith(('WEBVTT','Kind','Language')) or not ln.strip():
        continue
    ln = re.sub(r'<[^>]+>','', ln).strip()
    if ln and (not out or out[-1]!=ln):      # 인접 중복 제거
        out.append(ln)
text = re.sub(r'\s+',' ',' '.join(out))
open("transcript.txt","w",encoding="utf-8").write(text)
print("WORDS:", len(text.split()))
```

### 4) 타임스탬프가 필요하면 (구간별 캡처 가이드 등)
VTT의 `HH:MM:SS --> ...` 줄을 살려, 핵심 키워드가 처음 등장하는 큐의 시작 시각을 뽑아 구간 표로 정리한다.

### 5) 요약 작성
`transcript.txt` 전체를 읽고 다음 형식으로:
```
## 📺 [제목] 요약
- 형식/출연/주제 1줄
### 핵심 내용 (섹션별 불릿)
### 한 줄 정리
> 출처: 원본 영상 링크 (자막 직접 추출)
```

## 정직성
- 자막을 **끝까지 읽었는지** 여부를 명확히 한다. 설명·검색 기반이면 "자막 전체 아님"이라고 표기.
- 영상 화면 캡처는 googlevideo/ytimg 403로 막힐 수 있음 → 막히면 "타임스탬프 가이드"로 대체 제안.

## 연계
- 요약 결과를 카드로 → `cardnews` 스킬
- 영상 주제를 더 깊게 → `research-harness` 스킬
