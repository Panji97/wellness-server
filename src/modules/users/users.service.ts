import { Types } from 'mongoose'
import USER_MODEL, { USER_DOCUMENT } from '../../models/users'

export default class UserService {
  public async allUser() {
    try {
      const result = await USER_MODEL.find()

      return { message: true, result: result }
    } catch (error) {
      throw error
    }
  }

  public async userLogin(userId: string) {
    try {
      const aggregates = [
        {
          $match: {
            _id: new Types.ObjectId(userId)
          }
        },
        {
          $lookup: {
            from: 'user_roles',
            localField: '_roles',
            foreignField: '_id',
            as: 'roles',
            pipeline: [
              {
                $project: {
                  _id: 0,
                  menus: {
                    name: 1,
                    icon: 1,
                    link: 1,
                    child: {
                      name: 1,
                      icon: 1,
                      link: 1
                    }
                  }
                }
              }
            ]
          }
        },
        {
          $unwind: {
            path: '$roles'
          }
        },
        {
          $project: {
            _id: 0,
            username: '$username',
            company: '$company',
            path: '$roles.menus.child.link',
            menus: '$roles.menus'
          }
        },
        {
          $unwind: {
            path: '$path'
          }
        },
        {
          $unwind: {
            path: '$path'
          }
        }
      ]

      const [result] = await USER_MODEL.aggregate(aggregates)

      return { message: true, result: result }
    } catch (error) {
      throw error
    }
  }

  public async updateUser(payload: USER_DOCUMENT, paramsId: string) {
    try {
      await USER_MODEL.findByIdAndUpdate(paramsId, payload)

      return { message: 'Success update user', result: null }
    } catch (error) {
      throw error
    }
  }
}
