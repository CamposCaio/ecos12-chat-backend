import 'reflect-metadata'
import { DataSource } from 'typeorm'

export const AppDataSource = new DataSource({
  type: 'sqlite',
  database: './chat.db',
  entities: ['dist/api/**/*.entity.js'],
  synchronize: true,
})
