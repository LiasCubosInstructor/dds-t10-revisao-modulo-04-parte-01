const fs = require('fs/promises')

const getAllValuesHelper = async () => {
  return JSON.parse(await fs.readFile('./src/modules/student/adapters/gateways/database/student.db.json'))
}

const tranformToFullName = (name, lastName) => {
 return `${name} ${lastName}`
}

const getAllStudents = async () => {
  const result = await getAllValuesHelper()

  return result
}

const findStudentById = async (studentId) => {
  const allResults = await getAllValuesHelper();
  
  const foundStudent = allResults.find((student) => student.id === studentId)

  return foundStudent
}

const saveStudent = async (payloadWithNewStudent) => {
  await fs.writeFile('./src/modules/student/adapters/gateways/database/student.db.json', JSON.stringify(payloadWithNewStudent))
}

const findStudentByNameAndLastName = async (params) => {
  const { name, lastName } = params;

  const fullNameOfNewStudent = tranformToFullName(name, lastName)

  const allStudents = await getAllValuesHelper()

  const studentExist = allStudents.find((student) => {
    const { name, lastName } = student; 

    const fullNameOfExistingStudent = tranformToFullName(name, lastName)

    if (fullNameOfNewStudent === fullNameOfExistingStudent) {
      return student
    }
  })

  console.log(studentExist)

    return studentExist
}

module.exports = {
  getAllStudents,
  findStudentById,
  saveStudent,
  findStudentByNameAndLastName
}