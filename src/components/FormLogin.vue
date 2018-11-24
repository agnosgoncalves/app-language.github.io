<template>
  <form>
    <q-field :helper="helpers.email" :error="$v.email.$error" :error-label="error.email" count>
      <q-input :float-label="labels.email" type="email" v-model="email" @blur="$v.email.$touch" />
    </q-field>
    <q-field :helper="helpers.password" :error="$v.password.$error" :error-label="error.password" count>
      <q-input :float-label="labels.password" type="password" v-model="password" @blur="$v.password.$touch" />
    </q-field>
    <br/>
    <q-btn size="md" color="primary" class="full-width btn-primary" :label="labels.btn.login" @click="onSubmit"/>
  </form>
</template>

<script>

export default {
  data () {
    return {
      email: null,
      password: null,
      error: {
        email: '',
        password: ''
      },
      labels: this.$store.getters['input/labels'],
      helpers: this.$store.getters['input/helpers']
    }
  },
  validations () {
    return this.$store.getters['input/validations'](['email', 'password'])
  },
  methods: {
    onSubmit () {
      this.$v.$touch()
      if (this.$v.$invalid) {
      } else if (!this.$store.getters['user/hasEmail'](this.email)) {
        this.$q.notify({
          icon: 'warning',
          message: 'email não registrado'
        })
      } else {
        this.$store.dispatch('auth/auth', {email: this.email, password: this.password}).then((user) => {
          if (user) {
            this.$emit('onSuccess', user)
          } else {
            this.$q.notify({
              icon: 'warning',
              message: 'senha invalida'
            })
          }
        })
      }
    }
  },
  watch: {
    email () {
      this.error.email = this.$store.getters['input/errors']('email', this.$v)
    },
    password () {
      this.error.password = this.$store.getters['input/errors']('password', this.$v)
    }
  }
}
</script>
