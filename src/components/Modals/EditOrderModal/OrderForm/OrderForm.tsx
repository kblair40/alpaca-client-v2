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
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from "@chakra-ui/react";

import { type IOrder } from "utils/types/order";
import useSelector from "hooks/useSelector";
import { TIME_IN_FORCE, ORDER_TYPES, type OrderFormData } from "./options";
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
    qty: def_qty,
    time_in_force: def_timeInForce,
    type: def_orderType,
    limit_price: def_limitPrice,
    stop_price: def_stopPrice,
  } = orderData;

  // Use to check if any changes have been made when submitted.
  // Prevent submission if all details are the same.
  const originalData = useRef({
    timeInForce: def_timeInForce,
    type: def_orderType,
    qty: def_qty,
    limitPrice: def_limitPrice,
    stopPrice: def_stopPrice,
  });

  const [formData, setFormData] = useState<OrderFormData>({
    quantity: parseInt(
      originalData.current.qty ? originalData.current.qty : "0"
    ),
    limitPrice: originalData.current.limitPrice
      ? parseFloat(originalData.current.limitPrice)
      : undefined,
    stopPrice: originalData.current.stopPrice
      ? parseFloat(originalData.current.stopPrice)
      : undefined,
  });
  const [orderType, setOrderType] = useState(originalData.current.type);
  const [timeInForce, setTimeInForce] = useState(
    originalData.current.timeInForce
  );
  const [price, setPrice] = useState<null | number>(null);
  const [loading, setLoading] = useState(false);

  const { priceData, tickerSymbol } = useSelector((st) => st.order);

  useEffect(() => {
    if (priceData) {
      setPrice(priceData.snapshot.minuteBar.c);
    }
  }, [priceData]);

  const dataChanged = () => {
    const defaults = originalData.current;

    console.log("DEFAULTS:", defaults);
    let defaultQty = parseInt(defaults.qty ? defaults.qty : "0");
    if (defaultQty !== formData.quantity) return true;
    if (timeInForce !== defaults.timeInForce) return true;
    if (defaults.type !== orderType) {
      if (["limit", "stop", "stop_limit"].includes(orderType)) {
        if (["limit", "stop_limit"].includes(orderType)) {
          if (!limitRef.current?.value) return false; // should set an error message here instead
        }
        if (["stop", "stop_limit"].includes(orderType)) {
          if (!stopRef.current?.value) return false; // should set an error message here instead
        }
      }

      return true;
    }

    return false;
  };

  // const handleSubmit = async () => {
  //   setLoading(true);
  //   const tradeParams: { [key: string]: string | number } = {
  //     symbol: tickerSymbol, // could use alpaca_id alternatively
  //     qty: formData.quantity, // might need parseInt to wrap
  //     side: "buy",
  //     type: orderType,
  //     time_in_force: timeInForce,
  //   };
  //   // console.log("TRADE PARAMS:", tradeParams, "\n");

  //   if (orderType !== "market") {
  //     if (orderType === "limit" || orderType === "stop_limit") {
  //       // console.log("LIMIT REF:", limitRef.current!.value);
  //       if (limitRef.current && limitRef.current.value) {
  //         tradeParams.limit_price = limitRef.current.value;
  //       } else {
  //         console.log("EARLY RETURN1 - MISSING INFORMATION");
  //         setLoading(false);
  //         return;
  //       }
  //     }
  //     if (orderType === "stop" || orderType === "stop_limit") {
  //       if (stopRef.current && stopRef.current.value) {
  //         tradeParams.stop_price = stopRef.current.value;
  //       } else {
  //         console.log("EARLY RETURN2 - MISSING INFORMATION");
  //         setLoading(false);
  //         return;
  //       }
  //     }
  //   }

  //   try {
  //     const tradeResponse = await alpaca.post("/order", { tradeParams });
  //     console.log("\n\nTRADE RESPONSE:", tradeResponse, "\n\n");
  //     if (onPlaceOrder) onPlaceOrder(true);
  //   } catch (e) {
  //     console.log("FAILED TO COMPLETE TRADE:", e);
  //     if (onPlaceOrder) onPlaceOrder(false);
  //   }

  //   setLoading(false);
  // };

  const limitRef = useRef<HTMLInputElement>(null);
  const stopRef = useRef<HTMLInputElement>(null);
  const qtyRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async () => {
    if (!timeInForce || !orderType || !formData.quantity) {
      console.log("EARLY RETURN:", {
        qty: formData.quantity,
        timeInForce,
        orderType,
      });
      return;
    }

    const dataDidChange = dataChanged();
    console.log("DATA DID CHANGE:", dataDidChange);

    const qty = formData.quantity;
    let limitPrice: string;
    let stopPrice: string;

    if (["limit", "stop_limit"].includes(orderType)) {
      if (!limitRef.current) return;
      limitPrice = limitRef.current.value;
    }
    if (["stop", "stop_limit"].includes(orderType)) {
      if (!stopRef.current) return;
      stopPrice = stopRef.current.value;
    }

    console.log("ALL DATA:", {
      timeInForce,
      orderType,
      qty,
      // @ts-ignore
      limitPrice,
      // @ts-ignore
      stopPrice,
    });
  };

  return (
    <React.Fragment>
      <ModalBody>
        <Alert
          status="warning"
          flexDirection="column"
          alignItems="center"
          textAlign="center"
          mb="1rem"
        >
          <AlertIcon />
          <AlertTitle>Warning!</AlertTitle>
          <AlertDescription lineHeight={1.25} fontSize="sm" fontWeight="500">
            If the existing order is filled before the replacement order reaches
            the execution venue, the existing order will not be replaced.
          </AlertDescription>
        </Alert>

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
              // defaultValue={def_qty ? def_qty : 0}
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
