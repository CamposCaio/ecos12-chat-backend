import { Entity, Column } from 'typeorm'
import { BaseEntity } from '../../utils/base.entity'

@Entity('User')
export class User extends BaseEntity {
  @Column({ unique: true })
  registry: string

  @Column()
  nickname: string

  @Column()
  password: string
}
