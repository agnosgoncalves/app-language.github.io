import { LocalStorage } from 'quasar'
export const login = (state, userAuth) => {
  state.commit('set', userAuth)
  return true
}
export const logout = (state, userAuth) => {
  state.commit('set', {})
  LocalStorage.remove('user_email')
  return true
}
export const auth = (state, userAuth) => {
  var users = state.rootState.user.data
  var auth = users.find((user) => {
    if (userAuth.email === user.email && userAuth.password === user.password) return true
  })
  if (auth) {
    LocalStorage.set('user_email', auth.email)
  }
  return auth
}
