import { Button, Flex } from "@chakra-ui/react";

import { orderActions } from "store/orderSlice";
import useDispatch from "hooks/useDispatch";
import useSelector from "hooks/useSelector";
import React from "react";

type Props = {
  isDisabled?: boolean;
};

const BuySellButtons = ({ isDisabled = false }: Props) => {
  const { status, data, ticker, asset } = useSelector((st) => st.chart);
  const dispatch = useDispatch();

  const handleClick = (side: "buy" | "sell") => {
    if (ticker && ticker.symbol && data && data.snapshot && data.quote) {
      let tickerSymbol = ticker.symbol;
      dispatch(
        orderActions.openModal({ tickerSymbol, asset, side, priceData: data })
      );
    }
  };

  const disabled = status !== "completed";
  return (
    <React.Fragment>
      <Flex align="center">
        <Button
          onClick={() => handleClick("buy")}
          isDisabled={isDisabled || disabled}
          variant="solid-blue"
          size="sm"
          h="26px"
        >
          Buy
        </Button>

        <Button
          onClick={() => handleClick("sell")}
          isDisabled={isDisabled || disabled}
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
