import { RawData, WebSocket, WebSocketServer, Server as WSServer } from 'ws'
import { Server } from 'http'
import { AppController } from './app.controller'
import { webSocketManager } from '../main'
import { ClientDto } from './utils/dto/client.dto'
import { MessageDto } from './modules/messages/dto/message.dto'
import { participantService } from '../http-server/modules/conversations/participants/participant.module'

interface OnlineClient extends ClientDto {
  socket: WebSocket
  token: string
}

export class WebSocketManager {
  wsServer: WSServer
  appController = new AppController()
  private onlineClients: OnlineClient[] = []

  constructor(server: Server) {
    this.wsServer = new WebSocketServer({ server })
    this.wsServer.on('connection', this.onConnection.bind(this))
  }

  getOnlineClients() {
    return this.onlineClients
  }

  setOnlineClients(clientDto: ClientDto, socket: WebSocket, token: string) {
    this.onlineClients.push({ ...clientDto, socket, token })
  }

  onConnection(socket: WebSocket) {
    socket.on('message', this.onMessage.bind(this, socket))
    socket.on('close', this.onDisconnection.bind(this, socket))
    socket.on('error', (err) => console.error(`Socket error: ${err.message}`))
    // const ip = request.socket.remoteAddress
    // const ip = request.headers['x-forwarded-for'].split(',')[0].trim()
  }

  async onMessage(socket: WebSocket, data: RawData) {
    const dataObj = JSON.parse(data.toString())
    if (!Object.keys(dataObj).length) return // ping message
    const res = await webSocketManager.appController.route(dataObj, socket)
    res && socket.send(JSON.stringify(res))
  }

  onDisconnection(socket: WebSocket) {
    for (let i = 0; i < this.onlineClients.length; i++) {
      if (this.onlineClients[i].socket === socket)
        this.onlineClients.splice(i, 1)
    }
    console.log(
      'Client disconnected. Online clients: ',
      this.onlineClients.map((client) => client.nickname)
    )
  }

  sendMessage(message: string, receiverId: string) {
    if (!message || message === '[]' || message === '{}') return
    this.onlineClients.forEach((onlineClient) => {
      onlineClient.id === receiverId && onlineClient.socket.send(message)
    })
    // for (let i = 0; i < this.onlineClients.length; i++) {
    //   this.onlineClients[i].id === receiverId &&
    //     this.onlineClients[i].socket.send(message)
    // }
  }

  async broadcast(messageDto: MessageDto) {
    const participants = await participantService.findByConversation(
      messageDto.conversationId
    )
    participants.forEach((participant) => {
      const onlineClient = this.onlineClients.find(
        (onlineClient) => onlineClient.id === participant.id
      )
      onlineClient &&
        onlineClient.id !== messageDto.senderId &&
        onlineClient.socket.send(JSON.stringify(messageDto))
    })

    // if (!this.wsServer.clients) return
    // this.wsServer.clients.forEach((client: WebSocket) => {
    //   client.readyState === WebSocket.OPEN &&
    //     client.send(JSON.stringify(messageDto))
    // })
  }
}
