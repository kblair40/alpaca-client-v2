import { useEffect, useState } from "react";
import { Box, Text, Flex } from "@chakra-ui/react";

import alpacaApi from "api/alpaca";

const Watchlist = () => {
  const [loading, setLoading] = useState(false);
  const [watchlists, setWatchlists] = useState<any[]>();

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
          }
          console.log("\n\nRESPONSES:", responses);
        } else {
          setWatchlists([]);
        }
      } catch (e) {
        console.log("FAILED FETCHING WATCHLIST:", e);
      }
    };

    fetchWatchlists();
  }, []);

  return <Box></Box>;
};

export default Watchlist;
