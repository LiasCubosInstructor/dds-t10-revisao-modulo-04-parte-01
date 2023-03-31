const express = require('express');
const { standAlive, getStudents, getStudentById, createStudent } = require('./student.service')
const { validationOfAllParams } = require('../common/middlewares/validation.middleware')

const controller = express();

controller.post('/criar/aluno', createStudent)

controller.get("/", standAlive)

controller.get('/alunos', getStudents)

controller.get('/aluno/:alunoId', validationOfAllParams, getStudentById)

module.exports = controller;