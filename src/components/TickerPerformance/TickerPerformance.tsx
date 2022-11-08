import { Box, Flex, Text, useColorMode } from "@chakra-ui/react";

type Props = {};

const TickerPerformance = (props: Props) => {
  const { colorMode } = useColorMode();
  const isDark = colorMode === "dark";

  const positiveColor = isDark ? "green.300" : "green.500";
  const negativeColor = isDark ? "red.300" : "red.500";

  const bg = isDark ? "gray.800" : "gray.100";

  return (
    <Box borderRadius={{ base: "3px", md: "6px" }} p="6px" bg={bg}>
      <Flex justify="space-between">
        <Text fontSize="sm" fontWeight="600" textTransform={"uppercase"}>
          AAPL
        </Text>
        <Text fontSize="sm" fontWeight="600" color={positiveColor}>
          +717.11
        </Text>
      </Flex>
    </Box>
  );
};

export default TickerPerformance;
