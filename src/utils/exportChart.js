import html2canvas from 'html2canvas';
import { saveAs } from 'file-saver';

// Export chart as PNG
export const exportChartAsPNG = async (elementId, fileName = 'polymarket-chart.png') => {
  try {
    const element = document.getElementById(elementId);
    if (!element) {
      throw new Error('Chart element not found');
    }
    
    // Create canvas with high resolution
    const canvas = await html2canvas(element, {
      backgroundColor: '#0B0E11',
      scale: 2, // 2x resolution for retina displays
      logging: false,
      useCORS: true,
      allowTaint: true,
    });
    
    // Convert to blob and download
    canvas.toBlob((blob) => {
      saveAs(blob, fileName);
    });
    
    return { success: true };
  } catch (error) {
    console.error('Error exporting chart:', error);
    return { success: false, error: error.message };
  }
};

// Copy chart to clipboard
export const copyChartToClipboard = async (elementId) => {
  try {
    const element = document.getElementById(elementId);
    if (!element) {
      throw new Error('Chart element not found');
    }
    
    // Create canvas
    const canvas = await html2canvas(element, {
      backgroundColor: '#0B0E11',
      scale: 2,
      logging: false,
      useCORS: true,
      allowTaint: true,
    });
    
    // Convert to blob
    return new Promise((resolve, reject) => {
      canvas.toBlob(async (blob) => {
        try {
          // Check if clipboard API is available
          if (!navigator.clipboard || !navigator.clipboard.write) {
            throw new Error('Clipboard API not supported');
          }
          
          // Copy to clipboard
          await navigator.clipboard.write([
            new ClipboardItem({
              'image/png': blob,
            }),
          ]);
          
          resolve({ success: true });
        } catch (error) {
          reject(error);
        }
      });
    });
  } catch (error) {
    console.error('Error copying to clipboard:', error);
    return { success: false, error: error.message };
  }
};

