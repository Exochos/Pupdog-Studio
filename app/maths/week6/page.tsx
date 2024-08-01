"use client"
import React, { useState } from "react"
// @ts-ignore
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
  const [activeTab, setActiveTab] = useState<"permutations" | "combinations">("permutations")

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
    <>
      <head>
        <title>Permutations and Combinations Calculator || MathCalc</title>
        <meta
          name="description"
          content="This application calculates permutations and combinations based on user input."
        />
      </head>

      <div className="container mx-auto flex h-screen w-screen items-center justify-center">
        <div className="card m-2 w-full bg-green-100 p-2 shadow-xl transition-transform duration-300 md:w-2/5">
          <h2 className="my-2 text-xl font-bold text-black">Discrete Mathematics: Permutations and Combinations</h2>
          <div className="tabs tabs-lifted">
            <button
              className={`tab-bordered tab ${activeTab === "combinations" ? "tab-active" : ""}`}
              onClick={() => setActiveTab("combinations")}
            >
              Combinations
            </button>
            <button
              className={`tab-bordered tab ${activeTab === "permutations" ? "tab-active" : ""}`}
              onClick={() => setActiveTab("permutations")}
            >
              Permutations
            </button>
          </div>

          <div className="my-4">
            {activeTab === "combinations" && (
              <article className="text-sm text-gray-700">
                <p>
                  In Discrete Mathematics, a combination is a selection of items from a larger pool, where the order of
                  selection does not matter. Combinations are used to calculate the number of ways to choose{" "}
                  <strong>r</strong> items from a set of <strong>n</strong> items. The formula for combinations is given
                  by:
                </p>
                <br />
                <BlockMath math={formula} />
                <p className="mt-4">
                  where <strong>n</strong> is the total number of items and <strong>r</strong> is the number of items to
                  choose.
                </p>
                <hr className="my-4" />

                <BlockMath math={combinationFormula + " = " + combinations} />
              </article>
            )}
            {activeTab === "permutations" && (
              <article className="text-sm text-gray-700">
                The formula for permutations is given by:
                <BlockMath math={permutationFormula} />
              </article>
            )}
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
              Calculate {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}
            </button>
          </div>
          {error && <p className="text-red-500">{error}</p>}
        </div>
      </div>
    </>
  )
}

export default Page
