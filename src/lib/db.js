import { MongoClient } from 'mongodb'

const mongoUri = process.env.MONGODB_URI

if (!mongoUri) {
  throw new Error('MONGODB_URI must be set to connect to the MongoDB database.')
}

export const client = new MongoClient(mongoUri)
export const db = client.db()

let initializationPromise

export async function initializeDatabase() {
  initializationPromise ||= client.connect().catch((error) => {
    initializationPromise = undefined
    throw error
  })
  await initializationPromise
}
