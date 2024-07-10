"use client"
import * as Progress from "@radix-ui/react-progress"
import * as Tabs from "@radix-ui/react-tabs"
import React, { useState } from "react"
import MyChart from "./normalChart"

const Week3Page: React.FC = () => {
  const [numFlips, setNumFlips] = useState<number | string>("")
  const [results, setResults] = useState<{ heads: number; tails: number } | null>(null)
  const [progress, setProgress] = useState(0)

  const handleSimulate = () => {
    const flips = parseInt(numFlips as string, 10)
    if (isNaN(flips) || flips <= 0) return

    setResults(null)
    setProgress(0)

    let heads = 0
    let tails = 0

    const simulateFlip = (i: number) => {
      if (i < flips) {
        Math.random() < 0.5 ? heads++ : tails++
        setProgress(Math.floor(((i + 1) / flips) * 100))
        setTimeout(() => simulateFlip(i + 1), 50) // Simulate each flip with a delay
      } else {
        setResults({ heads, tails })
      }
    }

    simulateFlip(0)
  }

  return (
    <>
      <div className="container mx-auto mt-20 rounded-lg bg-white p-4 shadow-lg">
        <Tabs.Root defaultValue="tab1">
          <Tabs.List className="flex space-x-4 border-b">
            <Tabs.Trigger
              value="tab1"
              className="px-4 py-2 text-gray-600 hover:text-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Tab 1
            </Tabs.Trigger>
            <Tabs.Trigger
              value="tab2"
              className="px-4 py-2 text-gray-600 hover:text-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Tab 2
            </Tabs.Trigger>
            <Tabs.Trigger
              value="tab3"
              className="px-4 py-2 text-gray-600 hover:text-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Tab 3
            </Tabs.Trigger>
          </Tabs.List>
          <Tabs.Content value="tab1" className="p-4">
            <h1 className="text-2xl font-bold text-gray-800">Coin Flip Simulation</h1>
            <p className="text-gray-700">
              Enter the number of coin flips you would like to simulate and click the button to see the results. <br />
              <div>
                <h1>Chart.js in Next.js</h1>
                <MyChart />
              </div>
            </p>
            <div className="mt-4 flex items-center gap-4">
              <input
                type="text"
                className="focus:shadow-outline input input-bordered w-full max-w-xs rounded text-gray-700 shadow focus:outline-none"
                placeholder="Enter number of coin flips"
                value={numFlips}
                onChange={(e) => setNumFlips(e.target.value)}
              />
              <button
                className="rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700 focus:outline-none"
                onClick={handleSimulate}
              >
                Simulate Coin Flips
              </button>
            </div>
            <div className="mt-4">
              <Progress.Root className="relative h-4 overflow-hidden rounded bg-gray-200">
                <Progress.Indicator className="h-full bg-blue-500" style={{ width: `${progress}%` }} />
              </Progress.Root>
            </div>
            {results && (
              <div className="mt-4">
                <div className="card w-96 bg-base-100 shadow-xl">
                  <figure className="px-10 pt-10">
                    {/* Optional: Add an image or any other figure content here */}
                  </figure>
                  <div className="card-body items-center text-center">
                    <h2 className="card-title">Results</h2>
                    <div className="text-2xl font-bold text-gray-800">
                      Heads: {results.heads} ({((results.heads / (results.heads + results.tails)) * 100).toFixed(2)}%)
                    </div>
                    <div className="text-2xl font-bold text-gray-800">
                      Tails: {results.tails} ({((results.tails / (results.heads + results.tails)) * 100).toFixed(2)}%)
                    </div>
                  </div>
                </div>
              </div>
            )}
          </Tabs.Content>
          <Tabs.Content value="tab2" className="p-4">
            Task 2: Rolling a Die
          </Tabs.Content>
          <Tabs.Content value="tab3" className="p-4">
            Simulate drawing a card from a shuffled deck 20 times, count how many are red, and plot the count of red
            versus black cards.
          </Tabs.Content>
        </Tabs.Root>
      </div>
    </>
  )
}

export default Week3Page
