// 프로젝트 상세 페이지 목록 — portfolio.json 의 projects 하나당 /projects/<slug>.html 한 장씩 생성
// (VitePress Dynamic Routes: https://vitepress.dev/guide/routing#dynamic-routes)
import data from '../.vitepress/data/portfolio.json'
import { projectSlug, stripHtml } from '../.vitepress/theme/projects.js'

const SITE = 'https://an-jieun.github.io'
const DESC_LIMIT = 150

// head 메타·JSON-LD 문자열에 그대로 들어가므로 큰따옴표는 피한다
const clean = (s) => stripHtml(s).replace(/"/g, "'")

export default {
  paths() {
    return (data.projects || []).map((p, i) => {
      const desc = clean(p.summary || p.description)
      const firstImg = (p.images || []).find((im) => im && typeof im.src === 'string' && im.src.startsWith('/'))
      return {
        params: {
          slug: projectSlug(p, i),
          title: clean(p.name) || `Project ${i + 1}`,
          description: desc.length > DESC_LIMIT ? `${desc.slice(0, DESC_LIMIT - 1)}…` : desc,
          img: firstImg ? SITE + firstImg.src : '',
        },
      }
    })
  },
}
