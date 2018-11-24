<template>
  <q-page>
    <h1 class="page-title container-md mg-center q-pa-lg">Apostilas</h1>
    <div class="flex container-md mg-center q-pa-lg" id="account-book">
      <q-list>
        <q-collapsible class="text-capitalize" :label="language.label" v-for="(language, key) in languages" :key="key" :separator="true">
          <collapsible-books :lng="language"></collapsible-books>
        </q-collapsible>
      </q-list>
    </div>
  </q-page>
</template>

<style lang="stylus">
  @import '~variables'
  #account-book
    padding-top 0
    .q-list
      width 100%
      height 100%
      padding 0
    .q-item-icon
      color white
    .q-item
      background $blue
      color white
    .q-collapsible-sub-item
      padding 0
    .collapsible-books
      .q-list
        width 100%
        padding 0
      .q-item
        background white
        color $blue
      .q-item-icon
        color $blue
      .btn-book
        margin-bottom 5px
        .q-btn-inner
          justify-content flex-start
</style>

<script>
import CollapsibleBooks from 'components/CollapsibleBooks'
export default {
  name: 'PageIndex',
  components: { CollapsibleBooks },
  data () {
    return {
      auth: this.$store.getters['auth/get']
    }
  },
  computed: {
    languages () {
      return this.auth.lngs.map((id) => {
        return this.$store.getters['language/get'](id)
      })
    }
  }
}
</script>
