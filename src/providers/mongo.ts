import { MONGO } from '../gajah.json'
import mongoose from 'mongoose'

export class MongoProvider {
  private mongoUrl: string

  constructor() {
    this.mongoUrl = MONGO
  }

  async connect() {
    try {
      await mongoose.connect(this.mongoUrl)
      console.info('Connected to Mongo')
    } catch (error) {
      throw new Error('Failed to connect to MongoDB:' + error)
    }
  }
}
