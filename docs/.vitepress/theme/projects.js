// ────────────────────────────────────────────────────────────────
// 프로젝트 상세 페이지(/projects/<slug>.html) 공용 헬퍼
//
// - docs/projects/[slug].paths.js  : 빌드 시(Node) 어떤 상세 페이지를 만들지 결정
// - Portfolio.vue / ProjectDetail.vue : 브라우저에서 링크·이전/다음 순서 계산
// 양쪽이 같은 규칙을 쓰도록 여기 한 곳에 모아 둔다.
// ────────────────────────────────────────────────────────────────

// 같은 연도 안에서 카테고리를 보여줄 순서 (나머지 카테고리는 뒤에 등장 순서대로)
export const PROJECT_ORDER = ['연구실 내부 프로젝트', '개인 프로젝트']

// 연도를 알 수 없는 프로젝트가 모이는 그룹 이름 (목록 맨 아래)
export const NO_YEAR_LABEL = '연도 미정'

// 상세 페이지 주소에 쓰는 slug. portfolio.json 의 slug 가 비어 있으면 순번으로 대체한다.
export function projectSlug(project, idx) {
  const s = String((project && project.slug) || '').trim()
  return s || `project-${idx + 1}`
}

export function projectPath(project, idx) {
  return `/projects/${encodeURIComponent(projectSlug(project, idx))}.html`
}

// period 문자열에서 연도 추출. "2023 ~ 2025" 처럼 여러 개면 가장 최근(끝) 연도,
// "현재·진행 중" 이 들어 있으면 올해로 본다. 연도가 없으면 null.
export function projectYear(project) {
  const s = String((project && project.period) || '')
  if (/현재|진행\s*중|present|ongoing/i.test(s)) return new Date().getFullYear()
  const years = (s.match(/(?:19|20)\d{2}/g) || []).map(Number)
  return years.length ? Math.max(...years) : null
}

// 연도별로 묶기 (최신 연도가 위) → [{ year, label, items: [{ project, idx }] }]
// 같은 연도 안에서는 카테고리 순서(PROJECT_ORDER) → portfolio.json 에 적힌 순서.
export function groupProjectsByYear(projects) {
  const catRank = (p) => {
    const r = PROJECT_ORDER.indexOf(p.category)
    return r === -1 ? PROJECT_ORDER.length : r
  }
  const rows = (projects || []).map((p, idx) => ({ project: p, idx, year: projectYear(p) }))
  rows.sort((a, b) =>
    (b.year ?? -Infinity) - (a.year ?? -Infinity) ||
    catRank(a.project) - catRank(b.project) ||
    a.idx - b.idx
  )
  const groups = []
  rows.forEach(({ project, idx, year }) => {
    const last = groups[groups.length - 1]
    if (last && last.year === year) last.items.push({ project, idx })
    else groups.push({ year, label: year == null ? NO_YEAR_LABEL : String(year), items: [{ project, idx }] })
  })
  return groups
}

// 화면에 보이는 순서 그대로 펼친 목록 (상세 페이지의 이전/다음 이동용)
export function orderedProjects(projects) {
  return groupProjectsByYear(projects).flatMap((g) => g.items)
}

// 서식(HTML)이 들어간 설명에서 태그를 걷어낸 순수 텍스트
export function stripHtml(html) {
  return String(html || '')
    .replace(/<[^>]*>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/&quot;/g, '"')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&amp;/g, '&')
    .replace(/\s+/g, ' ')
    .trim()
}

// 데모 영상 주소 → 임베드 방식 판별
//   YouTube / Vimeo / Google Drive 링크는 iframe 플레이어로,
//   그 외(.mp4·.webm 등 직접 파일, /static/... 경로)는 <video> 로 재생한다.
export function videoEmbed(url) {
  const u = String(url || '').trim()
  if (!u) return null
  let m = u.match(/(?:youtube\.com\/(?:watch\?(?:.*&)?v=|embed\/|shorts\/|live\/)|youtu\.be\/)([\w-]{6,})/)
  if (m) return { type: 'iframe', src: `https://www.youtube-nocookie.com/embed/${m[1]}` }
  m = u.match(/vimeo\.com\/(?:video\/)?(\d+)/)
  if (m) return { type: 'iframe', src: `https://player.vimeo.com/video/${m[1]}` }
  m = u.match(/drive\.google\.com\/file\/d\/([\w-]+)/)
  if (m) return { type: 'iframe', src: `https://drive.google.com/file/d/${m[1]}/preview` }
  return { type: 'video', src: u }
}
