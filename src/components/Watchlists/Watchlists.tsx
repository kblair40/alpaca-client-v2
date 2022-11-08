import { useEffect, useState } from "react";
import { Box, Center, Spinner, Stack } from "@chakra-ui/react";

import { fetchWatchlists } from "store/watchlistSlice";
import useDispatch from "hooks/useDispatch";
import useSelector from "hooks/useSelector";
import { IWatchlist } from "utils/types/watchlist";
import Watchlist from "./Watchlist";
import { alpaca } from "api";

const Watchlists = () => {
  const [loading, setLoading] = useState(true);
  const [watchlists, setWatchlists] = useState<IWatchlist[]>();

  const dispatch = useDispatch();
  const { data, status } = useSelector((st) => st.watchlist);
  console.log("\n\nDATA/STATUS:", { data, status }, "\n\n");

  useEffect(() => {
    dispatch(fetchWatchlists());
  }, []);

  useEffect(() => {
    console.log("\nNEW DATA:", data, "\n");
  }, [data]);

  useEffect(() => {
    const fetchWatchlists = async () => {
      try {
        const response = await alpaca.get("/watchlists");
        console.log("MY WATCHLISTS RESPONSE:", response.data);
        setWatchlists(response.data);
      } catch (e) {
        console.log("FAILED FETCHING WATCHLIST:", e);
        setWatchlists([]);
      }

      setLoading(false);
    };

    fetchWatchlists();
  }, []);

  if (loading) {
    return (
      <Center h="120px">
        <Spinner />
      </Center>
    );
  }

  return (
    <Box>
      {watchlists && watchlists.length ? (
        <Stack>
          {watchlists.map((wl, i) => {
            return <Watchlist key={i} watchlist={wl} />;
          })}
        </Stack>
      ) : (
        <Box>
          <Box>
            Do culpa amet commodo aliqua qui cillum nostrud laboris non
            exercitation adipisicing duis do.
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default Watchlists;
