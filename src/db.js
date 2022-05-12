const sqlite = require('better-sqlite3')
const path = require('path')
const db = new sqlite(path.resolve('chat.db'), { fileMustExist: true })

function query(sql, params) {
  return db.prepare(sql).all(params)
}

module.exports = {
  query,
}
