<template>
  <q-page class="flex flex-center account-map">
    <q-btn size="md" color="primary" class="btn-view-list" v-if="auth.type === 'teacher'" @click="changeModel" >
      <span v-if="viewMode === 'map'">Visualizar em lista</span>
      <span v-else>Visualizar mapa</span>
    </q-btn>
     <q-btn size="md" color="primary" class="btn-view-list" v-if="auth.type === 'student'" @click="$refs.modalFindTeacher.show()">
      <span>buscar professor</span>
    </q-btn>
    <q-btn size="sm" color="primary" icon="filter" label="filtrar" class="btn-filter" @click="isOpenFilter=true" v-show="!isOpenFilter" v-if="auth.type === 'teacher'"/>
    <div class="map-box-filter shadow-2 row flex justify-between" :data-open="isOpenFilter" v-if="auth.type === 'teacher'">
      <q-btn size="md" flat icon="close" class="text-red btn-filter-close" style="float:right;" @click="isOpenFilter=false"></q-btn>
      <q-field class="col-12 col-sm-2">
        <q-input type="number" v-model="maxStudents" float-label="Número de alunos" />
      </q-field>
      <q-field float-label="Tipo de aula" class="col-12 col-sm-2">
        <q-select
          v-model="selectFilter"
          float-label="Tipo da aula"
         :options="optionsFilter"
        />
      </q-field>
        <q-field float-label="Idioma" class="col-12 col-sm-3">
        <q-select
          v-model="selectLng"
          float-label="Idioma"
         :options="optionLng"
         class="text-capitalize"
        />
      </q-field>
      <q-field class="col-12 col-sm-2">
        <q-input type="number" v-model="kms" float-label="Aréa de atuação" suffix="Kms"/>
      </q-field>
      <div class="col-12 col-sm-1 row flex flex-center justify-end" style="margin-top: 10px">
        <div class="full-width">
          <q-btn size="sm" label="filtrar" class="full-width" color="green" @click="onFilter"/>
        </div>
      </div>
    </div>
    <GmapMap ref="mapRef"
      class="map-main"
      :center="currentPosition"
      :zoom="mapData.config.zoom"
      v-bind:options="mapData.options"
      :map-type-id="mapData.config.type"
      style="width: 100%; height: 100%"
      v-show="viewMode === 'map'"
      >
      <GmapMarker
        :key="index"
        v-for="(m, index) in markers"
        :position="m.position"
        :clickable="true"
        @click="markerClick(m)"
        :icon='m.icon'
      />
    </GmapMap>
    <div class="map-marker-list row flex justify-between" v-show="viewMode === 'list'">
      <div class="col-12 col-sm-4" v-for="(m, key) in markers" :key="key" v-if="m.type === 'student'">
        <card-map-class @onCatch="onCatch" :classe="$store.getters['map/find'](m.class_id)" :origin="origin" :destination="m.position" :ref="'cardMapClass'+m.class_id"></card-map-class>
      </div>
    </div>
    <modal-map-class ref="modalMapClass" :classe="classData" :origin="origin" :destination="destination" @onCatch="onCatch"></modal-map-class>
    <modal-find-teacher ref="modalFindTeacher" :user="auth" ></modal-find-teacher>
  </q-page>
</template>

<style lang="stylus">
  @import '~variables'
  .btn-view-list
    display block
    position fixed
    margin 0 auto
    bottom 10px
    z-index 100
  .account-map
    position relative
    .map-main
      position absolute
      width 100%;
      height 100%
    .map-box-filter
      background white
      position absolute
      z-index 1
      top 20px
      width 90%
      padding 10px
      box-sizing border-box
      left 0
      right 0
      margin 0 auto
  .btn-filter
    width 100%
    padding 10px 0
    display none
  .btn-filter-close
    display inline
    position absolute
    right 0
    top 0
  .map-marker-list
    width 90%
    margin-top 50px
  .desktop
    .btn-filter-close
      display none
    .map-marker-list
      .card-map-class
        width 100%
  .mobile
    .btn-filter
      display block
      position fixed
      z-index 1
      top 50px
      left 0
    .map-box-filter
      display none
      position fixed
      top 100px
      &[data-open="true"]
        display flex
</style>

<script>
import FormAccount from 'components/FormAccount'
import modalFindTeacher from 'components/modalFindTeacher'
import ModalMapClass from 'components/ModalMapClass'
import CardMapClass from 'components/CardMapClass'
import {gmapApi} from 'vue2-google-maps'
export default {
  name: 'PageAccount',
  data () {
    return {
      viewMode: 'map',
      isOpenFindBarTeacher: true,
      selectFilter: 'all',
      selectLng: 'all',
      kms: 1,
      maxStudents: 5,
      optionsFilter: [
        {
          label: 'Todas',
          value: 'all'
        },
        {
          label: 'Presencial',
          value: 'presencial'
        },
        {
          label: 'Online',
          value: 'online'
        }
      ],
      mapData: this.$store.getters['map/get'],
      auth: this.$store.getters['auth/get'],
      currentPosition: {
        lat: 0,
        lng: 0
      },
      origin: {lat: 1, lng: 1},
      destination: {lat: 1, lng: 1},
      markers: [{}],
      isOpenFilter: false,
      classData: null,
      optionLng: [
        {
          label: 'Todos',
          value: 'all'
        }
      ]
    }
  },
  components: { FormAccount, gmapApi, ModalMapClass, CardMapClass, modalFindTeacher },
  computed: {
    google: gmapApi
  },
  methods: {
    onCatch (sch) {
      this.$emit('onCatch', sch)
    },
    changeModel () {
      this.viewMode = this.viewMode === 'list' ? 'map' : 'list'
    },
    successMessage (msg) {
      this.$q.notify({
        type: 'positive',
        icon: 'check_circle',
        message: msg
      })
    },
    errorMessage (msg) {
      this.$q.notify({
        icon: 'warning',
        message: msg
      })
    },
    onFilter () {
      this.$q.loading.show({
        delay: 400,
        message: 'Filtrando dados...'
      })
      setTimeout(() => {
        this.$q.loading.hide()
        this.successMessage('Dados atualizados')
      }, 2000)
      this.isOpenFilter = false
    },
    generatorMarkets (position, type) {
      var qnt = 2
      var markers = []

      for (let i = 0; i <= qnt; i++) {
        var user = this.$store.getters['user/get'](i + 1)
        var rand = Math.floor(Math.random() * (1000 - 1000 + 1000)) + 100
        var rand2 = Math.floor(Math.random() * (1000 - 1000 + 1000)) + 100
        var lat = position.lat + Number(1 / rand)
        var lng = position.lng + Number(1 / rand2)
        markers.push({
          position: {lat, lng},
          user_id: user.id,
          icon: 'assets/img/' + type + '-point.png',
          type: type,
          class_id: i + 1
        })
      }
      markers.push({
        position: position,
        user_id: this.auth.id,
        icon: 'assets/img/' + this.auth.type + '-point.png',
        type: this.auth.type,
        class_id: 5
      })
      return markers
    },
    markerClick (marker) {
      if (marker.type === 'student' && marker.class_id) {
        var self = this
        this.currentPosition = marker.position
        navigator.geolocation.getCurrentPosition(function (position) {
          self.origin.lng = position.coords.longitude
          self.origin.lat = position.coords.latitude
          self.destination = marker.position
          self.classData = self.$store.getters['map/find'](marker.class_id)
          self.$refs.modalMapClass.show()
        })
      }
    }
  },
  watch: {
    viewMode () {
      if (this.viewMode === 'list') {
        this.markers.map((m) => {
          if (m.type !== this.auth.type) {
            var card = this.$refs['cardMapClass' + m.class_id][0]
            card.updateMetrics()
          }
        })
      }
    }
  },
  mounted () {
    var self = this
    this.auth.languages.map((lng) => {
      this.optionLng.push({
        label: lng.label,
        value: lng.id
      })
    })
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(function (position) {
        self.currentPosition.lat = position.coords.latitude
        self.currentPosition.lng = position.coords.longitude
        if (self.auth.type === 'teacher') {
          self.markers = self.generatorMarkets(self.currentPosition, 'student')
        } else {
          self.markers = self.generatorMarkets(self.currentPosition, 'teacher')
        }
        self.classData = self.$store.getters['map/find'](self.markers[0].class_id)
      })
    }
    this.$refs.mapRef.$mapPromise.then((map) => {
      map.center.lat(this.currentPosition.lat)
      map.center.lng(this.currentPosition.lng)
    })
    var action = this.$q.localStorage.get.item('action')
    if (action === 'findTeacher') {
      this.$q.localStorage.set('action', '')
    } else if (action === 'findStudent') {
      this.$q.localStorage.set('action', '')
    }
  }
}
</script>
