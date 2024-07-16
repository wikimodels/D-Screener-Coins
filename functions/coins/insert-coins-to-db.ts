import { load } from "https://deno.land/std@0.223.0/dotenv/mod.ts";
import { headers } from "./headers.ts";
import { Coin } from "../../models/coin.ts";
const env = await load();

export async function insertCoinsToDb(coins: Coin[]) {
  const data = JSON.stringify({
    collection: "coins",
    database: "general",
    dataSource: "Cluster0",
    documents: coins,
  });

  const url = env["MONGODB_URL"] + "insertMany";

  try {
    const response = await fetch(url, {
      method: "POST",
      body: data,
      headers: headers,
    });
    return response.json();
  } catch (e) {
    console.log(e);
  }
  return { event: "Smth is wrong" };
}
