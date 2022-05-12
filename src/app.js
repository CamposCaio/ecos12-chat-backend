const express = require('express')

const cors = require('cors')
const helmet = require('helmet')
const morgan = require('morgan')

const loginRouter = require('./api/login/login.route')

const app = express()

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

app.use('/login', loginRouter)

module.exports = app
