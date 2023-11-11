import Vue from 'vue'
import Router from 'vue-router'
import AccueilView from './views/AccueilView.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'accueil',
      component: AccueilView
    },
    {
        path: '/Cat1Poules',
        name: 'Cat1-Poules',
        component: () => import('./views/Cat1PoulesView.vue')
    },
    {
        path: '/Cat1Finales',
        name: 'Cat1-Finales',
        component: () => import('./views/Cat1FinalesView.vue')
    },
    {
        path: '/Cat2Poules',
        name: 'Cat2-Poules',
        component: () => import('./views/Cat2PoulesView.vue')
    },
    {
        path: '/Cat2Finales',
        name: 'Cat2-Finales',
        component: () => import('./views/Cat2FinalesView.vue')
    },
    {
         path: '/Timeline',
         name: 'Timeline',
         component: () => import('./views/TimelineView.vue')
    }
  ]
})