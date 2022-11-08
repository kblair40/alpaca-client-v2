export interface IAsset {
  id: string;
  class: string;
  exchange: string;
  symbol: string;
  status: "active" | "inactive";
  tradable: boolean;
  marginable: boolean;
  shortable: boolean;
  easy_to_borrow: boolean;
  fractionable: boolean;
}
