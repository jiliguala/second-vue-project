import { createRouter, createWebHashHistory } from 'vue-router'
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';

import Home from '../views/Home.vue';
import News from '../views/News.vue';
import NewsDetail from '../views/NewsDetail.vue';
import Product from '../views/Product.vue';

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/news',
    name: 'news',
    component: News
  },
  {
    path: '/news/:id',
    name: 'newsdetail',
    component: NewsDetail
  },
  {
    path: '/product',
    name: 'product',
    component: Product
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

// 切换路由前 显示进度条
router.beforeEach((to, from, next) => {
  NProgress.start();
  next();
});
// 切换路由后 隐藏进度条
router.afterEach(() => {
  NProgress.done();
});

export default router
