<template>
  <div>
    <q-layout view="lHh Lpr lFf" v-if="auth">
      <div></div>
      <q-layout-header>
        <q-toolbar
          color="primary"
        >
          <q-toolbar-title>
            <router-link to="/account">
              App Idiomas
            </router-link>
            <div slot="subtitle">Versão{{ $q.version }}</div>
          </q-toolbar-title>
          <q-btn
            flat
            dense
            round
            @click="leftDrawerOpen = !leftDrawerOpen"
            aria-label="Menu"
          >
            <q-icon name="menu" />
          </q-btn>
        </q-toolbar>
      </q-layout-header>

      <q-layout-drawer
        side="right"
        v-model="leftDrawerOpen"
        :content-class="$q.theme === 'mat' ? 'bg-white' : null"
      >
          <q-list
            no-border
            link
            inset-delimiter
          >
          <q-list-header>
            <profile :user="auth"></profile>
          </q-list-header>
          <router-link to="/account/profile">
            <q-item>
              <q-item-side icon="people" />
              <q-item-main label="Dados pessoais" sublabel="lore summer dummmer" />
            </q-item>
          </router-link>
          <router-link to="/account/banker" v-if="auth.type === 'teacher'">
             <q-item>
              <q-item-side icon="credit_card" />
              <q-item-main label="Dados bancários" sublabel="Dados validados"  v-if="auth.banker && auth.banker.status === 'accept'"/>
              <q-item-main label="Dados bancários" sublabel="Dados aguardando aprovação"  v-else-if="auth.banker && auth.banker.status === 'pending'"/>
               <q-item-main label="Dados bancários" sublabel="Adicione seus dados bancários"  v-else/>
            </q-item>
          </router-link>
          <router-link to="/account/book">
            <q-item>
              <q-item-side icon="book" />
              <q-item-main label="Apostilas de estudo" sublabel="lore summer dummmer" />
            </q-item>
          </router-link>
          <router-link to="/account/schedules">
            <q-item>
              <q-item-side icon="alarm" />
              <q-item-main label="Aulas agendadas" sublabel="Visualize as aulas marcadas" />
            </q-item>
          </router-link>
          <router-link to="/account/history">
            <q-item>
              <q-item-side icon="history" />
              <q-item-main label="Histórico de aulas" sublabel="lore summer dummmer" />
            </q-item>
          </router-link>
          <router-link to="/account/settings">
          <q-item>
            <q-item-side icon="settings" />
            <q-item-main label="Outras ações" sublabel="Configuraçoes da plataforma" />
          </q-item>
          </router-link>
          <div class="nav-abs">
            <q-item v-if="auth.type === 'teacher'">
              <q-btn @click="findStudent" size="md" color="primary" icon="school" class="btn full-width" label="Encontrar alunos"/>
            </q-item>
            <q-item  v-if="auth.type === 'student'">
              <q-btn @click="$refs.modalFindTeacher.show()" size="md" color="primary" icon="school" class="btn full-width" label="Buscar professor"/>
            </q-item>
            <router-link to="/account/points" v-if="auth.type === 'student'">
              <q-item>
                <q-btn size="md" icon="attach_money" class="btn full-width bg-green text-white" label="Comprar pontos"/>
              </q-item>
            </router-link>
          </div>
        </q-list>
      </q-layout-drawer>
      <q-page-container>
        <router-view />
      </q-page-container>
    </q-layout>
    <modal-find-teacher ref="modalFindTeacher" :user="auth" ></modal-find-teacher>
    <modal-warning btn="cadastrar" :msg="modalMSG1" ref="modalWarningNotStatus" @onAction="redirectURL('/account/banker')"></modal-warning>
    <modal-warning btn="altera dados" :msg="modalMSG2" ref="modalWarningStatusCanceled" @onAction="redirectURL('/account/banker')"></modal-warning>
  </div>
</template>

<script>
import Error404 from 'pages/Error404'
import Profile from 'components/Profile'
import ModalWarning from 'components/ModalWarning'
import ModalFindTeacher from 'components/ModalFindTeacher'
import ModalTeacherTake from 'components/ModalTeacherTake'

export default {
  name: 'MyLayout',
  components: {Profile, Error404, ModalWarning, ModalFindTeacher, ModalTeacherTake},
  data () {
    return {
      teacher: this.$store.getters['user/get'](1),
      leftDrawerOpen: this.$q.platform.is.desktop,
      auth: this.$store.getters['auth/get'],
      modalMSG1: 'Você precisa cadastrar uma conta bancária para que possa recebe pelas aulas',
      modalMSG2: 'Seus dados bancários não estão validos, por favor preecher novamente',
      schedules: ''
    }
  },
  methods: {
    redirectURL (url) {
      location.assign(location.origin + url)
    },
    displayAction (action) {
      this.$q.localStorage.set('action', action)
      location.assign(location.origin + '/account')
    },
    findStudent () {
      if (location.pathname === '/account/banker') {
      } else if (!this.auth.banker || this.auth.banker.status === '') {
        this.$q.notify({
          icon: 'warning',
          message: this.modalMSG1
        })
      } else if (this.auth.banker.status === 'pending') {
        this.$q.notify({
          icon: 'warning',
          message: 'Estamos validando sua conta bancária para que possa receber pelas aulas'
        })
      } else if (this.auth.banker.status === 'canceled') {
        this.$q.notify({
          icon: 'warning',
          message: this.modalMSG2
        })
      } else if (!this.auth.teacher_data.certificated === false) {
        this.$q.notify({
          icon: 'warning',
          message: 'Preencha todos seus dados pessoais, para ganhar nosso certificado'
        })
      }
      this.$router.push('/')
    }
  },
  mounted () {
    if (this.auth.type === 'student') {
      this.schedules = this.$store.getters['schedules/byStudent'](this.auth.id)
    } else {
      this.schedules = this.$store.getters['schedules/byTeacher'](this.auth.id)
    }
    if (!this.auth) {
      location.assign(location.origin + '/welcome')
    } else if (this.auth.type === 'teacher') {
      if (location.pathname === '/account/banker') {
      } else if (!this.auth.banker || this.auth.banker.status === '') {
        this.$refs.modalWarningNotStatus.show()
      } else if (this.auth.banker.status === 'canceled') {
        this.$refs.modalWarningStatusCanceled.show()
      } else if (!this.auth.teacher_data.certificated === false) {
        this.$q.notify({
          icon: 'warning',
          message: 'Preencha todos seus dados pessoais, para ganhar nosso certificado'
        })
      }
    }
  }
}
</script>

<style lang="stylus">
  @import '~variables'
  .nav-abs
    position absolute
    width 100%;
    bottom 0
  .q-layout-drawer
    max-height 100vh
    .q-item
      &:hover
        color $blue
        .q-item-sublabel,
        .q-item-side
          color $blue
</style>
