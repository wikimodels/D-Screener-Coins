// deno-lint-ignore-file no-unused-vars no-explicit-any
import express from "npm:express@4.18.2";
import { getAllCoins } from "./functions/get-all-coins.ts";
import { writeCoinsToDisk } from "./functions/write-coins-to-disk.ts";
import { loadCoinsFromDisk } from "./functions/read-coins-from-disk.ts";
import { insertCoinsToDb } from "./functions/insert-coins-to-db.ts";
import { addLinks } from "./functions/add-links.ts";

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

app.get("/update-all-coins", async (req: any, res: any) => {
  try {
    const coins = await loadCoinsFromDisk();
    const response = await insertCoinsToDb(coins);
    const insertedItems = response.insertedIds.length;
    res.send({ insertedItems });
  } catch (e) {
    console.log(e);
  }
});

app.listen(8000, () => {
  console.log("%cServer ---> running...", "color:green");
});
