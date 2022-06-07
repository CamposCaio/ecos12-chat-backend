import { Expose } from 'class-transformer'
import { Entity, Column, OneToMany } from 'typeorm'
import { BaseEntity } from './base.entity'
import { Conversation } from './conversation.entity'
import { Message } from './message.entity'
import { Participant } from './participant.entity'

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

  @OneToMany(() => Participant, (participants) => participants.user)
  participants: Participant[]

  @OneToMany(() => Message, (message) => message.sender)
  messages: Message[]

  @OneToMany(() => Conversation, (conversation) => conversation.creator)
  conversations: Conversation[]
}
