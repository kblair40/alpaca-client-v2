import { useEffect, useState } from "react";
import { Box } from "@chakra-ui/react";

import { type Clock as IClock } from "utils/types/clock";
import { fetchCalendarData } from "store/calendarSlice";
import { getTimeToNextOpenAndClose } from "utils/helpers";
import useDispatch from "hooks/useDispatch";
import useSelector from "hooks/useSelector";

const Clock = () => {
  const [clockData, setClockData] = useState<IClock | null>(null);
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
    }
  }, [data]);

  return (
    <Box
      color="white"
      position="fixed"
      top="3.75rem"
      right="1rem"
      zIndex={100000}
      lineHeight={1}
    >
      Clock
    </Box>
  );
};

export default Clock;
