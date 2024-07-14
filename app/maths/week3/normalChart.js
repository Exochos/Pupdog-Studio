import Chart from "chart.js/auto"
import { useEffect, useRef } from "react"

const MyChart = ({ ratios }) => {
  const chartRef = useRef(null)
  const myChartRef = useRef(null)

  const generateNormalDistribution = (mean, stdDev, numPoints) => {
    const data = []
    const labels = []
    const step = (4 * stdDev) / numPoints
    for (let i = -2 * stdDev; i <= 2 * stdDev; i += step) {
      const x = mean + i
      const y = (1 / (stdDev * Math.sqrt(2 * Math.PI))) * Math.exp(-0.5 * Math.pow((x - mean) / stdDev, 2))
      data.push(y)
      labels.push(x.toFixed(2))
    }
    return { labels, data }
  }

  useEffect(() => {
    const ctx = chartRef.current.getContext("2d")
    if (myChartRef.current) {
      myChartRef.current.destroy()
    }

    const mean = 0.5
    const stdDev = 0.1
    const { labels, data } = generateNormalDistribution(mean, stdDev, 100)
    const datasets = [
      {
        label: "Normal Distribution",
        data: data,
        borderWidth: 1,
        borderColor: "rgba(75, 192, 192, 1)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        fill: true,
      },
    ]

    if (ratios && ratios.length > 0) {
      ratios.forEach((ratio) => {
        const ratioLabel = (ratio * stdDev + mean).toFixed(2)
        const index = labels.indexOf(ratioLabel)

        if (index !== -1) {
          datasets.push({
            label: `Coin Flip Result (${ratio})`,
            data: labels.map((_, i) => (i === index ? data[i] : null)),
            pointRadius: 5,
            pointBackgroundColor: "red",
            showLine: false,
          })
        }
      })
    }

    myChartRef.current = new Chart(ctx, {
      type: "line",
      data: {
        labels: labels,
        datasets: datasets,
      },
      options: {
        scales: {
          x: {
            title: {
              display: true,
              text: "Ratio of Heads",
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

    return () => {
      myChartRef.current.destroy()
    }
  }, [ratios])

  return <canvas ref={chartRef} id="myChart"></canvas>
}

export default MyChart
