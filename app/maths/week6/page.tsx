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
  const formula2 = `P(n, r) = \\frac{n!}{(n - r)!}`

  // Show the steps to calculate the Permutations
  const calculatePermutations = () => {
    const n = parseInt(N as string)
    const r = parseInt(R as string)
    if (isNaN(n) || n < 0 || isNaN(r) || r < 0 || r > n) {
      setPermutations(null)
      setSteps([])
      setDisplayedSteps([])
      return
    }
    const gcd = (a: number, b: number): number => (b === 0 ? a : gcd(b, a % b))
    const calculateFactorial = (num: number): bigint => {
      let result = BigInt(1)
      for (let i = 2; i <= num; i++) {
        result *= BigInt(i)
      }
      return result
    }
    const nFactorial = calculateFactorial(n)
    const nrFactorial = calculateFactorial(n - r)
    const numerator = nFactorial
    const denominator = nrFactorial
    const steps = [
      `P(${n}, ${r}) = \\frac{${n}!}{(${n} - ${r})!}`,
      `P(${n}, ${r}) = \\frac{${nFactorial}}{${nrFactorial}}`,
      `P(${n}, ${r}) = \\frac{${numerator}}{${denominator}}`,
    ]
    let currentNumerator = numerator
    let currentDenominator = denominator
    while (currentDenominator !== BigInt(1)) {
      const divisor = gcd(Number(currentNumerator), Number(currentDenominator))
      if (divisor === 1) break

      const newNumerator = currentNumerator / BigInt(divisor)
      const newDenominator = currentDenominator / BigInt(divisor)

      steps.push(`P(${n}, ${r}) = ( ${divisor} ) * \\frac{${newNumerator}}{${newDenominator}}`)

      currentNumerator = newNumerator
      currentDenominator = newDenominator
    }

    if (currentDenominator === BigInt(1)) {
      steps.push(`P(${n}, ${r}) = ${currentNumerator}`)
    } else {
      steps.push(`P(${n}, ${r}) = \\frac{${currentNumerator}}{${currentDenominator}}`)
    }

    setSteps(steps)
    setPermutations(Number(currentNumerator / currentDenominator))
  }

  // Show the steps to calculate the Combinations
  const calculateCombinations = () => {
    const n = parseInt(N as string)
    const r = parseInt(R as string)
    if (isNaN(n) || n < 0 || isNaN(r) || r < 0 || r > n) {
      setCombinations(null)
      setSteps([])
      setDisplayedSteps([])
      return
    }
    const gcd = (a: number, b: number): number => (b === 0 ? a : gcd(b, a % b))
    const calculateFactorial = (num: number): bigint => {
      let result = BigInt(1)
      for (let i = 2; i <= num; i++) {
        result *= BigInt(i)
      }
      return result
    }
    const nFactorial = calculateFactorial(n)
    const rFactorial = calculateFactorial(r)
    const nrFactorial = calculateFactorial(n - r)
    const numerator = nFactorial
    const denominator = rFactorial * nrFactorial
    const steps = [
      `C(${n}, ${r}) = \\frac{${n}!}{${r}!(${n} - ${r})!}`,
      `C(${n}, ${r}) = \\frac{${nFactorial}}{${rFactorial} \\cdot ${nrFactorial}}`,
      `C(${n}, ${r}) = \\frac{${numerator}}{${denominator}}`,
    ]
    let currentNumerator = numerator
    let currentDenominator = denominator
    while (currentDenominator !== BigInt(1)) {
      const divisor = gcd(Number(currentNumerator), Number(currentDenominator))
      if (divisor === 1) break

      const newNumerator = currentNumerator / BigInt(divisor)
      const newDenominator = currentDenominator / BigInt(divisor)

      steps.push(`C(${n}, ${r}) = ( ${divisor} ) * \\frac{${newNumerator}}{${newDenominator}}`)

      currentNumerator = newNumerator
      currentDenominator = newDenominator
    }

    if (currentDenominator === BigInt(1)) {
      steps.push(`C(${n}, ${r}) = ${currentNumerator}`)
    } else {
      steps.push(`C(${n}, ${r}) = \\frac{${currentNumerator}}{${currentDenominator}}`)
    }

    setSteps(steps)
    setCombinations(Number(currentNumerator / currentDenominator))
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

  // Handle calculate button click
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
    if (activeTab === "combinations") {
      calculateCombinations()
    } else {
      calculatePermutations()
    }
    // Log event
    logEvent("Calculate", `${activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}`, `N: ${n}, R: ${r}`)
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
              onClick={() => {
                setActiveTab("combinations")
                handleReset()
              }}
            >
              Combinations
            </button>
            <button
              className={`tab-bordered tab ${activeTab === "permutations" ? "tab-active" : ""}`}
              onClick={() => {
                setActiveTab("permutations")
                handleReset()
              }}
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
                </div>
                <div className="collapse collapse-plus p-1">
                  <input type="checkbox" id="collapse3" className="peer" defaultChecked />
                  <label htmlFor="collapse3" className="collapse-title cursor-pointer text-black">
                    Steps
                  </label>
                  <div className="collapse-content text-sm text-gray-700 peer-checked:block">
                    <BlockMath math={combinationFormula} />
                    <div className="flex flex-col gap-2">
                      {displayedSteps.map((step, index) => (
                        <div key={index} className="text-sm text-gray-700">
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
                <div className="collapse collapse-plus rounded-none border-y-2 border-black p-1">
                  <input type="checkbox" id="collapse1" className="peer" defaultChecked />
                  <label htmlFor="collapse1" className="text-bold collapse-title cursor-pointer text-lg text-black">
                    Permutations
                  </label>
                  <div className="collapse-content peer-checked:block">
                    <article className="text-sm text-gray-700">
                      <p>
                        In Discrete Mathematics, a permutation is an arrangement of items in a specific order.
                        Permutations are used to calculate the number of ways to choose <strong>r</strong> items from a
                        set of <strong>n</strong> different items where the order of selection matters.
                        <br />
                        <br />
                        The formula for permutations is given by:
                      </p>
                      <br />
                      <BlockMath math={formula2} />
                      <p className="mt-4">
                        <strong>n</strong> is the total number of items
                        <br />
                        <strong>r</strong> is the number of items to choose.
                        <br />
                        <strong>!</strong> denotes the factorial of a number, which is the product of all positive
                        integers up to that number.
                      </p>
                    </article>
                  </div>
                </div>

                <div className="collapse collapse-plus rounded-none border-y-2 border-black p-1">
                  <input type="checkbox" id="collapse2" className="peer" defaultChecked />
                  <label htmlFor="collapse2" className="collapse-title cursor-pointer text-black">
                    Calculate Permutations
                  </label>
                  <div className="collapse-content peer-checked:block">
                    <hr className="mb-2 w-full border-gray-300" />
                    <p className="m-4 text-sm text-gray-700">
                      Enter the values of <strong>n</strong> and <strong>r</strong> to calculate the number of
                      permutations.
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
                            calculatePermutations()
                          }}
                        />
                      </div>
                      <div className="flex flex-col">
                        <label className="text-gray-700">Number of items to choose (r):</label>
                        <input
                          type="string"
                          className="input-m input input-bordered m-4 mb-2 bg-gray-100 text-black"
                          placeholder="Enter the value of r"
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
                </div>
                <div className="collapse collapse-plus p-1">
                  <input type="checkbox" id="collapse3" className="peer" defaultChecked />
                  <label htmlFor="collapse3" className="collapse-title cursor-pointer text-black">
                    Steps
                  </label>
                  <div className="collapse-content text-sm text-gray-700 peer-checked:block">
                    <BlockMath math={permutationFormula} />
                    <div className="flex flex-col gap-2">
                      {displayedSteps.map((step, index) => (
                        <div key={index} className="text-sm text-gray-700">
                          <BlockMath math={step} />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
            <footer className="mt-2 w-full text-center text-xs text-black">
              <hr className="w-full border-gray-700 pt-2" />
              <p>
                Created with ❤️ by{" "}
                <a href="https://pupdog.studio/" className="underline">
                  Pupdog Studio
                </a>
                <br />
                <a
                  href="https://github.com/Exochos/Pupdog-Studio/blob/main/app/maths/week6/page.tsx"
                  target="_blank"
                  rel="noreferrer"
                  className="underline"
                >
                  View Source Code on GitHub
                </a>
                <br />
                <a href="https://opensource.org/license/mit" target="_blank" rel="noreferrer" className="underline">
                  MIT License © Pupdog Studio 2024
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
