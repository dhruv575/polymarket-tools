import React from 'react';
import polymarketLogo from '../../polymarket_logo.png';
import './BetSlipPreview.css';

const BetSlipPreview = ({ marketName, tradeSide, wagerAmount, odds, expectedPayout, showWatermark, uploadedImage }) => {
  const tradeSideText = tradeSide === 'yes' ? 'Yes' : 'No';
  const tradeSideColor = tradeSide === 'yes' ? '#10B981' : '#EF4444';
  
  // Calculate values
  const averageOdds = odds;
  const currentOdds = odds;
  const totalBet = wagerAmount;
  const currentValue = wagerAmount;
  const maxPayout = parseFloat(expectedPayout);

  return (
    <div className="bet-slip-preview-container">
      <div className="bet-slip-background" id="bet-slip-export">
        <div className="polymarket-header">
          <img src={polymarketLogo} alt="Polymarket" className="polymarket-logo-slip" />
        </div>

        <div className="bet-slip-card-poly">
          <div className="slip-card-content">
            <div className="slip-title-section">
              <div className="slip-title-left">
                <h2 className="slip-market-title">{marketName}</h2>
                <div className="slip-trade-badge" style={{ 
                  backgroundColor: tradeSide === 'yes' ? 'rgba(16, 185, 129, 0.1)' : 'rgba(239, 68, 68, 0.1)',
                  color: tradeSideColor 
                }}>
                  {tradeSideText}
                </div>
              </div>
              {uploadedImage ? (
                <img src={uploadedImage} alt="Market" className="slip-image" />
              ) : (
                <div className="slip-image-placeholder"></div>
              )}
            </div>

            <div className="slip-divider">
              <div className="divider-line"></div>
              <img src={polymarketLogo} alt="" className="divider-logo" />
              <div className="divider-line"></div>
            </div>

            <div className="slip-stats">
              <div className="stat-row">
                <span className="stat-label">Average Odds</span>
                <span className="stat-value">{averageOdds}%</span>
              </div>

              <div className="stat-row">
                <span className="stat-label">Current Odds</span>
                <span className="stat-value">{currentOdds}%</span>
              </div>

              <div className="stat-row">
                <span className="stat-label">Total Bet</span>
                <span className="stat-value">${totalBet.toLocaleString()}</span>
              </div>

              <div className="stat-row">
                <span className="stat-label">Current Value</span>
                <span className="stat-value">${currentValue.toLocaleString()}</span>
              </div>

              <div className="stat-row payout-row">
                <span className="stat-label">Max Payout</span>
                <span className="stat-payout">${maxPayout.toLocaleString()}</span>
              </div>
            </div>
          </div>

          <div className="slip-wave-footer">
            <svg viewBox="0 0 1200 30" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
              <path fill="#7c3aed" d="M0,15 Q15,5 30,15 T60,15 T90,15 T120,15 T150,15 T180,15 T210,15 T240,15 T270,15 T300,15 T330,15 T360,15 T390,15 T420,15 T450,15 T480,15 T510,15 T540,15 T570,15 T600,15 T630,15 T660,15 T690,15 T720,15 T750,15 T780,15 T810,15 T840,15 T870,15 T900,15 T930,15 T960,15 T990,15 T1020,15 T1050,15 T1080,15 T1110,15 T1140,15 T1170,15 T1200,15 L1200,30 L0,30 Z" />
            </svg>
          </div>
        </div>

        <div className="polymarket-tagline">
          Trade on politics, sports, culture & more.
        </div>

        {showWatermark && (
          <div className="slip-watermark-poly">polymarket.tools</div>
        )}
      </div>
    </div>
  );
};

export default BetSlipPreview;

