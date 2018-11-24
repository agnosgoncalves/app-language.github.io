export const byLevel = (state) => (languageID, level) => {
  return state.data.filter((book) => {
    if (book.language_id === languageID && book.lv === level) {
      return book
    }
  })
}
