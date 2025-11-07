import React from 'react';
import { useNavigate } from 'react-router-dom';
import './HomePage.css';

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="home-page">
      <div className="home-container">
        <div className="home-header">
          <h1 className="home-title">Polymarket Tools</h1>
          <p className="home-subtitle">Create realistic prediction market charts and bet slips</p>
        </div>

        <div className="home-products">
          <div className="product-card" onClick={() => navigate('/chart-maker')}>
            <div className="product-icon">
              📊
            </div>
            <h2 className="product-title">Chart Maker</h2>
            <p className="product-description">
              Generate realistic Polymarket-style prediction market charts with custom probabilities and volatility
            </p>
            <div className="product-features">
              <span className="feature-tag">Dark/Light Mode</span>
              <span className="feature-tag">Export PNG</span>
              <span className="feature-tag">Custom Trends</span>
            </div>
            <button className="product-button">
              Open Chart Maker →
            </button>
          </div>

          <div className="product-card" onClick={() => navigate('/bet-slip')}>
            <div className="product-icon">
              🎟️
            </div>
            <h2 className="product-title">Bet Slip Maker</h2>
            <p className="product-description">
              Create custom bet slips with market details, odds, wager amounts, and payout calculations
            </p>
            <div className="product-features">
              <span className="feature-tag">Custom Odds</span>
              <span className="feature-tag">Yes/No Trades</span>
              <span className="feature-tag">Auto Calculate</span>
            </div>
            <button className="product-button">
              Open Bet Slip Maker →
            </button>
          </div>
        </div>

        <div className="home-footer">
          <p>Built by Dhruv Gupta, not affiliated with Polymarket</p>
        </div>
      </div>
    </div>
  );
};

export default HomePage;

