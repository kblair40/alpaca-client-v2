import {
  // Box,
  Flex,
  Text,
  Center,
  Spinner,
  // useColorMode,
  HStack,
  VStack,
  IconButton,
  StackDivider,
  Box,
  Tooltip,
} from "@chakra-ui/react";
import dayjs from "dayjs";
import { Link } from "react-router-dom";

import { ChevronDownIcon } from "utils/icons";
import { type IOrder } from "utils/types/order";
import useSelector from "hooks/useSelector";
import OrderFilters from "./OrderFilters";

const orderTypes: { [key: string]: string } = {
  market: "Market",
  limit: "Limit",
  stop: "Stop",
  stop_limit: "Stop Limit",
};

const OrdersList = () => {
  // const { colorMode } = useColorMode();
  // const isDark = colorMode === "dark";

  const {
    status,
    // error,
    orders,
  } = useSelector((st) => st.order);

  return (
    <Flex h="calc(100% + 16px)" direction="column" minH="240px">
      <OrderFilters />
      <Box position="relative" top="60px">
        <HStack
          position="absolute"
          top={{ base: "-32px", md: "-36px" }}
          left={0}
          right={0}
          align="center"
          fontSize="13px"
          fontWeight="700"
          w="100%"
          textAlign="center"
          textDecoration="underline"
        >
          <Text flex={1}>Side</Text>
          <Text flex={1}>Symbol</Text>
          <Text flex={1}>Type</Text>

          <Text flex={1}>Created</Text>
          <Text flex={1}>Status</Text>
          <Text flex={1} display={{ base: "none", md: "inline" }}>
            Ordered Qty
          </Text>
          <Text flex={1} display={{ base: "none", md: "inline" }}>
            Avg Filled Price
          </Text>
          <Text flex={1}>Details</Text>
        </HStack>

        <VStack
          spacing="4px"
          divider={<StackDivider />}
          overflowY="auto"
          pb="1rem"
        >
          {status === "loading" ? (
            <Center h="100px">
              <Spinner />
            </Center>
          ) : status === "completed" && orders && orders.length ? (
            orders.map((order: IOrder, i) => {
              const orderId = order.id;
              const side = order.side;
              const symbol = order.symbol;
              const orderType = order.type;
              const status = order.status;
              const filledAvgPrice = order.filled_avg_price;
              const qty = order.qty;
              const date = dayjs(order.created_at);
              const createdAt = date.format("M/D/YY");
              const dateTip = date.format("MMM D, YYYY h:mm a");

              return (
                <HStack
                  fontSize="13px"
                  key={i}
                  w="100%"
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
                  <Tooltip label={dateTip}>
                    <Text flex={1}>{createdAt}</Text>
                  </Tooltip>
                  <Text flex={1} textTransform="capitalize">
                    {status}
                  </Text>
                  <Text display={{ base: "none", md: "inline" }} flex={1}>
                    {qty}
                  </Text>
                  <Text display={{ base: "none", md: "inline" }} flex={1}>
                    {filledAvgPrice ? `$${filledAvgPrice}` : "-"}
                  </Text>

                  <Flex justify="center" flex={1}>
                    <Link to={`/order/${orderId}`}>
                      <IconButton
                        aria-label="See Details"
                        size="xs"
                        icon={
                          <ChevronDownIcon
                            boxSize="16px"
                            transform="rotate(-90deg)"
                          />
                        }
                      />
                    </Link>
                  </Flex>
                </HStack>
              );
            })
          ) : status === "completed" && orders && !orders.length ? (
            <NoOrders />
          ) : null}
        </VStack>
      </Box>
    </Flex>
  );
};

export default OrdersList;

const NoOrders = () => {
  return (
    <Flex mt="2rem" py="1rem" direction="column" align="center">
      <Text textAlign="center" fontWeight="600">
        No Orders Match Your Search Criteria
      </Text>
      <Text textAlign="center">Try adjusting filter values</Text>
    </Flex>
  );
};
