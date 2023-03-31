const { StatusCodes } = require('http-status-codes')
const { isNumber } = require('lodash')

const numberValidationHelper = (params) => {
  const { paramPath } = params;

  const isANumber = isNumber(paramPath)

  return isANumber
}

const validationOfAllParams = (request, response, next) => {
  const { alunoId } = request.params;

  const paramsPathIsANumber = numberValidationHelper({paramPath: +alunoId})

  if (paramsPathIsANumber) {
    next()
  } else {
    return response.status(StatusCodes.BAD_REQUEST).json({mensagem: "Parametro de rota não pode ser vazio"})
  }
}

module.exports = {
  validationOfAllParams
}