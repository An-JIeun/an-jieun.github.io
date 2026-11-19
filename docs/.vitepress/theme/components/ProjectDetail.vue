<script setup>
import { computed } from 'vue'
import { useData, withBase } from 'vitepress'
import { useAdmin } from '../composables/useAdmin'
import { projectSlug, projectPath, orderedProjects } from '../projects.js'
import EditableText from './EditableText.vue'
import AdminBar from './AdminBar.vue'
import ImageCarousel from './ImageCarousel.vue'
import ProjectVideos from './ProjectVideos.vue'

// /projects/<slug>.html — 프로젝트 하나의 화면·데모 영상·설명을 보여주는 상세 페이지.
// 데이터는 홈과 같은 관리자 편집 스토어(content)를 쓰므로, 편집 모드에서 여기서도 바로 수정할 수 있다.
const { params } = useData()
const { content, isAdmin, markDirty } = useAdmin()

const order = computed(() => orderedProjects(content.projects))
const pos = computed(() => order.value.findIndex((it) => projectSlug(it.project, it.idx) === params.value?.slug))
const project = computed(() => (pos.value === -1 ? null : order.value[pos.value].project))
const prev = computed(() => (pos.value > 0 ? order.value[pos.value - 1] : null))
const next = computed(() => (pos.value !== -1 && pos.value < order.value.length - 1 ? order.value[pos.value + 1] : null))

const hrefOf = (it) => withBase(projectPath(it.project, it.idx))
const backHref = withBase('/#projects')

const list = (key) => (project.value && Array.isArray(project.value[key]) ? project.value[key] : [])
const hasImages = computed(() => list('images').length > 0)
const hasVideos = computed(() => list('videos').length > 0)
const hasText = computed(() => !!(project.value && (project.value.description || project.value.detail)))

function addTo(key, item) {
  if (!project.value) return
  if (!Array.isArray(project.value[key])) project.value[key] = []
  project.value[key].push(JSON.parse(JSON.stringify(item)))
  markDirty()
}
function removeFrom(arr, i) {
  if (typeof window !== 'undefined' && !window.confirm('이 항목을 삭제할까요?')) return
  arr.splice(i, 1)
  markDirty()
}
</script>

<template>
  <div class="pd">
    <AdminBar />

    <a class="pd-back" :href="backHref">← 포트폴리오로 돌아가기</a>

    <article v-if="project">
      <!-- ── 헤더 ── -->
      <header class="pd-header">
        <p class="pd-eyebrow">
          <EditableText :obj="project" field="category" inline placeholder="카테고리" />
          <template v-if="project.period || isAdmin">
            <span class="pd-dot" aria-hidden="true">·</span>
            <EditableText :obj="project" field="period" inline placeholder="기간" />
          </template>
        </p>
        <h1 class="pd-title"><EditableText :obj="project" field="name" inline placeholder="프로젝트명" /></h1>
        <p v-if="project.role || isAdmin" class="pd-role">
          <span class="pd-label">역할</span>
          <EditableText :obj="project" field="role" inline placeholder="역할" />
        </p>

        <div v-if="list('tech').length || isAdmin" class="pd-row">
          <span class="pd-label">기술</span>
          <div class="pd-tags">
            <span v-for="(t, ti) in project.tech" :key="ti" class="pd-tag">
              <EditableText :obj="project.tech" :field="ti" inline placeholder="기술" />
              <button v-if="isAdmin" class="pd-x no-print" type="button" title="삭제" @click="removeFrom(project.tech, ti)">×</button>
            </span>
            <button v-if="isAdmin" class="pd-add no-print" type="button" @click="addTo('tech', '기술')">＋</button>
          </div>
        </div>

        <div v-if="list('keywordSnippet').length || isAdmin" class="pd-row">
          <span class="pd-label">키워드</span>
          <div class="pd-tags">
            <span v-for="(k, ki) in project.keywordSnippet" :key="ki" class="pd-tag pd-tag--soft">
              <EditableText :obj="project.keywordSnippet" :field="ki" inline placeholder="키워드" />
              <button v-if="isAdmin" class="pd-x no-print" type="button" title="삭제" @click="removeFrom(project.keywordSnippet, ki)">×</button>
            </span>
            <button v-if="isAdmin" class="pd-add no-print" type="button" @click="addTo('keywordSnippet', '키워드')">＋</button>
          </div>
        </div>

        <div v-if="list('links').length || isAdmin" class="pd-links">
          <span v-for="(ln, li) in project.links" :key="li" class="pd-linkwrap">
            <a v-if="!isAdmin" class="pd-link" :href="ln.url"
               :target="String(ln.url).startsWith('http') ? '_blank' : undefined" rel="noopener">{{ ln.label }} ↗</a>
            <template v-else>
              <EditableText :obj="ln" field="label" inline placeholder="링크 이름" />
              <EditableText :obj="ln" field="url" inline placeholder="URL" />
              <button class="pd-x no-print" type="button" title="삭제" @click="removeFrom(project.links, li)">×</button>
            </template>
          </span>
          <button v-if="isAdmin" class="pd-add no-print" type="button" @click="addTo('links', { label: '링크', url: 'https://' })">＋ 링크</button>
        </div>
      </header>

      <!-- ── 프로젝트 화면 ── -->
      <section v-if="hasImages || isAdmin" class="pd-section">
        <h2 class="pd-h2">프로젝트 화면</h2>
        <ImageCarousel :owner="project" large />
      </section>

      <!-- ── 데모 영상 ── -->
      <section v-if="hasVideos || isAdmin" class="pd-section">
        <h2 class="pd-h2">데모 영상</h2>
        <ProjectVideos :owner="project" />
      </section>

      <!-- ── 설명 ── -->
      <section v-if="hasText || isAdmin" class="pd-section">
        <h2 class="pd-h2">설명</h2>
        <div class="pd-body">
          <EditableText :obj="project" field="description" rich placeholder="프로젝트 설명" />
        </div>
        <div v-if="project.detail || isAdmin" class="pd-body pd-body--detail">
          <EditableText :obj="project" field="detail" rich placeholder="상세 설명 (주요 기능 · 구조 · 배운 점 등, 선택)" />
        </div>
      </section>

      <!-- ── 이전 / 다음 프로젝트 ── -->
      <nav class="pd-pager no-print" aria-label="다른 프로젝트">
        <a v-if="prev" class="pd-pager-link" :href="hrefOf(prev)">
          <span class="pd-pager-dir">← 이전 프로젝트</span>
          <span class="pd-pager-name">{{ prev.project.name }}</span>
        </a>
        <span v-else></span>
        <a v-if="next" class="pd-pager-link pd-pager-link--next" :href="hrefOf(next)">
          <span class="pd-pager-dir">다음 프로젝트 →</span>
          <span class="pd-pager-name">{{ next.project.name }}</span>
        </a>
      </nav>
    </article>

    <div v-else class="pd-missing">
      <p>프로젝트를 찾을 수 없습니다.</p>
      <a :href="backHref">프로젝트 목록 보기 →</a>
    </div>
  </div>
</template>

<style scoped>
.pd {
  max-width: 880px;
  margin: 0 auto;
  padding: 32px 24px 72px;
  color: var(--vp-c-text-1);
}

.pd-back {
  display: inline-block;
  font-size: 0.86rem;
  font-weight: 600;
  color: var(--vp-c-text-2);
  text-decoration: none;
}
.pd-back:hover { color: var(--vp-c-brand-1); }

/* 헤더 */
.pd-header {
  margin-top: 22px;
  padding-bottom: 26px;
  border-bottom: 1px solid var(--vp-c-divider);
}
.pd-eyebrow {
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  gap: 6px;
  margin: 0;
  font-size: 0.8rem;
  font-weight: 700;
  letter-spacing: 0.03em;
  color: var(--vp-c-text-3);
}
.pd-title {
  margin: 8px 0 0;
  font-size: 2.1rem;
  font-weight: 800;
  line-height: 1.25;
  letter-spacing: -0.01em;
  text-wrap: balance;
}
.pd-role {
  margin: 14px 0 0;
  font-size: 0.95rem;
  color: var(--vp-c-text-2);
}
.pd-label {
  display: inline-block;
  min-width: 52px;
  margin-right: 8px;
  font-size: 0.76rem;
  font-weight: 700;
  color: var(--vp-c-text-3);
}
.pd-row {
  display: flex;
  align-items: baseline;
  margin-top: 12px;
}
.pd-row .pd-label { flex-shrink: 0; }
.pd-tags { display: flex; flex-wrap: wrap; align-items: center; gap: 8px; }
.pd-tag {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  font-size: 0.82rem;
  font-weight: 500;
  padding: 4px 10px;
  border-radius: 6px;
  background: var(--vp-c-brand-soft);
  color: var(--vp-c-brand-1);
}
.pd-tag--soft { background: var(--vp-c-default-soft); color: var(--vp-c-text-2); }

.pd-links { display: flex; flex-wrap: wrap; align-items: center; gap: 10px; margin-top: 18px; }
.pd-linkwrap { display: inline-flex; align-items: center; gap: 6px; }
.pd-link {
  display: inline-flex;
  align-items: center;
  font-size: 0.85rem;
  font-weight: 600;
  padding: 6px 14px;
  border-radius: 20px;
  border: 1px solid var(--vp-c-divider);
  color: var(--vp-c-text-1);
  text-decoration: none;
  transition: border-color 0.2s, color 0.2s;
}
.pd-link:hover { border-color: var(--vp-c-brand-1); color: var(--vp-c-brand-1); }

/* 섹션 */
.pd-section { margin-top: 40px; }
.pd-h2 {
  display: inline-block;
  margin: 0 0 16px;
  padding-bottom: 8px;
  font-size: 1.3rem;
  font-weight: 700;
  border-bottom: 2px solid var(--vp-c-brand-1);
}
.pd-body {
  font-size: 1rem;
  line-height: 1.85;
  color: var(--vp-c-text-1);
}
.pd-body--detail { margin-top: 14px; }

/* 이전 / 다음 */
.pd-pager {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 14px;
  margin-top: 56px;
  padding-top: 24px;
  border-top: 1px solid var(--vp-c-divider);
}
.pd-pager-link {
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 14px 16px;
  border-radius: 12px;
  border: 1px solid var(--vp-c-divider);
  text-decoration: none;
  color: inherit;
  transition: border-color 0.2s, background 0.2s;
}
.pd-pager-link:hover { border-color: var(--vp-c-brand-1); background: var(--vp-c-bg-soft); }
.pd-pager-link--next { text-align: right; }
.pd-pager-dir { font-size: 0.76rem; font-weight: 600; color: var(--vp-c-text-3); }
.pd-pager-name { font-size: 0.92rem; font-weight: 700; color: var(--vp-c-text-1); }

.pd-missing { margin-top: 40px; color: var(--vp-c-text-2); }
.pd-missing a { font-weight: 600; color: var(--vp-c-brand-1); }

/* 관리자 편집용 추가/삭제 버튼 */
.pd-add {
  font-size: 0.78rem;
  font-weight: 600;
  cursor: pointer;
  padding: 3px 9px;
  border-radius: 6px;
  border: 1px dashed var(--vp-c-brand-1);
  background: transparent;
  color: var(--vp-c-brand-1);
}
.pd-add:hover { background: var(--vp-c-brand-soft); }
.pd-x {
  width: 16px;
  height: 16px;
  padding: 0;
  border-radius: 50%;
  border: 1px solid var(--vp-c-divider);
  background: transparent;
  color: var(--vp-c-text-3);
  font-size: 0.78rem;
  line-height: 1;
  cursor: pointer;
}
.pd-x:hover { border-color: #e11d48; color: #e11d48; }

@media (max-width: 640px) {
  .pd { padding: 20px 16px 56px; }
  .pd-title { font-size: 1.65rem; }
  .pd-row { flex-direction: column; gap: 6px; }
  .pd-pager { grid-template-columns: 1fr; }
  .pd-pager-link--next { text-align: left; }
}

@media print {
  .no-print { display: none !important; }
  .pd { max-width: 100%; padding: 0; }
  .pd-back { display: none; }
}
</style>
