// app/api/fetchReddit/route.js
import dotenv from "dotenv"
import { MongoClient } from "mongodb"
import { NextResponse } from "next/server"
import fetch from "node-fetch"

dotenv.config()

const postUpvotesThreshold = 5
const commentUpvotesThreshold = 2

const ClientId = process.env.REDDIT_CLIENT_ID
const ClientSecret = process.env.REDDIT_CLIENT_SECRET
const UserAgent = process.env.REDDIT_USER_AGENT
const RefreshToken = process.env.REDDIT_REFRESH_TOKEN
const MONGO_URI = process.env.MONGO_DB_URL

// Function to get OAuth2 token
async function getAccessToken() {
  const auth = Buffer.from(`${ClientId}:${ClientSecret}`).toString("base64")
  const response = await fetch("https://www.reddit.com/api/v1/access_token", {
    method: "POST",
    headers: {
      Authorization: `Basic ${auth}`,
      "Content-Type": "application/x-www-form-urlencoded",
      "User-Agent": UserAgent,
    },
    body: `grant_type=refresh_token&refresh_token=${RefreshToken}`,
  })

  const data = await response.json()
  if (data.error) {
    throw new Error(`Failed to fetch access token: ${data.error}`)
  }

  return data.access_token
}

export async function GET() {
  const client = new MongoClient(MONGO_URI)
  const dbName = "redditData"
  const collectionName = "wsb24hour"

  try {
    console.log("Connecting to MongoDB...")
    await client.connect()
    const db = client.db(dbName)
    const collection = db.collection(collectionName)

    console.log("Creating indexes...")
    await collection.createIndex({ id: 1 }, { unique: true, name: "post_id_unique_index" })
    await collection.createIndex({ "comments.id": 1 }, { unique: true, sparse: true, name: "comment_id_unique_index" })
    await collection.createIndex({ createdAt: 1 }, { expireAfterSeconds: 86400, name: "created_at_expire_index" })

    console.log("Fetching OAuth2 access token...")
    const accessToken = await getAccessToken()

    console.log("Fetching new posts from Reddit...")
    const response = await fetch("https://oauth.reddit.com/r/wallstreetbets/new/.json?limit=10", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "User-Agent": UserAgent,
      },
    })

    const data = await response.json()
    const posts = data.data.children

    console.log(`Received ${posts.length} posts from Reddit.`)

    for (const post of posts) {
      console.log(`Processing post: ${post.data.title} with ${post.data.ups} upvotes`)
      if (post.data.ups >= postUpvotesThreshold) {
        const commentsResponse = await fetch(`https://oauth.reddit.com${post.data.permalink}.json?limit=100`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "User-Agent": UserAgent,
          },
        })
        const commentsData = await commentsResponse.json()
        const filteredComments = commentsData[1].data.children
          .filter((comment) => comment.data.ups >= commentUpvotesThreshold)
          .map((comment) => ({
            id: comment.data.id || null,
            body: comment.data.body,
            upvotes: comment.data.ups,
          }))
          .filter((comment) => comment.id !== null) // Filter out comments with null IDs

        const postToInsert = {
          id: post.data.id,
          title: post.data.title,
          upvotes: post.data.ups,
          permalink: post.data.permalink,
          comments: filteredComments,
          createdAt: new Date(),
        }

        console.log(`Inserting post ${postToInsert.id} into MongoDB`)
        await collection.updateOne({ id: postToInsert.id }, { $set: postToInsert }, { upsert: true })
      }
    }

    return NextResponse.json({ message: "Reddit posts fetched and saved successfully" })
  } catch (error) {
    console.error("Error in fetching or processing Reddit data:", error)
    return NextResponse.json({ error: "Failed to fetch or save Reddit posts" }, { status: 500 })
  } finally {
    console.log("Closing MongoDB connection.")
    await client.close()
  }
}
