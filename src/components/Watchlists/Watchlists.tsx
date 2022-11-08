import { useEffect, useState } from "react";
import { Box, Text, Flex, Center, Spinner, Stack } from "@chakra-ui/react";

import { IWatchlist } from "utils/types/watchlist";
import Watchlist from "./Watchlist";
import alpacaApi from "api/alpaca";

const Watchlists = () => {
  const [loading, setLoading] = useState(true);
  const [watchlists, setWatchlists] = useState<IWatchlist[]>();

  useEffect(() => {
    const fetchWatchlists = async () => {
      try {
        const response = await alpacaApi.get("/watchlists");
        console.log("WATCHLIST RESPONSE.DATA:", response.data);

        if (response.data && response.data.length) {
          let promises = [];
          for (let wl of response.data) {
            promises.push(alpacaApi.get(`/watchlists/${wl.id}`));
          }
          let responses = await Promise.all(promises);

          if (responses && responses.length) {
            let watchlists = responses.map((resp) => resp.data);
            setWatchlists(watchlists);
          } else {
            setWatchlists([]);
          }

          console.log("\n\nRESPONSES:", responses);
        } else {
          setWatchlists([]);
        }
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
