import React, { useEffect, useRef, useState, forwardRef } from 'react';
// @ts-ignore
import HTMLFlipBook from 'react-pageflip';
import { Volume2, VolumeX, ChevronLeft, ChevronRight, MousePointer2, Hand, Share2, Check, Loader2 } from 'lucide-react';
import { ref, uploadBytes } from 'firebase/storage';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { db, storage } from './firebaseConfig';

interface FlipbookProps {
  pages: string[];
  originalFile?: File; // The original PDF file for sharing
}

// React-pageflip requires custom components to use forwardRef
const Page = forwardRef<HTMLDivElement, { imgSrc: string, index: number }>((props, ref) => {
  return (
    <div className="page" ref={ref} style={{ backgroundColor: 'white' }}>
      <img 
        src={props.imgSrc} 
        alt={`Page ${props.index + 1}`} 
        draggable="false" 
        style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block' }} 
      />
    </div>
  );
});

export const Flipbook: React.FC<FlipbookProps> = ({ pages, originalFile }) => {
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);
  const [interactionMode, setInteractionMode] = useState<'swipe' | 'pan'>('swipe');
  const [shareState, setShareState] = useState<'idle' | 'uploading' | 'done'>('idle');
  
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const flipbookRef = useRef<any>(null);
  const prevState = useRef<string>('read');

  useEffect(() => {
    audioRef.current = new Audio('/page-flip.mp3');
  }, []);

  const playFlipSound = () => {
    if (!soundEnabled || !audioRef.current) return;
    
    // Reset time to allow rapid flipping
    audioRef.current.currentTime = 0;
    audioRef.current.play().catch(e => console.log('Audio play failed:', e));
  };

  const handlePageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const pageIndex = parseInt(e.target.value, 10);
    if (flipbookRef.current) {
      flipbookRef.current.pageFlip().turnToPage(pageIndex);
    }
  };

  const goToPrevPage = () => {
    if (flipbookRef.current) {
      flipbookRef.current.pageFlip().flipPrev();
    }
  };

  const goToNextPage = () => {
    if (flipbookRef.current) {
      flipbookRef.current.pageFlip().flipNext();
    }
  };

  const handleShare = async () => {
    if (!originalFile || shareState === 'uploading') return;

    setShareState('uploading');
    try {
      // Generate a short unique ID
      const flipbookId = crypto.randomUUID().split('-')[0];
      const storagePath = `uploads/${flipbookId}.pdf`;

      // Upload PDF to Firebase Storage
      const storageRef = ref(storage, storagePath);
      await uploadBytes(storageRef, originalFile, { contentType: 'application/pdf' });

      // Save metadata to Firestore
      const docRef = doc(db, 'flipbooks', flipbookId);
      await setDoc(docRef, {
        id: flipbookId,
        fileName: originalFile.name,
        fileSize: originalFile.size,
        storagePath,
        createdAt: serverTimestamp(),
        viewCount: 0,
      });

      // Generate and copy link
      const shareLink = `${window.location.origin}/v/${flipbookId}`;
      await navigator.clipboard.writeText(shareLink);
      
      setShareState('done');
      setTimeout(() => setShareState('idle'), 3000);
    } catch (err: any) {
      console.error('Share failed:', err);
      alert(`Failed to share: ${err.message}`);
      setShareState('idle');
    }
  };

  return (
    <div className="flipbook-container">
      <div className="flipbook-controls glass-panel" style={{ padding: '1rem', borderRadius: '20px', display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '1rem', width: '100%', maxWidth: '800px' }}>
        
        {/* Top Row: Modes, Page Counter, Share & Audio */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
          <button 
            className="btn-secondary" 
            style={{ padding: '8px 12px', border: 'none', background: 'rgba(255,255,255,0.1)', borderRadius: '8px', display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', color: 'white' }}
            onClick={() => setInteractionMode(prev => prev === 'swipe' ? 'pan' : 'swipe')}
            title={interactionMode === 'swipe' ? "Switch to Pan & Zoom Mode" : "Switch to Swipe Mode"}
          >
            {interactionMode === 'swipe' ? (
              <><MousePointer2 size={16} /> <span style={{fontSize: '0.85rem'}}>Swipe Mode</span></>
            ) : (
              <><Hand size={16} /> <span style={{fontSize: '0.85rem'}}>Pan Mode</span></>
            )}
          </button>

          <span style={{ fontSize: '1rem', color: '#fff', fontWeight: 'bold' }}>
            Page {currentPage + 1} of {pages.length}
          </span>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            {originalFile && (
              <button 
                onClick={handleShare}
                disabled={shareState === 'uploading'}
                style={{ 
                  padding: '8px 12px', 
                  border: 'none', 
                  background: shareState === 'done' ? 'rgba(34, 197, 94, 0.2)' : 'rgba(167, 139, 250, 0.2)', 
                  borderRadius: '8px', 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '0.5rem', 
                  cursor: shareState === 'uploading' ? 'wait' : 'pointer', 
                  color: shareState === 'done' ? '#22c55e' : '#a78bfa',
                  transition: 'all 0.3s ease'
                }}
                title="Share this flipbook"
              >
                {shareState === 'idle' && <><Share2 size={16} /> <span style={{fontSize: '0.85rem'}}>Share</span></>}
                {shareState === 'uploading' && <><Loader2 size={16} style={{ animation: 'spin 1s linear infinite' }} /> <span style={{fontSize: '0.85rem'}}>Uploading...</span></>}
                {shareState === 'done' && <><Check size={16} /> <span style={{fontSize: '0.85rem'}}>Link Copied!</span></>}
              </button>
            )}
            <button 
              className="btn-secondary" 
              style={{ padding: '8px', border: 'none', background: 'transparent', cursor: 'pointer', color: 'white' }}
              onClick={() => setSoundEnabled(!soundEnabled)}
              title="Toggle Sound"
            >
              {soundEnabled ? <Volume2 size={24} /> : <VolumeX size={24} />}
            </button>
          </div>
        </div>

        {/* Bottom Row: Scrubber */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', width: '100%' }}>
          <button onClick={goToPrevPage} disabled={currentPage === 0} style={{ background: 'transparent', border: 'none', color: currentPage === 0 ? '#555' : '#fff', cursor: currentPage === 0 ? 'default' : 'pointer' }}>
            <ChevronLeft size={28} />
          </button>
          
          <input 
            type="range" 
            min={0} 
            max={pages.length - 1} 
            value={currentPage} 
            onChange={handlePageChange}
            style={{ flex: 1, cursor: 'pointer', height: '6px', borderRadius: '4px', accentColor: '#8a2be2' }}
          />

          <button onClick={goToNextPage} disabled={currentPage >= pages.length - 1} style={{ background: 'transparent', border: 'none', color: currentPage >= pages.length - 1 ? '#555' : '#fff', cursor: currentPage >= pages.length - 1 ? 'default' : 'pointer' }}>
            <ChevronRight size={28} />
          </button>
        </div>
      </div>
      
      <div className="book-wrapper" style={{ flex: 1, width: '100%', maxWidth: '1200px', position: 'relative', minHeight: 0, paddingBottom: '1rem' }}>
        {/* @ts-ignore - react-pageflip typings are strict about optional props */}
        <HTMLFlipBook 
          ref={flipbookRef}
          width={450} 
          height={636} 
          size="stretch"
          minWidth={315}
          maxWidth={1000}
          minHeight={420}
          maxHeight={1350}
          maxShadowOpacity={0.5}
          showCover={true}
          mobileScrollSupport={false}
          swipeDistance={40}
          useMouseEvents={interactionMode === 'swipe'}
          onFlip={(e: any) => setCurrentPage(e.data)}
          onChangeState={(e: any) => {
            const currentState = e.data;
            if (currentState === 'user_fold') {
              playFlipSound();
            } else if (currentState === 'flipping' && prevState.current !== 'user_fold') {
              playFlipSound();
            }
            prevState.current = currentState;
          }}
          className="html-flipbook"
        >
          {pages.map((imgSrc, index) => (
             <Page imgSrc={imgSrc} index={index} key={index} />
          ))}
        </HTMLFlipBook>

        {interactionMode === 'pan' && (
          <div 
            style={{ 
              position: 'absolute', 
              top: 0, left: 0, right: 0, bottom: 0, 
              zIndex: 10, 
              touchAction: 'pan-x pan-y pinch-zoom' 
            }} 
          />
        )}
      </div>
    </div>
  );
};
