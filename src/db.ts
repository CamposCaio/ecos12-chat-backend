import sqlite from 'better-sqlite3'
import path from 'path'

const db = new sqlite(path.resolve('chat.db'), { fileMustExist: true })

export function query(sql: string, params: any[]) {
  return db.prepare(sql).all(params)
}
