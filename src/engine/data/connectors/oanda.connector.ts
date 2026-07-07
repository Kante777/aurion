import axios from "axios";
import { ENV } from "../../../config/env";

export class OandaConnector {
  private baseUrl: string;

  constructor() {
    this.baseUrl =
      ENV.OANDA_ENV === "practice"
        ? "https://api-fxpractice.oanda.com"
        : "https://api-fxtrade.oanda.com";
  }

  async getCandles(instrument: string, granularity: string) {
    const url = `${this.baseUrl}/v3/instruments/${instrument}/candles`;

    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${ENV.OANDA_API_KEY}`,
      },
      params: {
        granularity,
        count: 100,
        price: "M",
      },
    });

    return response.data;
  }
}
