import {
  Box,
  Flex,
  Text,
  Center,
  Spinner,
  useColorMode,
  HStack,
  VStack,
  IconButton,
  StackDivider,
} from "@chakra-ui/react";
import dayjs from "dayjs";
import { Link } from "react-router-dom";

import { ChevronDownIcon } from "utils/icons";
import { type IOrder } from "utils/types/order";
import useSelector from "hooks/useSelector";

const orderTypes: { [key: string]: string } = {
  market: "Market",
  limit: "Limit",
  stop: "Stop",
  stop_limit: "Stop Limit",
};

const OrdersList = () => {
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
          borderBottom="1px solid"
          borderColor={isDark ? "gray.700" : "gray.300"}
          fontSize="sm"
          fontWeight="600"
          w="100%"
          px="4px"
          textAlign="center"
          pb="4px"
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

        <VStack spacing="4px" divider={<StackDivider />}>
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
              const createdAt = order.created_at;

              return (
                <HStack
                  px="4px"
                  fontSize="sm"
                  key={i}
                  w="100%"
                  // border=".1px solid #aaa"
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
          ) : null}
        </VStack>
      </Flex>
    </Box>
  );
};

export default OrdersList;
