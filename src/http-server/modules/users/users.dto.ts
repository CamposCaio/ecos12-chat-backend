export interface UserDto {
  registry: string
  nickname?: string
  password?: string
}

export interface CreateUserDto {
  registry: string
  nickname: string
  password: string
}
