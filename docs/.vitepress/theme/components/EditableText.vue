<script setup>
import { ref, computed, onMounted, watch, nextTick } from 'vue'
import { useAdmin } from '../composables/useAdmin'

const props = defineProps({
  // 값을 담고 있는 부모 객체와 키 (예: obj=content, field="about")
  obj: { type: [Object, Array], required: true },
  field: { type: [String, Number], required: true },
  // rich=true 면 서식 툴바(굵게/색상 등) 제공, false 면 단순 텍스트
  rich: { type: Boolean, default: false },
  // 한 줄짜리(span)로 렌더할지 여부 (제목·기간 등)
  inline: { type: Boolean, default: false },
  placeholder: { type: String, default: '내용 입력…' },
})

const { isAdmin, revision, markDirty } = useAdmin()

const editorRef = ref(null)
const focused = ref(false)

const value = computed(() => {
  const v = props.obj?.[props.field]
  return v == null ? '' : String(v)
})

// contenteditable DOM 을 현재 값으로 동기화 (편집 중이 아닐 때만)
function syncFromValue() {
  const el = editorRef.value
  if (!el || focused.value) return
  const v = value.value
  if (props.rich) {
    if (el.innerHTML !== v) el.innerHTML = v
  } else {
    if (el.textContent !== v) el.textContent = v
  }
}

onMounted(() => nextTick(syncFromValue))
// 되돌리기/불러오기 등으로 값이 통째로 바뀌면 다시 동기화
watch(revision, () => nextTick(syncFromValue))
// 로그인/로그아웃으로 에디터가 새로 마운트될 때도 반영
watch(isAdmin, () => nextTick(syncFromValue))
// 항목 추가/삭제로 배열 인덱스가 밀려 값이 바뀌면 다시 그린다.
// (편집 중이 아닐 때만 — 타이핑 중 커서가 튀지 않도록)
watch(value, () => {
  if (!focused.value) nextTick(syncFromValue)
})

// DOM → 데이터 반영
function writeBack() {
  const el = editorRef.value
  if (!el) return
  props.obj[props.field] = props.rich ? el.innerHTML : el.textContent
  markDirty()
}

function onInput() {
  writeBack()
}

function onFocus() {
  focused.value = true
}

function onBlur() {
  writeBack()
  focused.value = false
}

// 단순 필드는 줄바꿈 방지
function onPlainKeydown(e) {
  if (!props.rich && e.key === 'Enter') {
    e.preventDefault()
    editorRef.value?.blur()
  }
}

// ── 서식 명령 (rich 전용) ──
function exec(command, arg = null) {
  if (typeof document === 'undefined') return
  editorRef.value?.focus()
  document.execCommand(command, false, arg)
  writeBack()
}

function setLink() {
  if (typeof window === 'undefined') return
  const url = window.prompt('링크 주소(URL)를 입력하세요', 'https://')
  if (url) exec('createLink', url)
}

const swatches = ['#e11d48', '#2563eb', '#16a34a', '#d97706', '#111827']
</script>

<template>
  <!-- ── 관리자: 편집 가능 ── -->
  <template v-if="isAdmin">
    <span v-if="rich" class="et-wrap et-wrap--rich">
      <span v-show="focused" class="et-toolbar no-print" @mousedown.prevent>
        <button type="button" title="굵게" @click="exec('bold')"><b>B</b></button>
        <button type="button" title="기울임" @click="exec('italic')"><i>I</i></button>
        <button type="button" title="밑줄" @click="exec('underline')"><u>U</u></button>
        <button type="button" title="취소선" @click="exec('strikeThrough')"><s>S</s></button>
        <span class="et-sep"></span>
        <button type="button" title="글자 크게" @click="exec('fontSize', '5')">A<small>+</small></button>
        <button type="button" title="글자 작게" @click="exec('fontSize', '2')">A<small>−</small></button>
        <span class="et-sep"></span>
        <button
          v-for="c in swatches"
          :key="c"
          type="button"
          class="et-color"
          :style="{ background: c }"
          title="글자 색"
          @click="exec('foreColor', c)"
        ></button>
        <span class="et-sep"></span>
        <button type="button" title="글머리 목록" @click="exec('insertUnorderedList')">•≡</button>
        <button type="button" title="링크" @click="setLink">🔗</button>
        <button type="button" title="서식 지우기" @click="exec('removeFormat')">⌫</button>
      </span>
      <span
        ref="editorRef"
        class="et-editor et-editor--rich"
        contenteditable="true"
        spellcheck="false"
        :data-ph="placeholder"
        @focus="onFocus"
        @blur="onBlur"
        @input="onInput"
      ></span>
    </span>
    <component
      :is="inline ? 'span' : 'div'"
      v-else
      ref="editorRef"
      class="et-editor et-editor--plain"
      :class="{ 'et-inline': inline }"
      contenteditable="true"
      spellcheck="false"
      :data-ph="placeholder"
      @focus="onFocus"
      @blur="onBlur"
      @input="onInput"
      @keydown="onPlainKeydown"
    ></component>
  </template>

  <!-- ── 방문자: 정적 표시 ── -->
  <template v-else>
    <span v-if="rich" class="et-view" v-html="value"></span>
    <span v-else>{{ value }}</span>
  </template>
</template>

<style scoped>
.et-wrap--rich {
  display: block;
  position: relative;
}
.et-editor {
  outline: none;
  border-radius: 6px;
  transition: box-shadow 0.15s, background 0.15s;
}
/* 편집 가능 영역임을 은은하게 표시 */
.et-editor {
  box-shadow: inset 0 0 0 1px var(--vp-c-divider);
  padding: 2px 6px;
  cursor: text;
}
.et-editor--plain.et-inline {
  display: inline-block;
  min-width: 2em;
}
.et-editor--rich {
  display: block;
  min-height: 1.6em;
  line-height: inherit;
}
.et-editor:hover {
  background: var(--vp-c-bg-soft);
}
.et-editor:focus {
  box-shadow: inset 0 0 0 2px var(--vp-c-brand-1);
  background: var(--vp-c-bg);
}
/* 빈 값일 때 placeholder */
.et-editor:empty::before {
  content: attr(data-ph);
  color: var(--vp-c-text-3);
  opacity: 0.7;
}

/* 서식 툴바 */
.et-toolbar {
  position: absolute;
  bottom: 100%;
  left: 0;
  z-index: 30;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 2px;
  margin-bottom: 6px;
  padding: 4px 6px;
  border-radius: 8px;
  background: var(--vp-c-bg-elv, var(--vp-c-bg));
  border: 1px solid var(--vp-c-divider);
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.16);
}
.et-toolbar button {
  min-width: 26px;
  height: 26px;
  padding: 0 6px;
  font-size: 0.82rem;
  line-height: 1;
  color: var(--vp-c-text-1);
  background: transparent;
  border: 1px solid transparent;
  border-radius: 5px;
  cursor: pointer;
}
.et-toolbar button:hover {
  background: var(--vp-c-default-soft);
  border-color: var(--vp-c-divider);
}
.et-toolbar button small {
  font-size: 0.7em;
}
.et-toolbar .et-sep {
  width: 1px;
  height: 18px;
  margin: 0 3px;
  background: var(--vp-c-divider);
}
.et-toolbar .et-color {
  width: 18px;
  min-width: 18px;
  height: 18px;
  padding: 0;
  border-radius: 50%;
  border: 1px solid rgba(0, 0, 0, 0.15);
}

@media print {
  .et-editor {
    box-shadow: none !important;
    padding: 0 !important;
    background: transparent !important;
  }
}
</style>
