import { useEffect, useState } from "react";
import {
  Box,
  Flex,
  Text,
  Center,
  Spinner,
  useColorMode,
} from "@chakra-ui/react";

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
        {status === "loading" ? (
          <Center h="100px">
            <Spinner />
          </Center>
        ) : status === "completed" && orders && orders.length ? (
          orders.map((order, i) => {
            return <Text key={i}>ORDER WOULD GO HERE</Text>;
          })
        ) : null}
      </Flex>
    </Box>
  );
};

export default OrdersList;
