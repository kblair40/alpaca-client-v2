import { useEffect, useState } from "react";
import {
  Box,
  Spinner,
  Center,
  Flex,
  Text,
  useBreakpointValue,
  useColorModeValue,
} from "@chakra-ui/react";
import { Scrollbars } from "react-custom-scrollbars-2";

// import { type IAccount } from "utils/types/account";
import useDispatch from "hooks/useDispatch";
import useSelector from "hooks/useSelector";
import CustomPieChart from "./CustomPieChart";
import { fetchAccount } from "store/accountSlice";
import {
  darkModeChartColors as darkColors,
  lightModeChartColors as lightColors,
} from "utils/constants";

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
  color: string;
};

const PositionsChart = () => {
  const [chartData, setChartData] = useState<ChartData[]>();

  const COLORS = useColorModeValue(lightColors, darkColors);

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

  const makeBalanceChartData = (data: BalanceChartData) => {
    let chartData = [];
    const entriesArray = Object.entries(data);
    // for (let [key, val] of Object.entries(data)) {
    for (let i = 0; i < entriesArray.length; i++) {
      let [key, val] = entriesArray[i];
      let name = key;
      let value = val.number; // give chart raw number to work with
      let legendValue = val.string; // show formatted string in legend
      let color = COLORS[i % COLORS.length];
      chartData.push({ name, value, legendValue, color });
    }
    setChartData(chartData);
  };

  const containerWidth = useBreakpointValue({
    base: "180px",
    sm: "220px",
    md: "320px",
    lg: "360px",
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
    <Flex
      h="100%"
      // border="1px solid #777"
      justify={{ base: "center", sm: "start" }}
      //
    >
      <Box
        mr={{ base: "1rem", sm: "2rem" }}
        // border=".1px solid white"
        width={containerWidth}
      >
        {chartData && <CustomPieChart data={chartData} label="All" />}
      </Box>

      <Box
        // border=".1px solid white"
        width={containerWidth}
        // overflowY="auto"
        overflowX="hidden"
        display={{ base: "none", sm: "block" }}
      >
        <Scrollbars thumbSize={20}>
          {chartData && (
            <CustomPieChart
              data={chartData
                .concat(chartData)
                .concat(chartData)
                .concat(chartData)
                .concat(chartData)
                .concat(chartData)
                .concat(chartData)}
              label="Stocks"
            />
          )}
        </Scrollbars>
      </Box>
    </Flex>
  );
};

export default PositionsChart;
