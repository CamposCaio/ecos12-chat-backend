import express from 'express'

import { authenticateUser } from './login.service.js'

export const loginRouter = express.Router()

loginRouter.post('/', async function (req, res, next) {
  try {
    res.json(await authenticateUser(req.body))
  } catch (err) {
    err instanceof Error && res.status(400).send(err.message)
    next(err)
  }
})
