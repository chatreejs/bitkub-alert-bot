import axios from 'axios';
import { Ticker } from '../core/model/ticker';
import { environment } from '../environment/environment';

export class BitkubApi {
  constructor() {}

  public async loadTickerData(symbol: string): Promise<Ticker> {
    return await axios
      .get(`${environment.bitkubApiUrl}/market/ticker?sym=${symbol}`)
      .then((response) => response.data[symbol]);
  }
}
