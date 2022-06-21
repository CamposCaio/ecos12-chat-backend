import { UserDto } from '../../users/dto/user.dto'
import { ParticipantDto } from '../participants/dto/participant.dto'

export interface CreateConversationDto {
  creatorRegistry: string
  title?: string
  participantsRegistry: string[]
}

export interface ConversationDto {
  id?: string
  creatorRegistry?: string
  title?: string
  participantsRegistry?: string[]
  creator: UserDto
  participants?: ParticipantDto[]
  timestamp?: number
}
