// deno-lint-ignore-file no-unused-vars no-explicit-any
import express from "npm:express@4.18.2";
import { getAllCoins } from "./functions/coins/get-all-coins.ts";
import { writeCoinsToDisk } from "./functions/coins/write-coins-to-disk.ts";
import { loadCoinsFromDisk } from "./functions/coins/read-coins-from-disk.ts";
import { insertCoinsToDb } from "./functions/coins/insert-coins-to-db.ts";
import { addLinks } from "./functions/coins/add-links.ts";
import { Coin } from "./models/coin.ts";

const app = express();

app.get("/get-all-coins", async (req: any, res: any) => {
  try {
    const coins = await getAllCoins();
    coins.forEach((c) => {
      c = addLinks(c);
    });

    res.send(coins);
  } catch (e) {
    console.log(e);
  }
});

app.get("/get-and-save-all-coins", async (req: any, res: any) => {
  try {
    const coins = await getAllCoins();
    await writeCoinsToDisk(coins);
    res.send(coins);
  } catch (e) {
    console.log(e);
  }
});

app.listen(8000, () => {
  console.log("%cServer ---> running...", "color:green");
});
