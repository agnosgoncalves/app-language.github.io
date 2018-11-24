import * as maps from 'vue2-google-maps'

export default ({ Vue }) => {
  Vue.use(maps, {
    load: {
      key: 'AIzaSyD9Dm2ZwEZlYuZvon4-kKVM3aM9UYrqsGE',
      libraries: 'places,drawing,visualization'
    },
    autobindAllEvents: true
  })
}
