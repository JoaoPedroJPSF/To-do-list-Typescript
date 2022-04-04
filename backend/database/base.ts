import { model, Schema, connect } from 'mongoose'
import dotenv from 'dotenv'
import {ITask} from  './taskInterface'
import TaskModel from './schemas'
dotenv.config({})


//Gets data from .env files
const MONGO_URI = `mongodb+srv://${process.env.USER}:${process.env.PASSWORD}@cluster0.piaf2.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`

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

  async connectToDataBase():Promise<void>{
    await connect(MONGO_URI)
    return console.log('Database Connected')
  }

}


export default new MongooseService()
