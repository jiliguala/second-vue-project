import { createRouter, createWebHashHistory } from 'vue-router'
import MainBox from '../views/MainBox.vue'
import Login from '../views/Login.vue'
import ConfigRouters from '../router/config.js'
import store from '../store/index.js'

const routes = [

  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/mainbox',
    name: 'mainbox',
    component: MainBox
  }
  // mainbox的嵌套路由，根据权限动态添加
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

// 每次路由跳转之前 设置路由拦截
router.beforeEach((to, from, next) => {
  if (to.name === 'login') {
    next();
  } else {
    // 若已授权（登录），next(),
    // 若未授权，重定向到login
    if (!localStorage.getItem('token')) {
      next({
        path: '/login'
      })
    } else {
      // 判断是否是第一次进入此路由
      if (!store.state.isGetRouter) {
        router.removeRoute('mainbox'); // 切换登录用户进入后 删除所有的嵌套路由mainbox
        ConfigRuterFun();
        next({
          path: to.fullPath
        });
      } else {
        next();
      }
    }
  }
})

// 循环子路由
const ConfigRuterFun = () => {
  // 判断子路由是否已存在
  if (!router.hasRoute('mainbox')) {
    router.addRoute(
      {
        path: '/mainbox',
        name: 'mainbox',
        component: MainBox
      }
    )
  }
  ConfigRouters.forEach((item) => {
    checkPermission(item) && router.addRoute('mainbox', item)
  });
  // 非第一次进入路由，改变isGetRouter为true
  store.commit('changeGetRouter', true);
}
// 限制用户路由的权限
const checkPermission = (item) => {
  if (item.requireAdmin) {
    return store.state.userInfo.role === 1
  }
  return true
};

export default router
