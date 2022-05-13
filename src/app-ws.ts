import WebSocket, { RawData, WebSocketServer } from 'ws'

function onError(ws: WebSocket.WebSocket, err: Error) {
  console.error(`onError: ${err.message}`)
}

function onMessage(
  ws: WebSocket.WebSocket,
  data: RawData,
  server: WebSocket.Server
) {
  console.log(`onMessage: ${data.toString()}`)
  // @ts-ignore
  server.broadcast(data.toString())
  // ws.send(`recebido!`)
}

function onConnection(this: any, ws: WebSocket.WebSocket, _req: any) {
  const server = this
  ws.on('message', (data) => onMessage(ws, data, server))
  ws.on('error', (error) => onError(ws, error))
  console.log(`onConnection`)
}

function broadcast(this: any, jsonObject: any) {
  if (!this.clients) return
  this.clients.forEach((client: any) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify(jsonObject))
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
  return wss
}
