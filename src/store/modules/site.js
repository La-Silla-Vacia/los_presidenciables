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
  comparing: false,
  comparingFirst: null,
  comparingSecond: null,
  maquinaria: []
}

const getters = {
  getItems: () => (uid, collection = state.site) => {
    return collection
  },
  getChapters: () => () => {
    return [
      {text: 'LO QUE PROPONEN'},
      {text: 'LA MAQUINARIA QUE TIENEN'},
      {text: 'LO QUE HAN GASTADO'},
      {text: 'CÓMO LOS BUSCAN'},
      {text: 'TEST DE CARACTER'}
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
  getCandidateByName: () => (name, collection = state.candidates) => {
    let result
    for (let i = 0; i < collection.length; i += 1) {
      if (collection[i].name === name) result = collection[i]
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
        result[resIndex].answers = result[resIndex].answers.concat(obj.answers)
      } else {
        result.push(obj)
      }
    }
    return result
  },
  getActiveChapter: () => (uid, collection = state.chapter) => {
    return collection
  },
  isComparing: (state) => (uid, collection = state) => {
    if (uid === 'first') {
      return collection.comparingFirst
    } else if (uid === 'second') {
      return collection.comparingSecond
    }
    return state.comparing
  },
  isLoaded: () => (url, loaded = state.loaded) => {
    return loaded
  },
  getDataUri: (uid, collection = state.settings) => {
    return collection.dataUri
  },
  getMaquinaria: () => (uid, collection = state.maquinaria) => {
    for (let i = 0; i < collection.length; i += 1) {
      if (collection[i].name === uid) {
        return collection[i]
      }
    }
  },
  getTest: () => (uid, collection = state.questions) => {
    return [
      {
        question: 'Pregunta redactada para responder con opción multiple?',
        answers: [
          {
            answer: 'Respuesta uno'
          },
          {
            answer: 'Respuesta dos'
          }
        ]
      },
      {
        question: 'Lorem Ipsum Dolor Sit Amet Consectetur Adipisicing?',
        answers: [
          {
            answer: 'Respuesta uno'
          },
          {
            answer: 'Respuesta dos'
          }
        ]
      },
      {
        question: 'Pregunta redactada para responder con opción multiple?',
        answers: [
          {
            answer: 'Respuesta uno'
          },
          {
            answer: 'Respuesta dos'
          }
        ]
      },
      {
        question: 'Pregunta redactada para responder con opción multiple?',
        answers: [
          {
            answer: 'Respuesta uno'
          },
          {
            answer: 'Respuesta dos'
          }
        ]
      },
      {
        question: 'Pregunta redactada para responder con opción multiple?',
        answers: [
          {
            answer: 'Respuesta uno'
          },
          {
            answer: 'Respuesta dos'
          }
        ]
      }
    ]
  }
}

const actions = {
  fetchContent () {
    const rawData = localStorage.getItem('presidenciables_data')
    if (rawData) {
      const obj = JSON.parse(rawData)
      this.commit(types.RECEIVE_SITE, {site: obj.value, loaded: true})
      const dateString = obj.timestamp
      const now = new Date().getTime().toString()

      if (dateString > now) {
        return
      }
    }

    Vue.http.get(getters.getDataUri()).then((response) => {
      const data = JSON.parse(response.bodyText)
      this.commit(types.RECEIVE_SITE, {site: data, loaded: true})

      const object = {value: data, timestamp: new Date().getTime()}
      localStorage.setItem('presidenciables_data', JSON.stringify(object))
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
    state.maquinaria = site.maquinaria || state.maquinaria
  },
  [types.RECEIVE_SETTINGS] (state, {settings}) {
    state.settings = settings
  },
  [types.RECEIVE_CHAPTER] (state, {chapter}) {
    state.chapter = chapter
  },
  [types.RECEIVE_COMPARE] (state, {active, first, second}) {
    state.comparing = active
    state.comparingFirst = first || state.comparingFirst
    state.comparingSecond = second || state.comparingSecond
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
