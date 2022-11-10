import { useEffect, useState } from "react";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

import useSelector from "hooks/useSelector";
import { getDidClose, getIsBeforeOpen } from "utils/dateHelpers";

dayjs.extend(utc);

function useCalendar() {
  const [isTradingDay, setIsTradingDay] = useState<null | boolean>(null);
  // const [isBeforeOpen, setIsBeforeOpen] = useState<null | boolean>(null);
  const [isAfterClose, setIsAfterClose] = useState<boolean>(false);
  const [loading, setLoading] = useState(true);

  const { data, status } = useSelector((st) => st.calendar);

  useEffect(() => {
    if (status === "completed" && data && data.calendar) {
      let now = dayjs().format("YYYY-MM-DD");
      let isTradingDay = false;
      let todayDateObj: any = null;
      for (let dateObj of data.calendar) {
        if (dateObj.date === now) {
          isTradingDay = true;
          todayDateObj = dateObj;
          break;
        }
      }

      if (todayDateObj && isTradingDay) {
        console.log("\n\nTODAY OBJ:", todayDateObj);
        const { open, close, date } = todayDateObj;
        let didClose = getDidClose(close, date);
        let notYetOpened = getIsBeforeOpen(open, date);
        console.log("LOCAL NOT YET OPENED:", notYetOpened);
        setIsAfterClose(didClose);
      }

      setIsTradingDay(isTradingDay);
      setLoading(false);
    }
  }, [data, status]);

  return { loading, isTradingDay, isAfterClose };
}

export default useCalendar;
