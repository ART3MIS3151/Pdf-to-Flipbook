import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { ref, getDownloadURL } from 'firebase/storage';
import { db, storage } from './firebaseConfig';
import { Flipbook } from './Flipbook';
import { loadPDFPages } from './PDFLoader';
import type { PDFLoadProgress } from './PDFLoader';

export const SharedViewer: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [pages, setPages] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState<PDFLoadProgress | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string>('');

  useEffect(() => {
    if (!id) return;

    const loadSharedFlipbook = async () => {
      try {
        // Fetch metadata from Firestore
        const docRef = doc(db, 'flipbooks', id);
        const docSnap = await getDoc(docRef);

        if (!docSnap.exists()) {
          setError('This flipbook does not exist or has been removed.');
          setLoading(false);
          return;
        }

        const data = docSnap.data();
        setFileName(data.fileName || 'Shared Flipbook');

        // Download the PDF from Firebase Storage
        const storageRef = ref(storage, data.storagePath);
        const downloadURL = await getDownloadURL(storageRef);

        const response = await fetch(downloadURL);
        const blob = await response.blob();
        const file = new File([blob], data.fileName || 'shared.pdf', { type: 'application/pdf' });

        // Process through the existing PDF rendering pipeline
        const renderedPages = await loadPDFPages(file, (prog) => {
          setProgress(prog);
        });

        if (renderedPages.length === 0) {
          throw new Error('No pages could be rendered from this PDF.');
        }

        setPages(renderedPages);
      } catch (err: any) {
        console.error('Error loading shared flipbook:', err);
        setError(`Failed to load flipbook: ${err.message || String(err)}`);
      } finally {
        setLoading(false);
        setProgress(null);
      }
    };

    loadSharedFlipbook();
  }, [id]);

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
        {fileName && <p style={{ color: '#a78bfa' }}>{fileName}</p>}
      </header>

      <main className="main-content">
        {loading && (
          <div className="loader-container">
            <div className="spinner"></div>
            <h3 style={{ color: 'white' }}>Loading shared flipbook...</h3>
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
          <div className="glass-panel" style={{ padding: '2rem', textAlign: 'center', maxWidth: '500px' }}>
            <h3 style={{ color: '#ef4444', marginBottom: '1rem' }}>Flipbook Not Found</h3>
            <p style={{ marginBottom: '1.5rem' }}>{error}</p>
            <Link to="/" className="btn-primary" style={{ textDecoration: 'none', padding: '0.75rem 2rem' }}>
              Create Your Own Flipbook
            </Link>
          </div>
        )}

        {!loading && pages.length > 0 && !error && (
          <Flipbook pages={pages} />
        )}
      </main>
    </div>
  );
};
