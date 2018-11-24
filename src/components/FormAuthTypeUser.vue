<template>
  <div class="form-auth-type-user">
    <q-btn size="lg" color="primary" class="full-width" label="professor" @click="chooseType('teacher')"/>
    <span class="full-width " style="text-align:center; display:block; margin:5px 0;"> - ou - </span>
    <q-btn size="lg" color="primary" class="full-width" label="aluno" @click="chooseType('student')"/>
  </div>
</template>

<script>

export default {
  data () {
    return {
    }
  },
  methods: {
    chooseType (type) {
      this.$emit('onChoose', type)
    }
  }
}
</script>
