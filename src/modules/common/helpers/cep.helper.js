const cepPromise = require('cep-promise')

const getAddressByPostalCode = async (postalCode) => {
  const addressData = await cepPromise(`${postalCode}`).catch(() => undefined)

  return addressData
}

module.exports = {
  getAddressByPostalCode
}