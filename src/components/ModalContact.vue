<template>
  <q-modal maximized class="modal-contact container-sm mg-center" ref="modal">
    <div style="padding: 20px 10px">
      <div class="q-display-1 q-mb-md q-title text-center text-blue">Fale conosco</div>
      <p class="text-center" style="max-width: 400px"></p>
      <q-field helper="Um email será enviado para o seguinte destinatário">
        <q-input float-label="email" type="text" v-model="user.email" readonly/>
      </q-field>
       <q-field float-label="assunto">
          <q-select
            v-model="select"
            float-label="Assunto"
           :options="options"
          />
        </q-field>
      <q-field>
        <q-input
          v-model="text"
          type="textarea"
          float-label="Comente"
          :max-height="100"
          rows="7"
          style="font-size: 12px"
        />
      </q-field>
      <br/>
      <div class="row flex flex-center row">
        <q-btn class="col-12 col-sm-6" color="primary" label="enviar" @click="onSubmit"/>
        <q-btn class="col-12 col-sm-6" flat color="red" v-close-overlay label="Fechar" />
      </div>
    </div>
  </q-modal>
</template>
<style lang="stylus">
  body.desktop
    .modal-contact
      width 96%
      max-height 70vh
      top 15vh
</style>
<script>

export default {
  data () {
    return {
      select: '',
      options: [
        {
          label: 'Dúvidas',
          value: 'duvidas'
        },
        {
          label: 'Errors',
          value: 'bugs'
        }
      ]
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
      this.$refs.modal.hide()
      this.$emit('onSubmit')
    }
  }
}
</script>
