import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import BetSlipConfig from './BetSlipConfig';
import BetSlipPreview from './BetSlipPreview';
import { exportChartAsPNG, copyChartToClipboard } from '../../utils/exportChart';
import './BetSlipMaker.css';

const BetSlipMaker = () => {
  const navigate = useNavigate();
  const [slipType, setSlipType] = useState('single');
  const [marketName, setMarketName] = useState('Market name goes here');
  const [outcome, setOutcome] = useState('');
  const [tradeSide, setTradeSide] = useState('yes');
  const [wagerAmount, setWagerAmount] = useState(1000);
  const [odds, setOdds] = useState(65);
  const [showWatermark, setShowWatermark] = useState(true);
  const [isExporting, setIsExporting] = useState(false);
  const [uploadedImage, setUploadedImage] = useState(null);

  // Calculate expected payout
  const expectedPayout = (wagerAmount / (odds / 100)).toFixed(2);

  // Handle image upload
  const handleImageUpload = (file) => {
    if (file && (file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/jpg')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setUploadedImage(e.target.result);
      };
      reader.readAsDataURL(file);
    } else {
      alert('Please upload a JPG or PNG image');
    }
  };

  // Handle paste event for images
  useEffect(() => {
    const handlePaste = (e) => {
      const items = e.clipboardData?.items;
      if (items) {
        for (let i = 0; i < items.length; i++) {
          if (items[i].type.indexOf('image') !== -1) {
            const file = items[i].getAsFile();
            if (file) {
              handleImageUpload(file);
            }
          }
        }
      }
    };

    document.addEventListener('paste', handlePaste);
    return () => {
      document.removeEventListener('paste', handlePaste);
    };
  }, []);

  const handleExportPNG = async () => {
    setIsExporting(true);
    try {
      const result = await exportChartAsPNG('bet-slip-export', 'bet-slip.png');
      if (result.success) {
        alert('Bet slip exported successfully! ✅');
      } else {
        alert(`Export failed: ${result.error}`);
      }
    } catch (error) {
      alert(`Export failed: ${error.message}`);
    } finally {
      setIsExporting(false);
    }
  };

  const handleCopyToClipboard = async () => {
    try {
      const result = await copyChartToClipboard('bet-slip-export');
      if (result.success) {
        alert('Bet slip copied to clipboard! ✅');
      } else {
        alert(`Copy failed: ${result.error}`);
      }
    } catch (error) {
      alert(`Copy failed: ${error.message}`);
    }
  };

  return (
    <div className="bet-slip-maker">
      <div className="bet-slip-panel">
        <BetSlipConfig
          slipType={slipType}
          marketName={marketName}
          outcome={outcome}
          tradeSide={tradeSide}
          wagerAmount={wagerAmount}
          odds={odds}
          expectedPayout={expectedPayout}
          showWatermark={showWatermark}
          isExporting={isExporting}
          uploadedImage={uploadedImage}
          onSlipTypeChange={setSlipType}
          onMarketNameChange={setMarketName}
          onOutcomeChange={setOutcome}
          onTradeSideChange={setTradeSide}
          onWagerAmountChange={setWagerAmount}
          onOddsChange={setOdds}
          onShowWatermarkChange={setShowWatermark}
          onImageUpload={handleImageUpload}
          onExportPNG={handleExportPNG}
          onCopyToClipboard={handleCopyToClipboard}
          onBack={() => navigate('/')}
        />
      </div>
      <div className="bet-slip-display">
        <BetSlipPreview
          marketName={marketName}
          tradeSide={tradeSide}
          wagerAmount={wagerAmount}
          odds={odds}
          expectedPayout={expectedPayout}
          showWatermark={showWatermark}
          uploadedImage={uploadedImage}
        />
      </div>
    </div>
  );
};

export default BetSlipMaker;

