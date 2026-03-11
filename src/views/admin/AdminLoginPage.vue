<template>
  <div class="admin-login-page">
    <div class="admin-login-card">
      <div class="admin-login-card__header">
        <div class="admin-login-card__logo">A</div>
        <h1 class="admin-login-card__title">관리자 로그인</h1>
      </div>

      <form class="admin-login-card__form" @submit.prevent="handleLogin">
        <div class="admin-login-card__field">
          <label for="admin-email">이메일</label>
          <input
            id="admin-email"
            v-model="form.email"
            type="email"
            placeholder="admin@example.com"
            required
            autocomplete="email"
          />
        </div>
        <div class="admin-login-card__field">
          <label for="admin-password">비밀번호</label>
          <input
            id="admin-password"
            v-model="form.password"
            type="password"
            placeholder="비밀번호를 입력하세요"
            required
            autocomplete="current-password"
          />
        </div>

        <p v-if="errorMsg" class="admin-login-card__error">{{ errorMsg }}</p>

        <button type="submit" class="admin-login-card__submit" :disabled="isLoading">
          {{ isLoading ? '로그인 중...' : '관리자 로그인' }}
        </button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const authStore = useAuthStore()

const form = ref({ email: '', password: '' })
const errorMsg = ref('')
const isLoading = ref(false)

async function handleLogin() {
  errorMsg.value = ''
  isLoading.value = true

  try {
    // TODO: 실제 API 호출로 교체
    await new Promise(resolve => setTimeout(resolve, 500))

    if (form.value.email === 'admin@example.com' && form.value.password === 'admin') {
      authStore.login({ name: '관리자', email: form.value.email, role: 'admin' }, 'admin-token')
      router.push({ name: 'AdminDashboard' })
    } else {
      errorMsg.value = '관리자 계정 정보가 올바르지 않습니다.'
    }
  } finally {
    isLoading.value = false
  }
}
</script>

<style scoped>
.admin-login-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #1e1e2d;
}

.admin-login-card {
  background: #fff;
  border-radius: 16px;
  padding: 40px;
  width: 100%;
  max-width: 420px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.24);
}

.admin-login-card__header {
  text-align: center;
  margin-bottom: 28px;
}

.admin-login-card__logo {
  width: 48px;
  height: 48px;
  border-radius: 12px;
  background-color: #1a73e8;
  color: #fff;
  font-size: 22px;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 12px;
}

.admin-login-card__title {
  font-size: 22px;
  font-weight: 700;
  color: #1a1a2e;
  margin: 0;
}

.admin-login-card__form {
  display: flex;
  flex-direction: column;
  gap: 18px;
}

.admin-login-card__field {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.admin-login-card__field label {
  font-size: 13px;
  font-weight: 600;
  color: #333;
}

.admin-login-card__field input {
  padding: 10px 14px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 14px;
  outline: none;
  transition: border-color 0.2s;
}

.admin-login-card__field input:focus {
  border-color: #1a73e8;
}

.admin-login-card__error {
  font-size: 13px;
  color: #e53935;
  margin: 0;
}

.admin-login-card__submit {
  padding: 12px;
  background-color: #1e1e2d;
  color: #fff;
  border: none;
  border-radius: 8px;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s;
  margin-top: 4px;
}

.admin-login-card__submit:hover:not(:disabled) {
  background-color: #2d2d44;
}

.admin-login-card__submit:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}
</style>
