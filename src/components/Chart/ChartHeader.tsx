import { useEffect, useState } from "react";
import { Flex, Text, useColorModeValue } from "@chakra-ui/react";

import { fetchTickerData } from "store/chartSlice";
import useSelector from "hooks/useSelector";
import useDispatch from "hooks/useDispatch";
import PerformanceChip from "./PerformanceChip";
import SelectTimeframe from "./SelectTimeframe";

const emptyTickerData = {
  symbol: "n/a",
  exchange: "",
  name: "",
};
const emptyPerformance = {
  numeric: null,
  percent: null,
};

export type Performance = {
  numeric: string | null;
  percent: string | null;
};

const ChartHeader = () => {
  const [snapshot, setSnapshot] = useState<any>();
  const [dayPerformance, setDayPerformance] =
    useState<Performance>(emptyPerformance);
  const [isGain, setIsGain] = useState<boolean | null>(null);
  const [lastPrice, setLastPrice] = useState<null | {
    date: string;
    time: string;
    price: string;
  }>();

  const perfTextColors = useColorModeValue(
    { positive: "green.500", negative: "red.500", neutral: "gray.700" },
    { positive: "green.300", negative: "red.300", neutral: "gray.50" }
  );

  const { ticker, status, timeframe, data } = useSelector((st) => st.chart);
  const dispatch = useDispatch();

  const tickerData = ticker ? ticker : emptyTickerData;

  useEffect(() => {
    if (status === "completed" && data && data.snapshot) {
      setSnapshot(data.snapshot);
      const { latestQuote, dailyBar } = data.snapshot;
      if (latestQuote && dailyBar) {
        const dayOpen = dailyBar.o;
        const curPrice = latestQuote.bp; // ask price
        const perfPercent = (((curPrice - dayOpen) / dayOpen) * 100).toFixed(3);
        const perfNumeric = (curPrice - dayOpen).toFixed(3);
        setDayPerformance({ numeric: perfNumeric, percent: perfPercent });
        setIsGain(parseFloat(perfNumeric) > 0);
        let rawDate = new Date(latestQuote.t).toLocaleString();
        // console.log("RAW DATE:", rawDate);
        let [date, time] = rawDate.split(",");
        // console.log("DATETIME:", { date, time });

        setLastPrice({ price: curPrice.toFixed(3), date, time });
      }
    }
  }, [status, data]);

  useEffect(() => {
    if (ticker) {
      dispatch(
        fetchTickerData({ symbol: ticker.symbol, timeframe: timeframe })
      );
    }
  }, [ticker, dispatch]);

  let textColor =
    isGain === null
      ? perfTextColors.neutral
      : isGain
      ? perfTextColors.positive
      : perfTextColors.negative;

  return (
    <Flex direction="column">
      <Flex align="end" lineHeight={1}>
        <Text fontSize="xl" fontWeight="600">
          {tickerData.symbol}
        </Text>

        <Text
          ml="1rem"
          mr=".5rem"
          fontWeight="500"
          color={perfTextColors.neutral}
        >
          {lastPrice ? `$${lastPrice.price}` : null}
        </Text>

        <Text
          fontWeight="500"
          fontSize="xs"
          variant="secondary"
          fontStyle="italic"
        >
          Last updated{" "}
          {lastPrice ? `${lastPrice.date} at ${lastPrice.time}` : null}
        </Text>
      </Flex>

      <Flex mt="8px" mb=".5rem">
        <Text fontWeight="500" fontSize="sm">
          {tickerData.exchange}
        </Text>
        <Text mx=".5rem">&bull;</Text>
        <Text fontWeight="500" fontSize="sm">
          {tickerData.name}
        </Text>
      </Flex>

      {dayPerformance && (dayPerformance.numeric || dayPerformance.percent) ? (
        <PerformanceChip performance={dayPerformance} status={status} />
      ) : null}

      <SelectTimeframe />
    </Flex>
  );
};

export default ChartHeader;
