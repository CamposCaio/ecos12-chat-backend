export interface CreateLoginDto {
  registry: string
  password: string
}

export interface LoginDto {
  registry: string
  nickname: string
  token: string
}
