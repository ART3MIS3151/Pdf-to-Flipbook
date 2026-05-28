import React, { useEffect, useRef, useState, forwardRef } from 'react';
// @ts-ignore
import HTMLFlipBook from 'react-pageflip';
import { Volume2, VolumeX } from 'lucide-react';

interface FlipbookProps {
  pages: string[];
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

export const Flipbook: React.FC<FlipbookProps> = ({ pages }) => {
  const [soundEnabled, setSoundEnabled] = useState(true);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    audioRef.current = new Audio('/page-flip.mp3');
  }, []);

  const playFlipSound = () => {
    if (!soundEnabled || !audioRef.current) return;
    
    // Reset time to allow rapid flipping
    audioRef.current.currentTime = 0;
    audioRef.current.play().catch(e => console.log('Audio play failed:', e));
  };

  const prevState = useRef<string>('read');

  return (
    <div className="flipbook-container">
      <div className="flipbook-controls glass-panel" style={{ padding: '0.5rem 1rem', borderRadius: '20px' }}>
        <button 
          className="btn-secondary" 
          style={{ padding: '8px', border: 'none', background: 'transparent' }}
          onClick={() => setSoundEnabled(!soundEnabled)}
          title="Toggle Sound"
        >
          {soundEnabled ? <Volume2 size={20} /> : <VolumeX size={20} />}
        </button>
        <span style={{ fontSize: '0.9rem', color: '#ccc' }}>
          Drag corners to flip pages
        </span>
      </div>
      
      <div className="book-wrapper" style={{ flex: 1, width: '100%', maxWidth: '1200px', position: 'relative', minHeight: 0, paddingBottom: '1rem' }}>
        {/* @ts-ignore - react-pageflip typings are strict about optional props */}
        <HTMLFlipBook 
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
      </div>
    </div>
  );
};
