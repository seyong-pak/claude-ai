<template>
  <div class="banner-page">
    <h1 class="banner-page__title">배너 관리</h1>

    <div class="banner-page__cards">
      <BannerCard
        v-for="banner in bannerList"
        :key="banner.type"
        :type="banner.type"
        :label="banner.label"
        :description="banner.description"
      />
    </div>
  </div>
</template>

<script setup>
import BannerCard from '@/components/admin/BannerCard.vue'

const bannerList = [
  {
    type: 'mainPopup',
    label: '메인 팝업 이미지',
    description: '사용자 메인 화면 진입 시 팝업으로 노출됩니다.'
  },
  {
    type: 'mainBottom',
    label: '메인 바텀 이미지',
    description: '사용자 메인 화면 하단에 배너로 노출됩니다.'
  },
  {
    type: 'loginBanner',
    label: '로그인 배너 이미지',
    description: '로그인 페이지 상단에 배너로 노출됩니다.'
  }
]
</script>

<style scoped>
.banner-page__title {
  font-size: 24px;
  font-weight: 700;
  color: #1a1a2e;
  margin: 0 0 24px;
}

.banner-page__cards {
  display: flex;
  flex-direction: column;
  gap: 20px;
}
</style>
