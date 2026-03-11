<template>
  <div class="my-page">
    <h1 class="my-page__title">마이페이지</h1>

    <div class="my-page__card">
      <div class="my-page__avatar">{{ userInitial }}</div>
      <div class="my-page__info">
        <p class="my-page__name">{{ authStore.user?.name }}</p>
        <p class="my-page__email">{{ authStore.user?.email }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore()

const userInitial = computed(() => authStore.user?.name?.charAt(0).toUpperCase() || 'U')
</script>

<style scoped>
.my-page__title {
  font-size: 24px;
  font-weight: 700;
  color: #1a1a2e;
  margin: 0 0 24px;
}

.my-page__card {
  background: #fff;
  border-radius: 12px;
  padding: 28px;
  display: flex;
  align-items: center;
  gap: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
  max-width: 480px;
}

.my-page__avatar {
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background-color: #1a73e8;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  font-weight: 700;
  flex-shrink: 0;
}

.my-page__name {
  font-size: 18px;
  font-weight: 600;
  color: #1a1a2e;
  margin: 0 0 4px;
}

.my-page__email {
  font-size: 14px;
  color: #888;
  margin: 0;
}
</style>
