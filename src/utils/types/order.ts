type OrderType = "market" | "limit" | "stop" | "stop_limit" | "trailing_stop";

export type IOrder = {
  id: string;
  client_order_id: string;
  created_at: string;
  updated_at?: string | null;
  submitted_at?: string | null;
  filled_at?: string | null;
  expired_at?: string | null;
  canceled_at?: string | null;
  failed_at?: string | null;
  replaced_at?: string | null;
  replaced_by?: string | null;
  replaces?: string | null;
  asset_id: string;
  symbol: string;
  asset_class: string; // maybe change to us_equity or other types
  notional: string | null;
  qty: string | null;
  filled_qty: string;
  filled_avg_price?: null | string;
  order_class: "simple" | "bracket" | "oco" | "oto";
  // order_type?: OrderType; // deprecated in favor of 'type' (below);
  type: OrderType;
  side: "buy" | "sell";
  time_in_force: string;
  limit_price: null | string;
  stop_price: null | string;
  status: string;
  extended_hours: boolean;
  legs?: any[];
  // all three below ONLY apply to trailing stop orders
  // scroll to bottom at https://alpaca.markets/docs/api-references/trading-api/orders/ for details
  trail_percent?: null | string;
  trail_price?: null | string;
  hwm?: null | string;
};
