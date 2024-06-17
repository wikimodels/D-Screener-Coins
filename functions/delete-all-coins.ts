import { load } from "https://deno.land/std@0.223.0/dotenv/mod.ts";
import { headers } from "../functions/headers.ts";

const env = await load();

export async function deleteAllCoins() {
  const data = JSON.stringify({
    collection: "coins",
    database: "general",
    dataSource: "Cluster0",
    filter: {},
  });

  const url = env["MONGODB_URL"] + "deleteMany";

  const response = await fetch(url, {
    method: "POST",
    body: data,
    headers: headers,
  });
  const deletedCount = await response.json();
  return deletedCount;
}
