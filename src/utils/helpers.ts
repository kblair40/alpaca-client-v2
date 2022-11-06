export const toTitleCase = (str: string, sep: string = " ") => {
  return str
    .toLowerCase()
    .split(sep)
    .map(function (word) {
      return word.replace(word[0], word[0].toUpperCase());
    })
    .join(" ");
};
