import { plainToInstance } from 'class-transformer'
import { User } from '../../../../entities/user.entity'
import { CreateLoginDto, LoginDto } from '../dto/login.dto'

export class LoginMapper {
  dtoToEntity(createLoginDto: CreateLoginDto): User {
    return plainToInstance(User, createLoginDto, {
      excludeExtraneousValues: true,
    })
  }

  entityToDto(user: User, token: string): LoginDto {
    return {
      registry: user.registry,
      nickname: user.nickname,
      token,
    }
  }
}
