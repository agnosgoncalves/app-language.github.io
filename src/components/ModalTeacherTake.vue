<template>
  <q-modal minimized class="modal-find-teacher mg-center full-width" ref="modal">
    <div class="modal-header">
      <div class="profile row items-center justify-start">
        <div class="profile-image">
          <img :src="user.profile" alt="">
        </div>
        <div class="profile-info">
          <h2 class="profile-name text-weight-light q-title text-capitalize full-width">{{user.name}}</h2>
          <q-rating color="yellow" :max="5" readonly v-bind:value="avaliation.review" size="22px" class="no-shadow" />
        </div>
      </div>
      <q-btn  color="primary" flat class="full-width">{{user.name}} pegou sua aula</q-btn>
    </div>
  </q-modal>
</template>
<style lang="stylus">
  .modal-find-teacher
    h1
      font-size 22px
      text-align center
      padding 0
      margin 0
    .modal-header
      border-bottom 1px solid #f2f2f2
</style>

<script>
export default {
  data () {
    return {
      avaliation: this.$store.getters['avaliation/get'](this.user.id)
    }
  },
  props: ['user'],
  methods: {
    show (state) {
      this.$refs.modal.show()
    },
    hide (state) {
      this.$refs.modal.hide()
    },
    onSubmit () {
    }
  },
  mounted () {
  }
}
</script>
