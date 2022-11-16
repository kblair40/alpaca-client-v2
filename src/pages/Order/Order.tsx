import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Box, Flex, Text, Center, Spinner } from "@chakra-ui/react";

import { type IOrder } from "utils/types/order";
import { alpaca } from "api";

const Order = () => {
  const [orderData, setOrderData] = useState<IOrder | null>(null);
  const [loading, setLoading] = useState(true);

  const { orderId } = useParams();

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const response = await alpaca.get(`/order/${orderId}`);
        console.log("\n\nORDER RESPONSE:", response.data, "\n\n");
        setOrderData(response.data);
      } catch (e) {
        console.log("FAILED TO FETCH ORDER:", e);
        setOrderData(null);
      }
      setLoading(false);
    };

    fetchOrder();
  }, [orderId]);

  if (loading) {
    return (
      <Center h="100px">
        <Spinner />
      </Center>
    );
  }

  if (orderData) {
    return (
      <Flex
        direction="column"
        align="center"
        mt="2rem"
        px={{ base: "1rem", sm: "3rem" }}
      >
        <Flex align="end" lineHeight={1}>
          <Text mr="1rem" fontSize="xl" fontWeight={600}>
            {orderData.symbol}
          </Text>
          <Text textTransform="capitalize">{`${orderData.type} ${orderData.side}`}</Text>
        </Flex>

        <Box w="100%">
          <Flex mt="1.5rem">
            <Text>Qty Ordered</Text>
            <Text>{orderData.qty}</Text>
          </Flex>

          <Flex>
            <Text>Qty Filled</Text>
            <Text>{orderData.filled_qty}</Text>
          </Flex>
        </Box>
      </Flex>
    );
  }

  return null;
};

export default Order;
