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
              max: 26
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
      for (let i = 0; i < numRolls; i++) {
        await new Promise((resolve) => setTimeout(resolve, 200)) // Delay for animation change to speed up or slow down
        const card = Math.random() < 0.5 ? "red" : "black"
        if (card === "red" && redCards < 26) {
          setRedCards((prev) => prev + 1)
        } else if (card === "black" && blackCards < 26) {
          setBlackCards((prev) => prev + 1)
        }
      }
    }

    if (numRolls > 0) {
      setRedCards(0)
      setBlackCards(0)
      drawCard()
    }
  }, [numRolls])

  useEffect(() => {
    if (chartInstanceRef.current) {
      const datasets = chartInstanceRef.current.data.datasets
      if (datasets && datasets[0]) {
        datasets[0].data = [redCards, blackCards]
        chartInstanceRef.current.update()
      }
    }
  }, [redCards, blackCards])

  return (
    <div className="flex justify-center items-center h-full">
      <canvas ref={chartRef} />
    </div>
  )
}

export default DrawingCards
