// Date formatting utilities for chart labels
export const formatChartDate = (timestamp, timeHorizon) => {
  const date = new Date(timestamp);
  
  switch (timeHorizon) {
    case '1H':
    case '6H':
    case '1D':
      // Show hours and minutes for short time horizons
      return date.toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit',
        hour12: false,
      });
    
    case '1W':
      // Show month and day for weekly view
      return date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
      });
    
    case '1M':
    case 'ALL':
      // Show month and day for longer views
      return date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
      });
    
    default:
      return date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
      });
  }
};

export const formatVolume = (volume) => {
  if (volume >= 1000000) {
    return `$${(volume / 1000000).toFixed(1)}M`;
  } else if (volume >= 1000) {
    return `$${(volume / 1000).toFixed(1)}K`;
  }
  return `$${volume}`;
};

export const formatProbability = (probability) => {
  return `${probability.toFixed(1)}%`;
};

export const formatChange = (change) => {
  const sign = change >= 0 ? '+' : '';
  return `${sign}${change.toFixed(1)}`;
};

