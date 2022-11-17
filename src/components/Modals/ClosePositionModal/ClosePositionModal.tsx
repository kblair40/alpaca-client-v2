import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";

import useSelector from "hooks/useSelector";
import useDispatch from "hooks/useDispatch";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

const ClosePositionModal = ({ isOpen, onClose }: Props) => {
  // const { status, data, ticker, asset } = useSelector((st) => st.chart);

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      ClosePositionModal
    </Modal>
  );
};

export default ClosePositionModal;
