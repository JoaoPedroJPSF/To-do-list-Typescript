import express, { Express, Application, Request, Response} from 'express'
import * as http from 'http'
import cors from 'cors'
import dotenv from 'dotenv'
import { RouteConfig } from './config/routeConfig'
import { TaskRoutes } from './config/task.route.config'
import MongooseService from "./database/base"
import {ITask} from './database/taskInterface'
dotenv.config({})

const PORT = process.env.PORT || 3333
const app: Express = express()
 
// Create the server with HTTP
const server: http.Server = http.createServer(app)

//Get the array routes from the Route config
const routes: Array<RouteConfig> = []
routes.push(new TaskRoutes(app))

//Use express to set middleware and json archives
app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(cors())

//Database connected
MongooseService.connectToDataBase()

//Open the server on PORT
server.listen(PORT, () => {
  console.log(`Listening on PORT ${PORT}`)
  routes.forEach((route: RouteConfig) => {
    console.log(`Routes configured for ${route.getName()}`)
  })
})
