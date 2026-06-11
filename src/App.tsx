import { useState } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import { PDFUploader } from './PDFUploader';
import { Flipbook } from './Flipbook';
import { SharedViewer } from './SharedViewer';
import { loadPDFPages } from './PDFLoader';
import type { PDFLoadProgress } from './PDFLoader';
import { SpeedInsights } from '@vercel/speed-insights/react';
import { Analytics } from '@vercel/analytics/react';

function HomePage() {
  const [pages, setPages] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState<PDFLoadProgress | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [originalFile, setOriginalFile] = useState<File | null>(null);

  const handleFileSelect = async (file: File) => {
    setLoading(true);
    setError(null);
    setOriginalFile(file);
    setProgress({ currentPage: 0, totalPages: 1 });
    
    try {
      const renderedPages = await loadPDFPages(file, (prog) => {
        setProgress(prog);
      });
      
      if (renderedPages.length === 0) {
        throw new Error("No pages could be rendered from this PDF.");
      }
      
      setPages(renderedPages);
    } catch (error: any) {
      console.error("Error loading PDF:", error);
      setError(`Failed to load PDF: ${error.message || String(error)}`);
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
    <div className="app-container">
      <header className="header">
        <Link to="/" style={{ textDecoration: 'none' }}>
          <h1>Aria Flipbook</h1>
        </Link>
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
          <Flipbook pages={pages} originalFile={originalFile || undefined} />
        )}
      </main>

      {/* Footer with legal links */}
      <footer style={{ 
        textAlign: 'center', 
        padding: '1.5rem 0', 
        marginTop: 'auto',
        borderTop: '1px solid rgba(255,255,255,0.1)',
        display: 'flex',
        justifyContent: 'center',
        gap: '2rem',
        flexWrap: 'wrap'
      }}>
        <Link to="/legal/privacy" style={{ color: '#94a3b8', textDecoration: 'none', fontSize: '0.85rem' }}>Privacy Policy</Link>
        <Link to="/legal/terms" style={{ color: '#94a3b8', textDecoration: 'none', fontSize: '0.85rem' }}>Terms of Service</Link>
        <Link to="/legal/dmca" style={{ color: '#94a3b8', textDecoration: 'none', fontSize: '0.85rem' }}>DMCA</Link>
      </footer>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/v/:id" element={<SharedViewer />} />
        <Route path="/legal/privacy" element={<LazyLegal page="privacy" />} />
        <Route path="/legal/terms" element={<LazyLegal page="terms" />} />
        <Route path="/legal/dmca" element={<LazyLegal page="dmca" />} />
      </Routes>
      <SpeedInsights />
      <Analytics />
    </BrowserRouter>
  );
}

// Simple lazy loader for legal pages
import { lazy, Suspense } from 'react';

const PrivacyPolicy = lazy(() => import('./pages/PrivacyPolicy'));
const TermsOfService = lazy(() => import('./pages/TermsOfService'));
const DMCAPolicy = lazy(() => import('./pages/DMCAPolicy'));

function LazyLegal({ page }: { page: 'privacy' | 'terms' | 'dmca' }) {
  const Component = page === 'privacy' ? PrivacyPolicy : page === 'terms' ? TermsOfService : DMCAPolicy;
  return (
    <Suspense fallback={<div className="app-container" style={{ justifyContent: 'center', alignItems: 'center', display: 'flex' }}><div className="spinner"></div></div>}>
      <Component />
    </Suspense>
  );
}

export default App;
