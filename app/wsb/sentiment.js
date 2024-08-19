// wsb/sentiment.js
import afinn165 from "./afinn165.js"

export function getSentiment(word) {
  return afinn165[word.toLowerCase()] || 0
}