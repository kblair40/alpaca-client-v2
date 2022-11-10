import { useEffect, useState } from "react";
import { Box, useColorModeValue } from "@chakra-ui/react";

import { type Clock as IClock } from "utils/types/clock";
import { fetchCalendarData } from "store/calendarSlice";
import { getTimeToNextOpenAndClose } from "utils/helpers";
import useDispatch from "hooks/useDispatch";
import useSelector from "hooks/useSelector";

const Clock = () => {
  const [clockData, setClockData] = useState<IClock | null>(null);
  const [timeTo, setTimeTo] = useState("");
  const dispatch = useDispatch();

  const { data } = useSelector((st) => st.calendar);

  useEffect(() => {
    dispatch(fetchCalendarData());
  }, [dispatch]);

  useEffect(() => {
    if (data && data.clock) {
      setClockData(data.clock);
      const { next_open, next_close, is_open } = data.clock;
      const timeRes = getTimeToNextOpenAndClose(next_open, next_close, is_open);
      console.log("\n\nTIME RES:", timeRes, "\n\n");
      setTimeTo(timeRes);
    }
  }, [data]);

  const posColor = useColorModeValue("green.600", "green.300");
  const negColor = useColorModeValue("red.600", "red.300");
  const neutralColor = useColorModeValue("gray.700", "gray.200");

  return (
    <Box
      // color="white"
      position="fixed"
      top="3.75rem"
      right="1rem"
      zIndex={100000}
      lineHeight={1}
      color={
        clockData && clockData.is_open
          ? posColor
          : clockData && !clockData.is_open
          ? negColor
          : neutralColor
      }
    >
      {timeTo ? timeTo : ""}
    </Box>
  );
};

export default Clock;
