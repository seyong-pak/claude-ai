<template>
  <div class="login-page">
    <!-- 로그인 배너 -->
    <div v-if="loginBanners.length > 0" class="login-page__banner">
      <BannerSwiper :banners="loginBanners" :interval="2000" />
    </div>

    <div class="login-card">
      <h1 class="login-card__title">로그인</h1>
      <p class="login-card__sub">계정에 로그인하세요</p>

      <form class="login-card__form" @submit.prevent="handleLogin">
        <div class="login-card__field">
          <label for="email">이메일</label>
          <input
            id="email"
            v-model="form.email"
            type="email"
            placeholder="example@email.com"
            required
            autocomplete="email"
          />
        </div>
        <div class="login-card__field">
          <label for="password">비밀번호</label>
          <input
            id="password"
            v-model="form.password"
            type="password"
            placeholder="비밀번호를 입력하세요"
            required
            autocomplete="current-password"
          />
        </div>

        <p v-if="errorMsg" class="login-card__error">{{ errorMsg }}</p>

        <button type="submit" class="login-card__submit" :disabled="isLoading">
          {{ isLoading ? '로그인 중...' : '로그인' }}
        </button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { useBannerStore } from '@/stores/banner'
import BannerSwiper from '@/components/common/BannerSwiper.vue'

const router = useRouter()
const route = useRoute()
const authStore = useAuthStore()
const bannerStore = useBannerStore()

const loginBanners = computed(() => bannerStore.getActiveBanners('loginBanner'))

const form = ref({ email: '', password: '' })
const errorMsg = ref('')
const isLoading = ref(false)

async function handleLogin() {
  errorMsg.value = ''
  isLoading.value = true

  try {
    // TODO: 실제 API 호출로 교체
    await new Promise(resolve => setTimeout(resolve, 500))

    if (form.value.email === 'user@example.com' && form.value.password === 'password') {
      authStore.login({ name: '사용자', email: form.value.email, role: 'user' }, 'user-token')
      const redirect = route.query.redirect || '/'
      router.push(redirect)
    } else {
      errorMsg.value = '이메일 또는 비밀번호가 올바르지 않습니다.'
    }
  } finally {
    isLoading.value = false
  }
}
</script>

<style scoped>
.login-page {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #f8f9fa;
  gap: 20px;
  padding: 24px 16px;
}

.login-page__banner {
  width: 100%;
  max-width: 420px;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
}

.login-page__banner-img {
  width: 100%;
  display: block;
}

.login-card {
  background: #fff;
  border-radius: 16px;
  padding: 40px;
  width: 100%;
  max-width: 420px;
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.08);
}

.login-card__title {
  font-size: 24px;
  font-weight: 700;
  color: #1a1a2e;
  margin: 0 0 4px;
}

.login-card__sub {
  font-size: 14px;
  color: #888;
  margin: 0 0 28px;
}

.login-card__form {
  display: flex;
  flex-direction: column;
  gap: 18px;
}

.login-card__field {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.login-card__field label {
  font-size: 13px;
  font-weight: 600;
  color: #333;
}

.login-card__field input {
  padding: 10px 14px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 14px;
  outline: none;
  transition: border-color 0.2s;
}

.login-card__field input:focus {
  border-color: #1a73e8;
}

.login-card__error {
  font-size: 13px;
  color: #e53935;
  margin: 0;
}

.login-card__submit {
  padding: 12px;
  background-color: #1a73e8;
  color: #fff;
  border: none;
  border-radius: 8px;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s;
  margin-top: 4px;
}

.login-card__submit:hover:not(:disabled) {
  background-color: #1558c0;
}

.login-card__submit:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}
</style>
