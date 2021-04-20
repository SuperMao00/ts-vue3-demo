import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: 'login'
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../pages/login/index.vue')
  },
  {
    path: '/home',
    component: () => import('../pages/layout/index.vue'),
    redirect: 'index',
    children: [
      {
        path: '/home',
        name: 'Home',
        component: () => import('../pages/index/index.vue')
      },
      {
        path: '/shopCart',
        name: 'ShopCart',
        component: () => import('../pages/shopcart/index.vue')
      }
    ]
  }
]

const router = createRouter({
  // 路由模式为hash模式
  history: createWebHashHistory(process.env.BASE_URL),
  routes
})

// 路由导航守卫
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token')
  if (to.path == '/login') {
    next()
  } else {
    if (token) {
      next()
    } else {
      next('/login')
    }
  }
})

export default router
