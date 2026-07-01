# an-jieun.github.io

`https://an-jieun.github.io` — **홈은 포트폴리오**, `/blog` 는 기술 블로그(전자두뇌만들기).
VitePress + GitHub Pages 로 빌드·배포되며, 포트폴리오는 빌드 시 PDF 로도 자동 생성됩니다.

---

## 🗂 포트폴리오 갱신 방법 (이 저장소에서 편집 → 푸시하면 사이트 자동 갱신)

포트폴리오 내용은 **데이터 파일 한 개**로 관리됩니다.

- 편집 파일: `docs/.vitepress/data/portfolio.json`
  - `name` · `title` · `tagline` · `about` · `links`(GitHub·Blog·X·Email)
  - `skills` (분류별) · `projects` · `experience` · `education`
- 프로필 사진: `docs/public/static/img/profile.png` 교체
- 렌더링 컴포넌트: `docs/.vitepress/theme/components/Portfolio.vue` (레이아웃/스타일)
- 홈 진입점: `docs/index.md` (`<Portfolio />` 렌더)

### 갱신 절차
1. `portfolio.json` 에서 프로젝트/경력 등을 추가·수정
2. 커밋 후 `main` 브랜치에 푸시
3. GitHub Actions(`.github/workflows/deploy.yml`)가 자동으로
   빌드 → **portfolio.pdf 생성** → GitHub Pages 배포

> Claude Code 등 툴에서 "포트폴리오에 프로젝트 추가해줘" 라고 하면 `portfolio.json` 을
> 편집하고 커밋·푸시하는 흐름으로 갱신하면 됩니다.

### 로컬 미리보기 / 빌드
```bash
npm ci
npm run docs:dev      # 로컬 개발 서버 (홈 = 포트폴리오)
npm run build         # docs:build + portfolio.pdf 생성 (전체 빌드)
npm run pdf           # dist 기준으로 PDF만 재생성
```

### PDF 내보내기
- **자동**: 배포 시 `scripts/generate-pdf.mjs`(puppeteer)가 홈을 A4 PDF 로 렌더 →
  `docs/.vitepress/dist/portfolio.pdf` → 배포 후 `https://an-jieun.github.io/portfolio.pdf`
- **수동**: 포트폴리오 페이지의 `🖨 인쇄 / PDF로 저장` 버튼(브라우저 인쇄, `@media print` 적용)
- 상단 네비 `Resume (PDF)` 링크로도 접근

---

# 블로그 문서작성방법

## 환경
- vitepress
- gitpage
- 블로그 홈: `/blog` (`docs/blog.md`), 글: `docs/contents/**` (사이드바는 `/contents/` 경로에서만 노출)

## deployment
- .github > workflows > deploy.yml 폴더 필요

## icon 추가
- vitepress는 public에 static 폴더 경로 구성

## giscus
- config options : https://giscus.app/ko

## 페이지 slug 작성

```
---
title: {페이지 타이틀}
description: {페이지 설명}
keywords: '{키워드 : " "로 작성}'
url: "/{콘텐츠폴더명}/({하위폴더명})/마크다운파일명.html"
img : "{홈페이지 static 폴더 상에서의 경로}"
---
```

## 썸네일용 이미지 경로
- 기본 : https://an-jieun.github.io/static/icon/icon.svg
- 특정 이미지 : https://an-jieun.github.io/static/img/{}

`public > static`에 있는 폴더들은 빌드마다 파일명과 경로가 유지된다.