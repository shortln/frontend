import { createRouter, createWebHistory } from 'vue-router'

export default createRouter({
  history: createWebHistory(),
  routes: [{
    path: '/', redirect: '/home'
  }, {
    path: '/home',
    name: 'home',
    component: () => import('./views/Home.vue')
  }, {
    path: '/login',
    component: () => import('./views/Login.vue')
  }, {
    path: '/links',
    name: 'links',
    component: () => import('./views/Links.vue'),
    children: [{
      path: ':modelValue/detail',
      name: 'link-detail',
      props: true,
      component: () => import('./components/LinkDetail.vue')
    }, {
      path: ':pathMatch(.*)*',
      component: () => import('element-plus').then(({ ElEmpty }) => ElEmpty),
      props: { description: '目前还没有选择短链' }
    }]
  }]
})
