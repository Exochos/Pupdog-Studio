"use client"
import { cva, type VariantProps } from "class-variance-authority"
import Image from "next/image"
import Link from "next/link"
import React, { useEffect, useRef, useState } from "react"
import { twMerge } from "tailwind-merge"
import styles from "./NavBar.module.css"
import { COMPANY_LOGO_URL, COMPANY_NAME, CONTACT_BUTTON_TEXT, NAV_LINKS } from "../../Data/constants"

const useNavBarStyles = cva(["flex", "items-left", "bg-transparent", "text-black", "w-full"], {
  variants: {},
  defaultVariants: {},
})

export interface NavBarProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof useNavBarStyles> {
  contactName?: string
}

export const NavBar: React.FC<NavBarProps> = ({ className, children, contactName = CONTACT_BUTTON_TEXT, ...props }) => {
  const [menuOpen, setMenuOpen] = useState(false)
  const menuRef = useRef(null)
  const navBarClasses = useNavBarStyles({ className })

  const handleClickOutside = (event: MouseEvent) => {
    if (menuRef.current && !(menuRef.current as HTMLElement).contains(event.target as Node)) {
      setMenuOpen(false)
    }
  }

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === "Escape") {
      setMenuOpen(false)
    }
  }

  useEffect(() => {
    if (menuOpen) {
      document.addEventListener("mousedown", handleClickOutside)
      document.addEventListener("keydown", handleKeyDown)
    } else {
      document.removeEventListener("mousedown", handleClickOutside)
      document.removeEventListener("keydown", handleKeyDown)
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
      document.removeEventListener("keydown", handleKeyDown)
    }
  }, [menuOpen])

  return (
    <div className={twMerge(navBarClasses, className)} {...props}>
      <header className="w-full">
        <nav className="sticky inset-x-0 border-2 border-emerald-700 bg-white shadow-lg dark:border-emerald-800">
          <div className="navigation relative mx-auto flex max-w-[94vw] flex-wrap items-center justify-between py-2">
            <a className="logo flex items-center space-x-4 pl-2" href="/">
              <Image priority src={COMPANY_LOGO_URL} alt={COMPANY_NAME} width={140} height={100} />
              <h3 className="hidden text-xl font-bold md:block">{children}</h3>
            </a>
            <div className="hidden items-center space-x-8 md:flex">
              {NAV_LINKS.map((link, index) =>
                link.subLinks ? (
                  <div key={index} className={styles.dropdown}>
                    <Link href={link.url} className="text-xl font-semibold text-gray-800 hover:underline">
                      {link.name}
                    </Link>
                    <div className={styles["dropdown-content"]}>
                      {link.subLinks.map((sublink, subindex) => (
                        <Link
                          key={subindex}
                          href={sublink.url}
                          className="text-lg font-bold text-black hover:underline"
                        >
                          {sublink.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                ) : (
                  <Link key={index} href={link.url} className="text-xl font-semibold text-gray-800 hover:underline">
                    {link.name}
                  </Link>
                )
              )}
              <Link
                href="/contact"
                className="rounded-sm bg-teal-700 px-4 py-2 text-xl text-white shadow-lg transition duration-200 ease-in-out hover:bg-white hover:text-teal-700 hover:shadow-xl active:bg-white active:text-blue-200"
              >
                {contactName}
              </Link>
            </div>
            <button className="pr-8 text-gray-900 focus:outline-none md:hidden" onClick={() => setMenuOpen(!menuOpen)}>
              <svg
                className="h-8 w-8 dark:bg-gray-800"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                style={{ zIndex: 1000 }}
              >
                {menuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>

          <div ref={menuRef} className={`md:hidden ${menuOpen ? styles.menuOpen : styles.menuClose} ${styles.menu}`}>
            <ul className="flex flex-col items-center space-y-4 py-4">
              {NAV_LINKS.map((link, index) =>
                link.subLinks ? (
                  <div key={index} className={styles.dropdown}>
                    <Link href={link.url} className="text-lg font-bold text-black hover:underline">
                      {link.name}
                    </Link>
                    <div className={styles["dropdown-content"]}>
                      {link.subLinks.map((sublink, subindex) => (
                        <Link
                          key={subindex}
                          href={sublink.url}
                          className="text-lg font-bold text-black hover:underline"
                        >
                          {sublink.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                ) : (
                  <li key={index}>
                    <Link href={link.url} className="text-lg font-bold text-black hover:underline">
                      {link.name}
                    </Link>
                  </li>
                )
              )}
              <Link
                href="/contact"
                className="rounded-sm border-2 border-teal-700 bg-teal-700 px-4 py-2 text-white shadow-lg transition duration-200 ease-in-out hover:bg-white hover:text-teal-700 hover:shadow-xl active:bg-white active:text-teal-700"
              >
                {contactName}
              </Link>
            </ul>
          </div>
        </nav>
      </header>
    </div>
  )
}

export default NavBar
