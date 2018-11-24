<template>
  <form>
    <q-field :helper="helpers.email" :error="$v.email.$error" :error-label="error.email" count>
      <q-input :float-label="labels.email" type="email" v-model="email" @blur="$v.email.$touch" />
    </q-field>
    <q-field :helper="helpers.password" :error="$v.password.$error" :error-label="error.password" count>
      <q-input :float-label="labels.password" type="password" v-model="password" @blur="$v.password.$touch" />
    </q-field>
    <q-field :helper="helpers.repeatPassword" :error="$v.repeatPassword.$error" :error-label="error.repeatPassword" count>
      <q-input :float-label="labels.repeatPassword" type="password" v-model="repeatPassword" @blur="$v.repeatPassword.$touch" />
    </q-field>
    <br/>
    <q-btn size="md" color="primary" class="full-width btn-primary" :label="labels.btn.createAccount" @click="onSubmit"/>
  </form>
</template>

<script>

export default {
  data () {
    return {
      email: null,
      password: null,
      repeatPassword: null,
      error: {
        email: '',
        password: '',
        repeatPassword: ''
      },
      labels: this.$store.getters['input/labels'],
      helpers: this.$store.getters['input/helpers']
    }
  },
  validations () {
    return this.$store.getters['input/validations'](['email', 'password', 'repeatPassword'])
  },
  methods: {
    onSubmit () {
      this.$v.$touch()
      if (this.$v.$invalid) {
        this.$q.notify({
          icon: 'warning',
          message: this.labels.form.error.general
        })
      } else if (this.$store.getters['user/hasEmail'](this.email)) {
        this.$q.notify({
          icon: 'warning',
          message: this.labels.form.error.hasEmail
        })
      } else {
        this.$emit('onRegister', {email: this.email, password: this.password})
      }
    }
  },
  watch: {
    email () {
      this.error.email = this.$store.getters['input/errors']('email', this.$v)
    },
    password () {
      this.error.password = this.$store.getters['input/errors']('password', this.$v)
    },
    repeatPassword () {
      this.error.repeatPassword = this.$store.getters['input/errors']('repeatPassword', this.$v)
    }
  }
}
</script>
