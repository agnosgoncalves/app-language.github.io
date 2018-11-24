<template>
  <div class="form-banker container-sm">
    <div class="form-banker-info">
      <div v-if="this.user.banker.status === 'accept'">
        <strong>Status:</strong>
        <span class="status text-white bg-green">Valida</span>
        <span class="info">Os dados dessa conta estão validos, as tranferências bancarias serão feitas normalmente para você.</span>
      </div>
      <div v-else-if="this.user.banker.status === 'pending'">
        <strong>Status:</strong>
        <span class="status text-white bg-orange">Pendente</span>
        <span class="info">Os dados dessa conta ainda estao sendo validados, aguarde até validação.</span>
      </div>
      <div v-else-if="this.user.banker.status === 'canceled'">
        <strong>Status:</strong>
        <span class="status text-white bg-red">Cancelado</span>
        <span class="info">Os dados dessa conta não passaram pela validação, certifique que os dados estão corretos.</span>
      </div>
      <div v-else>
        <strong>Status:</strong>
        <span class="status text-white bg-primary">Sem conta.</span>
        <span class="info">Cadastre uma conta para que possa receber pelas suas aulas.</span>
      </div>
    </div>
    <q-field :helper="helpers.name_banker" :error="$v.name_banker.$error" :error-label="error.name_banker" count class="col-8">
      <q-input :float-label="labels.name_banker" type="text" v-model="name_banker" @blur="$v.name_banker.$touch"/>
    </q-field>
    <div class="row justify-between">
      <q-field :helper="helpers.account" :error="$v.account.$error" :error-label="error.account" count class="col-8">
        <q-input :float-label="labels.account" type="number" v-model="account" @blur="$v.account.$touch"/>
      </q-field>
      <q-field :helper="helpers.account_number" :error="$v.account_number.$error" :error-label="error.account_number" count class="col-3">
        <q-input :float-label="labels.account_number" type="number" v-model="account_number" @blur="$v.account_number.$touch"/>
      </q-field>
    </div>
    <div class="row justify-between">
      <q-field :helper="helpers.agency" :error="$v.agency.$error" :error-label="error.agency" count class="col-8">
        <q-input :float-label="labels.agency" type="number" v-model="agency" @blur="$v.agency.$touch"/>
      </q-field>
      <q-field :helper="helpers.agency_number" :error="$v.agency_number.$error" :error-label="error.agency_number" count class="col-3">
        <q-input :float-label="labels.agency_number" type="number" v-model="agency_number" @blur="$v.agency_number.$touch"/>
      </q-field>
    </div>
    <br/>
    <br/>
    <br/>
    <q-btn size="md" color="primary" class="full-width btn-primary" :label="labels.btn.updateData" @click="onSubmit"/>
    <q-modal minimized ref="modalForm">
      <div style="padding: 50px">
        <div class="q-display-1 q-mb-md q-title text-center text-red">Aviso!!!</div>
        <p class="text-center">{{formModalMessage}}</p>
        <div class="row flex flex-center">
          <q-btn color="primary" label="Alterar dados" @click="reSubmit"/>
          <q-btn flat color="red" v-close-overlay label="Fechar" />
        </div>
      </div>
    </q-modal>
  </div>
</template>
<style lang="stylus">
  .form-banker
    .form-banker-info
      & > div
        margin-bottom 10px
      .info
        font-size 12px
        font-weight 400
        display block
        margin-top 5px
      .status
        border-radius 5px
        padding 5px 10px
        font-weight bold
        font-size 12px
        margin-left 5px
</style>

<script>

export default {
  data () {
    return {
      formModalMessage: '',
      name_banker: this.user.banker.name,
      account: this.user.banker.account,
      account_number: this.user.banker.account_number,
      agency: this.user.banker.agency,
      agency_number: this.user.banker.agency_number,
      error: {
        name_banker: '',
        account: '',
        account_number: '',
        agency: '',
        agency_number: ''
      },
      labels: this.$store.getters['input/labels'],
      helpers: this.$store.getters['input/helpers']
    }
  },
  props: {
    user: null
  },
  validations () {
    return this.$store.getters['input/validations'](['name_banker', 'account', 'account_number', 'agency', 'agency_number'])
  },
  methods: {
    formData () {
      return {
        name: this.user.banker.name_banker,
        account: this.user.banker.account,
        account_number: this.user.banker.account_number,
        agency: this.user.banker.agency,
        agency_number: this.user.banker.agency_number,
        id: this.user.banker.id,
        user_id: this.user.id
      }
    },
    updateAccount (data) {
      this.$store.dispatch('userBK/update', data).then((banker) => {
        this.$q.notify({
          type: 'positive',
          icon: 'check_circle',
          message: this.labels.form.success.general
        })
      })
    },
    errorMessage (msg) {
      this.$q.notify({
        icon: 'warning',
        message: msg
      })
    },
    hasEmail (email) {
      return this.$store.getters['user/hasEmail'](email)
    },
    hasCPF (cpf) {
      return this.$store.getters['user/hasCPF'](cpf)
    },
    onSubmit () {
      if (this.$v.$invalid) {
        this.errorMessage(this.labels.form.error.general)
      } else if (this.user.banker.status === 'pending') {
        this.formModalMessage = 'Os dados da sua conta ainda estão sendo validados, tem certeza que deseja trocar essas dados ?'
        this.$refs.modalForm.show()
      } else if (this.user.banker.status === 'accept') {
        this.formModalMessage = 'Os dados da sua conta já foram validados, tem certeza que deseja trocar essas dados ?. Ficara impossibilitado de dar aulas até que essa nova conta seja validada.'
        this.$refs.modalForm.show()
      } else {
        var data = this.formData()
        this.updateAccount(data)
      }
    },
    reSubmit () {
      var data = this.formData()
      this.$refs.modalForm.hide()
      this.updateAccount(data)
    }
  },
  watch: {
    name_banker (value) {
      this.error.name_banker = this.$store.getters['input/errors']('name_banker', this.$v)
    },
    account (value) {
      this.error.account = this.$store.getters['input/errors']('account', this.$v)
    },
    account_number (value) {
      this.error.account_number = this.$store.getters['input/errors']('account_number', this.$v)
    },
    agency (value) {
      this.error.agency = this.$store.getters['input/errors']('agency', this.$v)
    },
    agency_number (value) {
      this.error.agency_number = this.$store.getters['input/errors']('agency_number', this.$v)
    }
  }
}
</script>
