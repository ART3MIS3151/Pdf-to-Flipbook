import { useState } from 'react';
import './App.css';
import { PDFUploader } from './PDFUploader';
import { Flipbook } from './Flipbook';
import { loadPDFPages } from './PDFLoader';
import type { PDFLoadProgress } from './PDFLoader';
import { SpeedInsights } from '@vercel/speed-insights/react';
import { Analytics } from '@vercel/analytics/react';

function App() {
  const [pages, setPages] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState<PDFLoadProgress | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleFileSelect = async (file: File) => {
    setLoading(true);
    setError(null);
    setProgress({ currentPage: 0, totalPages: 1 }); // Init progress
    
    try {
      const renderedPages = await loadPDFPages(file, (prog) => {
        setProgress(prog);
      });
      
      if (renderedPages.length === 0) {
        throw new Error("No pages could be rendered from this PDF.");
      }
      
      setPages(renderedPages);
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Failed to load PDF. Please try a different file.");
    } finally {
      setLoading(false);
      setProgress(null);
    }
  };

  const calculateProgressPercent = () => {
    if (!progress) return 0;
    return (progress.currentPage / progress.totalPages) * 100;
  };

  return (
    <>
    <div className="app-container">
      <header className="header">
        <h1>Aria Flipbook</h1>
        <p>Experience your PDFs with realistic 3D page turning</p>
      </header>

      <main className="main-content">
        {!loading && pages.length === 0 && (
          <PDFUploader onFileSelect={handleFileSelect} />
        )}

        {loading && (
          <div className="loader-container">
            <div className="spinner"></div>
            <h3 style={{ color: 'white' }}>Processing PDF...</h3>
            {progress && (
              <>
                <p>Rendering page {progress.currentPage} of {progress.totalPages}</p>
                <div className="progress-bar-container">
                  <div 
                    className="progress-bar" 
                    style={{ width: `${calculateProgressPercent()}%` }}
                  ></div>
                </div>
              </>
            )}
          </div>
        )}

        {error && (
          <div className="glass-panel" style={{ padding: '2rem', textAlign: 'center' }}>
            <h3 style={{ color: '#ef4444', marginBottom: '1rem' }}>Error</h3>
            <p>{error}</p>
            <button className="btn-primary" style={{ marginTop: '1rem' }} onClick={() => setError(null)}>
              Try Again
            </button>
          </div>
        )}

        {!loading && pages.length > 0 && !error && (
          <Flipbook pages={pages} />
        )}
      </main>
    </div>
    <SpeedInsights />
    <Analytics />
    </>
  );
}

export default App;
