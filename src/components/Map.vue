<template>
  <div>
   <GmapMap ref="mapRef"
    :center="{lat:2000, lng:2000}"
    :zoom="10"
    map-type-id="terrain"
    style="width: 500px; height: 300px"
  >
    <GmapMarker
      :key="index"
      v-for="(m, index) in markers"
      :position="m.position"
      :clickable="true"
      :draggable="true"
      @click="center=m.position"
    />
  </GmapMap>
  </div>
</template>

<style>
</style>

<script>
export default {
  data () {
    return {
      markers: [{
        position: {lat: 2, lng: 1}
      }]
    }
  },
  mounted () {
    this.$refs.mapRef.$mapPromise.then((map) => {
      map.panTo({lat: 1.38, lng: 103.80})
    })
  }
}
</script>
