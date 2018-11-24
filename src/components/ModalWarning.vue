<template>
  <q-modal minimized class="modal-warning" ref="modal">
    <div style="padding: 20px 10px">
      <div class="q-display-1 q-mb-md q-title text-center text-red">Aviso!!!</div>
      <p class="text-center" style="max-width: 400px">{{msg}}</p>
      <div class="row flex flex-center">
        <q-btn color="primary" :label="btn || 'okay'" @click="$emit('onAction')"/>
        <q-btn flat color="red" v-close-overlay label="Fechar" />
      </div>
    </div>
  </q-modal>
</template>
<style lang="stylus">
  .modal-book
    width 96%
    max-height 70vh
    top 15vh
</style>
<script>

export default {
  data () {
    return {
    }
  },
  props: ['msg', 'btn'],
  methods: {
    show (state) {
      this.$refs.modal.show()
    },
    hide (state) {
      this.$refs.modal.hide()
    }
  }
}
</script>
