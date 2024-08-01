"use client"
import React, { useState } from "react"
import { BlockMath } from "react-katex"
import "katex/dist/katex.min.css"
import { logEvent } from "../../utils/googleAnalytics"

// Log page view
logEvent("Page", "Permutations and Combinations")

function Page(): JSX.Element {
  // State variables
  const [N, setN] = useState<number | string>("")
  const [R, setR] = useState<number | string>("")
  const [error, setError] = useState<string>("")
  const [permutations, setPermutations] = useState<number | null>(null)
  const [combinations, setCombinations] = useState<number | null>(null)

  // Error messages
  const errorMessages = {
    invalidN: "Invalid value for n. Please enter a valid number.",
    invalidR: "Invalid value for r. Please enter a valid number.",
    noValues: "Please enter values for n and r.",
  }

  const formula = `C(n, r) = \\frac{n!}{r!(n - r)!}`

  // Factorial function
  const factorial = (n: number): number => {
    if (n === 0) return 1
    return n * factorial(n - 1)
  }

  // Handle button click
  const handleClick = () => {
    const n = parseInt(N as string)
    const r = parseInt(R as string)

    if (isNaN(n) || n < 0) {
      setError(errorMessages.invalidN)
      return
    } else if (isNaN(r) || r < 0) {
      setError(errorMessages.invalidR)
      return
    } else if (r > n) {
      setError("r cannot be greater than n.")
      return
    }

    setError("")
    const permutations = factorial(n) / factorial(n - r)
    const combinations = factorial(n) / (factorial(r) * factorial(n - r))

    setPermutations(permutations)
    setCombinations(combinations)

    // Log event
    logEvent("Calculate", "Permutations and Combinations", `N: ${n}, R: ${r}`)
  }

  const combinationFormula = `C(${N || "n"}, ${R || "r"}) = \\frac{${N || "n"}!}{${R || "r"}!(${N || "n"} - ${
    R || "r"
  })!}`
  const permutationFormula = `P(${N || "n"}, ${R || "r"}) = \\frac{${N || "n"}!}{(${N || "n"} - ${R || "r"})!}`

  return (
    <div className="container mx-auto flex h-screen w-screen items-center justify-center">
      <div className="card w-full p-2 shadow-xl transition-transform duration-300 md:w-2/5">
        <h2 className="text-2xl font-bold text-black">Permutations and Combinations Calculator</h2>
        <code className="text-sm text-gray-700">
          Create an application that calculates permutations and combinations based on user input. The application
          should allow the user to enter the values for n (total items) and r (items to be chosen or arranged) and then
          display the results.
        </code>
        <hr className="my-4" />
        <div className="my-4">
          <article className="text-sm text-gray-700">
            The formula for combinations is given by:
            <BlockMath math={formula} />
            <BlockMath math={combinationFormula} />
            <hr />
            The formula for permutations is given by:
            <BlockMath math={permutationFormula} />
          </article>
        </div>
        <div className="form-control">
          <label htmlFor="n" className="label">
            Total Items (n)
          </label>
          <input
            type="number"
            id="n"
            className="input input-bordered"
            placeholder="Enter the total number of items"
            value={N}
            onChange={(e) => setN(e.target.value)}
          />

          <label htmlFor="r" className="label">
            Items to Choose (r): {R}
          </label>
          <input
            type="number"
            id="r"
            className="input input-bordered"
            placeholder="Enter the number of items to choose"
            value={R}
            onChange={(e) => setR(e.target.value)}
          />
          <hr className="my-4" />
          <button className="btn btn-outline btn-primary m-2" onClick={handleClick}>
            Calculate Permutations and Combinations
          </button>
        </div>
        {error && <p className="text-red-500">{error}</p>}
        <div id="results" className="mt-4 text-gray-700">
          {permutations !== null && <p>Permutations (P(n, r)): {permutations}</p>}
          {combinations !== null && <p>Combinations (C(n, r)): {combinations}</p>}
        </div>
      </div>
    </div>
  )
}

export default Page
