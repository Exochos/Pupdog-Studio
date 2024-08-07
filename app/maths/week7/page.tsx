"use client"
import React, { useEffect, useState, useRef } from "react"
import "animate.css"

export default function Week7Page() {
  const [sequences, setSequences] = useState<number[][]>([])
  const [currentSequence, setCurrentSequence] = useState<number[]>([])
  const [displayIndex, setDisplayIndex] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)

  const calculateNthTerm = (n: number, a: number, d: number) => {
    return a + (n - 1) * d
  }

  const sequenceGenerator = () => {
    const length = Math.floor(Math.random() * 10) + 5 // Generate 5 to 14 terms
    const a = Math.floor(Math.random() * 10) + 1
    const d = Math.floor(Math.random() * 5) + 1
    const newSequence: number[] = []
    for (let i = 1; i <= length; i++) {
      newSequence.push(calculateNthTerm(i, a, d))
    }
    setCurrentSequence(newSequence)
    setDisplayIndex(0)
  }

  useEffect(() => {
    sequenceGenerator()
  }, [])

  useEffect(() => {
    if (displayIndex <= currentSequence.length) {
      const timer = setTimeout(() => {
        setDisplayIndex((prevIndex) => prevIndex + 1)
        if (containerRef.current) {
          containerRef.current.scrollLeft = containerRef.current.scrollWidth
        }
      }, 200) // Adjust this value to control typing speed
      return () => clearTimeout(timer)
    } else {
      const timer = setTimeout(() => {
        setSequences((prev) => [...prev, currentSequence])
        sequenceGenerator()
      }, 2000) // Wait for 2 seconds before generating a new sequence
      return () => clearTimeout(timer)
    }
  }, [displayIndex, currentSequence])

  return (
    <div className="container mx-auto p-4">
      <h1 className="mb-4 text-2xl font-bold">Arithmetic Sequence Generator</h1>
      <div className="space-y-4">
        {sequences.map((seq, seqIndex) => (
          <div key={seqIndex} className="animate__animated animate__fadeInLeft overflow-x-hidden whitespace-nowrap">
            <p className="font-mono text-lg">{`{ ${seq.join(", ")} }`}</p>
          </div>
        ))}
        <div ref={containerRef} className="animate__animated animate__fadeInLeft overflow-x-auto whitespace-nowrap">
          <p className="font-mono text-lg">
            {`{ ${currentSequence.slice(0, displayIndex).join(", ")}${
              displayIndex < currentSequence.length ? "..." : ""
            } }`}
          </p>
        </div>
      </div>
    </div>
  )
}
