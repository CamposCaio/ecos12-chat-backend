import express from 'express'
import { loginRouter } from './api/login/login.controller'
import { usersRouter } from './api/users/users.controller'

export const router = express.Router()

router.get('/', (_req, res) => {
  res.send({ timestamp: Date.now() })
})

router.use('/login', loginRouter)
router.use('/users', usersRouter)
