// import express from 'express';
const express = require('express');
// const { validationOfAllParams } = require('./middlewares')
const studentController = require('./modules/student/student.controller')

const application = express();

application.use(express.json())

application.use(studentController)

application.listen(3000)