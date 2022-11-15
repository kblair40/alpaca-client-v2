import { useState, useEffect } from "react";
import {
  FormControl,
  FormLabel,
  Input,
  Stack,
  Flex,
  Button,
  useColorModeValue,
  FormHelperText,
  FormErrorMessage,
  Box,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Select,
} from "@chakra-ui/react";
import {
  DEFAULT_VALUES,
  TIME_IN_FORCE,
  ORDER_TYPES,
  // LABEL_MAP,
  type OrderFormData,
} from "./options";

// const DEFAULT_VALUES = DEFAULT_MARKET;

type OrderType = "market" | "stop" | "limit" | "stop_limit";
type TimeInForce = "day" | "gtc" | "ioc" | "fok";

const OrderForm = () => {
  const [orderType, setOrderType] = useState<OrderType>("market");
  const [timeInForce, setTimeInForce] = useState<TimeInForce>("day");
  const [formData, setFormData] = useState<OrderFormData>(
    DEFAULT_VALUES["market"]
  );

  useEffect(() => {
    setFormData(DEFAULT_VALUES[orderType]);
  }, [orderType]);

  return (
    <Stack>
      <FormControl isRequired>
        <FormLabel>Order Type</FormLabel>
        <Select
          onChange={({ target: { value } }) => {
            if (["market", "limit", "stop", "stop_limit"].includes(value)) {
              setOrderType(value as OrderType);
            }
          }}
        >
          {ORDER_TYPES.map((type, i) => (
            <option key={i} value={type.value}>
              {type.label}
            </option>
          ))}
        </Select>
      </FormControl>

      <FormControl isRequired>
        <FormLabel>Time in Force</FormLabel>
        <Select
          onChange={({ target: { value } }) => {
            if (["day", "gtc", "ioc", "fok"].includes(value)) {
              setTimeInForce(value as TimeInForce);
            }
          }}
        >
          {TIME_IN_FORCE.map((tif, i) => (
            <option key={i} value={tif.value}>
              {tif.label}
            </option>
          ))}
        </Select>
      </FormControl>

      <FormControl isRequired>
        <FormLabel>Quantity</FormLabel>
        <NumberInput
          onChange={(val) =>
            setFormData({ ...formData, quantity: parseInt(val) })
          }
          value={formData.quantity}
          min={1}
          step={1}
          max={100000000}
        >
          <NumberInputField />
          <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
          </NumberInputStepper>
        </NumberInput>
      </FormControl>

      {orderType === "limit" || orderType === "stop_limit" ? (
        <FormControl isRequired>
          <FormLabel>Limit Price</FormLabel>
          <NumberInput
            onChange={(val) =>
              setFormData({ ...formData, limitPrice: parseInt(val) })
            }
            value={formData.limitPrice}
            min={0}
            max={100000}
          >
            <NumberInputField />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
        </FormControl>
      ) : null}

      {orderType === "stop" || orderType === "stop_limit" ? (
        <FormControl isRequired>
          <FormLabel>Stop Price</FormLabel>
          <NumberInput
            onChange={(val) =>
              setFormData({ ...formData, stopPrice: parseInt(val) })
            }
            value={formData.stopPrice}
            min={0}
            max={100000}
          >
            <NumberInputField />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
        </FormControl>
      ) : null}
    </Stack>
  );
};

export default OrderForm;
