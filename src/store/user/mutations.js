export const create = (state, data) => {
  state.data.push(data)
  return data
}

export const update = (state, data) => {
  return state.data.find((user) => {
    if (user.id === data.id) {
      user.name = data.name
      user.lngs = data.lngs
      user.email = data.email
      user.cpf = data.cpf
      user.age = data.age
      return user
    }
  })
}

export const patch = (state, prop) => {
  return state.data.find((user) => {
    if (user.id === prop.id) {
      user[prop.name] = prop.value
      return user
    }
  })
}

export const updateCurriculum = (state, prop) => {
  return state.data.find((user) => {
    if (user.id === prop.id) {
      user.teacher_data.curriculum = 'assets/file/doc'
      user.teacher_data.certificated = false
    }
  })
}
