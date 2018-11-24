export const byLanguage = (state) => (languageID) => {
  return state.data.filter((level) => {
    if (level.language_id === languageID) {
      return level
    }
  })
}
