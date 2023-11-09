import { Types } from 'mongoose'

import USER_MODEL from '../../models/users'
import EVENT_MODEL, { EVENT_DOCUMENT } from '../../models/events'

export default class EventService {
  public async createEvent(payload: EVENT_DOCUMENT, userId: string) {
    try {
      const userPermission = await USER_MODEL.findById(userId)

      if (!userPermission) {
        return { message: 'User not found', result: null }
      }

      if (userPermission.username !== 'HR') {
        return { message: 'Not have permission', result: null }
      }

      await EVENT_MODEL.create({
        ...payload,
        company: userPermission.company
      })

      return { message: 'Success create event', result: null }
    } catch (error) {
      throw error
    }
  }

  public async showEvent(userId: string) {
    try {
      const userData = await USER_MODEL.findById(userId)

      if (!userData) {
        return { message: 'Not found', result: null }
      }

      let result
      if (userData.username === 'HR') {
        const aggregates = [
          {
            $lookup: {
              from: 'users',
              localField: '_vendor',
              foreignField: '_id',
              as: 'vendor'
            }
          },
          {
            $unwind: {
              path: '$vendor'
            }
          },
          {
            $project: {
              _id: 0,
              id: '$_id',
              company: '$company',
              name: '$name',
              status: '$status',
              remark: '$remark',
              location: '$location',
              vendor: '$vendor.company',
              vendorId: '$vendor._id',
              date: {
                $map: {
                  input: '$date',
                  in: {
                    $dateToString: {
                      date: '$$this',
                      format: '%d-%m-%Y'
                    }
                  }
                }
              },
              created: {
                $dateToString: {
                  date: '$createdAt',
                  format: '%d-%m-%Y'
                }
              }
            }
          }
        ]

        result = await EVENT_MODEL.aggregate(aggregates)
      } else {
        const aggregates = [
          {
            $match: {
              _vendor: new Types.ObjectId(userId)
            }
          },
          {
            $lookup: {
              from: 'users',
              localField: '_vendor',
              foreignField: '_id',
              as: 'vendor'
            }
          },
          {
            $unwind: {
              path: '$vendor'
            }
          },
          {
            $project: {
              _id: 0,
              id: '$_id',
              company: '$company',
              name: '$name',
              status: '$status',
              remark: '$remark',
              location: '$location',
              vendor: '$vendor.company',
              vendorId: '$vendor._id',
              date: {
                $map: {
                  input: '$date',
                  in: {
                    $dateToString: {
                      date: '$$this',
                      format: '%d-%m-%Y'
                    }
                  }
                }
              },
              created: {
                $dateToString: {
                  date: '$createdAt',
                  format: '%d-%m-%Y'
                }
              }
            }
          }
        ]

        result = await EVENT_MODEL.aggregate(aggregates)
      }

      return { message: true, result: result }
    } catch (error) {
      throw error
    }
  }

  public async updateEvent(payload: EVENT_DOCUMENT, userId: string, paramsId: string) {
    try {
      const userExist = await USER_MODEL.findById(userId)

      if (!userExist) {
        return { message: 'User not found', result: null }
      }

      if (!Array.isArray(payload.date)) {
        payload.status = 'approve'
      } else {
        payload.status = 'reject'
      }

      await EVENT_MODEL.findByIdAndUpdate(paramsId, payload, { new: true })

      return { message: 'Success update event', result: null }
    } catch (error) {
      throw error
    }
  }

  public async deleteEvent(paramsId: string) {
    try {
      await EVENT_MODEL.findByIdAndDelete(paramsId)

      return { message: 'Success delete event', result: null }
    } catch (error) {
      throw error
    }
  }
}
