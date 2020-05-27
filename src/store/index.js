import Vue from 'vue'
import Vuex from 'vuex'
import pages from './pages/index.js';

Vue.use(Vuex)

export default new Vuex.Store({
  modules:{
    pages,
  }
})
