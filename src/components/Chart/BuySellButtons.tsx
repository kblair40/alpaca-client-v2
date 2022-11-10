import { Button, Flex } from "@chakra-ui/react";

import useSelector from "hooks/useSelector";
import React from "react";

type Props = {
  isDisabled: boolean;
};
// @ts-ignore
const BuySellButtons = ({ isDisabled }: Props) => {
  const data = useSelector((st) => st.chart);

  return (
    <React.Fragment>
      <Flex align="center">
        <Button isDisabled={isDisabled} variant="solid-blue" size="sm" h="26px">
          Buy
        </Button>
        <Button
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
