"use client"

// app/maths/week1/page.tsx

import React from "react"

const Week1Page: React.FC = () => {
  const calculate = () => {
    const inputNumber = document.getElementById("inputNumber") as HTMLInputElement
    const base = document.getElementById("base") as HTMLInputElement
    const outputNumber = document.getElementById("outputNumber") as HTMLInputElement

    if (!inputNumber || !base || !outputNumber) {
      return
    }

    const input = parseInt(inputNumber.value)
    const newBase = parseInt(base.value)

    if (isNaN(input) || isNaN(newBase)) {
      outputNumber.value = "Invalid input"
      return
    }

    if (newBase < 2 || newBase > 36) {
      outputNumber.value = "Base must be between 2 and 36"
      return
    }

    outputNumber.value = input.toString(newBase)
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-lg">
        <h1 className="mb-6 text-center text-2xl font-bold text-black">
          Week 1 Maths Assignment 1<br /> Multi-Base Numerical Converter
        </h1>
        <form>
          <div className="mb-4">
            <label className="mb-2 block text-sm font-bold text-gray-700" htmlFor="name">
              Input Number:
            </label>
            <input
              className="block w-full flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 shadow placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
              id="inputNumber"
              type="text"
              placeholder="Enter your number in base 10"
            />
          </div>
          <div className="mb-6">
            <label className="mb-2 block text-sm font-bold text-gray-700" htmlFor="base">
              New Base:
            </label>
            <input
              className="block w-full flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 shadow placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
              id="base"
              type="text"
              placeholder="Enter the new base"
            />
          </div>
          <div className="mb-6">
            <label className="mb-2 block text-sm font-bold text-gray-700" htmlFor="message">
              Output Number:
            </label>
            <input
              className="block w-full flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 shadow placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
              id="outputNumber"
              type="text"
              placeholder="Output number will appear here"
              readOnly
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              className="focus:shadow-outline rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700 focus:outline-none"
              type="button"
              onClick={calculate}
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Week1Page
