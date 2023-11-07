import _ from 'lodash'
import { sign } from 'jsonwebtoken'
import { HmacSHA256 } from 'crypto-js'

import { KEY } from '../../gajah.json'
import USER_MODEL, { USER_DOCUMENT } from '../../models/users'

export default class AuthenticateService {
  public async register(payload: USER_DOCUMENT) {
    try {
      const ENCRYPTED_PASSWORD = HmacSHA256(payload.password, KEY).toString()

      const USER_EXIST = await USER_MODEL.findOne({
        username: payload.username
      })

      if (USER_EXIST !== null) {
        return { message: 'Username already exist', result: null }
      }

      await USER_MODEL.create({
        username: payload.username,
        password: ENCRYPTED_PASSWORD,
        company: payload.company,
        specialist: payload.specialist,
        _roles: payload._roles
      })

      return { message: 'Success register user', result: null }
    } catch (error) {
      throw error
    }
  }

  public async login(payload: USER_DOCUMENT) {
    try {
      const USER_EXIST = await USER_MODEL.findOne({ username: payload.username })

      if (!USER_EXIST) {
        return { message: 'Username not found', result: null }
      }

      const ENCRYPTED_PASSWORD = HmacSHA256(payload.password, KEY).toString()

      if (ENCRYPTED_PASSWORD !== USER_EXIST.password) {
        return { message: 'Wrong password', result: null }
      }

      const ACCESS_TOKEN = sign({ id: USER_EXIST.id, username: USER_EXIST.username }, KEY, {
        algorithm: 'HS256',
        expiresIn: '7d'
      })

      USER_EXIST.accessToken = ACCESS_TOKEN

      await USER_EXIST.save()

      const aggregates = [
        {
          $match: {
            username: USER_EXIST.username
          }
        },
        {
          $lookup: {
            from: 'user_roles',
            localField: '_roles',
            foreignField: '_id',
            as: 'roles'
          }
        },
        {
          $unwind: {
            path: '$roles'
          }
        },
        {
          $unwind: {
            path: '$roles.menus'
          }
        },
        {
          $unwind: {
            path: '$roles.menus.child'
          }
        },
        {
          $project: {
            _id: 0,
            id: '$_id',
            username: 1,
            company: 1,
            accessToken: ACCESS_TOKEN,
            path: '$roles.menus.child.link'
          }
        }
      ]

      const [RESULT] = await USER_MODEL.aggregate(aggregates)

      return { message: 'Success login', result: RESULT }
    } catch (error) {
      throw error
    }
  }
}
