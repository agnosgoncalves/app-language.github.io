export default {
  options: {
    styles: [
      {
        'elementType': 'geometry',
        'stylers': [
          {
            'color': '#f5f5f5'
          }
        ]
      },
      {
        'elementType': 'labels.icon',
        'stylers': [
          {
            'visibility': 'on'
          }
        ]
      },
      {
        'elementType': 'labels.text.fill',
        'stylers': [
          {
            'color': '#616161'
          }
        ]
      },
      {
        'elementType': 'labels.text.stroke',
        'stylers': [
          {
            'color': '#f5f5f5'
          }
        ]
      },
      {
        'featureType': 'administrative.land_parcel',
        'elementType': 'labels.text.fill',
        'stylers': [
          {
            'color': '#bdbdbd'
          }
        ]
      },
      {
        'featureType': 'poi',
        'elementType': 'geometry',
        'stylers': [
          {
            'color': '#eeeeee'
          }
        ]
      },
      {
        'featureType': 'poi',
        'elementType': 'labels.text.fill',
        'stylers': [
          {
            'color': '#757575'
          }
        ]
      },
      {
        'featureType': 'poi.park',
        'elementType': 'geometry',
        'stylers': [
          {
            'color': '#e5e5e5'
          }
        ]
      },
      {
        'featureType': 'poi.park',
        'elementType': 'labels.text.fill',
        'stylers': [
          {
            'color': '#9e9e9e'
          }
        ]
      },
      {
        'featureType': 'road',
        'elementType': 'geometry',
        'stylers': [
          {
            'color': '#ffffff'
          }
        ]
      },
      {
        'featureType': 'road.arterial',
        'elementType': 'labels.text.fill',
        'stylers': [
          {
            'color': '#757575'
          }
        ]
      },
      {
        'featureType': 'road.highway',
        'elementType': 'geometry',
        'stylers': [
          {
            'color': '#dadada'
          }
        ]
      },
      {
        'featureType': 'road.highway',
        'elementType': 'labels.text.fill',
        'stylers': [
          {
            'color': '#616161'
          }
        ]
      },
      {
        'featureType': 'road.local',
        'elementType': 'labels.text.fill',
        'stylers': [
          {
            'color': '#9e9e9e'
          }
        ]
      },
      {
        'featureType': 'transit.line',
        'elementType': 'geometry',
        'stylers': [
          {
            'color': '#e5e5e5'
          }
        ]
      },
      {
        'featureType': 'transit.station',
        'elementType': 'geometry',
        'stylers': [
          {
            'color': '#eeeeee'
          }
        ]
      },
      {
        'featureType': 'water',
        'elementType': 'geometry',
        'stylers': [
          {
            'color': '#c9c9c9'
          }
        ]
      },
      {
        'featureType': 'water',
        'elementType': 'labels.text.fill',
        'stylers': [
          {
            'color': '#9e9e9e'
          }
        ]
      }
    ],
    disableDefaultUI: true
  },
  config: {
    zoom: 15,
    center: {lat: 0, lng: 0},
    type: 'roadmap'
  },
  data: [
    { id: 1,
      users_id: [2, 3],
      hour: '14:00',
      language_id: 1,
      lv_lesson_id: 1,
      type: ['presencial', 'online']
    },
    { id: 2,
      users_id: [3],
      hour: '12:00',
      language_id: 2,
      lv_lesson_id: 10,
      type: ['online']
    },
    { id: 3,
      users_id: [2, 3],
      hour: '11:00',
      language_id: 1,
      lv_lesson_id: 1,
      type: ['presencial', 'online']
    },
    { id: 4,
      users_id: [3],
      hour: '14:00',
      language_id: 2,
      lv_lesson_id: 10,
      type: ['online']
    },
    { id: 5,
      users_id: [2, 3],
      hour: '15:00',
      language_id: 1,
      lv_lesson_id: 1,
      type: ['presencial', 'online']
    }
  ]
}
