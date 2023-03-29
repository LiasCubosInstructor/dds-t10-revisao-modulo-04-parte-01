const { getAllStudents, findStudentById } = require('./repository')
const { StatusCodes } = require('http-status-codes')

const standAlive = (request, response) => {
  response.send('Estou vivo')
}

const getStudents = async (request, response) => {
  const allStudents = await getAllStudents();

  const returnOfAllStudentsHasSomeValue = allStudents.length > 0

  if (returnOfAllStudentsHasSomeValue) {
    return response.status(StatusCodes.OK).json(allStudents)
  } else {
    return response.status(StatusCodes.NO_CONTENT).json()
  }
}

const getStudentById = async (request, response) => {
  const { alunoId: studentId  } = request.params;

  const student = await findStudentById(+studentId)

  const studentExist = !!student;

  if (studentExist) {
    return response.status(StatusCodes.OK).json(student)
  } else {
    return response.status(StatusCodes.NO_CONTENT).json()
  }
}

module.exports = {
  standAlive,
  getStudents,
  getStudentById
}