import {
  Box,
  Text,
  Flex,
  Stack,
  Tooltip,
  useColorMode,
} from "@chakra-ui/react";
import dayjs from "dayjs";

import { IWatchlist, IWatchlistAsset } from "utils/types/watchlist";
import WatchlistMenu from "./WatchlistMenu";
import useDispatch from "hooks/useDispatch";
import useSelector from "hooks/useSelector";
import useCalendar from "hooks/useCalendar";
import { chartActions } from "store/chartSlice";
import { getDidClose } from "utils/dateHelpers";

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

  const { isTradingDay } = useCalendar();
  // const positiveColor = isDark ? "green.300" : "green.500";
  const negativeColor = isDark ? "red.300" : "red.500";
  const mainBg = isDark ? "gray.800" : "gray.50";

  const handleClickTicker = (ticker: IWatchlistAsset) => {
    dispatch(chartActions.setTicker(ticker));
  };

  const getPerformance = (symbol: string) => {
    // use dailyBar.o as starting point if marketIsOpen
  };

  const getPrice = (symbol: string) => {
    if (!prices || !prices[symbol]) return undefined;
    let priceData = prices[symbol];
    console.log("\n\nRELEVANT PRICE DATA:", symbol, priceData);
    let price;
    if (marketIsOpen) {
      price = priceData.minuteBar?.c;
    } else if (!marketIsOpen && isTradingDay) {
      // It is a trading day, but the market is closed.
      // It must be either before the time the market opens, or time after market closes
      // let didClose = getDidClose();
      // let isBeforeOpen = false;
      // if (clockData?.clock && clockData.clock.next_open) {
      //   const { next_open, next_close } = clockData.clock;
      //   if (dayjs().isBefore(next_open)) isBeforeOpen = true;
      // }
    }

    return price;
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
            let price = getPrice(asset.symbol);
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
                  {`$${price}`}
                </Text>

                <Text
                  color={negativeColor}
                  flex={1}
                  fontSize="xs"
                  fontWeight="500"
                  textAlign="right"
                >
                  -0.19%
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
