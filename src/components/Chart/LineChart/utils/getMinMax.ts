export const getMin = (minVal: number) => {
  console.log("MIN RCVD:", minVal);
  if (minVal < 50) {
    console.log("MAX RES:", Math.floor(minVal / 4) * 4);
    return Math.floor(minVal / 4) * 4;
  } else if (minVal < 100) {
    console.log("MIN RES:", Math.floor(minVal / 10) * 10);
    return Math.floor(minVal / 10) * 10;
  } else if (minVal < 10000) {
    console.log("MIN RES:", Math.floor(minVal / 100) * 100);
    return Math.floor(minVal / 100) * 100;
  }
};

export const getMax = (maxVal: number) => {
  console.log("MAX RCVD:", maxVal);
  if (maxVal < 50) {
    console.log("MAX RES:", Math.ceil(maxVal / 4) * 4);
    return Math.ceil(maxVal / 5) * 5;
  } else if (maxVal < 100) {
    console.log("MAX RES:", Math.ceil(maxVal / 10) * 10);
    return Math.ceil(maxVal / 10) * 10;
  } else if (maxVal < 10000) {
    console.log("MAX RES:", Math.ceil(maxVal / 100) * 100);
    return Math.ceil(maxVal / 100) * 100;
  }
};
