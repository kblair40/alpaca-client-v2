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

import { type IOrder } from "utils/types/order";
import useSelector from "hooks/useSelector";
import {
  DEFAULT_VALUES,
  TIME_IN_FORCE,
  ORDER_TYPES,
  type OrderFormData,
} from "./options";
import { alpaca } from "api";

type OrderType = "market" | "stop" | "limit" | "stop_limit";
type TimeInForce = "day" | "gtc" | "ioc" | "fok";

type Props = {
  closeModal?: () => void;
  onPlaceOrder?: (isSuccessful?: boolean) => void;
  orderData: IOrder;
};

const OrderForm = ({ closeModal, onPlaceOrder, orderData }: Props) => {
  const {
    symbol,
    qty: def_qty,
    time_in_force: def_timeInForce,
    type: def_orderType,
    limit_price: def_limitPrice,
    stop_price: def_stopPrice,
  } = orderData;

  const [orderType, setOrderType] = useState<OrderType>("market");
  const [timeInForce, setTimeInForce] = useState<TimeInForce>("day");
  const [formData, setFormData] = useState<OrderFormData>(
    DEFAULT_VALUES["market"]
  );
  const [price, setPrice] = useState<null | number>(null);
  const [loading, setLoading] = useState(false);

  const { priceData, tickerSymbol } = useSelector((st) => st.order);

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

  const handleSubmit = async () => {
    setLoading(true);
    const tradeParams: { [key: string]: string | number } = {
      symbol: tickerSymbol, // could use alpaca_id alternatively
      qty: formData.quantity, // might need parseInt to wrap
      side: "buy",
      type: orderType,
      time_in_force: timeInForce,
    };
    // console.log("TRADE PARAMS:", tradeParams, "\n");

    if (orderType !== "market") {
      if (orderType === "limit" || orderType === "stop_limit") {
        // console.log("LIMIT REF:", limitRef.current!.value);
        if (limitRef.current && limitRef.current.value) {
          tradeParams.limit_price = limitRef.current.value;
        } else {
          console.log("EARLY RETURN1 - MISSING INFORMATION");
          setLoading(false);
          return;
        }
      }
      if (orderType === "stop" || orderType === "stop_limit") {
        if (stopRef.current && stopRef.current.value) {
          tradeParams.stop_price = stopRef.current.value;
        } else {
          console.log("EARLY RETURN2 - MISSING INFORMATION");
          setLoading(false);
          return;
        }
      }
    }

    try {
      const tradeResponse = await alpaca.post("/order", { tradeParams });
      console.log("\n\nTRADE RESPONSE:", tradeResponse, "\n\n");
      if (onPlaceOrder) onPlaceOrder(true);
    } catch (e) {
      console.log("FAILED TO COMPLETE TRADE:", e);
      if (onPlaceOrder) onPlaceOrder(false);
    }

    setLoading(false);
  };

  return (
    <React.Fragment>
      <ModalBody>
        <Stack>
          <FormControl isRequired>
            <FormLabel>Order Type</FormLabel>
            <Select defaultValue={def_orderType}>
              {ORDER_TYPES.map((type, i) => (
                <option key={i} value={type.value}>
                  {type.label}
                </option>
              ))}
            </Select>
          </FormControl>

          <FormControl isRequired>
            <FormLabel>Time in Force</FormLabel>
            <Select defaultValue={def_timeInForce}>
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
              defaultValue={def_qty ? def_qty : 0}
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
              <NumberInput precision={2} min={0} max={100000}>
                <NumberInputField ref={limitRef} />
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
              <NumberInput precision={2} min={0} max={100000}>
                <NumberInputField ref={stopRef} />
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
        <Button
          isDisabled={formData.quantity === 0}
          isLoading={loading}
          variant="solid-blue"
          onClick={handleSubmit}
        >
          Submit
        </Button>
      </ModalFooter>
    </React.Fragment>
  );
};

export default OrderForm;
