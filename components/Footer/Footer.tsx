/* 
* Footer component
*  */
import React from 'react'
import { FOOTER_LINKS } from '../../Data/constants'


export const Footer: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <footer className="footer bg-gray-800 text-white">
      <div className="container mx-auto py-8 px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="col-span-1">
            <h3 className="text-2xl font-bold">{children}</h3>
          </div>
          <div className="col-span-1">
            <h3 className="text-xl font-bold">Links</h3>
            <ul className="mt-4">
              {FOOTER_LINKS.map((link) => (
                <li key={link.name} className="mb-2">
                  <a href={link.url} className="text-gray-300 hover:text-white">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </footer>
  )
}