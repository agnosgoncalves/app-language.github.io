export const all = (state) => {
  return state.data
}

export const get = (state) => (languageID) => {
  return state.data.find((language) => {
    if (language.id === languageID) return language
  })
}
