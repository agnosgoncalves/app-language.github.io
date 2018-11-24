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

export const byStudent = (state, {getLevelLesson, getStudents}, store) => (studentID) => {
  return state.data.filter((schedule) => {
    schedule.students = []
    return schedule.students_id.find((id) => {
      if (studentID === id) {
        schedule.levelLesson = getLevelLesson(schedule.level_lesson_id)
        schedule.students = getStudents(schedule.students_id)
        return schedule
      }
    })
  })
}

export const byTeacher = (state, {getLevelLesson, getStudents}, store) => (teacherID) => {
  return state.data.filter((schedule) => {
    if (teacherID === schedule.teacher_id) {
      schedule.students = []
      schedule.levelLesson = getLevelLesson(schedule.level_lesson_id)
      schedule.students = getStudents(schedule.students_id)
      return schedule
    }
  })
}

export const current = (state) => {
  return state.data.find((sch) => {
    if (sch.status === 'current') return sch
  })
}
