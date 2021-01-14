import Vue from 'vue' 
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: ()=>import('@/components/HelloWorld')
    },
    {
      path: '/rank',
      component: ()=>import('@/components/rank')
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
