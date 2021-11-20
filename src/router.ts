import { createRouter, createWebHistory } from 'vue-router'

export default createRouter({
  history: createWebHistory(),
  routes: [{
    path: '/links',
    component: () => import('./views/Links.vue')
  }]
})
