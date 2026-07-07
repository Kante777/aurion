import { MarketEvent } from "../contracts/marketEvent";
import { Evidence } from "../contracts/evidence";

export interface MarketPlugin {
  name: string;

  analyze(event: MarketEvent): Evidence[];
}
