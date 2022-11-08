import {
  Box,
  Text,
  Flex,
  Stack,
  Tooltip,
  useColorMode,
} from "@chakra-ui/react";

import { IWatchlist } from "utils/types/watchlist";
import WatchlistMenu from "./WatchlistMenu";

type Props = {
  watchlist: IWatchlist;
};

const Watchlist = ({ watchlist: wl }: Props) => {
  const { colorMode } = useColorMode();
  const isDark = colorMode === "dark";

  // const positiveColor = isDark ? "green.300" : "green.500";
  const negativeColor = isDark ? "red.300" : "red.500";
  const mainBg = isDark ? "gray.800" : "gray.50";

  return (
    <Box p="8px 8px 16px" bg={mainBg}>
      <Flex justify="space-between">
        <Text fontSize="sm" fontWeight="600">
          {wl.name || "Unnamed Watchlist"}
        </Text>
        <WatchlistMenu id={wl.id} />
      </Flex>

      <Stack mt=".75rem">
        {wl.assets && wl.assets.length ? (
          wl.assets.map((asset, i) => {
            return (
              <Flex lineHeight={1} cursor="pointer">
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
                  $83.473
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
            py="1rem"
            textAlign="center"
            fontSize="sm"
            fontWeight="700"
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
