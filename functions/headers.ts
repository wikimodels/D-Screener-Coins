import { load } from "https://deno.land/std@0.223.0/dotenv/mod.ts";

const env = await load();

export const headers = {
  "Content-Type": "application/json",
  "Access-Control-Request-Headers": "*",
  "api-key": env["MONGODB_KEY"],
};
