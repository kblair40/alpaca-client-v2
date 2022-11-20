import dayjs from "dayjs";

export const toTitleCase = (str: string, sep: string = " ") => {
  return str
    .toLowerCase()
    .split(sep)
    .map(function (word) {
      return word.replace(word[0], word[0].toUpperCase());
    })
    .join(" ");
};

const MINUTES_IN_DAY = 60 * 24;
// console.log("MINUTES_IN_DAY:", MINUTES_IN_DAY);

const getTimeDiff = (start: any, end: any) => {
  let minutesTo = end.diff(start, "minute");
  // console.log("NEXT CLOSE AFTER:", minutesTo);
  let daysTo = Math.floor(minutesTo / MINUTES_IN_DAY);
  // console.log("DAYS TO:", daysTo);
  let hoursTo = Math.floor(minutesTo / 60) - 24 * daysTo;

  const unitMap: { [key: string]: string } = {
    daysTo: "days",
    hoursTo: "hours",
    minutesTo: "minutes",
  };

  minutesTo = minutesTo - daysTo * MINUTES_IN_DAY - hoursTo * 60;

  let resObj = { daysTo, hoursTo, minutesTo };
  let validUnits: [string, number][] = Object.entries(resObj).filter(
    (entry) => !!entry[1]
  );
  // console.log("VALID UNITS:", validUnits);
  let res = "";
  if (validUnits.length > 0) {
    res = `${validUnits[0][1]} ${unitMap[validUnits[0][0]]}`;
  } else {
    return null;
  }

  if (validUnits.length === 1) {
    // console.log("1 RES:", res);
    return res;
  } else if (validUnits.length >= 2) {
    res += `, ${validUnits[1][1]} ${unitMap[validUnits[1][0]]}`;
    if (validUnits.length === 3) {
      res += `, ${validUnits[2][1]} ${unitMap[validUnits[2][0]]}`;
    }
  }

  // console.log("\n\nRES:", res, "\n\n");
  return res;
};

export const getTimeToNextOpenAndClose = (
  nextOpenDate: string,
  nextCloseDate: string,
  is_open: boolean
): null | string | any => {
  if (!nextCloseDate || !nextOpenDate) return null;

  if (is_open) {
    let res = getTimeDiff(dayjs(), dayjs(nextCloseDate)) || "";
    // console.log("RES:", res);
    return `Market closes in ${res}`;
  } else {
    let res = getTimeDiff(dayjs(), dayjs(nextOpenDate)) || "";
    // console.log("RES:", res);
    return `Market opens in ${res}`;
  }
};

let options = {
  currency: "USD",
  currencyDisplay: "narrowSymbol",
  currencySign: "accounting",
  style: "currency",
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
};

export const convertToCurrency = (num: string | number) => {
  if (typeof num === "string") {
    num = parseFloat(num);
  }
  return num.toLocaleString("en-US", options);
};
