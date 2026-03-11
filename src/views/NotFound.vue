<template>
  <div class="not-found">
    <h1 class="not-found__code">404</h1>
    <p class="not-found__msg">페이지를 찾을 수 없습니다.</p>
    <RouterLink to="/" class="not-found__btn">홈으로 돌아가기</RouterLink>
  </div>
</template>

<script setup>
import { RouterLink } from 'vue-router'
</script>

<style scoped>
.not-found {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  background-color: #f8f9fa;
}

.not-found__code {
  font-size: 96px;
  font-weight: 700;
  color: #1a73e8;
  margin: 0 0 8px;
  line-height: 1;
}

.not-found__msg {
  font-size: 20px;
  color: #555;
  margin: 0 0 32px;
}

.not-found__btn {
  padding: 12px 28px;
  background-color: #1a73e8;
  color: #fff;
  border-radius: 8px;
  text-decoration: none;
  font-size: 15px;
  font-weight: 600;
  transition: background-color 0.2s;
}

.not-found__btn:hover {
  background-color: #1558c0;
}
</style>
