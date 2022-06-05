import express from 'express'
import { LoginController } from './login.controller'

export const loginRouter = express.Router()

const loginController = new LoginController()

loginRouter.post('/', async (req, res, next) => {
  try {
    res.json(await loginController.login(req))
  } catch (err) {
    err instanceof Error && res.send(err.message)
    next(err)
  }
})
