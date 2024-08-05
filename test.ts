import { Coin } from "./models/coin.ts";
import { TF } from "./models/timeframes.ts";

const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const tf = 5;
const arr_0 = arr.slice(arr.length - tf, arr.length);
const arr_1 = arr.slice(arr.length - tf * 2, arr.length - tf);
//const openTime = arr_0[0].openTime;
//const closeTime = arr_0[arr_0.length -1].closeTime;
console.log("arr 0", arr_0);
console.log("arr 1", arr_1);

export interface RollingPaItem {
  coin: Coin;
  tf: TF;
  openTime: number;
  closeTime: number;
  bullishEng: boolean;
  bearishEng: boolean;
  hammer: boolean;
  pinbar: boolean;
  doji: boolean;
}

export interface Shit {
  title: "BullishEng-4h";
  data: [];
}
