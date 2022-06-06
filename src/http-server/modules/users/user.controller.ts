import { Request, Router } from 'express'
import { route } from '../../utils/route'
import { userMapper, userService } from './user.module'

export class UserController {
  constructor(router: Router) {
    router.get('/:registry', route.bind(null, this.find))
    router.get('/', route.bind(null, this.findAll))
    router.post('/', route.bind(null, this.create))
    router.patch('/', route.bind(null, this.update))
    router.delete('/:registry', route.bind(null, this.delete))
  }

  async find(req: Request) {
    const registry = req.params.registry
    const user = await userService.find(registry)
    return userMapper.entityToDto(user)
  }

  async findAll(_req: Request) {
    const users = await userService.findAll()
    return users.map((user) => userMapper.entityToDto(user))
  }

  async create(req: Request) {
    const userDto = req.body
    const user = await userService.create(userMapper.DtoToEntity(userDto))
    return userMapper.entityToDto(user)
  }

  async update(req: Request) {
    const userDto = req.body
    const user = await userService.update(userMapper.DtoToEntity(userDto))
    return userMapper.entityToDto(user)
  }

  async delete(req: Request) {
    const registry = req.params.registry
    const user = await userService.delete(registry)
    return userMapper.entityToDto(user)
  }
}
