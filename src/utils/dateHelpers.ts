import dayjs from "dayjs";
// import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

// dayjs.extend(utc);
dayjs.extend(timezone);

const ET = "America/New_York";
export const getDidClose = (closeTime: string, date: string) => {
  let closeString = date + " " + closeTime;
  console.log("\n\n\nLOCAL CLOSE STRING:", closeString);
  let closeDate = dayjs.tz(closeString, ET);
  closeDate = dayjs(closeDate); // convert to local time;
  // let local = dayjs();
  console.log("LOCAL CLOSE OBJ:", closeDate);
  console.log("LOCAL CLOSE OBJ AS STRING:", closeDate.format());
  const minutesDiff = dayjs().diff(closeDate, "minute");
  console.log("LOCAL DIFF", minutesDiff, "minutes");

  return minutesDiff > 0;
};

export const getIsBeforeOpen = (openTime: string, date: string) => {
  let openString = date + " " + openTime;
  console.log("\n\n\nLOCAL CLOSE STRING:", openString);
  let openDate = dayjs.tz(openString, ET);
  openDate = dayjs(openDate); // convert to local time;
  // let local = dayjs();
  console.log("LOCAL CLOSE OBJ:", openDate);
  console.log("LOCAL CLOSE OBJ AS STRING:", openDate.format());
  const minutesDiff = dayjs().diff(openDate, "minute");
  console.log("LOCAL DIFF", minutesDiff, "minutes");

  return minutesDiff > 0;
};
