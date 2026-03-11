<template>
  <div class="admin-layout">
    <AdminSidebar :is-collapsed="isSidebarCollapsed" />
    <div class="admin-layout__content" :class="{ 'admin-layout__content--collapsed': isSidebarCollapsed }">
      <AdminHeader @toggle-sidebar="toggleSidebar" />
      <main class="admin-layout__main">
        <RouterView />
      </main>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { RouterView } from 'vue-router'
import AdminSidebar from '@/components/admin/AdminSidebar.vue'
import AdminHeader from '@/components/admin/AdminHeader.vue'

const isSidebarCollapsed = ref(false)

function toggleSidebar() {
  isSidebarCollapsed.value = !isSidebarCollapsed.value
}
</script>

<style scoped>
.admin-layout {
  display: flex;
  min-height: 100vh;
  background-color: #f0f2f5;
}

.admin-layout__content {
  flex: 1;
  margin-left: 240px;
  transition: margin-left 0.3s ease;
  display: flex;
  flex-direction: column;
}

.admin-layout__content--collapsed {
  margin-left: 64px;
}

.admin-layout__main {
  flex: 1;
  padding: 24px;
  overflow-y: auto;
}
</style>
