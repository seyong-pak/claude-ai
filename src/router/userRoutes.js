import UserLayout from '@/layouts/UserLayout.vue'

const userRoutes = [
  {
    path: '/',
    component: UserLayout,
    children: [
      {
        path: '',
        name: 'UserHome',
        component: () => import('@/views/user/HomePage.vue'),
        meta: { title: '홈', requiresAuth: false }
      },
      {
        path: 'about',
        name: 'UserAbout',
        component: () => import('@/views/user/AboutPage.vue'),
        meta: { title: '소개', requiresAuth: false }
      },
      {
        path: 'mypage',
        name: 'UserMyPage',
        component: () => import('@/views/user/MyPage.vue'),
        meta: { title: '마이페이지', requiresAuth: true }
      }
    ]
  },
  {
    path: '/login',
    name: 'UserLogin',
    component: () => import('@/views/user/LoginPage.vue'),
    meta: { title: '로그인', requiresAuth: false }
  }
]

export default userRoutes
