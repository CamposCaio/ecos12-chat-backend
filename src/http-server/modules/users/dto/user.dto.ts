export interface UserDto {
  id?: string
  registry: string
  nickname?: string
  password?: string
}

export interface CreateUserDto {
  registry: string
  nickname: string
  password: string
}
