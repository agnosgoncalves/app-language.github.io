<template>
  <q-page class="page-settings">
    <h1 class="page-title container-md mg-center q-pa-lg">Configurações</h1>
    <div class="mg-center row container-sm q-pa-lg" id="account-history">
      <q-btn flat size="md" color="primary" class="btn col-12 mg-center btn-contact" label="Fale conosco" @click="$refs.modalContact.show()"/>
      <q-btn flat size="md" color="primary" class="btn col-12 mg-center btn-forget-pass" label="Termos de uso" @click="$refs.modalAcceptTerms.show()"/>
      <q-btn flat size="md" color="primary" class="btn col-12 mg-center btn-forget-pass" label="Esqueci minha senha" @click="$refs.modalForgetPass.show()"/>
      <q-btn flat size="md" color="red" class="btn col-12 mg-center btn-logout" label="Sair da minha conta" @click="logout"/>
    </div>
    <modal-accept-terms ref="modalAcceptTerms" :view="true"></modal-accept-terms>
    <modal-forget-pass ref="modalForgetPass" :email="auth.email"></modal-forget-pass>
    <modal-contact ref="modalContact" :user="auth"></modal-contact>
  </q-page>
</template>

<style>
</style>

<script>
import ModalAcceptTerms from 'components/ModalAcceptTerms'
import ModalForgetPass from 'components/ModalForgetPass'
import ModalContact from 'components/ModalContact'
export default {
  name: 'PageIndex',
  data () {
    return {
      auth: this.$store.getters['auth/get']
    }
  },
  components: { ModalAcceptTerms, ModalForgetPass, ModalContact },
  methods: {
    logout () {
      this.$store.dispatch('auth/logout').then(() => {
        location.assign(location.origin + '/welcome')
      })
    }
  }
}
</script>
