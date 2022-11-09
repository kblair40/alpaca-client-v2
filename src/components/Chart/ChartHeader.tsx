import { useEffect, useState } from "react";
import { Box, Flex, Text, useColorModeValue } from "@chakra-ui/react";

import { fetchTickerData } from "store/chartSlice";
import useSelector from "hooks/useSelector";
import useDispatch from "hooks/useDispatch";
import { latest } from "immer/dist/internal";

const emptyTickerData = {
  symbol: "n/a",
  exchange: "",
};
const emptyPerformance = {
  numeric: null,
  percent: null,
};

interface Performance {
  numeric: string | null;
  percent: string | null;
}

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

  const { ticker, status, error, data } = useSelector((st) => st.chart);
  const dispatch = useDispatch();

  const tickerData = ticker ? ticker : emptyTickerData;

  useEffect(() => {
    if (status === "completed" && data && data.snapshot) {
      setSnapshot(data.snapshot);
      const { latestQuote, dailyBar } = data.snapshot;
      if (latestQuote && dailyBar) {
        const dayOpen = dailyBar.o;
        const curPrice = latestQuote.ap; // ask price
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
      dispatch(fetchTickerData(ticker.symbol));
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
      <Flex
        align="end"
        lineHeight={1}
        // border="1px solid white"
      >
        <Text fontSize="xl" fontWeight="600">
          {tickerData.symbol}
        </Text>

        <Text
          mx="1rem"
          fontWeight="500"
          fontSize="sm"
          color={perfTextColors.neutral}
        >
          {lastPrice ? `$${lastPrice.price}` : null}
        </Text>

        <Text fontWeight="500" fontSize="sm" color={perfTextColors.neutral}>
          As of {lastPrice ? `${lastPrice.date} at ${lastPrice.time}` : null}
        </Text>
      </Flex>

      <Text fontWeight="300">{tickerData.exchange}</Text>

      {/* <Flex direction="column">
        <Text fontWeight="500" fontSize="sm" color={perfTextColors.neutral}>
          {lastPrice ? `$${lastPrice.price}` : null}
        </Text>

        <Text fontWeight="500" fontSize="sm" color={perfTextColors.neutral}>
          As of{" "}
          {lastPrice
            ? `${new Date(lastPrice.timestamp).toLocaleString()}`
            : null}
        </Text>
      </Flex> */}

      <Flex>
        <Text mr="1rem" fontWeight="500" fontSize="sm" color={textColor}>
          {dayPerformance.numeric ? `${dayPerformance.numeric}` : null}
        </Text>

        <Text fontWeight="500" fontSize="sm" color={textColor}>
          {dayPerformance.percent ? `${dayPerformance.percent}%` : null}
        </Text>
      </Flex>
    </Flex>
  );
};

export default ChartHeader;
