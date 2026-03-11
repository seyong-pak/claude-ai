<template>
  <div class="user-layout">
    <UserHeader />
    <main class="user-layout__main">
      <div class="user-layout__container">
        <RouterView />
      </div>
    </main>
    <UserFooter />
  </div>
</template>

<script setup>
import { RouterView } from 'vue-router'
import UserHeader from '@/components/user/UserHeader.vue'
import UserFooter from '@/components/user/UserFooter.vue'
</script>

<style scoped>
.user-layout {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.user-layout__main {
  flex: 1;
  background-color: #f8f9fa;
}

.user-layout__container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 24px 16px;
}
</style>
