// deno-lint-ignore-file no-explicit-any
import { load } from "https://deno.land/std@0.223.0/dotenv/mod.ts";
import { Coin } from "../../coin/coin.ts";
import { loadCSV } from "../../utils/csv/load-csv.ts";

const env = await load();

export async function loadCoinsFromDisk() {
  try {
    const coins: any[] = await loadCSV(env["COINS"]);
    return coins as Coin[];
  } catch (e) {
    console.log(e);
  }
  return [];
}
