<template>
  <div class="card-schedule-lesson">
    <q-card>
      <q-card-title class="flex flex-center">
        <h1 class="q-title q-caption">
          Aula de {{schedule.levelLesson.language.label}}
          <span class="card-schedule-badge text-capitalize">
            {{schedule.levelLesson.label}} - {{schedule.levelLesson.lv}}
          </span>
        </h1>
      </q-card-title>
      <q-card-separator />
      <q-card-main>
        <div class="students-info">
          <strong>Aula:</strong>
          <span class="schedule-status text-capitalize text-secondary" v-if="schedule.type === 'presential'">Presencial</span>
          <span class="schedule-status text-capitalize text-primary" v-else>Online</span>
        </div>
        <div class="students-info">
          <strong>Status:</strong>
          <span class="schedule-status text-capitalize text-secondary" v-if="schedule.status === 'scheduled' || schedule.status === 'current'">Aguardando</span>
          <span class="schedule-status text-capitalize text-negative" v-else>Cancelado</span>
        </div>
        <div class="students-info">
          <strong>Data:</strong>
          <span class="q-caption">{{schedule.time_start | moment("DD/MM/YYYY") }}</span>
          <span class="q-caption">{{timeFrom}}</span>
        </div>
        <div class="students-info">
          <strong>Participantes:</strong>
          <span v-for="(student, key) in schedule.students" :key="key" class="student-name text-capitalize">{{student.name}}</span>
        </div>
      </q-card-main>
      <q-card-separator />
      <q-card-actions>
        <q-btn flat round dense icon="event"/>
        <q-btn flat color="primary" label="Tempo de aula" />
        <q-btn flat :label="time" class="p-not"/>
      </q-card-actions>
    </q-card>
  </div>
</template>
<style lang="stylus">
  @import '~variables'
  .card-schedule-lesson
    width 99%
    margin 0 auto
    margin-bottom 5px
  .card-schedule-badge
    color white
    padding 5px
    border-radius 5px
    background $blue
    font-size 11px
  .students-info
    .q-caption
      margin-left 5px
  .student-name
    margin-left 5px
    &:after
      content ','
    &:last-child
      &:after
        display none
  .date-from
    font-size 12px
  .schedule-status
    margin-left 5px
  .p-not
    padding-left 0 !important
  h1.q-title
    font-size 16px
    padding 0
    display block
    margin 0
</style>

<script>
import Profile from 'components/Profile'

export default {
  data () {
    return {
      hours: 0
    }
  },
  components: { Profile },
  props: ['schedule', 'user'],
  computed: {
    time () {
      var hours = Math.abs(this.$options.filters['moment'](this.schedule.time_start, 'diff', this.schedule.time_end, 'hours'))
      var minutes = Math.abs(this.$options.filters['moment'](this.schedule.time_start, 'diff', this.schedule.time_end, 'minutes'))
      var time = ''
      var tag = 'min'
      if (hours > 0) {
        time += hours + ':'
        minutes = minutes - (60 * hours)
        tag = 'hr'
        if (hours > 1) tag = 'hrs'
      } else {
        time += '00:'
      }
      if (minutes > 0) {
        time += minutes
      } else {
        time += '00'
      }
      return time + ' ' + tag
    },
    timeFrom () {
      var time = this.$options.filters['moment'](this.schedule.time_start, 'from')
      var timeFormat = time.replace('ago', 'atrás').replace('day', 'dia').replace('days', 'dias').replace('in', 'em').replace('hours', 'horas').replace('hour', 'hora').replace('an', 'a uma').replace('a dia', 'um dia')
      return timeFormat
    }
  }
}
</script>
