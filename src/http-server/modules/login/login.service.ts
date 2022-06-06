import { CreateLoginDto } from './dto/login.dto.js'
import * as jwt from 'jsonwebtoken'
import { verifyPassword } from '../../utils/bcrypt.js'
import { User } from '../users/user.entity.js'
import { userMapper, userService } from '../users/user.module.js'

export class LoginService {
  async login(data: CreateLoginDto) {
    try {
      const user = await userService.find(data.registry)
      verifyPassword(data.password, user.password)
      const token = this.generateToken(user)
      return { user, token }
    } catch (err) {
      if (err instanceof Error) throw new Error(`Invalid registry or password.`)
    }
  }

  private generateToken(user: User) {
    if (!process.env?.JWT_KEY) throw new Error('JWT server error.')
    const privateKey = process.env.JWT_KEY
    const token = jwt.sign(userMapper.entityToDto(user), privateKey, {
      expiresIn: '12h',
    })

    if (!token) throw new Error(`Error while generating JWT.`)
    return token
  }
}
