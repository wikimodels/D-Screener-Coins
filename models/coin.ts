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
  liqTh24h1h?: number;
  liqTh24h15m?: number;
  exchLink?: string;
  tvLink?: string;
  cgLink?: string;
}
