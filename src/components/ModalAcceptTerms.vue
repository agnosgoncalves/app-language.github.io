<template>
  <q-modal  ref="modal" class="modal-accept-terms">
    <div class="container-md">
      <h1 class="q-display-1 q-title q-mb-md text-center text-primary">Termos de uso e privacidade</h1>
      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Esse facere necessitatibus omnis? Quos dolorum consequatur delectus eveniet placeat, sapiente odit numquam deleniti commodi consequuntur beatae maiores magni deserunt. Fugit, explicabo!</p>
      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Esse facere necessitatibus omnis? Quos dolorum consequatur delectus eveniet placeat, sapiente odit numquam deleniti commodi consequuntur beatae maiores magni deserunt. Fugit, explicabo!</p>
      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Esse facere necessitatibus omnis? Quos dolorum consequatur delectus eveniet placeat, sapiente odit numquam deleniti commodi consequuntur beatae maiores magni deserunt. Fugit, explicabo!</p>
      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Esse facere necessitatibus omnis? Quos dolorum consequatur delectus eveniet placeat, sapiente odit numquam deleniti commodi consequuntur beatae maiores magni deserunt. Fugit, explicabo!</p>
      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Esse facere necessitatibus omnis? Quos dolorum consequatur delectus eveniet placeat, sapiente odit numquam deleniti commodi consequuntur beatae maiores magni deserunt. Fugit, explicabo!</p>
      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Esse facere necessitatibus omnis? Quos dolorum consequatur delectus eveniet placeat, sapiente odit numquam deleniti commodi consequuntur beatae maiores magni deserunt. Fugit, explicabo!</p>
      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Esse facere necessitatibus omnis? Quos dolorum consequatur delectus eveniet placeat, sapiente odit numquam deleniti commodi consequuntur beatae maiores magni deserunt. Fugit, explicabo!</p>
      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Esse facere necessitatibus omnis? Quos dolorum consequatur delectus eveniet placeat, sapiente odit numquam deleniti commodi consequuntur beatae maiores magni deserunt. Fugit, explicabo!</p>
      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Esse facere necessitatibus omnis? Quos dolorum consequatur delectus eveniet placeat, sapiente odit numquam deleniti commodi consequuntur beatae maiores magni deserunt. Fugit, explicabo!</p>
      <div class="row justify-end" v-if="!view">
        <q-btn class="col-12 col-md-4" color="red" label="não aceito" flat v-close-overlay />
        <q-btn class="col-12 col-md-4" color="primary" label="aceito os termos de uso" @click="acceptTerms"/>
      </div>
      <div class="row justify-end" v-else>
        <q-btn class="col-12" color="red" label="fechar" flat v-close-overlay />
      </div>
    </div>
  </q-modal>
</template>
<style lang="stylus">
  .modal-accept-terms
    & > div
      padding 20px 20px
</style>
<script>

export default {
  data () {
    return {
    }
  },
  props: ['view'],
  methods: {
    show (state) {
      this.$refs.modal.show()
    },
    acceptTerms () {
      this.$emit('OnAcceptTerms')
    }
  }
}
</script>
