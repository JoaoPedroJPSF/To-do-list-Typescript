import {RouteConfig} from './routeConfig'
import express, { Application, Request, Response, Express, Router } from 'express'

import TaskController from '../controllers/taskController'

const app: Express = express()
const aplication = app.use(express.urlencoded({extended: true}))
app.use(express.json())



export class TaskRoutes extends RouteConfig {
  constructor(app: Application){
    super(app, 'TaskRoutes')
  }
  configureRoutes(){

    this.app.route(`/createtask`).post([aplication , TaskController.createTask])

    return this.app
  }
}
