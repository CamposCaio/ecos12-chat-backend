export interface CreateUserDto {
  registry: number
  nickname: string
  password: string
}

export interface UpdateUserDto {
  registry: number
  nickname?: string
  password?: string
}
