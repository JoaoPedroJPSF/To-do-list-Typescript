import express, { Express, Application, Request, Response} from 'express'
import * as http from 'http'
import cors from 'cors'
import dotenv from 'dotenv'
import { RouteConfig } from './config/routeConfig'
import { TaskRoutes } from './config/task.route.config'
import MongooseService from "./database/base"

dotenv.config({})

const PORT = process.env.PORT || 3333
const app: Express = express()

// Create the server with HTTP
const server: http.Server = http.createServer(app)

//Get the array routes from the Route config
const routes: Array<RouteConfig> = []
routes.push(new TaskRoutes(app))

//Database connected
MongooseService.connectToDataBase()

//Use express to set middleware and json archives
app.use(express.json())
app.use(cors())

//Open the server on PORT
server.listen(PORT, () => {
  console.log(`Listening on PORT ${PORT}`)

  routes.forEach((route: RouteConfig) => {
    console.log(`Routes configured for ${route.getName()}`)
  })
})
