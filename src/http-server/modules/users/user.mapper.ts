import { User } from './user.entity'
import { UserDto } from './users.dto'

export class UserMapper {
  entityToDto(user: User): UserDto {
    return {
      registry: user.registry,
      nickname: user.nickname,
    }
  }
}
