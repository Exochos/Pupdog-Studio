"use client"
import { BarController, BarElement, CategoryScale, Chart as ChartJS, LinearScale } from "chart.js"
import React, { useEffect, useRef, useState } from "react"

// Register the necessary components
ChartJS.register(BarController, BarElement, CategoryScale, LinearScale)

const NDice: React.FC = () => {
  // State management
  const [nDiceSide, setNDiceSide] = useState<number | string>("")
  const [mNumberDice, setMNumberDice] = useState<number | string>("")
  const [kNumberRolls, setKNumberRolls] = useState<number | string>("")
  const [results, setResults] = useState<number[]>([])
  const [distribution, setDistribution] = useState<number[]>([])
  const [error, setError] = useState<string | null>(null)

  const chartRef = useRef<HTMLCanvasElement>(null)
  const chartInstanceRef = useRef<ChartJS | null>(null)

  // Handle change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    switch (name) {
      case "nDiceSide":
        setNDiceSide(value)
        break
      case "mNumberDice":
        setMNumberDice(value)
        break
      case "kNumberRolls":
        setKNumberRolls(value)
        break
    }
  }

  // Monte Carlo simulation to generate a normal distribution
  const generateDistribution = (n: number, m: number) => {
    const sizeMonteCarlo = 30000
    const distribution = Array.from({ length: n * m + 1 }, () => 0)

    for (let i = 0; i < sizeMonteCarlo; i++) {
      let sum = 0
      for (let j = 0; j < m; j++) {
        sum += Math.floor(Math.random() * n) + 1
      }
      if (distribution[sum] !== undefined) {
        distribution[sum] = (distribution[sum] || 0) + 1
      }
    }

    return distribution.map((value) => (value / sizeMonteCarlo) * 100)
  }

  // Handle simulate
  const handleSimulate = () => {
    const n = parseInt(nDiceSide as string, 10)
    const k = parseInt(kNumberRolls as string, 10)
    const m = parseInt(mNumberDice as string, 10)

    if (isNaN(n) || isNaN(k) || isNaN(m) || n < 1 || k < 1 || m < 1) {
      setError("Invalid input")
      return
    }

    const results = []
    for (let i = 0; i < k; i++) {
      let sum = 0
      for (let j = 0; j < m; j++) {
        sum += Math.floor(Math.random() * n) + 1
      }
      results.push(sum)
    }

    const distribution = generateDistribution(n, m)

    setResults(results)
    setDistribution(distribution)
    setError(null)
  }

  // Reset
  const handleReset = () => {
    setNDiceSide("")
    setMNumberDice("")
    setKNumberRolls("")
    setResults([])
    setDistribution([])
  }

  useEffect(() => {
    if (chartRef.current) {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy()
      }

      const n = parseInt(nDiceSide as string, 10)
      const m = parseInt(mNumberDice as string, 10)

      const labels = Array.from({ length: n * m - m + 1 }, (_, i) => i + m)
      const resultsFrequency = Array.from({ length: n * m - m + 1 }, () => 0)
      results.forEach((result) => {
        if (resultsFrequency[result] !== undefined) {
          resultsFrequency[result] = (resultsFrequency[result] || 0) + 1
        }
      })

      chartInstanceRef.current = new ChartJS(chartRef.current, {
        type: "bar",
        data: {
          labels: labels,
          datasets: [
            {
              label: "Roll Results",
              data: resultsFrequency,
              backgroundColor: "rgba(75, 192, 192, 0.6)",
            },
            {
              label: "Monte Carlo Distribution",
              data: distribution.slice(m),
              backgroundColor: "rgba(153, 102, 255, 0.6)",
            },
          ],
        },
        options: {
          animation: {
            duration: 1000,
          },
          scales: {
            x: {
              title: {
                display: true,
                text: "Sum of Dice Rolls",
              },
            },
            y: {
              title: {
                display: true,
                text: "Frequency",
              },
            },
          },
        },
      })
    }
  }, [results, distribution, nDiceSide, mNumberDice])

  return (
    <>
      <div className="container mx-auto mt-10 flex flex-wrap justify-center">
        <div className="w-full rounded-lg bg-white p-4 shadow-lg lg:w-1/3">
          <div className="m-4 grid grid-cols-1 gap-6">
            <input
              type="number"
              name="nDiceSide"
              className="input input-bordered"
              placeholder="Enter number of sides on dice"
              value={nDiceSide}
              onChange={handleChange}
            />
            <input
              type="number"
              name="mNumberDice"
              className="input input-bordered"
              placeholder="Enter number of dice"
              value={mNumberDice}
              onChange={handleChange}
            />
            <input
              type="number"
              name="kNumberRolls"
              className="input input-bordered"
              placeholder="Enter number of rolls"
              value={kNumberRolls}
              onChange={handleChange}
            />
            {error && <span className="text-red-500">{error}</span>}
            <button
              className="btn btn-primary mt-4"
              onClick={handleSimulate}
              disabled={nDiceSide === "" || mNumberDice === "" || kNumberRolls === ""}
            >
              Simulate
            </button>
            <button className="btn btn-secondary mt-4" onClick={handleReset}>
              Reset
            </button>
          </div>
        </div>
        <div className="w-full rounded-lg bg-white p-4 m-4 shadow-lg lg:w-2/3">
          {results.length > 0 && (
            <div className="mt-6">
              <h2 className="text-xl font-bold">Results & Monte Carlo Distribution</h2>
              <canvas ref={chartRef} />
            </div>
          )}
        </div>
      </div>
    </>
  )
}

export default NDice
