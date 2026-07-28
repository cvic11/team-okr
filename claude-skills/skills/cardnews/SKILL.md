---
name: cardnews
description: >
  텍스트 요약/리포트를 SNS용 카드뉴스 이미지(PNG)로 만든다. 로컬 Chromium으로
  HTML 카드를 렌더링해 1920×1080 PNG로 캡처하고, 필요하면 PDF·PPTX로 묶는다.
  "카드뉴스로 만들어줘", "요약을 카드 이미지로", "인스타 카드로 만들어줘" 같은 요청에 사용.
---

# 카드뉴스 생성 (Cardnews)

리포트/요약 텍스트를 받아 **시각 카드 PNG**로 만든다. 네트워크 불필요(완전 로컬).

## 사전 준비 (한 번만)
```bash
# 한글 폰트 + 헤드리스 브라우저 + (선택)PDF/PPTX 패키징
which fc-list || apt-get install -y --no-install-recommends fonts-noto-cjk
# Chromium: Claude Code 웹 환경엔 /opt/pw-browsers/chromium-*/chrome-linux/chrome 가 보통 존재.
# 없으면: npx playwright install chromium  또는  apt-get install -y chromium
pip install -q img2pdf python-pptx   # PDF/PPTX 묶음용 (선택)
```

## 절차
1. **카드 설계** — 입력 텍스트를 카드당 1메시지로 쪼갠다. 보통 6~9장.
   각 카드 = `(태그, 제목, 부제, [(키, 값) ...])`.
2. **HTML 생성** — 아래 템플릿으로 카드별 HTML 파일을 만든다(1280×720 기준, 다크 배경 + 액센트 컬러 로테이션).
3. **PNG 캡처** — Chromium 헤드리스로 스크린샷:
   ```bash
   CHROME="$(ls /opt/pw-browsers/chromium-*/chrome-linux/chrome 2>/dev/null | head -1)"
   "$CHROME" --headless=new --no-sandbox --disable-gpu --hide-scrollbars \
     --force-device-scale-factor=1.5 --window-size=1280,720 \
     --screenshot=card_01.png "file:///abs/path/card_01.html"
   ```
   → 1920×1080 PNG 생성(1.5배 스케일).
4. **(선택) 묶음** — PNG들을 PDF/PPTX로:
   ```python
   import glob, img2pdf
   files=sorted(glob.glob("card_*.png"))
   open("cards.pdf","wb").write(img2pdf.convert(files))
   from pptx import Presentation; from pptx.util import Inches
   prs=Presentation(); prs.slide_width=Inches(13.333); prs.slide_height=Inches(7.5)
   for f in files:
       s=prs.slides.add_slide(prs.slide_layouts[6])
       s.shapes.add_picture(f,0,0,width=prs.slide_width,height=prs.slide_height)
   prs.save("cards.pptx")
   ```
5. **전달** — 생성된 PNG/PDF/PPTX를 사용자에게 보낸다.

## HTML 카드 템플릿 (다크 + 액센트)
```html
<!DOCTYPE html><html lang="ko"><head><meta charset="utf-8"><style>
*{margin:0;padding:0;box-sizing:border-box;font-family:"Noto Sans CJK KR",sans-serif;}
body{width:1280px;height:720px;background:linear-gradient(135deg,#0f172a,#1e293b);color:#f1f5f9;}
.wrap{padding:64px 72px;height:720px;display:flex;flex-direction:column;position:relative;}
.bar{position:absolute;top:0;left:0;width:14px;height:720px;background:var(--a);}
.tag{display:inline-block;background:var(--a);color:#0f172a;font-weight:800;font-size:22px;
     padding:8px 20px;border-radius:999px;}
.num{position:absolute;top:54px;right:72px;font-size:120px;font-weight:900;color:rgba(255,255,255,.06);}
h1{font-size:56px;font-weight:900;margin:26px 0 8px;line-height:1.15;}
.sub{font-size:30px;color:var(--a);font-weight:700;margin-bottom:30px;}
.row{display:flex;gap:22px;background:rgba(255,255,255,.04);border-left:5px solid var(--a);
     border-radius:14px;padding:20px 26px;margin-bottom:20px;}
.k{min-width:190px;font-size:24px;font-weight:800;color:var(--a);}
.v{font-size:25px;line-height:1.45;color:#e2e8f0;flex:1;}
</style></head><body style="--a:#0ea5e9"><div class="wrap">
<div class="bar"></div><div class="num">01</div>
<div><span class="tag">태그</span></div><h1>제목</h1><div class="sub">부제</div>
<div class="row"><div class="k">키</div><div class="v">값</div></div>
</div></body></html>
```
액센트 컬러 로테이션 예: `#0ea5e9 #6366f1 #14b8a6 #f59e0b #8b5cf6 #ec4899 #10b981 #3b82f6`

## 원칙
- 카드당 핵심 1개. 글자 많으면 카드를 쪼갠다.
- 한글 깨지면 `fc-list :lang=ko` 로 Noto CJK 설치 확인.
- 표지(01)는 제목 크게(72px), 나머지는 56px.
