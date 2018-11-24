<template>
  <div>
    <q-modal minimized class="modal-find-teacher mg-center" ref="modal">
      <div class="modal-header" style="padding-top: 10px">
        <h1 class="q-title">Buscar aula</h1>
      </div>
      <form action="" class="full-width container-sm row" style="padding:10px">
        <q-field class="col-12 row" helper="convide amigos para participar da aula com você" count>
          <q-input float-label="email" v-model="email" name="email" @blur="$v.email.$touch" class="col-12 col-sm-6"/>
          <q-btn size="sm" color="primary" label="convidar" class="btn-invite" style="margin-top: 10px" @click="enviteFriend"/>
        </q-field>
        <div class="box-friends" v-if="friends && friends.length === 1">
          <h2 class="q-caption text-primary" style="margin-top: 20px; margin-bottom: 0">Convidados</h2>
          <span class="m" v-for="(fr, key) in friends" :key="key" @click="removeFriend(fr)">{{fr}}</span>
        </div>
         <div class="box-friends" v-if="friends && friends.length > 1">
          <h2 class="q-caption text-primary" style="margin-top: 20px; margin-bottom: 0">Convidados</h2>
          <span class="m" v-for="(fr, key) in friends" :key="key" @click="removeFriend(fr)" v-if="key > 0 ">{{fr}}</span>
          <span v-else>
            <div class="profile-min-image">
              <img src="assets/img/avatar-02.png" alt="">
              <q-tooltip anchor="bottom middle" self="top middle" :offset="[10, 10]">
                {{fr}} aceitou o convite
              </q-tooltip>
            </div>
          </span>
        </div>
        <div class="row col-12 flex flex-center justify-between">
          <q-field class="col-12 col-sm-6">
            <q-select
              v-model="lngSelect"
              float-label="Escolha um idioma"
             :options="optionsLanguages"
            />
          </q-field>
          <div class="col-12 col-sm-5">
            <q-datetime color="primary" style="margin-top: 20px" v-if="$q.theme === 'mat'" v-model="date2" type="time" format24h float-label="Horário da aula" />
          </div>
        </div>
        <q-btn size="md" color="green" label="buscar" class="block full-width" style="margin-top: 10px" @click="onFindTeacher"/>
      </form>
    </q-modal>
    <modal-teacher-take ref="modalTeacherTake" :user="teacher"></modal-teacher-take>
  </div>
</template>
<style lang="stylus">
  .modal-find-teacher
    @import '~variables'
    h1
      font-size 22px
      text-align center
      padding 0
      margin 0
    .modal-header
      border-bottom 1px solid #f2f2f2
    .btn-invite
      right 10px
      position absolute
    .box-friends
      word-break break-all
      .m
        color $black
        margin-right 5px
        font-size 12px
        cursor pointer
        float left
        &:last-child
          &:after
            display none
        &:before
          content ' x '
          color red
        &:after
          content ','
      .profile-min-image
        overflow hidden
        width 40px
        height 40px
        border-radius 50%
        cursor pointer
        margin-right 10px
        float left
        img
          width 100%
</style>

<script>
import ModalTeacherTake from 'components/ModalTeacherTake'
export default {
  data () {
    return {
      teacher: this.$store.getters['user/get'](1),
      labels: this.$store.getters['input/labels'],
      helpers: this.$store.getters['input/helpers'],
      languages: this.user.languages,
      optionsLanguages: [],
      email: '',
      friends: [],
      lngsCheck: '',
      date2: '',
      lngSelect: '',
      error: {
        email: ''
      }
    }
  },
  components: {ModalTeacherTake},
  validations () {
    return this.$store.getters['input/validations'](['email'])
  },
  watch: {
    email () {
      // this.error.email = this.$store.getters['input/errors']('email', this.$v)
    }
  },
  props: ['user'],
  methods: {
    show (state) {
      this.$refs.modal.show()
    },
    hide (state) {
      this.$refs.modal.hide()
    },
    onSubmit () {
      this.$refs.modal.hide()
      this.$emit('onSubmit')
    },
    addZero (i) {
      if (i < 10) {
        i = '0' + i
      }
      return i
    },
    enviteFriend () {
      if (!this.$v.$invalid) {
        var hasFriend = this.friends.find((fr) => {
          if (fr === this.email) {
            return fr
          }
        })
        if (!hasFriend) {
          this.friends.push(this.email)
          this.email = ''
        } else {
          this.errorMessage('Usuário já convidado')
        }
      }
    },
    removeFriend (email) {
      this.friends.find((fr, i) => {
        if (fr === email) {
          this.friends.splice(i, 1)
        }
      })
    },
    dateTime () {
      var d = new Date()
      var h = this.addZero(d.getHours())
      var m = this.addZero(d.getMinutes())
      var s = this.addZero(d.getSeconds())
      return h + ':' + m + ':' + s
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
    cancelFind () {
    },
    onFindTeacher () {
      var initDate = this.dateTime()
      var btnCancel = '<br/><a style="color:red; cursor:pointer;" @click="cancelFind">CANCELAR</a>'
      this.$refs.modal.hide()
      this.$router.push('/')
      this.$q.loading.show({
        delay: 400,
        message: 'Buscando professor...'
      })
      var stop = setInterval(() => {
        var currentDate = this.dateTime()
        this.$q.loading.show({
          delay: 400,
          message: 'Buscando professor<br/> Inicio:' + initDate + '<br/> Atual:' + currentDate + btnCancel
        })
      }, 1000)
      setTimeout(() => {
        clearInterval(stop)
        this.$q.loading.hide()
        this.$refs.modalTeacherTake.show()
      }, 5000)
    }
  },
  mounted () {
    this.languages.map((lng) => {
      this.optionsLanguages.push({
        label: lng.label,
        value: lng.id
      })
    })
    this.lngSelect = this.optionsLanguages[0].value
  }
}
</script>
