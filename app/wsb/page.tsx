"use client"
import React, { useState } from "react"
import { logEvent } from "../utils/googleAnalytics"

// log page view
logEvent("page_view", "WSB Sentiment Tracker")

function Page(): JSX.Element {
  // State variables
  const [symbol, setSymbol] = useState<string>("")

  return (
    <>
      <div className="container mx-auto flex items-center justify-center bg-white">
        <h1 className="text-4xl font-bold">WSB Sentiment Tracker 🚀</h1>
      </div>
    </>
  )
}

export default Page
