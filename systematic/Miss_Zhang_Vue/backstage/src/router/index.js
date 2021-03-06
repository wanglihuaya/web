import Vue from "vue";
import Router from "vue-router";
import Store from "../store";

function hasUrl(url) {
  return Store.getters.getUserInfo.menus_url.some(item => item == url);
}
 Zq
Vue.use(Router);
/* 设定二级路由配置项 */
export const indexRoutes = [
  {
    path: "/home",
    name: "首页",
    component: () => import("@/views/home")
  },
  {
    path: "/menu",
    name: "菜单管理",
    component: () => import("@/views/menu/menu")
  },
  {
    path: "/role",
    name: "角色管理",
    component: () => import("@/views/role/role")
  },
  {
    path: "/manager",
    name: "管理员管理",
    component: () => import("@/views/manager/manager")
  },
  {
    path: "/goods",
    name: "商品管理",
    component: () => import("@/views/goods/goods")
  },
  {
    path: "/sort",
    name: "商品分类",
    component: () => import("@/views/sort/sort")
  },
  {
    path: "/specs",
    name: "商品规格",
    component: () => import("@/views/specs/specs")
  },
  {
    path: "/banner",
    name: "轮播图管理",
    component: () => import("@/views/banner/banner")
  },
  {
    path: "/seckill",
    name: "秒杀管理",
    component: () => import("@/views/seckill/seckill")
  },
  {
    path: "/member",
    name: "会员管理",
    component: () => import("@/views/member/member")
  }
];

const router = new Router({
  routes: [
    {
      path: "*",
      redirect: "/index"
    },
    {
      path: "/login",
      component: () => import("@/pages/login")
    },
    {
      path: "/index",
      component: () => import("@/pages/index"),
      children: [
        {
          path: "",
          redirect: "/home"
        },
        ...indexRoutes
      ]
    }
  ]
});
/* 全局登录拦截 */
router.beforeEach((to, from, next) => {
  if (to.path === "/login") {
    next();
    return;
  }
  if (sessionStorage.getItem("loginInfo")) {
    next();
    return;
  }
  next("/login");
});

export default router;
