"use client"
import React, { useEffect, useState } from "react"
import { metadata } from "./metadata"

const Week1Page: React.FC = () => {
  const errorMessages = {
    number: "Please enter a number",
    base: "Please enter a new base",
    validNumber: "Please enter a valid number",
    validBase: "Base must be between 2 and 16",
    noNegative: "Please enter a positive number",
  }

  const [errorMessage, setErrorMessage] = useState<string>("")
  const [inputValue, setInputValue] = useState<string>("")
  const [baseValue, setBaseValue] = useState<string>("")

  useEffect(() => {
    // Focus on the input field when the page first loads
    const inputNumber = document.getElementById("inputNumber") as HTMLInputElement
    if (inputNumber) {
      inputNumber.focus()
    }
  }, [])

  // Handle input change
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value)
    validateInputs(event.target.value, baseValue)
  }

  // Handle base change
  const handleBaseChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setBaseValue(event.target.value)
    validateInputs(inputValue, event.target.value)
  }

  const handleBlur = () => {
    validateInputs(inputValue, baseValue)
  }

  const validateInputs = (inputNumber: string, base: string) => {
    if (inputNumber === "") {
      setErrorMessage(errorMessages.number)
    } else if (base === "") {
      setErrorMessage(errorMessages.base)
    } else if (isNaN(parseInt(inputNumber, 10))) {
      setErrorMessage(errorMessages.validNumber)
    } else if (parseInt(inputNumber, 10) < 0) {
      setErrorMessage(errorMessages.noNegative)
    } else if (parseInt(base, 10) < 2 || parseInt(base, 10) > 16) {
      setErrorMessage(errorMessages.validBase)
    } else if (Number.isNaN(parseInt(base, 10))) {
      setErrorMessage(errorMessages.validBase)
    } else {
      setErrorMessage("")
    }
  }

  const calculate = () => {
    const number = parseInt(inputValue, 10)
    const newBase = parseInt(baseValue, 10)

    // Validate the inputs
    if (isNaN(number) || isNaN(newBase) || newBase < 2 || newBase > 16 || number < 0) {
      validateInputs(inputValue, baseValue)
      return
    }

    // Convert the number to the new base
    const newNumber = []
    let currentNumber = number
    let remainder = 0

    while (currentNumber > 0) {
      remainder = currentNumber % newBase
      newNumber.push(remainder.toString(newBase))
      currentNumber = Math.floor(currentNumber / newBase)
    }

    if (newNumber.length === 0) {
      newNumber.push("0")
    }

    const output = newNumber.reverse().join("")
    const outputNumber = document.getElementById("outputNumber") as HTMLInputElement
    if (outputNumber) {
      outputNumber.value = output
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="mx-auto max-w-screen-lg p-4">
        <div className="flex flex-col gap-4 md:flex-row">
          <div className="flex-1 rounded-lg bg-white p-6 shadow-lg">
            <h3 className="mb-6 text-2xl font-bold text-black">Week 1 Maths Assignment 1</h3>
            <form>
              <div className="mb-4">
                <label className="mb-2 block text-sm font-bold text-gray-700" htmlFor="inputNumber">
                  Input Number:
                </label>
                <input
                  className="focus:shadow-outline block w-full flex-1 rounded border border-gray-300 bg-emerald-300 px-3 py-2 text-black shadow focus:outline-none"
                  id="inputNumber"
                  type="text"
                  value={inputValue}
                  onChange={handleInputChange}
                  onBlur={handleBlur}
                  placeholder="Enter your number in base 10"
                />
              </div>
              <div className="mb-4">
                <label className="mb-2 block text-sm font-bold text-gray-700" htmlFor="base">
                  New Base:
                </label>
                <input
                  className="focus:shadow-outline block w-full flex-1 rounded border border-gray-300 bg-emerald-300 px-3 py-2 text-black shadow focus:outline-none"
                  id="base"
                  type="text"
                  value={baseValue}
                  onChange={handleBaseChange}
                  onBlur={handleBlur}
                  placeholder="Enter a base between 2 and 16"
                />
              </div>
              <div className="mb-6">
                <label className="mb-2 block text-sm font-bold text-gray-700" htmlFor="outputNumber">
                  Output Number:
                </label>
                <input
                  className="focus:shadow-outline block w-full flex-1 rounded border border-gray-300 bg-white px-3 py-2 text-black shadow focus:outline-none"
                  id="outputNumber"
                  type="text"
                  placeholder="Output number will appear here"
                  readOnly
                />
              </div>
              <div className="mb-4 flex items-center justify-center">
                <p id="error" className="text-m text-center italic text-red-500">
                  {errorMessage}
                </p>
              </div>
              <div className="flex items-center justify-center">
                <button
                  className="focus:shadow-outline rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700 focus:outline-none"
                  type="button"
                  onClick={calculate}
                >
                  Calculate New Base
                </button>
              </div>
            </form>
          </div>
          <div className="flex-1 rounded-lg bg-white p-6 shadow-lg">
            <h3 className="mb-6 text-2xl font-bold text-black">How this program works</h3>
            <p className="text-gray-700">
              First, we error check the input and base to make sure they are valid for our program. We then convert the
              input number to the new base.
              <br />
              We will use an array to store the new number. We will then loop through the input number and calculate the
              remainder when dividing by the new base. We will then add the remainder to the array and update the input
              number to the floor of the input number divided by the new base. We will continue this process until the
              input number is 0. We will then reverse the array and join the elements to get the new number in the new
              base.
              <br />
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Week1Page
