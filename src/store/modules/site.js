import Vue from 'vue'
import * as types from '../mutation-types'

const state = {
  site: {},
  loaded: false,
  chapter: 'LO QUE PROPONEN',
  settings: {}
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
  getThemes: () => (uid, collection = state.site.themes) => {
    return collection
  },
  getActiveChapter: () => (uid, collection = state.chapter) => {
    return collection
  },
  isLoaded: () => (url, loaded = state.loaded) => {
    return loaded
  },
  getDataUri: (uid, collection = state.settings) => {
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
    state.site.themes = {
      active: site.themes[0],
      items: site.themes
    }
    state.site.questions = site.questions
    state.site.candidates = site.candidates
  },
  [types.RECEIVE_SETTINGS] (state, { settings }) {
    state.settings = settings
  },
  [types.RECEIVE_CHAPTER] (state, { chapter }) {
    state.chapter = chapter
  },
  [types.RECEIVE_THEME] (state, { theme }) {
    state.site.themes.active = theme
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
