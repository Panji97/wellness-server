import { Request, Response } from 'express'
import ErrorHandler from '../error'
import UserService from './users.service'

export default class UserController extends ErrorHandler {
  private service: UserService

  constructor() {
    super()
    this.service = new UserService()
  }

  public showAll() {
    return async (req: Request, res: Response) => {
      try {
        const result = await this.service.allUser()

        return res.status(200).json({ message: result.message, result: result.result })
      } catch (error) {
        this.handleError(error, req, res)
      }
    }
  }

  public showId() {
    return async (req: Request, res: Response) => {
      try {
        const result = await this.service.userLogin(String(req.user))

        return res.status(200).json({ message: result.message, result: result.result })
      } catch (error) {
        this.handleError(error, req, res)
      }
    }
  }

  public update() {
    return async (req: Request, res: Response) => {
      try {
        const result = await this.service.updateUser(req.body, req.params.id)

        return res.status(200).json({ message: result.message, result: result.result })
      } catch (error) {
        this.handleError(error, req, res)
      }
    }
  }
}
