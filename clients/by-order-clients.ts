import Bybit from "npm:bybit-api";
import { load } from "https://deno.land/std@0.223.0/dotenv/mod.ts";

const env = await load();
export const byClient = new Bybit.RestClientV5({
  key: env["BYBIT_API_KEY"],
  secret: env["BYBIT_SECRET_KEY"],
});
