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

// type BalanceChartData = {
//   cashValue: string;
//   stocksValue: string;
//   shortValue: string;
// };
type DataPoint = { string: string; number: number };
type BalanceChartData = {
  Cash: DataPoint;
  Stocks: DataPoint;
  Short: DataPoint;
  // Cash: string;
  // Stocks: string;
  // Short: string;
};

export type ChartData = {
  [key: string]: string | number;
  name: string;
  legendValue: string;
  value: number;
};

const PositionsChart = () => {
  const [chartData, setChartData] = useState<ChartData[]>();

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

      const convertToCurrency = (num: string) => {
        return parseFloat(num).toLocaleString("en-US", options);
      };

      makeBalanceChartData({
        Cash: {
          string: convertToCurrency(cashValue),
          number: parseFloat(cashValue),
        },
        Stocks: {
          string: convertToCurrency(stocksValue),
          number: parseFloat(stocksValue),
        },
        Short: {
          string: convertToCurrency(shortValue),
          number: parseFloat(shortValue),
        },
      });
    }
  }, [accountData]);

  // const makeBalanceChartData = (data: any) => {
  const makeBalanceChartData = (data: BalanceChartData) => {
    let chartData = [];
    for (let [key, val] of Object.entries(data)) {
      console.log(
        "\n\nVAL:",
        { val, parsed: val.string, type: typeof val },
        "\n\n"
      );
      let name = key;
      // let value = parseFloat(val); // give chart raw number to work with
      let value = val.number; // give chart raw number to work with
      let legendValue = val.string; // show formatted string in legend
      chartData.push({ name, value, legendValue });
    }
    setChartData(chartData);
  };

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
        {chartData && <CustomPieChart data={chartData} />}
      </Box>
    </Flex>
  );
};

export default PositionsChart;
