import React, { useState, useEffect } from "react";
import { Flex, Stack, Select, FormControl, FormLabel } from "@chakra-ui/react";

import { timeframes, buySell, type FilterData } from "./options";
import useDispatch from "hooks/useDispatch";
import { fetchOrdersByTimeframe } from "store/orderSlice";

type Props = {};

type BuySell = "buy" | "sell" | "both";
type Timeframe = "past_yr" | "past_2yrs" | "ytd" | "more_than_2";
type Field = "buySell" | "timeframe";

const OrderFilters = (props: Props) => {
  const [filterValues, setFilterValues] = useState({
    buySell: buySell.defaultValue,
    timeframe: timeframes.defaultValue,
  });
  // const [buySellValue, setBuySellValue] = useState(buySell.defaultValue);
  // const [timeframeValue, setTimeframeValue] = useState(timeframes.defaultValue);

  const handleChangeValue = (value: string, field: Field) => {
    console.log("CHANGE DATA:", { value, field });
    // console.log("NEW VALUE:", e.target.value);
  };

  return (
    <Stack
      spacing={{ base: ".5rem", md: "1rem", lg: "1.5rem" }}
      direction="row"
      justifyContent="flex-start"
      align="center"
      w="100%"
      mt=".5rem"
    >
      <Filter
        value={filterValues.buySell}
        field="buySell"
        onChange={handleChangeValue}
        data={buySell}
      />
      <Filter
        value={filterValues.timeframe}
        field="timeframe"
        onChange={handleChangeValue}
        data={timeframes}
      />
    </Stack>
  );
};

export default OrderFilters;

type FilterProps = {
  data: FilterData;
  value: string;
  field: Field;
  onChange: (value: string, field: Field) => void;
};

const Filter = ({ data, value, onChange, field }: FilterProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onChange(e.target.value, field);
  };

  return (
    <FormControl w="max-content">
      <FormLabel whiteSpace="nowrap" fontSize="sm">
        {data.label}
      </FormLabel>
      <Select
        value={value}
        onChange={handleChange}
        size="sm"
        defaultValue="both"
        rounded="md"
        cursor="pointer"
      >
        {data.options.map((option, i) => (
          <option key={i} value={option.value}>
            {option.label}
          </option>
        ))}
      </Select>
    </FormControl>
  );
};
