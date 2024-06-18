import Image from "next/image"
import React, { useEffect, useState } from "react"
import styles from "./CallToAction.module.css"
import "animate.css"

/* <a href="https://www.freepik.com/icon/message_5356190">Icon by adrianadam</a> */

export interface CallToActionProps {
  display?: "show" | "hidden"
  phoneNumber?: string
  ctaMessage?: string
  theme?: "light" | "dark"
}

const CallToAction: React.FC<CallToActionProps> = ({
  display = "hidden",
  phoneNumber = "206-555-1234",
  ctaMessage = "Call Us",
  theme = "light",
}) => {
  const [isVisible, setIsVisible] = useState<boolean>(display !== "hidden")
  const [shouldRender, setShouldRender] = useState<boolean>(display !== "hidden")
  const [view, setView] = useState<"desktop" | "mobile">("desktop")

  useEffect(() => {
    if (display === "hidden") {
      setTimeout(() => setShouldRender(false), 1500)
    } else {
      setShouldRender(true)
    }
    setIsVisible(display !== "hidden")

    const handleResize = () => {
      if (window.innerWidth < 768) {
        setView("mobile")
      } else {
        setView("desktop")
      }
    }

    if (display !== "hidden") {
      handleResize()
      window.addEventListener("resize", handleResize)
    }

    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [display])

  const handleClick = () => {
    if (window.gtag) {
      window.gtag("event", "click", {
        event_category: "Button",
        event_label: "Call Button",
        value: phoneNumber,
      })
    }
    window.location.href = `tel:${phoneNumber}`
  }

  const handleClose = () => {
    setIsVisible(false)
    setTimeout(() => setShouldRender(false), 1500) // Match the duration of the fade-out animation
  }

  if (!shouldRender) {
    return null
  }

  const bgColor = theme === "light" ? "white" : "#343"
  const borderColor = theme === "light" ? "black" : "#fff"
  const textColor = theme === "light" ? "black" : "#fff"

  return (
    <div
      className={`${styles.ctaContainer} ${
        isVisible ? "animate__animated animate__zoomInRight" : "animate__animated animate__zoomOutRight"
      } ${styles[view]}`}
      style={
        {
          "--cta-bg-color": bgColor,
          "--cta-border-color": borderColor,
          "--cta-text-color": textColor,
        } as React.CSSProperties
      }
    >
      <button
        className={`${styles.ctaButton} animate__animated animate__pulse animate__repeat-3`}
        onClick={handleClick}
        aria-label={`Call: ${ctaMessage}`}
      >
        <Image src="/images/call_icon.svg" alt="Call Icon" width={24} height={24} />
        <Image src="/images/message_icon.png" alt="Message Icon" width={24} height={24} />
        <span>{ctaMessage}</span>
      </button>
      <button className={styles.closeButton} onClick={handleClose} aria-label="Close Call Button">
        &times;
      </button>
    </div>
  )
}

export default CallToAction
