import express from 'express'
import { Conversation } from '../../../entities/conversation.entity'
import { AppDataSource } from '../../../typeorm'
import { ConversationController } from './conversation.controller'
import { ConversationService } from './conversation.service'
import { ConversationMapper } from './mapper/conversation.mapper'

export const conversationRouter = express.Router()
export const conversationRepository = AppDataSource.getRepository(Conversation)
export const conversationService = new ConversationService()
export const conversationMapper = new ConversationMapper()
export const conversationController = new ConversationController(
  conversationRouter
)
