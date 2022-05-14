import express from 'express'
import {
  createUser,
  deleteUser,
  readAllUsers,
  readUser,
  updateUser,
} from './users.service'

export const usersRouter = express.Router()

usersRouter.get('/', async (req, res, next) => {
  try {
    res.json(await readAllUsers())
  } catch (err) {
    if (err instanceof Error)
      console.error(`Error while reading user: `, err.message)
    next(err)
  }
})

usersRouter.get('/:registry', async (req, res, next) => {
  try {
    const user = await readUser(parseInt(req.params.registry))
    user
      ? res.json(user)
      : res
          .status(400)
          .send(`The user (registry = ${req.params.registry}) was not found.`)
  } catch (err) {
    if (err instanceof Error)
      console.error(`Error while reading user: `, err.message)
    next(err)
  }
})

usersRouter.post('/', async (req, res, next) => {
  try {
    const user = await createUser(req.body)
    user
      ? res.json(user)
      : res
          .status(400)
          .send(`The user (registry = ${req.body.registry}) already exists.`)
  } catch (err) {
    if (err instanceof Error)
      console.error(`Error while creating user: `, err.message)
    next(err)
  }
})

usersRouter.patch('/', async (req, res, next) => {
  try {
    const user = await updateUser(req.body)
    user
      ? res.json(user)
      : res
          .status(400)
          .send(`The user (registry = ${req.body.registry}) was not found.`)
  } catch (err) {
    if (err instanceof Error)
      console.error(`Error while updating user: `, err.message)
    next(err)
  }
})

usersRouter.delete('/:registry', async (req, res, next) => {
  try {
    const user = await deleteUser(parseInt(req.params.registry))
    user
      ? res.json(user)
      : res
          .status(400)
          .send(`The user (registry = ${req.params.registry}) was not found.`)
  } catch (err) {
    if (err instanceof Error)
      console.error(`Error while deleting user: `, err.message)
    next(err)
  }
})
