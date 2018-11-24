export const validations = (state) => (inputs) => {
  var fields = {}
  inputs.map((input) => {
    fields[input] = state.validations[input]
  })
  return fields
}
export const helpers = (state) => {
  return state.helpers
}
export const labels = (state) => {
  return state.labels
}
export const errors = (state) => (prop, validator) => {
  var error = ''
  var props = validator[prop].$params
  var fnc = {
    minLength (prop) {
      return prop.min
    },
    minValue (prop) {
      return prop.min
    },
    maxLength (prop) {
      return prop.max
    },
    maxValue (prop) {
      return prop.max
    },
    sameAsPassword (prop) {
      return 'senha'
    }
  }
  Object.keys(props).map((attr) => {
    if (!validator[prop][attr]) {
      var obj = validator[prop].$params[attr]
      error = state.messages.errors[attr]
      if (fnc[attr]) error += ' ' + fnc[attr](obj)
    }
  })
  return error
}
