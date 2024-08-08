"use client"
import Head from "next/head"
import React, { useEffect, useState } from "react"
import "katex/dist/katex.min.css" // Ensure KaTeX styles are included
// @ts-ignore
import { BlockMath, InlineMath } from "react-katex"

const Week8Page = () => {
  const [activeTab, setActiveTab] = useState("arithmetics")
  const handleReset = () => {
    //TODO: Implement reset functionality
  }

  useEffect(() => {
    handleReset()
  }, [activeTab])

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
      <div className="container mx-auto flex items-center justify-center py-1">
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
                <div className="card m-2 mt-10 w-1/2 rounded-none border-2 border-black p-2 shadow-xl">
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
                      </a>
                    </p>
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
