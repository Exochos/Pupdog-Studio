import ReactGA from "react-ga4"

export const initializeGA = (trackingId: string) => {
  ReactGA.initialize(trackingId)
}

export const logPageView = () => {
  ReactGA.send("pageview")
}

export const logEvent = (category: string, action: string, label?: string) => {
  ReactGA.event({
    category,
    action,
    label,
  })
}
