import { Request } from 'express'
import { UsersService } from './users.service'

export class UsersController {
  private usersService = new UsersService()

  async find(req: Request) {
    return await this.usersService.find(req.body)
  }

  async findAll(req: Request) {
    return await this.usersService.findAll()
  }

  async create(req: Request) {
    return await this.usersService.create(req.body)
  }

  async update(req: Request) {
    return await this.usersService.update(req.body)
  }

  async delete(req: Request) {
    return await this.usersService.delete(req.body)
  }
}
