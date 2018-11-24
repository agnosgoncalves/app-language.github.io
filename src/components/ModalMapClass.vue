<template>
  <q-modal minimized class="modal-map-class" ref="modal">
    <div class="row justify-end modal-nav">
      <q-btn icon="close" class="" color="red" label="" flat v-close-overlay />
    </div>
    <card-map-class :classe="classe" :origin="origin" :destination="destination" ref="cardMapClass" @onCatch="onCatch"></card-map-class>
  </q-modal>
</template>
<style lang="stylus">
  .modal-map-class
    .card-map-lesson
      box-shadow 0 0 0 0
    .modal-nav
      position absolute
      right 0
</style>
<script>
import CardMapClass from 'components/CardMapClass'
export default {
  data () {
    return {
    }
  },
  props: ['classe', 'origin', 'destination'],
  components: { CardMapClass },
  methods: {
    show (state) {
      this.$refs.modal.show()
      this.$refs.cardMapClass.updateData(this.classe)
    },
    hide (state) {
      this.$refs.modal.hide()
    },
    onSubmit () {
      this.$emit('onSubmit')
    },
    onCatch (sch) {
      this.$refs.modal.hide()
      this.$emit('onCatch', sch)
    }
  }
}
</script>
