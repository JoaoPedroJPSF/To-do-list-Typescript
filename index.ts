import express, { Express, Application, Request, Response, Router} from 'express'
import * as http from 'http'
import cors from 'cors'
import dotenv from 'dotenv'
import { RouteConfig } from './config/routeConfig'
import { TaskRoutes } from './config/task.route.config'
import MongooseService from "./database/base"
import {ITask} from './database/taskInterface'

dotenv.config({})

//declare global{
//  namespace Express{
//    interface Request{
//      description?: ITask
//    }
//  }
//}

type RequestBody = {
  name: string
}

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
app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(cors())

const router = Router()
//app.get('/', (req, res) => {
//  const body = req.body as RequestBody
//  res.send(body)
//  console.log(body)
//  return body
//})

//Open the server on PORT
server.listen(PORT, () => {
  console.log(`Listening on PORT ${PORT}`)
  routes.forEach((route: RouteConfig) => {
    console.log(`Routes configured for ${route.getName()}`)
  })
})
