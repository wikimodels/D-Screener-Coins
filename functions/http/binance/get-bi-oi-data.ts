// deno-lint-ignore-file no-explicit-any
import { Coin } from "../../../models/shared/coin.ts";
import { OpenInterestRepo } from "../../../models/shared/oi/open-interest-repo.ts";

import { TF } from "../../../models/shared/timeframes.ts";
import { biFutClient } from "../../../clients/bi-order-clients.ts";
import { setBiOiTimeframe } from "../../shared/tf/set-bi-oi-timeframe.ts";
import { OpenInterestRecord } from "../../../models/shared/oi/open-interest-record.ts";
import { sendTgGeneralErrorMessage } from "../../tg/send-tg-general-error-msg.ts";

export async function getBiOiData(coins: Coin[], timeframe: TF, limit: number) {
  try {
    const tf = setBiOiTimeframe(timeframe);
    const promises = coins.map((c) => {
      const call = biFutClient.getOpenInterestStatistics({
        symbol: c.symbol,
        limit: limit,
        period: tf,
      });
      return new Promise((resolve) => {
        call.then((data) => {
          resolve({ data: data, symbol: c.symbol });
        });
      });
    });

    const result = await Promise.all(promises);

    const objs: OpenInterestRepo[] = result.map((r: any) => {
      return {
        symbol: r.symbol,
        tf: timeframe,
        timestampe: new Date().getTime(),
        data: r.data.map((_r: any) => {
          return {
            oiValue: Number(_r.sumOpenInterestValue),
            timestamp: _r.timestamp,
          } as OpenInterestRecord;
        }),
      } as OpenInterestRepo;
    });

    return objs;
  } catch (e) {
    console.log(e);
    await sendTgGeneralErrorMessage("getBiOiData(): " + e.message);
  }
}
