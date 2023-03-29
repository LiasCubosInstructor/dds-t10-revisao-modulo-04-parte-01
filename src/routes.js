const express = require('express');
const { standAlive, getStudents, getStudentById } = require('./controller')
const { validationOfAllParams } = require('./middlewares')

const routes = express();

routes.get("/", standAlive)

routes.get('/alunos', getStudents)

routes.get('/aluno/:alunoId', validationOfAllParams, getStudentById)

module.exports = routes;