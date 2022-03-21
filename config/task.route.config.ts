import {RouteConfig} from './routeConfig'
import express, { Application, Request, Response } from 'express'
import TaskController from '../taskController'

export class TaskRoutes extends RouteConfig {
  constructor(app: Application){
    super(app, 'TaskRoutes')
  }

  configureRoutes(){
    this.app.route(`/tasks`).get([TaskController.getTask])

    return this.app
  }


}
