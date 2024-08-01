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
      <head>
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9359140916151157"
          crossOrigin="anonymous"
        ></script>
      </head>
      <body>{children}</body>
    </html>
  )
}
