import React from "react";
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

import useSelector from "hooks/useSelector";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

const PositionDrawer = ({ isOpen, onClose }: Props) => {
  const { colorMode } = useColorMode();
  const isDark = colorMode === "dark";

  const bg = isDark ? "gray.800" : "gray.50";

  const { selectedTickerPosition: data } = useSelector((st) => st.position);

  const formatNumber = (num: string) => {
    let formattedNum = parseFloat(num).toLocaleString("en-US");
    return parseFloat(formattedNum).toFixed(2);
  };

  return (
    <Drawer isOpen={isOpen} onClose={onClose} placement="bottom">
      <DrawerOverlay />

      <DrawerContent bg={bg}>
        {data ? (
          <React.Fragment>
            <DrawerCloseButton onClick={onClose} />
            <DrawerHeader pt="1rem" pb={0}>
              <Flex lineHeight={1} align="end">
                <Text mr=".5rem" fontSize="xl" fontWeight="600">
                  {data.symbol}
                </Text>
                <Text variant="secondary" fontSize="md" fontWeight="500">
                  {data.exchange}
                </Text>
              </Flex>
            </DrawerHeader>

            <DrawerBody>
              <Wrap spacingX="1.5rem" spacingY=".5rem">
                <DataPoint
                  label="Cost Basis"
                  value={"$" + formatNumber(data.cost_basis)}
                />
                <DataPoint
                  label="Mkt Value"
                  value={"$" + formatNumber(data.market_value)}
                />
                <DataPoint
                  label="Avg Entry Price"
                  value={"$" + formatNumber(data.avg_entry_price)}
                />
                <DataPoint label="Qty" value={data.qty} />
                <DataPoint label="Side" value={data.side} />
                <DataPoint
                  label="Unrealized P/(L)"
                  value={"$" + formatNumber(data.unrealized_pl)}
                />
                <DataPoint
                  label="Unrealized  P/(L)%"
                  value={formatNumber(data.unrealized_plpc) + "%"}
                />
                <DataPoint
                  label="Unrealized Intraday  P/(L)"
                  value={"$" + formatNumber(data.unrealized_intraday_pl)}
                />
                <DataPoint
                  label="Unrealized Intraday  P/(L)%"
                  value={formatNumber(data.unrealized_intraday_plpc) + "%"}
                />
              </Wrap>
            </DrawerBody>
          </React.Fragment>
        ) : (
          <Text
            textAlign="center"
            fontWeight="600"
            color={isDark ? "red.300" : "red.600"}
          >
            Could not retrieve position data
          </Text>
        )}

        <DrawerFooter>
          <Button size="sm" mr="1rem">
            Close
          </Button>
          <Button size="sm">Other</Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default PositionDrawer;

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
