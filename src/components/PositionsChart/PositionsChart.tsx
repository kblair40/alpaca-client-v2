import { useEffect, useState } from "react";
import {
  Box,
  Spinner,
  Center,
  Flex,
  Text,
  useBreakpointValue,
} from "@chakra-ui/react";

// import { type IAccount } from "utils/types/account";
import useDispatch from "hooks/useDispatch";
import useSelector from "hooks/useSelector";
import CustomPieChart from "./CustomPieChart";
import { fetchAccount } from "store/accountSlice";

type BalanceChartData = {
  cashValue: string;
  stocksValue: string;
  shortValue: string;
};

const PositionsChart = () => {
  const [chartData, setChartData] = useState<BalanceChartData>();

  const dispatch = useDispatch();
  const { data: accountData, status: accountStatus } = useSelector(
    (st) => st.account
  );

  useEffect(() => {
    dispatch(fetchAccount());
  }, [dispatch]);

  useEffect(() => {
    if (accountData) {
      let {
        cash: cashValue,
        long_market_value: stocksValue,
        short_market_value: shortValue,
      } = accountData;

      let options = {
        currency: "USD",
        currencyDisplay: "narrowSymbol",
        currencySign: "accounting",
        style: "currency",
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      };

      cashValue = parseFloat(cashValue).toLocaleString("en-US", options);
      stocksValue = parseFloat(stocksValue).toLocaleString("en-US", options);
      shortValue = parseFloat(shortValue).toLocaleString("en-US", options);
      setChartData({ cashValue, stocksValue, shortValue });
    }
  }, [accountData]);

  const containerBoxSize = useBreakpointValue({
    base: "160px",
    sm: "220px",
    md: "300px",
    lg: "400px",
  });

  if (accountStatus === "loading") {
    return (
      <Center h="120px">
        <Spinner />
      </Center>
    );
  }

  if (!accountData) return <Text>NO DATA</Text>;

  return (
    <Flex>
      <Box border="1px solid white" boxSize={containerBoxSize}>
        <CustomPieChart />
      </Box>
    </Flex>
  );
};

export default PositionsChart;
