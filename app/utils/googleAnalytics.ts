import ReactGA from "react-ga4"

export const initializeGA = (gaId: string) => {
  ReactGA.initialize(gaId)
}

export const logPageView = () => {
  ReactGA.send({ hitType: "pageview", page: window.location.pathname })
}
