import { TF } from "./../timeframes.ts";

import { Exchange } from "./exchange.model.ts";
import { KlineObj } from "./kline.ts";

export interface KlineRepo {
  symbol: string;
  tf: TF;
  category: string;
  exchange?: Exchange;
  timestamp: number;
  data: KlineObj[];
}
