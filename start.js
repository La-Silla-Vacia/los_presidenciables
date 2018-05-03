/* global require,console */
var lsv = require('lsv-interactive-vue')
import Vue from 'vue'
import VueResource from 'vue-resource'

import App from './src/App'
import {sync} from 'vuex-router-sync'
import router from './src/router'
import store from './src/store'

const unsync = sync(store, router)

Vue.use(VueResource)

if (window.los_presidenciables__data.hasOwnProperty('singles')) {
  for (let i = 0; i < window.los_presidenciables__data.singles.length; i += 1) {
    const cur = window.los_presidenciables__data.singles[i]
    lsv(cur.id, (interactive) => {
      if (!interactive) {
        console.log('Interactive los_presidenciables not initiated. Exiting.')
        return
      }

      newInteractive(interactive.el, cur.page)
    }, true)
  }
} else {
  lsv('los_presidenciables', function (interactive) {
    'use strict'

    if (!interactive) {
      console.log('Interactive los_presidenciables not initiated. Exiting.')
      return
    }

    /* eslint-disable no-new */
    new Vue({
      el: interactive.el,
      router,
      store,
      template: '<App />',
      components: {
        App
      },
      destroyed () {
        unsync()
      }
    })
  }, true) // change this last param to true if you want to skip the DOM checks
}

function newInteractive (element, page) {
  /* eslint-disable no-new */
  new Vue({
    el: element,
    router,
    store,
    template: '<App :single="page" />',
    components: {
      App
    },
    props: {
      page: {
        default: page
      }
    },
    destroyed () {
      unsync()
    }
  })
}
