export const get = (state) => {
  return state
}

export const find = (state) => (id) => {
  return state.data.find((classe) => {
    if (classe.id === id) {
      return classe
    }
  })
}
