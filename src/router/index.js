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
      name: 'LO QUE PROPONEN',
      component: ProposalQuestionCards
    },
    {
      path: '/proposals/:uid',
      name: 'proposal',
      component: Proposals
    },
    {
      path: '/la-maquinaria',
      name: 'LA MAQUINARIA QUE TIENEN'
    },
    {
      path: '/gastado',
      name: 'LO QUE HAN GASTADO'
    },
    {
      path: 'como-los-buscan',
      name: 'CÓMO LOS BUSCAN'
    },
    {
      path: 'test-de-caracter',
      name: 'TEST DE CARACTER'
    },
    {
      path: '*',
      redirect: '/proposals'
    }
  ]
})
