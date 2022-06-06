import express from 'express'
import { LoginController } from './login.controller'
import { LoginService } from './login.service'
import { LoginMapper } from './mapper/login.mapper'

export const loginRouter = express.Router()
export const loginController = new LoginController(loginRouter)
export const loginService = new LoginService()
export const loginMapper = new LoginMapper()
