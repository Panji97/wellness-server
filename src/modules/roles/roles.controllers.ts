import { Request, Response } from 'express'
import ErrorHandler from '../../modules/error'
import RoleService from './roles.service'

export default class RoleControllers extends ErrorHandler {
  private service: RoleService

  constructor() {
    super()
    this.service = new RoleService()
  }

  public create() {
    return async (req: Request, res: Response) => {
      try {
        const RESULT = await this.service.cretaRole(req.body)

        return res.status(201).json({ message: RESULT.message, result: RESULT.result })
      } catch (error) {
        this.handleError(error, req, res)
      }
    }
  }
}
