import { Schema, model } from 'mongoose'
import { ITask } from './taskInterface'

const TaskSchema = new Schema<ITask>({
  description:{
    type: String,
    required: true
  },
  finished:{
    type: Boolean,
    default: false
  }
})

const TaskModel = model<ITask>("Task", TaskSchema)

export default TaskModel
