import { RequestHandler } from 'express'
import helmet from 'helmet'

const helmetHandler = (): RequestHandler => {
  return helmet()
}

export default helmetHandler
