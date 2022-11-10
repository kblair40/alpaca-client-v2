import {
  Box,
  Text,
  Flex,
  Stack,
  Tooltip,
  useColorMode,
} from "@chakra-ui/react";

import { IWatchlist, IWatchlistAsset } from "utils/types/watchlist";
import WatchlistMenu from "./WatchlistMenu";
import useDispatch from "hooks/useDispatch";
import useSelector from "hooks/useSelector";
import useCalendar from "hooks/useCalendar";
import { chartActions } from "store/chartSlice";

type Props = {
  watchlist: IWatchlist;
};

const Watchlist = ({ watchlist: wl }: Props) => {
  const { colorMode } = useColorMode();
  const isDark = colorMode === "dark";

  const dispatch = useDispatch();
  const { prices } = useSelector((st) => st.watchlist);
  const { data: clockData } = useSelector((st) => st.calendar);
  const marketIsOpen = clockData && clockData.clock && clockData.clock.is_open;

  const { isTradingDay, isAfterClose, isBeforeOpen } = useCalendar();
  const positiveColor = isDark ? "green.300" : "green.500";
  const negativeColor = isDark ? "red.300" : "red.500";
  const mainBg = isDark ? "gray.800" : "gray.50";

  const handleClickTicker = (ticker: IWatchlistAsset) => {
    dispatch(chartActions.setTicker(ticker));
  };

  const getAssetPerformance = (
    symbol: string
  ): [null, null] | [string, number] => {
    if (!prices || !prices[symbol]) return [null, null];
    let priceData = prices[symbol];
    // console.log("\n\nRELEVANT PRICE DATA:", symbol, priceData);
    let price, startPrice, endPrice;
    if (isTradingDay && !isBeforeOpen && isAfterClose) {
      // it's a trading day, but the market is now closed
      // use close price from dailyBar for price
      price = priceData.dailyBar?.c;
      startPrice = priceData.dailyBar?.o;
      endPrice = priceData.dailyBar?.c;
    } else if (isTradingDay && isBeforeOpen) {
      // It is a trading day, but the market has not yet opened.
      // use close price from prevDailyBar
      price = priceData.prevDailyBar.c;
      startPrice = priceData.prevDailyBar?.o;
      endPrice = priceData.prevDailyBar?.c;
    } else if (isTradingDay && !isAfterClose && !isBeforeOpen && marketIsOpen) {
      // The market is currently open, use close price from minuteBar
      price = priceData.minuteBar.c;
      startPrice = priceData.dailyBar?.o;
      endPrice = priceData.minuteBar?.c;
    } else if (!marketIsOpen && !isTradingDay) {
      // Today is not a day the market will/did open
      // I think prevDailyBar.c makes most sense, but it's possible it won't work...
      //   ex. on Sunday, would it return price data from Saturday? Because that won't work.
      //   TODO: Find answer to question above
      price = priceData.prevDailyBar.c;
      startPrice = priceData.prevDailyBar?.o;
      endPrice = priceData.prevDailyBar?.c;
    }

    const performance = ((startPrice - endPrice) / startPrice) * 100;
    console.log("PERFORMANCE:", performance);

    return [price, parseFloat(performance.toFixed(2))];
    // return price;
  };

  return (
    <Box p="8px 8px 16px" bg={mainBg}>
      <Flex justify="space-between">
        <Text fontSize="sm" fontWeight="600">
          {wl.name || "Unnamed Watchlist"}
        </Text>
        <WatchlistMenu id={wl.id} name={wl.name} />
      </Flex>

      <Stack mt=".75rem">
        {wl.assets && wl.assets.length && prices ? (
          wl.assets.map((asset, i) => {
            let [price, performance] = getAssetPerformance(asset.symbol);
            // let price = getPrice(asset.symbol);

            // let price = `$${prices[asset.symbol]?.ap?.toFixed(2)}`;
            return (
              <Flex
                key={i}
                lineHeight={1}
                cursor="pointer"
                onClick={() => handleClickTicker(asset)}
              >
                <Tooltip label={asset.name}>
                  <Text flex={1} fontSize="13px" fontWeight="500">
                    {asset.symbol}
                  </Text>
                </Tooltip>

                <Text
                  textAlign="center"
                  flex={1}
                  fontSize="xs"
                  fontWeight="500"
                >
                  {`$${price || "n/a"}`}
                </Text>

                <Text
                  color={
                    performance && performance >= 0
                      ? positiveColor
                      : negativeColor
                  }
                  flex={1}
                  fontSize="xs"
                  fontWeight="500"
                  textAlign="right"
                >
                  {performance ? `${performance}%` : "n/a"}
                </Text>
              </Flex>
            );
          })
        ) : (
          <Text
            textAlign="center"
            fontSize="sm"
            fontWeight="500"
            letterSpacing={".3px"}
          >
            NO ASSETS
          </Text>
        )}
      </Stack>
    </Box>
  );
};

export default Watchlist;
