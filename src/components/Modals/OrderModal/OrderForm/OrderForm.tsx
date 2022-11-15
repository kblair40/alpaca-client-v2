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
  DEFAULT_VALUES,
  TIME_IN_FORCE,
  ORDER_TYPES,
  LABEL_MAP,
} from "./options";

// const DEFAULT_VALUES = DEFAULT_MARKET;

const OrderForm = () => {
  const [orderType, setOrderType] = useState("market");
  const [timeInForce, setTimeInForce] = useState("day");
  const [formData, setFormData] = useState(DEFAULT_VALUES["market"]);

  const makeInput = (label: string) => {
    return (
      <FormControl isRequired>
        <FormLabel>{LABEL_MAP[label]}</FormLabel>
        {label === "timeInForce" ? (
          <Select>
            {TIME_IN_FORCE.map((tif, i) => {
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
  };

  return (
    <Stack>
      <FormControl isRequired>
        <FormLabel>Order Type</FormLabel>
        <Select>
          {ORDER_TYPES.map((tif, i) => (
            <option key={i} value={tif.value}>
              {tif.label}
            </option>
          ))}
        </Select>
      </FormControl>

      <FormControl isRequired>
        <FormLabel>Time in Force</FormLabel>
        <Select>
          {TIME_IN_FORCE.map((tif, i) => (
            <option key={i} value={tif.value}>
              {tif.label}
            </option>
          ))}
        </Select>
      </FormControl>

      <FormControl isRequired>
        <FormLabel>Quantity</FormLabel>
        <Input type="number" min={1} step={1} value={formData.quantity} />
      </FormControl>

      {/* {orderType === "market" ? (
        <FormControl isRequired>
          <FormLabel>Price</FormLabel>
          <Select>
            {TIME_IN_FORCE.map((tif, i) => (
              <option key={i} value={tif.value}>
                {tif.label}
              </option>
            ))}
          </Select>
        </FormControl>
      ) : null} */}

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
