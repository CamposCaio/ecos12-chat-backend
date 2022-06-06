import express from 'express'
import { UserMapper } from './mapper/user.mapper'
import { UserController } from './user.controller'
import { UserService } from './user.service'

export const userRouter = express.Router()
export const userController = new UserController(userRouter)
export const userService = new UserService()
export const userMapper = new UserMapper()
