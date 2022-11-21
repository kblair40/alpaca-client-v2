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
} from "@chakra-ui/react";

import { fetchOrders } from "store/orderSlice";
import useDispatch from "hooks/useDispatch";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  orderId: string;
  symbol: string;
};

const CancelOrderModal = ({ isOpen, onClose, orderId, symbol }: Props) => {
  const dispatch = useDispatch();

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalCloseButton size="sm" />
        <ModalHeader>Are you sure you want to cancel this order?</ModalHeader>

        {/* <ModalBody></ModalBody> */}

        <ModalFooter>
          <Button>Cancel</Button>
          <Button variant="solid-red" ml="1rem">
            Confirm
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default CancelOrderModal;
