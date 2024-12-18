import React from "react"
import InfoButton from "./infoButton"
import WordCloud from "./WordCloud"

// Metadata for the page
export const metadata = {
  title: "A WSB live Word Cloud",
  description: "A Word cloud which tracks the most recent (24 hours) posts on the WallStreetBets subreddit",
  keywords: ["Word Cloud", "WallStreetBets", "Reddit", "API", "Next.js", "Stonks", "GME", "AMC", "WSB"],
}

const Page = () => {
  return (
    <>
      <WordCloud />
      <InfoButton />
    </>
  )
}

export default Page
