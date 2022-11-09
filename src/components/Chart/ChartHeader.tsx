import { Box, Flex, Text } from "@chakra-ui/react";

import useSelector from "hooks/useSelector";

const emptyData = {
  symbol: "n/a",
  exchange: "",
};

const ChartHeader = () => {
  const { ticker } = useSelector((st) => st.chart);

  return (
    <Flex direction="column">
      <Text fontSize="xl" fontWeight="600">
        {ticker ? ticker.symbol : "n/a"}
      </Text>

      <Text fontWeight="300">{ticker ? ticker.exchange : ""}</Text>
    </Flex>
  );
};

export default ChartHeader;
