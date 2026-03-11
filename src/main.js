import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import { seedBanners } from './utils/bannerSeed'

import './assets/styles/global.css'

// 배너 스토어 구조가 배열로 변경됨 → 기존 객체 구조 데이터 감지 시 재시드
const stored = localStorage.getItem('app_banners')
const needsReseed = !stored || !Array.isArray(JSON.parse(stored)?.mainPopup)
if (needsReseed) {
  seedBanners()
}

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.mount('#app')
