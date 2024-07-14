"use client"
import * as Tabs from "@radix-ui/react-tabs"
import dynamic from "next/dynamic"
import React, { useState } from "react"
import DrawingCards from "./DrawingCards"

const MyChart = dynamic(() => import("./normalChart"), { ssr: false })
const DiceChart = dynamic(() => import("./DiceChart"), { ssr: false })

const Week3Page: React.FC = () => {
  const [numFlips, setNumFlips] = useState<number | string>("")
  const [ratios, setRatios] = useState<number[]>([])
  const [numRolls, setNumRolls] = useState<number>(0)

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

  const handleDiceRoll = (numRolls: number) => {
    setNumRolls(numRolls)
  }

  return (
    <div className="container mx-auto mt-20 rounded-lg bg-white p-4 shadow-lg">
      <Tabs.Root defaultValue="tab1">
        <Tabs.List className="tabs tabs-lifted">
          <Tabs.Trigger value="tab1" className="tab-lifted tab text-gray-300">
            Assignment 1
          </Tabs.Trigger>
          <Tabs.Trigger value="tab2" className="tab-lifted text-grey-300 tab">
            Assignment 2
          </Tabs.Trigger>
          <Tabs.Trigger value="tab3" className="tab-lifted text-grey-300 tab">
            Assignment 3
          </Tabs.Trigger>
          <Tabs.Trigger value="tab4" className="tab-lifted tab text-gray-300">
          Assignment 4
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


        <Tabs.Content value="tab2" className="p-4 text-center">
          <div className="p-4 text-center">
            <div className="items-center justify-center">
              <h1 className="justify-center text-2xl font-bold text-gray-800">Dice Rolling Simulation</h1>
              <br />
              <button
                className="rounded bg-blue-500 px-4 py-2 font-bold text-white shadow hover:bg-blue-700 focus:outline-none"
                onClick={() => handleDiceRoll(20)}
              >
                Roll Dice
              </button>
              <br />
              <div className="flex items-center justify-center m-4 p-4">
                <div style={{ width: "100%", height: "400px" }}>
                  <DiceChart numRolls={numRolls} />
                </div>
              </div>
            </div>
          </div>
        </Tabs.Content>

        <Tabs.Content value="tab3" className="p-4">
          <h1 className="text-2xl font-bold text-gray-800">Assignment 3</h1>
          Simulate drawing a card from a shuffled deck 20 times, count how many are red, and plot the count of red
          versus black cards.
          <div className="flex items-center justify-center m-4 p-4">
            <div style={{ width: "100%", height: "400px" }}>
              <DrawingCards numRolls={20} />
            </div>
          </div>
        </Tabs.Content>
      </Tabs.Root>
    </div>
  )
}

export default Week3Page
