import Vue from 'vue'
import Vuex from 'vuex'

import input from './input'
import auth from './auth'
import user from './user'
import userBK from './user_bk'
import language from './language'
import levelLesson from './level_lesson'
import historyLesson from './history_lesson'
import schedules from './schedules'
import book from './book'
import avaliation from './avaliation'
import map from './map'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    auth,
    user,
    userBK,
    avaliation,
    input,
    levelLesson,
    historyLesson,
    book,
    schedules,
    map,
    language
  }
})

export default store
