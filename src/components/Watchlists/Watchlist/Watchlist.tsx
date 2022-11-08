import { Box, Text, Flex, Stack, useColorMode } from "@chakra-ui/react";

import { IWatchlist } from "utils/types/watchlist";

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
      <Text fontSize="sm" fontWeight="600">
        {wl.name || "Unnamed Watchlist"}
      </Text>

      <Stack mt=".75rem">
        {wl.assets && wl.assets.length
          ? wl.assets.map((asset, i) => {
              return (
                <Flex
                  lineHeight={1}
                  cursor="pointer"
                  // border="1px solid white"
                >
                  <Text flex={1} fontSize="13px" fontWeight="500">
                    {asset.symbol}
                  </Text>

                  <Text flex={1} fontSize="xs" fontWeight="500">
                    $83.07
                  </Text>

                  <Text
                    color={negativeColor}
                    flex={1}
                    fontSize="xs"
                    fontWeight="500"
                  >
                    -0.19%
                  </Text>
                </Flex>
              );
            })
          : null}
      </Stack>
    </Box>
  );
};

export default Watchlist;
