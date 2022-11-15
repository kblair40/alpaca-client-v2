import { useState } from "react";
import {
  FormControl,
  FormLabel,
  Input,
  Flex,
  Stack,
  Button,
  useColorModeValue,
  FormHelperText,
  FormErrorMessage,
  Box,
  Select,
} from "@chakra-ui/react";
import {
  DEFAULT_MARKET,
  DEFAULT_LIMIT,
  DEFAULT_STOP,
  DEFAULT_STOP_LIMIT,
  TIME_IN_FORCE,
  ORDER_TYPES,
  LABEL_MAP,
} from "./options";

const DEFAULT_VALUES = DEFAULT_MARKET;

const OrderForm = () => {
  const [formData, setFormData] = useState(DEFAULT_VALUES);

  const getLabel = (label: string) => {
    return {
      timeInForce: "Time in Force",
      orderType: "Order Type",
    };
  };

  const makeInput = (label: string) => {
    return (
      <FormControl isRequired>
        <FormLabel>{LABEL_MAP[label]}</FormLabel>
        {label === "orderType" || label === "timeInForce" ? (
          <Select>
            {label === "orderType"
              ? ORDER_TYPES.map((type, i) => {
                  return (
                    <option key={i} value={type.value}>
                      {type.label}
                    </option>
                  );
                })
              : TIME_IN_FORCE.map((tif, i) => {
                  return (
                    <option key={i} value={tif.value}>
                      {tif.label}
                    </option>
                  );
                })}
          </Select>
        ) : (
          <Input />
        )}
      </FormControl>
    );
    // if (label === "orderType" || label === "timeInForce") {
    //   return (
    //     <FormControl isRequired>
    //       <FormLabel>{LABEL_MAP[label]}</FormLabel>
    //     </FormControl>
    //   );
    // }
  };

  return (
    <Stack>
      {formData &&
        Object.entries(formData).map((entry, i) => {
          console.log("ENTRY:", entry);
          return makeInput(entry[0]);
          // return <Box key={i} />;
        })}
      {/* <FormControl isRequired>
        <FormLabel>Watchlist Name</FormLabel>
        <Select></Select>
      </FormControl> */}
    </Stack>
  );
};

export default OrderForm;
