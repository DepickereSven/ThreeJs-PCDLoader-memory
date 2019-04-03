import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'menu',
      component: () => import('./views/Live.vue'),
    },
    {
      path: '/404',
      name: '404',
      component: () => import('./views/404.vue'),
      meta: {
        layout: "empty"
      },
    },
    {
      path: '*',
      redirect: '/404'
    }
  ]
})
