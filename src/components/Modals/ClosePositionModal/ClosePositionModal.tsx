import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  Text,
  Flex,
  useColorModeValue,
  Button,
} from "@chakra-ui/react";

import { type ClosePositionData } from "utils/types/closePosition";
// import useSelector from "hooks/useSelector";
// import useDispatch from "hooks/useDispatch";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  closePositionData?: ClosePositionData | null;
};

const ClosePositionModal = ({ isOpen, onClose, closePositionData }: Props) => {
  const bg = useColorModeValue("gray.50", "gray.800");
  const isSale = closePositionData && closePositionData.sharesToSell > 0;
  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent
        borderRadius="16px"
        bg={bg}
        w="max-content"
        px={{ base: "1rem", sm: "2rem" }}
      >
        {closePositionData ? (
          <React.Fragment>
            <ModalHeader textAlign="center">{`Close Position in ${closePositionData.symbol}`}</ModalHeader>

            <ModalBody>
              <Text textAlign="center">
                {`${isSale ? "Sell" : "Buy"} ${
                  isSale
                    ? closePositionData.sharesToSell
                    : closePositionData.sharesToBuy
                } shares to close your position`}
              </Text>
              <Flex mt=".5rem" justify="center">
                <Text>{`Estimated ${isSale ? "Proceeds" : "Cost"}:`}</Text>
                <Text fontWeight="600" ml="4px">
                  {isSale
                    ? `$${closePositionData.totalEstimatedProceeds}`
                    : `$${closePositionData.totalEstimatedCost}`}
                </Text>
              </Flex>
            </ModalBody>

            <ModalFooter display="flex">
              <Button variant="solid-blue" flex={1} mr="1.5rem">
                Cancel
              </Button>
              <Button variant="solid-red" flex={1}>
                Confirm
              </Button>
            </ModalFooter>
          </React.Fragment>
        ) : (
          <Text textAlign="center">No Data</Text>
        )}
        {/* TODO: SHOW ERROR MESSAGE HERE */}
      </ModalContent>
    </Modal>
  );
};

export default ClosePositionModal;
