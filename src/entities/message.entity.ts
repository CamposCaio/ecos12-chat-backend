import { Expose } from 'class-transformer'
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm'
import { BaseEntity } from './base.entity'
import { Conversation } from './conversation.entity'
import { User } from './user.entity'

@Entity()
export class Message extends BaseEntity {
  @Column('uuid')
  @Expose()
  conversationId: string

  @Column('uuid')
  @Expose()
  senderId: string

  @Column()
  @Expose()
  content: string

  @ManyToOne(() => Conversation, (conversation) => conversation.messages)
  @JoinColumn()
  conversation: Conversation

  @ManyToOne(() => User, (sender) => sender.messages)
  @JoinColumn()
  sender: User
}
