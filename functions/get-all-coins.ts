import { load } from "https://deno.land/std@0.223.0/dotenv/mod.ts";

import { Coin } from "../models/coin.ts";
import { headers } from "./headers.ts";
const env = await load();

export async function getAllCoins(): Promise<Coin[]> {
  const data = JSON.stringify({
    collection: "coins",
    database: "general",
    dataSource: "Cluster0",
    projection: {
      _id: 0,
    },
  });

  const url = env["MONGODB_URL"] + "find";

  try {
    const response = await fetch(url, {
      method: "POST",
      body: data,
      headers: headers,
    });

    const coins: Coin[] = (await response.json()).documents;
    return coins;
  } catch (e) {
    console.log(e);
  }

  return [];
}
