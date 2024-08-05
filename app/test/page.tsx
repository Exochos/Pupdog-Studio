"use client"
import { useEffect, useState } from "react"

const CodePage = () => {
  const [code, setCode] = useState("")
  const [displayCode, setDisplayCode] = useState("")

  useEffect(() => {
    const fetchCode = async () => {
      const url = "TODO"
      const response = await fetch(url)
      const text = await response.text()
      setCode(text)
    }

    fetchCode()
  }, [])

  useEffect(() => {
    if (code) {
      const randomTags = ["<div>", "<span>", "<p>", "<h1>"]
      let modifiedCode = code
        .split("\n")
        .map((line, index) => {
          // Randomly add tags at the start or end of some lines
          if (Math.random() > 0.7) {
            // Adjust randomness as needed
            const tag = randomTags[Math.floor(Math.random() * randomTags.length)]
            return `${tag}${line}${tag.replace("<", "</")}`
          }
          return line
        })
        .join("\n")

      setDisplayCode(modifiedCode)
    }
  }, [code])

  return (
    <div>
      <h1>Code of This Page</h1>
      <pre style={{ whiteSpace: "pre-wrap", wordWrap: "break-word" }}>{displayCode}</pre>
    </div>
  )
}

export default CodePage
