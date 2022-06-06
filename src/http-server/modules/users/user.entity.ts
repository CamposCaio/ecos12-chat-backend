import { Expose } from 'class-transformer'
import { Entity, Column } from 'typeorm'
import { BaseEntity } from '../../utils/base.entity'

@Entity('User')
export class User extends BaseEntity {
  @Column({ unique: true })
  @Expose()
  registry: string

  @Column()
  @Expose()
  nickname: string

  @Column()
  @Expose()
  password: string
}
