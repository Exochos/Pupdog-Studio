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
      <div className="container mx-auto flex min-h-[calc(100vh-2rem)] items-center justify-center py-4">
        <div
          className={`h-full w-full border-2 border-black bg-blue-100 p-2 shadow-xl transition-transform duration-300 ${
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
          <div className="container">
            {activeTab === "arithmetics" && (
              <>
                <h1 className="p-2 text-xl font-bold text-black">Arithmetic Sequences:</h1>
                <hr />
                <div className="card w-full bg-base-100 shadow-xl">
                  <article className="assemblage assemblage-like" id="KlB">
                    <h3 className="heading">
                      <span className="title">Arithmetic Sequences.</span>
                    </h3>
                    <p id="jcG">
                      If the terms of a sequence differ by a constant, we say the sequence is{" "}
                      <dfn className="terminology">arithmetic</dfn>. If the initial term (<InlineMath math="a_0" />) of
                      the sequence is <InlineMath math="a" /> and the{" "}
                      <dfn className="terminology">common difference</dfn> is <InlineMath math="d," /> then we have,
                    </p>
                    <p id="PjP">
                      Recursive definition: <InlineMath math="a_n = a_{n-1} + d" /> with <InlineMath math="a_0 = a." />
                    </p>
                    <p id="vqY">
                      Closed formula: <InlineMath math="a_n = a + dn." />
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
