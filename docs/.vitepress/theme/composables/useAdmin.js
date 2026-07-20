// ────────────────────────────────────────────────────────────────
// 관리자 편집 모드 스토어 (싱글턴)
//
// 정적 사이트(VitePress → GitHub Pages)에는 백엔드가 없으므로,
// 편집 내용은 이 브라우저(localStorage)에만 저장됩니다.
// 사이트에 영구 반영하려면 [JSON 내보내기]로 받은 portfolio.json 을
//   docs/.vitepress/data/portfolio.json
// 에 덮어쓰고 커밋/푸시하세요.
// ────────────────────────────────────────────────────────────────
import { reactive, ref } from 'vue'
import base from '../../data/portfolio.json'

// ⚠️ 정적 사이트라 이 비밀번호는 빌드된 소스에 노출됩니다.
//    실제 보안이 아니라 '실수로 편집되는 것을 막는 잠금'입니다.
//    아래 문자열만 원하는 비밀번호로 바꾸면 됩니다.
const ADMIN_PASSWORD = 'jieun2026'

const STORAGE_KEY = 'pf-admin-content-v1'
const AUTH_KEY = 'pf-admin-auth-v1'

function deepClone(o) {
  return JSON.parse(JSON.stringify(o))
}

// reactive 객체를 src 내용으로 통째로 교체 (키 삭제 후 재할당)
function applyObject(target, src) {
  Object.keys(target).forEach((k) => delete target[k])
  Object.assign(target, deepClone(src))
}

// ── 공유 상태 (모듈 싱글턴) ──
const content = reactive(deepClone(base)) // 화면에 렌더되는 실제 데이터
const isAdmin = ref(false)
const dirty = ref(false) // 저장(내보내기) 안 된 변경이 있는지
const revision = ref(0) // 외부에서 content 를 통째로 바꿨을 때 에디터 재동기화 트리거

let initialized = false
let persistTimer = null

function persist() {
  if (typeof window === 'undefined') return
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(content))
  } catch (e) {
    // 용량 초과(주로 큰 이미지) — 세션 편집본은 유지되고 내보내기는 가능하지만
    // 새로고침 후 복원은 안 될 수 있음을 알린다.
    console.warn('[admin] 브라우저 저장 용량 초과 — 큰 이미지는 docs/public 에 넣고 URL로 추가하는 것을 권장합니다.', e)
  }
}

// 편집이 일어날 때 호출 — 변경 표시 + 디바운스 저장
function markDirty() {
  dirty.value = true
  if (typeof window === 'undefined') return
  clearTimeout(persistTimer)
  persistTimer = setTimeout(persist, 400)
}

// 최초 마운트 시 1회: 저장된 편집본 + 로그인 상태 복원
function initAdmin() {
  if (initialized || typeof window === 'undefined') return
  initialized = true
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) {
      applyObject(content, JSON.parse(raw))
      // 저장본에 없던 새 항목(예: papers)은 원본에서 보강 — 스키마가 늘어나도 안전
      Object.keys(base).forEach((k) => {
        if (content[k] === undefined) content[k] = deepClone(base[k])
      })
    }
    if (localStorage.getItem(AUTH_KEY) === '1') isAdmin.value = true
  } catch (e) {
    /* 손상된 데이터는 무시하고 기본값 사용 */
  }
  revision.value++ // 에디터들에게 "값이 바뀌었으니 다시 그려" 신호
}

function login(password) {
  if (password === ADMIN_PASSWORD) {
    isAdmin.value = true
    try {
      localStorage.setItem(AUTH_KEY, '1')
    } catch (e) {}
    return true
  }
  return false
}

function logout() {
  isAdmin.value = false
  try {
    localStorage.removeItem(AUTH_KEY)
  } catch (e) {}
}

// 편집본을 원본(portfolio.json)으로 되돌리기
function resetContent() {
  applyObject(content, base)
  try {
    localStorage.removeItem(STORAGE_KEY)
  } catch (e) {}
  dirty.value = false
  revision.value++
}

// 현재 편집본을 portfolio.json 으로 다운로드
function exportJson() {
  if (typeof window === 'undefined') return
  const json = JSON.stringify(content, null, 2) + '\n'
  const blob = new Blob([json], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = 'portfolio.json'
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  URL.revokeObjectURL(url)
  dirty.value = false
}

export function useAdmin() {
  return {
    content,
    isAdmin,
    dirty,
    revision,
    initAdmin,
    login,
    logout,
    resetContent,
    exportJson,
    markDirty,
  }
}
