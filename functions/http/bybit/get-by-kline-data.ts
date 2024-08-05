import { load } from "https://deno.land/std@0.223.0/dotenv/mod.ts";
import { byClient } from "../../../clients/by-order-clients.ts";

import { KlineRepo } from "../../../models/candles/kline-repo.ts";
import { KlineObj } from "../../../models/candles/kline.ts";
import { Exchange } from "../../../models/exchange.model.ts";
import { TF } from "../../../models/timeframes.ts";
import { sendTgGeneralErrorMessage } from "../../tg/send-tg-general-error-msg.ts";
import { mapByKlineDataToObj } from "./map-by-kline-data-to-obj.ts";
import { setByKlineTimeframe } from "./../../../utils/tf/set-by-kline-timeframe.ts";
import { Coin } from "../../../models/coin.ts";

const env = await load();

export async function getByKlineData(
  coins: Coin[],
  timeframe: TF,
  limit: number
) {
  try {
    const tf = setByKlineTimeframe(timeframe);
    const promises = coins.map(async (c) => {
      const call = await byClient.getKline({
        symbol: c.symbol,
        limit: limit,
        interval: tf,
        category: "linear",
      });
      return call;
    });

    const results = await Promise.all(promises);
    const goodResults = results.filter((r) => r.retMsg == "OK");

    const badResults = results.filter((r) => r.retMsg != "OK");

    if (badResults.length > 0) {
      await sendTgGeneralErrorMessage(
        "D-Screener-Coins:getByKlineData(): BAD RESULTS " +
          JSON.stringify(badResults)
      );
    }

    const data = goodResults.map((r) => {
      return {
        symbol: r.result.symbol,
        tf: timeframe,
        exchange: Exchange.By,
        data: r.result.list.map((i) => {
          return mapByKlineDataToObj(
            i,
            r.result.symbol,
            Exchange.By,
            timeframe
          ) as KlineObj;
        }),
      } as KlineRepo;
    });
    return data;
  } catch (e) {
    console.log(e);
    await sendTgGeneralErrorMessage(
      `${env["PROJECT_NAME"]}:getByKlineData() Error: ${e.message}`
    );
  }
}
