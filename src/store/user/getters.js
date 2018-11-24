export const hasEmail = (state) => (email) => {
  return state.data.find((user) => {
    if (user.email === email) return true
  })
}

export const hasCPF = (state) => (cpf) => {
  return state.data.find((user) => {
    if (user.cpf === cpf) return true
  })
}

export const getLanguage = (state, data, store) => (languageID) => {
  var languages = store.language.data
  return languages.find((language) => {
    if (language.id === languageID) return language
  })
}

export const get = (state) => (id) => {
  return state.data.find((user) => {
    if (user.id === id) {
      return user
    }
  })
}

export const all = (state) => {
  return state.data
}
