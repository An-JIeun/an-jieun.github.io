---
title : Vitepress로 Github Page 디플로이 하기
description: Vitepress로 Github page 디플로이 하는 방법
keywords : ["vitepress", "github", "deploy"]
url : "VITEPRESS/git-deploy.html"
---

# Vitepress로 깃허브 페이지 디플로이 하기

> 💡[Vitepress 공식문서](https://vitepress.dev/guide/deploy)에서 잘 설명하고 있다. 다른 서비스로 호스팅하고 싶으면 공식문서를 잘 살펴보자

이미 디플로이를 위한 깃허브 페이지용 레포지터리가 존재한다는 전제 하에 다음 과정을 수행하면 된다. 깃허브 페이지 레포지터리 생성 방법은 다음의 [링크](https://docs.github.com/ko/pages/quickstart)를 참고하면 된다. 

## STEP 1. 폴더 생성

`docs` 폴더와 동일한 위치에 `.github/workflows` 폴더를 만든다. workflows 폴더 안에 `deploy.yml` 파일을 하나 만든다.

```bash
├── .github
│   └── workflows
│       └── deploy.yml
└── docs
```

## STEP 2. `deploy.yml` 파일 생성

`deploy.yml`파일을 작성한다. 아래 내용을 복붙하고 주석처리된 부분만 자신에게 맞게 수정하면 된다.

```yaml

name: Deploy VitePress site to Pages

on:
  push:
    branches: [main] # dist 파일을 push하는 브랜치를 작성해라
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: pages
  cancel-in-progress: false

jobs:
  # Build job
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4
        with:
          fetch-depth: 0 # Not needed if lastUpdated is not enabled
    # 환경에 맞게 수정하면 된다. 아마도 대부분 nodejs환경에서 사용할 것 같은데, 
    # 그렇다면 수정할 부분이 없다.
      # - uses: pnpm/action-setup@v3 # Uncomment this if you're using pnpm
      # - uses: oven-sh/setup-bun@v1 # Uncomment this if you're using Bun
      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: npm # or pnpm / yarn
      - name: Setup Pages
        uses: actions/configure-pages@v4
      - name: Install dependencies
        run: npm ci # or pnpm install / yarn install / bun install 사용 환경에 맞게 수정
      - name: Build with VitePress
        run: npm run docs:build # or pnpm docs:build / yarn docs:build / bun run docs:build 사용 환경에 맞게 수정
      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: docs/.vitepress/dist

  # Deployment job 
  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }} 
    needs: build
    runs-on: ubuntu-latest
    name: Deploy
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4

```

## STEP 3. 깃허브 Actions 탭에서 디플로이 되고 있는지 확인

이제 디플로이용 브랜치에서 `npm run docs:build`를 수행한 후 push 하면 디플로이가 자동으로 실행된다.
디플로이 진행상황은 깃허브 action 탭에서 확인하면 된다. 디플로이가 완료되면 아래 사진처럼 초록색 체크 아이콘이 뜬다.

![action tab](../imgs/vitepress-deploy-action.png)