import * as bcrypt from 'bcrypt'

export function hashPassword(password: string) {
  return bcrypt.hashSync(password, 10)
}

export function verifyPassword(password: string, hash: string) {
  const validPassword = bcrypt.compareSync(password, hash)
  if (!validPassword) throw new Error('Unauthorized.')
}
