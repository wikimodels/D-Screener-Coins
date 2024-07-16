export function assignCategory(turnover24h: number) {
  if (turnover24h > 200 * 1000 * 1000) {
    return "I";
  }
  if (turnover24h < 200 * 1000 * 1000 && turnover24h >= 100 * 1000 * 1000) {
    return "II";
  }
  if (turnover24h < 100 * 1000 * 1000 && turnover24h >= 50 * 1000 * 1000) {
    return "III";
  }
  if (turnover24h < 50 * 1000 * 1000 && turnover24h >= 10 * 1000 * 1000) {
    return "IV";
  }
  if (turnover24h < 10 * 1000 * 1000) {
    return "V";
  }
  return "";
}
