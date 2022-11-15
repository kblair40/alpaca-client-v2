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

export const MARKET_TYPES = [
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
  quantity: 0,
  timeInForce: "day",
};

export const DEFAULT_MARKET = {
  orderType: "market",
  ...DEFAULT_ORDER,
};

export const DEFAULT_LIMIT = {
  orderType: "limit",
  limitPrice: 0,
  ...DEFAULT_ORDER,
};

export const DEFAULT_STOP = {
  orderType: "stop",
  stopPrice: 0,
  ...DEFAULT_ORDER,
};

export const DEFAULT_STOP_LIMIT = {
  orderType: "stop_limit",
  limitPrice: 0,
  stopPrice: 0,
  ...DEFAULT_ORDER,
};
