import { Document } from 'mongoose'

export interface ITask extends Document {
  _id: String,
  description: String,
  finished: Boolean
}
 
