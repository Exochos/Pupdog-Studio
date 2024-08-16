import React from "react"
import WordCloud from "./WordCloud"

export const metadata = {
  title: "WSB Word Cloud",
  description: "A word cloud of the most common words used in WSB posts.",
}

const Page = () => {
  return (
    <>
      <WordCloud />
    </>
  )
}

export default Page
