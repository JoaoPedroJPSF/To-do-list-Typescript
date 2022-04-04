import express, { Express, Request, Response, NextFunction} from 'express'
import MongooseService from '../database/base'
import TaskModel from '../database/schemas'
import {ITask} from '../database/taskInterface'

class TaskController {
  constructor(){}
  //Creates a task
  async createTask(req: Request, res: Response, next: NextFunction){
    const body = req.body
    console.log(`Creating task ${req.body.description}`)
    new TaskModel(body).save()
    return res.status(200).json({
      success: true
    })
  }
  //Get tasks
  async getTasks(req: Request, res: Response, next: NextFunction){
    const allTask = await TaskModel.find()
    console.log(allTask)
    return res.send(allTask)
  }
  //Change a task
  async changeTaskState(req: Request, res: Response, next: NextFunction){
    // Gets the body we'll use
    let { _id } = req.body
    // Find the task in the database
    const task = await TaskModel.findById({_id})
    // Checks if the task exists
    if(!task){
      console.log(`Task not found`)
      return res.status(404).send({'message': `Task not found`})
    }else{
      // Get the state of the task
      let state: Boolean = !task.finished
      ///////////////////////////////////////////////////////////////////////////
      // Will change this to a decent logger
      //console.log({state})
      //console.log(`The task founded has the description ${description} and is ${task}`)
      //console.log(task.description)
      ///////////////////////////////////////////////////////////////////////////
      //Find the task and update it
      await TaskModel.findByIdAndUpdate(
        _id,
        {
          $set: {
            finished: state
          }
        })
      //Same as up there
      //console.log(task)
      //return the task to the client
      return res.status(200).send(task)
    }
    }
  //Change a task name
  async changeTaskName(req: Request, res: Response, next: NextFunction){
    // Gets the body we'll use
    let { _id, description } = req.body
    // Find the task in the database
    const task = await TaskModel.findById({_id})
    // Checks if the task exists
    if(!task){
      console.log(`Task not founded`)
      return res.status(404).send({'message': `Task not found`})
    }else{
      // Get the name of the task
      let newDescription: String = description
      ///////////////////////////////////////////////////////////////////////////
      // Will change this to a decent logger
      ///////////////////////////////////////////////////////////////////////////
      //Find the task and update it
      await TaskModel.findByIdAndUpdate(
        _id,
        {
          $set: {
            description: newDescription
          }
        })
      //Same as up there
      //console.log(task)
      //return the task to the client
      return res.status(200).send(task)
    }
  }
  //Delete a task
  async deleteTask(req: Request, res: Response, next: NextFunction){
    const { _id } = req.body
    //Get the task
    const task = await TaskModel.findById({_id})
    //Checks if it exists
    if(!task){
      return res.status(404).send({'message': 'Task not founded'})
    }else{
      //Delete it
      const deleted = await TaskModel.findByIdAndDelete({_id: task._id})
      console.log(`Deleting task ${task.description}`)
      return res.status(200).send({'deleted': task})
    }

  }
  //Get a task
  async getOneTask(req: Request, res: Response, next: NextFunction){
    const { _id } = req.body

    const task = await TaskModel.findById({_id})

    if(!task){
      return res.status(404).send({'message': 'message not found'})

    }else{
      console.log(task)
      return res.status(200).send({task})
    }

  }

} 


export default new TaskController()
