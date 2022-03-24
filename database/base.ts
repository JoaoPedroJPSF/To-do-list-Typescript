import { model, Schema, connect } from 'mongoose'
import dotenv from 'dotenv'
import {ITask} from  './taskInterface'
dotenv.config({})


//Gets data from .env files
const MONGO_URI = `mongodb+srv://${process.env.USER}:${process.env.PASSWORD}@cluster0.piaf2.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`

const TaskSchema = new Schema<ITask>({
  description:{
    type: String,
    required: true
  }
})

const TaskModel = model<ITask>("Task", TaskSchema)

//Creates class that connects to the Database
class MongooseService{
  private mongooseOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    serverSelectionTimeoutMS: 5000,
    useFindAndModify: false,

  }
  constructor(){
    this.connectToDataBase
  }

  modelling(task: ITask){
    console.log(task)
    return new TaskModel(task).save()
  }

  async connectToDataBase():Promise<void>{
    await connect(MONGO_URI)
    return console.log('Database Connected')
  }

}


export default new MongooseService()
