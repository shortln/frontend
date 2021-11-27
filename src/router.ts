import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
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
    meta: {
      requiresAuth: true
    },
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

router.beforeEach((to, from, next) => {
  try {
    const { account } = JSON.parse(localStorage.getItem('vuex') ?? '')
    if (
      to.matched.some(record => record.meta.requiresAuth)
      && (account?.id ?? -1) === -1
    ) {
      next('/login')
    }
    next()
  } catch (e) {
    localStorage.setItem('vuex', JSON.stringify({ account: { id: -1 } }))
    location.reload()
  }
})

router.afterEach(() => {
  try {
    const { account } = JSON.parse(localStorage.getItem('vuex') ?? '')
    if (account?.id !== -1) {
      document.title = `${account.nickname} - 短链管理`
    } else {
      document.title = '短链管理'
    }
  } catch (e) {
    localStorage.setItem('vuex', JSON.stringify({ account: { id: -1 } }))
    location.reload()
  }
})

export default router
