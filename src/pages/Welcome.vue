<template>
  <q-page class="flex flex-center welcome-page" v-if="!auth">
    <div class="container-sm">
      <h1 class="q-display-1 text-center text-white text-weight">Bem vindo</h1>
      <p class="text-center text-white">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus sunt at pariatur, doloremque ratione error quidem, ab ipsum quas, deserunt recusandae tenetur voluptates? Mollitia aut dolorem, assumenda distinctio cupiditate in!</p>
      <div class="flex flex-center md-width mg-center">
        <q-btn size="md" color="red" class="btn full-width block">
          <router-link to="/auth/login">Entrar</router-link>
        </q-btn>
        <br/>
        <br/>
        <br/>
        <span class="text-choose text-white">ou</span>
        <q-btn size="md" flat color="red" class="btn full-width block">
          <router-link to="/auth/register">cadastrar-se</router-link>
        </q-btn>
      </div>
    </div>
  </q-page>
</template>

<style lang='stylus'>
  @import '~variables'
  .welcome-page
    background url('/assets/img/bg/welcome.jpg') no-repeat center center
    background-size cover
    .container-sm
      z-index 1
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
</style>

<script>
export default {
  name: 'PageWelcome',
  data () {
    return {
      auth: this.$store.getters['auth/get']
    }
  },
  mounted () {
    if (this.auth) {
      location.assign(location.origin)
    }
  }
}
</script>
