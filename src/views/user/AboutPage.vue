<template>
  <div class="about-page">
    <h1 class="about-page__title">서비스 소개</h1>
    <p class="about-page__desc">Vue 3, Vue Router, Pinia를 활용한 프론트엔드 서비스입니다.</p>

    <div class="about-page__stack">
      <div class="about-page__stack-item" v-for="item in techStack" :key="item.name">
        <strong>{{ item.name }}</strong>
        <span>{{ item.version }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
const techStack = [
  { name: 'Vue', version: '3.4' },
  { name: 'Vue Router', version: '4.3' },
  { name: 'Pinia', version: '2.1' },
  { name: 'Vite', version: '5.0' }
]
</script>

<style scoped>
.about-page__title {
  font-size: 28px;
  font-weight: 700;
  color: #1a1a2e;
  margin: 0 0 12px;
}

.about-page__desc {
  font-size: 16px;
  color: #666;
  margin: 0 0 32px;
}

.about-page__stack {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}

.about-page__stack-item {
  background: #fff;
  border: 1px solid #e8e8e8;
  border-radius: 8px;
  padding: 12px 20px;
  display: flex;
  flex-direction: column;
  gap: 4px;
  min-width: 120px;
}

.about-page__stack-item strong {
  font-size: 15px;
  color: #1a1a2e;
}

.about-page__stack-item span {
  font-size: 13px;
  color: #888;
}
</style>
