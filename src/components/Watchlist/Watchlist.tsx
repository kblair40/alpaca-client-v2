import { useEffect, useState } from "react";

import alpacaApi from "api/alpaca";
import api from "api";

type Props = {};

const Watchlist = (props: Props) => {
  useEffect(() => {
    const fetchWatchlists = async () => {
      try {
        const response = await api.get("/watchlists");
        console.log("WATCHLIST RESPONSE.DATA:", response.data);
      } catch (e) {
        console.log("FAILED FETCHING WATCHLIST:", e);
      }
    };

    fetchWatchlists();
  }, []);

  return <div>Watchlist</div>;
};

export default Watchlist;
