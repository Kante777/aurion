import axios from "axios";
import { ENV } from "../../../config/env";

export class FcsConnector {
  private baseUrl = "https://api.fcsapi.com";

  async getRates(symbol: string) {
    const response = await axios.get(`${this.baseUrl}/forex/latest`, {
      params: {
        symbol,
        access_key: ENV.FCS_API_KEY,
      },
    });

    return response.data;
  }
}
