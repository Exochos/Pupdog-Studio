/**
 * NavBar Constants
 */
export const COMPANY_NAME = "Deck206"
export const COMPANY_LOGO_URL = "/images/logo.webp"

/**
 * NavBar Links
 */
export const NAV_LINKS = [
  { name: "Home", url: "/" },
  { name: "About Us", 
    url: "/about",
    subLinks: [
      { name: "About Us", url: "/about#about" },
      { name: "Services", url: "/about#services" },
      { name: "Testimonials", url: "/about#testimonials" },
      { name: "Contact Us", url: "/about#contact" },
    ]
  

  },
  { 
    name: "Projects", 
    url: "/projects",
    subLinks: [
      { name: "Project 1", url: "/projects/project1" },
      { name: "Project 2", url: "/projects/project2" },
      { name: "Project 3", url: "/projects/project3" },
    ] 
  },
/**   { name: "Blog", url: "/blog" },*/
]

/**
 * Contact Button Text
 */
export const CONTACT_BUTTON_TEXT = "Free Estimate"
