import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm'
import { Conversation } from './conversation.entity'
import { User } from './user.entity'

@Entity('Participant')
export class Participant {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column('uuid')
  conversationId: string

  @Column('uuid')
  userId: string

  @ManyToOne(() => Conversation, (conversations) => conversations.participants)
  @JoinColumn([{ name: 'conversation_id', referencedColumnName: 'id' }])
  conversation: Conversation

  @ManyToOne(() => User, (users) => users.participants)
  @JoinColumn([{ name: 'user_id', referencedColumnName: 'id' }])
  user: User
}
