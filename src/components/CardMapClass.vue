<template>
  <q-card style="padding: 20px 5px 10px 5px" v-if="classe && language" class="card-map-lesson">
    <q-card-title class="flex flex-center" style="padding: 0 5px">
      <h1 class="q-title q-caption" style="color:black;">
        Aula de {{language.label}}
        <span class="card-map-badge text-capitalize">
          {{lesson.label}} - {{lesson.lv}}
        </span>
      </h1>
      <div v-if="auth.type === 'teacher'">
        <q-rating color="yellow" :max="5" readonly :value="reviewsTotal" size="14px" class="no-shadow"/>
        <span class="rating-total q-caption">({{avalTotal}})</span>
      </div>
      <br v-else/>
    </q-card-title>
    <q-card-main style="padding: 0 5px">
      <div class="type-info">
        <strong>Tipo de aula:</strong>
        <span v-for="(type, key) in classe.type" :key="key" class="type-name text-capitalize">{{type}}</span>
      </div>
      <div class="box-info">
        <strong>Participantes:</strong>
        <span v-for="(student, key) in students" :key="key" class="student-name text-capitalize">{{student.name}}</span>
      </div>
      <div class="box-info">
        <strong>Horário :</strong>
        <span class="type-name">{{classe.hour}}</span>
      </div>
      <div class="box-info">
        <strong>Tempo da aula:</strong>
        <span class="type-name">1 hora</span>
      </div>
    </q-card-main>
    <q-card-actions style="padding: 5px 0" v-if="travelDriving && travelDriving.rows[0].elements && travelDriving.rows[0].elements" class="row flex flex-end justify-between">
      <div class="col-6 col-sm-6">
        <q-btn size="sm" :label="travelDriving.rows[0].elements[1].duration.text+'/'+travelDriving.rows[0].elements[1].distance.text" flat dense icon="drive_eta" v-if="travelWalking && travelDriving.rows[0].elements[1].duration && travelWalking.rows[0].elements[1].distance" />
      </div>
      <div class="col-6 col-sm-6">
        <q-btn size="sm" :label="travelWalking.rows[0].elements[1].duration.text+'/'+travelWalking.rows[0].elements[1].distance.text" flat dense icon="people" v-if="travelWalking.rows[0].elements[1].duration && travelWalking.rows[0].elements[1].distance" />
      </div>
    </q-card-actions>
    <div v-if="auth.type === 'teacher'">
      <div class="row flex flex-center row" v-if="classe.type.length == 1">
        <q-btn class="col-12" color="green" label="pegar aula" @click="onSubmit(classe.type[0])"/>
      </div>
      <div class="row flex justify-center" v-else>
        <q-btn size="sm" class="col-12" color="green" label="pegar aula online" @click="onSubmit('online')" style="margin-bottom: 5px"/>
        <q-btn size="sm" class="col-12" color="green" label="pegar aula presencial" @click="onSubmit('presencial')"/>
      </div>
    </div>
    <div v-if="auth.type === 'student'">
      <q-btn size="sm" flat class="full-width" color="primary" label="aguardando professor"/>
      <q-btn size="sm" class="full-width" color="red" label="cancelar busca"/>
    </div>
  </q-card>
</template>
<style lang="stylus">
  @import '~variables'
  .card-map-lesson
      width 99%
      margin 0 auto
      margin-bottom 5px
      .card-map-badge
        color white
        padding 5px
        border-radius 5px
        background $blue
        font-size 11px
      .box-info,
      .type-info
        margin-bottom 5px
        .q-caption
          margin-left 5px
      .type-name
        margin-left 5px
        &:after
          content ' ou'
          text-transform lowercase
        &:last-child
          &:after
            display none
      .student-name
        margin-left 5px
        &:after
          content ','
        &:last-child
          &:after
            display none
      .date-from
        font-size 12px
      .map-status
        margin-left 5px
      .p-not
        padding-left 0 !important
      h1.q-title
        font-size 16px
        padding 0
        display block
        margin 0
      .modal-nav
        position absolute
        right 0px
</style>
<script>
import {gmapApi} from 'vue2-google-maps'
export default {
  data () {
    return {
      select: '',
      language: null,
      reviewsTotal: 0,
      avalTotal: 0,
      levelLesson: [],
      lesson: {},
      auth: this.$store.getters['auth/get'],
      students: [],
      travelDriving: {rows: [{ elements: [{}, {duration: {text: ''}, distance: {text: ''}}] }]},
      travelWalking: {rows: [{ elements: [{}, {duration: {text: ''}, distance: {text: ''}}] }]}
    }
  },
  computed: {
    google: function () {
      return gmapApi()
    }
  },
  props: ['classe', 'origin', 'destination'],
  methods: {
    show (state) {
      this.$refs.modal.show()
    },
    hide (state) {
      this.$refs.modal.hide()
    },
    onSubmit (type) {
      var date = new Date()
      var year = date.getFullYear()
      var month = date.getMonth()
      var day = date.getDate()
      var hourEnd = Number(this.classe.hour.split(':')[0]) + 1
      hourEnd += ':00'
      var data = {
        type: type,
        teacher_id: this.auth.id,
        students_id: [],
        level_lesson_id: this.lesson.lv,
        status: 'current',
        time_start: year + '-' + month + '-' + day + ' ' + this.classe.hour + ':00',
        time_end: year + '-' + month + '-' + day + ' ' + hourEnd + ':00'
      }
      this.students.map((student) => {
        data.students_id.push(student.id)
      })
      this.$store.dispatch('schedules/add', data).then((sch) => {
        this.$emit('onCatch', sch)
      })
    },
    updateMetrics () {
      var self = this
      var googleMap = this.google.maps
      var origin1 = new googleMap.LatLng(this.origin.lat, this.origin.lng)
      var origin2 = 'Brasil'
      var destinationA = 'Brasil'
      var destinationB = new googleMap.LatLng(this.destination.lat, this.destination.lng)
      var service = new googleMap.DistanceMatrixService()
      service.getDistanceMatrix({
        origins: [origin1, origin2],
        destinations: [destinationA, destinationB],
        travelMode: 'DRIVING',
        avoidHighways: true,
        avoidTolls: true
      }, (res, status) => {
        self.travelDriving = res
      })
      service.getDistanceMatrix({
        origins: [origin1, origin2],
        destinations: [destinationA, destinationB],
        travelMode: 'WALKING',
        avoidTolls: true,
        avoidHighways: true
      }, (res, status) => {
        self.travelWalking = res
      })
    },
    updateData (classe) {
      this.students = []
      this.levelLesson = []
      this.avalTotal = 0
      this.reviewsTotal = 0
      if (classe.users_id) {
        classe.users_id.map((id) => {
          var data = this.$store.getters['user/get'](id)
          this.students.push(data)
        })
        this.students.map((user) => {
          user.avaliation = this.$store.getters['avaliation/get'](user.id)
          this.reviewsTotal += user.avaliation.review
          this.avalTotal += user.avaliation.total
        })
      }
      this.reviewsTotal = this.reviewsTotal / this.students.length

      if (classe.language_id) {
        this.language = this.$store.getters['language/get'](classe.language_id)
        this.levelLesson = this.$store.getters['levelLesson/byLanguage'](classe.language_id)
        this.lesson = this.levelLesson.find((lv) => {
          if (lv.id === classe.lv_lesson_id) {
            return lv
          }
        })
      }
    }
  },
  watch: {
    destination () {
      this.updateMetrics()
    }
  },
  mounted () {
    if (this.classe !== null) {
      this.updateData(this.classe)
    }
    if (this.destination !== 1) {
      this.updateMetrics()
    }
  }
}
</script>
