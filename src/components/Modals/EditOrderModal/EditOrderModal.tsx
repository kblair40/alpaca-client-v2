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
  Flex,
} from "@chakra-ui/react";

import useSelector from "hooks/useSelector";
import useDispatch from "hooks/useDispatch";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

const EditOrderModal = ({ isOpen, onClose }: Props) => {
  const dispatch = useDispatch();

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
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
