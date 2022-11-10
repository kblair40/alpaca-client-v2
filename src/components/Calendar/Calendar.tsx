import { useEffect } from "react";
import { Box } from "@chakra-ui/react";

import { fetchCalendarData } from "store/calendarSlice";
import useDispatch from "hooks/useDispatch";

type Props = {};

const Calendar = (props: Props) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCalendarData());
  }, []);
  return (
    <Box position="fixed" display={"none"}>
      Calendar
    </Box>
  );
};

export default Calendar;
