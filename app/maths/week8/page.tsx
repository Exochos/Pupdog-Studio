"use client"
import Head from "next/head"
import Image from "next/image"
import React, { useState } from "react"
import "katex/dist/katex.min.css"
// @ts-ignore
import { BlockMath, InlineMath } from "react-katex"
import { set } from "zod"

const Week8Page = () => {
  const [activeTab, setActiveTab] = useState("arithmetics")
  const [firstTerm, setFirstTerm] = useState(0)
  const [commonDifferenceOrRatio, setCommonDifferenceOrRatio] = useState(0)
  const [position, setPosition] = useState(1)
  const [result, setResult] = useState("")
  const [steps, setSteps] = useState([])

  const calculateTerm = () => {
    if (activeTab === "arithmetics") {
      const newSteps: string[] = [
        `a_n = ${firstTerm} + (${position - 1} * ${commonDifferenceOrRatio})`,
        `a_n = ${firstTerm + (position - 1) * commonDifferenceOrRatio}`,
      ]
      // @ts-ignore
      setSteps(newSteps)
    } else if (activeTab === "geometric") {
      const newSteps = [
        `a_n = ${firstTerm} \\cdot (${Math.pow(commonDifferenceOrRatio, position - 1)})`,
        `a_n = ${firstTerm * Math.pow(commonDifferenceOrRatio, position - 1)}`,
      ]
      // @ts-ignore
      setSteps(newSteps)
    }
  }

  return (
    <>
      <Head>
        <title>Arithmetic Sequences | Geometric Sequences</title>
        <meta name="description" content="This application calculates Arithmetic Sequences and Geometric Sequences." />
        <meta
          name="keywords"
          content="Arithmetic Sequences, Geometric Sequences, Sequences, Maths, Mathematics, Calculator"
        />
      </Head>
      <div className="container mx-auto flex items-center justify-center bg-white">
        <div
          className={`h-full w-full border-2 border-black p-2 shadow-xl transition-transform duration-300 ${
            activeTab === "arithmetics" ? "animate__animated animate__zoomInUp" : ""
          }`}
        >
          <div className="tabs tabs-lifted">
            <button
              className={`tab-bordered text-l tab ${activeTab === "arithmetics" ? "tab-active" : ""}`}
              onClick={() => setActiveTab("arithmetics")}
            >
              Arithmetic
            </button>
            <button
              className={`tab-bordered tab ${activeTab === "geometric" ? "tab-active" : ""}`}
              onClick={() => setActiveTab("geometric")}
            >
              Geometric
            </button>
          </div>
          <div className="container p-2">
            {activeTab === "arithmetics" && (
              <>
                <div className="card m-2 mt-10 rounded-none border-2 border-black p-2 shadow-xl">
                  <article>
                    <div
                      className="text-md absolute left-4 rounded-none bg-blue-100 px-2 py-1 font-semibold text-black shadow-md"
                      style={{ top: "-20px" }}
                    >
                      Arithmetic Progression
                    </div>
                    <p className="ml-10 mt-6 text-sm text-gray-700">
                      &quot;An arithmetic progression or arithmetic sequence is a sequence of numbers such that the
                      difference from any succeeding term to its preceding term remains constant throughout the
                      sequence. The constant difference is called common difference of that arithmetic
                      progression.&quot; &nbsp;
                      <a
                        href="https://en.wikipedia.org/wiki/Arithmetic_progression"
                        className="text-underlined text-blue-500"
                      >
                        source
                        <Image
                          src="/images/externalLink.svg"
                          alt="external-link"
                          width={12}
                          height={12}
                          className="mx-1 inline"
                        />
                      </a>
                    </p>
                    <hr className="my-4" />
                    <span className="ml-10 mt-4 text-sm text-gray-700">
                      The formula for the nth term of an arithmetic sequence is given by:
                      <BlockMath math="a_n = a_1 + (n - 1) \cdot d" />
                      where:
                      <InlineMath math="a_n" /> is the nth term of the sequence,
                      <InlineMath math="a_1" /> is the first term of the sequence,
                      <InlineMath math="d" /> is the common difference,
                      <InlineMath math="n" /> is the position of the term in the sequence.
                    </span>
                  </article>
                </div>
                <div className="card m-2 mt-10 rounded-none border-2 border-black p-2 shadow-xl">
                  <article>
                    <div
                      className="text-md absolute left-4 rounded-none bg-blue-100 px-2 py-1 font-semibold text-black shadow-md"
                      style={{ top: "-20px" }}
                    >
                      Calculator
                    </div>
                    <div className="ml-10 mt-2 pt-6 text-sm text-gray-700">
                      This calculator can be used to calculate the nth term of an arithmetic sequence given the first
                      term, common difference, and position of the term in the sequence.
                    </div>
                    <hr className="my-4" />
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                      <div className="flex flex-col">
                        <label htmlFor="firstTerm" className="text-sm text-gray-700">
                          First Term (a_1):
                        </label>
                        <input
                          type="string"
                          id="firstTerm"
                          name="firstTerm"
                          className="input input-bordered input-info my-2 w-full max-w-xs bg-white"
                          placeholder="Enter the first term"
                          value={firstTerm}
                          onChange={(e) => setFirstTerm(parseInt(e.target.value) || 0)}
                        />
                        <label htmlFor="commonDifference" className="text-sm text-gray-700">
                          Common Difference (d):
                        </label>
                        <input
                          type="string"
                          id="commonDifference"
                          name="commonDifference"
                          className="input input-bordered input-info my-2 w-full max-w-xs bg-white"
                          placeholder="Enter the common difference"
                          value={commonDifferenceOrRatio}
                          onChange={(e) => setCommonDifferenceOrRatio(parseInt(e.target.value) || 0)}
                        />
                        <label htmlFor="position" className="text-sm text-gray-700">
                          Position (n):
                        </label>
                        <input
                          type="string"
                          id="position"
                          name="position"
                          className="input input-bordered input-info my-2 w-full max-w-xs bg-white"
                          placeholder="Enter the position of the term"
                          value={position}
                          onChange={(e) => setPosition(parseInt(e.target.value) || 0)}
                        />
                        <button
                          className="btn btn-primary mt-4 max-w-xs border-none bg-blue-100 shadow-md hover:bg-blue-300"
                          onClick={calculateTerm}
                        >
                          Calculate
                        </button>{" "}
                        <button
                          className="btn btn-primary mt-4 max-w-xs border-none bg-blue-100 shadow-md hover:bg-blue-300"
                          onClick={() => {
                            setFirstTerm(0)
                            setCommonDifferenceOrRatio(0)
                            setPosition(1)
                            setResult("")
                            setSteps([])
                          }}
                        >
                          Clear
                        </button>
                      </div>
                      <div className="flex flex-col">
                        <div className="container p-2">
                          <div className="text-md w-20 rounded-none bg-blue-100 px-2 py-1 font-semibold text-black shadow-md">
                            Result
                          </div>
                          <div className="ml-10 mt-4 text-sm text-gray-700">
                            <span>
                              <BlockMath math="a_n = a_1 + (n - 1) \cdot d" />
                              <BlockMath
                                math={`a_${position} = ${firstTerm} + (${position} - 1) \\cdot ${commonDifferenceOrRatio}`}
                              />
                              <div className="mt-4">
                                {steps.map((step, index) => (
                                  <div key={index} className="animate__animated animate__fadeIn">
                                    <BlockMath math={step} />
                                  </div>
                                ))}
                                {result && (
                                  <div
                                    className="result animate__animated animate__fadeIn"
                                    style={{ animationDelay: `${steps.length * 500}ms` }}
                                  >
                                    <BlockMath math={result} />
                                  </div>
                                )}
                              </div>
                            </span>
                            {result && (
                              <div className="mt-4">
                                <span className="text-sm text-gray-700">
                                  The <InlineMath math={`${position}^{th}`} /> term of the sequence is{" "}
                                  <InlineMath math={result} />.
                                </span>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </article>
                </div>
              </>
            )}
            {activeTab === "geometric" && (
              <>
                <div className="card m-2 mt-10 rounded-none border-2 border-black p-2 shadow-xl">
                  <article>
                    <div
                      className="text-md absolute left-4 rounded-none bg-blue-100 px-2 py-1 font-semibold text-black shadow-md"
                      style={{ top: "-20px" }}
                    >
                      Geometric Progression
                    </div>
                    <p className="ml-10 mt-6 text-sm text-gray-700">
                      &quot;A geometric progression, also known as a geometric sequence, is a sequence of numbers where
                      each term after the first is found by multiplying the previous term by a fixed, non-zero number
                      called the common ratio. For example, the sequence 2, 6, 18, 54, ... is a geometric progression
                      with common ratio 3.&quot; &nbsp;
                      <a
                        href="https://en.wikipedia.org/wiki/Geometric_progression"
                        className="text-underlined text-blue-500"
                      >
                        source
                        <Image
                          src="/images/externalLink.svg"
                          alt="external-link"
                          width={12}
                          height={12}
                          className="mx-1 inline"
                        />
                      </a>
                    </p>
                    <hr className="my-4" />
                    <div className="ml-10 mt-4 text-sm text-gray-700">
                      The formula for the nth term of a geometric sequence is given by:
                      <BlockMath math="a_n = a_1 \cdot r^{(n - 1)}" />
                      where:
                      <br />
                      <InlineMath math="a_n" /> is the nth term of the sequence,
                      <br />
                      <InlineMath math="a_1" /> is the first term of the sequence, <br />
                      <InlineMath math="r" /> is the common ratio, <br />
                      <InlineMath math="n" /> is the position of the term in the sequence.
                    </div>
                  </article>
                </div>
                <div className="card m-2 mt-10 rounded-none border-2 border-black p-2 shadow-xl">
                  <article>
                    <div
                      className="text-md absolute left-4 rounded-none bg-blue-100 px-2 py-1 font-semibold text-black shadow-md"
                      style={{ top: "-20px" }}
                    >
                      Calculator
                    </div>
                    <div className="ml-10 mt-2 pt-6 text-sm text-gray-700">
                      This calculator can be used to calculate the nth term of a geometric sequence given the first
                      term, common ratio, and position of the term in the sequence.
                    </div>
                    <hr className="my-4" />
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                      <div className="flex flex-col">
                        <label htmlFor="firstTerm" className="text-sm text-gray-700">
                          First Term (a_1):
                        </label>
                        <input
                          type="string"
                          id="firstTerm"
                          name="firstTerm"
                          className="input input-bordered input-info my-2 w-full max-w-xs bg-white"
                          placeholder="Enter the first term"
                          value={firstTerm}
                          onChange={(e) => setFirstTerm(parseInt(e.target.value) || 0)}
                        />
                        <label htmlFor="commonDifference" className="text-sm text-gray-700">
                          Common Ratio (r):
                        </label>
                        <input
                          type="string"
                          id="commonDifference"
                          name="commonDifference"
                          className="input input-bordered input-info my-2 w-full max-w-xs bg-white"
                          placeholder="Enter the common ratio"
                          value={commonDifferenceOrRatio}
                          onChange={(e) => setCommonDifferenceOrRatio(parseInt(e.target.value) || 0)}
                        />
                        <label htmlFor="position" className="text-sm text-gray-700">
                          Position (n):
                        </label>
                        <input
                          type="string"
                          id="position"
                          name="position"
                          className="input input-bordered input-info my-2 w-full max-w-xs bg-white"
                          placeholder="Enter the position of the term"
                          value={position}
                          onChange={(e) => setPosition(parseInt(e.target.value) || 0)}
                        />
                        <button
                          className="btn btn-primary mt-4 max-w-xs border-none bg-blue-100 shadow-md hover:bg-blue-300"
                          onClick={calculateTerm}
                        >
                          Calculate
                        </button>{" "}
                        <button
                          className="btn btn-primary mt-4 max-w-xs border-none bg-blue-100 shadow-md hover:bg-blue-300"
                          onClick={() => {
                            setFirstTerm(0)
                            setCommonDifferenceOrRatio(0)
                            setPosition(1)
                            setResult("")
                            setSteps([])
                          }}
                        >
                          Clear
                        </button>
                      </div>
                      <div className="flex flex-col">
                        <div className="container p-2">
                          <div className="text-md w-20 rounded-none bg-blue-100 px-2 py-1 font-semibold text-black shadow-md">
                            Result
                          </div>
                          <div className="ml-10 mt-4 text-sm text-gray-700">
                            <span>
                              <BlockMath math="a_n = a_1 \cdot r^{(n - 1)}" />
                              <BlockMath
                                math={`a_${position} = ${firstTerm} \\cdot ${commonDifferenceOrRatio}^{(${position} - 1)}`}
                              />
                              <div className="mt-4">
                                {steps.map((step, index) => (
                                  <div key={index} className="animate__animated animate__fadeIn">
                                    <BlockMath math={step} />
                                  </div>
                                ))}
                                {result && (
                                  <div
                                    className="result animate__animated animate__fadeIn"
                                    style={{ animationDelay: `${steps.length * 500}ms` }}
                                  >
                                    <BlockMath math={result} />
                                  </div>
                                )}
                              </div>
                            </span>
                            {result && (
                              <div className="mt-4">
                                <span className="text-sm text-gray-700">
                                  The <InlineMath math={`${position}^{th}`} /> term of the sequence is{" "}
                                  <InlineMath math={result} />.
                                </span>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </article>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  )
}

export default Week8Page
