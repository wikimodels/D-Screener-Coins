import { KlineIntervalV3 } from "npm:bybit-api";
import { TF } from "../../models/timeframes.ts";

export function setByKlineTimeframe(timeframe: TF) {
  switch (timeframe) {
    case TF.m5:
      return "5" as KlineIntervalV3;
    case TF.m15:
      return "15" as KlineIntervalV3;
    case TF.m30:
      return "30" as KlineIntervalV3;
    case TF.h1:
      return "60" as KlineIntervalV3;
    case TF.h2:
      return "120" as KlineIntervalV3;
    case TF.h4:
      return "240" as KlineIntervalV3;
    case TF.D:
      return "D" as KlineIntervalV3;
    default:
      return "15m" as KlineIntervalV3;
  }
}
