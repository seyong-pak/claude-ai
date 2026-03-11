<template>
  <header class="admin-header">
    <button class="admin-header__toggle" @click="emit('toggle-sidebar')" title="사이드바 토글">
      ☰
    </button>

    <div class="admin-header__breadcrumb">
      <span v-for="(crumb, index) in breadcrumbs" :key="index" class="admin-header__breadcrumb-item">
        <RouterLink v-if="crumb.to" :to="crumb.to" class="admin-header__breadcrumb-link">{{ crumb.label }}</RouterLink>
        <span v-else>{{ crumb.label }}</span>
        <span v-if="index < breadcrumbs.length - 1" class="admin-header__breadcrumb-sep">/</span>
      </span>
    </div>

    <div class="admin-header__right">
      <div class="admin-header__user">
        <div class="admin-header__avatar">{{ adminInitial }}</div>
        <span class="admin-header__username">{{ authStore.user?.name }}</span>
      </div>
      <button class="admin-header__logout" @click="handleLogout">로그아웃</button>
    </div>
  </header>
</template>

<script setup>
import { computed } from 'vue'
import { RouterLink, useRouter, useRoute } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const emit = defineEmits(['toggle-sidebar'])

const authStore = useAuthStore()
const router = useRouter()
const route = useRoute()

const adminInitial = computed(() => {
  return authStore.user?.name?.charAt(0).toUpperCase() || 'A'
})

const breadcrumbs = computed(() => {
  const crumbs = [{ label: '관리자', to: { name: 'AdminDashboard' } }]
  if (route.meta.title && route.name !== 'AdminDashboard') {
    crumbs.push({ label: route.meta.title })
  }
  return crumbs
})

function handleLogout() {
  authStore.logout()
  router.push({ name: 'AdminLogin' })
}
</script>

<style scoped>
.admin-header {
  height: 64px;
  background-color: #ffffff;
  border-bottom: 1px solid #e8e8e8;
  display: flex;
  align-items: center;
  padding: 0 24px;
  gap: 16px;
  position: sticky;
  top: 0;
  z-index: 100;
}

.admin-header__toggle {
  background: none;
  border: none;
  font-size: 20px;
  cursor: pointer;
  color: #555;
  padding: 4px 8px;
  border-radius: 4px;
  transition: background-color 0.2s;
}

.admin-header__toggle:hover {
  background-color: #f0f2f5;
}

.admin-header__breadcrumb {
  flex: 1;
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 14px;
  color: #555;
}

.admin-header__breadcrumb-link {
  color: #1a73e8;
  text-decoration: none;
}

.admin-header__breadcrumb-link:hover {
  text-decoration: underline;
}

.admin-header__breadcrumb-sep {
  color: #aaa;
}

.admin-header__right {
  display: flex;
  align-items: center;
  gap: 16px;
}

.admin-header__user {
  display: flex;
  align-items: center;
  gap: 8px;
}

.admin-header__avatar {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background-color: #1a73e8;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 14px;
}

.admin-header__username {
  font-size: 14px;
  color: #333;
}

.admin-header__logout {
  background: none;
  border: 1px solid #e8e8e8;
  border-radius: 6px;
  padding: 6px 14px;
  font-size: 13px;
  color: #555;
  cursor: pointer;
  transition: background-color 0.2s;
}

.admin-header__logout:hover {
  background-color: #f0f2f5;
}
</style>
