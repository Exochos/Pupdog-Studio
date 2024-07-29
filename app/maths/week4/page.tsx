"use client"
import React, { useState } from "react"
import Truth from "./Truths"

const { AND, OR, NOT, XOR, IF } = Truth

const operations = {
  AND,
  OR,
  NOT,
  XOR,
  IF,
}

const Page: React.FC = () => {
  const [activeTab, setActiveTab] = useState("Tab1")
  const [aValue, setAValue] = useState(true)
  const [bValue, setBValue] = useState(true)
  const [selectedOperation, setSelectedOperation] = useState("AND")
  const [result, setResult] = useState<string | boolean>("")
  const [truthTable, setTruthTable] = useState<{ a: boolean; b: boolean; result: boolean }[]>([])

  const calculateResult = () => {
    if (selectedOperation === "NOT") {
      setResult(operations[selectedOperation](aValue).toString())
    } else {
      setResult(operations[selectedOperation](aValue, bValue).toString())
    }

    const table = [
      { a: true, b: true, result: operations[selectedOperation](true, true) },
      { a: true, b: false, result: operations[selectedOperation](true, false) },
      { a: false, b: true, result: operations[selectedOperation](false, true) },
      { a: false, b: false, result: operations[selectedOperation](false, false) },
    ]

    setTruthTable(table)
  }

  const handleToggle = (value: boolean, setValue: React.Dispatch<React.SetStateAction<boolean>>) => {
    setValue(!value)
  }

  return (
    <>
      <div className="container mx-auto flex h-screen w-screen items-center justify-center p-4">
        <div className="card aspect-[1/1.75] w-full max-w-xs bg-white p-2 shadow-xl transition-transform duration-300 md:w-3/5">
          <div role="tablist" className="tabs tabs-lifted tabs-md">
            <button
              role="tab"
              aria-selected={activeTab === "Tab1"}
              className={`tab ${activeTab === "Tab1" ? "tab-active" : ""}`}
              onClick={() => setActiveTab("Tab1")}
            >
              Truths
            </button>
            <button
              role="tab"
              aria-selected={activeTab === "Tab2"}
              className={`tab ${activeTab === "Tab2" ? "tab-active" : ""}`}
              onClick={() => setActiveTab("Tab2")}
            >
              Powerset Assignment
            </button>
          </div>
          <div role="tabpanel" className={`tab-panel ${activeTab === "Tab1" ? "" : "hidden"}`}>
            <h2 className="m-4 text-center text-xl font-bold text-black">Truths</h2>
            <div className="grid gap-4 p-4">
              <div className="flex items-center justify-center">
                <div className="animate__animated animate__fadeIn animate__delay-4s">
                  <button
                    onClick={() => handleToggle(aValue, setAValue)}
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
                    onClick={() => handleToggle(bValue, setBValue)}
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
          <div role="tabpanel" className={`tab-panel ${activeTab === "Tab2" ? "" : "hidden"}`}>
            <h2 className="m-4 text-center text-xl font-bold text-gray-800">Powerset Assignment</h2>
            <p>Powerset assignment content goes here...</p>
          </div>
        </div>
      </div>
    </>
  )
}

export default Page
