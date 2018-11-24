<template>
  <q-page class="flex flex-center" v-if="!auth">
    <q-stepper ref="stepper" class="container-sm stepper-auth">
      <q-step default title="acesso" name="auth-option">
        <form-auth @onAuth="onAuth" @onAuthError="onAuthError" @onClick="onAuthDefault"></form-auth>
      </q-step>
      <q-step title="login" name="auth-default">
        <form-login @onSuccess="onAuth"></form-login>
      </q-step>
    </q-stepper>
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
import FormLogin from 'components/FormLogin'
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
  components: { FormAuthTypeUser, FormLogin, FormAuth },
  methods: {
    onAuth (type, data) {
      this.user = data
      this.login(this.user, (user) => {
        location.assign(location.origin)
      })
    },
    onAuthError () {
      this.$q.notify({
        icon: 'warning',
        message: 'usuário não existe'
      })
    },
    onAuthDefault () {
      this.$refs.stepper.goToStep('auth-default')
    },
    login (user, callback) {
      this.$store.dispatch('auth/login', user).then((user) => {
        if (callback && user) callback(user)
      })
    }
  },
  mounted () {
    if (this.auth.id) {
      location.assign(location.origin)
    }
  }
}
</script>
