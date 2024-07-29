"use client"
import React, { useState } from "react"
import { metaData } from "./metaData"
import Truth from "./Truths"
import { logEvent } from "../../../utils/googleAnalytics"

export default function Page(): JSX.Element {
  // State variables
  const [aValue, setAValue] = useState(true)
  const [bValue, setBValue] = useState(true)
  const [selectedOperation, setSelectedOperation] = useState("AND")
  const [result, setResult] = useState<string | boolean>("")
  const [truthTable, setTruthTable] = useState<{ a: boolean; b: boolean; result: boolean }[]>([])

  // Calculate the result of the selected operation
  const calculateResult = () => {
    if (selectedOperation === "NOT") {
      setResult((Truth[selectedOperation] as (a: boolean) => boolean)(aValue).toString())
    } else {
      setResult(
        (Truth[selectedOperation as keyof typeof Truth] as (a: boolean, b: boolean) => boolean)(
          aValue,
          bValue
        ).toString()
      )
    }

    // Generate truth table
    const table = [
      {
        a: true,
        b: true,
        result: (Truth[selectedOperation as keyof typeof Truth] as (a: boolean, b: boolean) => boolean)(true, true),
      },
      {
        a: true,
        b: false,
        result: (Truth[selectedOperation as keyof typeof Truth] as (a: boolean, b: boolean) => boolean)(true, false),
      },
      {
        a: false,
        b: true,
        result: (Truth[selectedOperation as keyof typeof Truth] as (a: boolean, b: boolean) => boolean)(false, true),
      },
      {
        a: false,
        b: false,
        result: (Truth[selectedOperation as keyof typeof Truth] as (a: boolean, b: boolean) => boolean)(false, false),
      },
    ]

    setTruthTable(table)

    // Track button click
    logEvent("User", "Calculate Result", `Operation: ${selectedOperation}`)
  }

  const handleToggle = (value: boolean, setValue: React.Dispatch<React.SetStateAction<boolean>>, label: string) => {
    setValue(!value)

    // Track toggle clicks
    logEvent("User", "Toggle Value", label)
  }

  return (
    <html lang="en">
      <head>
        <meta content="description" name="{metaData.description}" />
        <meta content="author" name="{metaData.author}" />
        <meta content="date" name="{metaData.date}" />
        <title>{metaData.title}</title>
      </head>
      <body>
        <div className="container mx-auto flex h-screen w-screen items-center justify-center p-4">
          <div className="card w-full max-w-xs bg-white p-2 shadow-xl transition-transform duration-300 md:w-3/5">
            <h2 className="m-4 text-center text-xl font-bold text-black">Mathematical Statements</h2>
            <p className="m-4 text-center text-lg text-black">
              This page demonstrates the truth values of mathematical statements. As well as the truth table for each
              statement. To get started, click on the buttons to toggle the truth values of A and B. Then select an
              operation from the dropdown and click on the calculate button to see the result.
            </p>
            <div className="grid gap-4 p-4">
              <div className="flex items-center justify-center">
                <div className="animate__animated animate__fadeIn animate__delay-4s">
                  <button
                    onClick={() => handleToggle(aValue, setAValue, "A")}
                    className={`transition-colors duration-500 ${
                      aValue ? "bg-green-500" : "bg-red-300"
                    } rounded px-4 py-2 font-bold text-black`}
                  >
                    A {aValue.toString()}
                  </button>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <select
                  className="form-select rounded px-4 py-2 font-bold text-white transition-colors duration-500"
                  value={selectedOperation}
                  onChange={(e) => setSelectedOperation(e.target.value)}
                >
                  <option value="AND">AND</option>
                  <option value="OR">OR</option>
                  <option value="NOT">NOT</option>
                  <option value="XOR">XOR</option>
                  <option value="IF">IF</option>
                </select>
              </div>
              <div className="flex items-center justify-center">
                <div className="animate__animated animate__fadeIn animate__delay-4s">
                  <button
                    onClick={() => handleToggle(bValue, setBValue, "B")}
                    className={`transition-colors duration-500 ${
                      bValue ? "bg-green-500" : "bg-red-300"
                    } rounded px-4 py-2 font-bold text-black`}
                  >
                    B {bValue.toString()}
                  </button>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <button className="btn btn-primary mt-4" onClick={calculateResult}>
                  Calculate
                </button>
              </div>
              <div className="flex items-center justify-center">
                <p>Result: {result.toString()}</p>
              </div>
              <div className="flex items-center justify-center">
                <h3 className="mt-4 text-lg font-bold">Truth Table</h3>
              </div>
              <div className="flex items-center justify-center">
                <table className="table-auto border-collapse border border-gray-400">
                  <thead>
                    <tr>
                      <th className="border border-gray-400 p-2">A</th>
                      <th className="border border-gray-400 p-2">B</th>
                      <th className="border border-gray-400 p-2">Result</th>
                    </tr>
                  </thead>
                  <tbody>
                    {truthTable.map((row, index) => (
                      <tr key={index}>
                        <td className="border border-gray-400 p-2">{row.a.toString()}</td>
                        <td className="border border-gray-400 p-2">{row.b.toString()}</td>
                        <td className="border border-gray-400 p-2">{row.result.toString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </body>
    </html>
  )
}
