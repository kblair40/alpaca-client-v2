import { useEffect, useState } from "react";
import { Box, Flex, Text, Stack, useColorModeValue } from "@chakra-ui/react";

import useSelector from "hooks/useSelector";

const TickerDetail = () => {
  const [snapshot, setSnapshot] = useState<any>(null);
  const [tickerData, setTickerData] = useState<any>(null);

  const bg = useColorModeValue("gray.100", "gray.800");

  const { ticker, data, asset } = useSelector((st) => st.chart);

  useEffect(() => {
    if (data && data.snapshot) {
      setSnapshot(data.snapshot);
    }
    if (ticker) {
      setTickerData(ticker);
    }
  }, [ticker, data]);

  return (
    <Box p="1rem" bg={bg} mt="1rem" borderRadius="12px">
      <Flex>
        <Text fontWeight="600">{ticker ? ticker.symbol : ""}</Text>
      </Flex>
    </Box>
  );
};

export default TickerDetail;
