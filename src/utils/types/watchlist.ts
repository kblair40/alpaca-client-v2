interface IWatchlistAsset {
  // This can be improved... https://alpaca.markets/docs/api-references/trading-api/watchlist/#watchlist-entity
  class: string;
  easy_to_borrow: boolean;
  exchange: string;
  id: string;
  marginable: boolean;
  shortable: boolean;
  symbol: string;
  tradable: boolean;
  name: string;
}

export interface IWatchlist {
  id: string;
  account_id: string;
  created_at: string;
  updated_at: string;
  name: string;
  assets: IWatchlistAsset[];
}
