import { useEffect, useState } from "react";
import { Box, Flex, Text, Stack, useColorModeValue } from "@chakra-ui/react";

import { fetchCorporateActions } from "store/corporateActionsSlice";
import useSelector from "hooks/useSelector";
import useDispatch from "hooks/useDispatch";

const TickerDetail = () => {
  const [snapshot, setSnapshot] = useState<any>(null);
  const [data, setData] = useState<any>(null);
  const [corporateActions, setCorporateActions] = useState<any>(null);

  const dispatch = useDispatch();

  const bg = useColorModeValue("gray.100", "gray.800");

  const { ticker, data: tickerData, asset } = useSelector((st) => st.chart);
  const { data: corpActionsData, status: corpActionsStatus } = useSelector(
    (st) => st.corporateActions
  );

  useEffect(() => {
    dispatch(fetchCorporateActions());
  }, [dispatch]);

  useEffect(() => {
    if (corpActionsData) {
      console.log("\nCORPORATE ACTIONS:", corpActionsData);
    }
  }, [corpActionsData]);

  useEffect(() => {
    if (tickerData && tickerData.snapshot) {
      setSnapshot(tickerData.snapshot);
    }
    if (ticker) {
      setData(ticker);
    }
  }, [ticker, tickerData]);

  return (
    <Box p="1rem" bg={bg} mt="1rem" borderRadius="12px">
      <Flex>
        <Text fontWeight="600">{ticker ? ticker.symbol : ""}</Text>
      </Flex>
    </Box>
  );
};

export default TickerDetail;
