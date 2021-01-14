import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Home from '@/components/index/home'
import cart from '@/components/index/cart'
import shop from '@/components/index/shop'
import mine from '@/components/index/mine'
/* 二级路由 */
import play from '@/components/views/play'
import go from '@/components/views/go'
import come from '@/components/views/come'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '*',
      redirect: '/home'
    },
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/home',
      name: 'home',
      component: Home,
      children: [
        {
          path: '/play',
          component: play
        },
        {
          path: '/go',
          component: go
        },
        {
          path: '/come',
          component: come
        },
        {
          path: '',
          redirect: '/play'
        }
      ]
    },
    {
      path: '/cart',
      name: 'cart',
      component: cart
    },
    {
      path: '/mine',
      name: 'mine',
      component: mine
    },
    {
      path: '/shop',
      name: 'shop',
      component: shop
    }
  ]
})
