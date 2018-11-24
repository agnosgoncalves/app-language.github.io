<template>
  <q-modal maximized ref="modal" class="container-md mg-center modal-book">
    <div class="row justify-end">
      <q-btn icon="close" class="" color="red" label="fechar" flat v-close-overlay />
    </div>
    <div v-if="url">
      <embed :src="url" width="100%" height="900px" type='application/pdf'>
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
  props: ['url'],
  methods: {
    show (state) {
      this.$refs.modal.show()
    }
  }
}
</script>
