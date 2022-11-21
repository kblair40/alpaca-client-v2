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

import { convertToCurrency } from "utils/helpers";
import { type IOrder } from "utils/types/order";
import useDispatch from "hooks/useDispatch";
import { fetchOrders } from "store/orderSlice";
import { TIME_IN_FORCE, ORDER_TYPES, type OrderFormData } from "./options";
import { alpaca } from "api";

type OrderType = "market" | "stop" | "limit" | "stop_limit";
type TimeInForce = "day" | "gtc" | "ioc" | "fok";

type Props = {
  closeModal: () => void;
  onReplaceOrder: (isSuccessful?: boolean) => void;
  orderData: IOrder;
  priceData: any;
};

const OrderForm = ({
  closeModal,
  onReplaceOrder,
  orderData,
  priceData,
}: Props) => {
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

  const dispatch = useDispatch();

  useEffect(() => {
    if (priceData) {
      setPrice(priceData.minuteBar.c);
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
          if (!formData.limitPrice) return false; // should set an error message here instead
        }
        if (["stop", "stop_limit"].includes(orderType)) {
          if (!formData.stopPrice) return false; // should set an error message here instead
        }
      }
      return true;
    }

    if (orderData.limit_price) {
      if (parseFloat(orderData.limit_price) !== formData.limitPrice) {
        return true;
      }
    }

    if (orderData.stop_price) {
      if (parseFloat(orderData.stop_price) !== formData.stopPrice) {
        return true;
      }
    }
    return false;
  };

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
    if (!dataDidChange) {
      console.log("NO CHANGE TO DATA - RETURNING EARLY");
      return;
    }

    setLoading(true);

    const tradeParams: { [key: string]: string | number } = {
      symbol: orderData.symbol, // could use alpaca_id alternatively
      qty: formData.quantity, // might need parseInt to wrap
      side: "buy",
      type: orderType,
      time_in_force: timeInForce,
    };

    if (orderType !== "market") {
      if (orderType === "limit" || orderType === "stop_limit") {
        if (formData.limitPrice) {
          tradeParams.limit_price = formData.limitPrice;
        } else {
          console.log("EARLY RETURN1 - MISSING INFORMATION");
          setLoading(false);
          return;
        }
      }
      if (orderType === "stop" || orderType === "stop_limit") {
        if (formData.stopPrice) {
          tradeParams.stop_price = formData.stopPrice;
        } else {
          console.log("EARLY RETURN2 - MISSING INFORMATION");
          setLoading(false);
          return;
        }
      }
    }

    console.log("TRADE PARAMS:", tradeParams, "\n");

    try {
      const response = await alpaca.patch(`/order/${orderData.id}`, {
        tradeParams,
      });
      console.log("\nORDER PATCH RESPONSE:", response.data);
      // current order is now in "replaced" status and a new order has been created
      dispatch(fetchOrders());
      onReplaceOrder();
    } catch (e) {
      console.log("\n\nFAILED TO REPLACE ORDER:", e);
    }

    setLoading(false);
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
              <NumberInput
                precision={2}
                min={0}
                max={100000}
                onChange={(val) =>
                  setFormData({ ...formData, limitPrice: parseInt(val) })
                }
                value={formData.limitPrice}
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
                precision={2}
                min={0}
                max={100000}
                value={formData.stopPrice}
                onChange={(val) =>
                  setFormData({ ...formData, stopPrice: parseInt(val) })
                }
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

        <Flex mt="2rem" align="center" direction="column">
          <Flex justify="center">
            <Text w="124px" mr="1rem">
              Price Per Share
            </Text>
            <Text w="100px">{price ? convertToCurrency(price) : ""}</Text>
          </Flex>
          <Flex justify="center">
            <Text w="124px" mr="1rem">
              Est. Order Total
            </Text>
            <Text w="100px">
              {price ? convertToCurrency(price * formData.quantity) : ""}
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
