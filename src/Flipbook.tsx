import React, { useEffect, useRef, useState } from 'react';
import { PageFlip } from 'page-flip';
import { Volume2, VolumeX } from 'lucide-react';

interface FlipbookProps {
  pages: string[];
}

export const Flipbook: React.FC<FlipbookProps> = ({ pages }) => {
  const bookRef = useRef<HTMLDivElement>(null);
  const pageFlipRef = useRef<PageFlip | null>(null);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const audioCtxRef = useRef<AudioContext | null>(null);

  // Initialize Audio Context
  useEffect(() => {
    audioCtxRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
    return () => {
      if (audioCtxRef.current?.state !== 'closed') {
        audioCtxRef.current?.close();
      }
    };
  }, []);

  const playFlipSound = () => {
    if (!soundEnabled || !audioCtxRef.current) return;
    
    const audioCtx = audioCtxRef.current;
    if (audioCtx.state === 'suspended') audioCtx.resume();
    
    // Synthesize a paper rustle/flip sound
    const bufferSize = audioCtx.sampleRate * 0.15; // 150ms
    const buffer = audioCtx.createBuffer(1, bufferSize, audioCtx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }
    
    const noise = audioCtx.createBufferSource();
    noise.buffer = buffer;
    
    const filter = audioCtx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.value = 800; // Low frequency for paper thickness
    
    const envelope = audioCtx.createGain();
    envelope.gain.setValueAtTime(0.8, audioCtx.currentTime);
    envelope.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.15);
    
    noise.connect(filter);
    filter.connect(envelope);
    envelope.connect(audioCtx.destination);
    noise.start();
  };

  useEffect(() => {
    if (bookRef.current && pages.length > 0 && !pageFlipRef.current) {
      // Initialize PageFlip
      const pageFlip = new PageFlip(bookRef.current, {
        width: 450, // base width
        height: 600, // base height
        size: 'stretch',
        minWidth: 315,
        maxWidth: 1000,
        minHeight: 420,
        maxHeight: 1350,
        maxShadowOpacity: 0.5,
        showCover: true,
        mobileScrollSupport: false
      });

      pageFlip.loadFromHTML(document.querySelectorAll('.page'));
      pageFlipRef.current = pageFlip;

      // Add event listener for sound
      pageFlip.on('flip', () => {
        playFlipSound();
      });
    }

    return () => {
      if (pageFlipRef.current) {
        pageFlipRef.current.destroy();
        pageFlipRef.current = null;
      }
    };
  }, [pages]); // Assuming pages don't change after load for now

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
      
      <div className="book-wrapper" style={{ width: '90vw', height: '80vh', maxWidth: '1000px', maxHeight: '700px' }}>
        <div ref={bookRef} id="book">
          {pages.map((imgSrc, index) => (
            <div className="page" key={index}>
              <img src={imgSrc} alt={`Page ${index + 1}`} draggable="false" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
