import component from 'element-plus/es/components/tree-select/src/tree-select-option.mjs'
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
    {
        path: '/',
        name: 'main',
        component: () => import('@/views/Main.vue'),
        redirect: '/home',
        children: [
          {
            path: 'home',
            name: 'Home',
            component: () => import('@/views/Home.vue'),
          },
          {
            path: 'user',
            name: 'User',
            component: () => import('@/views/User.vue'),
          },
        ],
      },
      {
        path: '/login',
        name: 'Login',
        component: () => import('@/views/Login.vue'),
      },
      {
        path: '/register',
        name: 'Register',
        component: () => import('@/views/Register.vue'),
      },
      {
        path: '/404',
        name: '404',
        component: () => import('@/views/404.vue'),
      },
]

const router = createRouter({
    // 路由模式
    history: createWebHistory(),
    routes,
})

export default router