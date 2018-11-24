export const update = (state, data) => {
  return state.data.find((banker) => {
    if (banker.id === data.id && banker.user_id === data.user_id) {
      banker.name = data.name
      banker.lngs = data.lngs
      banker.email = data.email
      banker.cpf = data.cpf
      banker.age = data.age
      banker.status = 'pending'
      return banker
    }
  })
}
