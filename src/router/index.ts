import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Layout from '@/layout/index.vue'
import store from '@/store'
Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login/index.vue')
  },
  {
    path: '/',
    component: Layout,
    meta: {
      requiresAuth: true
    },
    children: [
      {
        path: '',
        name: 'home',
        component: () => import('@/views/home/index.vue')
      },
      {
        path: '/advert',
        name: 'advert',
        component: () => import('@/views/advert/index.vue')
      },
      {
        path: '/advert-space',
        name: 'advert-space',
        component: () => import('@/views/advert-space/index.vue')
      },
      {
        path: '/course',
        name: 'course',
        component: () => import('@/views/course/index.vue')
      },
      {
        path: '/menu',
        name: 'menu',
        component: () => import('@/views/menu/index.vue')
      },
      {
        path: '/resource',
        name: 'resource',
        component: () => import('@/views/resource/index.vue')
      },
      {
        path: '/role',
        name: 'role',
        component: () => import('@/views/role/index.vue')
      },
      {
        path: '/user',
        name: 'user',
        component: () => import('@/views/user/index.vue')
      },
      {
        path: '/menu/create',
        name: 'menu-create',
        component: () => import('@/views/menu/create.vue')
      },
      {
        path: '/menu/:id/edit',
        name: 'menu-edit',
        component: () => import('@/views/menu/edit.vue')
      }
    ]
  },
  {
    path: '*',
    name: '404',
    component: () => import('@/views/error-page/404.vue')
  }
]

const router = new VueRouter({
  routes
})
// 全局前置守卫：任何页面访问都要经过这里
// to：要去哪里的路由信息
// from：从哪里来的路由信息
// next:通行的标志
router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!store.state.user) {
      // 跳转到登录页面
      next({
        name: 'login',
        query: { //  通过url传递字符串参数
          redirect: to.fullPath // 把登录成功需要返回的的页面告诉登录页面
        }
      })
    } else {
      next()
    }
  } else {
    next()
  }
})

export default router
