export const getLevelLesson = (state, {getLanguage}, store) => (levelLessonID) => {
  var levels = store.levelLesson.data
  return levels.find((level) => {
    if (level.id === levelLessonID) {
      level.language = getLanguage(level.language_id)
      return level
    }
  })
}
export const getStudents = (state, data, store) => (studentsID) => {
  var students = store.user.data
  return studentsID.map((id) => {
    return students.find((student) => {
      if (student.id === id) {
        return student
      }
    })
  })
}

export const getLanguage = (state, data, store) => (languageID) => {
  var languages = store.language.data
  return languages.find((language) => {
    if (language.id === languageID) return language
  })
}

export const getAvaliations = (state) => (avaliations) => {
  var review = 0
  var total = 0
  var len = avaliations.length
  // review avaliation
  for (let i = 0; i < len; i++) {
    review += avaliations[i].stars
  }
  if (avaliations.length) {
    total = len
    review = Math.floor(review / total)
  }
  return {
    review,
    total
  }
}

export const byStudent = (state, {getLevelLesson, getStudents, getAvaliations}, store) => (studentID) => {
  return state.data.filter((history) => {
    history.students = []
    return history.students_id.find((id) => {
      if (studentID === id) {
        history.levelLesson = getLevelLesson(history.level_lesson_id)
        history.students = getStudents(history.students_id)
        history.avaliations = getAvaliations(history.reviews)
        return history
      }
    })
  })
}

export const byTeacher = (state, {getLevelLesson, getStudents, getAvaliations}, store) => (teacherID) => {
  return state.data.filter((history) => {
    if (teacherID === history.teacher_id) {
      history.students = []
      history.levelLesson = getLevelLesson(history.level_lesson_id)
      history.students = getStudents(history.students_id)
      history.avaliations = getAvaliations(history.reviews)
      return history
    }
  })
}
