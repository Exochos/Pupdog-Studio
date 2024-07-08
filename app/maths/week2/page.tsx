"use client"
import Head from "next/head"
import { useEffect, useState } from "react"
import "./styles.css"

export default function MathsAssignment() {
  const [sign, setSign] = useState(false)
  const [exponent, setExponent] = useState(Array(8).fill(false))
  const [mantissa, setMantissa] = useState(Array(23).fill(false))
  const [totalExponent, setTotalExponent] = useState("0e0")
  const [mantissaTooltip, setMantissaTooltip] = useState(Array(23).fill(false))
  const [exponentTooltip, setExponentTooltip] = useState(Array(8).fill(false))
  const [signTooltip, setSignTooltip] = useState(false)

  const handleCheckboxChange = (index: number | null, type: string) => {
    if (type === "sign") {
      setSign(!sign)
      setSignTooltip(!sign) // Open tooltip when checked
    } else if (type === "exponent" && index !== null) {
      const newExponent = [...exponent]
      newExponent[index] = !newExponent[index]
      setExponent(newExponent)
      const newExponentTooltip = [...exponentTooltip]
      newExponentTooltip[index] = newExponent[index] // Open tooltip when checked
      setExponentTooltip(newExponentTooltip)
    } else if (type === "mantissa" && index !== null) {
      const newMantissa = [...mantissa]
      newMantissa[index] = !newMantissa[index]
      setMantissa(newMantissa)
      const newMantissaTooltip = [...mantissaTooltip]
      newMantissaTooltip[index] = newMantissa[index] // Open tooltip when checked
      setMantissaTooltip(newMantissaTooltip)
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

      const totalExponentStr = total.toExponential()
      setTotalExponent(totalExponentStr)
    }

    calculateTotal()
  }, [sign, exponent, mantissa])

  const displayValue = (index: number, type: string) => {
    if (type === "exponent") {
      return `2^${7 - index}`
    } else if (type === "mantissa") {
      return `2^-${index + 1}`
    }
    return null
  }

  const getCellClass = (checked: boolean, type: string) => {
    if (checked) {
      if (type === "sign") return "highlighted-sign"
      if (type === "exponent") return "highlighted-exponent"
      if (type === "mantissa") return "highlighted-mantissa"
    }
    return ""
  }

  return (
    <>
      <Head>
        <title>Week 2 Maths Assignment 1</title>
        <meta name="description" content="Understanding IEEE 754 Floating Point Numbers" />
      </Head>

      <div className="flex min-h-screen items-center justify-center bg-gray-100">
        <div className="p-4">
          <div className="flex flex-col gap-4">
            <div className="flex-1 rounded-lg bg-white p-6 shadow-lg">
              <h3 className="mb-6 text-2xl font-bold text-black">IEEE 754 Floating Point Number Calculator</h3>
              <div className="overflow-x-auto p-4">
                <table className="w-full table-fixed border-collapse p-6">
                  <thead>
                    <tr>
                      <th className="border border-gray-400 bg-gray-100 p-2 text-black" colSpan={2}>
                        Sign (1 bit)
                      </th>
                      <th className="border border-gray-400 bg-gray-100 p-1 text-black" colSpan={8}>
                        Exponent (8 bits)
                      </th>
                      <th className="border border-gray-400 bg-gray-100 p-1 text-black" colSpan={23}>
                        Mantissa (23 bits)
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td
                        className={`border border-black bg-red-100 py-5 text-center ${getCellClass(sign, "sign")}`}
                        colSpan={2}
                      >
                        <div
                          className={`morph tooltip tooltip-bottom tooltip-error ${signTooltip ? "tooltip-open" : ""}`}
                          data-tip="Sign Bit"
                        >
                          <input
                            type="checkbox"
                            name="sign"
                            value="1"
                            checked={sign}
                            onChange={() => handleCheckboxChange(null, "sign")}
                            id="sign-checkbox"
                          />
                          <label htmlFor="sign-checkbox" className="checkbox-label"></label>
                        </div>
                      </td>

                      {/* Exponent row */}
                      {Array.from({ length: 8 }).map((_, index) => {
                        const reversedIndex = 7 - index
                        return (
                          <td
                            key={index}
                            className={`border border-black bg-yellow-100 py-5 text-center ${getCellClass(
                              exponent[reversedIndex],
                              "exponent"
                            )}`}
                          >
                            <div
                              className={`morph tooltip-offset tooltip tooltip-bottom tooltip-warning ${
                                exponentTooltip[reversedIndex] ? "tooltip-open" : ""
                              }`}
                              data-tip={displayValue(reversedIndex, "exponent")}
                            >
                              <input
                                type="checkbox"
                                name="exponent"
                                value={reversedIndex}
                                checked={exponent[reversedIndex]}
                                onChange={() => handleCheckboxChange(reversedIndex, "exponent")}
                                id={`exponent-checkbox-${reversedIndex}`}
                              />
                              <label htmlFor={`exponent-checkbox-${reversedIndex}`} className="checkbox-label"></label>
                            </div>
                          </td>
                        )
                      })}

                      {/* Mantissa row */}
                      {Array.from({ length: 23 })
                        .reverse()
                        .map((_, index) => (
                          <td
                            key={index}
                            className={`border border-black bg-blue-100 py-5 text-center ${getCellClass(
                              mantissa[22 - index],
                              "mantissa"
                            )}`}
                          >
                            <div
                              className={`morph tooltip tooltip-bottom tooltip-primary ${
                                mantissaTooltip[22 - index] ? "tooltip-open" : ""
                              }`}
                              data-tip={`2^-${index + 1}`}
                            >
                              <input
                                type="checkbox"
                                name="mantissa"
                                value={index}
                                checked={mantissa[22 - index]}
                                onChange={() => handleCheckboxChange(22 - index, "mantissa")}
                                id={`mantissa-checkbox-${22 - index}`}
                              />
                              <label htmlFor={`mantissa-checkbox-${22 - index}`} className="checkbox-label"></label>
                            </div>
                          </td>
                        ))}
                      {/* End of mantissa row */}
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <div className="mt-4 flex flex-col gap-4 md:flex-row md:gap-8">
            <div className="flex-1 rounded-lg bg-white p-6 text-center shadow-lg">
              <h3 className="mb-6 text-2xl font-bold text-black">Running Total</h3>
              <p className="text-lg">
                <strong>Exponent:</strong> {totalExponent}
              </p>
              <strong>Note:</strong> This calculator does not account for special values like NaN or Infinity.
            </div>
          </div>
          <div className="mt-4 flex items-center justify-center">
            <div className="flex-1 rounded-lg bg-white p-6 text-center shadow-lg">
              <p className="text-xs text-black">
                <strong> How it works:</strong>
                When we click on the checkboxes, we can see the binary representation of the IEEE 754 floating point
                number. The sign bit is the first bit, the exponent is the next 8 bits, and the mantissa is the last 23
                bits. The exponent is calculated by adding the values of the checked bits, and the mantissa is
                calculated by adding the values of the checked bits and dividing by 2. The total is calculated by adding
                the mantissa to 1 and multiplying by 2 to the power of the exponent minus 127. The total is displayed in
                scientific notation.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
