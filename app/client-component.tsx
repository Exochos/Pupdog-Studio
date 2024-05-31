// components/ClientComponent.tsx
"use client"

import { useEffect } from "react"
import CallToAction from "components/CallAction/CallToAction"
import NavBar from "components/NavBar/NavBar"
import styles from './Home.module.css' 

const sections = [
  { id: 'section1', content: 'Section 1' },
  { id: 'section2', content: 'Section 2' },
  { id: 'section3', content: 'Section 3' },
  { id: 'section4', content: 'Section 4' },
  { id: 'section5', content: 'Section 5' },
]

export default function ClientComponent() {
  useEffect(() => {
    let touchStartY = 0
    let touchEndY = 0

    const handleTouchStart = (e) => {
      touchStartY = e.changedTouches[0].screenY
    }

    const handleTouchEnd = (e) => {
      touchEndY = e.changedTouches[0].screenY
      handleGesture()
    }

    const handleGesture = () => {
      if (touchStartY - touchEndY > 50) {
        scrollToNext()
      }
      if (touchEndY - touchStartY > 50) {
        scrollToPrev()
      }
    }

    const scrollToNext = () => {
      const currentSection = document.elementFromPoint(window.innerWidth / 2, window.innerHeight / 2)
      if (currentSection && currentSection.nextElementSibling) {
        currentSection.nextElementSibling.scrollIntoView({ behavior: 'smooth' })
      }
    }

    const scrollToPrev = () => {
      const currentSection = document.elementFromPoint(window.innerWidth / 2, window.innerHeight / 2)
      if (currentSection && currentSection.previousElementSibling) {
        currentSection.previousElementSibling.scrollIntoView({ behavior: 'smooth' })
      }
    }

    window.addEventListener('touchstart', handleTouchStart)
    window.addEventListener('touchend', handleTouchEnd)

    return () => {
      window.removeEventListener('touchstart', handleTouchStart)
      window.removeEventListener('touchend', handleTouchEnd)
    }
  }, [])

  return (
    <>
      <NavBar />
      <div className={styles.container}>
        {sections.map(section => (
          <section key={section.id} className={styles.section} id={section.id}>
            <h1>{section.content}</h1>
            <p>Content for {section.content}...</p>
          </section>
        ))}
      </div>
      <CallToAction />
    </>
  )
}
