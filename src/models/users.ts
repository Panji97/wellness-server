import { Schema, model, Document } from 'mongoose'

interface USER_PROPS {
  username: string
  password: string
  accessToken: string
  company: string
  specialist: string
  _roles: string
}

const USER_SCHEMA = new Schema(
  {
    username: {
      type: String,
      unique: true,
      required: true
    },
    password: {
      type: String,
      required: true
    },
    accessToken: {
      type: String
    },
    company: {
      type: String
    },
    specialist: {
      type: String,
      unique: true
    },
    _roles: {
      type: Schema.Types.ObjectId,
      ref: 'user-roles'
    }
  },
  {
    timestamps: true
  }
)

interface USER_DOCUMENT extends Document, USER_PROPS {}
const USER_MODEL = model<USER_DOCUMENT>('users', USER_SCHEMA)

export default USER_MODEL
export { USER_DOCUMENT, USER_SCHEMA }
