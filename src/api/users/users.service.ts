import { AppDataSource } from '../../data-source'
import { CreateUserDto, UpdateUserDto } from './users.dto'
import { Users } from './users.entity'

const userRepository = AppDataSource.getRepository(Users)

export async function createUser(data: CreateUserDto) {
  if (await readUser(data.registry)) return
  return await userRepository.save(data)
}

export async function readUser(registry: number) {
  return await userRepository.findOne({ where: { registry } })
}

export async function readAllUsers() {
  return await userRepository.find()
}

export async function updateUser(data: UpdateUserDto) {
  if (!(await readUser(data.registry))) return
  return await userRepository.save(data)
}

export async function deleteUser(registry: number) {
  return await userRepository.delete({ registry })
}
