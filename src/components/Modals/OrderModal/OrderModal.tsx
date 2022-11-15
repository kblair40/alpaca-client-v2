import {
  Modal,
  ModalHeader,
  ModalContent,
  ModalBody,
  ModalFooter,
  ModalOverlay,
  FormControl,
  FormLabel,
  Input,
  Flex,
  Stack,
  Button,
  useColorModeValue,
  FormHelperText,
  FormErrorMessage,
  Box,
} from "@chakra-ui/react";

import { orderActions } from "store/orderSlice";
import useDispatch from "hooks/useDispatch";
import useSelector from "hooks/useSelector";

type Props = {};

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

        <ModalBody>
          <Stack>
            <FormControl isRequired>
              <FormLabel>Watchlist Name</FormLabel>
              <Input
                variant="neutral-outline"
                // value={name}
                // isInvalid={nameInvalid}
                // onChange={(e) => {
                //   setName(e.target.value);
                //   if (createError) setCreateError("");
                // }}
              />
            </FormControl>
          </Stack>
        </ModalBody>

        <ModalFooter>
          <Button mr="1rem" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="solid-blue">Submit</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default OrderModal;
