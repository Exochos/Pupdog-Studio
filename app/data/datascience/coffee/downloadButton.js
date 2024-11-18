"use client"
export default function downloadButton({ data }) {
  const generateCSV = (data) => {
    const header = ["Country", "Total Export", "Total Import", "Total Combined"]
    const rows = data.map((row) => [row.country, row.total_export, row.total_import, row.total_combined])

    return [header, ...rows].map((row) => row.join(",")).join("\n")
  }

  const handleDownload = () => {
    const csvContent = generateCSV(data)
    const blob = new Blob([csvContent], { type: "text/csv" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "top_five_combined.csv"
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <button
      className="my-4 rounded bg-blue-400 px-4 py-2 font-bold text-white hover:bg-blue-800"
      onClick={handleDownload}
    >
      Download CSV
    </button>
  )
}
