<template>
  <form class="form-points">
    <h1 class="q-caption text-blue">Selecione os pacotes que deseja comprar</h1>
    <div class="row flex justify-between">
      <div class="col-12 col-sm-4">
        <q-field helper="Seu total de pontos futuro">
          <q-input float-label="Pontuação final" type="number" readonly v-model="pointsTotal"/>
        </q-field>
      </div>
      <div class="col-6 col-sm-4">
        <q-field :helper="helpers.pointsBuy" :error="$v.pointsBuy.$error" :error-label="error.pointsBuy">
          <q-input :float-label="labels.pointsBuy" type="number" v-model="pointsBuy" @blur="$v.pointsBuy.$touch" readonly/>
        </q-field>
      </div>
      <div class="col-5 col-sm-3">
        <q-field :helper="helpers.amountPoints" :error="$v.amountPoints.$error" :error-label="error.amountPoints">
          <q-input :float-label="labels.amountPoints" type="number" v-model="amountPoints" @blur="$v.amountPoints.$touch" readonly/>
        </q-field>
      </div>
    </div>
    <br/>
    <div class="row justify-end">
      <q-btn size="md" color="primary" class="btn-primary bg-green col-12 col-sm-3" :label="labels.btn.buy" @click="onSubmit"/>
    </div>
  </form>
</template>
<style lang="stylus">
  .form-points
    width 100%
    padding 40px 0
</style>

<script>

export default {
  data () {
    return {
      amountPoints: 0,
      pointsBuy: 0,
      pointsTotal: this.user.points,
      error: {
        amount: '',
        pointsBuy: ''
      },
      labels: this.$store.getters['input/labels'],
      helpers: this.$store.getters['input/helpers']
    }
  },
  props: ['user', 'points'],
  validations () {
    return this.$store.getters['input/validations'](['pointsBuy', 'amountPoints'])
  },
  methods: {
    formData () {
      return {
        amountPoints: this.amountPoints,
        pointsBuy: this.pointsBuy
      }
    },
    errorMessage (msg) {
      this.$q.notify({
        icon: 'warning',
        message: msg
      })
    },
    successMessage (msg) {
      this.$q.notify({
        type: 'positive',
        icon: 'check_circle',
        message: msg
      })
    },
    onSubmit () {
      if (!this.points.length) {
        this.errorMessage(this.labels.form.error.pointsBuyNotSelected)
      } else {
        this.$store.dispatch('user/buyPoints', {name: 'points', value: this.pointsTotal, id: this.user.id}).then((user) => {
          this.successMessage(this.labels.form.success.purchase)
          this.points = []
        })
      }
    }
  },
  watch: {
    amountPoints (value) {
      this.error.amountPoints = this.$store.getters['input/errors']('amountPoints', this.$v)
    },
    pointsBuy (value) {
      this.error.pointsBuy = this.$store.getters['input/errors']('pointsBuy', this.$v)
    },
    points () {
      this.amountPoints = 0
      this.pointsBuy = 0
      this.pointsTotal = this.user.points
      this.points.map((pointData) => {
        this.pointsBuy += Number(pointData.points)
        this.amountPoints += Number(pointData.value)
        this.pointsTotal += Number(pointData.points)
      })
    }
  }
}
</script>
