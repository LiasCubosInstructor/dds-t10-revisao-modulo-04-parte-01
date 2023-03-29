// import express from 'express';
const express = require('express');
const routes = require('./routes')
// const { validationOfAllParams } = require('./middlewares')

const application = express();

// application.use(validationOfAllParams)

application.use(routes)

application.use(express.json())

application.listen(3000)