// deno-lint-ignore-file no-explicit-any

import { KlineObj } from "../../../models/candles/kline.ts";
import { normalizePrice } from "../../../utils/normalize-price.ts";

export function mapBiKlineDataToObj(data: any[], symbol: string): KlineObj {
  const obj: KlineObj = {
    symbol: symbol,
    openTime: Number(data[0]),
    closeTime: Number(data[6]),
    open: Number(data[1]),
    high: Number(data[2]),
    low: Number(data[3]),
    close: Number(data[4]),
    baseVolume: Number(data[5]),
    quoteVolume: Number(data[7]),
    hlc3: normalizePrice(
      Number(data[1]),
      (Number(data[2]) + Number(data[3]) + Number(data[4])) / 3
    ),
  };
  return obj;
}
