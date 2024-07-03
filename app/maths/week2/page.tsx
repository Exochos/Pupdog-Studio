"use client"

import Head from "next/head"
import { useEffect, useState } from "react"

export default function MathsAssignment() {
  const [sign, setSign] = useState(false)
  const [exponent, setExponent] = useState(Array(8).fill(false))
  const [mantissa, setMantissa] = useState(Array(23).fill(false))
  const [totalDecimal, setTotalDecimal] = useState("0")
  const [totalExponent, setTotalExponent] = useState("0e0")

  const handleCheckboxChange = (index: number | null, type: "sign" | "exponent" | "mantissa") => {
    if (type === "sign") {
      setSign(!sign)
    } else if (type === "exponent" && index !== null) {
      const newExponent = [...exponent]
      newExponent[index] = !newExponent[index]
      setExponent(newExponent)
    } else if (type === "mantissa" && index !== null) {
      const newMantissa = [...mantissa]
      newMantissa[index] = !newMantissa[index]
      setMantissa(newMantissa)
    }
  }

  useEffect(() => {
    const calculateTotal = () => {
      let exponentTotal = exponent.reduce((acc, val, index) => {
        return val ? acc + Math.pow(2, 7 - index) : acc
      }, 0)

      let mantissaTotal = mantissa.reduce((acc, val, index) => {
        return val ? acc + Math.pow(2, -(index + 1)) : acc
      }, 0)

      let total = (1 + mantissaTotal) * Math.pow(2, exponentTotal - 127)
      if (sign) total = -total

      const totalDecimalStr = total.toFixed(10)
      const totalExponentStr = total.toExponential()

      setTotalDecimal(totalDecimalStr)
      setTotalExponent(totalExponentStr)
    }

    calculateTotal()
  }, [sign, exponent, mantissa])

  return (
    <>
      <Head>
        <title>Week 2 Maths Assignment 1</title>
        <meta name="description" content="Understanding IEEE 754 Floating Point Numbers" />
      </Head>

      <div className="flex min-h-screen items-center justify-center bg-gray-100">
        <div className="mx-auto max-w-screen-lg p-4">
          <div className="flex flex-col gap-4 md:flex-row">
            <div className="flex-1 rounded-lg bg-white p-6 shadow-lg">
              <h3 className="mb-6 text-2xl font-bold text-black">IEEE 754 Floating Point Number Calculator</h3>
              <div className="overflow-x-auto">
                <table className="w-full table-fixed border-collapse">
                  <thead>
                    <tr>
                      <th className="border border-gray-400 p-1">Sign</th>
                      <th className="border border-gray-400 p-1" colSpan={8}>
                        Exponent
                      </th>
                      <th className="border border-gray-400 p-1" colSpan={23}>
                        Mantissa
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-gray-400 bg-gray-200 text-center" colSpan={1}>
                        1 bit
                      </td>
                      <td className="border border-gray-400 bg-gray-200 text-center" colSpan={8}>
                        8 bits
                      </td>
                      <td className="border border-gray-400 bg-gray-200 text-center" colSpan={23}>
                        23 bits
                      </td>
                    </tr>
                    <tr>
                      <td className="border border-gray-400 bg-red-100">
                        <div className="tooltip" data-tip="Sign Bit">
                          <input
                            type="checkbox"
                            name="sign"
                            value="1"
                            checked={sign}
                            onChange={() => handleCheckboxChange(null, "sign")}
                          />
                        </div>
                      </td>
                      {Array.from({ length: 8 }).map((_, index) => (
                        <td key={index} className="border border-gray-400 bg-yellow-100 text-center">
                          <div className="tooltip" data-tip={Math.pow(2, 7 - index)}>
                            <input
                              type="checkbox"
                              name="exponent"
                              value={index}
                              checked={exponent[index]}
                              onChange={() => handleCheckboxChange(index, "exponent")}
                            />
                          </div>
                        </td>
                      ))}
                      {Array.from({ length: 23 }).map((_, index) => (
                        <td key={index} className="border border-gray-400 bg-green-100 text-center">
                          <div className="tooltip" data-tip={Math.pow(2, 22 - index)}>
                            <input
                              type="checkbox"
                              name="mantissa"
                              value={index}
                              checked={mantissa[index]}
                              onChange={() => handleCheckboxChange(index, "mantissa")}
                            />
                          </div>
                        </td>
                      ))}
                    </tr>
                    <tr>
                      <td className="border border-gray-400 bg-red-100 text-center">{sign ? "-" : "+"}</td>
                      {exponent.map((checked, index) => (
                        <td key={index} className="border border-gray-400 bg-yellow-100 text-center">
                          {checked ? 1 : 0}
                        </td>
                      ))}
                      {mantissa.map((checked, index) => (
                        <td key={index} className="border border-gray-400 bg-green-100 text-center">
                          {checked ? 1 : 0}
                        </td>
                      ))}
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <div className="mt-4 flex flex-col gap-4 md:flex-row">
            <div className="flex-1 rounded-lg bg-white p-6 shadow-lg">
              <h3 className="mb-6 text-2xl font-bold text-black">Running Total</h3>
              <p className="text-lg">
                <strong>Decimal:</strong> {totalDecimal}
              </p>
              <p className="text-lg">
                <strong>Exponent:</strong> {totalExponent}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
