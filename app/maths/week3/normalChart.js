// components/NormalDistributionChart.js
import Chart from "chart.js/auto"
import { useEffect, useRef } from "react"

const NormalDistributionChart = () => {
  const chartRef = useRef(null)
  const myChartRef = useRef(null)

  // Function to generate normal distribution data
  const generateNormalDistribution = (mean, stdDev, numPoints) => {
    const data = []
    const labels = []
    const step = (4 * stdDev) / numPoints
    for (let i = -2 * stdDev; i <= 2 * stdDev; i += step) {
      const x = mean + i
      const y = (1 / (stdDev * Math.sqrt(2 * Math.PI))) * Math.exp(-0.5 * Math.pow((x - mean) / stdDev, 2))
      data.push(y)
      labels.push(x.toFixed(2)) // to show labels with 2 decimal places
    }
    return { labels, data }
  }

  useEffect(() => {
    const ctx = chartRef.current.getContext("2d")

    // Clean up previous chart instance
    if (myChartRef.current) {
      myChartRef.current.destroy()
    }

    const { labels, data } = generateNormalDistribution(0, 1, 100)

    // Create new chart instance
    myChartRef.current = new Chart(ctx, {
      type: "line",
      data: {
        labels: labels,
        datasets: [
          {
            label: "Normal Distribution",
            data: data,
            borderWidth: 1,
            borderColor: "rgba(75, 192, 192, 1)",
            backgroundColor: "rgba(75, 192, 192, 0.2)",
            fill: true,
          },
        ],
      },
      options: {
        scales: {
          x: {
            title: {
              display: true,
              text: "Value",
            },
          },
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: "Probability Density",
            },
          },
        },
      },
    })

    // Cleanup function to destroy chart instance
    return () => {
      myChartRef.current.destroy()
    }
  }, [])

  return <canvas ref={chartRef} id="myChart"></canvas>
}

export default NormalDistributionChart
