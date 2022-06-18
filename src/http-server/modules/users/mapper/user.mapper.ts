import { User } from '../../../../entities/user.entity'
import { CreateUserDto, UserDto } from '../dto/user.dto'
import { plainToInstance } from 'class-transformer'

export class UserMapper {
  DtoToEntity(createUserDto: CreateUserDto): User {
    return plainToInstance(User, createUserDto, {
      excludeExtraneousValues: true,
    })
  }

  entityToDto(user: User): UserDto {
    return {
      id: user?.id,
      registry: user?.registry,
      nickname: user?.nickname,
    }
  }
}
