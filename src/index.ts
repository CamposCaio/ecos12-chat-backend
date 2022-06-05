import { app } from './express.js'
import { AppDataSource } from './typeorm.js'
import { WebSocketManager } from './websocket-server/main.js'

export let webSocketManager: WebSocketManager

AppDataSource.initialize()
  .then(() => {
    const PORT = process.env.PORT ?? 3000
    const server = app.listen(PORT, () => {
      console.log(`App is running on port ${PORT}!`)
    })
    webSocketManager = new WebSocketManager(server)
  })
  .catch((err) => {
    console.error(`Error on initialize AppDataSource: ${err}`)
  })
