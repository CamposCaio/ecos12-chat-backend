import { CreateUserDto, UserDto } from './users.dto'
import { User } from './user.entity'
import { hashPassword } from '../../utils/bcrypt'
import { AppDataSource } from '../../../typeorm'

export class UsersService {
  private userRepository = AppDataSource.getRepository(User)

  async find(registry: string) {
    const user = await this.userRepository.findOneBy({ registry })
    if (!user) throw new Error(`The registry ${registry} was not found.`)
    return user
  }

  async findAll() {
    return await this.userRepository.find()
  }

  async create(userDto: CreateUserDto) {
    if (await this.userRepository.findOneBy({ registry: userDto.registry }))
      throw new Error(`The registry ${userDto.registry}) already exists.`)
    userDto.password = hashPassword(userDto.password)
    const user = await this.userRepository.save(userDto)
    if (!user) throw new Error(`Error while saving the user in database.`)
    return user
  }

  async update(userDto: UserDto) {
    const user = await this.userRepository.findOneBy({
      registry: userDto.registry,
    })
    if (!user)
      throw new Error(`The registry ${userDto.registry} was not found.`)
    // remove next ifs
    if (userDto.nickname) user.nickname = userDto.nickname
    if (userDto.password) user.password = hashPassword(userDto.password)
    return await this.userRepository.save(user)
  }

  async delete(registry: string) {
    return await this.userRepository.delete({ registry })
  }
}
