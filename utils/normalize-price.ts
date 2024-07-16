export function normalizePrice(normalPrice: number, abnormalPrice: number) {
  let digitsAfterComa = 0;
  if (normalPrice.toString().includes(".")) {
    digitsAfterComa = normalPrice.toString().split(".")[1].length;
  } else {
    digitsAfterComa = 1;
  }
  return Number(abnormalPrice.toFixed(digitsAfterComa));
}
