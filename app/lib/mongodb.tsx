/** lib/mongodb.tsx
 * Generic MongoDB connection code
 * @param DB_NAME: string - The name of the database to connect to
 * @returns { client, db } - The MongoDB client and database
 */

import { MongoClient } from "mongodb"

const uri = process.env.MONGO_DB_URL || ""

if (!uri) {
  throw new Error("Please define the MONGO_DB_URL environment variable inside .env.local or .env.development")
}

let cachedClient: MongoClient | null = null
let cachedDb: any = null

export async function connectToDatabase() {
  if (cachedClient && cachedDb) {
    return { client: cachedClient, db: cachedDb }
  }

  try {
    const client = await MongoClient.connect(uri)
    const db = client.db("gameData")

    cachedClient = client
    cachedDb = db

    return { client, db }
  } catch (error) {
    console.error("MongoDB connection error:", error)
    throw new Error("Error connecting to MongoDB")
  }
}
