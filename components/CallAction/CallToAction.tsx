import Image from "next/image"
import React, { useEffect, useState } from "react"
import "animate.css"

export interface CallToActionProps {
  display?: "show" | "hidden"
  phoneNumber?: string
  ctaMessage?: string
  theme?: "light" | "dark"
}

const CallToAction: React.FC<CallToActionProps> = ({
  display = "show",
  phoneNumber = "206-555-1234",
  ctaMessage = "Call Us",
  theme = "light",
}) => {
  const [isVisible, setIsVisible] = useState<boolean>(display !== "hidden")
  const [shouldRender, setShouldRender] = useState<boolean>(display !== "hidden")
  const [showChatBubble, setShowChatBubble] = useState<boolean>(false)

  useEffect(() => {
    let timer: NodeJS.Timeout
    if (display === "hidden") {
      setTimeout(() => setShouldRender(false), 1500)
      setShowChatBubble(false)
    } else {
      setShouldRender(true)
      setTimeout(() => setShowChatBubble(true), 1500) // Delay for chat bubble to show after main icon animation
      timer = setTimeout(() => setShowChatBubble(false), 10000) // Auto-hide chat bubble after 20 seconds
    }
    setIsVisible(display !== "hidden")

    return () => {
      clearTimeout(timer)
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

  const handleCloseBubble = () => {
    setShowChatBubble(false)
  }

  if (!shouldRender) {
    return null
  }

  return (
    <div className="fixed bottom-0 right-4 m-4 flex flex-col items-end gap-4">
      {showChatBubble && (
        <div
          className={`chat chat-end relative transition-opacity duration-500 ${
            showChatBubble ? "animate__animated animate__fadeInUp" : "animate__animated animate__fadeOutDown"
          }`}
          style={{ animationDelay: "800ms" }}
        >
          <button
            className="absolute right-0 top-0 border-none bg-transparent text-lg font-bold text-black"
            onClick={handleCloseBubble}
            aria-label="Close"
          >
            &times;
          </button>
          <div className="avatar chat-image">
            <div className="w-10 rounded-full">
              <Image
                alt="Tailwind CSS chat bubble component"
                src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
                width={40}
                height={40}
              />
            </div>
          </div>
          <div className="chat-bubble chat-bubble-info">Hi! How can we help you today?</div>
        </div>
      )}
      <div
        className={`relative flex h-16 w-16 justify-center overflow-hidden rounded-full border border-black bg-white p-2 shadow-lg transition-transform duration-[500ms]
          ${isVisible ? "animate__animated animate__zoomInRight" : "animate__animated animate__zoomOutRight"}`}
        style={{ transitionDuration: "500ms" }}
      >
        <div className="transform-gpu transition-transform duration-[500ms] hover:rotate-[360deg]">
          <button
            className="flex cursor-pointer items-center justify-center border-none bg-transparent outline-none"
            onClick={handleClick}
            aria-label={`Call: ${ctaMessage}`}
          >
            <Image src="/images/message_icon.png" alt="Message Icon" width={60} height={60} />
          </button>
        </div>
      </div>
    </div>
  )
}

export default CallToAction
