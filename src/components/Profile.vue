<template>
  <div class="profile row items-center justify-start">
    <div class="profile-image">
      <img :src="user.profile" alt="">
    </div>
    <div class="profile-info">
      <span class="profile-points text-weight" v-if="user.type == 'student'">
        <q-btn round size="md" color="primary" v-if="user.points">
          <q-tooltip anchor="bottom middle" self="top middle" :offset="[10, 10]">
            Pontos
          </q-tooltip>
          <span class="profile-points-value">{{user.points}}</span>
        </q-btn>
        <q-btn round size="md" color="faded"  float-label="esd" v-else>
          <q-tooltip anchor="center left" self="center right" :offset="[10, 10]">
            Compre pontos para que você possa fazer novas aulas.
          </q-tooltip>
          <span class="profile-points-value">{{user.points}}</span>
        </q-btn>
      </span>
      <span class="profile-selo" v-if="user.teacher_data">
        <q-btn round icon="check" size="sm" color="green" v-if="user.teacher_data.certificated">
          <q-tooltip anchor="bottom middle" self="top middle" :offset="[10, 10]">
            Usuário certificado.
          </q-tooltip>
        </q-btn>
        <q-btn round icon="check" size="sm" color="faded" v-else>
          <q-tooltip anchor="bottom middle" self="top middle" :offset="[10, 10]">
            Preencha todos seus dados pessoais para que possamos certifica-lo.
          </q-tooltip>
        </q-btn>
      </span>
      <h2 class="profile-name text-weight-light q-title text-capitalize">{{user.name}}</h2>
      <q-rating color="yellow" :max="5" readonly v-bind:value="avaliation.review" size="22px" class="no-shadow" />
    </div>
  </div>
</template>
<style lang="stylus">
  @import '~variables'
  .profile
    border-bottom 1px solid #f2f2f2
    padding-bottom 20px
    .profile-image
      border-radius 50%
      border 1px solid $faded
      background $faded
      width 70px
      height 70px
      margin-right 20px
      overflow hidden
      img
        width 100%
        display block
    .profile-info
      position relative
      h2
        margin 0
    .profile-selo,
    .profile-points
      color white
      position absolute
      top -20px
      left -40px
      z-index 2
    .profile-points-value
      width 100%
      position absolute
      margin-top 1px
      display block
      z-index 1
      text-align center
</style>

<script>
export default {
  data () {
    return {
      avaliation: this.$store.getters['avaliation/get'](this.user.id)
    }
  },
  props: ['user']
}
</script>
