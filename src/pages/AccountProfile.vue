<template>
  <q-page>
    <h1 class="page-title container-md mg-center q-pa-lg">Dados pessoais</h1>
    <div class="flex container-md mg-center q-pa-lg" id="account-profile">
      <form-account :user="auth"></form-account>
    </div>
  </q-page>
</template>

<style>
</style>

<script>
import FormAccount from 'components/FormAccount'
export default {
  name: 'PageAccount',
  data () {
    return {
      auth: this.$store.getters['auth/get']
    }
  },
  components: { FormAccount }
}
</script>
