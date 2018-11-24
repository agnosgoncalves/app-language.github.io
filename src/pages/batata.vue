<template>
  <div>
    aqui
     <q-input
      v-model="form.email"
      @blur="$v.form.email.$touch"
      @keyup.enter="submit"
      :error="$v.form.email.$error"
    />
    <q-btn color="primary" @click="submit">Submit</q-btn>
  </div>
</template>

<script>
import { QSelect } from 'quasar'
import { required, email } from 'vuelidate/lib/validators'

export default {
  data () {
    return {
      form: {
        email: ''
      }
    }
  },
  validations: {
    form: {
      email: { required, email }
    }
  },
  components: {
    QSelect
  },
  methods: {
    submit () {
      this.$v.form.$touch()
      if (this.$v.form.$error) {
        this.$q.notify('Please review fields again.')
        return false
      }
    }
  }
}
</script>
