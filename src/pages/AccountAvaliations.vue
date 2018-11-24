<template>
  <q-page class="flex flex-center">
    <form-account :user="auth"></form-account>
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
