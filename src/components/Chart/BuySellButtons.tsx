import { Button, Flex } from "@chakra-ui/react";

import useSelector from "hooks/useSelector";
import React from "react";

const BuySellButtons = () => {
  const data = useSelector((st) => st.chart);

  return (
    <React.Fragment>
      <Flex align="center">
        <Button variant="solid-blue" size="sm" h="26px">
          Buy
        </Button>
        <Button ml="1rem" variant="solid-red" size="sm" h="26px">
          Sell
        </Button>
      </Flex>

      {/* TODO: ORDER MODAL GOES HERE */}
    </React.Fragment>
  );
};

export default BuySellButtons;
