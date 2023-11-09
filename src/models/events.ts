import { Schema, model, Document } from 'mongoose'

interface EVENT_PROPS {
  company: string
  name: string
  date: Date[]
  status: 'approve' | 'reject' | null
  remark: string
  location: string
  _vendor: string
}

const EVENT_SCHEMA = new Schema(
  {
    company: {
      type: String
    },
    name: {
      type: String,
      require: true
    },
    date: [
      {
        type: Date
      }
    ],
    status: {
      type: String,
      enum: ['approve', 'reject', null],
      default: null
    },
    remark: {
      type: String
    },
    location: {
      type: String
    },
    _vendor: {
      type: Schema.Types.ObjectId,
      ref: 'users'
    }
  },
  {
    timestamps: true
  }
)

interface EVENT_DOCUMENT extends Document, EVENT_PROPS {}
const EVENT_MODEL = model<EVENT_DOCUMENT>('event', EVENT_SCHEMA)

export default EVENT_MODEL
export { EVENT_DOCUMENT, EVENT_SCHEMA }
