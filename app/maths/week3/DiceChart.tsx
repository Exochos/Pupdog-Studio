import { Chart, registerables } from "chart.js"
import React, { useEffect, useRef, useState } from "react"

Chart.register(...registerables)

const DiceChart: React.FC<{ numRolls: number }> = ({ numRolls }) => {
  const chartRef = useRef<HTMLCanvasElement>(null)
  const chartInstanceRef = useRef<Chart | null>(null)
  const [currentRoll, setCurrentRoll] = useState<number[]>(Array(6).fill(0))

  useEffect(() => {
    const ctx = chartRef.current?.getContext("2d")

    if (ctx) {
      chartInstanceRef.current = new Chart(ctx, {
        type: "bar",
        data: {
          labels: ["1", "2", "3", "4", "5", "6"],
          datasets: [
            {
              label: "Dice Roll",
              data: currentRoll,
              backgroundColor: ["#3e95cd", "#8e5ea2", "#3cba9f", "#e8c3b9", "#c45850", "#8e5ea2"],
            },
          ],
        },
        options: {
          plugins: {
            legend: { display: false },
            title: {
              display: true,
              text: "Dice Roll",
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
    const rollDice = async () => {
      const rolls = Array(6).fill(0)
      for (let i = 0; i < numRolls; i++) {
        await new Promise((resolve) => setTimeout(resolve, 200)) // Delay for animation change to speed up or slow down
        const roll = Math.floor(Math.random() * 6) + 1
        rolls[roll - 1]++
        setCurrentRoll([...rolls])

        if (chartInstanceRef.current) {
          const chartInstance = chartInstanceRef.current;
          if (chartInstance.data.datasets[0]) {
            chartInstance.data.datasets[0].data = [...rolls];
            chartInstance.update();
          }
        }
      }
    }

    if (numRolls > 0) {
      rollDice()
    }
  }, [numRolls])

  return (
    <div className="flex justify-center items-center h-full">
      <canvas ref={chartRef} id="chartDiceRoll"></canvas>
    </div>
  )
}

export default DiceChart
