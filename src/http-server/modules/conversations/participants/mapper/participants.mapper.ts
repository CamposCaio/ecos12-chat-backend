import { plainToInstance } from 'class-transformer'
import { Participant } from '../../../../../entities/participant.entity'
import { ParticipantDto } from '../dto/participant.dto'

export class ParticipantMapper {
  entityToDto(participant: Participant): ParticipantDto {
    return {
      conversationId: participant.conversationId,
      userId: participant.userId,
    }
  }
}
