export interface Ticker {
  id: number;
  last: number;
  lowestAsk: number;
  highestBid: number;
  percentChange: number;
  baseVolume: number;
  quoteVolume: number;
  isFrozen: number;
  high24hr: number;
  low24hr: number;
  change: number;
  prevClose: number;
  prevOpen: number;
}
