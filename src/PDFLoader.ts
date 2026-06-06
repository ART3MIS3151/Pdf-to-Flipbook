export interface PDFLoadProgress {
  currentPage: number;
  totalPages: number;
}

export const loadPDFPages = async (
  file: File,
  onProgress?: (progress: PDFLoadProgress) => void
): Promise<string[]> => {
  const arrayBuffer = await file.arrayBuffer();
  
  return new Promise((resolve, reject) => {
    // Instantiate the Web Worker using Vite's special syntax
    const worker = new Worker(new URL('./pdf-render.worker.ts', import.meta.url), { type: 'module' });
    
    worker.onmessage = (e) => {
      const { type, ...data } = e.data;
      
      if (type === 'progress') {
        if (onProgress) {
          onProgress({ currentPage: data.currentPage, totalPages: data.totalPages });
        }
      } else if (type === 'complete') {
        // Convert Blobs to ultra-fast Object URLs for image tags
        const pages = data.pages.map((blob: Blob) => URL.createObjectURL(blob));
        worker.terminate();
        resolve(pages);
      } else if (type === 'error') {
        worker.terminate();
        reject(new Error(data.error));
      }
    };
    
    worker.onerror = (err) => {
      worker.terminate();
      reject(err);
    };
    
    // Transfer the ArrayBuffer directly to the worker for zero-copy speed
    worker.postMessage(arrayBuffer, [arrayBuffer]);
  });
};
