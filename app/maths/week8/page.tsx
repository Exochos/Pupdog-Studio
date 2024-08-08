"use client"
import Image from "next/image"
import React, { useEffect, useState } from "react"
import "katex/dist/katex.min.css" // Ensure KaTeX styles are included
// @ts-ignore
import { BlockMath, InlineMath } from "react-katex"

const Week8Page = () => {
  const [activeTab, setActiveTab] = useState("arithmetics")
  const [firstTerm, setFirstTerm] = useState(0)
  const [commonDifference, setCommonDifference] = useState(0)
  const [position, setPosition] = useState(0)
  const [result, setResult] = useState(0)





  const handleReset = () => {
    //TODO: Implement reset functionality
  }

  useEffect(() => {
    handleReset()
  }, [activeTab])

  return (
    <>
      <head>
        <title>Arithmetic Sequences | Geometric Sequences</title>
        <meta name="description" content="This application calculates Arithmetic Sequences and Geometric Sequences." />
        <meta
          name="keywords"
          content="Arithmetic Sequences, Geometric Sequences, Sequences, Maths, Mathematics, Calculator"
        />
      </head>
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
                    <p className="ml-10 mt-4 text-sm text-gray-700">
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
                    <p className="ml-10 mt-4 text-sm text-gray-700">
                      The formula for the nth term of an arithmetic sequence is given by:
                      <BlockMath>a_n = a_1 + (n - 1) * d</BlockMath>
                      <br />
                      where:
                      <br />
                      <InlineMath>a_n</InlineMath> is the nth term of the sequence
                      <br />
                      <InlineMath>a_1</InlineMath> is the first term of the sequence
                      <br />
                      <InlineMath>d</InlineMath> is the common difference between the terms
                      <br />
                      <InlineMath>n</InlineMath> is the position of the term in the sequence
                    </p>
                  </article>
                </div>
                <br />
                <div className="card m-2 mt-10 rounded-none border-2 border-black p-2 shadow-xl">
                  <article>
                    <div
                      className="text-md absolute left-4 rounded-none bg-blue-100 px-2 py-1 font-semibold text-black shadow-md"
                      style={{ top: "-20px" }}
                    >
                      Calculator
                    </div>
                    <p className="ml-10 mt-4 text-sm text-gray-700">
                      This calculator can be used to calculate the nth term of an arithmetic sequence given the first
                      term, common difference, and position of the term in the sequence.
                    </p>
                    <hr className="my-4" />
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                      <div className="flex flex-col">
                        <label htmlFor="firstTerm" className="text-sm text-gray-700">
                          First Term (a<sub>1</sub>):
                        </label>
                        <input
                          type="text"
                          id="firstTerm"
                          name="firstTerm"
                          className="input input-bordered input-info my-2 w-full max-w-xs bg-white"
                          placeholder="Enter the first term"
                          onChange={(e) => setFirstTerm(parseInt(e.target.value))}
                        />

                        <label htmlFor="commonDifference" className="text-sm text-gray-700">
                          Common Difference (d):
                        </label>
                        <input
                          type="text"
                          id="commonDifference"
                          name="commonDifference"
                          className="input input-bordered input-info my-2 w-full max-w-xs bg-white"
                          placeholder="Enter the common difference"
                        />

                        <label htmlFor="position" className="text-sm text-gray-700">
                          Position (n):
                        </label>
                        <input
                          type="text"
                          id="position"
                          name="position"
                          className="input input-bordered input-info my-2 w-full max-w-xs bg-white"
                          placeholder="Enter the position of the term"
                        />

                        <button className="btn btn-primary mt-4 max-w-xs border-none bg-blue-100 shadow-md hover:bg-blue-300">
                          Calculate
                        </button>
                      </div>
                      <div className="flex flex-col">
                        <div className="container p-2">
                          <div className="text-md w-20 rounded-none bg-blue-100 px-2 py-1 font-semibold text-black shadow-md">
                            Result
                          </div>
                          <div className="ml-10 mt-4 text-sm text-gray-700">
                            <p>
                              <InlineMath>a_n = {firstTerm} + ({position} - 1) * {commonDifference}</InlineMath>
                              <br />
                            </p>
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
                <h1 className="my-4 p-2 text-xl font-bold text-black">Geometric Sequences:</h1>
                <div className="space-y-4"></div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  )
}

export default Week8Page
