import { Button, Flex } from "@chakra-ui/react";

import { orderActions } from "store/orderSlice";
import useDispatch from "hooks/useDispatch";
import useSelector from "hooks/useSelector";
import React from "react";

const BuySellButtons = () => {
  const { status, data } = useSelector((st) => st.chart);
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(orderActions.openModal());
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

      {/* TODO: ORDER MODAL GOES HERE */}
    </React.Fragment>
  );
};

export default BuySellButtons;
