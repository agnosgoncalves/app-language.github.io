<template>
  <q-modal minimized class="modal-markers" ref="modal">
   markers:
   {{markers}}
  </q-modal>
</template>
<style lang="stylus">
  @import '~variables'
  .modal-markers
    .card-map-lesson
      width 99%
      margin 0 auto
      margin-bottom 5px
    .card-map-badge
      color white
      padding 5px
      border-radius 5px
      background $blue
      font-size 11px
    .box-info,
    .type-info
      margin-bottom 5px
      .q-caption
        margin-left 5px
    .type-name
      margin-left 5px
      &:after
        content ' ou'
        text-transform lowercase
      &:last-child
        &:after
          display none
    .student-name
      margin-left 5px
      &:after
        content ','
      &:last-child
        &:after
          display none
    .date-from
      font-size 12px
    .map-status
      margin-left 5px
    .p-not
      padding-left 0 !important
    h1.q-title
      font-size 16px
      padding 0
      display block
      margin 0
    .modal-nav
      position absolute
      right 0px
</style>
<script>
import {gmapApi} from 'vue2-google-maps'
export default {
  data () {
    return {
    }
  },
  computed: {
    google: gmapApi
  },
  props: ['markers'],
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
