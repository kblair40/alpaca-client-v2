type Option = {
  label: string;
  value: string;
};
export type FilterData = {
  options: Option[];
  defaultValue: string;
  label: string;
};

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
      value: "Sell",
    },
    {
      label: "Both",
      value: "both",
    },
  ],
};

export const timeframes: FilterData = {
  defaultValue: "past_year",
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
      value: "ytd",
    },
  ],
};
