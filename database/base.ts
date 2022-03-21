import { model, Schema, connect } from 'mongoose'
import dotenv from 'dotenv'
dotenv.config({})

const MONGO_URI = `mongodb+srv://${process.env.USER}:${process.env.PASSWORD}@cluster0.piaf2.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`


interface Task {
  description: string
}

const TaskSchema = new Schema<Task>({
  description:{
    type: String,
    required: true
  }
})

const TaskModel = model<Task>("Task", TaskSchema)


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


//async function run(): Promise<void>{
//  await connect(MONGO_URI)
//  return console.log('Connected')
//}

export default new MongooseService()
