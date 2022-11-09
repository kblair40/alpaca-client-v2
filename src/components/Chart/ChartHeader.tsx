import { useEffect } from "react";
import { Box, Flex, Text } from "@chakra-ui/react";

import { fetchTickerData } from "store/chartSlice";
import useSelector from "hooks/useSelector";
import useDispatch from "hooks/useDispatch";

const emptyData = {
  symbol: "n/a",
  exchange: "",
};

const ChartHeader = () => {
  const { ticker } = useSelector((st) => st.chart);
  const dispatch = useDispatch();

  const data = ticker ? ticker : emptyData;

  useEffect(() => {
    if (ticker) {
      dispatch(fetchTickerData(ticker.symbol));
    }
  }, [ticker, dispatch]);

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
