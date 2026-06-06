import * as pdfjsLib from 'pdfjs-dist';
import pdfWorker from 'pdfjs-dist/build/pdf.worker.min.mjs?url';

// Configure the worker using Vite's URL import
pdfjsLib.GlobalWorkerOptions.workerSrc = pdfWorker;

// Minimal DOM polyfill for pdf.js to prevent 'document.createElement' and rAF errors during background rendering
if (typeof (globalThis as any).document === 'undefined') {
  (globalThis as any).document = {
    createElement: (name: string) => {
      if (name.toLowerCase() === 'canvas') {
        return new OffscreenCanvas(1, 1);
      }
      return { style: {} };
    },
    documentElement: { style: {} },
    getElementsByTagName: () => [],
    currentScript: null
  };
}

if (typeof (globalThis as any).window === 'undefined') {
  (globalThis as any).window = globalThis;
}

if (typeof (globalThis as any).requestAnimationFrame === 'undefined') {
  (globalThis as any).requestAnimationFrame = (cb: Function) => setTimeout(cb, 16);
  (globalThis as any).cancelAnimationFrame = (id: any) => clearTimeout(id);
}

self.onmessage = async (e: MessageEvent) => {
  const { data: arrayBuffer } = e;

  try {
    // Load the PDF document
    const loadingTask = pdfjsLib.getDocument({ data: arrayBuffer });
    const pdf = await loadingTask.promise;
    const numPages = pdf.numPages;

    const pages: Blob[] = [];

    // Render each page
    for (let i = 1; i <= numPages; i++) {
      const page = await pdf.getPage(i);
      
      // Set scale for reasonable quality vs performance
      const viewport = page.getViewport({ scale: 1.5 });
      
      // Use OffscreenCanvas to render in the background thread
      const canvas = new OffscreenCanvas(viewport.width, viewport.height);
      const context = canvas.getContext('2d') as OffscreenCanvasRenderingContext2D;
      
      if (!context) {
        throw new Error("Could not get OffscreenCanvas context");
      }
      
      const renderContext: any = {
        canvasContext: context as any, // Cast to any to satisfy pdfjs types expecting standard CanvasRenderingContext2D
        viewport: viewport,
      };
      
      // @ts-ignore
      await page.render(renderContext).promise;
      
      // Convert to a blob
      const blob = await canvas.convertToBlob({ type: 'image/jpeg', quality: 0.8 });
      pages.push(blob);
      
      // Report progress
      self.postMessage({ type: 'progress', currentPage: i, totalPages: numPages });
    }
    
    // Send final result
    self.postMessage({ type: 'complete', pages });

  } catch (error) {
    self.postMessage({ type: 'error', error: String(error) });
  }
};
