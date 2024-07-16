import { TF } from "../models/timeframes.ts";
import { TF_Duration } from "./../models/tf-duration.ts";
export function setCloseTime(openTime: number, timeframe: TF) {
  switch (timeframe) {
    case TF.m1:
      return openTime + TF_Duration.m1;
    case TF.m5:
      return openTime + TF_Duration.m5;
    case TF.m15:
      return openTime + TF_Duration.m15;
    case TF.m30:
      return openTime + TF_Duration.m30;
    case TF.h1:
      return openTime + TF_Duration.h1;
    case TF.h2:
      return openTime + TF_Duration.h2;
    case TF.h4:
      return openTime + TF_Duration.h4;
    default:
      return 0;
  }
}
