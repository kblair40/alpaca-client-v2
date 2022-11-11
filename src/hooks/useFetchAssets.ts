import { useEffect, useState } from "react";

import alpacaApi from "api/alpaca";
import { IAsset } from "utils/types/asset";

const useFetchAssets = () => {
  const [assets, setAssets] = useState<any[]>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [addSymbolError, setAddSymbolError] = useState("");

  useEffect(() => {
    const fetchAssets = async () => {
      try {
        const response = await alpacaApi.get("/assets", {
          params: {
            status: "active",
            // docs say us_equity is default, but as of 11/08/22, crypto
            //  is still being returned if us_equity is not specified
            asset_class: "us_equity",
          },
        });
        console.log("ASSETS RESPONSE.DATA:", response.data);

        if (response.data) {
          let tradableAssets: string[] = [];

          response.data.forEach((asset: IAsset) => {
            if (asset.tradable) {
              tradableAssets.push(asset.symbol);
            }
          });

          setAssets(tradableAssets);
        }
      } catch (e) {
        console.log("FAILED TO FETCH ASSETS:", e);
        setError("Something went wrong and assets could not be retrieved");
      }

      setLoading(false);
    };

    fetchAssets();
  }, []);

  const validateAsset = (symbol: string) => {
    const isIncluded = assets?.includes(symbol.toUpperCase());
    console.log(`${symbol} is included? ${isIncluded}`);
    if (isIncluded) {
      return true;
    } else {
      setAddSymbolError(
        `Could not find an equity with the symbol ${symbol.toUpperCase()}`
      );
    }
    return isIncluded;
  };

  return {
    assets,
    loading,
    error,
    addSymbolError,
    validateAsset,
    setAddSymbolError,
  };
};

export default useFetchAssets;
