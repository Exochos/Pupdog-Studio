// Week8 Course Work
// Arithmetic Sequences & Geometric Sequences
"use client"
import React, { useEffect, useRef, useState } from "react"
import "animate.css"

const Week8Page = () => {
  const [activeTab, setActiveTab] = useState<"arithmetics" | "geometric">("arithmetics")
  const [animate, setAnimate] = useState(false)

  const handleReset = () => {
    //TODO
  }

  useEffect(() => {
    handleReset()
  }, [activeTab])

  return (
    <>
      <head>
        <title> Arithmetic Sequences | Geometric Sequences </title>
        <meta name="description" content="This application calculates Arithmetic Sequences and Geometric Sequences." />
        <meta
          name="keywords"
          content="Arithmetic Sequences, Geometric Sequences, Sequences, Maths, Mathematics, Calculator"
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
              className={`tab-bordered text-l tab ${activeTab === "arithmetics" ? "tab-active" : ""}`}
              onClick={() => {
                setActiveTab("arithmetics")
                handleReset()
              }}
            >
              Arithmetic
            </button>
            <button
              className={`tab-bordered tab ${activeTab === "geometric" ? "tab-active" : ""}`}
              onClick={() => {
                setActiveTab("geometric")
                handleReset()
              }}
            >
              Geometric
            </button>
          </div>

          <div className="container">
            {activeTab === "arithmetics" && (
              <>
                <h1 className="my-4 text-2xl font-bold text-black">Arithmetic Sequences:</h1>
                <div className="space-y-4"></div>
              </>
            )}
            {activeTab === "geometric" && (
              <>
                <h1 className="my-4 text-2xl font-bold text-black">Geometric Sequences:</h1>
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
