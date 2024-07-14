import { Chart, registerables } from "chart.js"
import React, { useEffect, useRef, useState } from "react"

Chart.register(...registerables)

const CompoundEvents: React.FC<{ numRolls: number }> = ({ numRolls }) => {
  const chartRef = useRef<HTMLCanvasElement>(null)
  const chartInstanceRef = useRef<Chart | null>(null)
  const [bothHeads, setBothHeads] = useState(0)
  const [atLeastOneHead, setAtLeastOneHead] = useState(0)

  useEffect(() => {
    const ctx = chartRef.current?.getContext("2d")

    if (ctx) {
      chartInstanceRef.current = new Chart(ctx, {
        type: "bar",
        data: {
          labels: ["Both Heads", "At Least One Head"],
          datasets: [
            {
              label: "Outcomes",
              data: [bothHeads, atLeastOneHead],
              backgroundColor: ["#ff6384", "#36a2eb"],
            },
          ],
        },
        options: {
          plugins: {
            legend: { display: false },
            title: {
              display: true,
              text: "Probability of Compound Events",
            },
          },
          scales: {
            y: {
              beginAtZero: true,
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
    const simulateCoinFlips = async () => {
      let currentBothHeads = 0
      let currentAtLeastOneHead = 0

      for (let i = 0; i < numRolls; i++) {
        await new Promise((resolve) => setTimeout(resolve, 100)) // Delay for animation change to speed up or slow down

        const coin1 = Math.random() < 0.5 ? "heads" : "tails"
        const coin2 = Math.random() < 0.5 ? "heads" : "tails"

        if (coin1 === "heads" && coin2 === "heads") {
          currentBothHeads++
        }

        if (coin1 === "heads" || coin2 === "heads") {
          currentAtLeastOneHead++
        }

        setBothHeads(currentBothHeads)
        setAtLeastOneHead(currentAtLeastOneHead)

        if (chartInstanceRef.current) {
          const chartInstance = chartInstanceRef.current
          if (chartInstance.data.datasets[0]) {
            chartInstance.data.datasets[0].data = [currentBothHeads, currentAtLeastOneHead]
            chartInstance.update()
          }
        }
      }
    }

    simulateCoinFlips()
  }, [numRolls])

  return (
    <div className="flex h-full items-center justify-center">
      <canvas ref={chartRef} />
    </div>
  )
}

export default CompoundEvents
