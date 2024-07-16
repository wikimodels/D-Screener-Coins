import { Coin } from "../../../models/shared/coin.ts";
import { TF } from "../../../models/shared/timeframes.ts";
import { OpenInterestRepo } from "../../../models/shared/oi/open-interest-repo.ts";
import { byClient } from "../../../clients/by-order-clients.ts";
import { setTimeframe } from "../../shared/tf/set-bi-oi-timeframe.ts";
import { OpenInterestIntervalV5 } from "npm:bybit-api";
import { OpenInterestRecord } from "../../../models/shared/oi/open-interest-record.ts";
import { sendTgGeneralErrorMessage } from "../../tg/send-tg-general-error-msg.ts";
import { setByOiTimeframe } from "../../shared/tf/set-by-oi-timeframe.ts";

export async function getByOiData(coins: Coin[], timeframe: TF, limit: number) {
  try {
    const tf = setByOiTimeframe(timeframe);

    const byPromises = coins.map(async (c) => {
      const call = await byClient.getOpenInterest({
        symbol: c.symbol,
        limit: limit,
        intervalTime: tf,
        category: "linear",
      });
      return call;
    });

    const results = await Promise.all(byPromises);

    const data: OpenInterestRepo[] = results.map((r) => {
      return {
        symbol: r.result.symbol,
        timestampe: new Date().getTime(),
        tf: timeframe,
        data: r.result.list.map((i) => {
          return {
            oiValue: Number(i.openInterest),
            timestamp: Number(i.timestamp),
          } as OpenInterestRecord;
        }),
      };
    });

    return data;
  } catch (e) {
    console.log(e);
    await sendTgGeneralErrorMessage("getBiOiData(): " + e.message);
  }
}
