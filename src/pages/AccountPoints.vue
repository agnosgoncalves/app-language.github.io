<template>
  <q-page>
    <h1 class="page-title container-md mg-center q-pa-lg">Comprar pontos</h1>
    <div class="flex container-md mg-center q-pa-lg" id="account-profile">
      <table-points @onSelect="onSelect"></table-points>
      <form-points :user="auth" :points="points"></form-points>
    </div>
  </q-page>
</template>

<style>
</style>

<script>
import FormPoints from 'components/FormPoints'
import TablePoints from 'components/TablePoints'
export default {
  name: 'PagePoints',
  data () {
    return {
      auth: this.$store.getters['auth/get'],
      points: null
    }
  },
  components: {TablePoints, FormPoints},
  methods: {
    onSelect (points) {
      this.points = points
    }
  }
}
</script>
