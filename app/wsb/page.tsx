import React from "react"
import WordCloud from "./WordCloud"
import wordCount from "./wordCount.json"

export const metadata = {
  title: "WSB Word Cloud",
  description: "A word cloud of the most common words used in WSB posts.",
}

const Page = () => {
  return (
    <>
      <WordCloud words={wordCount} />
    </>
  )
}

export default Page
