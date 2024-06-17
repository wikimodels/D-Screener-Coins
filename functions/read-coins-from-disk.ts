import { loadCSV } from "../utils/csv/load-csv.ts";
import { load } from "https://deno.land/std@0.223.0/dotenv/mod.ts";

import { Coin } from "../models/coin.ts";
const env = await load();

export async function loadCoinsFromDisk() {
  try {
    const coins: Coin[] = await loadCSV(env["COINS"]);
    return coins;
  } catch (e) {
    console.log(e);
  }
  return [];
}
