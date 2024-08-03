"use client"
import React, { useEffect, useState } from "react"
import "animate.css"
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
  const [steps, setSteps] = useState<string[]>([])
  const [displayedSteps, setDisplayedSteps] = useState<string[]>([])
  const [activeTab, setActiveTab] = useState<"permutations" | "combinations">("combinations")
  const [animate, setAnimate] = useState<boolean>(false)

  // Error messages
  const errorMessages = {
    invalidN: "Invalid value for n. Please enter a valid number.",
    invalidR: "Invalid value for r. Please enter a valid number.",
    noValues: "Please enter values for n and r.",
  }

  const formula = `C(n, k) = \\frac{n!}{r!(n - k)!}`

  // Factorial function
  const factorial = (n: number): number => {
    if (n === 0) return 1
    return n * factorial(n - 1)
  }

  // Calculate combinations with steps
  const calculateCombinations = () => {
    const n = parseInt(N as string)
    const r = parseInt(R as string)

    if (isNaN(n) || n < 0 || isNaN(r) || r < 0 || r > n) {
      setCombinations(null)
      setSteps([])
      setDisplayedSteps([])
      return
    }

    const nFactorial = factorial(n)
    const rFactorial = factorial(r)
    const nrFactorial = factorial(n - r)

    const combinationValue = nFactorial / (rFactorial * nrFactorial)

    // Function to find the greatest common divisor (GCD)
    const gcd = (a: number, b: number): number => (b === 0 ? a : gcd(b, a % b))

    // Reduce the fraction
    const numerator = nFactorial
    const denominator = rFactorial * nrFactorial
    const divisor = gcd(numerator, denominator)
    const reducedNumerator = numerator / divisor
    const reducedDenominator = denominator / divisor

    setCombinations(combinationValue)
    setSteps([
      `C(${n}, ${r}) = \\frac{${n}!}{${r}!(${n} - ${r})!}`,
      `C(${n}, ${r}) = \\frac{${nFactorial}}{${rFactorial} \\cdot ${nrFactorial}}`,
      `C(${n}, ${r}) = \\frac{${numerator}}{${denominator}}`,
      reducedDenominator !== 1
        ? `C(${n}, ${r}) = \\frac{${reducedNumerator}}{${reducedDenominator}}`
        : `C(${n}, ${r}) = ${reducedNumerator}`,
    ])
  }

  // Display steps one by one
  useEffect(() => {
    setDisplayedSteps([])
    let stepIndex = 0
    const interval = setInterval(() => {
      if (stepIndex < steps.length) {
        // @ts-ignore
        setDisplayedSteps((prevSteps) => [...prevSteps, steps[stepIndex]].filter((step) => step !== undefined))
        stepIndex += 1
      } else {
        clearInterval(interval)
      }
    }, 1000)
    return () => clearInterval(interval)
  }, [steps])

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
    calculateCombinations()
    // Log event
    logEvent("Calculate", "Permutations and Combinations", `N: ${n}, R: ${r}`)
  }

  // Handle reset button click
  const handleReset = () => {
    setN("")
    setR("")
    setError("")
    setPermutations(null)
    setCombinations(null)
    setSteps([])
    setDisplayedSteps([])
  }

  const combinationFormula = `C(${N || "n"}, ${R || "r"}) = \\frac{${N || "n"}!}{${R || "r"}!(${N || "n"} - ${
    R || "r"
  })!}`
  const permutationFormula = `P(${N || "n"}, ${R || "r"}) = \\frac{${N || "n"}!}{(${N || "n"} - ${R || "r"})!}`

  useEffect(() => {
    // Trigger the animation
    setAnimate(true)
  }, [])

  return (
    <>
      <head>
        <title>Permutations and Combinations Calculator</title>
        <meta
          name="description"
          content="This application calculates permutations and combinations based on user input."
        />
        <meta
          name="keywords"
          content="Permutations, Combinations, Mathematics, Discrete Mathematics, Factorial, Calculator"
        />
      </head>

      <div className="container mx-auto flex min-h-[calc(100vh-2rem)] items-center justify-center py-4">
        <div
          className={`h-full w-full border-2 border-black bg-blue-100 p-2 shadow-xl transition-transform duration-300 ${
            animate ? "animate__animated animate__zoomInUp" : ""
          }`}
        >
          <div className="tabs tabs-lifted">
            <button
              className={`tab-bordered text-l tab ${activeTab === "combinations" ? "tab-active" : ""}`}
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

          <div className="container">
            {activeTab === "combinations" && (
              <div className="join join-vertical w-full">
                <div className="collapse collapse-plus rounded-none border-y-2 border-black p-1">
                  <input type="checkbox" id="collapse1" className="peer" defaultChecked />
                  <label htmlFor="collapse1" className="text-bold collapse-title cursor-pointer text-lg text-black">
                    Combinations
                  </label>
                  <div className="collapse-content peer-checked:block">
                    <article className="text-sm text-gray-700">
                      <p>
                        In Discrete Mathematics, a combination is a selection of a group of items from a larger group,
                        where the order of selection does not matter. Combinations are used to calculate the number of
                        ways to choose <strong>r</strong> items from a set of <strong>k </strong>different items. <br />
                        <br />
                        <i> Essentially n choose k</i>
                        <br />
                        <br />
                        The formula for combinations is given by:
                      </p>
                      <br />
                      <BlockMath math={formula} />
                      <p className="mt-4">
                        <strong>n</strong> is the total number of items
                        <br />
                        <strong>r</strong> is the number of items to choose.
                        <br />
                        <strong>!</strong> denotes the factorial of a number. which is the product of all positive
                        integers
                      </p>
                    </article>
                  </div>
                </div>

                <div className="collapse collapse-plus rounded-none border-y-2 border-black p-1">
                  <input type="checkbox" id="collapse2" className="peer" defaultChecked />
                  <label htmlFor="collapse2" className="collapse-title cursor-pointer text-black">
                    Calculate Combinations
                  </label>
                  <div className="collapse-content peer-checked:block">
                    <hr className="mb-2 w-full border-gray-300" />
                    <p className="m-4 text-sm text-gray-700">
                      Enter the values of <strong>n</strong> and <strong>k</strong> to calculate the number of
                      combinations.
                    </p>
                    <hr className="m-4 mt-2 w-full border-gray-300" />
                    <div className="grid grid-cols-2 gap-4">
                      <div className="flex flex-col">
                        <label className="text-gray-700">Total number of items (n):</label>
                        <input
                          type="string"
                          className="input-m input input-bordered m-4 mb-2 bg-gray-100 text-black"
                          placeholder="Enter n"
                          value={N}
                          onChange={(e) => {
                            setN(e.target.value)
                            calculateCombinations()
                          }}
                        />
                      </div>
                      <div className="flex flex-col">
                        <label className="text-gray-700">Number of items to choose (k):</label>
                        <input
                          type="string"
                          className="input-m input input-bordered m-4 mb-2 bg-gray-100 text-black"
                          placeholder="Enter the value of k"
                          value={R}
                          onChange={(e) => {
                            setR(e.target.value)
                          }}
                        />
                      </div>
                    </div>
                    <div className="mt-4 flex items-center justify-center gap-4">
                      <button className="btn btn-outline btn-success" onClick={handleClick}>
                        Calculate
                      </button>
                      <button className="btn btn-outline btn-warning" onClick={handleReset}>
                        Reset
                      </button>
                    </div>
                    {error && <p className="mt-4 text-red-500">{error}</p>}
                  </div>
                  <hr className="m-4 w-full border-gray-700" />
                  <div className="mt-4 text-sm text-gray-700">
                    <BlockMath math={combinationFormula} />
                    <div className="mt-4">
                      {displayedSteps.map((step, index) => (
                        <div key={index} className="animate__animated animate__fadeInUp">
                          <br />
                          <BlockMath math={step} />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
            {activeTab === "permutations" && (
              <div className="join join-vertical w-full">
                <div className="collapse collapse-plus p-1">
                  <input type="checkbox" id="collapse3" className="peer" />
                  <label htmlFor="collapse3" className="collapse-title cursor-pointer text-black">
                    Permutations
                  </label>
                  <div className="collapse-content peer-checked:block">
                    <article className="text-sm text-gray-700">
                      <p>
                        In Discrete Mathematics, a permutation is an arrangement of items in a specific order.
                        Permutations are used to calculate the number of ways to choose <strong>r</strong> items from a
                        set of <strong>n</strong> different items where the order of selection matters.
                        <br />
                        The formula for permutations is given by:
                      </p>
                      <br />
                      <BlockMath math={formula} />
                      <p className="mt-4">
                        <strong>n</strong> is the total number of items
                        <br />
                        <strong>r</strong> is the number of items to choose.
                      </p>
                    </article>
                  </div>
                </div>
                <div className="collapse collapse-plus p-1">
                  <input type="checkbox" id="collapse4" className="peer" />
                  <label
                    htmlFor="collapse4"
                    className="collapse-title cursor-pointer text-black peer-checked:bg-gray-200"
                  >
                    Calculate Permutations
                  </label>
                  <div className="collapse-content peer-checked:block">
                    <div className="flex items-start justify-between">
                      <div className="flex flex-col gap-2">
                        <label className="text-gray-700">Enter the value of n:</label>
                        <input
                          type="number"
                          className="input input-bordered"
                          placeholder="Enter the value of n"
                          value={N}
                          onChange={(e) => setN(e.target.value)}
                        />
                        <label className="text-gray-700">Enter the value of r:</label>
                        <input
                          type="number"
                          className="input input-bordered"
                          placeholder="Enter the value of r"
                          value={R}
                          onChange={(e) => setR(e.target.value)}
                        />
                      </div>
                      <div className="ml-4">
                        <BlockMath math={permutationFormula + " = " + (permutations || 0)} />
                      </div>
                    </div>
                    <button className="btn btn-primary mt-4" onClick={handleClick}>
                      Calculate
                    </button>
                    {error && <p className="mt-4 text-red-500">{error}</p>}
                  </div>
                </div>
              </div>
            )}
            <footer className="mt-2 w-full text-center text-xs text-black">
              <p>
                Created with ❤️ by Jeremy Ward <br />
                <a
                  href="https://github.com/Exochos/Pupdog-Studio/blob/main/app/maths/week6/page.tsx"
                  target="_blank"
                  rel="noreferrer"
                  className="underline"
                >
                  View Source Code on GitHub
                </a>
              </p>
            </footer>
          </div>
        </div>
      </div>
    </>
  )
}

export default Page
