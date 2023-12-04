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
        path: '/Cat1Poules.html',
        name: 'Cat1-Poules',
        component: () => import('./views/Cat1PoulesView.vue')
    },
    {
        path: '/Cat1Finales.html',
        name: 'Cat1-Finales',
        component: () => import('./views/Cat1FinalesView.vue')
    },
    {
        path: '/Cat2Poules.html',
        name: 'Cat2-Poules',
        component: () => import('./views/Cat2PoulesView.vue')
    },
    {
        path: '/Cat2Finales.html',
        name: 'Cat2-Finales',
        component: () => import('./views/Cat2FinalesView.vue')
    },
    {
         path: '/Timeline.html',
         name: 'Timeline',
         component: () => import('./views/TimelineView.vue')
    }
  ]
})