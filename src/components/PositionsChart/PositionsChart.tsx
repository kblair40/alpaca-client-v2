import { useEffect, useState } from "react";
import { Box, Spinner, Center, Flex, Text } from "@chakra-ui/react";

import useDispatch from "hooks/useDispatch";
import useSelector from "hooks/useSelector";
import { fetchAccount } from "store/accountSlice";

type PositionsChartData = {
  cashValue: number;
  stocksValue: number;
};

const PositionsChart = () => {
  const [chartData, setChartData] = useState<PositionsChartData>();

  const dispatch = useDispatch();
  const { data: accountData, status: accountStatus } = useSelector(
    (st) => st.account
  );

  useEffect(() => {
    dispatch(fetchAccount());
  }, [dispatch]);

  useEffect(() => {}, []);

  if (accountStatus === "loading") {
    return (
      <Center h="120px">
        <Spinner />
      </Center>
    );
  }

  if (!accountData) return <Text>NO DATA</Text>;

  return <div>PositionsChart</div>;
};

export default PositionsChart;
