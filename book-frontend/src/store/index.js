import Vue from 'vue'
import Vuex from 'vuex'
import menu from './menuData'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    menu,
  },
})

export default store
