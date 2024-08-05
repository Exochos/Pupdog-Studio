"use client"
import Script from "next/script"
import { useEffect } from "react"
import CookieConsent from "react-cookie-consent"
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
      <body>
        {children}
        <CookieConsent
          location="bottom"
          buttonText="I understand"
          cookieName="myWebsiteCookieConsent"
          style={{ background: "#2B373B" }}
          buttonStyle={{ color: "#4e503b", fontSize: "13px" }}
          expires={150}
        >
         In order to comply with the GDPR we are required to inform you that we use cookies on this website.
        </CookieConsent>
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9359140916151157"
          crossOrigin="anonymous"
        />
      </body>
    </html>
  )
}
