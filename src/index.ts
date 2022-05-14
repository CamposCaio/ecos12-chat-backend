import { app } from './app.js'
import { wsserver } from './app-ws.js'
import { AppDataSource } from './data-source'

AppDataSource.initialize()
  .then(() => {
    const server = app.listen(process.env.PORT || 3000, () => {
      console.log(`App Express is running!`)
    })
    wsserver(server)
  })
  .catch((err) => {
    console.error(`Error on initialize AppDataSource: ${err}`)
  })
