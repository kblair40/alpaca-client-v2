import React from "react";
import { Flex, Stack, Select, FormControl, FormLabel } from "@chakra-ui/react";

type Props = {};

type Option = {
  label: string;
  value: string;
};
type FilterData = { options: Option[]; defaultValue: string };

const buySell: FilterData = {
  defaultValue: "both",
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

const OrderFilters = (props: Props) => {
  return (
    <Flex justifyContent="flex-start" align="center" w="100%">
      <Filter data={buySell} />
      {/* <FormControl w="max-content">
        <FormLabel fontSize="sm">Buy/Sell</FormLabel>
        <Select w="120px" size="sm" defaultValue="both">
          {buySell.options.map((option, i) => (
            <option key={i} value={option.value}>
              {option.label}
            </option>
          ))}
        </Select>
      </FormControl> */}

      {/* <FormControl border="1px solid green" w="max-content">
        <FormLabel whiteSpace="nowrap" fontSize="sm">
          Date From
        </FormLabel>
        <Select size="sm" defaultValue="both">
          {buySell.options.map((option, i) => (
            <option key={i} value={option.value}>
              {option.label}
            </option>
          ))}
        </Select>
      </FormControl> */}

      {/* <FormControl>
        <FormLabel fontSize="sm">Date To</FormLabel>
        <Select size="sm" defaultValue="both">
          {buySell.options.map((option, i) => (
            <option key={i} value={option.value}>
              {option.label}
            </option>
          ))}
        </Select>
      </FormControl> */}
    </Flex>
  );
};

export default OrderFilters;

// type FilterProps = { data: FilterData };
const Filter = ({ data }: { data: FilterData }) => {
  return (
    <FormControl>
      <FormLabel fontSize="sm">Date To</FormLabel>
      <Select size="sm" defaultValue="both">
        {buySell.options.map((option, i) => (
          <option key={i} value={option.value}>
            {option.label}
          </option>
        ))}
      </Select>
    </FormControl>
  );
};
