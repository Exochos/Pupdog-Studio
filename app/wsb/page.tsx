import React from "react"
import { logEvent } from "app/utils/googleAnalytics"
import WordCloud from "./WordCloud"

export const metadata = {
  title: "A WallStreet Bets (almost) live Word Cloud",
  description: "A Word cloud which tracks the most recent (24 hours) posts on the WallStreetBets subreddit",
  url: "https://dev.pupdog.studio/wsb",
  keywords: ["Word Cloud", "WallStreetBets", "Reddit", "API", "Next.js", "Stonks", "GME", "AMC", "WSB"],
}

const Page = () => {

  // Track page view
  React.useEffect(() => {
    logEvent("User", "Viewed Page", "WallStreetBets Word Cloud")
  }, [])
  return (
    <>
      <WordCloud />
    </>
  )
}

export default Page
