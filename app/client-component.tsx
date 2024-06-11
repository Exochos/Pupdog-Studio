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
    let touchStartY = 0;
    let touchEndY = 0;

    const handleTouchStart = (touchEvent: TouchEvent) => {
      if (touchEvent.touches && touchEvent.touches[0]) {
        touchStartY = touchEvent.touches[0].clientY;
      }
    };

    const handleTouchEnd = (touchEvent: TouchEvent) => {
      if (touchEvent.changedTouches && touchEvent.changedTouches[0]) {
        touchEndY = touchEvent.changedTouches[0].clientY;
        handleScroll();
      }
    };

    const handleTouchMove = (touchEvent: TouchEvent) => {
      if (touchEvent.touches && touchEvent.touches[0]) {
        touchEndY = touchEvent.touches[0].clientY;
      }
    };

    const handleScroll = () => {
      if (touchStartY > touchEndY) {
        console.log('scroll down');
      } else {
        console.log('scroll up');
      }
    };

    document.addEventListener('touchstart', handleTouchStart, false);
    document.addEventListener('touchend', handleTouchEnd, false);
    document.addEventListener('touchmove', handleTouchMove, false);

    return () => {
      document.removeEventListener('touchstart', handleTouchStart, false);
      document.removeEventListener('touchend', handleTouchEnd, false);
      document.removeEventListener('touchmove', handleTouchMove, false);
    };
  }, []);

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
