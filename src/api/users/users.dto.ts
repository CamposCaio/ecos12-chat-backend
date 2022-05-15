export interface CreateUserDto {
  registry: string
  nickname: string
  password: string
}

export interface UpdateUserDto {
  registry: string
  nickname?: string
  password?: string
}
