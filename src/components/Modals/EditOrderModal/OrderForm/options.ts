export const TIME_IN_FORCE = [
  {
    label: "Day",
    value: "day",
  },
  {
    label: "Good Til Cancelled",
    value: "gtc",
  },
  {
    label: "Immediate or Cancel",
    value: "ioc",
  },
  {
    label: "Fill or Kill",
    value: "fok",
  },
];

export const ORDER_TYPES = [
  {
    label: "Market",
    value: "market",
  },
  {
    label: "Limit",
    value: "limit",
  },
  {
    label: "Stop",
    value: "stop",
  },
  {
    label: "Stop Limit",
    value: "stop_limit",
  },
];

const DEFAULT_ORDER = {
  // quantity: "0",
  quantity: 0,
};

export const DEFAULT_MARKET = DEFAULT_ORDER;

export const DEFAULT_LIMIT = {
  // limitPrice: "0",
  limitPrice: 0,
  ...DEFAULT_ORDER,
};

export const DEFAULT_STOP = {
  // stopPrice: "0",
  stopPrice: 0,
  ...DEFAULT_ORDER,
};

export const DEFAULT_STOP_LIMIT = {
  // limitPrice: "0",
  limitPrice: 0,
  // stopPrice: "0",
  stopPrice: 0,
  ...DEFAULT_ORDER,
};

export const DEFAULT_VALUES = {
  market: DEFAULT_MARKET,
  limit: DEFAULT_LIMIT,
  stop: DEFAULT_STOP,
  stop_limit: DEFAULT_STOP_LIMIT,
};

export const LABEL_MAP: { [key: string]: string } = {
  stopPrice: "Stop Price",
  limitPrice: "Limit Price",
  quantity: "Quantity",
};

export type OrderFormData = {
  quantity: number;
  limitPrice?: number;
  stopPrice?: number;
  // quantity: string;
  // limitPrice?: string;
  // stopPrice?: string;
};
