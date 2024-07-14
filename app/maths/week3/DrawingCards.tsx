import { Chart, registerables } from "chart.js"
import React, { useEffect, useRef, useState } from "react"

Chart.register(...registerables)

const DrawingCards: React.FC<{ numRolls: number }> = ({ numRolls }) => {
  const chartRef = useRef<HTMLCanvasElement>(null)
  const chartInstanceRef = useRef<Chart | null>(null)
  const [redCards, setRedCards] = useState(0)
  const [blackCards, setBlackCards] = useState(0)

  useEffect(() => {
    const ctx = chartRef.current?.getContext("2d")

    if (ctx) {
      chartInstanceRef.current = new Chart(ctx, {
        type: "bar",
        data: {
          labels: ["Red", "Black"],
          datasets: [
            {
              label: "Cards",
              data: [redCards, blackCards],
              backgroundColor: ["#ff6384", "#5a5a5a"],
            },
          ],
        },
        options: {
          plugins: {
            legend: { display: false },
            title: {
              display: true,
              text: "Drawing Cards",
            },
          },
          scales: {
            y: {
              beginAtZero: true,
              max: 26,
            },
          },
        },
      })
    }

    return () => {
      chartInstanceRef.current?.destroy()
    }
  }, [])

  useEffect(() => {
    const drawCard = async () => {
      let currentRedCards = 0
      let currentBlackCards = 0

      for (let i = 0; i < numRolls; i++) {
        await new Promise((resolve) => setTimeout(resolve, 200)) // Delay for animation change to speed up or slow down
        const card = Math.random() < 0.5 ? "red" : "black"
        if (card === "red") {
          currentRedCards++
          setRedCards(currentRedCards)
        } else {
          currentBlackCards++
          setBlackCards(currentBlackCards)
        }

        if (chartInstanceRef.current && chartInstanceRef.current.data) {
          const datasets = chartInstanceRef.current.data.datasets
          if (datasets && datasets[0]) {
            datasets[0].data = [currentRedCards, currentBlackCards]
            chartInstanceRef.current.update()
          }
        }
      }
    }

    if (numRolls > 0) {
      setRedCards(0)
      setBlackCards(0)
      drawCard()
    }
  }, [numRolls])

  return (
    <div className="flex h-full items-center justify-center">
      <canvas ref={chartRef} />
    </div>
  )
}

export default DrawingCards
