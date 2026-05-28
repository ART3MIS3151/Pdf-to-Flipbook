import * as pdfjsLib from 'pdfjs-dist';
import pdfWorker from 'pdfjs-dist/build/pdf.worker.min.mjs?url';

// Configure the worker using Vite's URL import
pdfjsLib.GlobalWorkerOptions.workerSrc = pdfWorker;

export interface PDFLoadProgress {
  currentPage: number;
  totalPages: number;
}

export const loadPDFPages = async (
  file: File,
  onProgress?: (progress: PDFLoadProgress) => void
): Promise<string[]> => {
  const arrayBuffer = await file.arrayBuffer();
  
  // Load the PDF document
  const loadingTask = pdfjsLib.getDocument({ data: arrayBuffer });
  const pdf = await loadingTask.promise;
  const numPages = pdf.numPages;
  
  const pages: string[] = [];
  
  // Render each page
  for (let i = 1; i <= numPages; i++) {
    const page = await pdf.getPage(i);
    
    // Set scale for reasonable quality vs performance
    const viewport = page.getViewport({ scale: 1.5 });
    
    // Prepare canvas using PDF page dimensions
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    
    if (!context) {
      throw new Error("Could not get canvas context");
    }
    
    canvas.height = viewport.height;
    canvas.width = viewport.width;
    
    // Render PDF page into canvas context
    const renderContext = {
      canvasContext: context,
      viewport: viewport,
    };
    
    // @ts-ignore - type definitions might have a mismatch but this is valid
    await page.render(renderContext).promise;
    
    // Convert to image data URL
    const imgData = canvas.toDataURL('image/jpeg', 0.8);
    pages.push(imgData);
    
    if (onProgress) {
      onProgress({ currentPage: i, totalPages: numPages });
    }
  }
  
  return pages;
};
