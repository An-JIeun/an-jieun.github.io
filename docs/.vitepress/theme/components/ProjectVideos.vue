<script setup>
import { computed } from 'vue'
import { withBase } from 'vitepress'
import { useAdmin } from '../composables/useAdmin'
import { videoEmbed } from '../projects.js'
import EditableText from './EditableText.vue'

// 프로젝트의 데모 영상 목록 — owner.videos = [{ url, caption }]
//   url: YouTube / Vimeo / Google Drive 링크, 또는 docs/public 에 둔 파일 경로(/static/video/demo.mp4)
const props = defineProps({
  owner: { type: Object, required: true },
})

const { isAdmin, markDirty } = useAdmin()

const items = computed(() => {
  const list = Array.isArray(props.owner.videos) ? props.owner.videos : []
  return list.map((v) => {
    const embed = videoEmbed(v && v.url)
    if (embed && embed.type === 'video' && embed.src.startsWith('/')) embed.src = withBase(embed.src)
    return { v, embed }
  })
})

function addByUrl() {
  if (typeof window === 'undefined') return
  const url = window.prompt(
    '데모 영상 주소를 입력하세요\n· YouTube / Vimeo / Google Drive 공유 링크\n· 또는 docs/public 에 넣은 파일 경로 (예: /static/video/demo.mp4)',
    'https://'
  )
  if (!url || !url.trim() || url.trim() === 'https://') return
  if (!Array.isArray(props.owner.videos)) props.owner.videos = []
  props.owner.videos.push({ url: url.trim(), caption: '' })
  markDirty()
}

function remove(i) {
  if (typeof window !== 'undefined' && !window.confirm('이 영상을 삭제할까요?')) return
  props.owner.videos.splice(i, 1)
  markDirty()
}
</script>

<template>
  <div v-if="items.length || isAdmin" class="pv">
    <figure v-for="(it, i) in items" :key="i" class="pv-item">
      <div class="pv-frame">
        <iframe
          v-if="it.embed && it.embed.type === 'iframe'"
          :src="it.embed.src"
          :title="it.v.caption || '데모 영상'"
          loading="lazy"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerpolicy="strict-origin-when-cross-origin"
          allowfullscreen
        ></iframe>
        <video v-else-if="it.embed" :src="it.embed.src" controls preload="metadata" playsinline></video>
        <div v-else class="pv-empty">영상 주소가 비어 있습니다</div>
        <button v-if="isAdmin" class="pv-del no-print" type="button" title="이 영상 삭제" @click="remove(i)">🗑</button>
      </div>
      <figcaption v-if="it.v.caption || isAdmin" class="pv-caption">
        <EditableText v-if="isAdmin" :obj="it.v" field="caption" inline placeholder="영상 설명(선택)" />
        <span v-else>{{ it.v.caption }}</span>
      </figcaption>
      <div v-if="isAdmin" class="pv-url no-print">
        URL: <EditableText :obj="it.v" field="url" inline placeholder="영상 주소" />
      </div>
    </figure>

    <div v-if="isAdmin" class="pv-tools no-print">
      <button class="pv-btn" type="button" @click="addByUrl">＋ 영상 추가 (URL)</button>
    </div>
  </div>
</template>

<style scoped>
.pv { display: flex; flex-direction: column; gap: 22px; }
.pv-item { margin: 0; }
.pv-frame {
  position: relative;
  aspect-ratio: 16 / 9;
  border-radius: 12px;
  overflow: hidden;
  background: #000;
  border: 1px solid var(--vp-c-divider);
}
.pv-frame iframe,
.pv-frame video {
  display: block;
  width: 100%;
  height: 100%;
  border: 0;
  object-fit: contain;
}
.pv-empty {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  color: #9ca3af;
  font-size: 0.85rem;
}
.pv-del {
  position: absolute;
  top: 10px;
  right: 10px;
  width: 32px;
  height: 32px;
  border-radius: 8px;
  border: none;
  background: rgba(0, 0, 0, 0.55);
  color: #fff;
  cursor: pointer;
}
.pv-del:hover { background: #e11d48; }
.pv-caption {
  margin-top: 8px;
  font-size: 0.85rem;
  color: var(--vp-c-text-3);
  text-align: center;
}
.pv-url {
  margin-top: 4px;
  font-size: 0.75rem;
  color: var(--vp-c-text-3);
  word-break: break-all;
}
.pv-tools { display: flex; justify-content: center; }
.pv-btn {
  font-size: 0.8rem;
  font-weight: 600;
  cursor: pointer;
  padding: 5px 12px;
  border-radius: 8px;
  border: 1px dashed var(--vp-c-brand-1);
  background: transparent;
  color: var(--vp-c-brand-1);
}
.pv-btn:hover { background: var(--vp-c-brand-soft); }
</style>
