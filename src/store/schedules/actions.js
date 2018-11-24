export const add = ({state, commit}, schedule) => {
  schedule.id = state.data.length + 1
  commit('create', schedule)
  return schedule
}
