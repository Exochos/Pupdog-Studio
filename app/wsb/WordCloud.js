// components/WordCloud.js
"use client"
import Chart from "chart.js/auto"
import { WordCloudController, WordElement } from "chartjs-chart-wordcloud"
import { useEffect, useRef } from "react"

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
])

const WordCloud = ({ words }) => {
  const canvasRef = useRef(null)
  const chartInstanceRef = useRef(null)

  useEffect(() => {
    if (canvasRef.current && !chartInstanceRef.current) {
      const canvas = canvasRef.current
      const ctx = canvas.getContext("2d")

      if (ctx) {
        chartInstanceRef.current = new Chart(ctx, {
          type: "wordCloud",
          data: {
            labels: words.map((d) => d.word),
            datasets: [
              {
                data: words.map((d) => 2 + d.value * 10),
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
                  const word = words[index].word.toLowerCase()
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
      <canvas ref={canvasRef} className="animate__animated animate__fadeIn max-h-full max-w-full"></canvas>
    </div>
  )
}

export default WordCloud
