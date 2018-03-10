import Vue from 'vue'
import Router from 'vue-router'
import ProposalQuestionCards from '@/components/organisms/ProposalQuestionCards'
import Proposals from '@/components/templates/Proposals'

Vue.use(Router)

export default new Router({
  mode: 'hash',
  routes: [
    {
      path: '/proposals',
      name: 'proposals',
      component: ProposalQuestionCards
    },
    {
      path: '/proposals/:uid',
      name: 'proposal',
      component: Proposals
    },
    {
      path: '*',
      redirect: '/proposals'
    }
  ]
})
