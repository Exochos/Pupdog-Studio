// wsb/infoButton.tsx
// Info button component
"use client"
import React, { useState } from "react"


const InfoButton = () => {
  const [showInfo, setShowInfo] = useState(false)

  return (
    <>
      <button
        onClick={() => setShowInfo(!showInfo)}
        className="absolute top-0 right-0 m-4 p-2 bg-blue-500 text-white rounded-lg"
      >
        {showInfo ? "Hide Info" : "Show Info"}
      </button>
      {showInfo && (
        <div className="absolute top-0 right-0 m-4 p-2 bg-blue-500 text-white rounded-lg">
          <p>
            This is a live word cloud of the most recent posts on the WallStreetBets subreddit. The size of the words
            corresponds to the frequency of the word in the posts.
          </p>
        </div>
      )}
    </>
  )
}

export default InfoButton