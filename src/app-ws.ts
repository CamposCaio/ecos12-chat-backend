import WebSocket, { RawData, WebSocketServer } from 'ws'

function onError(_ws: WebSocket.WebSocket, err: Error) {
  console.error(`onError: ${err.message}`)
}

function onMessage(
  _ws: WebSocket.WebSocket,
  data: RawData,
  server: WebSocket.Server
) {
  const flatMessage = data.toString()
  console.log(`onMessage: ${flatMessage}`)
  if (flatMessage === '{}') return
  const message = JSON.parse(data.toString())
  const messageToSend = {
    ...message,
    timestamp: Date.now(),
  }
  // @ts-ignore
  server.broadcast(JSON.stringify(messageToSend))
}

function onConnection(this: any, ws: WebSocket.WebSocket, _req: any) {
  const server = this
  ws.on('message', (data) => onMessage(ws, data, server))
  ws.on('error', (error) => onError(ws, error))
  console.log(`onConnection`)
}

function broadcast(this: any, message: string) {
  if (!this.clients) return
  this.clients.forEach((client: any) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(message)
    }
  })
}

export function wsserver(server: any) {
  const wss = new WebSocketServer({
    server,
  })

  wss.on('connection', onConnection)
  //@ts-ignore
  wss.broadcast = broadcast

  console.log(`App Web Socket Server is running!`)
}
