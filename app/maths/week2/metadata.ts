// metadata.ts
import { Metadata } from "next"

export const metadata: Metadata = {
  title: COMPANY_NAME,
  twitter: {
    card: "summary_large_image",
  },
  openGraph: {
    url: "https://project-name.com",
    images: [
      {
        width: 1200,
        height: 630,
        url: "https://raw.githubusercontent.com/Blazity/next-enterprise/main/.github/assets/project-logo.png",
      },
    ],
  },
}
