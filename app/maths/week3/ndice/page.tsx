"use client"
import { BarController, BarElement, CategoryScale, Chart as ChartJS, LinearScale } from "chart.js"
import React, { useEffect, useRef, useState } from "react"
import "./styles.css"

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
              borderColor: "rgba(75, 192, 192, 1)",
              borderWidth: 1,
            },
            {
              label: "Monte Carlo Distribution",
              data: distribution.slice(m),
              backgroundColor: "rgba(153, 102, 255, 0.2)",
              borderColor: "rgba(153, 102, 255, 1)",
              borderWidth: 1,
            },
          ],
        },
        options: {
          plugins: {
            legend: {
              display: true,
              position: "bottom",
              labels: {
                color: "black",
              },
              title: {
                display: true,
                text: "Legend",
                color: "black",
              },
            },
          },
          animation: {
            duration: 200,
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
      <div className="container mx-auto mt-10 flex flex-col flex-wrap items-center justify-center">
        <div className="w-full rounded-lg bg-white p-4 shadow-lg lg:w-1/3">
          <h1 className="text-2xl font-bold text-black">N-Dice Simulator:</h1>
          <div className="bg-grey-800 bg-opacity-40/40 collapse collapse-arrow mt-4 rounded-lg border-2 border-gray-200 shadow-lg">
            <input type="checkbox" className="peer" />
            <div className="bg-primary peer-checked:bg-primary collapse-title text-primary-content peer-checked:text-secondary-content">
              Assignment?
            </div>
            <div className="bg-primary peer-checked:bg-primary peer-checked:text-secondary-info collapse-content text-primary-content">
              <p>
                Develop a program that calculates the probability distribution when rolling M number of N-sided dice.
              </p>
              <p>
                Task 1: Implementing the Dice Roll Function Write a Python function that simulates rolling M number of
                N-sided dice once and returns the sum of the outcomes. Task 2: Simulating Multiple Rolls Create a
                function to simulate rolling M number of N-sided dice K times and record the results. Task 3:
                Calculating Probability Distribution Write a function to calculate the probability of each possible sum
                when M number of N-sided dice are rolled. Task 4: User Interface Allow the user to input the values of
                N, M, K and display the probability distribution.
              </p>
            </div>
          </div>

          <div className="bg-grey-800 bg-opacity-40/40 collapse collapse-arrow mt-4 rounded-lg border-2 border-gray-200 shadow-lg">
            <input type="checkbox" className="peer" />
            <div className="bg-primary peer-checked:bg-primary collapse-title text-primary-content peer-checked:text-secondary-content">
              Whats the N-Dice Simulator?
            </div>
            <div className="bg-primary peer-checked:bg-primary peer-checked:text-secondary-info collapse-content text-primary-content">
              <p>
                The N-Dice Simulator is a tool that allows you to simulate the rolling of multiple dice with a specified
                number of sides and number of rolls.
              </p>
            </div>
          </div>
          <div className="bg-grey-800 bg-opacity-40/40 collapse collapse-arrow mt-4 rounded-lg border-2 border-gray-200 shadow-lg">
            <input type="checkbox" className="peer" />
            <div className="bg-primary peer-checked:bg-primary collapse-title text-primary-content peer-checked:text-secondary-content">
              How does it work?
            </div>
            <div className="bg-primary peer-checked:bg-primary peer-checked:text-secondary-info collapse-content text-primary-content">
              <p>
                The simulator generates random numbers between 1 and the number of sides of the dice, and adds them up
                to get the sum of the dice rolls. It then repeats this process for the specified number of rolls.
              </p>
            </div>
          </div>
        </div>

        <hr className="my-4 w-1/3" />
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
        <div className="m-4 w-full rounded-lg bg-white p-4 shadow-lg lg:w-2/3">
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
