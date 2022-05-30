import { app } from './app.js'
import { WebSocketManager } from './websocket/main.js'
import { AppDataSource } from './data-source'

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
