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
          component: () => import('@/views/Home/index.vue'),
          meta: { title: '首页' }
        },
        {
          path: '/category/:id',
          name: 'category',
          component: () => import('@/views/Category/index.vue'),
          meta: { title: '分类列表' }
        },
        {
          path: '/category/sub/:id',
          name: 'subcategory',
          component: () => import('@/views/SubCategory/index.vue'),
          meta: { title: '二级分类' }
        },
        {
          path: '/detail/:id',
          name: 'detail',
          component: () => import('@/views/Detail/index.vue'),
          meta: { title: '商品详情' }
        },
        {
          path: '/cartlist',
          name: 'cartlist',
          component: () => import('@/views/CartList/index.vue'),
          meta: { title: '购物车' }
        },
        {
          path: '/checkout',
          name: 'checkout',
          component: () => import('@/views/Checkout/index.vue'),
          meta: { requiresAuth: true, title: '结算中心' }
        },
        {
          path: '/pay',
          name: 'pay',
          component: () => import('@/views/Pay/index.vue'),
          meta: { requiresAuth: true, title: '订单支付' }
        },
        {
          path: '/paycallback',
          name: 'payback',
          component: () => import('@/views/Pay/PayBack.vue'),
          meta: { title: '支付结果' }
        },
        {
          path: '/member',
          name: 'member',
          component: () => import('@/views/Member/index.vue'),
          redirect: '/member/user',
          meta: { requiresAuth: true, title: '会员中心' },
          children: [
            {
              path: 'user',
              name: 'member-info',
              component: () => import('@/views/Member/components/UserInfo.vue'),
              meta: { title: '个人中心' }
            },
            {
              path: 'order',
              name: 'member-order',
              component: () => import('@/views/Member/components/UserOrder.vue'),
              meta: { title: '我的订单' }
            }
          ]
        }
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/Login/index.vue'),
      meta: { guestOnly: true, title: '会员登录' }
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

router.afterEach((to) => {
  document.title = to.meta.title ? `${to.meta.title} - 栖川里物` : '栖川里物'
})

export default router
