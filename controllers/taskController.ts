import { Request, Response, NextFunction} from 'express'

class TaskController {
  constructor(){}

  async getTask(req: Request, res: Response, next: NextFunction){
    return res.status(200).json({
      success: true,
      data: [
        {
          description: "Buy shit",
        },
        {
          description: "Sell shit",
        },
      ],
    }),
    console.log('Reached')
  }
}

export default new TaskController()
