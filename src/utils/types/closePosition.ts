interface ClosePosition {
  [key: string]: string | number;
  symbol: string;
  pricePerShare: number;
}

interface CloseLong extends ClosePosition {
  sharesToSell: number;
  totalEstimatedProceeds: number;
}

interface CloseShort extends ClosePosition {
  sharesToBuy: number;
  totalEstimatedCost: number;
}

export type ClosePositionData = CloseLong | CloseShort;
