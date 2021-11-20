import { createRouter, createWebHistory } from 'vue-router'

export default createRouter({
  history: createWebHistory(),
  routes: [{
    path: '/', redirect: '/home'
  }, {
    path: '/home',
    component: () => import('./views/Home.vue')
  }, {
    path: '/links',
    component: () => import('./views/Links.vue')
  }]
})
