// import React from "react";
import { Button, ButtonGroup, useColorModeValue } from "@chakra-ui/react";

import { chartActions } from "store/chartSlice";
import useSelector from "hooks/useSelector";
import useDispatch from "hooks/useDispatch";

const TIMEFRAMES = [
  { label: "1D", value: "1D" },
  { label: "1W", value: "1W" },
  { label: "1M", value: "1M" },
  { label: "6M", value: "6M" },
  { label: "1Y", value: "1Y" },
];

const SelectTimeframe = () => {
  const activeBg = useColorModeValue("gray.200", "gray.600");
  const inactiveBg = useColorModeValue("gray.200", "gray.700");

  const { timeframe } = useSelector((st) => st.chart);
  const dispatch = useDispatch();

  const handleClick = (tf: string) => {
    dispatch(chartActions.changeTimeframe(tf));
  };

  return (
    <ButtonGroup isAttached mt="1rem" size="sm">
      {TIMEFRAMES.map((tf, i) => {
        return (
          <Button
            variant="solid-neutral"
            borderRight={i !== 4 ? "1px solid" : "none"}
            borderColor={"gray.600"}
            bg={timeframe === tf.value ? activeBg : inactiveBg}
            _active={{ bg: undefined }}
            onClick={() => handleClick(tf.value)}
            key={i}
          >
            {tf.label}
          </Button>
        );
      })}
    </ButtonGroup>
  );
};

export default SelectTimeframe;
