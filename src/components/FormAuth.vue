<template>
  <div class="form-auth">
    <q-btn size="lg" class="btn full-width btn-facebook" label="facebook" @click="authFacebook"/>
    <q-btn size="lg" class="btn full-width btn-gmail" label="gmail" @click="authGmail"/>
    <q-btn size="lg" class="btn full-width btn-twitter" label="twitter" @click="authTwitter"/>
    <q-btn size="lg" class="btn full-width btn-register" label="user email e senha" @click="onClick"/>
  </div>
</template>
<style lang="stylus">
  .btn
    margin-bottom 5px;
  .btn-facebook
    background-color #3b5999;
    color white;
  .btn-gmail
    background-color #d44638;
    color white;
  .btn-twitter
    background-color #1da1f2;
    color white;
  .btn-register
    color black
    background-color white
</style>

<script>

export default {
  data () {
    return {
    }
  },
  methods: {
    onClick () {
      this.$emit('onClick')
    },
    authFacebook () {
      var user = { name: 'user', password: '12345678', email: 'professor@hotmail.com' }
      if (this.$store.getters['user/hasEmail'](user.email)) {
        this.$emit('onAuth', 'facebook', user)
      } else {
        this.$emit('onAuthError', 'facebook', user)
      }
    },
    authGmail () {
      var user = { name: 'user', password: '12345678', email: 'email@gmail.com.br' }
      if (this.$store.getters['user/hasEmail'](user.email)) {
        this.$emit('onAuth', 'gmail', user)
      } else {
        this.$emit('onAuthError', 'gmail', user)
      }
    },
    authTwitter () {
      var user = { name: 'user', password: '12345678', email: 'email@twitter.com.br' }
      if (this.$store.getters['user/hasEmail'](user.email)) {
        this.$emit('onAuth', 'twitter', user)
      } else {
        this.$emit('onAuthError', 'twitter', user)
      }
    }
  }
}
</script>
