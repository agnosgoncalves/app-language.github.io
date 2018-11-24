<template>
  <q-page>
    <h1 class="page-title container-md mg-center q-pa-lg">Dados bancários</h1>
    <div class="flex container-md mg-center q-pa-lg" id="account-profile">
      <form-banker :user="auth"></form-banker>
    </div>
  </q-page>
</template>

<style>
</style>

<script>
import FormBanker from 'components/FormBanker'
export default {
  name: 'PageAccount',
  data () {
    return {
      auth: this.$store.getters['auth/get']
    }
  },
  components: { FormBanker }
}
</script>
