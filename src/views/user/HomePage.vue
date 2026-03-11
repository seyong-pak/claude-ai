<template>
  <div class="home-page">
    <!-- 메인 팝업 배너 -->
    <Transition name="popup">
      <div v-if="showPopup" class="home-page__popup-overlay" @click.self="closePopup">
        <div class="home-page__popup">
          <button class="home-page__popup-close" @click="closePopup">✕</button>
          <BannerSwiper :banners="popupBanners" :interval="2000" />
          <div class="home-page__popup-footer">
            <label class="home-page__popup-noshow">
              <input type="checkbox" v-model="noShowToday" />
              오늘 하루 보지 않기
            </label>
          </div>
        </div>
      </div>
    </Transition>

    <section class="home-page__hero">
      <h1 class="home-page__hero-title">Vue App에 오신 것을 환영합니다</h1>
      <p class="home-page__hero-desc">Vue 3 기반의 서비스입니다.</p>
      <RouterLink v-if="!authStore.isLoggedIn" to="/login" class="home-page__cta">시작하기</RouterLink>
    </section>

    <section class="home-page__features">
      <div class="home-page__feature-card" v-for="feature in features" :key="feature.title">
        <div class="home-page__feature-icon">{{ feature.icon }}</div>
        <h3>{{ feature.title }}</h3>
        <p>{{ feature.desc }}</p>
      </div>
    </section>

    <!-- 메인 바텀 배너 -->
    <div v-if="bottomBanners.length > 0" class="home-page__bottom-banner">
      <BannerSwiper :banners="bottomBanners" :interval="2000" />
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { RouterLink } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { useBannerStore } from '@/stores/banner'
import BannerSwiper from '@/components/common/BannerSwiper.vue'

const authStore = useAuthStore()
const bannerStore = useBannerStore()

const noShowToday = ref(false)
const popupDismissed = ref(false)

const popupBanners = computed(() => bannerStore.getActiveBanners('mainPopup'))
const bottomBanners = computed(() => bannerStore.getActiveBanners('mainBottom'))

const showPopup = computed(() => popupBanners.value.length > 0 && !popupDismissed.value)

onMounted(() => {
  const dismissed = localStorage.getItem('popup_dismissed_date')
  if (dismissed === new Date().toDateString()) {
    popupDismissed.value = true
  }
})

function closePopup() {
  if (noShowToday.value) {
    localStorage.setItem('popup_dismissed_date', new Date().toDateString())
  }
  popupDismissed.value = true
}

const features = [
  { icon: '⚡', title: '빠른 속도', desc: 'Vite 기반의 빠른 개발 환경을 제공합니다.' },
  { icon: '🔒', title: '보안', desc: '안전한 인증 시스템으로 데이터를 보호합니다.' },
  { icon: '📱', title: '반응형', desc: '모든 디바이스에서 최적화된 화면을 제공합니다.' }
]
</script>

<style scoped>
/* 팝업 */
.home-page__popup-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.55);
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
}

.home-page__popup {
  background: #fff;
  border-radius: 12px;
  overflow: hidden;
  max-width: 480px;
  width: 90%;
  position: relative;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
}

.home-page__popup-close {
  position: absolute;
  top: 10px;
  right: 10px;
  background: rgba(0, 0, 0, 0.5);
  color: #fff;
  border: none;
  border-radius: 50%;
  width: 30px;
  height: 30px;
  font-size: 14px;
  cursor: pointer;
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.2s;
}

.home-page__popup-close:hover {
  background: rgba(0, 0, 0, 0.75);
}

.home-page__popup-footer {
  padding: 12px 16px;
  background: #f8f9fa;
  border-top: 1px solid #eee;
}

.home-page__popup-noshow {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 13px;
  color: #555;
  cursor: pointer;
}

.popup-enter-active,
.popup-leave-active {
  transition: opacity 0.25s ease;
}
.popup-enter-from,
.popup-leave-to {
  opacity: 0;
}

/* hero */
.home-page__hero {
  text-align: center;
  padding: 60px 0 48px;
}

.home-page__hero-title {
  font-size: 36px;
  font-weight: 700;
  color: #1a1a2e;
  margin: 0 0 16px;
}

.home-page__hero-desc {
  font-size: 18px;
  color: #666;
  margin: 0 0 32px;
}

.home-page__cta {
  display: inline-block;
  padding: 14px 36px;
  background-color: #1a73e8;
  color: #fff;
  border-radius: 8px;
  text-decoration: none;
  font-size: 16px;
  font-weight: 600;
  transition: background-color 0.2s;
}

.home-page__cta:hover {
  background-color: #1558c0;
}

/* features */
.home-page__features {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 24px;
  padding: 24px 0;
}

.home-page__feature-card {
  background: #fff;
  border-radius: 12px;
  padding: 28px 24px;
  text-align: center;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
}

.home-page__feature-icon {
  font-size: 36px;
  margin-bottom: 16px;
}

.home-page__feature-card h3 {
  font-size: 18px;
  margin: 0 0 8px;
  color: #1a1a2e;
}

.home-page__feature-card p {
  font-size: 14px;
  color: #888;
  margin: 0;
  line-height: 1.6;
}

/* 바텀 배너 */
.home-page__bottom-banner {
  margin-top: 32px;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
}
</style>
