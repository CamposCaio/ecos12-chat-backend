// const express = require('express')

// const cors = require('cors')
// const helmet = require('helmet')
// const morgan = require('morgan')

import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import morgan from 'morgan'

import { router } from './api/login/login.route.js'

export const app = express()

app.use(cors({ origin: process.env.CORS_ORIGIN || '*' }))

app.use(helmet())

app.use(express.json())

app.use(morgan('dev'))

app.get('/', (req, res) => {
  let timestamp = Date.now()
  res.send({ timestamp })
})

// app.post('/login', (req, res, next) => {
//   res.json({ token: '123456' })
// })

app.use('/login', router)
