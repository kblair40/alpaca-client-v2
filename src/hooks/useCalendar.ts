import { useEffect, useState } from "react";
import dayjs from "dayjs";

import useSelector from "hooks/useSelector";

export function useCalendar() {
  const [isTradingDay, setIsTradingDay] = useState<null | boolean>(null);
  // const [isBeforeOpen, setIsBeforeOpen] = useState<null | boolean>(null);
  // const [isAfterClose, setIsAfterClose] = useState<null | boolean>(null);
  const [loading, setLoading] = useState(true);

  const { data, status } = useSelector((st) => st.calendar);

  // type CalendarDateObject = {
  //   date: string;
  //   open: string;
  //   close: string;
  //   session_open: string;
  //   session_close: string;
  // };

  useEffect(() => {
    if (status === "completed" && data && data.calendar) {
      // "YYYY-MM-DD"
      let now = dayjs().format("YYYY-MM-DD");
      let isTradingDay = false;
      for (let dateObj of data.calendar) {
        if (dateObj.date === now) {
          isTradingDay = true;
          break;
        }
      }

      setIsTradingDay(isTradingDay);
      setLoading(false);
    }
  }, [data, status]);

  return { loading, isTradingDay };
}
