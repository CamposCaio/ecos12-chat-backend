import 'reflect-metadata'
import { DataSource } from 'typeorm'

export const AppDataSource = new DataSource({
  type: 'sqlite',
  database: './chat.db',
  entities: ['dist/http-server/**/*.entity.js'],
  synchronize: true,
})
