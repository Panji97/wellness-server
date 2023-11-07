import { Request, Response } from 'express'
import ErrorHandler from '../../modules/error'
import AuthenticateService from './auth.service'

export default class AuthenticateController extends ErrorHandler {
  private service: AuthenticateService

  constructor() {
    super()
    this.service = new AuthenticateService()
  }

  public registerUser() {
    return async (req: Request, res: Response) => {
      try {
        const result = await this.service.register(req.body)

        return res
          .status(201)
          .json({ message: result.message, result: result.result })
      } catch (error) {
        this.handleError(error, req, res)
      }
    }
  }

  public loginUser() {
    return async (req: Request, res: Response) => {
      try {
        const result = await this.service.login(req.body)

        return res.status(200).json(result)
      } catch (error) {
        this.handleError(error, req, res)
      }
    }
  }
}
