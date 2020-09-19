import Vue from 'vue'
import Vuex from 'vuex'
import UserSessionModule from './user-session.module'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: { UserSessionModule }
})
