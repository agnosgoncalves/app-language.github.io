<template>
  <q-page>
    <h1 class="page-title container-md mg-center q-pa-lg">Histórico de aulas</h1>
    <div class="flex mg-center container-md q-pa-lg" id="account-history">
      <q-pull-to-refresh
        :handler="refresher"
        release-message="Atualizar histórico?"
        pull-message="Manter histórico"
        refresh-message="Atualizado..."
        class="">
        <card-history-lesson v-for="(history, key) in histories" :key="key" :history="history" :user="auth">
        </card-history-lesson>
      </q-pull-to-refresh>
    </div>
  </q-page>
</template>

<style lang="stylus">
  #account-history
    .pull-to-refresh
      width 100%
</style>

<script>
import CardHistoryLesson from 'components/CardHistoryLesson'
export default {
  name: 'PageIndex',
  components: { CardHistoryLesson },
  data () {
    return {
      labels: this.$store.getters['input/labels'],
      auth: this.$store.getters['auth/get'],
      histories: null
    }
  },
  mounted () {
    if (this.auth.type === 'student') {
      this.histories = this.$store.getters['historyLesson/byStudent'](this.auth.id)
    } else {
      this.histories = this.$store.getters['historyLesson/byTeacher'](this.auth.id)
    }
  },
  methods: {
    logout () {
      this.$store.dispatch('auth/logout').then(() => {
        var url = location.href.split('#')[0]
        location.assign(url + '/#/welcome')
      })
    },
    refresher (done) {
      done()
      this.$q.notify({
        type: 'positive',
        icon: 'check_circle',
        message: this.labels.form.success.general
      })
    }
  }
}
</script>
