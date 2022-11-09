import { useEffect, useState } from "react";
import { Box, Flex, Text, useColorModeValue } from "@chakra-ui/react";

import { fetchTickerData } from "store/chartSlice";
import useSelector from "hooks/useSelector";
import useDispatch from "hooks/useDispatch";

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

  const perfTextColors = useColorModeValue(
    { positive: "green.500", negative: "red.500", neutral: "gray.700" },
    { positive: "green.300", negative: "red.300", neutral: "gray.50" }
  );

  // const positiveColor = useColorModeValue("green.300", "green.500");
  // const negativeColor = useColorModeValue("red.300", "red.500");
  // const neutralColor = useColorModeValue("", "");

  const { ticker, status, error, data } = useSelector((st) => st.chart);
  const dispatch = useDispatch();

  const tickerData = ticker ? ticker : emptyTickerData;

  useEffect(() => {
    if (status === "completed" && data && data.snapshot) {
      setSnapshot(data.snapshot);
      const { latestQuote, dailyBar } = data.snapshot;
      if (latestQuote && dailyBar) {
        let dayOpen = dailyBar.o;
        let curPrice = latestQuote.ap; // ask price
        let perfPercent = (((curPrice - dayOpen) / dayOpen) * 100).toFixed(3);
        let perfNumeric = (curPrice - dayOpen).toFixed(3);
        setDayPerformance({ numeric: perfNumeric, percent: perfPercent });
        setIsGain(parseFloat(perfNumeric) > 0);
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
      <Text fontSize="xl" fontWeight="600">
        {tickerData.symbol}
      </Text>

      <Text fontWeight="300">{tickerData.exchange}</Text>

      <Flex>
        <Text fontWeight="500" fontSize="sm" color={textColor}>
          {dayPerformance.numeric ? `$${dayPerformance.numeric}` : null}
        </Text>

        <Text ml="1rem" fontWeight="500" fontSize="sm" color={textColor}>
          {dayPerformance.percent ? `${dayPerformance.percent}%` : null}
        </Text>
      </Flex>
    </Flex>
  );
};

export default ChartHeader;

// t(pin):"2022-11-09T16:34:21.801274112Z"
// ax(pin):"V"
// ap(pin):29.44
// as(pin):4
// bx(pin):"V"
// bp(pin):28
// bs(pin):5
