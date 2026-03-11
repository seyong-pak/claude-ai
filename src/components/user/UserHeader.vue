<template>
  <header class="user-header">
    <div class="user-header__inner">
      <RouterLink to="/" class="user-header__logo">Vue App</RouterLink>

      <nav class="user-header__nav">
        <RouterLink to="/" class="user-header__nav-link">홈</RouterLink>
        <RouterLink to="/about" class="user-header__nav-link">소개</RouterLink>
        <RouterLink v-if="authStore.isLoggedIn" to="/mypage" class="user-header__nav-link">마이페이지</RouterLink>
      </nav>

      <div class="user-header__actions">
        <template v-if="authStore.isLoggedIn">
          <span class="user-header__username">{{ authStore.user?.name }}</span>
          <button class="user-header__btn user-header__btn--outline" @click="handleLogout">로그아웃</button>
        </template>
        <template v-else>
          <RouterLink to="/login" class="user-header__btn">로그인</RouterLink>
        </template>
      </div>
    </div>
  </header>
</template>

<script setup>
import { RouterLink, useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore()
const router = useRouter()

function handleLogout() {
  authStore.logout()
  router.push({ name: 'UserLogin' })
}
</script>

<style scoped>
.user-header {
  background-color: #ffffff;
  border-bottom: 1px solid #e8e8e8;
  position: sticky;
  top: 0;
  z-index: 100;
}

.user-header__inner {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 16px;
  height: 64px;
  display: flex;
  align-items: center;
  gap: 32px;
}

.user-header__logo {
  font-size: 20px;
  font-weight: 700;
  color: #1a73e8;
  text-decoration: none;
}

.user-header__nav {
  display: flex;
  gap: 24px;
  flex: 1;
}

.user-header__nav-link {
  color: #444;
  text-decoration: none;
  font-size: 15px;
  transition: color 0.2s;
}

.user-header__nav-link:hover,
.user-header__nav-link.router-link-active {
  color: #1a73e8;
}

.user-header__actions {
  display: flex;
  align-items: center;
  gap: 12px;
}

.user-header__username {
  font-size: 14px;
  color: #555;
}

.user-header__btn {
  padding: 8px 18px;
  border-radius: 6px;
  font-size: 14px;
  text-decoration: none;
  background-color: #1a73e8;
  color: #fff;
  border: none;
  cursor: pointer;
  transition: background-color 0.2s;
}

.user-header__btn:hover {
  background-color: #1558c0;
}

.user-header__btn--outline {
  background-color: transparent;
  color: #1a73e8;
  border: 1px solid #1a73e8;
}

.user-header__btn--outline:hover {
  background-color: #e8f0fe;
}
</style>
