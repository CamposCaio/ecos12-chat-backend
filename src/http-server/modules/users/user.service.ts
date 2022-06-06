import { User } from './user.entity'
import { hashPassword } from '../../utils/bcrypt'
import { AppDataSource } from '../../../typeorm'

export class UserService {
  private userRepository = AppDataSource.getRepository(User)

  async find(registry: string) {
    const user = await this.userRepository.findOneBy({ registry })
    if (!user) throw new Error(`The registry ${registry} was not found.`)
    return user
  }

  async findAll() {
    return await this.userRepository.find()
  }

  async create(createUser: User) {
    if (await this.userRepository.findOneBy({ registry: createUser.registry }))
      throw new Error(`The registry ${createUser.registry} already exists.`)
    createUser.password = hashPassword(createUser.password)
    const user = await this.userRepository.save(createUser)
    if (!user) throw new Error(`Error while saving the user in database.`)
    return user
  }

  async update(updateUser: User) {
    if (!updateUser.registry)
      throw new Error('Please, specify a registry property.')
    const user = await this.userRepository.findOneBy({
      registry: updateUser.registry,
    })
    if (!user)
      throw new Error(`The registry ${updateUser.registry} was not found.`)
    if (updateUser.nickname) user.nickname = updateUser.nickname
    if (updateUser.password) user.password = hashPassword(updateUser.password)
    return await this.userRepository.save(user)
  }

  async delete(registry: string) {
    const user = this.find(registry)
    if (!user) throw new Error(`The registry ${registry} was not found.`)
    await this.userRepository.delete({ registry })
    return user
  }
}
