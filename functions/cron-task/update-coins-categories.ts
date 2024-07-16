import { updateCoinsCategory } from "../coins/update-coins-category.ts";

export function cronTaskUpdateCoinsCategories() {
  Deno.cron(
    "Update Coins Categories",
    { dayOfMonth: { every: 1 } },
    updateCoinsCategory
  );
}
