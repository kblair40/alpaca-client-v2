type BuySell = "buy" | "sell" | "both";
type Timeframe = "past_yr" | "past_2yrs" | "ytd" | "more_than_2";
type Status = "open" | "closed" | "all";

type Option = {
  // label: string;
  label: string;
  // value: string;
  value: BuySell | Timeframe | Status;
};
export type FilterData = {
  options: Option[];
  defaultValue: BuySell | Timeframe | Status;
  // defaultValue: string;
  label: string;
};

// type FilterValues = {
//   buySell: BuySell;
//   timeFrame: Timeframe;
// };
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
  defaultValue: "all",
  label: "Timeframe",
  options: [
    {
      label: "Past Year",
      value: "past_yr",
    },
    {
      label: "Past 2 Years",
      value: "past_2yrs",
    },
    {
      label: "Year to Date",
      value: "ytd",
    },
    {
      label: "All",
      value: "all",
    },
    // {
    //   label: "More Than 2 Years Ago",
    //   value: "more_than_2",
    // },
  ],
};

export const statuses: FilterData = {
  defaultValue: "all",
  label: "Status",
  options: [
    {
      label: "Open",
      value: "open",
    },
    {
      label: "Closed",
      value: "closed",
    },
    {
      label: "All",
      value: "all",
    },
  ],
};
