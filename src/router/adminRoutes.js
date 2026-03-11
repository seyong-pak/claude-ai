import AdminLayout from '@/layouts/AdminLayout.vue'

const adminRoutes = [
  {
    path: '/admin',
    component: AdminLayout,
    meta: { requiresAdmin: true },
    children: [
      {
        path: '',
        name: 'AdminDashboard',
        component: () => import('@/views/admin/DashboardPage.vue'),
        meta: { title: '대시보드', requiresAdmin: true }
      },
      {
        path: 'users',
        name: 'AdminUsers',
        component: () => import('@/views/admin/UsersPage.vue'),
        meta: { title: '회원 관리', requiresAdmin: true }
      },
      {
        path: 'banners',
        name: 'AdminBanners',
        component: () => import('@/views/admin/BannerPage.vue'),
        meta: { title: '배너 관리', requiresAdmin: true }
      },
      {
        path: 'settings',
        name: 'AdminSettings',
        component: () => import('@/views/admin/SettingsPage.vue'),
        meta: { title: '설정', requiresAdmin: true }
      }
    ]
  },
  {
    path: '/admin/login',
    name: 'AdminLogin',
    component: () => import('@/views/admin/AdminLoginPage.vue'),
    meta: { title: '관리자 로그인', requiresAdmin: false }
  }
]

export default adminRoutes
