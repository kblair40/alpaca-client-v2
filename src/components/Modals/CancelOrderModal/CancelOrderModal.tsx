import { useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  // ModalBody,
  ModalCloseButton,
  Button,
  useColorModeValue,
} from "@chakra-ui/react";

import { fetchOrders } from "store/orderSlice";
import useDispatch from "hooks/useDispatch";
import { alpaca } from "api";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  orderId: string;
};

const CancelOrderModal = ({ isOpen, onClose, orderId }: Props) => {
  const dispatch = useDispatch();

  const handleClickConfirm = async () => {
    try {
      const response = await alpaca.delete(`/order/${orderId}`);
      console.log("\n\nDELETE RESPONSE:", response.data, "\n\n");

      // dispatch(fetchOrders());
    } catch (e) {
      console.log("FAILED TO DELETE CANCEL ORDER");
    }
  };

  const bg = useColorModeValue("gray.50", "gray.800");

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size={{ base: "xs", sm: "md", md: "lg" }}
      isCentered
    >
      <ModalOverlay />
      <ModalContent bg={bg}>
        {/* <ModalCloseButton size="sm" /> */}
        <ModalHeader>Are you sure you want to cancel this order?</ModalHeader>

        <ModalFooter>
          <Button w="50%" onClick={onClose}>
            Cancel
          </Button>
          <Button
            w="50%"
            variant="solid-red"
            ml="1rem"
            onClick={handleClickConfirm}
          >
            Confirm
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default CancelOrderModal;
