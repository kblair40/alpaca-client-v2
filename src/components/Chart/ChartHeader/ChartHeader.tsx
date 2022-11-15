import { useEffect, useState } from "react";
import { Flex, Text, useColorModeValue, Box, Skeleton } from "@chakra-ui/react";

import { type IWatchlistAsset } from "utils/types/watchlist";
import { convertToEasternTime } from "utils/dateHelpers";
import { fetchTickerData, chartActions } from "store/chartSlice";
import useSelector from "hooks/useSelector";
import useDispatch from "hooks/useDispatch";
import useCalendar from "hooks/useCalendar";
import PerformanceChip from "../PerformanceChip";
import SelectTimeframe from "../SelectTimeframe";
import BuySellButtons from "../BuySellButtons";

// const DEFAULT_ASSET: IWatchlistAsset = {
//   id: "b0b6dd9d-8b9b-48a9-ba46-b9d54906e415",
//   class: "us_equity",
//   easy_to_borrow: true,
//   exchange: "NASDAQ",
//   symbol: "AAPL",
//   name: "Apple Inc. Common Stock",
//   // @ts-ignore
//   status: "active",
//   tradable: true,
//   marginable: true,
//   maintenance_margin_requirement: 0,
//   shortable: true,
//   fractionable: true,
// };
const DEFAULT_ASSET: IWatchlistAsset = {
  id: "b28f4066-5c6d-479b-a2af-85dc1a8f16fb",
  class: "us_equity",
  easy_to_borrow: true,
  exchange: "ARCA",
  symbol: "SPY",
  name: "SPDR S&P 500 ETF Trust",
  // @ts-ignore
  status: "active",
  tradable: true,
  marginable: true,
  maintenance_margin_requirement: 0,
  shortable: true,
  fractionable: true,
};

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
  const [dayPerformance, setDayPerformance] =
    useState<Performance>(emptyPerformance);
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

  const { isTradingDay, isAfterClose, isBeforeOpen } = useCalendar();

  const tickerData = ticker ? ticker : emptyTickerData;
  useEffect(() => {
    if (status === "completed" && data && data.snapshot) {
      const { snapshot } = data;
      const { latestQuote, dailyBar, minuteBar, prevDailyBar } = data.snapshot;
      let localLastPrice: { price: string; date: any; time: any } = {
        price: "",
        date: "",
        time: "",
      };

      let startPrice: number = 0;
      let endPrice: number = 0;
      if (latestQuote && dailyBar && minuteBar && prevDailyBar) {
        if (isTradingDay && !isBeforeOpen && isAfterClose) {
          // it's a trading day, but the market is now closed
          let price = snapshot.dailyBar.c;
          startPrice = snapshot.dailyBar.o;
          endPrice = snapshot.dailyBar.c;
          let [date, time] = convertToEasternTime(snapshot.dailyBar.t)
            .toLocaleString()
            .split(",");
          localLastPrice = { price, date, time };
        } else if (isTradingDay && isBeforeOpen) {
          // it's a trading day, but the market has not yet opened
          let price = snapshot.prevDailyBar.c;
          startPrice = snapshot.prevDailyBar.o;
          endPrice = snapshot.prevDailyBar.c;
          let [date, time] = new Date(snapshot.prevDailyBar.t)
            .toLocaleString()
            .split(",");
          localLastPrice = { price, date, time };
        } else if (isTradingDay && !isAfterClose && !isBeforeOpen) {
          // The market is currently open, use close price from minuteBar
          let price = snapshot.minuteBar.c;
          startPrice = snapshot.minuteBar.o;
          endPrice = snapshot.minuteBar.c;
          // let dateValue = snapshot.minuteBar.t;
          let [date, time] = convertToEasternTime(snapshot.minuteBar.t)
            .toLocaleString()
            .split(",");
          localLastPrice = { price, date, time };
        }
        if (startPrice && endPrice) {
          let numericPerformance = (endPrice - startPrice).toFixed(3);
          let percentPerformance = (
            ((startPrice - endPrice) / startPrice) *
            100
          ).toFixed(3);
          setDayPerformance({
            percent: percentPerformance,
            numeric: numericPerformance,
          });
        }
      }
      if (localLastPrice) setLastPrice(localLastPrice);
    }
  }, [status, data, isAfterClose, isBeforeOpen, isTradingDay]);

  useEffect(() => {
    if (ticker) {
      dispatch(
        fetchTickerData({ symbol: ticker.symbol, timeframe: timeframe })
      );
    } else {
      dispatch(chartActions.setTicker(DEFAULT_ASSET));
    }
  }, [ticker, dispatch]);

  const isLoaded = status === "completed";

  return (
    <Flex direction="column">
      <Skeleton isLoaded={isLoaded}>
        <Flex align="end" lineHeight={1}>
          <Text fontSize="2xl" fontWeight="700">
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
            {lastPrice ? `${lastPrice.date} at ${lastPrice.time} ET` : null}
          </Text>
        </Flex>
      </Skeleton>

      <Skeleton
        isLoaded={isLoaded}
        my=".5rem"
        w="100%"
        maxW={!isLoaded ? "260px" : undefined}
      >
        <Flex>
          <Text fontWeight="500" fontSize="sm">
            {tickerData.exchange}
          </Text>
          <Text mx=".5rem">&bull;</Text>
          <Text fontWeight="500" fontSize="sm">
            {tickerData.name}
          </Text>
        </Flex>
      </Skeleton>

      <Flex align="center" my="4px">
        {dayPerformance &&
        (dayPerformance.numeric || dayPerformance.percent) ? (
          <Skeleton w="140px" isLoaded={isLoaded}>
            <PerformanceChip performance={dayPerformance} status={status} />
          </Skeleton>
        ) : null}

        <Box ml="2rem">
          <BuySellButtons />
        </Box>
      </Flex>

      <SelectTimeframe isDisabled={!isLoaded} />
    </Flex>
  );
};

export default ChartHeader;
