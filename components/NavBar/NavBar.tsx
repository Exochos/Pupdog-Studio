import { cva, type VariantProps } from "class-variance-authority"
import Image from "next/image"
import React from "react"
import { twMerge } from "tailwind-merge"
import { COMPANY_LOGO_URL, COMPANY_NAME } from "./constants"

const useNavBarStyles = cva(["flex", "justify-between", "items-center", "p-4", "bg-blue-400", "text-white"], {
  variants: {},
  defaultVariants: {},
})

export interface NavBarProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof useNavBarStyles> {}

export const NavBar: React.FC<NavBarProps> = ({ className, children, ...props }) => {
  const navBarClasses = useNavBarStyles({ className })
  return (
    <div className={twMerge(navBarClasses, className)} {...props}>
      <nav className="border-gray-200 bg-white">
        <div className="container mx-auto px-6 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <a className="text-xl font-bold text-blue-600" href="index.html">
                <Image src={COMPANY_LOGO_URL} alt={COMPANY_NAME} width={100} height={100} />
                {COMPANY_NAME}
              </a>
            </div>
            <div className="-mx-2 flex items-center">
              <a className="mx-2 text-gray-600" href="index.html">
                Home
              </a>
              <a className="mx-2 text-gray-600" href="about.html">
                About
              </a>
              <a className="mx-2 text-gray-600" href="services.html">
                Services
              </a>
              <a className="mx-2 text-gray-600" href="contact.html">
                Contact
              </a>
            </div>
          </div>
        </div>
      </nav>

      {children}
    </div>
  )
}
