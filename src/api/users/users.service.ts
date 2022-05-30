import { AppDataSource } from '../../data-source'
import { CreateUserDto, UpdateUserDto } from './users.dto'
import { Users } from './users.entity'
import bcrypt from 'bcrypt'
import uuid from 'uuid'

const userRepository = AppDataSource.getRepository(Users)

export async function createUser(data: CreateUserDto) {
  if (await userRepository.findOneBy({ registry: data.registry }))
    throw new Error(`The user (registry = ${data.registry}) already exists.`)
  data.password = hash(data.password)
  data.token = uuid.v1()
  return await userRepository.save(data)
}

export async function readUser(registry: string) {
  const user = await userRepository.findOneBy({ registry })
  if (!user) throw new Error(`The user (registry = ${registry}) was not found.`)
  return user
}

export async function readAllUsers() {
  return await userRepository.find()
}

export async function updateUser(data: UpdateUserDto) {
  const user = await userRepository.findOneBy({ registry: data.registry })
  if (!user)
    throw new Error(`The user (registry = ${data.registry}) was not found.`)
  if (data.nickname) user.nickname = data.nickname
  if (data.password) user.password = hash(data.password)
  return await userRepository.save(user)
}

export async function deleteUser(registry: string) {
  return await userRepository.delete({ registry })
}

function hash(password: string) {
  return bcrypt.hashSync(password, 10)
}
