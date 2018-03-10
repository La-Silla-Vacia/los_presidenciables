/*global require,console*/
var lsv = require('lsv-interactive-vue');
import Vue from 'vue'
import VueResource from 'vue-resource'

import App from './src/App'
import { sync } from 'vuex-router-sync'
import router from './src/router'
import store from './src/store'

const unsync = sync(store, router)

Vue.use(VueResource)

lsv("los_presidenciables", function (interactive) {
  "use strict";

  if (!interactive) {
    console.log("Interactive los_presidenciables not initiated. Exiting.");
    return;
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

}, true); // change this last param to true if you want to skip the DOM checks
