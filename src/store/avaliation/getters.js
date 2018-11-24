export const get = (state) => (userID) => {
  var review = 0
  var total = 0
  var updatedAt = 0
  var avaliations = state.data.filter((avaliation) => {
    if (avaliation.user_id === userID) return avaliation
  })
  // review avaliation
  for (let aval of avaliations) {
    review += aval.stars
  }
  if (avaliations.length) {
    total = avaliations.length
    review = Math.floor(review / avaliations.length)
    updatedAt = avaliations[0].created_at
  }
  return {
    review,
    total,
    avaliations,
    updated_at: updatedAt
  }
}
