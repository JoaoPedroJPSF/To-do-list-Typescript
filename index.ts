import express, { Express, Application, Request, Response, NextFunction, Router } from 'express'
import * as http from "http"
import cors from 'cors'
import dotenv from 'dotenv'
import { RouteConfig } from './routeConfig'
import { TaskRoutes } from './task.route.config'

const routes: Array<RouteConfig> = []


dotenv.config({})
const app: Express = express()

app.use(express.json())
app.use(cors())


const PORT = process.env.PORT || 3333

routes.push(new TaskRoutes(app))


app.get('/teste', (req: Request, res: Response, next: NextFunction) => {
  console.log("Reached")
  return res.status(200).json({message: "welcome"})
})

const server: http.Server = http.createServer(app)
server.listen(PORT, () => {
  console.log(`Listening on PORT ${PORT}`)

  routes.forEach((route: RouteConfig) => {
    console.log(`Routes configured for ${route.getName()}`)
  })
})
