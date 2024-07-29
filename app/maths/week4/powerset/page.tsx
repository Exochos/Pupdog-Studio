"use client"
import React, { useState } from "react"
import { logEvent } from "../../../utils/googleAnalytics"

export default function Page(): JSX.Element {
  // State variables
  const [powerSet, setPowerSet] = useState<string[]>([])
  const [set, setSet] = useState<string>("")

  // Log page view
  logEvent("Page", "Power Set")

  return (
    <html lang="en">
      <head>
        <title>Power Set</title>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="description" content="This page demonstrates the concept of a Power Set in Mathematics by generating the Power Set of a given set." />
        <meta name="author" content="Jeremy Ward" />
        <meta name="date" content="2021-08-04" />

        </head>
      <body>
        <h1>Power Set</h1>
        <p>
          The Power Set of a set is the set of all possible subsets of that set. The Power Set of a set with n elements has 2^n elements.
        </p>
        <p>
          Enter a set of elements separated by commas:
        </p>
        <input type="text" id="set" />
        <button>Generate Power Set</button>
        <p id="powerSet"></p>
      </body>
    </html>
  )
}

