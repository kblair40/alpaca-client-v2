import React, { useState } from "react";
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

import { positionActions } from "store/positionSlice";
import { type ClosePositionData } from "utils/types/closePosition";
import { alpaca } from "api";
// import useSelector from "hooks/useSelector";
import useDispatch from "hooks/useDispatch";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  closePositionData: ClosePositionData | null;
  onDeletePosition: () => void;
};

const ClosePositionModal = ({
  isOpen,
  onClose,
  closePositionData,
  onDeletePosition,
}: Props) => {
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  const bg = useColorModeValue("gray.50", "gray.800");
  const isSale = closePositionData && closePositionData.sharesToSell > 0;

  const handleClickConfirmDelete = async () => {
    let symbol: string | undefined = undefined;
    if (closePositionData) {
      symbol = closePositionData.symbol;
    }
    if (!symbol) return;

    setLoading(true);

    try {
      const response = await alpaca.delete(`/position/${symbol}`);
      if (response && response.data) {
        console.log("\nDELETE RESPONSE:", response.data, "\n\n");
        dispatch(positionActions.removePosition(symbol));
        onDeletePosition();
        // onClose();
      }
    } catch (e) {
      console.log("FAILED TO DELETE POSITION:", e);
    }

    setLoading(false);
  };

  if (closePositionData) {
    console.log(
      "PROCEEDS TYPE:",
      typeof closePositionData.totalEstimatedProceeds
    );
  }

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
                  {isSale // @ts-ignore
                    ? `$${closePositionData.totalEstimatedProceeds.toFixed(2)}`
                    : // @ts-ignore
                      `$${closePositionData.totalEstimatedCost.toFixed(2)}`}
                </Text>
              </Flex>
            </ModalBody>

            <ModalFooter display="flex">
              <Button variant="solid-blue" flex={1} mr="1.5rem">
                Cancel
              </Button>
              <Button
                onClick={handleClickConfirmDelete}
                variant="solid-red"
                flex={1}
                isLoading={loading}
              >
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
