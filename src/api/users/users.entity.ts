import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  UpdateDateColumn,
  CreateDateColumn,
} from 'typeorm'

@Entity('Users')
export class Users {
  @PrimaryGeneratedColumn()
  id: number

  @Column({
    type: 'text',
    unique: true,
  })
  registry: string

  @Column('text')
  nickname: string

  @Column({
    type: 'text',
    select: false,
  })
  password: string

  @Column('text')
  token: string

  @CreateDateColumn({
    type: 'datetime',
    default: () => 'CURRENT_TIMESTAMP',
  })
  created_at: Date

  @UpdateDateColumn({
    type: 'datetime',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updated_at: Date

  @Column({
    type: 'datetime',
    nullable: true,
  })
  deleted_at: Date | null
}
