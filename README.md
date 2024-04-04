# 문서작성방법

## 환경
- vitepress
- gitpage

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