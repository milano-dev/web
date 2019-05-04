function guid() {
  let nav = window.navigator
  let screen = window.screen
  let guid = nav.mimeTypes.length
  guid += nav.userAgent.replace(/\D+/g, '')
  guid += nav.plugins.length
  guid += screen.height || ''
  guid += screen.width || ''
  guid += screen.pixelDepth || ''
  guid += Math.random() * Math.random() * 100

  return guid
}

const deviceIdKey = 'device_id'
const visitIdKey = 'visit_id'

function setid(fn, key) {
  fn(key, g)
  return g
}

function getOrSet(storage, key) {
  const i = storage.getItem(key)
  if (i) {
    return i
  }

  const g = guid()
  storage.setItem(key, g)
}

const device_id = getOrSet(window.localStorage, deviceIdKey)
const visit_id = guid()

const url = 'https://u5i2g6007k.execute-api.eu-west-1.amazonaws.com/staging/'

try {
  fetch(url, {
    method: 'POST',
    mode: 'no-cors',
    body: JSON.stringify({
      href: window.location.href,
      hostname: window.location.hostname,
      port: window.location.hostname,
      device_id,
      visit_id,
    }),
  })
} catch (e) {
  console.error(e)
}
