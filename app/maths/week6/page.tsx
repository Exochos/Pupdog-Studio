/*  Assignment: Create an Application for Calculating Permutations and Combinations 
    Requirements:
    The application should take two inputs from the user: (total items) and r (items to be chosen or arranged).
    The application should calculate and display:
        The number of permutations P(n, r)
        The number of combinations C(n, r)
    The application can be implemented as either a web application or a terminal application.
*/
"use client"
import React, { useState } from "react"
import { logEvent } from "../../utils/googleAnalytics"

// Log page view
logEvent("Page", "Permutations and Combinations")

function Page(): JSX.Element {
  // State variables
  const [N, setN] = useState<number | string>("")
  const [R, setR] = useState<number | string>("")

  // Handle button click
  const handleClick = () => {}

  return (
    <html lang="en">
      <head>
        <title>Permutations and Combinations Calculator</title>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta
          name="description"
          content="Permutations and Combinations Calculator | Calculate the number of permutations and combinations of a given set of items."
        />
        <meta name="author" content="Jeremy Ward" />
      </head>
      <body>
        <div className="container mx-auto flex h-screen w-screen items-center justify-center p-4">
          <div className="card w-full max-w-xs bg-white p-2 shadow-xl transition-transform duration-300 md:w-3/5">
            <h2 className="text-2xl font-bold text-black">Permutations and Combinations Calculator</h2>
            <code className="text-sm text-gray-700">
              Create an application that calculates permutations and combinations based on user input. The application
              should allow the user to enter the values for n (total items) and r (items to be chosen or arranged) and
              then display the results.
            </code>
            <hr className="my-4" />
            <div className="form-control">
              <label htmlFor="n" className="label">
                Total Items (n)
              </label>
              <input
                type="number"
                id="n"
                className="input input-bordered"
                placeholder="Enter the total number of items"
                value={N}
                onChange={(e) => setN(e.target.value)}
              />

              <label htmlFor="r" className="label">
                Items to Choose (r): {R}
              </label>
              <input
                type="number"
                id="r"
                className="input input-bordered"
                placeholder="Enter the number of items to choose"
                value={R}
                onChange={(e) => setR(e.target.value)}
              />
              <hr className="my-4" />
              <button className="btn btn-outline btn-primary m-2" onClick={handleClick}>
                Calculate Permutations and Combinations
              </button>
            </div>
          </div>
        </div>
      </body>
    </html>
  )
}

export default Page
