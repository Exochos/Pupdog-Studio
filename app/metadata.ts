// metadata.ts
import { Metadata } from "next"
import { COMPANY_LOGO_URL, COMPANY_NAME, CONTACT_BUTTON_TEXT, NAV_LINKS } from "../Data/constants"

export const metadata: Metadata = {
  title: COMPANY_NAME,
  twitter: {
    card: "summary_large_image",
  },
  openGraph: {
    url: "https://pupdog.studio",
    images: [
      {
        width: 630,
        height: 630,
        url: "/images/PupLogo.png",
      },
    ],
  },
}
