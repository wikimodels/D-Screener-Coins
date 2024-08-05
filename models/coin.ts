export interface Coin {
  symbol: string;
  turnover24h: number;
  exchange: string;
  category: string;
  logo: string;
  devAct: string;
  devActUrl: string;
  minQty: number;
  minNotional: number;
  tickSize: number;
  liqThSum1h?: number;
  liqThSum15m?: number;
  liqTh1h24h?: number;
  liqTh15m24h?: number;
  exchLink?: string;
  tvLink?: string;
  cgLink?: string;
}
