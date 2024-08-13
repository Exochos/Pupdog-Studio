"use client"
import React, { useState } from "react"

const Reddit = () => {
  const [activeTab, setActiveTab] = useState("arithmetics")

  return (
    <>
      <div className="container mx-auto flex items-center justify-center bg-white">
        <div
          className={`h-full w-full border-2 border-black p-2 shadow-xl transition-transform duration-300 ${
            activeTab === "arithmetics" ? "animate__animated animate__zoomInUp" : ""
          }`}
        >
          <div className="tabs tabs-lifted">
            <button className={`tab-bordered text-l tab ${activeTab === "arithmetics" ? "tab-active" : ""}`}>
              Arithmetic
            </button>
            <button className={`tab-bordered tab ${activeTab === "geometric" ? "tab-active" : ""}`}>Geometric</button>
          </div>
          <div className="container p-2">
            {activeTab === "arithmetics" && <></>}
            {activeTab === "geometric" && <></>}
          </div>
        </div>
      </div>
    </>
  )
}

export default Reddit()
