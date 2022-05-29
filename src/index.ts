import { app } from './app.js'
import { WebSocketManager } from './websocket/index.js'
import { AppDataSource } from './data-source'

AppDataSource.initialize()
  .then(() => {
    const server = app.listen(process.env.PORT || 3000, () => {
      console.log(`App Express is running!`)
    })
    new WebSocketManager(server)
  })
  .catch((err) => {
    console.error(`Error on initialize AppDataSource: ${err}`)
  })
