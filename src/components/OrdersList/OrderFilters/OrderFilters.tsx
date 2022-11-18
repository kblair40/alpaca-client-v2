import { useState, useEffect } from "react";
import { Flex, Stack, Select, FormControl, FormLabel } from "@chakra-ui/react";

import { timeframes, buySell, type FilterData } from "./options";
import useDispatch from "hooks/useDispatch";
import { fetchOrdersByTimeframe } from "store/orderSlice";

type Props = {};

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
