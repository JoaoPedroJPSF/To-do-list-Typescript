import express, { Express, Request, Response, NextFunction} from 'express'
import MongooseService from '../database/base'
import TaskModel from '../database/schemas'
import {ITask} from '../database/taskInterface'

class TaskController {
  constructor(){}

  async createTask(req: Request, res: Response, next: NextFunction){
    const body = req.body
    console.log(`Creating task ${req.body.description}`)
    new TaskModel(body).save()
    return res.status(200).json({
      success: true
    })
  }

  async getTasks(req: Request, res: Response, next: NextFunction){
    const allTask = await TaskModel.find()
    res.send(allTask)
    return console.log(allTask)
  }

}

export default new TaskController()
