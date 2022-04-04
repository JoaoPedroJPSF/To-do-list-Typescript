import {RouteConfig} from './routeConfig'
import express, { Application, Request, Response, Express, Router } from 'express'
import {ITask} from '../database/taskInterface'

import TaskController from '../controllers/taskController'

const app: Express = express()
const application = app.use(express.urlencoded({extended: true}))
app.use(express.json())

export class TaskRoutes extends RouteConfig {
  constructor(app: Application){
    super(app, 'TaskRoutes')
  }
  configureRoutes(){
    this.app.route(`/task`)
    .post([application, TaskController.createTask])
    .get([application, TaskController.getTasks])

    this.app.route(`/task/:id`)
    .put([application, TaskController.changeTaskState])
    .delete([application, TaskController.deleteTask])
    .get([application, TaskController.getOneTask])

    this.app.route(`/task/changename/:id`)
    .put([application, TaskController.changeTaskName])

    return this.app
  }
}
