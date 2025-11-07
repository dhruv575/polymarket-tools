import React, { useRef, useState } from 'react';
import './BetSlipConfig.css';

const BetSlipConfig = ({
  slipType,
  marketName,
  outcome,
  tradeSide,
  wagerAmount,
  odds,
  expectedPayout,
  showWatermark,
  isExporting,
  uploadedImage,
  onSlipTypeChange,
  onMarketNameChange,
  onOutcomeChange,
  onTradeSideChange,
  onWagerAmountChange,
  onOddsChange,
  onShowWatermarkChange,
  onImageUpload,
  onExportPNG,
  onCopyToClipboard,
  onBack,
}) => {
  const fileInputRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleFileSelect = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      onImageUpload(file);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      onImageUpload(file);
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };
  return (
    <div className="bet-slip-config">
      <div className="config-header">
        <button className="back-button" onClick={onBack}>
          ← Back
        </button>
        <h1 className="config-title">Bet Slip Maker</h1>
        <p className="config-subtitle">Create Polymarket-style bet slips</p>
      </div>

      <div className="config-section">
        <label className="config-label">BET SLIP TYPE</label>
        <div className="slip-type-buttons">
          <button
            className={`slip-type-button ${slipType === 'single' ? 'active' : ''}`}
            onClick={() => onSlipTypeChange('single')}
          >
            Single
          </button>
          <button
            className={`slip-type-button ${slipType === 'parlay' ? 'active' : ''}`}
            onClick={() => onSlipTypeChange('parlay')}
          >
            Parlay
          </button>
        </div>
      </div>

      <div className="config-section">
        <label className="config-label">MARKET NAME</label>
        <input
          type="text"
          className="config-input"
          placeholder="e.g., Bitcoin price today at 6pm EDT?"
          value={marketName}
          onChange={(e) => onMarketNameChange(e.target.value)}
          maxLength={200}
        />
      </div>

      <div className="config-section">
        <label className="config-label">OUTCOME</label>
        <input
          type="text"
          className="config-input"
          placeholder="e.g., $111,000 or above"
          value={outcome}
          onChange={(e) => onOutcomeChange(e.target.value)}
          maxLength={200}
        />
      </div>

      <div className="config-section">
        <label className="config-label">TRADE SIDE</label>
        <div className="trade-side-buttons">
          <button
            className={`trade-side-button yes ${tradeSide === 'yes' ? 'active' : ''}`}
            onClick={() => onTradeSideChange('yes')}
          >
            Yes
          </button>
          <button
            className={`trade-side-button no ${tradeSide === 'no' ? 'active' : ''}`}
            onClick={() => onTradeSideChange('no')}
          >
            No
          </button>
        </div>
      </div>

      <div className="config-section">
        <label className="config-label">IMAGE (OPTIONAL)</label>
        <div className="image-upload">
          <input
            ref={fileInputRef}
            type="file"
            accept="image/jpeg,image/png,image/jpg"
            onChange={handleFileSelect}
            style={{ display: 'none' }}
          />
          <div 
            className={`upload-box ${isDragging ? 'dragging' : ''} ${uploadedImage ? 'has-image' : ''}`}
            onClick={handleUploadClick}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            {uploadedImage ? (
              <img src={uploadedImage} alt="Uploaded" className="uploaded-image-preview" />
            ) : (
              <>
                <span className="upload-icon">📷</span>
                <span className="upload-text">CLICK TO UPLOAD OR DRAG & DROP</span>
              </>
            )}
          </div>
          <p className="upload-hint">Supports JPG, PNG formats. Or press Ctrl+V to paste.</p>
        </div>
      </div>

      <div className="config-section">
        <label className="config-label">WAGER AMOUNT ($)</label>
        <input
          type="number"
          className="config-input"
          value={wagerAmount}
          onChange={(e) => onWagerAmountChange(Number(e.target.value))}
          min="1"
        />
      </div>

      <div className="config-section">
        <label className="config-label">ODDS (%)</label>
        <input
          type="range"
          className="config-slider"
          min="1"
          max="99"
          value={odds}
          onChange={(e) => onOddsChange(Number(e.target.value))}
        />
        <div className="slider-value">{odds}% chance</div>
        <p className="expected-payout">Expected payout: ${expectedPayout}</p>
      </div>

      <div className="config-section">
        <label className="checkbox-label">
          <input
            type="checkbox"
            checked={showWatermark}
            onChange={(e) => onShowWatermarkChange(e.target.checked)}
          />
          <span>SHOW WATERMARK</span>
        </label>
        <p className="config-hint">Display watermark on bet slip</p>
      </div>

      <div className="config-actions">
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

export default BetSlipConfig;

