import { useState, useEffect, Fragment } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  useColorMode,
  Flex,
  Text,
  Box,
} from "@chakra-ui/react";

import { type IOrder } from "utils/types/order";
import OrderForm from "./OrderForm";
import { alpaca } from "api";
// import useSelector from "hooks/useSelector";
// import useDispatch from "hooks/useDispatch";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  orderData: IOrder;
  onReplaceOrder: () => void;
};

const EditOrderModal = ({
  isOpen,
  onClose,
  orderData,
  onReplaceOrder,
}: Props) => {
  const [priceData, setPriceData] = useState<any>(null);

  useEffect(() => {
    const fetchPriceData = async () => {
      try {
        const response = await alpaca.get(`/snapshot/${orderData.symbol}`);
        console.log("PRICE DATA RESPONSE:", response.data, "\n\n");
        if (response.data) setPriceData(response.data);
      } catch (e) {
        console.log("FAILED TO FETCH PRICE DATA:", e);
        if (priceData) setPriceData(null);
      }
    };
    fetchPriceData();
  }, [orderData]);

  const { colorMode } = useColorMode();
  const isDark = colorMode === "dark";

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent bg={isDark ? "gray.800" : "gray.50"}>
        <ModalCloseButton size="sm" />

        <ModalHeader>
          <Flex direction="column">
            <Flex align="end" mb=".5rem">
              <Text>{orderData ? orderData.symbol : ""}</Text>
              <Text
                fontStyle="italic"
                ml="1rem"
                variant="secondary"
                fontSize="md"
                fontWeight="400"
              >
                Editing
              </Text>
            </Flex>
            {orderData && orderData.id ? (
              <Box display="inline" fontWeight="400" fontSize="sm">
                <Text variant="secondary" display="inline">
                  Order ID:&nbsp;
                </Text>
                <Text variant="secondary" display="inline">
                  {orderData.id}
                </Text>
              </Box>
            ) : null}
          </Flex>
        </ModalHeader>

        {orderData && (
          <OrderForm
            priceData={priceData}
            orderData={orderData}
            closeModal={onClose}
            onReplaceOrder={onReplaceOrder}
          />
        )}
      </ModalContent>
    </Modal>
  );
};

export default EditOrderModal;
