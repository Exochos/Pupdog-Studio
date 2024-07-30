"use client"
import React, { useState } from "react"
import { logEvent } from "../../../utils/googleAnalytics"
import { error } from "console"

// Log page view
logEvent("Page", "Power Set")

export default function Page(): JSX.Element {
  // State variables
  const [error, setError] = useState<string>("")
  const [powerSet, setPowerSet] = useState<string[]>([])
  const [set, setSet] = useState<string>("")

  const setMessages = {
    invalidSet: "Invalid set. Please enter a valid set of values separated by commas.",
    noValues: "the power set of a set with no elements has one element: the null set, {∅}.",
    oneValue: "The power set of a set with one element has two elements: the set itself and the null set, {∅}.",
    whitespaceOnly: "The set contains only whitespace. Please enter valid values.",
  }

  // Handle button click
  const handleClick = () => {
    // Clear error
    setError("")

    // Check for errors
    switch (set) {
      case "":
        setError(setMessages.invalidSet)
        return
      case " ":
        setError(setMessages.whitespaceOnly)
        return
      case ",":
        setError(setMessages.invalidSet)
        return
    }

    // Split set into array
    const values = set.split(",").map((value) => value.trim())

    // Check for empty set
    if (values.length === 0) {
      setPowerSet(["{∅}"])
      return
    }

    // Check for set with one value
    if (values.length === 1) {
      setPowerSet([`{${values[0]}}`, "{∅}"])
      return
    }

    // Generate power set
    const powerSet = values.reduce(
      (subsets, value) => {
        return subsets.concat(subsets.map((set) => [value, ...set]))
      },
      [[]] as string[][]
    )

    // Format power set
    const formattedPowerSet = powerSet.map((subset) => {
      return `{${subset.join(", ")}}`
    })

    // Set power set
    setPowerSet(formattedPowerSet)

    // Track button click
    logEvent("User", "Generate Power Set", `Set: ${set}`)
  }

  return (
    <html lang="en">
      <head>
        <title>Power Set | Set Theory</title>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta
          name="description"
          content="This page demonstrates the concept of a Power Set in Mathematics by generating the Power Set of a given set."
        />
        <meta name="author" content="Jeremy Ward" />
      </head>
      <body>
        <div className="container mx-auto flex h-screen w-screen items-center justify-center p-4">
          <div className="card w-full max-w-xs bg-white p-2 shadow-xl transition-transform duration-300 md:w-3/5">
            <h2 className="m-2 text-center font-mono text-xl font-bold text-black">Power Set Generator</h2>
            <p className="m-4 text-center text-sm text-black">
              The Power Set of a set is the set of all possible subsets of that set. The Power Set of a set with n
              elements has 2^n elements.
            </p>
            <p className="text-mono m-4 text-center text-sm text-black">Enter a set of values separated by commas:</p>
            <input
              type="text"
              placeholder="Example: 1, 2, 3"
              onChange={(e) => setSet(e.target.value)}
              className="input input-bordered w-full max-w-xs"
            />
            {error && <p className="m-4 text-center text-sm text-red-500">Error: {error}</p>}
            <button className="btn btn-outline btn-primary my-2" onClick={handleClick}>
              Generate Power Set
            </button>
            <p id="powerSet"></p>
          </div>
        </div>
      </body>
    </html>
  )
}
