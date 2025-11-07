import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage/HomePage';
import ChartMaker from './components/ChartMaker/ChartMaker';
import BetSlipMaker from './components/BetSlipMaker/BetSlipMaker';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/chart-maker" element={<ChartMaker />} />
          <Route path="/bet-slip" element={<BetSlipMaker />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
