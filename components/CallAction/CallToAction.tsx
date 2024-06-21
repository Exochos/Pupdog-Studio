import Image from "next/image";
import React, { useEffect, useState } from "react";
import styles from "./CallToAction.module.css";
import "animate.css";

/* <a href="https://www.freepik.com/icon/message_5356190">Icon by adrianadam</a> */

export interface CallToActionProps {
  display?: "show" | "hidden";
  phoneNumber?: string;
  ctaMessage?: string;
  theme?: "light" | "dark";
}

const CallToAction: React.FC<CallToActionProps> = ({
  display = "show",
  phoneNumber = "206-555-1234",
  ctaMessage = "Call Us",
  theme = "light",
}) => {
  const [isVisible, setIsVisible] = useState<boolean>(display !== "hidden");
  const [shouldRender, setShouldRender] = useState<boolean>(display !== "hidden");
  const [view, setView] = useState<"desktop" | "mobile">("desktop");

  useEffect(() => {
    if (display === "hidden") {
      setTimeout(() => setShouldRender(false), 1500);
    } else {
      setShouldRender(true);
    }
    setIsVisible(display !== "hidden");

    const handleResize = () => {
      if (window.innerWidth < 768) {
        setView("mobile");
      } else {
        setView("desktop");
      }
    };

    if (display !== "hidden") {
      handleResize();
      window.addEventListener("resize", handleResize);
    }

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [display]);

  const handleClick = () => {
    if (window.gtag) {
      window.gtag("event", "click", {
        event_category: "Button",
        event_label: "Call Button",
        value: phoneNumber,
      });
    }
    window.location.href = `tel:${phoneNumber}`;
  };

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(() => setShouldRender(false), 1500); // Match the duration of the fade-out animation
  };

  if (!shouldRender) {
    return null;
  }

  const bgColor = theme === "light" ? "white" : "#343";
  const borderColor = theme === "light" ? "black" : "#fef";
  const textColor = theme === "light" ? "black" : "#fff";

  return (
    <div className={styles.ctaContainer}>

      <div
        className={`${styles.chatBubbleContainer} ${
          isVisible ? "animate__animated animate__zoomInRight" : "animate__animated animate__zoomOutRight"
        }`}
        style={
          {
            "--cta-bg-color": bgColor,
            "--cta-border-color": borderColor,
            "--cta-text-color": textColor,
          } as React.CSSProperties
        }
      >
        <div className={styles.chatWrapper}>
          <div className="chat chat-start">
          </div>
          <div className="chat chat-end">
            <div className="avatar chat-image">
              <div className="w-10 rounded-full">
                <img
                  alt="Tailwind CSS chat bubble component"
                  src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
                />
              </div>
            </div>
            <div className="chat-bubble animate__animated animate__fadeInUp">
              <div className="chat-content">
                <p className="text-sm">Hi! How can we help you today?</p>
              </div>
            </div>
          </div>
        </div>
      </div>


      <div
        className={`${styles.messageIconContainer} ${
          isVisible ? "animate__animated animate__zoomInRight" : "animate__animated animate__zoomOutRight"
        }`}
        style={
          {
            "--cta-bg-color": bgColor,
            "--cta-border-color": borderColor,
            "--cta-text-color": textColor,
          } as React.CSSProperties
        }
      >
        <button className={styles.iconButton} onClick={handleClick} aria-label={`Call: ${ctaMessage}`}>
          <Image src="/images/message_icon.png" alt="Message Icon" width={48} height={48} />
        </button>
        <button className={styles.closeButton} onClick={handleClose} aria-label="Close Call Button">
        &times;
      </button>
      </div>
    </div>
  );
};

export default CallToAction;
