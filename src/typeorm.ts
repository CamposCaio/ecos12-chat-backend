import 'reflect-metadata'
import { DataSource } from 'typeorm'

export const AppDataSource = new DataSource({
  type: 'sqlite',
  database: './chat.db',
  entities: ['dist/entities/**/*.entity.js'],
  synchronize: true,
})
