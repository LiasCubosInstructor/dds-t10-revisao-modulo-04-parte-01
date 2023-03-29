const { StatusCodes } = require('http-status-codes')

const validationOfAllParams = (request, response, next) => {
  const params = request.params;

  const paramsKeysValues = Object.keys(params)

  const allParamsWithValue = paramsKeysValues.some((keyParam) => !!params[keyParam])

  if (allParamsWithValue) {
    next()
  } else {
    return response.status(StatusCodes).json({mensagem: "Parametro de rota não pode ser vazio"})
  }
}

module.exports = {
  validationOfAllParams
}