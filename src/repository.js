const fsPromises = require('fs/promises')

const getAllValuesHelper = async () => {
  return JSON.parse(await fsPromises.readFile('./src/student.db.json'))
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

module.exports = {
  getAllStudents,
  findStudentById
}