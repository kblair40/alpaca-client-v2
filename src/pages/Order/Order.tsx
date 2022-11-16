import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Box, Flex, Text, Center, Spinner } from "@chakra-ui/react";

import { alpaca } from "api";

const Order = () => {
  const [orderData, setOrderData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const { orderId } = useParams();

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const response = await alpaca.get(`/order/${orderId}`);
        console.log("\n\nORDER RESPONSE:", response.data, "\n\n");
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

  return <Box>Order</Box>;
};

export default Order;
