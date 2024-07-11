"use client"
import * as Tabs from "@radix-ui/react-tabs"
import React, { useState } from "react"
import dynamic from "next/dynamic"

const MyChart = dynamic(() => import("./normalChart"), { ssr: false })

const Week3Page: React.FC = () => {
  const [numFlips, setNumFlips] = useState<number | string>("")
  const [ratios, setRatios] = useState<number[]>([])

  const handleSimulate = () => {
    const flips = parseInt(numFlips as string, 10)
    if (isNaN(flips) || flips <= 0) return

    let heads = 0
    for (let i = 0; i < flips; i++) {
      if (Math.random() < 0.5) heads++
    }

    const ratio = heads / flips
    setRatios([...ratios, ratio])
  }

  return (
    <div className="container mx-auto mt-20 rounded-lg bg-white p-4 shadow-lg">
      <Tabs.Root defaultValue="tab1">
        <Tabs.List className="tabs tabs-lifted">
          <Tabs.Trigger value="tab1" className="tab-lifted tab text-gray-100">
            Assignment 1
          </Tabs.Trigger>
          <Tabs.Trigger
            value="tab2"
            className="tab-lifted tab text-gray-600 hover:text-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Tab 2
          </Tabs.Trigger>
          <Tabs.Trigger
            value="tab3"
            className="tab-lifted tab text-gray-600 hover:text-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Tab 3
          </Tabs.Trigger>
        </Tabs.List>
        <Tabs.Content value="tab1" className="p-4 text-center">
          <div className="items-center justify-center">
            <h1 className="justify-center text-2xl font-bold text-gray-800">Coin Fliping Simulation</h1>
            <br />
            Enter the number of coin flips you would like to simulate and click the button to see the results.
            <br />
            <div className="m-4 items-center gap-4 p-4">
              <input
                type="text"
                className="focus:shadow-outline input input-bordered w-full max-w-xs rounded text-gray-100 shadow focus:outline-none"
                placeholder="Enter number of coin flips"
                value={numFlips}
                onChange={(e) => setNumFlips(e.target.value)}
              />
              <br />
              <br />
              <button
                className="rounded bg-blue-500 px-4 py-2 font-bold text-white shadow hover:bg-blue-700 focus:outline-none"
                onClick={handleSimulate}
              >
                Simulate Coin Flips
              </button>
            </div>
            <div>
              <MyChart ratios={ratios} />
            </div>
          </div>
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
  )
}

export default Week3Page
