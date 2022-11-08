import {
  Box,
  Flex,
  Text,
  useColorMode,
  useBreakpointValue,
} from "@chakra-ui/react";

type Props = {};

const TickerPerformance = (props: Props) => {
  const { colorMode } = useColorMode();
  const isDark = colorMode === "dark";

  const positiveColor = isDark ? "green.300" : "green.500";
  const negativeColor = isDark ? "red.300" : "red.500";

  const bg = isDark ? "gray.900" : "gray.100";

  const textColor = positiveColor;

  const smTextProps = {
    fontSize: "sm",
    lineHeight: 1,
  };
  const xsTextProps = {
    fontSize: "xs",
    fontWeight: "600",
    lineHeight: 1,
  };

  return (
    <Box borderRadius={{ base: "3px", md: "6px" }} p="8px" bg={bg}>
      <Flex align="center" justify="space-between">
        <Text {...smTextProps} fontWeight="700">
          AAPL
        </Text>
        <Text {...smTextProps} fontWeight="600" color={textColor}>
          +717.11
        </Text>
      </Flex>

      <Flex align="center" mt="6px" justify="space-between">
        <Text {...xsTextProps}>23,215.39</Text>
        <Text {...xsTextProps} color={textColor}>
          (+2.706%)
        </Text>
      </Flex>
    </Box>
  );
};

export default TickerPerformance;
