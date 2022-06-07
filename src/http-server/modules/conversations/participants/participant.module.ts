import { Participant } from '../../../../entities/participant.entity'
import { AppDataSource } from '../../../../typeorm'
import { ParticipantMapper } from './mapper/participants.mapper'
import { ParticipantService } from './participant.service'

export const participantRepository = AppDataSource.getRepository(Participant)
export const participantService = new ParticipantService()
export const participantMapper = new ParticipantMapper()
