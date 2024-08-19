// app/api/processRedditData/route.js
import dotenv from "dotenv"
import { MongoClient } from "mongodb"
import { NextResponse } from "next/server"
import { stopWords } from "./stopWords"

dotenv.config()

const MONGO_URI = process.env.MONGO_DB_URL || "mongodb://localhost:27017"
if (!MONGO_URI.startsWith("mongodb")) {
  throw new Error("Invalid MongoDB connection string.")
}
const dbName = "redditData"
const collectionName = "wsb24hour"

let client
let clientPromise

if (!client) {
  client = new MongoClient(MONGO_URI)
  clientPromise = client.connect()
}

const countWords = (text) => {
  const counts = {}
  const words = text
    .replace(/[.,\\/#!$%^&\\*;:{}=\-_`~()]/g, "")
    .toLowerCase()
    .split(/\s+/)

  words.forEach((word) => {
    const isUrl = /https?:\/\/[^\s]+|reddit|jpeg|jpg|png/.test(word)
    const isLongNoise = word.length > 30
    const isNumber = /^\d+$/.test(word)
    const isEmpty = word.trim() === ""
    const isTooLong = word.length > 10 // New filter for words longer than 10 characters
    const isUnwantedPattern = word.startsWith("[img]") || word.includes("emote") || word.includes("|")

    if (!isUrl && !isNumber && !isEmpty && !isLongNoise && !isTooLong && !isUnwantedPattern && !stopWords.has(word)) {
      counts[word] = counts[word] ? counts[word] + 1 : 1
    }
  })

  return counts
}

const mergeCounts = (allCounts, newCounts) => {
  for (const key in newCounts) {
    if (newCounts.hasOwnProperty(key)) {
      allCounts[key] = allCounts[key] ? allCounts[key] + newCounts[key] : newCounts[key]
    }
  }
  return allCounts
}

export async function GET() {
  try {
    const db = (await clientPromise).db(dbName)
    const collection = db.collection(collectionName)

    const cursor = collection.find({})
    const allWordCounts = {}

    await cursor.forEach((post) => {
      const postText = post.title + " " + (post.selftext || "")
      const postCounts = countWords(postText)
      mergeCounts(allWordCounts, postCounts)

      post.comments.forEach((comment) => {
        if (comment.body.trim().startsWith("[img]")) {
          return
        }
        const commentCounts = countWords(comment.body)
        mergeCounts(allWordCounts, commentCounts)
      })
    })

    const formattedCounts = Object.keys(allWordCounts)
      .map((key) => ({ word: key, value: allWordCounts[key] }))
      .filter((item) => !stopWords.has(item.word))

    formattedCounts.sort((a, b) => b.value - a.value)

    return NextResponse.json({ wordList: formattedCounts })
  } catch (error) {
    console.error("Error processing data:", error)
    return NextResponse.json({ error: "Failed to process data" }, { status: 500 })
  }
}
