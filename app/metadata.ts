// metadata.ts
import { Metadata } from "next"
import { COMPANY_LOGO_URL, COMPANY_NAME, CONTACT_BUTTON_TEXT, NAV_LINKS } from "../Data/constants"

export const metadata: Metadata = {
  title: COMPANY_NAME,
  twitter: {
    card: "summary_large_image",
  },
  openGraph: {
    url: "https://deck206.com",
    images: [
      {
        width: 1200,
        height: 630,
        url: "https://raw.githubusercontent.com/Blazity/next-enterprise/main/.github/assets/project-logo.png",
      },
    ],
  },
}
