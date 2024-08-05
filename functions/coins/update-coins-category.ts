import { load } from "https://deno.land/std@0.223.0/dotenv/mod.ts";
import { _ } from "https://cdn.skypack.dev/lodash";

import { KlineRepo } from "../../models/candles/kline-repo.ts";
import { TF } from "../../models/timeframes.ts";
import { getBiKlineData } from "../http/binance/get-bi-kline-data.ts";
import { getByKlineData } from "../http/bybit/get-by-kline-data.ts";
import { getAllCoins } from "./get-all-coins.ts";
import { assignCategory } from "./assign-category.ts";
import { deleteAllCoins } from "./delete-all-coins.ts";
import { insertCoinsToDb } from "./insert-coins-to-db.ts";
import { Coin } from "../../models/coin.ts";
import { sendTgGeneralErrorMessage } from "../tg/send-tg-general-error-msg.ts";

const env = await load();

export async function updateCoinsCategory() {
  const coins = await getAllCoins();
  const biCoins: Coin[] = coins.filter(
    (c) => c.exchange == "biby" || c.exchange == "bi"
  );
  const byCoins: Coin[] = coins.filter((c) => c.exchange == "by");

  try {
    const byRepo: KlineRepo[] = (await getByKlineData(byCoins, TF.D, 2)) || [];
    const biRepo: KlineRepo[] = (await getBiKlineData(biCoins, TF.D, 2)) || [];

    byRepo.forEach((r) => {
      coins.forEach((c) => {
        if (r.symbol == c.symbol) {
          c.turnover24h == r.data[0].quoteVolume;
        }
      });
    });

    biRepo.forEach((r) => {
      coins.forEach((c) => {
        if (r.symbol == c.symbol) {
          c.turnover24h == r.data[0].quoteVolume;
          c.category = assignCategory(r.data[0].quoteVolume);
        }
      });
    });

    await deleteAllCoins();
    await insertCoinsToDb(coins);
  } catch (e) {
    console.log(e);
    await sendTgGeneralErrorMessage(
      `${env["PROJECT_NAME"]}:getBiKlineData() Error: ${e.message}`
    );
  }
}
