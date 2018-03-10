import Vue from 'vue'
import Router from 'vue-router'
import Proposals from '@/components/templates/Proposals'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'proposals',
      component: Proposals
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
