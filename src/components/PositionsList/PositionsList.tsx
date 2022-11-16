import { useEffect, useState } from "react";
import {
  Box,
  Flex,
  Text,
  Center,
  Spinner,
  HStack,
  VStack,
} from "@chakra-ui/react";

import { type Position } from "utils/types/position";
import useDispatch from "hooks/useDispatch";
import useSelector from "hooks/useSelector";
import { fetchPositions } from "store/positionSlice";

const PositionsList = () => {
  const { status, data: positions } = useSelector((st) => st.position);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchPositions());
  }, [dispatch]);

  const unrealizedGain = (gain: string) => {
    let intGain: number | string = parseFloat(gain);
    intGain = parseFloat(intGain.toLocaleString("en-US"));
    if (intGain >= 0) {
      return "$" + intGain.toFixed(2);
    } else {
      return `$(${intGain.toFixed(2)})`;
    }
  };

  if (status === "loading") {
    return (
      <Center h="100px">
        <Spinner />
      </Center>
    );
  }

  return (
    <Box>
      <HStack
        w="100%"
        textAlign="center"
        fontWeight="600"
        fontSize="sm"
        h="40px"
        // border="1px solid #aaa"
      >
        <Text flex={0.5}>Symbol</Text>
        <Text flex={0.5}>Qty</Text>
        <Text flex={1}>Avg. Purchase Price</Text>
        {/* <Text flex={1}>Avg. Purchase Price</Text> */}
        <Text flex={0.5}>Side</Text>
        <Text flex={1}>Unrealized Gain/(Loss)</Text>
      </HStack>

      <VStack spacing="4px">
        {positions && positions.length ? (
          positions.map((pos, i) => {
            return (
              <HStack
                w="100%"
                textAlign="center"
                fontSize="sm"
                fontWeight="500"
                py="2px"
              >
                <Text flex={0.5}>{pos.symbol}</Text>
                <Text flex={0.5}>{pos.qty}</Text>
                <Text flex={1}>
                  ${parseFloat(pos.avg_entry_price).toFixed(2)}
                </Text>
                <Text textTransform="capitalize" flex={0.5}>
                  {pos.side}
                </Text>
                <Text flex={1}>{unrealizedGain(pos.unrealized_pl)}</Text>
              </HStack>
            );
          })
        ) : positions && !positions.length ? (
          <Text fontSize="xl" fontWeight="600" textAlign="center">
            You do not have any active positions
          </Text>
        ) : null}
      </VStack>
    </Box>
  );
};

export default PositionsList;
