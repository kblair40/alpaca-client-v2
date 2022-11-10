import { useRef } from "react";
import { Button, ButtonGroup, useColorModeValue } from "@chakra-ui/react";

import { chartActions, fetchTickerData } from "store/chartSlice";
import useSelector from "hooks/useSelector";
import useDispatch from "hooks/useDispatch";
import { useEffect } from "react";

const TIMEFRAMES = [
  { label: "1D", value: "1D" },
  { label: "1W", value: "1W" },
  { label: "1M", value: "1M" },
  { label: "6M", value: "6M" },
  { label: "1Y", value: "1Y" },
];

type Props = {
  isDisabled: boolean;
};

const SelectTimeframe = ({ isDisabled }: Props) => {
  const activeBg = useColorModeValue("gray.200", "gray.600");
  const inactiveBg = useColorModeValue("gray.200", "gray.700");

  const { timeframe, ticker } = useSelector((st) => st.chart);
  const dispatch = useDispatch();

  const handleClick = (tf: string) => {
    dispatch(chartActions.changeTimeframe(tf));
  };

  const tfRef = useRef<string>();
  useEffect(() => {
    if (timeframe && ticker && ticker.symbol) {
      if (timeframe !== tfRef.current) {
        tfRef.current = timeframe;
        dispatch(fetchTickerData({ symbol: ticker.symbol, timeframe }));
      }
    }
  }, [timeframe, ticker, dispatch]);

  return (
    <ButtonGroup isAttached mt="1rem" size="sm" isDisabled={isDisabled}>
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
