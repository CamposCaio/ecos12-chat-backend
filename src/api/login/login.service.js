const db = require('../../db')

function getUser(req) {
  const user = db.query(
    `SELECT id, registry, nickname FROM Users WHERE registry=? AND password=?`,
    [req.registry, req.password]
  )

  return user[0]
}

module.exports = {
  getUser,
}
