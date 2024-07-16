import { KlineObj } from "../../../models/candles/kline.ts";
import { Exchange } from "../../../models/exchange.model.ts";
import { TF } from "../../../models/timeframes.ts";
import { normalizePrice } from "../../../utils/normalize-price.ts";
import { setCloseTime } from "../../../utils/set-close-time.ts";

export function mapByKlineDataToObj(
  data: any[],
  symbol: string,
  exchange: Exchange,
  timeframe: TF
): KlineObj {
  const closeTime = setCloseTime(Number(data[0]), timeframe);
  const obj: KlineObj = {
    symbol: symbol,
    openTime: Number(data[0]),
    closeTime: closeTime,
    open: Number(data[1]),
    high: Number(data[2]),
    low: Number(data[3]),
    close: Number(data[4]),
    baseVolume: Number(data[5]),
    quoteVolume: Number(data[6]),
    hlc3: normalizePrice(
      Number(data[1]),
      (Number(data[2]) + Number(data[3]) + Number(data[4])) / 3
    ),
  };
  return obj;
}
