"use client"
import React from "react"
import { useEffect, useRef, useState } from "react"

const CardPage: React.FC = () => {
  const cardRef = useRef<HTMLDivElement>(null)

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (cardRef.current) {
      const card = cardRef.current
      const rect = card.getBoundingClientRect()
      const x = event.clientX - rect.left // x position within the element.
      const y = event.clientY - rect.top // y position within the element.

      const centerX = rect.width / 2
      const centerY = rect.height / 2

      const rotateX = ((y - centerY) / centerY) * 30 // 15 is the max rotation in degrees
      const rotateY = ((x - centerX) / centerX) * -30 // 15 is the max rotation in degrees

      card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(20px)`
    }
  }

  const handleMouseLeave = () => {
    if (cardRef.current) {
      const card = cardRef.current
      card.style.transform = "rotateX(0) rotateY(0) translateZ(0)"
    }
  }

  return (
    <>
      <div className="container mx-auto flex h-screen w-screen items-center justify-center bg-gray-100 p-4">
        <div
          className="card aspect-[1/1.75] w-full max-w-xs bg-white p-2 shadow-xl transition-transform duration-300 md:w-3/5"
          ref={cardRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        >
          <div className="card-title text-center text-xl font-bold">Card Title</div>
          <div className="card-body flex h-full items-center justify-center">
            <p>Card content</p>
          </div>
        </div>
      </div>
      <style jsx>{`
        .card {
          transition:
            transform 0.3s ease,
            box-shadow 0.3s ease;
          transform-style: preserve-3d;
          perspective: 1000px;
        }

        .hover-effect {
          box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
        }
      `}</style>
    </>
  )
}

export default CardPage
