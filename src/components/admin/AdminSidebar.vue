<template>
  <aside class="admin-sidebar" :class="{ 'admin-sidebar--collapsed': isCollapsed }">
    <div class="admin-sidebar__logo">
      <span class="admin-sidebar__logo-icon">A</span>
      <span v-if="!isCollapsed" class="admin-sidebar__logo-text">Admin</span>
    </div>

    <nav class="admin-sidebar__nav">
      <RouterLink
        v-for="item in menuItems"
        :key="item.name"
        :to="{ name: item.name }"
        class="admin-sidebar__nav-item"
        :title="isCollapsed ? item.label : ''"
      >
        <span class="admin-sidebar__nav-icon">{{ item.icon }}</span>
        <span v-if="!isCollapsed" class="admin-sidebar__nav-label">{{ item.label }}</span>
      </RouterLink>
    </nav>

    <div class="admin-sidebar__footer">
      <RouterLink to="/" class="admin-sidebar__nav-item" title="사용자 페이지로">
        <span class="admin-sidebar__nav-icon">←</span>
        <span v-if="!isCollapsed" class="admin-sidebar__nav-label">사용자 페이지</span>
      </RouterLink>
    </div>
  </aside>
</template>

<script setup>
import { RouterLink } from 'vue-router'

defineProps({
  isCollapsed: {
    type: Boolean,
    default: false
  }
})

const menuItems = [
  { name: 'AdminDashboard', label: '대시보드', icon: '▣' },
  { name: 'AdminUsers', label: '회원 관리', icon: '👥' },
  { name: 'AdminBanners', label: '배너 관리', icon: '🖼' },
  { name: 'AdminSettings', label: '설정', icon: '⚙' }
]
</script>

<style scoped>
.admin-sidebar {
  position: fixed;
  left: 0;
  top: 0;
  height: 100vh;
  width: 240px;
  background-color: #1e1e2d;
  color: #fff;
  display: flex;
  flex-direction: column;
  transition: width 0.3s ease;
  z-index: 200;
  overflow: hidden;
}

.admin-sidebar--collapsed {
  width: 64px;
}

.admin-sidebar__logo {
  height: 64px;
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 0 16px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  flex-shrink: 0;
}

.admin-sidebar__logo-icon {
  width: 32px;
  height: 32px;
  background-color: #1a73e8;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 16px;
  flex-shrink: 0;
}

.admin-sidebar__logo-text {
  font-size: 18px;
  font-weight: 700;
  white-space: nowrap;
}

.admin-sidebar__nav {
  flex: 1;
  padding: 12px 8px;
  display: flex;
  flex-direction: column;
  gap: 4px;
  overflow-y: auto;
}

.admin-sidebar__footer {
  padding: 12px 8px;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}

.admin-sidebar__nav-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px 12px;
  border-radius: 8px;
  color: #a0a0b0;
  text-decoration: none;
  font-size: 14px;
  transition: background-color 0.2s, color 0.2s;
  white-space: nowrap;
}

.admin-sidebar__nav-item:hover {
  background-color: rgba(255, 255, 255, 0.08);
  color: #fff;
}

.admin-sidebar__nav-item.router-link-active {
  background-color: #1a73e8;
  color: #fff;
}

.admin-sidebar__nav-icon {
  width: 20px;
  text-align: center;
  flex-shrink: 0;
  font-size: 16px;
}

.admin-sidebar__nav-label {
  overflow: hidden;
}
</style>
