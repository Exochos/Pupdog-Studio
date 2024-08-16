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
    console.log("Connecting to MongoDB...")
    await client.connect()
    const db = client.db(dbName)
    const collection = db.collection(collectionName)

    console.log("Creating indexes...")
    await collection.createIndex({ id: 1 }, { unique: true })
    await collection.createIndex({ "comments.id": 1 }, { unique: true })
    await collection.createIndex({ createdAt: 1 }, { expireAfterSeconds: 86400 })

    console.log("Fetching new posts from Reddit...")
    const response = await fetch("https://www.reddit.com/r/wallstreetbets/new/.json?limit=10", {
      method: "GET",
      headers: {
        "User-Agent": UserAgent,
        Authorization: `Basic ${Buffer.from(`${ClientId}:${ClientSecret}`).toString("base64")}`,
      },
    })

    const contentType = response.headers.get("content-type")
    if (!response.ok) {
      throw new Error(`Failed to fetch posts: ${response.status} ${response.statusText}`)
    }
    if (!contentType || !contentType.includes("application/json")) {
      throw new Error(`Invalid content-type: Expected JSON but received ${contentType}`)
    }

    const data = await response.json()
    const posts = data.data.children

    console.log(`Received ${posts.length} posts from Reddit.`)

    for (const post of posts) {
      console.log(`Processing post: ${post.data.title} with ${post.data.ups} upvotes`)
      if (post.data.ups >= postUpvotesThreshold) {
        console.log(`Fetching comments for post: ${post.data.id}`)
        const commentsResponse = await fetch(`https://www.reddit.com${post.data.permalink}.json?limit=100`, {
          method: "GET",
          headers: {
            "User-Agent": UserAgent,
          },
        })

        const commentsContentType = commentsResponse.headers.get("content-type")
        if (!commentsResponse.ok) {
          throw new Error(`Failed to fetch comments: ${commentsResponse.status} ${commentsResponse.statusText}`)
        }
        if (!commentsContentType || !commentsContentType.includes("application/json")) {
          throw new Error(`Invalid content-type for comments: Expected JSON but received ${commentsContentType}`)
        }

        const commentsData = await commentsResponse.json()
        const filteredComments = commentsData[1].data.children.filter(
          (comment) => comment.data.ups >= commentUpvotesThreshold
        )

        console.log(`Found ${filteredComments.length} comments with at least ${commentUpvotesThreshold} upvotes`)

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

        console.log(`Inserting post ${post.data.id} into MongoDB`)
        await collection.updateOne({ id: postToInsert.id }, { $set: postToInsert }, { upsert: true })
        console.log(`Post ${post.data.id} successfully inserted/updated.`)
      }
    }

    console.log("All posts processed successfully.")
    return NextResponse.json({ message: "Reddit posts fetched and saved successfully" })
  } catch (error) {
    console.error("Error in fetching or processing Reddit data:", error)
    return NextResponse.json({ error: "Failed to fetch or save Reddit posts" }, { status: 500 })
  } finally {
    console.log("Closing MongoDB connection.")
    await client.close()
  }
}
