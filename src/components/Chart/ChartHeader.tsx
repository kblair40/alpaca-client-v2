import { Box, Flex, Text } from "@chakra-ui/react";

type Props = {};

const ChartHeader = (props: Props) => {
  return (
    <Flex direction="column">
      <Text fontSize="xl" fontWeight="600">
        AAPL
      </Text>

      <Text fontWeight="300">NYSE</Text>
    </Flex>
  );
};

export default ChartHeader;
