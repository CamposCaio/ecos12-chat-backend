import { query } from '../../db.js'

export function getUser(req: any) {
  const user = query(
    `SELECT id, registry, nickname FROM Users WHERE registry=? AND password=?`,
    [req.registry, req.password]
  )

  return user[0]
}
