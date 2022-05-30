import { AppDataSource } from '../../data-source.js'
import { Users } from '../users/users.entity.js'
import { AuthenticateDto } from './login.dto.js'
import bcrypt from 'bcrypt'

const userRepository = AppDataSource.getRepository(Users)

export async function authenticateUser(data: AuthenticateDto) {
  const user = await userRepository.findOne({
    select: ['id', 'registry', 'password', 'nickname', 'token'],
    where: { registry: data.registry },
  })
  if (!user) throw new Error(`Invalid registry or password.`)
  const validPassword = bcrypt.compareSync(data.password, user.password)
  if (!validPassword) throw new Error(`Invalid registry or password.`)
  return {
    id: user.id,
    registry: user.registry,
    nickname: user.nickname,
    token: user.token,
  }
}
