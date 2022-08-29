import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/login',
    name: 'Login',
    meta: { title: '登录' },
    component: () => import('@/views/Login/Index.vue')
  },
  {
    path: '/',
    name: 'Index',
    redirect: '/login'
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})
export default router
