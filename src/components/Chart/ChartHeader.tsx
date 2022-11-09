import { Box, Flex, Text } from "@chakra-ui/react";

import useSelector from "hooks/useSelector";

const emptyData = {
  symbol: "n/a",
  exchange: "",
};

const ChartHeader = () => {
  const { ticker } = useSelector((st) => st.chart);

  const data = ticker ? ticker : emptyData;

  return (
    <Flex direction="column">
      <Text fontSize="xl" fontWeight="600">
        {data.symbol}
      </Text>

      <Text fontWeight="300">{data.exchange}</Text>
    </Flex>
  );
};

export default ChartHeader;
