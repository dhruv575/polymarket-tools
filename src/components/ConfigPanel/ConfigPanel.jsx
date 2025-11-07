import React from 'react';
import './ConfigPanel.css';

const ConfigPanel = ({
  marketName,
  startProbability,
  endProbability,
  volatility,
  timeHorizon,
  onMarketNameChange,
  onStartProbabilityChange,
  onEndProbabilityChange,
  onVolatilityChange,
  onTimeHorizonChange,
  onRegenerateData,
  onExportPNG,
  onCopyToClipboard,
  isExporting,
  isDarkMode,
  onToggleDarkMode,
  onBack,
}) => {
  const timeHorizons = ['1H', '6H', '1D', '1W', '1M', 'ALL'];

  return (
    <div className="config-panel">
      <div className="config-header">
        <div className="config-header-top">
          <button className="back-button" onClick={onBack}>
            ← Back
          </button>
          <button 
            className="dark-mode-toggle-config" 
            onClick={onToggleDarkMode}
            title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          >
            {isDarkMode ? (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="5" />
                <line x1="12" y1="1" x2="12" y2="3" />
                <line x1="12" y1="21" x2="12" y2="23" />
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                <line x1="1" y1="12" x2="3" y2="12" />
                <line x1="21" y1="12" x2="23" y2="12" />
                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
              </svg>
            ) : (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
              </svg>
            )}
          </button>
        </div>
        <h1 className="config-title">Chart Maker</h1>
        <p className="config-subtitle">Realistic chart generator for Polymarket markets</p>
      </div>

      <div className="config-section">
        <label className="config-label">MARKET TITLE</label>
        <input
          type="text"
          className="config-input"
          placeholder="e.g., Will SpaceX land on Mars by 2030?"
          value={marketName}
          onChange={(e) => onMarketNameChange(e.target.value)}
          maxLength={200}
        />
      </div>

      <div className="config-section">
        <label className="config-label">MARKET TYPE</label>
        <div className="market-type-buttons">
          <button className="market-type-button active">
            Binary (Yes/No)
          </button>
        </div>
        <p className="config-hint">Single yes/no outcome market</p>
      </div>

      <div className="config-section">
        <label className="config-label">
          STARTING ODDS: {startProbability}%
        </label>
        <input
          type="range"
          className="config-slider"
          min="0"
          max="100"
          value={startProbability}
          onChange={(e) => onStartProbabilityChange(Number(e.target.value))}
        />
        <div className="slider-labels">
          <span>0%</span>
          <span>100%</span>
        </div>
      </div>

      <div className="config-section">
        <label className="config-label">
          ENDING ODDS: {endProbability}%
        </label>
        <input
          type="range"
          className="config-slider"
          min="0"
          max="100"
          value={endProbability}
          onChange={(e) => onEndProbabilityChange(Number(e.target.value))}
        />
        <div className="slider-labels">
          <span>0%</span>
          <span>100%</span>
        </div>
        {startProbability !== endProbability && (
          <p className="config-warning">
            ⚠️ Adjusting odds will reset your custom trend
          </p>
        )}
      </div>

      <div className="config-section">
        <label className="config-label">VOLATILITY: {volatility}X</label>
        <input
          type="range"
          className="config-slider"
          min="1"
          max="5"
          step="0.5"
          value={volatility}
          onChange={(e) => onVolatilityChange(Number(e.target.value))}
        />
        <div className="slider-labels">
          <span>Low</span>
          <span>High</span>
        </div>
      </div>

      <div className="config-section">
        <label className="config-label">TIME HORIZON</label>
        <div className="time-horizon-buttons">
          {timeHorizons.map((horizon) => (
            <button
              key={horizon}
              className={`time-horizon-button ${
                timeHorizon === horizon ? 'active' : ''
              }`}
              onClick={() => onTimeHorizonChange(horizon)}
            >
              {horizon}
            </button>
          ))}
        </div>
      </div>

      <div className="config-actions">
        <button className="action-button regenerate" onClick={onRegenerateData}>
          🔄 Regenerate Data
        </button>
        <button
          className="action-button export"
          onClick={onExportPNG}
          disabled={isExporting}
        >
          {isExporting ? '⏳ Exporting...' : '📥 Export as PNG'}
        </button>
        <button className="action-button copy" onClick={onCopyToClipboard}>
          📋 Copy
        </button>
      </div>
    </div>
  );
};

export default ConfigPanel;

