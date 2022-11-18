import React from "react";
import { Flex, Stack, Select, FormControl, FormLabel } from "@chakra-ui/react";

type Props = {};

type Option = {
  label: string;
  value: string;
};
type FilterData = { options: Option[]; defaultValue: string; label: string };

const buySell: FilterData = {
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

const timeframes: FilterData = {
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

const OrderFilters = (props: Props) => {
  return (
    <Stack
      spacing={{ base: ".5rem", md: "1rem", lg: "1.5rem" }}
      direction="row"
      justifyContent="flex-start"
      align="center"
      w="100%"
      mt=".5rem"
    >
      <Filter data={buySell} />
      <Filter data={timeframes} />
    </Stack>
  );
};

export default OrderFilters;

// type FilterProps = { data: FilterData };
const Filter = ({ data }: { data: FilterData }) => {
  return (
    <FormControl w="max-content">
      <FormLabel whiteSpace="nowrap" fontSize="sm">
        {data.label}
      </FormLabel>
      <Select size="sm" defaultValue="both" rounded="md" cursor="pointer">
        {data.options.map((option, i) => (
          <option key={i} value={option.value}>
            {option.label}
          </option>
        ))}
      </Select>
    </FormControl>
  );
};
