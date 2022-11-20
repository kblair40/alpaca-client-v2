import { useState, useEffect } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  useColorMode,
  Flex,
} from "@chakra-ui/react";

import { type IOrder } from "utils/types/order";
import OrderForm from "./OrderForm";
// import useSelector from "hooks/useSelector";
// import useDispatch from "hooks/useDispatch";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  orderData?: IOrder;
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

        <ModalHeader>Modal Header</ModalHeader>

        <ModalBody>Modal Body</ModalBody>

        <ModalFooter>
          <Button size="sm" mr="1rem">
            Cancel
          </Button>
          <Button size="sm">Submit</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default EditOrderModal;
