# Custom PDF Flipbook Web App

A premium, interactive web application that allows users to upload PDF documents and read them with a realistic 3D page-flipping animation. Built with React, Vite, and PDF.js.

## Features
- **Realistic 3D Page Curling**: Authentic physical page turning physics powered by `react-pageflip`.
- **Authentic Sound Design**: Accurate page flip audio synced to the user's manual dragging or clicking actions.
- **Client-Side PDF Rendering**: Fast and secure local rendering using `pdf.js`. No files are uploaded to any server.
- **Glassmorphism UI**: Beautiful, modern dark-mode aesthetic with frosted glass elements.
- **Responsive Layout**: Adjusts automatically to your screen size while maintaining the document's aspect ratio.

## Requirements
- [Node.js](https://nodejs.org/) (version 16 or higher recommended)
- npm or yarn

## Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/ART3MIS3151/Pdf-to-Flipbook.git
   cd Pdf-to-Flipbook
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

## Running Locally

To start the local development server:
```bash
npm run dev
```
Once running, open the URL provided in your terminal (usually `http://localhost:5173`) in your web browser.

## Building for Production

To create an optimized production build:
```bash
npm run build
```
This will compile the application into the `dist/` directory, which can then be deployed to any static hosting service (like Vercel, Netlify, or GitHub Pages).

## Usage
1. Open the application in your browser.
2. Drag and drop any `.pdf` file into the upload area, or click to browse your files.
3. Wait a moment for the PDF to be processed and rendered into the canvas.
4. Drag the corners of the pages or click on the edges to flip through the book! You can toggle the page flip sound on or off using the volume icon at the top.
