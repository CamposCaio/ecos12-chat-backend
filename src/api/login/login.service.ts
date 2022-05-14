import { AppDataSource } from '../../data-source.js'
import { Users } from '../users/users.entity.js'
import { AuthenticateDto } from './login.dto.js'

const userRepository = AppDataSource.getRepository(Users)

export async function authenticateUser(data: AuthenticateDto) {
  return await userRepository.findOneBy(data)
}
