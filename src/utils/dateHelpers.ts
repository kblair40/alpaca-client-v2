import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

dayjs.extend(utc);
dayjs.extend(timezone);

const ET = "America/New_York";
export const getDidClose = (closeTime: string, date: string) => {
  let closeString = date + " " + closeTime;
  // console.log("\n\n\nLOCAL CLOSE STRING:", closeString);
  let closeDate = dayjs.tz(closeString, ET);
  closeDate = dayjs(closeDate); // convert to local time;
  // console.log("LOCAL CLOSE OBJ:", closeDate);
  // console.log("LOCAL CLOSE OBJ AS STRING:", closeDate.format());
  const minutesDiff = dayjs().diff(closeDate, "minute");
  // console.log("LOCAL DIFF", minutesDiff, "minutes");

  return minutesDiff >= 0;
};

export const getIsBeforeOpen = (openTime: string, date: string) => {
  let openString = date + " " + openTime;
  // console.log("\n\n\nLOCAL OPEN STRING:", openString);
  let openDate = dayjs.tz(openString, ET);
  openDate = dayjs(openDate); // convert to local time;
  // console.log("LOCAL OPEN OBJ:", openDate);
  // console.log("LOCAL OPEN OBJ AS STRING:", openDate.format());
  const minutesDiff = dayjs().diff(openDate, "minute");
  // console.log("LOCAL DIFF", minutesDiff, "minutes");

  return minutesDiff <= 0;
};

export const convertToEasternTime = (date: string) => {
  let dateET = dayjs.tz(date, ET);
  // console.log("DATE ET:", dateET.format());
  // console.log("DATE ET RETURNING:", dateET.toDate());
  return dateET.toDate();
};

export const convertToLocalTime = (
  date: string,
  defaultTZ: string = "America/New_York"
) => {
  // console.log("LOCAL RCVD:", date);
  const tz = dayjs.tz.guess();
  let defaultDate = dayjs.tz(date, defaultTZ).toDate();

  // console.log("LOCAL TZ1:", tz);
  let tzDate = dayjs.tz(defaultDate, tz ? tz : defaultTZ);
  // console.log("LOCAL TZ", tzDate.format());

  return tzDate.toDate();
};
