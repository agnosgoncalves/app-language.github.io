<template>
  <q-page>
    <h1 class="page-title container-md mg-center q-pa-lg">Aulas agendadas</h1>
    <div class="flex mg-center container-md q-pa-lg" id="account-schedule">
      <q-pull-to-refresh
        :handler="refresher"
        release-message="Atualizar histórico?"
        pull-message="Manter histórico"
        refresh-message="Atualizado..."
        class="">
        <card-schedule-lesson v-for="(schedule, key) in schedules" :key="key" :schedule="schedule" :user="auth">
        </card-schedule-lesson>
      </q-pull-to-refresh>
    </div>
  </q-page>
</template>

<style lang="stylus">
  #account-schedule
    .pull-to-refresh
      width 100%
</style>

<script>
import CardScheduleLesson from 'components/CardScheduleLesson'
export default {
  name: 'PageIndex',
  components: { CardScheduleLesson },
  data () {
    return {
      labels: this.$store.getters['input/labels'],
      auth: this.$store.getters['auth/get'],
      schedules: null
    }
  },
  mounted () {
    if (this.auth.type === 'student') {
      this.schedules = this.$store.getters['schedules/byStudent'](this.auth.id)
    } else {
      this.schedules = this.$store.getters['schedules/byTeacher'](this.auth.id)
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
