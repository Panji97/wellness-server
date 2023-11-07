import { Router, Request, Response } from 'express'

// import MasterRoutes from './master.routes'
import Authenticate from '../middlewares/authenticate'
import AuthenticateRoutes from '../modules/auth/auth.routes'
import RoleRoutes from '../modules/roles/roles.routes'
import UserRoutes from '../modules/users/users.routes'
import EventRoutes from '../modules/event/event.routes'

const router = Router()

router.get('/', (req: Request, res: Response) => {
  res.json({
    status: true,
    date: new Date(),
    result: 'REST API Hris (Legacy)'
  })
})

router.use('/o', new AuthenticateRoutes().routes())
router.use('/roles', new RoleRoutes().routes())

router.use('/user', new Authenticate().verifyToken, new UserRoutes().routes())
router.use('/event', new Authenticate().verifyToken, new EventRoutes().routes())
// router.use('/data', new Authenticate().verifyToken, new MasterRoutes().routes())

export default () => router
