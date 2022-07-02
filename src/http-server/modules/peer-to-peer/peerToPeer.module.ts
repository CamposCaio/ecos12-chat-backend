import express from 'express'
import { PeerToPeerController } from './peerToPeer.controller'
import { PeerToPeerService } from './peerToPeer.service'

export const peerToPeerRouter = express.Router()
export const peerToPeerController = new PeerToPeerController(peerToPeerRouter)
export const peerToPeerService = new PeerToPeerService()
