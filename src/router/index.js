import Vue from 'vue'
import Router from 'vue-router'
import ProposalQuestionCards from '@/components/organisms/ProposalQuestionCards'
import Proposals from '@/components/templates/Proposals'
import Maquinaria from '@/components/templates/Maquinaria'
import Gastado from '@/components/templates/Gastado'
import Trends from '@/components/templates/Trends'
import Test from '@/components/templates/Test'

Vue.use(Router)

export default new Router({
  mode: 'hash',
  routes: [
    {
      path: '/',
      redirect: '/proposals'
    },
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
      name: 'LOS APOYOS POLÍTICOS',
      component: Maquinaria
    },
    {
      path: '/la-maquinaria/:uid',
      name: 'LA MAQUINARIA QUE TIENEN single',
      component: Maquinaria
    },
    {
      path: '/gastado',
      redirect: '/gastado/ivan-duque',
      name: 'LO QUE HAN GASTADO',
      component: Gastado
    },
    {
      path: '/gastado/:uid',
      name: 'LO QUE HAN GASTADO single',
      component: Gastado
    },
    {
      path: '/como-los-buscan',
      name: 'CÓMO LOS BUSCAN',
      component: Trends
    },
    {
      path: '/test-de-caracter',
      name: 'TEST DE CARACTER',
      component: Test
    },
    {
      path: '*',
      redirect: '/proposals'
    }
  ]
})
