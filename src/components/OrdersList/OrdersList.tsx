import { useEffect, useState } from "react";
import {
  Box,
  Flex,
  Text,
  Center,
  Spinner,
  useColorMode,
  HStack,
} from "@chakra-ui/react";
import dayjs from "dayjs";

import { type IOrder } from "utils/types/order";
import useSelector from "hooks/useSelector";

type Props = {};

const OrdersList = (props: Props) => {
  const { colorMode } = useColorMode();
  const isDark = colorMode === "dark";

  const { status, error, orders } = useSelector((st) => st.order);

  return (
    <Box>
      <Text>Your Orders</Text>
      <Flex
        mt=".5rem"
        direction="column"
        minH="240px"
        h="40vh"
        overflowY="auto"
      >
        <HStack
          fontSize="sm"
          fontWeight="600"
          w="100%"
          border=".1px solid #aaa"
          px="4px"
          textAlign="center"
        >
          <Text>Side</Text>
          <Text>Symbol</Text>
          <Text>Created</Text>
          <Text>Filled</Text>
          <Text>Ordered Qty</Text>
          <Text>Filled Qty</Text>
          <Text>Avg Filled Price</Text>
          <Text>Limit Price</Text>
          <Text>Stop Price</Text>
          {/* <Text></Text> */}
        </HStack>
        {status === "loading" ? (
          <Center h="100px">
            <Spinner />
          </Center>
        ) : status === "completed" && orders && orders.length ? (
          orders.map((order: IOrder, i) => {
            let submittedDate;
            if (order.submitted_at) {
              submittedDate = new Date(order.submitted_at);
            }
            const orderId = order.id;
            const clientOrderId = order.client_order_id;

            const side = order.side;
            const symbol = order.symbol;
            const assetId = order.asset_id;
            const assetClass = order.asset_class;

            const timeInForce = order.time_in_force;
            const orderType = order.type;
            const limitPrice = order.type === "limit" ? order.limit_price : "-";
            const stopPrice = order.type === "stop" ? order.stop_price : "-";
            const status = order.status;
            const filledAvgPrice = order.filled_avg_price;
            const qty = order.qty;
            const filledQty = order.filled_qty;
            const createdAt = order.created_at;
            const updatedAt = order.updated_at;
            const submittedAt = order.submitted_at;
            const filledAt = order.filled_at;
            const expiredAt = order.expired_at;
            const canceledAt = order.canceled_at;
            const failedAt = order.failed_at;
            const replacedAt = order.replaced_at;
            const replacedBy = order.replaced_by;
            const replaces = order.replaces;

            // const orderClass = order.order_class;
            // const legs = order.legs;

            return (
              <HStack
                px="4px"
                fontSize="sm"
                key={i}
                w="100%"
                border=".1px solid #aaa"
              >
                <Text textTransform="capitalize">{side}</Text>
                <Text>{symbol}</Text>
                <Text>{dayjs(createdAt).format("MM/YY")}</Text>
                <Text>{filledAt ? dayjs(filledAt).format("MM/YY") : "-"}</Text>
                <Text>{qty}</Text>
                <Text>{filledQty}</Text>
                <Text>${filledAvgPrice}</Text>
                <Text>{limitPrice}</Text>
                <Text>{stopPrice}</Text>
              </HStack>
            );
          })
        ) : null}
      </Flex>
    </Box>
  );
};

export default OrdersList;
