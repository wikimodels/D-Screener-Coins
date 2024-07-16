import { load } from "https://deno.land/std@0.223.0/dotenv/mod.ts";

const env = await load();
export const wsKv = await Deno.openKv(env["KV-WS-NAMESPACE"]);
