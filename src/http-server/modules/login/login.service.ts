import { LoginDto } from './login.dto.js'
import * as jwt from 'jsonwebtoken'
import { UserDto } from '../users/users.dto.js'
import { UsersService } from '../users/users.service.js'
import { verifyPassword } from '../../utils/bcrypt.js'
import { UserMapper } from '../users/user.mapper.js'

export class LoginService {
  private usersService = new UsersService()
  private userMapper = new UserMapper()

  async login(data: LoginDto) {
    try {
      const user = await this.usersService.find(data.registry)
      verifyPassword(data.password, user.password)
      const userDto = this.userMapper.entityToDto(user)
      const token = this.generateToken(userDto)
      return { ...userDto, token }
    } catch {
      throw new Error('Invalid registry or password.')
    }
  }

  private generateToken(user: UserDto) {
    if (!process.env?.JWT_KEY) throw new Error('JWT server error.')
    const privateKey = process.env.JWT_KEY
    const token = jwt.sign(user, privateKey, { algorithm: 'RS256' })
    if (!token) throw new Error(`Error while generating JWT.`)
    return token
  }
}
