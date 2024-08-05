import { load } from "https://deno.land/std@0.223.0/dotenv/mod.ts";
import writeToCSV from "../../utils/csv/write-to-csv.ts";
import { Coin } from "../../models/coin.ts";

const env = await load();

export async function writeCoinsToDisk(coins: Coin[]) {
  try {
    await writeToCSV(env["COINS"], coins);
  } catch (e) {
    console.log(e);
  }
}
