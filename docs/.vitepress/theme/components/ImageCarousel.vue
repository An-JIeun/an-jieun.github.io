<script setup>
import { ref, computed, watch, onBeforeUnmount } from 'vue'
import { useAdmin } from '../composables/useAdmin'
import EditableText from './EditableText.vue'

const props = defineProps({
  owner: { type: Object, required: true }, // 이미지 배열을 가진 객체(프로젝트)
  field: { type: String, default: 'images' },
  large: { type: Boolean, default: false }, // 상세 페이지용 큰 화면
})

const { isAdmin, markDirty } = useAdmin()

const idx = ref(0)
const images = computed(() => (Array.isArray(props.owner[props.field]) ? props.owner[props.field] : []))

// 이미지 수가 바뀌면 인덱스 보정
watch(() => images.value.length, (n) => {
  if (idx.value >= n) idx.value = Math.max(0, n - 1)
})

function ensure() {
  if (!Array.isArray(props.owner[props.field])) props.owner[props.field] = []
  return props.owner[props.field]
}

function addByUrl() {
  if (typeof window === 'undefined') return
  const url = window.prompt('이미지 주소(URL)를 입력하세요', 'https://')
  if (url && url !== 'https://') {
    ensure().push({ src: url, caption: '' })
    idx.value = images.value.length - 1
    markDirty()
  }
}

function onFile(e) {
  const file = e.target.files && e.target.files[0]
  if (!file) return
  // 너무 큰 파일은 localStorage 용량을 넘길 수 있어 안내
  if (file.size > 2 * 1024 * 1024 && typeof window !== 'undefined') {
    if (!window.confirm('2MB가 넘는 이미지는 브라우저 저장 용량을 초과할 수 있습니다. 그래도 추가할까요?\n(권장: 이미지를 docs/public 에 넣고 URL로 추가)')) {
      e.target.value = ''
      return
    }
  }
  const reader = new FileReader()
  reader.onload = () => {
    ensure().push({ src: String(reader.result), caption: '' })
    idx.value = images.value.length - 1
    markDirty()
  }
  reader.readAsDataURL(file)
  e.target.value = ''
}

function removeCurrent() {
  if (typeof window !== 'undefined' && !window.confirm('이 사진을 삭제할까요?')) return
  const arr = ensure()
  arr.splice(idx.value, 1)
  if (idx.value >= arr.length) idx.value = Math.max(0, arr.length - 1)
  markDirty()
}

function prev() {
  const n = images.value.length
  if (n) idx.value = (idx.value - 1 + n) % n
}
function next() {
  const n = images.value.length
  if (n) idx.value = (idx.value + 1) % n
}
function go(i) {
  idx.value = i
}

// ── 크게 보기(라이트박스) ──
const zoomed = ref(false)
function onZoomKey(e) {
  if (e.key === 'Escape') closeZoom()
  else if (e.key === 'ArrowLeft') prev()
  else if (e.key === 'ArrowRight') next()
}
function openZoom() {
  if (typeof window === 'undefined') return
  zoomed.value = true
  window.addEventListener('keydown', onZoomKey)
}
function closeZoom() {
  zoomed.value = false
  if (typeof window !== 'undefined') window.removeEventListener('keydown', onZoomKey)
}
onBeforeUnmount(closeZoom)
</script>

<template>
  <div v-if="images.length || isAdmin" class="ic" :class="{ 'ic--lg': large }">
    <div v-if="images.length" class="ic-stage">
      <button v-if="images.length > 1" class="ic-nav ic-prev no-print" type="button" aria-label="이전" @click="prev">‹</button>
      <img class="ic-img" :src="images[idx].src" :alt="images[idx].caption || ''"
           title="클릭하면 크게 볼 수 있습니다" @click="openZoom" />
      <button v-if="images.length > 1" class="ic-nav ic-next no-print" type="button" aria-label="다음" @click="next">›</button>
      <button v-if="isAdmin" class="ic-del no-print" type="button" title="이 사진 삭제" @click="removeCurrent">🗑</button>
      <span v-if="images.length > 1" class="ic-count no-print">{{ idx + 1 }} / {{ images.length }}</span>
    </div>

    <div v-if="images.length" class="ic-caption">
      <EditableText v-if="isAdmin" :obj="images[idx]" field="caption" inline placeholder="사진 설명(선택)" />
      <span v-else-if="images[idx].caption">{{ images[idx].caption }}</span>
    </div>

    <div v-if="images.length > 1" class="ic-dots no-print">
      <button v-for="(im, i) in images" :key="i" class="ic-dot" :class="{ 'is-on': i === idx }"
              type="button" :aria-label="`${i + 1}번째 사진`" @click="go(i)"></button>
    </div>

    <div v-if="isAdmin" class="ic-tools no-print">
      <label class="ic-btn">
        ＋ 사진 업로드
        <input type="file" accept="image/*" hidden @change="onFile" />
      </label>
      <button class="ic-btn" type="button" @click="addByUrl">URL로 추가</button>
    </div>

    <Teleport v-if="zoomed && images.length" to="body">
      <div class="ic-lightbox" role="dialog" aria-modal="true" aria-label="사진 크게 보기" @click.self="closeZoom">
        <button class="ic-lb-close" type="button" aria-label="닫기" @click="closeZoom">×</button>
        <button v-if="images.length > 1" class="ic-nav ic-prev" type="button" aria-label="이전" @click="prev">‹</button>
        <img class="ic-lb-img" :src="images[idx].src" :alt="images[idx].caption || ''" @click="closeZoom" />
        <button v-if="images.length > 1" class="ic-nav ic-next" type="button" aria-label="다음" @click="next">›</button>
        <span v-if="images[idx].caption || images.length > 1" class="ic-lb-caption">
          {{ images[idx].caption }}<template v-if="images.length > 1"> ({{ idx + 1 }} / {{ images.length }})</template>
        </span>
      </div>
    </Teleport>
  </div>
</template>

<style scoped>
.ic { margin: 12px 0 4px; }
.ic-stage {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  border-radius: 10px;
  overflow: hidden;
}
.ic-img {
  display: block;
  max-width: 100%;
  max-height: 340px;
  object-fit: contain;
  cursor: zoom-in;
}
.ic--lg .ic-stage { min-height: 240px; border-radius: 12px; }
.ic--lg .ic-img { max-height: min(560px, 70vh); }

/* 라이트박스 */
.ic-lightbox {
  position: fixed;
  inset: 0;
  z-index: 200;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 48px 64px;
  background: rgba(0, 0, 0, 0.86);
}
/* 작은 스크린샷도 화면에 맞춰 키워서 보여준다 */
.ic-lb-img {
  width: 100%;
  height: 100%;
  object-fit: contain;
  cursor: zoom-out;
}
.ic-lightbox .ic-nav { width: 44px; height: 44px; font-size: 1.6rem; background: rgba(255, 255, 255, 0.14); }
.ic-lightbox .ic-nav:hover { background: rgba(255, 255, 255, 0.28); }
.ic-lightbox .ic-prev { left: 12px; }
.ic-lightbox .ic-next { right: 12px; }
.ic-lb-close {
  position: absolute;
  top: 10px;
  right: 14px;
  width: 40px;
  height: 40px;
  border: none;
  background: transparent;
  color: #fff;
  font-size: 2rem;
  line-height: 1;
  cursor: pointer;
}
.ic-lb-caption {
  position: absolute;
  bottom: 14px;
  left: 0;
  right: 0;
  text-align: center;
  color: rgba(255, 255, 255, 0.82);
  font-size: 0.85rem;
}
@media (max-width: 640px) {
  .ic-lightbox { padding: 56px 8px; }
}
.ic-nav {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 34px;
  height: 34px;
  border-radius: 50%;
  border: none;
  background: rgba(0, 0, 0, 0.42);
  color: #fff;
  font-size: 1.3rem;
  line-height: 1;
  cursor: pointer;
}
.ic-nav:hover { background: rgba(0, 0, 0, 0.62); }
.ic-prev { left: 8px; }
.ic-next { right: 8px; }
.ic-del {
  position: absolute;
  top: 8px;
  right: 8px;
  width: 30px;
  height: 30px;
  border-radius: 8px;
  border: none;
  background: rgba(0, 0, 0, 0.42);
  color: #fff;
  cursor: pointer;
  font-size: 0.9rem;
}
.ic-del:hover { background: #e11d48; }
.ic-count {
  position: absolute;
  bottom: 8px;
  right: 10px;
  padding: 2px 8px;
  border-radius: 10px;
  background: rgba(0, 0, 0, 0.42);
  color: #fff;
  font-size: 0.72rem;
}
.ic-caption {
  margin-top: 6px;
  font-size: 0.82rem;
  color: var(--vp-c-text-3);
  text-align: center;
}
.ic-dots {
  display: flex;
  justify-content: center;
  gap: 6px;
  margin-top: 8px;
}
.ic-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  border: none;
  padding: 0;
  cursor: pointer;
  background: var(--vp-c-divider);
}
.ic-dot.is-on { background: var(--vp-c-brand-1); }
.ic-tools {
  display: flex;
  gap: 8px;
  justify-content: center;
  margin-top: 10px;
}
.ic-btn {
  display: inline-flex;
  align-items: center;
  font-size: 0.8rem;
  font-weight: 600;
  cursor: pointer;
  padding: 5px 12px;
  border-radius: 8px;
  border: 1px dashed var(--vp-c-brand-1);
  background: transparent;
  color: var(--vp-c-brand-1);
}
.ic-btn:hover { background: var(--vp-c-brand-soft); }

@media print {
  .ic-img { max-height: 260px; }
}
</style>
