"use client"
import { Chart, registerables } from "chart.js"
import React, { useEffect, useRef, useState } from "react"

// Register chart.js plugins
Chart.register(...registerables)

const PCalc: React.FC = () => {
  // State management
  const [prevalence, setPrevalence] = useState<number | string>("")
  const [sensitivity, setSensitivity] = useState<number | string>("")
  const [specificity, setSpecificity] = useState<number | string>("")
  const [probabilityPositive, setProbabilityPositive] = useState<number | null>(null)
  const [probabilityNegative, setProbabilityNegative] = useState<number | null>(null)
  const chartRef = useRef<HTMLCanvasElement>(null)
  const chartInstanceRef = useRef<Chart | null>(null)

  // Calculate probabilities
  const calculateProbabilities = () => {
    const prev = parseFloat(prevalence as string) / 100
    const sens = parseFloat(sensitivity as string) / 100
    const spec = parseFloat(specificity as string) / 100

    if (isNaN(prev) || isNaN(sens) || isNaN(spec)) {
      return
    }

    const probabilityTestPositive = (prev * sens) / (prev * sens + (1 - prev) * (1 - spec))
    const probabilityTestNegative = ((1 - prev) * spec) / ((1 - prev) * spec + prev * (1 - sens))

    setProbabilityPositive(probabilityTestPositive * 100)
    setProbabilityNegative(probabilityTestNegative * 100)
  }

  // Chart rendering
  useEffect(() => {
    if (chartInstanceRef.current) {
      chartInstanceRef.current.destroy()
    }

    if (chartRef.current) {
      chartInstanceRef.current = new Chart(chartRef.current, {
        type: "bar",
        data: {
          labels: [
            "Probability of Having Disease if Tested Positive",
            "Probability of Not Having Disease if Tested Negative",
          ],
          datasets: [
            {
              label: "Probability (%)",
              data: [probabilityPositive, probabilityNegative],
              backgroundColor: ["rgba(75, 192, 192, 0.6)", "rgba(255, 99, 132, 0.6)"],
              borderColor: ["rgba(75, 192, 192, 1)", "rgba(255, 99, 132, 1)"],
              borderWidth: 1,
            },
          ],
        },
        options: {
          scales: {
            y: {
              beginAtZero: true,
              title: {
                display: true,
                text: "Probability (%)",
              },
            },
          },
        },
      })
    }
  }, [probabilityPositive, probabilityNegative])

  return (
    <div className="container mx-auto mt-10 rounded-lg p-4">
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <div>
          <div className="card mb-4 w-full bg-white p-2 shadow-xl">
            <div className="card-body">
              <h1 className="card-title text-2xl font-bold text-black">Probability Calculator</h1>
              <span className="text-gray-700">
                The application must have input fields for:
                <div className="list-disc">
                  <li>Prevalence of the disease (Prior probability, P(Disease))</li>
                  <li>Probability of testing positive given having the disease (Sensitivity, P(Test+|Disease+))</li>
                  <li>Probability of testing negative given not having the disease (Specificity, P(Test-|Disease-))</li>
                </div>
                The application should display the probability of having the disease if tested positive and if tested
                negative.
              </span>
            </div>
          </div>
          <div className="card w-full bg-white p-2 shadow-xl">
            <div className="card-body">
              <div className="grid grid-cols-1 gap-4">
                <div className="form-control">
                  <label htmlFor="prevalence" className="label">
                    Prevalence of the disease (%)
                  </label>
                  <input
                    type="number"
                    id="prevalence"
                    className="input input-bordered"
                    placeholder="Enter the prevalence of the disease"
                    value={prevalence}
                    onChange={(e) => setPrevalence(e.target.value)}
                  />
                </div>
                <div className="form-control">
                  <label htmlFor="sensitivity" className="label">
                    Sensitivity (%)
                  </label>
                  <input
                    type="number"
                    id="sensitivity"
                    className="input input-bordered"
                    placeholder="Enter the sensitivity of the test"
                    value={sensitivity}
                    onChange={(e) => setSensitivity(e.target.value)}
                  />
                </div>
                <div className="form-control">
                  <label htmlFor="specificity" className="label">
                    Specificity (%)
                  </label>
                  <input
                    type="number"
                    id="specificity"
                    className="input input-bordered"
                    placeholder="Enter the specificity of the test"
                    value={specificity}
                    onChange={(e) => setSpecificity(e.target.value)}
                  />
                </div>
              </div>
              <button
                className="btn btn-primary mt-4"
                onClick={calculateProbabilities}
                disabled={prevalence === "" || sensitivity === "" || specificity === ""}
              >
                Calculate Probabilities
              </button>
            </div>
          </div>
        </div>
        <div className="card w-full bg-white p-2 shadow-xl">
          <div className="card-body">
            <canvas ref={chartRef} id="chartProbability"></canvas>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PCalc
