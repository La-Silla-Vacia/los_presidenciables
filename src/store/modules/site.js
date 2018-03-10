import Vue from 'vue'
import * as types from '../mutation-types'

const state = {
  site: {},
  loaded: false,
  chapter: 'LO QUE PROPONEN'
}

const getters = {
  getItems: () => (uid, collection = state.site) => {
    return collection
  },
  getChapters: () => (uid, collection = state.site) => {
    return [
      'LO QUE PROPONEN',
      'LA MAQUINARIA QUE TIENEN',
      'LO QUE HAN GASTADO',
      'CÓMO LOS BUSCAN',
      'TEST DE CARACTER',
    ]
  },
  getActiveChapter: () => (uid, collection = state.chapter) => {
    return collection
  },
  isLoaded: () => (url, loaded = state.loaded) => {
    return loaded
  },
  getDataUri: (uid, collection = state.site) => {
    return collection.dataUri
  }
}

const actions = {
  fetchContent () {
    Vue.http.get(getters.getDataUri()).then((response) => {
      const data = JSON.parse(response.bodyText)
      this.commit(types.RECEIVE_SITE, { site: data, loaded: true })
    }, (error) => {
      console.log(error.statusText)
    })
  }
}

const mutations = {
  [types.RECEIVE_SITE] (state, { site, loaded }) {
    state.loaded = loaded
    state.site = site
  },
  [types.RECEIVE_CHAPTER] (state, { chapter }) {
    state.chapter = chapter
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
