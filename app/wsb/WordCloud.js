"use client"

import Chart from "chart.js/auto"
import "animate.css"
import { WordCloudController, WordElement } from "chartjs-chart-wordcloud"
import { useEffect, useRef, useState } from "react"
import { logEvent } from "app/utils/googleAnalytics"
import afinn165 from "./afinn165.js" // Import the AFINN sentiment data
import commonCompanies from "./commonCo.js" // Import the common company names

// Register the WordCloud controller and element with Chart.js
Chart.register(WordCloudController, WordElement)

// Log event to Google Analytics
logEvent("WordCloud", "Viewed")

const WordCloud = () => {
  // Smaller scale for mobile devices
  const scaleFactor = window.innerWidth < 600 ? 1 : 4
  const [words, setWords] = useState([])
  const [loading, setLoading] = useState(true)
  const canvasRef = useRef(null)
  const chartInstanceRef = useRef(null)

  // Fetch the processed Reddit data
  useEffect(() => {
    const fetchProcessedWords = async () => {
      try {
        const response = await fetch("/api/processRedditData")
        const data = await response.json()
        if (data.wordList && data.wordList.length > 0) {
          setWords(data.wordList)
        } else {
          console.error("No words returned from the API")
        }
      } catch (error) {
        console.error("Failed to fetch words:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchProcessedWords()
  }, [])

  useEffect(() => {
    if (canvasRef.current && words.length > 0 && !chartInstanceRef.current) {
      const ctx = canvasRef.current.getContext("2d")
      if (ctx) {
        chartInstanceRef.current = new Chart(ctx, {
          type: "wordCloud",
          data: {
            labels: words.map((d) => d.word),
            datasets: [
              {
                data: words.map((d) => 1 + d.value * scaleFactor),
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
                padding: 3,
                color: function (context) {
                  const index = context.dataIndex
                  const word = words[index]?.word?.toLowerCase()
                  const company = commonCompanies.find(
                    (c) => c.ticker.toLowerCase() === word || c.name.toLowerCase() === word
                  )
                  if (company) {
                    return "#0000FF" // Blue for company names
                  }
                  const sentimentScore = afinn165[word] || 0
                  if (sentimentScore > 0) {
                    return `rgb(0, ${Math.min(255, sentimentScore * 50)}, 0)` // Green for positive sentiment
                  } else if (sentimentScore < 0) {
                    return `rgb(${Math.min(255, -sentimentScore * 50)}, 0, 0)` // Red for negative sentiment
                  }
                  return "#FFFFFF" // White for neutral sentiment
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
    <div className="flex h-screen w-screen items-center justify-center bg-black">
      {loading ? (
        <span className="loading loading-ring loading-lg"></span>
      ) : words.length > 0 ? (
        <canvas
          ref={canvasRef}
          style={{ width: "100%", height: "100%", maxWidth: "100vw", maxHeight: "100vh" }}
          className="animate__animated animate__fadeIn"
        ></canvas>
      ) : (
        <p>No words available to display.</p>
      )}
    </div>
  )
}

export default WordCloud
