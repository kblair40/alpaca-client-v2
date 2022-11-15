import {
  Modal,
  ModalHeader,
  ModalContent,
  ModalOverlay,
  useColorModeValue,
} from "@chakra-ui/react";

import OrderForm from "./OrderForm";
import { orderActions } from "store/orderSlice";
import useDispatch from "hooks/useDispatch";
import useSelector from "hooks/useSelector";

const OrderModal = () => {
  const { asset, showModal } = useSelector((st) => st.order);
  const dispatch = useDispatch();

  const handleClose = () => {
    dispatch(orderActions.closeModal());
  };

  const bg = useColorModeValue("gray.50", "gray.800");

  return (
    <Modal isOpen={showModal} onClose={handleClose}>
      <ModalOverlay />
      <ModalContent bg={bg}>
        <ModalHeader>
          {asset ? `Place an order for ${asset.symbol}` : "Order"}
        </ModalHeader>

        <OrderForm closeModal={handleClose} />
      </ModalContent>
    </Modal>
  );
};

export default OrderModal;
