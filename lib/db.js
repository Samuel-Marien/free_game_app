import { MongoClient } from 'mongodb'

export async function connectToDataBase() {
  const client = await MongoClient.connect(process.env.DB_URL)
  return client
}
