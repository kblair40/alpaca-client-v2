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

export const getTimeToNextOpenAndClose = (
  nextOpenDate: string,
  nextCloseDate: string,
  is_open: boolean
): null | { open: string; close: string } => {
  if (!nextCloseDate || !nextOpenDate) return null;

  let nextClose = dayjs(nextCloseDate);
  console.log("\nNEXT CLOSE BEFORE:", nextClose);

  //
  return { open: "", close: "" };
};
