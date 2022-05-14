import express from 'express'
import { loginRouter } from './api/login/login.route'
import { usersRouter } from './api/users/users.route'

export const router = express.Router()

router.get('/', (_req, res) => {
  res.send({ timestamp: Date.now() })
})

router.use('/login', loginRouter)
router.use('/users', usersRouter)
