import { AppDataSource } from '../../../typeorm'
import { Message } from '../../../entities/message.entity'
import { MessageService } from './message.service'
import { MessageMapper } from './mapper/message.mapper'

export const messageRepository = AppDataSource.getRepository(Message)
export const messageService = new MessageService()
export const messageMapper = new MessageMapper()
