import express, { Express, Request, Response, NextFunction} from 'express'
import MongooseService from '../database/base'
import {ITask} from '../database/taskInterface'

const taskModelling = MongooseService.modelling


class TaskController {
  constructor(){}

  async createTask(req: any, res: Response, next: NextFunction){

    const body = req.body
    console.log(body)

    taskModelling(body)
    //res.send(req.body)
    return res.status(200).json({
      success: true
    })
}}

export default new TaskController()
