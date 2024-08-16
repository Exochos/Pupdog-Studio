// app/api/fetchReddit/route.js
import dotenv from "dotenv"
import { MongoClient } from "mongodb"
import { NextResponse } from "next/server"
import fetch from "node-fetch"

dotenv.config()

const postUpvotesThreshold = 8
const commentUpvotesThreshold = 2

const ClientId = process.env.REDDIT_CLIENT_ID
const ClientSecret = process.env.REDDIT_CLIENT_SECRET
const UserAgent = process.env.REDDIT_USER_AGENT
const MONGO_URI = process.env.MONGO_DB_URL

export async function GET() {
  const client = new MongoClient(MONGO_URI)
  const dbName = "redditData"
  const collectionName = "wsb24hour"

  try {
    await client.connect()
    const db = client.db(dbName)
    const collection = db.collection(collectionName)

    await collection.createIndex({ id: 1 }, { unique: true })
    await collection.createIndex({ "comments.id": 1 }, { unique: true })
    await collection.createIndex({ createdAt: 1 }, { expireAfterSeconds: 86400 })

    const response = await fetch("https://www.reddit.com/r/wallstreetbets/new/.json?limit=10", {
      method: "GET",
      headers: {
        "User-Agent": UserAgent,
        Authorization: `Basic ${Buffer.from(`${ClientId}:${ClientSecret}`).toString("base64")}`,
      },
    })

    const data = await response.json()
    const posts = data.data.children

    for (const post of posts) {
      if (post.data.ups >= postUpvotesThreshold) {
        const commentsResponse = await fetch(`https://www.reddit.com${post.data.permalink}.json?limit=100`, {
          method: "GET",
          headers: {
            "User-Agent": UserAgent,
          },
        })
        const commentsData = await commentsResponse.json()
        const filteredComments = commentsData[1].data.children.filter(
          (comment) => comment.data.ups >= commentUpvotesThreshold
        )

        const postToInsert = {
          id: post.data.id,
          title: post.data.title,
          upvotes: post.data.ups,
          permalink: post.data.permalink,
          comments: filteredComments.map((comment) => ({
            id: comment.data.id,
            body: comment.data.body,
            upvotes: comment.data.ups,
          })),
          createdAt: new Date(),
        }

        await collection.updateOne({ id: postToInsert.id }, { $set: postToInsert }, { upsert: true })
      }
    }

    return NextResponse.json({ message: "Reddit posts fetched and saved successfully" })
  } catch (error) {
    console.error("Error in fetching or processing Reddit data:", error)
    return NextResponse.json({ error: "Failed to fetch or save Reddit posts" }, { status: 500 })
  } finally {
    await client.close()
  }
}
