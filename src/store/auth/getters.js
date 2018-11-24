import { LocalStorage } from 'quasar'
export const getLevelLesson = (state, {getLanguage}, store) => (levelLessonID) => {
  var levels = store.levelLesson.data
  return levels.find((level) => {
    if (level.id === levelLessonID) {
      level.language = getLanguage(level.language_id)
      return level
    }
  })
}
export const getLanguage = (state, data, store) => (languageID) => {
  var languages = store.language.data
  return languages.find((language) => {
    if (language.id === languageID) return language
  })
}

export const getBanker = (state, data, store) => (userID) => {
  var accounts = store.userBK.data
  return accounts.find((account) => {
    if (account.user_id === userID) return account
  })
}

export const get = (state, {getLevelLesson, getLanguage, getBanker}, store) => {
  var email = LocalStorage.get.item('user_email')
  return store.user.data.find((user) => {
    user.languages = user.lngs.map((id) => {
      return getLanguage(id)
    })
    if (user.email === email) {
      if (user.type === 'student') {
        user.levelLesson = user.lv_lesson.map((lvID) => {
          return getLevelLesson(lvID)
        })
        user.language = getLanguage(user.levelLesson.language_id)
      } else {
        user.banker = getBanker(user.id)
      }
      return user
    }
  })
}
