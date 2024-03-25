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

## 페이지 metadata 작성

```
---
title: {페이지 타이틀}
description: {페이지 설명}
keywords: ['{키워드 : " "로 작성}'']
url: "/{콘텐츠폴더명}/({하위폴더명})/마크다운파일명.html"
---
```