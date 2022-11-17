import { Button, Flex } from "@chakra-ui/react";

import { type IAsset } from "utils/types/asset";
import { orderActions } from "store/orderSlice";
import useDispatch from "hooks/useDispatch";
import useSelector from "hooks/useSelector";
import React from "react";

type Props = {
  assetData?: IAsset;
};

const BuySellButtons = ({ assetData }: Props) => {
  const { status, data, ticker, asset } = useSelector((st) => st.chart);
  const dispatch = useDispatch();

  const handleClick = () => {
    if (ticker && ticker.symbol && data && data.snapshot && data.quote) {
      let tickerSymbol = ticker.symbol;
      dispatch(
        orderActions.openModal({ tickerSymbol, asset, priceData: data })
      );
    }
  };

  const isDisabled = status !== "completed";
  return (
    <React.Fragment>
      <Flex align="center">
        <Button
          onClick={handleClick}
          isDisabled={isDisabled}
          variant="solid-blue"
          size="sm"
          h="26px"
        >
          Buy
        </Button>
        <Button
          onClick={handleClick}
          isDisabled={isDisabled}
          ml="1rem"
          variant="solid-red"
          size="sm"
          h="26px"
        >
          Sell
        </Button>
      </Flex>
    </React.Fragment>
  );
};

export default BuySellButtons;
