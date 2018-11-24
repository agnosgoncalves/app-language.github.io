export default {
  data: [
    { id: 1,
      name: 'joao',
      cpf: '42239468801',
      age: 40,
      type: 'teacher',
      lngs: [1, 2],
      password: '12345678',
      email: 'professor@hotmail.com',
      profile: 'assets/img/avatar-02.png',
      teacher_data: {
        curriculum: 'assets/file/doc.pdf',
        time_experience: 15,
        lngs_skill: [{language_id: 1, value: 5}, {language_id: 2, value: 3}],
        certificated: true
      }
    },
    {id: 2, cpf: '42239468802', age: 22, type: 'student', lngs: [1, 2], lv_lesson: [2, 10], name: 'maria', points: 10, password: '12345678', email: 'aluno@hotmail.com', profile: 'assets/img/avatar-03.png'},
    {id: 3, cpf: '42239468803', age: 26, type: 'student', lngs: [2], lv_lesson: [2, 10], name: 'paulo', points: 0, password: '12345678', email: 'aluno2@hotmail.com', profile: 'assets/img/avatar-01.png'},
    { id: 4,
      name: 'maria',
      cpf: '42239468804',
      age: 40,
      type: 'teacher',
      lngs: [2],
      password: '12345678',
      email: 'professor2@hotmail.com',
      profile: 'assets/img/avatar-04.png',
      teacher_data: {
        curriculum: '',
        time_experience: '',
        lngs_skill: [],
        certificated: false
      }
    }
  ]
}
