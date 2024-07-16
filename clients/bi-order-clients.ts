import { load } from "https://deno.land/std@0.223.0/dotenv/mod.ts";
import Binance from "npm:binance";

const env = await load();
export const biFutClient = new Binance.USDMClient({
  api_key: env["BINANCE_API_KEY"],
  api_secret: env["BINANCE_SECRET_KEY"],
});

export const biSpotClient = new Binance.USDMClient({
  api_key: env["BINANCE_API_KEY"],
  api_secret: env["BINANCE_SECRET_KEY"],
});
