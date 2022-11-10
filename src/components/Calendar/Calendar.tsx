import { useEffect } from "react";

import { fetchCalendarData } from "store/calendarSlice";
import useDispatch from "hooks/useDispatch";

type Props = {};

const Calendar = (props: Props) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCalendarData());
  }, []);
  return <div>Calendar</div>;
};

export default Calendar;
