"use client"
import { useEffect } from "react"
import "styles/tailwind.css"
import { initializeGA, logPageView } from "./utils/googleAnalytics"
export default function RootLayout({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    initializeGA("G-ZV2QJBY6FK")
    logPageView()

    const handleRouteChange = () => {
      logPageView()
    }

    window.addEventListener("popstate", handleRouteChange)

    return () => {
      window.removeEventListener("popstate", handleRouteChange)
    }
  }, [])

  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
