import React, { useCallback, useState } from 'react';
import { UploadCloud } from 'lucide-react';

interface PDFUploaderProps {
  onFileSelect: (file: File) => void;
}

export const PDFUploader: React.FC<PDFUploaderProps> = ({ onFileSelect }) => {
  const [isDragging, setIsDragging] = useState(false);

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setIsDragging(true);
    } else if (e.type === 'dragleave') {
      setIsDragging(false);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0];
      if (file.type === 'application/pdf') {
        onFileSelect(file);
      } else {
        alert('Please drop a valid PDF file.');
      }
    }
  }, [onFileSelect]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      if (file.type === 'application/pdf') {
        onFileSelect(file);
      } else {
        alert('Please select a valid PDF file.');
      }
    }
  };

  return (
    <div 
      className={`glass-panel uploader-container ${isDragging ? 'drag-active' : ''}`}
      onDragEnter={handleDrag}
      onDragOver={handleDrag}
      onDragLeave={handleDrag}
      onDrop={handleDrop}
    >
      <UploadCloud className="upload-icon" />
      <h2>Upload your PDF</h2>
      <p>Drag and drop your PDF here, or click to browse</p>
      
      <input 
        type="file" 
        id="pdf-upload" 
        accept="application/pdf" 
        className="hidden-input"
        onChange={handleChange}
      />
      <label htmlFor="pdf-upload" className="btn-primary">
        Browse Files
      </label>
    </div>
  );
};
