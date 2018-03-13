import Vue from 'vue'
import * as types from '../mutation-types'

const state = {
  site: {},
  loaded: false,
  themes: {},
  questions: [],
  chapter: 'LO QUE PROPONEN',
  candidates: [],
  settings: {},
  comparing: true
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
      'TEST DE CARACTER'
    ]
  },
  getThemes: () => (uid, collection = state.themes) => {
    return collection
  },
  getQuestionByTheme: (state, getters) => (theme, collection = state.questions) => {
    let result
    const currentTheme = theme || state.themes.active
    for (let i = 0; i < collection.length; i += 1) {
      const question = collection[i]
      if (question.theme === currentTheme) {
        result = question
      }
    }
    return result
  },
  getCandidates: () => (uid, collection = state.candidates) => {
    return collection
  },
  getCandidateByUid: () => (uid, collection = state.candidates) => {
    let result
    for (let i = 0; i < collection.length; i += 1) {
      if (collection[i].id === uid) result = collection[i]
    }
    return result
  },
  getAnswerByCandidate: (state, getters) => (candidate, collection = state.themes) => {
    const currentTheme = collection.active
    const question = getters.getQuestionByTheme(currentTheme)
    const result = question.answers.filter((answer) => {
      if (answer.candidate === candidate) return true
    })
    return result[0]
  },
  getAnswersByCandidate: (state, getters) => (candidate, collection = state.questions) => {
    const result = []
    for (let i = 0; i < collection.length; i += 1) {
      const question = collection[i]
      let obj = {theme: question.theme, answers: []}

      // check if the theme already exists
      let resIndex = 0
      const res = result.filter((item, index) => {
        if (item.theme === question.theme) {
          resIndex = index
          return true
        }
      })

      for (let j = 0; j < question.answers.length; j += 1) {
        const answer = question.answers[j]
        if (answer.candidate === candidate) {
          obj.answers.push(answer)
        }
      }

      if (res.length) {
        result[resIndex].answers.concat(obj.answers)
      } else {
        result.push(obj)
      }
    }
    return result
  },
  getActiveChapter: () => (uid, collection = state.chapter) => {
    return collection
  },
  isComparing: () => (uid, collection = state.comparing) => {
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
      this.commit(types.RECEIVE_SITE, {site: data, loaded: true})
    }, (error) => {
      console.log(error.statusText)
    })
  }
}

const mutations = {
  [types.RECEIVE_SITE] (state, {site, loaded, theme}) {
    state.loaded = loaded || state.loaded
    state.themes = {
      active: theme || site.themes[0] || state.themes.active,
      items: site ? site.themes : state.themes.items
    }
    state.questions = site ? site.questions : state.questions
    state.candidates = site ? site.candidates : state.candidates
  },
  [types.RECEIVE_SETTINGS] (state, {settings}) {
    state.settings = settings
  },
  [types.RECEIVE_CHAPTER] (state, {chapter}) {
    state.chapter = chapter
  },
  [types.RECEIVE_THEME] (state, {theme}) {
    state.site.themes.active = theme
  },
  [types.RECEIVE_COMPARE] (state, payload) {
    state.comparing = payload
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
