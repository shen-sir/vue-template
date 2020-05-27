import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [{
    path: '/',
    redirect: '/home',
  },
  {
    path: '/home',
    name: 'home',
    component: () => import('@views/index.vue'),
    children: [
      {
        path: '',
        name: 'test',
        component: () => import('@views/test/index.vue'),
      },
    ]
  },
  {
    path: '*',
    redirect: '/home',
  },
]
})
