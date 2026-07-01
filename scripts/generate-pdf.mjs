// 빌드된 포트폴리오 홈(/)을 headless 브라우저로 렌더해 portfolio.pdf 로 저장한다.
// - 의존성: puppeteer (Chromium 포함)
// - 입력: docs/.vitepress/dist (docs:build 산출물)
// - 출력: docs/.vitepress/dist/portfolio.pdf  → 배포되면 https://an-jieun.github.io/portfolio.pdf
//
// 로컬 실행:  npm run docs:build && npm run pdf
// CI 실행:    deploy.yml 에서 build 직후 호출

import http from 'node:http'
import { readFile } from 'node:fs/promises'
import { existsSync } from 'node:fs'
import { join, extname, normalize } from 'node:path'

const DIST = join(process.cwd(), 'docs', '.vitepress', 'dist')
const OUT = join(DIST, 'portfolio.pdf')
const PORT = 4319

if (!existsSync(join(DIST, 'index.html'))) {
  console.error(`[pdf] dist 가 없습니다: ${DIST}\n먼저 "npm run docs:build" 를 실행하세요.`)
  process.exit(1)
}

const MIME = {
  '.html': 'text/html', '.js': 'text/javascript', '.mjs': 'text/javascript',
  '.css': 'text/css', '.json': 'application/json', '.png': 'image/png',
  '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.svg': 'image/svg+xml',
  '.gif': 'image/gif', '.webp': 'image/webp', '.ico': 'image/x-icon',
  '.woff': 'font/woff', '.woff2': 'font/woff2', '.ttf': 'font/ttf',
  '.map': 'application/json', '.xml': 'application/xml', '.txt': 'text/plain',
}

// dist 를 서빙하는 최소 정적 서버 (외부 의존성 없음)
const server = http.createServer(async (req, res) => {
  try {
    let urlPath = decodeURIComponent((req.url || '/').split('?')[0])
    if (urlPath.endsWith('/')) urlPath += 'index.html'
    let filePath = normalize(join(DIST, urlPath))
    if (!filePath.startsWith(DIST)) { res.writeHead(403); return res.end() }
    if (!existsSync(filePath)) {
      if (existsSync(filePath + '.html')) filePath += '.html'
      else filePath = join(DIST, 'index.html') // SPA 폴백
    }
    const body = await readFile(filePath)
    res.writeHead(200, { 'Content-Type': MIME[extname(filePath)] || 'application/octet-stream' })
    res.end(body)
  } catch (e) {
    res.writeHead(500); res.end(String(e))
  }
})

async function main() {
  let puppeteer
  try {
    puppeteer = (await import('puppeteer')).default
  } catch {
    console.error('[pdf] puppeteer 미설치 — "npm i -D puppeteer" 후 다시 실행하세요.')
    process.exit(1)
  }

  await new Promise((resolve) => server.listen(PORT, resolve))
  const url = `http://localhost:${PORT}/`
  console.log(`[pdf] serving ${DIST} → ${url}`)

  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  })
  try {
    const page = await browser.newPage()
    await page.goto(url, { waitUntil: 'networkidle0', timeout: 60000 })
    await page.emulateMediaType('print') // @media print CSS 적용(버튼 숨김·정리된 레이아웃)
    await page.waitForSelector('.portfolio', { timeout: 20000 })
    await page.pdf({
      path: OUT,
      format: 'A4',
      printBackground: true,
      margin: { top: '14mm', bottom: '14mm', left: '12mm', right: '12mm' },
    })
    console.log(`[pdf] ✅ 생성 완료: ${OUT}`)
  } finally {
    await browser.close()
    server.close()
  }
}

main().catch((e) => {
  console.error('[pdf] 실패:', e)
  server.close()
  process.exit(1)
})
