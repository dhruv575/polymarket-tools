// Default configuration values for the chart maker
export const DEFAULT_VALUES = {
  marketName: 'Untitled Market',
  startProbability: 35,
  endProbability: 52,
  timeHorizon: 'ALL',
  volatility: 3, // Default volatility level (3x)
};

export const TIME_HORIZONS = [
  { label: '1H', value: '1H', hours: 1, dataPoints: 60 },
  { label: '6H', value: '6H', hours: 6, dataPoints: 72 },
  { label: '1D', value: '1D', hours: 24, dataPoints: 96 },
  { label: '1W', value: '1W', hours: 168, dataPoints: 168 },
  { label: '1M', value: '1M', hours: 720, dataPoints: 240 },
  { label: 'ALL', value: 'ALL', hours: 2160, dataPoints: 360 }, // ~90 days
];

export const VOLATILITY_LEVELS = {
  LOW: 1,
  MEDIUM: 2,
  HIGH: 3,
};

export const CHART_CONFIG = {
  minProbability: 0,
  maxProbability: 100,
  gridLines: 5,
  animationDuration: 300,
};

