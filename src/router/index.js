import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import userRoutes from './userRoutes'
import adminRoutes from './adminRoutes'

const routes = [
  ...userRoutes,
  ...adminRoutes,
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('@/views/NotFound.vue')
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) return savedPosition
    return { top: 0 }
  }
})

// 네비게이션 가드
router.beforeEach((to, from, next) => {
  const authStore = useAuthStore()

  // 페이지 타이틀 설정
  if (to.meta.title) {
    document.title = `${to.meta.title} | Vue App`
  }

  // 관리자 페이지 접근 제어
  if (to.meta.requiresAdmin) {
    if (!authStore.isAdmin) {
      return next({ name: 'AdminLogin' })
    }
  }

  // 사용자 인증 필요 페이지 접근 제어
  if (to.meta.requiresAuth) {
    if (!authStore.isLoggedIn) {
      return next({ name: 'UserLogin', query: { redirect: to.fullPath } })
    }
  }

  next()
})

export default router
