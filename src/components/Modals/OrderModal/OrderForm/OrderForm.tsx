import React, { useState, useEffect, useRef } from "react";
import {
  FormControl,
  FormLabel,
  Stack,
  Button,
  ModalBody,
  ModalFooter,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Select,
  Flex,
  Text,
} from "@chakra-ui/react";

import useSelector from "hooks/useSelector";
import {
  DEFAULT_VALUES,
  TIME_IN_FORCE,
  ORDER_TYPES,
  type OrderFormData,
} from "./options";

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
  const [price, setPrice] = useState<null | number>(null);

  const { priceData } = useSelector((st) => st.order);

  useEffect(() => {
    if (priceData) {
      setPrice(priceData.snapshot.minuteBar.c);
    }
  }, [priceData]);

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

        <Flex mt="2rem" align="center" direction="column">
          <Flex justify="center">
            <Text w="124px" mr="1rem">
              Price Per Share
            </Text>
            <Text w="100px">{price ? `$${price.toFixed(2)}` : ""}</Text>
          </Flex>
          <Flex justify="center">
            <Text w="124px" mr="1rem">
              Est. Order Total
            </Text>
            <Text w="100px">
              {price ? `$${(price * formData.quantity).toFixed(2)}` : ""}
            </Text>
          </Flex>
        </Flex>
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
