import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'

Vue.use(VueRouter)
/* 这里就是定义的路由路线 */
const routes: Array<RouteConfig> = [
  {
    path: '/index',
    component: () => import('../pages/index.vue'),
  },
  {
    path: '',
    redirect: '/index',
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
})

export default router
