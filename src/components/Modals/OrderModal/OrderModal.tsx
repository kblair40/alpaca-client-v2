import {
  Modal,
  ModalHeader,
  ModalContent,
  ModalOverlay,
  useColorModeValue,
  useToast,
} from "@chakra-ui/react";

import OrderForm from "./OrderForm";
import { orderActions } from "store/orderSlice";
import useDispatch from "hooks/useDispatch";
import useSelector from "hooks/useSelector";

const OrderModal = () => {
  const { asset, showModal } = useSelector((st) => st.order);
  const dispatch = useDispatch();

  const toast = useToast();

  const handleClose = () => {
    dispatch(orderActions.closeModal());
  };

  const handlePlaceOrder = (isSuccessful = true) => {
    toast({
      title: isSuccessful ? "Order Placed!" : "Failed to place order",
      description: isSuccessful
        ? "Check the dashboard to see the status of your order"
        : "Please try again",
      status: isSuccessful ? "success" : "error",
      duration: 7000,
      isClosable: true,
    });

    handleClose();
  };

  const bg = useColorModeValue("gray.50", "gray.800");

  return (
    <Modal isOpen={showModal} onClose={handleClose}>
      <ModalOverlay />
      <ModalContent bg={bg}>
        <ModalHeader>
          {asset ? `Place an order for ${asset.symbol}` : "Order"}
        </ModalHeader>

        <OrderForm onPlaceOrder={handlePlaceOrder} closeModal={handleClose} />
      </ModalContent>
    </Modal>
  );
};

export default OrderModal;
