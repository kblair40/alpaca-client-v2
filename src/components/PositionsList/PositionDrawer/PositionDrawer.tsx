import React, { useState, useEffect } from "react";
import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useColorMode,
  Flex,
  Text,
  Wrap,
  WrapItem,
  Button,
} from "@chakra-ui/react";

import { type IAsset } from "utils/types/asset";
import { type Quote } from "utils/types/quote";
import BuySellButtons from "components/Chart/BuySellButtons";
import useSelector from "hooks/useSelector";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

const PositionDrawer = ({ isOpen, onClose }: Props) => {
  const [snapshot, setSnapshot] = useState<any>(null);

  const { colorMode } = useColorMode();
  const isDark = colorMode === "dark";

  const bg = isDark ? "gray.800" : "gray.50";

  const {
    selectedTickerPosition: positionData,
    quoteStatus,
    selectedTickerSnapshot,
  } = useSelector((st) => st.position);

  useEffect(() => {
    if (selectedTickerSnapshot) {
      setSnapshot(selectedTickerSnapshot);
    }
  }, [selectedTickerSnapshot]);

  useEffect(() => {
    if (quoteStatus !== "completed" && snapshot) {
      setSnapshot(null);
    }
  }, [quoteStatus]);

  const formatNumber = (num: string) => {
    let formattedNum = parseFloat(num).toLocaleString("en-US");
    return parseFloat(formattedNum).toFixed(2);
  };

  return (
    <Drawer isOpen={isOpen} onClose={onClose} placement="bottom">
      <DrawerOverlay />

      <DrawerContent bg={bg}>
        {positionData ? (
          <React.Fragment>
            <DrawerCloseButton onClick={onClose} />
            <DrawerHeader>
              <Flex lineHeight={1} align="end" flexWrap="wrap">
                <Flex align="end" flexWrap="wrap">
                  <Text mr=".5rem" fontWeight="600">
                    {positionData.symbol}
                  </Text>
                  <Text variant="secondary" fontSize="md" fontWeight="500">
                    {positionData.exchange}
                  </Text>
                </Flex>

                {snapshot && quoteStatus === "completed" ? (
                  <TickerQuote
                    quote={snapshot.latestQuote}
                    trade={snapshot.latestTrade}
                  />
                ) : null}
              </Flex>
            </DrawerHeader>

            <DrawerBody></DrawerBody>
          </React.Fragment>
        ) : (
          <Text
            textAlign="center"
            fontWeight="600"
            color={isDark ? "red.300" : "red.600"}
          >
            Could not retrieve position positionData
          </Text>
        )}

        <DrawerFooter>
          {/* <Button>Sell</Button>
          <Button>Buy</Button> */}
          <BuySellButtons />
          <Button size="sm" h="26px" ml="1rem">
            Close Position
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default PositionDrawer;

const TickerQuote = ({ quote, trade }: { quote: Quote; trade: any }) => {
  // bid, ask, last, Chg ($)
  if (quote.ap === 0 || quote.bp === 0) {
    return <NoQuote />;
  }

  return (
    <Wrap flex={1} spacingX="1rem" spacingY="4px" mx="1.5rem" fontSize="sm">
      <WrapItem>
        <Flex>
          <Text fontWeight="400">Bid:</Text>
          <Text ml="4px" fontWeight="700">
            ${quote.bp.toFixed(2)}
          </Text>
        </Flex>
      </WrapItem>

      <WrapItem>
        <Flex>
          <Text fontWeight="400">Ask:</Text>
          <Text ml="4px" fontWeight="700">
            ${quote.ap.toFixed(2)}
          </Text>
        </Flex>
      </WrapItem>

      <WrapItem>
        <Flex>
          <Text fontWeight="400">Latest Trade:</Text>
          <Text ml="4px" fontWeight="700">
            ${trade.p.toFixed(2)}
          </Text>
        </Flex>
      </WrapItem>
    </Wrap>
  );
};

const NoQuote = () => {
  return (
    <Text textAlign="center" fontWeight="600" fontSize="lg">
      No Quote Available
    </Text>
  );
};

const DataPoint = ({ label, value }: { label: string; value: string }) => {
  const { colorMode } = useColorMode();
  const isDark = colorMode === "dark";

  return (
    <WrapItem>
      <Flex
        direction="column"
        fontSize="sm"
        maxW={{ base: "150px", sm: "170px", md: "200px" }}
      >
        <Text
          fontWeight="500"
          borderBottom="1px solid"
          borderColor={isDark ? "gray.600" : "gray.200"}
          mb="4px"
        >
          {label}
        </Text>
        <Text textTransform="capitalize">{value}</Text>
      </Flex>
    </WrapItem>
  );
};

{
  /* <Wrap spacingX="1.5rem" spacingY=".5rem">
                <DataPoint
                  label="Cost Basis"
                  value={"$" + formatNumber(positionData.cost_basis)}
                />
                <DataPoint
                  label="Mkt Value"
                  value={"$" + formatNumber(positionData.market_value)}
                />
                <DataPoint
                  label="Avg Entry Price"
                  value={"$" + formatNumber(positionData.avg_entry_price)}
                />
                <DataPoint label="Qty" value={positionData.qty} />
                <DataPoint label="Side" value={positionData.side} />
                <DataPoint
                  label="Unrealized P/(L)"
                  value={"$" + formatNumber(positionData.unrealized_pl)}
                />
                <DataPoint
                  label="Unrealized P/(L)%"
                  value={formatNumber(positionData.unrealized_plpc) + "%"}
                />
                <DataPoint
                  label="Unrealized Intraday P/(L)"
                  value={
                    "$" + formatNumber(positionData.unrealized_intraday_pl)
                  }
                />
                <DataPoint
                  label="Unrealized Intraday P/(L)%"
                  value={
                    formatNumber(positionData.unrealized_intraday_plpc) + "%"
                  }
                />
              </Wrap>  */
}
