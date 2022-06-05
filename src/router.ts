import express from 'express'
import { loginRouter } from './http-server/modules/login/login.controller'
import { usersRouter } from './http-server/modules/users/users.controller'

export const router = express.Router()

router.get('/', (_req, res) => {
  res.send({ timestamp: Date.now() })
})

router.use('/login', loginRouter)
router.use('/users', usersRouter)
