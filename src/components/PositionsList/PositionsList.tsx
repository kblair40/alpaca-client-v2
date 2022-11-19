import { useEffect, useState } from "react";
import {
  Box,
  Flex,
  Text,
  Center,
  Spinner,
  HStack,
  VStack,
  IconButton,
} from "@chakra-ui/react";

import { type Position } from "utils/types/position";
import { ChevronDownIcon } from "utils/icons";
import useDispatch from "hooks/useDispatch";
import useSelector from "hooks/useSelector";
import { chartActions, fetchTickerData } from "store/chartSlice";
import {
  fetchPositions,
  fetchQuote,
  positionActions,
} from "store/positionSlice";
import PositionDrawer from "./PositionDrawer";
import QuestionBubble from "components/QuestionBubble";

const PositionsList = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const { status, data: positions } = useSelector((st) => st.position);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchPositions());
  }, [dispatch]);

  useEffect(() => {
    if (!drawerOpen) {
      dispatch(positionActions.removeSelectedPosition());
      dispatch(chartActions.clearChart());
    }
  }, [drawerOpen, dispatch]);

  const unrealizedGain = (gain: string) => {
    let intGain: number | string = parseFloat(gain);
    intGain = parseFloat(intGain.toLocaleString("en-US"));
    if (intGain >= 0) {
      return intGain.toFixed(2);
    } else {
      return `(${intGain.toFixed(2)})`;
    }
  };
  const handleClickManage = async (position: Position) => {
    dispatch(fetchQuote(position.symbol));
    dispatch(positionActions.setSelectedPosition(position));
    setDrawerOpen(true);

    dispatch(fetchTickerData({ symbol: position.symbol, timeframe: "1D" }));
  };

  const assetClassMap: { [key: string]: string } = {
    us_equity: "Equity",
  };

  if (status === "loading") {
    return (
      <Center h="100px">
        <Spinner />
      </Center>
    );
  }

  return (
    <Box minW="340px">
      <PositionDrawer
        isOpen={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      />
      <HStack
        w="100%"
        textAlign="center"
        fontWeight="600"
        fontSize="xs"
        h="40px"
        textDecoration="underline"
        align="end"
        mb="8px"
      >
        <Text flex={{ base: 0.75, sm: 0.5 }} textAlign="left">
          Symbol
        </Text>
        <Text flex={0.5}>Qty</Text>
        <Text display={{ base: "none", sm: "inline" }} flex={1}>
          Avg. Entry Price
        </Text>
        <Text flex={1}>Cost</Text>
        <Text flex={1}>Mkt Value</Text>
        <Text flex={1} display={{ base: "none", md: "inline" }}>
          Day Gain ($)
        </Text>
        <Text flex={1} display={{ base: "none", md: "inline" }}>
          Day Gain (%)
        </Text>
        <Text display={{ base: "none", sm: "inline" }} flex={1}>
          Gain ($)
        </Text>
        <Text display={{ base: "none", md: "inline" }} flex={0.75}>
          Gain (%)
        </Text>
        <Text flex={0.5}>Manage</Text>
      </HStack>

      <VStack spacing="4px">
        {positions && positions.length ? (
          positions.map((pos, i) => {
            return (
              <HStack
                key={i}
                w="100%"
                textAlign="center"
                fontSize="xs"
                fontWeight="400"
                py="2px"
              >
                <Text flex={{ base: 0.75, sm: 0.5 }} textAlign="left">
                  {pos.symbol}
                </Text>
                <Text flex={0.5}>{pos.qty}</Text>
                <Text display={{ base: "none", sm: "inline" }} flex={1}>
                  {parseFloat(pos.avg_entry_price).toFixed(2)}
                </Text>
                <Text flex={1}>
                  {parseFloat(pos.cost_basis).toLocaleString("en-US")}
                </Text>

                <Text flex={1}>
                  {parseFloat(
                    parseFloat(pos.market_value).toFixed(2)
                  ).toLocaleString("en-US")}
                </Text>
                <Text display={{ base: "none", md: "inline" }} flex={1}>
                  {unrealizedGain(pos.unrealized_intraday_pl)}
                </Text>
                <Text display={{ base: "none", md: "inline" }} flex={1}>
                  {unrealizedGain(pos.unrealized_intraday_plpc)}%
                </Text>
                <Text display={{ base: "none", sm: "inline" }} flex={1}>
                  {unrealizedGain(pos.unrealized_pl)}
                </Text>
                <Text display={{ base: "none", md: "inline" }} flex={0.75}>
                  {unrealizedGain(pos.unrealized_plpc)}%
                </Text>

                <Flex flex={0.5} justify="center">
                  <IconButton
                    onClick={() => handleClickManage(pos)}
                    aria-label="Manage position"
                    icon={
                      <ChevronDownIcon
                        boxSize="12px"
                        transform="rotate(-90deg)"
                      />
                    }
                    boxSize="20px"
                  />
                </Flex>
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
