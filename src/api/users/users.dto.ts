export interface CreateUserDto {
  registry: string
  nickname: string
  password: string
  token?: string
}

export interface UpdateUserDto {
  registry: string
  nickname?: string
  password?: string
}
