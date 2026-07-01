<script setup>
import { ref, computed } from 'vue'
import data from '../../data/portfolio.json'

// 프로젝트를 category(논문 · 연구실 프로젝트 · 개인 프로젝트) 별로 그룹핑
const PROJECT_ORDER = ['논문', '연구실 프로젝트', '개인 프로젝트']
const groupedProjects = computed(() => {
  const groups = {}
  ;(data.projects || []).forEach((p, idx) => {
    const cat = p.category || '기타'
    if (!groups[cat]) groups[cat] = []
    groups[cat].push({ project: p, idx })
  })
  const ordered = []
  PROJECT_ORDER.forEach((c) => {
    if (groups[c]) { ordered.push({ cat: c, items: groups[c] }); delete groups[c] }
  })
  Object.keys(groups).forEach((c) => ordered.push({ cat: c, items: groups[c] }))
  return ordered
})

const openProjects = ref([])
function toggleProject(i) {
  const pos = openProjects.value.indexOf(i)
  if (pos === -1) openProjects.value.push(i)
  else openProjects.value.splice(pos, 1)
}
function isProjectOpen(i) {
  return openProjects.value.includes(i)
}

function printPage() {
  if (typeof window !== 'undefined') window.print()
}

const icons = {
  github: 'M12 .5A11.5 11.5 0 0 0 .5 12a11.5 11.5 0 0 0 7.86 10.92c.58.1.79-.25.79-.56v-2c-3.2.7-3.88-1.37-3.88-1.37-.53-1.34-1.3-1.7-1.3-1.7-1.06-.72.08-.71.08-.71 1.17.08 1.79 1.2 1.79 1.2 1.04 1.79 2.73 1.27 3.4.97.1-.75.4-1.27.73-1.56-2.55-.29-5.24-1.28-5.24-5.7 0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.18 1.18a11 11 0 0 1 5.8 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.84 1.19 3.1 0 4.43-2.7 5.4-5.26 5.69.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.56A11.5 11.5 0 0 0 23.5 12 11.5 11.5 0 0 0 12 .5Z',
  linkedin: 'M20.45 20.45h-3.56v-5.57c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.47-.9 1.63-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13zM7.12 20.45H3.56V9h3.56zM22.22 0H1.77C.79 0 0 .78 0 1.73v20.54C0 23.22.79 24 1.77 24h20.45c.98 0 1.78-.78 1.78-1.73V1.73C24 .78 23.2 0 22.22 0z',
  mail: 'M2 4h20v16H2V4Zm2 2v.4l8 5 8-5V6H4Zm16 2.6-8 5-8-5V18h16V8.6Z',
  blog: 'M4 3h16v18l-8-4-8 4V3Zm2 2v11.8l6-3 6 3V5H6Z'
}
</script>

<template>
  <div class="portfolio">
    <!-- ── 헤더 ── -->
    <header class="pf-header">
      <img v-if="data.avatar" class="pf-avatar" :src="data.avatar" :alt="data.name" />
      <div class="pf-headtext">
        <h1 class="pf-name">{{ data.name }}</h1>
        <p class="pf-title">{{ data.title }}</p>
        <p class="pf-tagline">{{ data.tagline }}</p>
        <div class="pf-meta">
          <span v-if="data.location">📍 {{ data.location }}</span>
          <span v-if="data.email">✉️ <a :href="'mailto:' + data.email">{{ data.email }}</a></span>
        </div>
        <div class="pf-links">
          <a v-for="l in data.links" :key="l.url" class="pf-link" :href="l.url"
             :target="l.url.startsWith('http') ? '_blank' : undefined" rel="noopener">
            <svg v-if="icons[l.icon]" viewBox="0 0 24 24" width="16" height="16" aria-hidden="true">
              <path :d="icons[l.icon]" fill="currentColor" />
            </svg>
            <span>{{ l.label }}</span>
          </a>
        </div>
        <div class="pf-actions no-print">
          <a v-if="data.resumePdf" class="pf-btn pf-btn-brand" :href="data.resumePdf" target="_blank" rel="noopener">⬇ PDF 다운로드</a>
          <button class="pf-btn" type="button" @click="printPage">🖨 인쇄 / PDF로 저장</button>
        </div>
      </div>
    </header>

    <!-- ── About ── -->
    <section v-if="data.about" class="pf-section">
      <h2 class="pf-h2">About</h2>
      <p class="pf-about">{{ data.about }}</p>
    </section>

    <!-- ── Skills ── -->
    <section v-if="data.skills && data.skills.length" class="pf-section">
      <h2 class="pf-h2">Skills</h2>
      <div class="pf-skills">
        <div v-for="s in data.skills" :key="s.category" class="pf-skillgroup">
          <h3 class="pf-skillcat">{{ s.category }}</h3>
          <div class="pf-tags">
            <span v-for="it in s.items" :key="it" class="pf-tag">{{ it }}</span>
          </div>
        </div>
      </div>
    </section>

    <!-- ── Projects (한 줄 스니펫) ── -->
    <section v-if="data.projects && data.projects.length" class="pf-section">
      <h2 class="pf-h2">Projects</h2>
      <div v-for="g in groupedProjects" :key="g.cat" class="pf-projgroup">
        <h3 class="pf-projgrouptitle">{{ g.cat }}</h3>
        <div class="pf-projlist">
          <div v-for="it in g.items" :key="it.project.name" class="pf-projitem">
            <button type="button" class="pf-projrow" :class="{ 'is-open': isProjectOpen(it.idx) }"
                    :aria-expanded="isProjectOpen(it.idx)" @click="toggleProject(it.idx)">
              <span class="pf-projcaret" aria-hidden="true">▸</span>
              <span class="pf-projmain">
                <span class="pf-projname">{{ it.project.name }}</span>
                <span v-if="it.project.period" class="pf-projmeta"> · {{ it.project.period }}</span>
                <span v-if="it.project.role" class="pf-projmeta"> · {{ it.project.role }}</span>
              </span>
            </button>
            <div v-show="isProjectOpen(it.idx)" class="pf-projdetail">
              <p v-if="it.project.description" class="pf-desc">{{ it.project.description }}</p>
              <div v-if="it.project.tech && it.project.tech.length" class="pf-tags">
                <span v-for="t in it.project.tech" :key="t" class="pf-tag pf-tag-sm">{{ t }}</span>
              </div>
              <div v-if="it.project.links && it.project.links.length" class="pf-projlinks">
                <a v-for="ln in it.project.links" :key="ln.url" :href="ln.url"
                   :target="ln.url.startsWith('http') ? '_blank' : undefined" rel="noopener">{{ ln.label }} ↗</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ── Experience ── -->
    <section v-if="data.experience && data.experience.length" class="pf-section">
      <h2 class="pf-h2">Experience</h2>
      <div class="pf-timeline">
        <div v-for="(e, i) in data.experience" :key="i" class="pf-tl-item">
          <div class="pf-tl-head">
            <strong>{{ e.role }}</strong> · {{ e.org }}
            <span class="pf-period">{{ e.period }}</span>
          </div>
          <p v-if="e.description" class="pf-desc">{{ e.description }}</p>
        </div>
      </div>
    </section>

    <!-- ── Awards ── -->
    <section v-if="data.awards && data.awards.length" class="pf-section">
      <h2 class="pf-h2">Awards</h2>
      <div class="pf-timeline">
        <div v-for="(a, i) in data.awards" :key="i" class="pf-tl-item">
          <div class="pf-tl-head">
            <strong>{{ a.title }}</strong><template v-if="a.org"> · {{ a.org }}</template>
            <span class="pf-period">{{ a.date }}</span>
          </div>
          <p v-if="a.description" class="pf-desc">{{ a.description }}</p>
        </div>
      </div>
    </section>

    <!-- ── Certifications ── -->
    <section v-if="data.certifications && data.certifications.length" class="pf-section">
      <h2 class="pf-h2">Certifications</h2>
      <div class="pf-timeline">
        <div v-for="(c, i) in data.certifications" :key="i" class="pf-tl-item">
          <div class="pf-tl-head">
            <strong>{{ c.name }}</strong><template v-if="c.org"> · {{ c.org }}</template>
            <span class="pf-period">{{ c.date }}</span>
          </div>
          <p v-if="c.id" class="pf-desc">자격번호: {{ c.id }}</p>
        </div>
      </div>
    </section>

    <!-- ── Education ── -->
    <section v-if="data.education && data.education.length" class="pf-section">
      <h2 class="pf-h2">Education</h2>
      <div class="pf-timeline">
        <div v-for="(ed, i) in data.education" :key="i" class="pf-tl-item">
          <div class="pf-tl-head">
            <strong>{{ ed.org }}</strong>
            <span class="pf-period">{{ ed.period }}</span>
          </div>
          <p v-if="ed.degree" class="pf-desc">{{ ed.degree }}</p>
        </div>
      </div>
    </section>

  </div>
</template>

<style scoped>
.portfolio {
  max-width: 880px;
  margin: 0 auto;
  padding: 40px 24px 64px;
  color: var(--vp-c-text-1);
}

/* 헤더 */
.pf-header {
  display: flex;
  gap: 28px;
  align-items: center;
  padding-bottom: 28px;
  border-bottom: 1px solid var(--vp-c-divider);
}
.pf-avatar {
  width: 132px;
  height: 132px;
  border-radius: 50%;
  object-fit: cover;
  border: 3px solid var(--vp-c-brand-1);
  flex-shrink: 0;
}
.pf-name { font-size: 2rem; font-weight: 800; line-height: 1.2; margin: 0; }
.pf-title { font-size: 1.1rem; color: var(--vp-c-brand-1); font-weight: 600; margin: 4px 0 0; }
.pf-tagline { color: var(--vp-c-text-2); margin: 8px 0 0; }
.pf-meta { display: flex; flex-wrap: wrap; gap: 16px; margin-top: 10px; font-size: .9rem; color: var(--vp-c-text-2); }
.pf-meta a { color: inherit; }
.pf-links { display: flex; flex-wrap: wrap; gap: 10px; margin-top: 14px; }
.pf-link {
  display: inline-flex; align-items: center; gap: 6px;
  font-size: .85rem; font-weight: 500;
  padding: 5px 12px; border-radius: 20px;
  border: 1px solid var(--vp-c-divider);
  color: var(--vp-c-text-1); text-decoration: none;
  transition: border-color .2s, color .2s;
}
.pf-link:hover { border-color: var(--vp-c-brand-1); color: var(--vp-c-brand-1); }

/* 액션 버튼 */
.pf-actions { display: flex; gap: 10px; margin-top: 16px; }
.pf-btn {
  font-size: .88rem; font-weight: 600; cursor: pointer;
  padding: 8px 16px; border-radius: 8px;
  border: 1px solid var(--vp-c-divider); background: var(--vp-c-bg-soft);
  color: var(--vp-c-text-1); text-decoration: none;
}
.pf-btn:hover { border-color: var(--vp-c-brand-1); }
.pf-btn-brand { background: var(--vp-c-brand-3); border-color: var(--vp-c-brand-3); color: #fff; }
.pf-btn-brand:hover { background: var(--vp-c-brand-3); border-color: var(--vp-c-brand-3); color: #fff; opacity: .88; }

/* 섹션 */
.pf-section { margin-top: 36px; }
.pf-h2 {
  font-size: 1.35rem; font-weight: 700; margin: 0 0 16px;
  padding-bottom: 8px; border-bottom: 2px solid var(--vp-c-brand-1); display: inline-block;
}
.pf-about { line-height: 1.75; color: var(--vp-c-text-1); }

/* 스킬 */
.pf-skills { display: grid; grid-template-columns: repeat(auto-fill, minmax(240px, 1fr)); gap: 18px; }
.pf-skillcat { font-size: .95rem; font-weight: 700; margin: 0 0 8px; color: var(--vp-c-text-1); }
.pf-tags { display: flex; flex-wrap: wrap; gap: 8px; }
.pf-tag {
  font-size: .82rem; padding: 4px 10px; border-radius: 6px;
  background: var(--vp-c-brand-soft); color: var(--vp-c-brand-1); font-weight: 500;
}
.pf-tag-sm { background: var(--vp-c-default-soft); color: var(--vp-c-text-2); }

.pf-period { font-size: .8rem; color: var(--vp-c-text-3); white-space: nowrap; }
.pf-desc { font-size: .92rem; line-height: 1.65; color: var(--vp-c-text-2); margin: 6px 0; }

/* 프로젝트 — 카테고리 그룹(논문·연구실·개인) + 한 줄 스니펫 + 클릭 시 펼침 */
.pf-projgroup { margin-top: 18px; }
.pf-projgroup:first-of-type { margin-top: 0; }
.pf-projgrouptitle {
  font-size: .82rem; font-weight: 700; letter-spacing: .03em;
  color: var(--vp-c-brand-1); margin: 0 0 4px;
  text-transform: uppercase;
}
.pf-projlist { display: flex; flex-direction: column; }
.pf-projitem { border-bottom: 1px solid var(--vp-c-divider); }
.pf-projrow {
  display: flex; align-items: baseline; gap: 10px; width: 100%;
  padding: 10px 2px; margin: 0;
  background: none; border: none; cursor: pointer;
  text-align: left; color: inherit; font: inherit;
}
.pf-projrow:hover { background: var(--vp-c-bg-soft); }
.pf-projcaret { flex-shrink: 0; font-size: .75rem; color: var(--vp-c-text-3); transition: transform .18s ease; }
.pf-projrow.is-open .pf-projcaret { transform: rotate(90deg); }
.pf-projmain { min-width: 0; flex: 1; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.pf-projname { font-weight: 700; font-size: .96rem; color: var(--vp-c-text-1); }
.pf-projmeta { font-size: .84rem; color: var(--vp-c-text-3); }
.pf-projdetail { padding: 2px 2px 16px 24px; }
.pf-projlinks { display: flex; flex-wrap: wrap; gap: 14px; margin-top: 10px; }
.pf-projlinks a { font-size: .85rem; font-weight: 600; color: var(--vp-c-brand-1); text-decoration: none; }

/* 타임라인 */
.pf-timeline { display: flex; flex-direction: column; gap: 16px; }
.pf-tl-head { display: flex; flex-wrap: wrap; align-items: baseline; gap: 10px; }

@media (max-width: 640px) {
  .pf-header { flex-direction: column; text-align: center; }
  .pf-meta, .pf-links, .pf-actions { justify-content: center; }
}

/* ── 인쇄 / PDF ── */
@media print {
  .no-print { display: none !important; }
  .portfolio { max-width: 100%; padding: 0; color: #000; }
  .pf-tag, .pf-tag-sm { background: transparent !important; }
  .pf-section { break-inside: avoid; }
  .pf-projitem { break-inside: avoid; }
  .pf-projmain { white-space: normal; overflow: visible; } /* PDF 에선 프로젝트명·역할 전체 표시 */
  .pf-projcaret { display: none; }
  .pf-projdetail { display: block !important; } /* PDF 에선 모든 프로젝트 설명 펼쳐서 표시 */
  .pf-avatar { border-color: #888; }
  a { color: #000 !important; text-decoration: none; }
}
</style>
