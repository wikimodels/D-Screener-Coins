// deno-lint-ignore-file no-explicit-any
import { biFutClient } from "../../../clients/bi-order-clients.ts";
import { KlineRepo } from "../../../models/candles/kline-repo.ts";
import { KlineObj } from "../../../models/candles/kline.ts";
import { Coin } from "../../../models/coin.ts";
import { Exchange } from "../../../models/exchange.model.ts";
import { TF } from "../../../models/timeframes.ts";
import { sendTgGeneralErrorMessage } from "../../tg/send-tg-general-error-msg.ts";
import { mapBiKlineDataToObj } from "./map-kline-http-data-to-obj%20copy.ts";

export async function getBiKlineData(
  coins: Coin[],
  timeframe: TF,
  limit: number
) {
  try {
    const promises = coins.map((c) => {
      const call = biFutClient.getKlines({
        symbol: c.symbol,
        limit: limit,
        interval: timeframe,
      });
      return new Promise((resolve) => {
        call.then((data: any) => {
          resolve({ data: data, symbol: c.symbol });
        });
      });
    });

    const results = await Promise.all(promises);

    const data = results.map((d: any) => {
      return {
        symbol: d.symbol,
        tf: timeframe,
        exchange: Exchange.Bi,
        data: d.data.map((item: any) => {
          return mapBiKlineDataToObj(item, d.symbol) as KlineObj;
        }),
      } as KlineRepo;
    });
    return data;
  } catch (e) {
    console.log(e);
    await sendTgGeneralErrorMessage("getBiKlineData(): " + e.message);
  }
}
