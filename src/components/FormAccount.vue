<template>
  <div class="form-account container-md">
    <div class="form-account-info">
      <strong>Avaliação:</strong>
      <q-rating color="yellow" :max="5" readonly v-bind:value="avaliation.review" size="22px" class="no-shadow" />
      <span class="form-account-info-review-total">( {{avaliation.total}} )</span><br/>
      <strong>Pontos:</strong><span class="form-account-info-review-points">{{user.points}}</span><br/>
    </div>
    <div class="row flex justify-between">
      <div class="col-12 col-sm-8">
        <q-field :helper="helpers.name" :error="$v.name.$error" :error-label="error.name" count>
          <q-input :float-label="labels.name" type="text" v-model="name" @blur="$v.name.$touch" />
        </q-field>
      </div>
      <div class="col-12 col-sm-3">
        <q-field :helper="helpers.age" :error="$v.age.$error" :error-label="error.age" >
          <q-input :float-label="labels.age" type="number" v-model="age" @blur="$v.age.$touch" />
        </q-field>
      </div>
    </div>
    <div class="row flex justify-between">
      <div class="col-12 col-sm-6">
        <q-field :helper="helpers.email" :error="$v.email.$error" :error-label="error.email" count>
          <q-input :float-label="labels.email" type="email" v-model="email" @blur="$v.email.$touch" />
        </q-field>
      </div>
      <div class="col-12 col-sm-5">
        <q-field :helper="helpers.cpf" :error="$v.cpf.$error" :error-label="error.cpf" count>
          <q-input :float-label="labels.cpf" type="number" v-model="cpf" @blur="$v.cpf.$touch"/>
        </q-field>
      </div>
    </div>
    <q-field :label="labels.lngsCheck" :helper="helpers.lngsCheck" :error="!$v.lngsCheck.$model.length" :error-label="error.lngsCheck" class="field-checkbox">
      <q-checkbox v-for="(lng, key) in languages" :key="key" :label="lng.label" v-model="lngsCheck" :val="lng.id" @click="$v.lngsCheck.$touch" />
    </q-field>
    <div v-if="user.type === 'teacher'">
      <div class="form-account-info __separator">
        <h1 class="q-caption text-blue">Certifique-se na plataforma</h1>
        <p>Por favor preencha todos esses campos corretamente para que possamos certifica-lo em nossa plataforma. Os professores com certificado tem prioridade nas buscas por alunos.</p>
      </div>
       <q-field :helper="helpers.time_experience" :error="$v.time_experience.$error" :error-label="error.time_experience">
        <q-input :float-label="labels.time_experience" type="number" v-model="time_experience" @blur="$v.time_experience.$touch" :suffix="time_experience_suffix" />
      </q-field>
      <div class="row flex justify-between">
        <q-field class="col-12 col-sm-5" v-for="(lng, key) in user.languages" :key="key">
          <q-select
            v-model="selectSkillsSelected[key]"
            :float-label="'Qual seu nivel de '+lng.label"
            radio
           :options="selectSkillsOptions"
          />
        </q-field>
      </div>
      <q-uploader @finish="uploadFile" @add="addFile" color="amber" float-label="Curriculum" url="/assets/files/" extensions=".pdf" ref="inputUploadCurriculum"/>
        <a download :href="user.teacher_data.curriculum">
          <q-btn style="margin-top:10px;" icon="file_upload" size="md" color="primary" class="full-width btn-primary" label="Download do curriculum" v-show="user.teacher_data.curriculum"></q-btn>
        </a>
    </div>
    <q-btn size="md" color="green" class="full-width btn-primary" style="margin-top:20px;" :label="labels.btn.editAccount" @click="onSubmit"/>
    <modal-warning btn="não alterar" msg="Seu curriculum já foi certificado, se altera-lo perderá o selo de certificação, até a nova verificação da nossa equipe" ref="modalWarningCurriculum" @onAction="abortUpload"></modal-warning>
  </div>
</template>
<style lang="stylus">
  .form-account
    .field-checkbox .q-field-label-inner
      color black
    .form-account-info
      strong
        margin-right 5px
      &.__separator
        h1
          font-size 22px
          margin-top 60px
    .form-account-info-review-total
      font-size 12px
    .form-account-info-review-points
      background $blue
      border-radius 5px
  .q-field-content
    margin-top 20px
  .field-checkbox
    margin-top 20px
    .q-option
      margin-right 20px
    & > .row
      display block
</style>

<script>
import ModalWarning from 'components/ModalWarning'
export default {
  data () {
    return {
      cpf: this.user.cpf,
      name: this.user.name,
      email: this.user.email,
      age: this.user.age,
      time_experience: '',
      time_experience_suffix: 'anos',
      curriculum: '',
      lngsCheck: '',
      languages: this.$store.getters['language/all'],
      avaliation: this.$store.getters['avaliation/get'](this.user.id),
      selectSkillsSelected: [],
      selectSkillsOptions: [
        {
          label: 'Básico',
          value: 1
        },
        {
          label: 'Intermediário',
          value: 2
        },
        {
          label: 'Avançado',
          value: 3
        },
        {
          label: 'Fluente',
          value: 4
        },
        {
          label: 'Nativo',
          value: 5
        }
      ],
      error () {
        var role = {
          cpf: '',
          email: '',
          name: '',
          age: '',
          lngsCheck: ''
        }
        if (this.user.type === 'teacher') {
          role.time_experience = ''
        }
        return role
      },
      labels: this.$store.getters['input/labels'],
      helpers: this.$store.getters['input/helpers']
    }
  },
  components: { ModalWarning },
  props: {
    user: null
  },
  validations () {
    var validators = ['cpf', 'name', 'email', 'age', 'lngsCheck']
    if (this.user.type === 'teacher') {
      validators.push('time_experience')
    }
    return this.$store.getters['input/validations'](validators)
  },
  methods: {
    formData () {
      var data = {
        id: this.user.id,
        cpf: this.cpf,
        name: this.name,
        email: this.email,
        age: this.age,
        lngs: this.lngsCheck
      }
      return data
    },
    successMessage (msg) {
      this.$q.notify({
        type: 'positive',
        icon: 'check_circle',
        message: msg
      })
    },
    errorMessage (msg) {
      this.$q.notify({
        icon: 'warning',
        message: msg
      })
    },
    hasEmail (email) {
      return this.$store.getters['user/hasEmail'](email)
    },
    hasCPF (cpf) {
      return this.$store.getters['user/hasCPF'](cpf)
    },
    addFile () {
      if (this.user.type === 'teacher' && this.user.teacher_data.curriculum) {
        this.$refs.modalWarningCurriculum.show()
      }
    },
    uploadFile () {
      this.$store.dispatch('user/uploadCurriculum', {id: this.user.id, curriculum: '/assets/file/doc.pdf'}).then((data) => {
        this.successMessage('curriculum alterado com sucesso.')
      })
    },
    abortUpload () {
      this.$refs.inputUploadCurriculum.reset()
      this.$refs.modalWarningCurriculum.hide()
    },
    onSubmit () {
      var data = this.formData()
      if (!this.$v.$invalid) {
        if (this.user.cpf !== data.cpf && this.hasCPF(data.cpf)) {
          this.errorMessage('CPF já registrado')
        } else if (this.user.email !== data.email && this.hasEmail(data.email)) {
          this.errorMessage('Email já registrado')
        } else {
          this.$store.dispatch('user/accountProfileUpdate', data).then((user) => {
            this.$q.notify({
              type: 'positive',
              icon: 'check_circle',
              message: this.labels.form.success.general
            })
          })
        }
      } else {
        this.$q.notify({
          icon: 'warning',
          message: this.labels.form.error.general
        })
      }
    }
  },
  watch: {
    cpf (value) {
      this.error.cpf = this.$store.getters['input/errors']('cpf', this.$v)
    },
    name () {
      this.error.name = this.$store.getters['input/errors']('name', this.$v)
    },
    email () {
      this.error.email = this.$store.getters['input/errors']('email', this.$v)
    },
    age () {
      this.error.age = this.$store.getters['input/errors']('age', this.$v)
    },
    lngsCheck () {
      this.error.lngsCheck = this.$store.getters['input/errors']('lngsCheck', this.$v)
    },
    time_experience () {
      if (this.time_experience <= 1) {
        this.time_experience_suffix = 'ano'
      } else {
        this.time_experience_suffix = 'anos'
      }
      this.error.time_experience = this.$store.getters['input/errors']('time_experience', this.$v)
    }
  },
  mounted () {
    this.lngsCheck = this.user.lngs
    if (this.user.type === 'teacher') {
      this.time_experience = this.user.teacher_data.time_experience
      this.curriculum = this.user.teacher_data.curriculum
    }
  }
}
</script>
