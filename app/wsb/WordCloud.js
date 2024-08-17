"use client"
import Chart from "chart.js/auto"
import { WordCloudController, WordElement } from "chartjs-chart-wordcloud"
import { useEffect, useRef, useState } from "react"

// Register the WordCloud controller and element with Chart.js
Chart.register(WordCloudController, WordElement)

// Common Company Names
const companyNames = new Set([
  "aapl",
  "apple",
  "tesla",
  "tsla",
  "amc",
  "gme",
  "gamestop",
  "nokia",
  "nok",
  "bb",
  "blackberry",
  "amzn",
  "amazon",
  "goog",
  "google",
  "msft",
  "microsoft",
  "fb",
  "facebook",
  "snap",
  "snapchat",
  "twtr",
  "twitter",
  "roku",
  "shop",
  "shopify",
  "intel",
  "intc",
  "amd",
  "rklb", // Rocket Lab
  "rocket",
  "asts", // AST SpaceMobile
])

const WordCloud = () => {
  const [words, setWords] = useState([])
  const [loading, setLoading] = useState(true)
  const canvasRef = useRef(null)
  const chartInstanceRef = useRef(null)

  useEffect(() => {
    const fetchWords = async () => {
      try {
        const response = await fetch("/api/processRedditData")
        const data = await response.json()
        if (data.wordList && data.wordList.length > 0) {  
          const filteredWords = data.wordList.filter(word => word.value > 1)
          setWords(filteredWords)
        } else {
          console.error("No words returned from the API")
        }
      } catch (error) {
        console.error("Failed to fetch words:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchWords()
  }, [])

  useEffect(() => {
    if (canvasRef.current && words.length > 0 && !chartInstanceRef.current) {
      const canvas = canvasRef.current
      const ctx = canvas.getContext("2d")

      if (ctx) {
        chartInstanceRef.current = new Chart(ctx, {
          type: "wordCloud",
          data: {
            labels: words.map((d) => d.word),
            datasets: [
              {
                data: words.map((d) => 1 + d.value * 6),
              },
            ],
          },
          options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
              legend: {
                display: false,
              },
            },
            elements: {
              word: {
                color: function (context) {
                  const index = context.dataIndex
                  const word = words[index]?.word?.toLowerCase()
                  return companyNames.has(word) ? "#FF0000" : "#000000"
                },
              },
            },
          },
        })
      }
    }

    return () => {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy()
        chartInstanceRef.current = null
      }
    }
  }, [words])

  return (
    <div className="flex h-screen w-screen items-center justify-center bg-gray-100">
      {loading ? (
        <span className="loading loading-ring loading-lg"></span>
      ) : words.length > 0 ? (
        <canvas ref={canvasRef} className="animate__animated animate__fadeIn max-h-full max-w-full"></canvas>
      ) : (
        <p>No words available to display.</p>
      )}
    </div>
  )
}

export default WordCloud
