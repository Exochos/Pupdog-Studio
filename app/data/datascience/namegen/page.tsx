// app/page.tsx

"use client"

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@radix-ui/react-dialog"
import { CopyIcon } from "@radix-ui/react-icons"
import { useState } from "react"
import { generateStartupName } from "./generateName"
import { middles, prefixes, suffixes } from "./wordList"
import { Button } from "@/components/ui/button"
import "react-toastify/dist/ReactToastify.css"

export default function Home() {
  const [numNames, setNumNames] = useState(20)
  const [names, setNames] = useState<string[]>([])
  const [loading, setLoading] = useState(false)

  const handleGenerate = () => {
    setLoading(true)
    const generatedNames = new Set<string>()

    while (generatedNames.size < numNames) {
      const name = generateStartupName(prefixes, middles, suffixes)
      generatedNames.add(name)
    }

    setNames(Array.from(generatedNames))
    setLoading(false)
  }

  const handleCopy = (name: string) => {
    navigator.clipboard
      .writeText(name)
      .then(() => {
        console.log("Copied to clipboard!")
      })
      .catch((err) => {
        console.error("Failed to copy!", err)
      })
  }

  return (
    <div className="flex min-h-screen flex-col items-center bg-gray-100 px-4 py-10">
      <header className="mb-8">
        <h1 className="text-center text-4xl font-bold text-gray-800">Startup Name Generator</h1>
        <p className="mt-2 text-center text-gray-600">Generate unique and creative names for your startup.</p>
      </header>

      <main className="w-full max-w-md rounded-lg bg-white p-6 shadow-md">
        <div className="mb-4">
          <label htmlFor="numNames" className="mb-2 block font-medium text-gray-700">
            Number of Names:
          </label>
          <input
            type="number"
            id="numNames"
            value={numNames}
            onChange={(e) => setNumNames(parseInt(e.target.value))}
            className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            min={1}
            max={100}
          />
        </div>
        <Button
          onClick={handleGenerate}
          disabled={loading}
          className={`w-full rounded-md bg-blue-500 px-4 py-2 text-white transition-colors hover:bg-blue-600 ${
            loading ? "cursor-not-allowed opacity-50" : ""
          }`}
        >
          {loading ? "Generating..." : "Generate Names"}
        </Button>
      </main>

      {names.length > 0 && (
        <section className="mt-10 w-full max-w-3xl">
          <h2 className="mb-4 text-2xl font-semibold text-gray-800">Generated Names:</h2>
          <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
            {names.map((name, index) => (
              <li key={index} className="flex items-center justify-between rounded-lg bg-white p-4 shadow">
                <span className="text-gray-700">{name}</span>
                <button
                  onClick={() => handleCopy(name)}
                  className="rounded bg-green-500 p-2 text-white transition-colors hover:bg-green-600"
                >
                  <CopyIcon />
                </button>
              </li>
            ))}
          </ul>
        </section>
      )}


      {/* Optional: Example of using Radix UI Dialog for more information */}
      <Dialog>
        <DialogTrigger asChild>
          <button className="mt-6 text-blue-500 hover:underline">Learn More</button>
        </DialogTrigger>
        <DialogContent className="fixed left-1/2 top-1/2 w-full max-w-md -translate-x-1/2 -translate-y-1/2 transform rounded-lg bg-white p-6 shadow">
          <DialogTitle className="mb-2 text-xl font-bold">About the Generator</DialogTitle>
          <DialogDescription className="mb-4 text-gray-600">
            This tool generates unique and creative startup names by combining various prefixes, middles, and suffixes.
          </DialogDescription>
          <DialogClose asChild>
            <button className="mt-4 rounded bg-blue-500 px-4 py-2 text-white transition-colors hover:bg-blue-600">
              Close
            </button>
          </DialogClose>
        </DialogContent>
      </Dialog>
    </div>
  )
}
