<script setup>
import { ref, onMounted } from 'vue'
import { useAdmin } from '../composables/useAdmin'

const { isAdmin, dirty, initAdmin, login, logout, resetContent, exportJson } = useAdmin()

const showLogin = ref(false)
const password = ref('')
const error = ref('')

onMounted(initAdmin)

function submitLogin() {
  if (login(password.value)) {
    showLogin.value = false
    password.value = ''
    error.value = ''
  } else {
    error.value = '비밀번호가 올바르지 않습니다.'
  }
}

function onLogout() {
  logout()
  showLogin.value = false
}

function onReset() {
  if (typeof window !== 'undefined' && window.confirm('편집 내용을 모두 버리고 원본으로 되돌릴까요?')) {
    resetContent()
  }
}
</script>

<template>
  <div class="admin-bar no-print">
    <!-- 로그인 전: 잠금 버튼 -->
    <template v-if="!isAdmin">
      <div v-if="showLogin" class="ab-login">
        <div class="ab-login-title">🔒 관리자 로그인</div>
        <input
          v-model="password"
          type="password"
          class="ab-input"
          placeholder="비밀번호"
          autofocus
          @keydown.enter="submitLogin"
        />
        <p v-if="error" class="ab-error">{{ error }}</p>
        <div class="ab-login-actions">
          <button class="ab-btn ab-btn-brand" type="button" @click="submitLogin">로그인</button>
          <button class="ab-btn" type="button" @click="showLogin = false">취소</button>
        </div>
      </div>
      <button v-else class="ab-fab" type="button" title="관리자 로그인" @click="showLogin = true">
        🔒
      </button>
    </template>

    <!-- 로그인 후: 편집 컨트롤 -->
    <div v-else class="ab-panel">
      <div class="ab-status">
        <span class="ab-dot"></span>
        <strong>편집 모드</strong>
        <span class="ab-hint">{{ dirty ? '● 저장 안 된 변경 있음' : '자동 저장됨' }}</span>
      </div>
      <div class="ab-actions">
        <button class="ab-btn ab-btn-brand" type="button" @click="exportJson">⬇ JSON 내보내기</button>
        <button class="ab-btn" type="button" @click="onReset">↺ 되돌리기</button>
        <button class="ab-btn" type="button" @click="onLogout">로그아웃</button>
      </div>
      <p class="ab-note">
        내용을 클릭해 바로 수정하세요. 문단 필드는 선택하면 서식 툴바가 나타납니다.<br />
        사이트에 영구 반영하려면 <b>JSON 내보내기</b> → <code>docs/.vitepress/data/portfolio.json</code> 교체 후 커밋하세요.
      </p>
    </div>
  </div>
</template>

<style scoped>
.admin-bar {
  position: fixed;
  right: 20px;
  bottom: 20px;
  z-index: 50;
}

/* 잠금 FAB */
.ab-fab {
  width: 46px;
  height: 46px;
  border-radius: 50%;
  font-size: 1.15rem;
  cursor: pointer;
  background: var(--vp-c-bg-elv, var(--vp-c-bg));
  border: 1px solid var(--vp-c-divider);
  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.18);
  opacity: 0.55;
  transition: opacity 0.2s, transform 0.2s;
}
.ab-fab:hover {
  opacity: 1;
  transform: translateY(-2px);
}

/* 로그인 팝오버 */
.ab-login,
.ab-panel {
  width: 288px;
  padding: 16px;
  border-radius: 12px;
  background: var(--vp-c-bg-elv, var(--vp-c-bg));
  border: 1px solid var(--vp-c-divider);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
}
.ab-login-title {
  font-weight: 700;
  margin-bottom: 10px;
}
.ab-input {
  width: 100%;
  padding: 8px 10px;
  border-radius: 8px;
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg);
  color: var(--vp-c-text-1);
  font-size: 0.9rem;
}
.ab-input:focus {
  outline: none;
  border-color: var(--vp-c-brand-1);
}
.ab-error {
  color: #e11d48;
  font-size: 0.8rem;
  margin: 8px 0 0;
}
.ab-login-actions {
  display: flex;
  gap: 8px;
  margin-top: 12px;
}

/* 편집 패널 */
.ab-status {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 0.92rem;
}
.ab-dot {
  width: 9px;
  height: 9px;
  border-radius: 50%;
  background: #16a34a;
  box-shadow: 0 0 0 3px rgba(22, 163, 74, 0.18);
}
.ab-hint {
  margin-left: auto;
  font-size: 0.76rem;
  color: var(--vp-c-text-3);
}
.ab-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 12px;
}
.ab-note {
  margin: 12px 0 0;
  font-size: 0.74rem;
  line-height: 1.55;
  color: var(--vp-c-text-3);
}
.ab-note code {
  font-size: 0.9em;
}

/* 버튼 공통 */
.ab-btn {
  font-size: 0.82rem;
  font-weight: 600;
  cursor: pointer;
  padding: 7px 12px;
  border-radius: 8px;
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg-soft);
  color: var(--vp-c-text-1);
}
.ab-btn:hover {
  border-color: var(--vp-c-brand-1);
}
.ab-btn-brand {
  background: var(--vp-c-brand-3);
  border-color: var(--vp-c-brand-3);
  color: #fff;
}
.ab-btn-brand:hover {
  opacity: 0.9;
  color: #fff;
}
</style>
