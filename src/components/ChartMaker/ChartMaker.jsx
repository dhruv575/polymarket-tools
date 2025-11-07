import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import ConfigPanel from '../ConfigPanel/ConfigPanel';
import ChartDisplay from '../ChartDisplay/ChartDisplay';
import { generateChartData, generateVolume, calculateChange } from '../../utils/chartDataGenerator';
import { exportChartAsPNG, copyChartToClipboard } from '../../utils/exportChart';
import { DEFAULT_VALUES } from '../../constants/defaultValues';
import './ChartMaker.css';

const ChartMaker = () => {
  const navigate = useNavigate();
  const [marketName, setMarketName] = useState(DEFAULT_VALUES.marketName);
  const [startProbability, setStartProbability] = useState(DEFAULT_VALUES.startProbability);
  const [endProbability, setEndProbability] = useState(DEFAULT_VALUES.endProbability);
  const [volatility, setVolatility] = useState(DEFAULT_VALUES.volatility);
  const [timeHorizon, setTimeHorizon] = useState(DEFAULT_VALUES.timeHorizon);
  const [chartData, setChartData] = useState([]);
  const [volume, setVolume] = useState(0);
  const [isExporting, setIsExporting] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true); // Default to dark mode

  // Generate initial chart data
  const generateData = useCallback(() => {
    const data = generateChartData(startProbability, endProbability, timeHorizon, volatility);
    setChartData(data);
    setVolume(generateVolume());
  }, [startProbability, endProbability, timeHorizon, volatility]);

  // Generate data on mount and when dependencies change
  useEffect(() => {
    generateData();
  }, [generateData]);

  // Handle manual data regeneration
  const handleRegenerateData = () => {
    generateData();
  };

  // Handle PNG export
  const handleExportPNG = async () => {
    setIsExporting(true);
    try {
      const result = await exportChartAsPNG('chart-display-export', `${marketName.replace(/[^a-z0-9]/gi, '-').toLowerCase()}.png`);
      if (result.success) {
        alert('Chart exported successfully! ✅');
      } else {
        alert(`Export failed: ${result.error}`);
      }
    } catch (error) {
      alert(`Export failed: ${error.message}`);
    } finally {
      setIsExporting(false);
    }
  };

  // Handle clipboard copy
  const handleCopyToClipboard = async () => {
    try {
      const result = await copyChartToClipboard('chart-display-export');
      if (result.success) {
        alert('Chart copied to clipboard! ✅');
      } else {
        alert(`Copy failed: ${result.error}`);
      }
    } catch (error) {
      alert(`Copy failed: ${error.message}`);
    }
  };

  // Handle dark mode toggle
  const handleToggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  // Calculate current stats - use endProbability directly for display
  const currentProbability = endProbability;
  const change = endProbability - startProbability;

  return (
    <div className="chart-maker">
      <div className="chart-maker-panel">
        <ConfigPanel
          marketName={marketName}
          startProbability={startProbability}
          endProbability={endProbability}
          volatility={volatility}
          timeHorizon={timeHorizon}
          onMarketNameChange={setMarketName}
          onStartProbabilityChange={setStartProbability}
          onEndProbabilityChange={setEndProbability}
          onVolatilityChange={setVolatility}
          onTimeHorizonChange={setTimeHorizon}
          onRegenerateData={handleRegenerateData}
          onExportPNG={handleExportPNG}
          onCopyToClipboard={handleCopyToClipboard}
          isExporting={isExporting}
          isDarkMode={isDarkMode}
          onToggleDarkMode={handleToggleDarkMode}
          onBack={() => navigate('/')}
        />
      </div>
      <div className="chart-maker-display">
        <ChartDisplay
          marketName={marketName}
          chartData={chartData}
          currentProbability={currentProbability}
          change={change}
          volume={volume}
          timeHorizon={timeHorizon}
          onTimeHorizonChange={setTimeHorizon}
          isDarkMode={isDarkMode}
        />
      </div>
    </div>
  );
};

export default ChartMaker;

