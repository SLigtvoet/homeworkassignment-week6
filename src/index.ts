import 'reflect-metadata'
import {createKoaServer} from "routing-controllers"
import setupDb from './db'
import GameController from './controllers/gameController';

const app = createKoaServer({
   controllers: [GameController]
})

setupDb()
  .then(_ =>
    app.listen(4000, () => console.log('Listening on port 4000'))
  )
  .catch(err => console.error(err))