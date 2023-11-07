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

      const userVendor = await USER_MODEL.find({ specialist: { $in: payload.tag } })

      await EVENT_MODEL.create({
        ...payload,
        company: userPermission.company,
        _vendor: userVendor
      })

      return { message: true, result: null }
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
            $project: {
              _id: 0,
              company: '$company',
              name: '$name',
              tag: '$tag',
              status: '$status',
              vendor: '$vendor.username',
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
        const vendorData = await USER_MODEL.find({ _id: userId })

        let tags = []
        for (const data of vendorData) {
          const dataTag = data.specialist

          tags.push(dataTag)
        }

        const aggregates = [
          {
            $match: { tag: { $in: tags } }
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
            $project: {
              _id: 0,
              company: '$company',
              name: '$name',
              tag: '$tag',
              status: '$status',
              vendor: '$vendor.username',
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

  public async updateEvent(payload: EVENT_DOCUMENT, userId: string) {
    try {
      const data = await EVENT_MODEL.findByIdAndUpdate(payload)

      return { message: true, result: data }
    } catch (error) {
      throw error
    }
  }

  public async deleteEvent(payload: EVENT_DOCUMENT) {
    try {
      const data = await EVENT_MODEL.findByIdAndUpdate(payload)

      return { message: true, result: data }
    } catch (error) {
      throw error
    }
  }
}
