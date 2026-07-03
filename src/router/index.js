import { createRouter, createWebHistory } from 'vue-router'
import { useUserStore } from '@/stores/userStore'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'layout',
      component: () => import('@/views/Layout/index.vue'),
      children: [
        {
          path: '',
          name: 'home',
          component: () => import('@/views/Home/index.vue')
        },
        {
          path: '/category/:id',
          name: 'category',
          component: () => import('@/views/Category/index.vue')
        },
        {
          path: '/category/sub/:id',
          name: 'subcategory',
          component: () => import('@/views/SubCategory/index.vue')
        },
        {
          path: '/detail/:id',
          name: 'detail',
          component: () => import('@/views/Detail/index.vue')
        },
        {
          path: '/cartlist',
          name: 'cartlist',
          component: () => import('@/views/CartList/index.vue')
        },
        {
          path: '/checkout',
          name: 'checkout',
          component: () => import('@/views/Checkout/index.vue'),
          meta: { requiresAuth: true }
        },
        {
          path: '/pay',
          name: 'pay',
          component: () => import('@/views/Pay/index.vue'),
          meta: { requiresAuth: true }
        },
        {
          path: '/paycallback',
          name: 'payback',
          component: () => import('@/views/Pay/PayBack.vue')
        },
        {
          path: '/member',
          name: 'member',
          component: () => import('@/views/Member/index.vue'),
          redirect: '/member/user',
          meta: { requiresAuth: true },
          children: [
            {
              path: 'user',
              name: 'member-info',
              component: () => import('@/views/Member/components/UserInfo.vue')
            },
            {
              path: 'order',
              name: 'member-order',
              component: () => import('@/views/Member/components/UserOrder.vue')
            }
          ]
        }
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/Login/index.vue'),
      meta: { guestOnly: true }
    }
  ],
  scrollBehavior() {
    return { top: 0 }
  }
})

router.beforeEach((to) => {
  const userStore = useUserStore()
  const isLoggedIn = Boolean(userStore.userInfo?.token)

  if (to.meta.requiresAuth && !isLoggedIn) {
    return { path: '/login', query: { redirect: to.fullPath } }
  }

  if (to.meta.guestOnly && isLoggedIn) {
    return { path: '/' }
  }
})

export default router
