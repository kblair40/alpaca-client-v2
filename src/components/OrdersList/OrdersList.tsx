import {
  Box,
  Flex,
  Text,
  Center,
  Spinner,
  useColorMode,
  HStack,
  IconButton,
} from "@chakra-ui/react";
import dayjs from "dayjs";

import { ChevronDownIcon } from "utils/icons";
import { type IOrder } from "utils/types/order";
import useSelector from "hooks/useSelector";

type Props = {};

const orderTypes: { [key: string]: string } = {
  market: "Market",
  limit: "Limit",
  stop: "Stop",
  stop_limit: "Stop Limit",
};

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
          <Text flex={1}>Side</Text>
          <Text flex={1}>Symbol</Text>
          <Text flex={1}>Type</Text>

          <Text flex={1}>Created</Text>
          {/* <Text flex={1}>Filled</Text> */}
          <Text flex={1}>Ordered Qty</Text>
          {/* <Text flex={1}>Filled Qty</Text> */}
          <Text flex={1}>Avg Filled Price</Text>
          <Text flex={1}>Details</Text>
          {/* <Text flex={1}>Limit Price</Text>
          <Text flex={1}>Stop Price</Text> */}
          {/* <Text></Text> */}
        </HStack>
        {status === "loading" ? (
          <Center h="100px">
            <Spinner />
          </Center>
        ) : status === "completed" && orders && orders.length ? (
          orders.map((order: IOrder, i) => {
            // let submittedDate;
            // if (order.submitted_at) {
            //   submittedDate = new Date(order.submitted_at);
            // }
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
                textAlign="center"
                py="4px"
              >
                <Text flex={1} textTransform="capitalize">
                  {side}
                </Text>
                <Text flex={1}>{symbol}</Text>
                <Text flex={1} textTransform="capitalize">
                  {orderTypes[orderType]}
                </Text>
                <Text flex={1}>{dayjs(createdAt).format("MM/YY")}</Text>
                <Text flex={1}>{qty}</Text>
                <Text flex={1}>
                  {filledAvgPrice ? `$${filledAvgPrice}` : "-"}
                </Text>
                <Flex justify="center" flex={1}>
                  <IconButton
                    // flex={1}
                    aria-label="See Details"
                    size="xs"
                    icon={
                      <ChevronDownIcon
                        boxSize="16px"
                        transform="rotate(-90deg)"
                      />
                    }
                  />
                </Flex>
                {/* <Text flex={1}>{limitPrice}</Text>
                <Text flex={1}>{stopPrice}</Text> */}
              </HStack>
            );
          })
        ) : null}
      </Flex>
    </Box>
  );
};

export default OrdersList;

// const ChevronRightIcon =
