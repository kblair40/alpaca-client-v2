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
// import useSelector from "hooks/useSelector";
// import useDispatch from "hooks/useDispatch";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  orderData: IOrder;
};

const EditOrderModal = ({ isOpen, onClose, orderData }: Props) => {
  // const dispatch = useDispatch();

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

        {orderData && <OrderForm orderData={orderData} />}
      </ModalContent>
    </Modal>
  );
};

export default EditOrderModal;
