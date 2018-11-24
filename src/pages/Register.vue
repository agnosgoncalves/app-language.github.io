<template>
  <q-page class="flex flex-center" v-if="!auth">
    <q-stepper ref="stepper" class="container-sm stepper-auth">
      <q-step default title="1" name="auth-option">
        <form-auth @onAuth="onAuth" @onAuthError="onAuthError" @onClick="onRegister"></form-auth>
      </q-step>
      <q-step title="" name="auth-register">
        <form-register @onRegister="onRegister"></form-register>
      </q-step>
      <q-step title="" name="auth-choose-type-user">
        <form-auth-type-user @onChoose="onChoose"></form-auth-type-user>
      </q-step>
      <q-step title="" name="auth-choose-language">
        <p class="caption" v-show="userType == 'student'">Quais idioma deseja estudar?</p>
        <p class="caption" v-show="userType == 'teacher'">Quais idioma deseja ensinar?</p>
        <q-checkbox v-for="(lng, key) in lngs" :key="key" :label="lng.label" v-model="lngsChecked" :val="lng.id" style="margin-right: 10px"></q-checkbox>
        <br/>
        <br/>
        <q-btn v-show="lngsChecked.length" size="md" color="primary" class="full-width btn-primary" label="Finalizar cadastro" @click="openModal"/>
      </q-step>
    </q-stepper>
    <modal-accept-terms ref="modal" @OnAcceptTerms="onSubmit"></modal-accept-terms>
  </q-page>
</template>

<style lang='stylus'>
  @import '~variables'
  #q-app
    background url('/assets/img/bg/welcome.jpg') no-repeat center center
    background-size cover
    &:before
      content ''
      width 100%
      height 100%
      background $blue
      position absolute
      top 0
      left 0
      display block
      opacity 0.9
  .stepper-auth
    background white
</style>

<script>
import FormAuthTypeUser from 'components/FormAuthTypeUser'
import FormAuth from 'components/FormAuth'
import FormRegister from 'components/FormRegister'
import ModalAcceptTerms from 'components/ModalAcceptTerms'
export default {
  name: 'PageAuth',
  data () {
    return {
      user: {
      },
      userType: null,
      lngsChecked: [],
      auth: this.$store.getters['auth/get'],
      lngs: this.$store.getters['language/all']
    }
  },
  components: { FormAuthTypeUser, FormRegister, FormAuth, ModalAcceptTerms },
  methods: {
    onAuth (type, data) {
      if (type !== 'default') { // if social register
        this.$q.notify({
          icon: 'warning',
          message: 'usuário já cadastrado'
        })
      } else {
        this.$refs.stepper.goToStep('auth-choose-type-user')
        this.user = data
      }
    },
    onAuthError (type, data) {
      if (type !== 'default') { // if social register
        this.$refs.stepper.goToStep('auth-choose-type-user')
        this.user = data
      } else {
        alert()
      }
    },
    formData (user) {
      return {
        name: '',
        email: this.user.email,
        type: this.userType,
        lngs: this.lngsChecked,
        password: this.user.password,
        cpf: '',
        profile: ''
      }
    },
    onRegister (user) {
      this.user = user
      this.$refs.stepper.next()
    },
    onChoose (type) {
      this.userType = type
      this.$refs.stepper.goToStep('auth-choose-language')
    },
    openModal () {
      this.$refs.modal.show()
    },
    register (user, callback) {
      this.$store.dispatch('user/register', user).then((user) => {
        if (user && callback) callback(user)
        else {
          this.$q.notify({
            icon: 'warning',
            message: 'erro de cadastro'
          })
        }
      })
    },
    authenticate (user, callback) {
      this.$store.dispatch('auth/auth', user).then((user) => {
        if (user && callback) callback(user)
        else {
          this.$q.notify({
            icon: 'warning',
            message: 'erro de autenticação'
          })
        }
      })
    },
    login (user, callback) {
      this.$store.dispatch('auth/login', user).then((user) => {
        if (user && callback) callback(user)
        else {
          this.$q.notify({
            icon: 'warning',
            message: 'erro de login'
          })
        }
      })
    },
    onSubmit () {
      if (!this.$store.getters['user/hasEmail'](this.user.email)) {
        var data = this.formData()
        this.register(data, (userRegister) => {
          this.authenticate(userRegister, (userAuth) => {
            this.login(userAuth, (userLogin) => {
              location.assign(location.origin)
            })
          })
        })
      } else {
        this.$q.notify({
          icon: 'warning',
          message: 'email já cadastrado'
        })
      }
    }
  },
  mounted () {
    if (this.auth) {
      location.assign(location.origin)
    }
  }
}
</script>
