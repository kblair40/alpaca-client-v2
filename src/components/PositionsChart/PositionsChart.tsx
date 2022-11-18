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

import useDispatch from "hooks/useDispatch";
import useSelector from "hooks/useSelector";
import CustomPieChart from "./CustomPieChart";
import { fetchAccount } from "store/accountSlice";
import {
  darkModeChartColors as darkColors,
  lightModeChartColors as lightColors,
} from "utils/constants";

type DataPoint = { string: string; number: number };
type BalanceChartData = {
  Cash: DataPoint;
  Stocks: DataPoint;
  Short: DataPoint;
};
type PositionChartData = { [key: string]: DataPoint };
export type ChartData = {
  [key: string]: string | number;
  name: string;
  legendValue: string;
  value: number;
  color: string;
};

const PositionsChart = () => {
  const [allChartData, setAllChartData] = useState<ChartData[]>();
  const [stocksChartData, setStocksChartData] = useState<ChartData[]>();

  const COLORS = useColorModeValue(lightColors, darkColors);

  const dispatch = useDispatch();
  const { data: accountData, status: accountStatus } = useSelector(
    (st) => st.account
  );
  const {
    data: positionData,
    // status: positionStatus
  } = useSelector((st) => st.position);

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

  useEffect(() => {
    dispatch(fetchAccount());
  }, [dispatch]);

  useEffect(() => {
    if (!positionData) return;

    console.log("\n\nALL COLORS:", COLORS, "\n\n");

    let totalValue = 0;
    let chartData = [];
    for (let i = 0; i < positionData.length; i++) {
      const position = positionData[i];
      // console.log("POSITION:", position);
      const name = position.symbol;
      const legendValue = convertToCurrency(position.market_value);
      const value = parseFloat(position.market_value);
      totalValue += value;
      const color = COLORS[i % COLORS.length];
      // console.log("COLOR:", color);
      chartData.push({ name, value, legendValue, color });
    }

    // do not render any stock that makes up less than 1% of the total portfolio value
    chartData = chartData.filter((data) => data.value > totalValue * 0.01);
    setStocksChartData(chartData);
  }, [positionData]);

  useEffect(() => {
    if (accountData) {
      let {
        cash: cashValue,
        long_market_value: stocksValue,
        short_market_value: shortValue,
      } = accountData;

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

    let totalValue = 0;
    for (let i = 0; i < entriesArray.length; i++) {
      let [key, val] = entriesArray[i];
      let name = key;
      let value = val.number; // give chart raw number to work with
      totalValue += value;
      let legendValue = val.string; // show formatted string in legend
      let color = COLORS[i % COLORS.length];
      chartData.push({ name, value, legendValue, color });
    }
    setAllChartData(chartData.filter((data) => data.value > totalValue * 0.01));
    // setMinAllowedAllValue(totalValue * 0.01);
  };

  const containerWidth = useBreakpointValue({
    base: "180px",
    sm: "220px",
    md: "340px",
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

  const chartWrapperProps = {
    width: containerWidth,
    maxH: "100%",
    overflowY: "hidden",
    minW: "180px",
  };

  return (
    <Flex h="100%" justify="center" w="100vw" maxW="100vw">
      {/* @ts-ignore */}
      <Box mr={{ base: "1rem", sm: "2rem" }} {...chartWrapperProps}>
        {allChartData && <CustomPieChart data={allChartData} label="All" />}
      </Box>

      {/* @ts-ignore */}
      <Box display={{ base: "none", sm: "block" }} {...chartWrapperProps}>
        {stocksChartData && (
          <CustomPieChart data={stocksChartData} label="Stocks" />
        )}
      </Box>
    </Flex>
  );
};

export default PositionsChart;
