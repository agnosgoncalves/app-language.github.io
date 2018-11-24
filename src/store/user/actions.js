export const register = ({state, commit}, user) => {
  user.id = state.data.length + 1
  commit('create', user)
  return user
}

export const accountProfileUpdate = ({state, commit}, user) => {
  return commit('update', user)
}

export const buyPoints = ({state, commit}, prop) => {
  return commit('patch', prop)
}

export const uploadCurriculum = ({state, commit}, prop) => {
  return commit('updateCurriculum', prop)
}
