// ────────────────────────────────────────────────────────────────
// 프로젝트 상세 페이지(/projects/<slug>.html) 공용 헬퍼
//
// - docs/projects/[slug].paths.js  : 빌드 시(Node) 어떤 상세 페이지를 만들지 결정
// - Portfolio.vue / ProjectDetail.vue : 브라우저에서 링크·이전/다음 순서 계산
// 양쪽이 같은 규칙을 쓰도록 여기 한 곳에 모아 둔다.
// ────────────────────────────────────────────────────────────────

// 목록에서 카테고리를 보여줄 순서 (나머지 카테고리는 뒤에 등장 순서대로)
export const PROJECT_ORDER = ['연구실 내부 프로젝트', '개인 프로젝트']

// 상세 페이지 주소에 쓰는 slug. portfolio.json 의 slug 가 비어 있으면 순번으로 대체한다.
export function projectSlug(project, idx) {
  const s = String((project && project.slug) || '').trim()
  return s || `project-${idx + 1}`
}

export function projectPath(project, idx) {
  return `/projects/${encodeURIComponent(projectSlug(project, idx))}.html`
}

// 카테고리별로 묶기 → [{ cat, items: [{ project, idx }] }]
export function groupProjects(projects) {
  const groups = {}
  ;(projects || []).forEach((p, idx) => {
    const cat = p.category || '기타'
    if (!groups[cat]) groups[cat] = []
    groups[cat].push({ project: p, idx })
  })
  const ordered = []
  PROJECT_ORDER.forEach((c) => {
    if (groups[c]) {
      ordered.push({ cat: c, items: groups[c] })
      delete groups[c]
    }
  })
  Object.keys(groups).forEach((c) => ordered.push({ cat: c, items: groups[c] }))
  return ordered
}

// 화면에 보이는 순서 그대로 펼친 목록 (상세 페이지의 이전/다음 이동용)
export function orderedProjects(projects) {
  return groupProjects(projects).flatMap((g) => g.items)
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
