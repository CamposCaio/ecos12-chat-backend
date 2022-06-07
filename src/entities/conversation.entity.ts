import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
} from 'typeorm'
import { BaseEntity } from './base.entity'
import { Message } from './message.entity'
import { Participant } from './participant.entity'
import { User } from './user.entity'

@Entity()
export class Conversation extends BaseEntity {
  @Column('uuid')
  creatorId: string

  @Column({ nullable: true })
  title?: string

  @ManyToOne(() => User, (user) => user.conversations)
  @JoinColumn()
  creator: User

  @OneToMany(() => Participant, (participants) => participants.conversation)
  participants: Participant[]

  @OneToMany(() => Message, (message) => message.conversation)
  messages: Message[]
}
