import Vue from 'vue'
import Router from 'vue-router'
import ProposalQuestionCards from '@/components/organisms/ProposalQuestionCards'
import Proposals from '@/components/templates/Proposals'
import Maquinaria from '@/components/templates/Maquinaria'
import Trends from '@/components/templates/Trends'
import Test from '@/components/templates/Test'

Vue.use(Router)

export default new Router({
  mode: window.los_presidenciables__data.singles ? 'abstract' : 'hash',
  routes: [
    {
      path: '/',
      name: 'proposals',
      redirect: '/proposals'
    },
    {
      path: '/proposals',
      name: 'LO QUE PROPONEN',
      components: {
        default: ProposalQuestionCards,
        proposals: ProposalQuestionCards,
        'la-maquinaria': Maquinaria,
        'como-los-buscan': Trends,
        'test-de-caracter': Test
      }
    },
    {
      path: '/proposals/:uid',
      name: 'proposal',
      components: {
        default: Proposals,
        proposals: Proposals,
        'la-maquinaria': Maquinaria,
        'como-los-buscan': Trends,
        'test-de-caracter': Test
      }
    },
    {
      path: '/la-maquinaria',
      name: 'LOS APOYOS POLÍTICOS',
      components: {
        default: Maquinaria,
        proposals: ProposalQuestionCards,
        'la-maquinaria': Maquinaria,
        'como-los-buscan': Trends,
        'test-de-caracter': Test
      }
    },
    {
      path: '/la-maquinaria',
      name: 'la-maquinaria',
      components: {
        default: Maquinaria,
        proposals: ProposalQuestionCards,
        'la-maquinaria': Maquinaria,
        'como-los-buscan': Trends,
        'test-de-caracter': Test
      }
    },
    {
      path: '/la-maquinaria/:uid',
      name: 'LA MAQUINARIA QUE TIENEN single',
      components: {
        default: Maquinaria,
        proposals: ProposalQuestionCards,
        'la-maquinaria': Maquinaria,
        'como-los-buscan': Trends,
        'test-de-caracter': Test
      }
    },
    {
      path: '/como-los-buscan',
      name: 'CÓMO LOS BUSCAN',
      components: {
        default: Trends,
        proposals: ProposalQuestionCards,
        'la-maquinaria': Maquinaria,
        'como-los-buscan': Trends,
        'test-de-caracter': Test
      }
    },
    {
      path: '/como-los-buscan',
      name: 'como-los-buscan',
      components: {
        default: Trends,
        proposals: ProposalQuestionCards,
        'la-maquinaria': Maquinaria,
        'como-los-buscan': Trends,
        'test-de-caracter': Test
      }
    },
    {
      path: '/test-de-caracter',
      name: 'TEST DE CARÁCTER',
      components: {
        default: Test,
        proposals: ProposalQuestionCards,
        'la-maquinaria': Maquinaria,
        'como-los-buscan': Trends,
        'test-de-caracter': Test
      }
    },
    {
      path: '/test-de-caracter',
      name: 'test-de-caracter',
      components: {
        default: Test,
        proposals: ProposalQuestionCards,
        'la-maquinaria': Maquinaria,
        'como-los-buscan': Trends,
        'test-de-caracter': Test
      }
    },
    {
      path: '*',
      redirect: '/proposals'
    }
  ]
})
