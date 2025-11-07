# Polymarket Chart Maker

A realistic chart generator for creating fake Polymarket prediction markets. Users can generate, customize, and share realistic-looking market charts with Polymarket's signature dark mode and blue line styling.

## 🎯 Project Overview

This tool allows users to create realistic Polymarket-style prediction market charts by specifying:
- **Market Name**: The question/title for the prediction market
- **Starting Probability**: Initial market probability (0-100%)
- **Ending Probability**: Final market probability (0-100%)
- Additional customization options for realistic chart generation

## ✨ Core Features

### MVP Features
1. **Market Configuration**
   - Market name/question input
   - Starting probability slider (0-100%)
   - Ending probability slider (0-100%)
   - Time horizon selector (6H, 1D, 1W, 1M, ALL)

2. **Chart Generation**
   - Realistic probability trend line with natural volatility
   - Smooth transitions from start to end probability
   - Polymarket-style dark theme
   - Blue gradient line chart
   - Proper date/time labels on X-axis
   - Percentage labels on Y-axis (0-100%)

3. **Market Display**
   - Current probability display (large percentage)
   - Change indicator (up/down arrow with change value)
   - Volume display (randomized realistic volume)
   - Polymarket branding/logo
   - Time range selector tabs

4. **Export & Share**
   - Export as PNG button
   - Copy to clipboard button
   - High-resolution output suitable for sharing

### Future Enhancements
- Upload custom market image/icon
- Multi-outcome markets (not just yes/no binary)
- Advanced settings (custom date range, volatility control)
- Historical trend presets (steady growth, pump & dump, sideways, etc.)
- Custom color schemes
- Add liquidity/volume chart below main chart
- Social media optimized dimensions
- Direct share to Twitter/Discord

## 🛠 Technical Stack

### Frontend Framework
- **React 19.2.0**: Core UI framework
- **Create React App**: Build tooling and development environment

### Chart Library
- **Recharts** or **Chart.js**: For rendering the probability chart
  - Recharts recommended for React integration and customization
  - Supports area charts with gradients (Polymarket style)

### Styling
- **CSS Modules** or **Styled Components**: Component-scoped styling
- **Tailwind CSS** (optional): For utility-first styling approach
- Dark mode color palette matching Polymarket's design

### Export Functionality
- **html2canvas**: For converting DOM elements to PNG
- **file-saver**: For downloading generated images
- **Clipboard API**: For copy to clipboard functionality

## 📁 Project Architecture

```
src/
├── components/
│   ├── ChartMaker/
│   │   ├── ChartMaker.jsx           # Main container component
│   │   ├── ChartMaker.module.css    # Styles for main container
│   │   ├── ConfigPanel/
│   │   │   ├── ConfigPanel.jsx      # Left panel with inputs
│   │   │   ├── MarketNameInput.jsx
│   │   │   ├── ProbabilitySlider.jsx
│   │   │   ├── TimeHorizonSelector.jsx
│   │   │   └── ConfigPanel.module.css
│   │   └── ChartDisplay/
│   │       ├── ChartDisplay.jsx     # Right panel with chart
│   │       ├── MarketChart.jsx      # Recharts implementation
│   │       ├── MarketHeader.jsx     # Current %, change, branding
│   │       ├── TimeRangeSelector.jsx
│   │       ├── ExportButtons.jsx
│   │       └── ChartDisplay.module.css
│   └── common/
│       ├── Button.jsx
│       ├── Slider.jsx
│       └── common.module.css
├── utils/
│   ├── chartDataGenerator.js       # Generate realistic chart data
│   ├── volatilityEngine.js         # Add natural price volatility
│   ├── exportChart.js              # PNG export & clipboard functionality
│   └── dateFormatter.js            # Format dates for X-axis
├── constants/
│   ├── polymarketTheme.js          # Colors, fonts, styling constants
│   └── defaultValues.js            # Default configuration values
├── App.js                          # Root component
├── App.css                         # Global styles
└── index.js                        # Entry point
```

## 🔄 Implementation Phases

### Phase 1: Project Setup & Dependencies
1. Install required dependencies:
   ```bash
   npm install recharts html2canvas file-saver
   ```
2. Set up project structure (create folders and base files)
3. Define Polymarket theme constants (colors, fonts, spacing)
4. Create basic layout structure (two-panel design)

### Phase 2: Configuration Panel (Left Side)
1. **Market Name Input**
   - Text input with placeholder
   - Character limit (e.g., 200 chars)
   - Real-time validation

2. **Probability Sliders**
   - Starting probability (0-100%)
   - Ending probability (0-100%)
   - Visual feedback with percentage display
   - Custom styled sliders matching Polymarket theme

3. **Time Horizon Selector**
   - Buttons for 6H, 1D, 1W, 1M, ALL
   - Active state styling
   - Updates chart data when changed

4. **Action Buttons**
   - "Regenerate Data" button (randomizes volatility)
   - "Export as PNG" button
   - "Copy" button (copy image to clipboard)

### Phase 3: Chart Display Panel (Right Side)
1. **Market Header**
   - Market name display
   - Current probability (large, prominent)
   - Change indicator (arrow + value with color)
   - Polymarket logo
   - Volume display

2. **Chart Component**
   - Area chart with blue gradient fill
   - Blue line stroke
   - Dark grid background
   - Y-axis: 0-100% with gridlines every 20%
   - X-axis: Date labels based on time horizon
   - Responsive sizing
   - Smooth animations

3. **Time Range Tabs**
   - 6H, 1D, 1W, 1M, ALL buttons
   - Updates chart display when clicked
   - Synchronized with time horizon selector

### Phase 4: Chart Data Generation Logic
1. **Data Point Generation**
   - Calculate number of data points based on time horizon
   - Create interpolation from start to end probability
   - Add realistic volatility/noise to the trend
   - Ensure values stay within 0-100% bounds

2. **Volatility Engine**
   - Implement Perlin noise or random walk algorithm
   - Add micro-volatility (small fluctuations)
   - Add macro-trends (larger swings)
   - Control volatility amplitude based on user settings

3. **Date Generation**
   - Generate appropriate timestamps for each data point
   - Format dates based on time horizon (hours vs days vs months)
   - Handle edge cases (e.g., future dates)

### Phase 5: Export & Share Functionality
1. **PNG Export**
   - Use html2canvas to capture chart display panel
   - Set appropriate resolution (2x or 3x for retina displays)
   - Trigger download with file-saver
   - Add loading state during export

2. **Clipboard Copy**
   - Convert chart to blob
   - Copy to clipboard using Clipboard API
   - Show success/error feedback to user
   - Handle browser compatibility

3. **Styling for Export**
   - Ensure chart looks good when exported
   - Add watermark or attribution (optional)
   - Optimize dimensions for social media

### Phase 6: Polish & User Experience
1. **Responsive Design**
   - Mobile-friendly layout (stack panels vertically)
   - Touch-friendly controls
   - Adjust font sizes for smaller screens

2. **Animations & Transitions**
   - Smooth chart updates when changing parameters
   - Button hover/click effects
   - Loading states

3. **Error Handling**
   - Validate user inputs
   - Handle export failures gracefully
   - Show helpful error messages

4. **Accessibility**
   - Proper ARIA labels
   - Keyboard navigation
   - Screen reader support

## 🎨 Polymarket Design System

### Color Palette
```javascript
const polymarketTheme = {
  // Background colors
  bg: {
    primary: '#0B0E11',      // Main background
    secondary: '#161A1F',    // Panel background
    tertiary: '#1E2329',     // Card background
  },
  
  // Chart colors
  chart: {
    lineColor: '#3B82F6',    // Blue line
    gradientStart: '#3B82F680', // Blue with opacity
    gradientEnd: '#3B82F600',   // Transparent
    gridColor: '#2A2F37',    // Grid lines
  },
  
  // Text colors
  text: {
    primary: '#FFFFFF',      // Main text
    secondary: '#9CA3AF',    // Secondary text
    muted: '#6B7280',        // Muted text
  },
  
  // Accent colors
  accent: {
    blue: '#3B82F6',         // Primary blue
    green: '#10B981',        // Positive change
    red: '#EF4444',          // Negative change
  },
  
  // UI elements
  border: '#2A2F37',
};
```

### Typography
- **Font Family**: Inter, -apple-system, system-ui, sans-serif
- **Font Sizes**:
  - Market name: 24px (bold)
  - Current probability: 48px (bold)
  - Change value: 16px (medium)
  - Labels: 14px (regular)
  - Small text: 12px (regular)

### Spacing
- Panel padding: 32px
- Element spacing: 16px, 24px, 32px
- Button padding: 12px 24px
- Border radius: 8px for cards, 6px for inputs

## 🧮 Chart Data Generation Algorithm

### Basic Algorithm
1. **Initialize parameters**:
   - Start probability (P_start)
   - End probability (P_end)
   - Time horizon (T)
   - Number of data points (N)

2. **Create base trend**:
   ```
   For each point i from 0 to N:
     t = i / N  // Normalized time (0 to 1)
     base_value = P_start + (P_end - P_start) * t
   ```

3. **Add volatility**:
   ```
   For each point:
     noise = random(-volatility, +volatility)
     value = clamp(base_value + noise, 0, 100)
   ```

4. **Smooth the curve**:
   - Apply moving average filter
   - Ensure natural-looking transitions

5. **Generate timestamps**:
   - Calculate time interval based on horizon
   - Work backwards from current time

## 📊 Example Data Structure

```javascript
const chartData = [
  { timestamp: 1699401600000, probability: 45.2, date: "Nov 7, 14:00" },
  { timestamp: 1699405200000, probability: 46.8, date: "Nov 7, 15:00" },
  { timestamp: 1699408800000, probability: 44.5, date: "Nov 7, 16:00" },
  // ... more data points
];

const marketState = {
  name: "Will SpaceX land on Mars by 2030?",
  currentProbability: 47.3,
  change: -2.1,
  volume: 5174909,
  timeHorizon: "1W",
};
```

## 🚀 Getting Started

### Installation
```bash
npm install
```

### Development
```bash
npm start
```
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

### Build for Production
```bash
npm run build
```

## 🎮 How to Use

1. **Enter Market Name**: Type your prediction market question in the "Market Title" field
2. **Set Starting Odds**: Use the slider to set the initial probability (0-100%)
3. **Set Ending Odds**: Use the slider to set the final probability (0-100%)
4. **Adjust Volatility**: Control how much the chart fluctuates between start and end points
5. **Choose Time Horizon**: Select from 6H, 1D, 1W, 1M, or ALL to set the chart's time range
6. **Regenerate Data**: Click to generate a new random volatility pattern while keeping your settings
7. **Export as PNG**: Download the chart as a high-resolution PNG image
8. **Copy to Clipboard**: Copy the chart image directly to your clipboard for quick sharing

## ✅ Implementation Status

All features have been successfully implemented:

- ✅ **Phase 1**: Project setup with recharts, html2canvas, and file-saver
- ✅ **Phase 2**: Configuration panel with market name, probability sliders, and time horizon selector
- ✅ **Phase 3**: Chart display with Polymarket-style dark theme and blue gradient
- ✅ **Phase 4**: Realistic chart data generation with natural volatility
- ✅ **Phase 5**: Export functionality (PNG download and clipboard copy)
- ✅ **Phase 6**: Responsive design for mobile and tablet devices
- ✅ Polymarket branding and logo integration
- ✅ Professional dark mode UI matching Polymarket aesthetics
- ✅ Smooth animations and transitions
- ✅ Real-time chart updates

## 📝 Development Checklist

- [x] Phase 1: Setup & Dependencies
  - [x] Install recharts, html2canvas, file-saver
  - [x] Create folder structure
  - [x] Define theme constants
  - [x] Create base layout

- [x] Phase 2: Configuration Panel
  - [x] Market name input
  - [x] Starting probability slider
  - [x] Ending probability slider
  - [x] Time horizon selector
  - [x] Action buttons

- [x] Phase 3: Chart Display
  - [x] Market header with stats
  - [x] Recharts area chart implementation
  - [x] Dark theme styling
  - [x] Time range tabs
  - [x] Polymarket branding

- [x] Phase 4: Data Generation
  - [x] Interpolation algorithm
  - [x] Volatility engine
  - [x] Date/time formatting
  - [x] Data validation

- [x] Phase 5: Export Functionality
  - [x] PNG export with html2canvas
  - [x] Clipboard copy functionality
  - [x] Loading states
  - [x] Error handling

- [x] Phase 6: Polish
  - [x] Responsive design
  - [x] Animations
  - [x] Accessibility
  - [x] Testing

## 🎯 Success Criteria

- Users can input market name, start probability, and end probability
- Chart generates realistic probability trend with natural volatility
- Chart matches Polymarket's dark theme with blue line styling
- Users can export high-quality PNG images
- Users can copy chart to clipboard
- Interface is intuitive and responsive
- Export images are suitable for sharing on social media

## 📚 Resources

- [Recharts Documentation](https://recharts.org/)
- [Polymarket](https://polymarket.com/) - Reference for design
- [html2canvas](https://html2canvas.hertzen.com/) - Screenshot library
- [React Documentation](https://react.dev/)

---

**Built with React • Designed to match Polymarket aesthetics**
