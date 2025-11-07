import { TIME_HORIZONS } from '../constants/defaultValues';
import { formatChartDate } from './dateFormatter';

// Generate realistic chart data with volatility
export const generateChartData = (
  startProbability,
  endProbability,
  timeHorizon,
  volatilityLevel = 3
) => {
  const horizonConfig = TIME_HORIZONS.find(h => h.value === timeHorizon) || TIME_HORIZONS[4];
  const dataPoints = horizonConfig.dataPoints;
  const hours = horizonConfig.hours;
  
  // Calculate time interval in milliseconds
  const now = Date.now();
  const timeInterval = (hours * 60 * 60 * 1000) / dataPoints;
  
  const data = [];
  
  // Generate base trend from start to end
  for (let i = 0; i < dataPoints; i++) {
    const t = i / (dataPoints - 1); // Normalized time (0 to 1)
    const timestamp = now - (hours * 60 * 60 * 1000) + (i * timeInterval);
    
    // Linear interpolation from start to end
    let baseProbability = startProbability + (endProbability - startProbability) * t;
    
    // Add natural volatility (but not to the last point)
    let probability = baseProbability;
    if (i < dataPoints - 1) {
      const volatility = addVolatility(i, dataPoints, volatilityLevel);
      probability = baseProbability + volatility;
      
      // Ensure probability stays within bounds
      probability = Math.max(0, Math.min(100, probability));
      
      // Smooth the data slightly
      if (i > 0) {
        const prev = data[i - 1]?.probability || probability;
        probability = prev * 0.3 + probability * 0.7; // Simple smoothing
      }
    } else {
      // Last point should be exactly the ending probability
      probability = endProbability;
    }
    
    data.push({
      timestamp,
      probability: parseFloat(probability.toFixed(2)),
      date: formatChartDate(timestamp, timeHorizon),
    });
  }
  
  // Apply smoothing pass but preserve the last point
  const smoothed = smoothData(data);
  smoothed[smoothed.length - 1].probability = endProbability;
  return smoothed;
};

// Add realistic volatility to data
const addVolatility = (index, totalPoints, volatilityLevel) => {
  // Base volatility
  const baseVolatility = volatilityLevel * 0.8;
  
  // Add some randomness
  const random = (Math.random() - 0.5) * 2; // -1 to 1
  
  // Add Perlin-like noise (pseudo-random walk)
  const frequency = 0.1;
  const noise = Math.sin(index * frequency + Math.random()) * baseVolatility;
  
  // Combine random and noise
  return random * baseVolatility + noise;
};

// Smooth data using moving average
const smoothData = (data) => {
  const windowSize = 3;
  const smoothed = [...data];
  
  for (let i = windowSize; i < data.length - windowSize; i++) {
    let sum = 0;
    for (let j = -windowSize; j <= windowSize; j++) {
      sum += data[i + j].probability;
    }
    smoothed[i].probability = parseFloat((sum / (windowSize * 2 + 1)).toFixed(2));
  }
  
  return smoothed;
};

// Generate random volume (for display purposes)
export const generateVolume = () => {
  // Generate volume between 100K and 10M
  return Math.floor(Math.random() * 9900000) + 100000;
};

// Calculate change between first and last data point
export const calculateChange = (data) => {
  if (data.length < 2) return 0;
  const first = data[0].probability;
  const last = data[data.length - 1].probability;
  return last - first;
};

