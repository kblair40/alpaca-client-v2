import React, { useState, useEffect, useRef } from "react";
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
  ModalBody,
  ModalFooter,
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

type Props = {
  closeModal: () => void;
};

const OrderForm = ({ closeModal }: Props) => {
  const [orderType, setOrderType] = useState<OrderType>("market");
  const [timeInForce, setTimeInForce] = useState<TimeInForce>("day");
  const [formData, setFormData] = useState<OrderFormData>(
    DEFAULT_VALUES["market"]
  );

  const limitRef = useRef<HTMLInputElement>(null);
  const stopRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setFormData(DEFAULT_VALUES[orderType]);
  }, [orderType]);

  return (
    <React.Fragment>
      <ModalBody>
        <Stack>
          <FormControl isRequired>
            <FormLabel>Order Type</FormLabel>
            <Select
              value={orderType}
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
              value={timeInForce}
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
              <NumberInput precision={2} ref={limitRef} min={0} max={100000}>
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
              <NumberInput precision={2} ref={stopRef} min={0} max={100000}>
                <NumberInputField />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
            </FormControl>
          ) : null}
        </Stack>
      </ModalBody>

      <ModalFooter>
        <Button mr="1rem" onClick={closeModal}>
          Cancel
        </Button>
        <Button variant="solid-blue">Submit</Button>
      </ModalFooter>
    </React.Fragment>
  );
};

export default OrderForm;
