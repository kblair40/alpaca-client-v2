type BuySell = "buy" | "sell" | "both";
type Timeframe = "past_yr" | "past_2yrs" | "ytd" | "more_than_2";

type Option = {
  // label: string;
  label: string;
  // value: string;
  value: BuySell | Timeframe;
};
export type FilterData = {
  options: Option[];
  defaultValue: BuySell | Timeframe;
  // defaultValue: string;
  label: string;
};

type FilterValues = {
  buySell: BuySell;
  timeFrame: Timeframe;
};
// type Field = "buySell" | "timeframe";

export const buySell: FilterData = {
  defaultValue: "both",
  label: "Buy/Sell",
  options: [
    {
      label: "Buy",
      value: "buy",
    },
    {
      label: "Sell",
      value: "sell",
    },
    {
      label: "Both",
      value: "both",
    },
  ],
};

export const timeframes: FilterData = {
  defaultValue: "past_yr",
  label: "Timeframe",
  options: [
    {
      label: "Past Yr",
      value: "past_yr",
    },
    {
      label: "Past 2 Yrs",
      value: "past_2yrs",
    },
    {
      label: "Yr to Date",
      value: "ytd",
    },
    {
      label: "More Than 2 Years Ago",
      value: "more_than_2",
    },
  ],
};
