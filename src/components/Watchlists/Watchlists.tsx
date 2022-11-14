import { useEffect } from "react";
import { Box, Center, Spinner, Stack } from "@chakra-ui/react";

import { fetchWatchlists } from "store/watchlistSlice";
import useDispatch from "hooks/useDispatch";
import useSelector from "hooks/useSelector";
import Watchlist from "./Watchlist";

const Watchlists = () => {
  const dispatch = useDispatch();
  const { data, status } = useSelector((st) => st.watchlist);

  useEffect(() => {
    dispatch(fetchWatchlists());
  }, [dispatch]);

  if (status === "loading") {
    return (
      <Center h="120px">
        <Spinner />
      </Center>
    );
  }

  return (
    <Box border="1px solid purple" overflowX="auto" w="100%">
      {data && data.length ? (
        <Stack direction={{ base: "row", md: "column" }} overflowX="auto">
          {data.map((wl, i) => {
            return <Watchlist key={i} watchlist={wl} />;
          })}
        </Stack>
      ) : null}
    </Box>
  );
};

export default Watchlists;
