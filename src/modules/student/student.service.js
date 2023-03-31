const { getAllStudents, findStudentById, saveStudent, findStudentByNameAndLastName } = require('./adapters/gateways/database/repositories/student.repository')
const { StatusCodes } = require('http-status-codes')
const { getAddressByPostalCode } = require('../common/helpers/cep.helper')

const AVALIABLE_CLASS = "DDS-T10"

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

const createStudent = async (request, response) => {3
  const { name, lastName, age, className, address } = request.body;
   
  if (!name || !lastName || !age || !className || !address) {
    return response.status(StatusCodes.PRECONDITION_FAILED).json({ mensagem: 'Enviar todos os campos obrigatórios' })
  }

  if (!address.postalCode || !address.number) {
    return response.status(StatusCodes.PRECONDITION_FAILED).json({ mensagem: 'Enviar todos os campos obrigatórios de endereço' })
  }

  const addressInfo = await getAddressByPostalCode(address.postalCode)

  const addressNotFound = !!addressInfo;

  if (!addressNotFound) {
    return response.status(StatusCodes.BAD_REQUEST).json({ mensagem: 'Cep invalido!!!' })
  }

  if (className !== AVALIABLE_CLASS) {
    return response.status(StatusCodes.BAD_REQUEST).json({ mensagem: 'Não Aceitamos ninguem fora da turma 10 que é melhor da CUBOS!!!' })
  }

  const studentWithTheSameName = await findStudentByNameAndLastName({ name, lastName })

  const studentExist = !!studentWithTheSameName;

  if (studentExist) {
    return response.status(StatusCodes.BAD_REQUEST).json({ mensagem: 'Estudante ja foi cadastrado' })
  }

  const allStudents = await getAllStudents(); 

  const newStudent = {
    id: allStudents.length + 1,
    name,
    lastName,
    age,
    className,
    address: {
      postalCode: address.postalCode,
      city: addressInfo.city,
      state: addressInfo.state,
      street: addressInfo.street,
      neighborhood: addressInfo.neighborhood,
      number: address.number
    }
  }

  const payloadWithNewStudent = [...allStudents, newStudent]

  await saveStudent(payloadWithNewStudent)

  return response.status(StatusCodes.CREATED).send()
}

module.exports = {
  standAlive,
  getStudents,
  getStudentById,
  createStudent
}