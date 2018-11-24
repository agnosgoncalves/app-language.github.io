<template>
  <q-modal minimized class="modal-forget-pass" ref="modal">
    <div style="padding: 20px">
      <div class="q-display-1 q-mb-md q-title text-center text-blue">Esqueci minha senha</div>
      <q-field helper="Um email será enviado para o seguinte destinatário">
        <q-input float-label="email" type="text" :value="email" readonly/>
      </q-field>
      <br/>
      <div class="row flex flex-center">
        <q-btn color="primary" label="Enviar nova senha" @click="onSubmit"/>
        <q-btn flat color="red" v-close-overlay label="Cancelar" />
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
  props: ['email'],
  methods: {
    show (state) {
      this.$refs.modal.show()
    },
    hide (state) {
      this.$refs.modal.hide()
    },
    onSubmit () {
      this.$refs.modal.hide()
      this.$emit('onSubmit')
    }
  }
}
</script>
