import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import polymarketLogo from '../../polymarket_logo.png';
import { formatVolume, formatProbability, formatChange } from '../../utils/dateFormatter';
import './ChartDisplay.css';

const ChartDisplay = ({ marketName, chartData, currentProbability, change, volume, timeHorizon, onTimeHorizonChange, isDarkMode }) => {
  const timeHorizons = ['1H', '6H', '1D', '1W', '1M', 'ALL'];
  const changeColor = change >= 0 ? '#10B981' : '#EF4444'; // Green for positive, red for negative
  const changeIcon = change >= 0 ? '▲' : '▼';

  // Calculate expiry date (1 week from today by default)
  const expiryDate = new Date();
  expiryDate.setDate(expiryDate.getDate() + 7);
  const formattedExpiryDate = expiryDate.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });

  // Custom tooltip
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const tooltipBg = isDarkMode ? 'rgba(30, 43, 59, 0.95)' : 'rgba(255, 255, 255, 0.95)';
      const tooltipBorder = isDarkMode ? '#2d3f52' : '#e5e7eb';
      const tooltipColor = isDarkMode ? '#3e9ec8' : '#2E5CFF';
      const tooltipText = isDarkMode ? '#9CA3AF' : '#6b7280';
      
      return (
        <div className="custom-tooltip" style={{ 
          background: tooltipBg, 
          borderColor: tooltipBorder 
        }}>
          <p className="tooltip-probability" style={{ color: tooltipColor }}>
            {formatProbability(payload[0].value)}
          </p>
          <p className="tooltip-date" style={{ color: tooltipText }}>
            {payload[0].payload.date}
          </p>
        </div>
      );
    }
    return null;
  };

  // Theme colors based on mode
  const backgroundColor = isDarkMode ? '#1e2b3b' : '#ffffff';
  const lineColor = isDarkMode ? '#3e9ec8' : '#2E5CFF';
  const gridColor = isDarkMode ? '#2d3f52' : '#e5e7eb';
  const textPrimary = isDarkMode ? '#FFFFFF' : '#1f2937';
  const textSecondary = isDarkMode ? '#9CA3AF' : '#6b7280';
  const percentageColor = isDarkMode ? '#3e9ec8' : '#2E5CFF';

  return (
    <div className="chart-display" id="chart-display-export" style={{ background: backgroundColor }}>
      {/* Top row: Market title, copy icon, bookmark icon */}
      <div className="chart-header-row">
        <h2 className="chart-market-name" style={{ color: textPrimary }}>{marketName}</h2>
        <div className="chart-actions">
          <button className="icon-button" title="Copy link" style={{ color: textSecondary }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
              <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
            </svg>
          </button>
          <button className="icon-button" title="Bookmark" style={{ color: textSecondary }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
            </svg>
          </button>
        </div>
      </div>

      {/* Second row: Volume and Expiry date */}
      <div className="chart-meta-row" style={{ color: textSecondary }}>
        <span className="volume-text">{formatVolume(volume)} Vol.</span>
        <span className="meta-separator">•</span>
        <span className="expiry-date">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ marginRight: '4px', verticalAlign: 'middle' }}>
            <circle cx="12" cy="12" r="10" />
            <polyline points="12 6 12 12 16 14" />
          </svg>
          {formattedExpiryDate}
        </span>
      </div>

      {/* Third row: Percentage and change */}
      <div className="chart-stats-row">
        <div className="percentage-group">
          <span className="percentage-large" style={{ color: percentageColor }}>{formatProbability(currentProbability)}</span>
          <span className="percentage-label" style={{ color: percentageColor }}>chance</span>
          <span className="change-badge" style={{ color: changeColor }}>
            {changeIcon} {Math.abs(change).toFixed(1)}%
          </span>
        </div>
        <img src={polymarketLogo} alt="Polymarket" className="polymarket-logo-inline" />
      </div>

      {/* Chart */}
      <div className="chart-container" style={{ background: backgroundColor }}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={chartData}
            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke={gridColor} vertical={false} />
            <XAxis
              dataKey="date"
              stroke={textSecondary}
              style={{ fontSize: '12px' }}
              tickLine={false}
              axisLine={false}
              interval="preserveStartEnd"
              minTickGap={50}
            />
            <YAxis
              stroke={textSecondary}
              style={{ fontSize: '12px' }}
              tickLine={false}
              axisLine={false}
              domain={[0, 100]}
              ticks={[0, 20, 40, 60, 80, 100]}
              tickFormatter={(value) => `${value}%`}
            />
            <Tooltip content={<CustomTooltip />} />
            <Line
              type="monotone"
              dataKey="probability"
              stroke={lineColor}
              strokeWidth={2}
              dot={false}
              animationDuration={300}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Time range selector at bottom */}
      <div className="chart-footer">
        <div 
          className="time-range-selector" 
          style={{ 
            background: isDarkMode ? '#253447' : '#f3f4f6' 
          }}
        >
          {timeHorizons.map((horizon) => (
            <button
              key={horizon}
              className={`time-range-button ${timeHorizon === horizon ? 'active' : ''}`}
              onClick={() => onTimeHorizonChange(horizon)}
              style={{
                color: timeHorizon === horizon ? textPrimary : textSecondary,
                background: timeHorizon === horizon ? (isDarkMode ? '#3d5166' : '#e5e7eb') : 'transparent'
              }}
            >
              {horizon}
            </button>
          ))}
        </div>
      </div>

      <div className="chart-watermark" style={{ color: textSecondary }}>
        polymarket.tools
      </div>
    </div>
  );
};

export default ChartDisplay;
