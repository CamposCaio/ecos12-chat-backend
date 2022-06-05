import { Column, Entity } from 'typeorm'
import { BaseEntity } from '../../utils/base.entity'

@Entity('Conversation')
export class Conversation extends BaseEntity {
  @Column()
  creator_id: string

  @Column()
  title: string
}
