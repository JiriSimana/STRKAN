'use client';

import * as React from 'react';
import { useState } from 'react';
import PhotoAlbum from 'react-photo-album';
import Lightbox from 'yet-another-react-lightbox';
import 'yet-another-react-lightbox/styles.css';

// Generating 60 placeholder images as requested
const generatePhotos = () => {
  const photos = [];
  for (let i = 1; i <= 60; i++) {
    const width = 800;
    const height = i % 3 === 0 ? 1200 : i % 2 === 0 ? 600 : 800;
    
    // Create an SVG string placeholder with absolute dimensions
    const svgStr = `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}"><rect width="100%" height="100%" fill="#F2F2F2"/><text x="50%" y="50%" font-family="sans-serif" font-size="30" fill="#575756" text-anchor="middle" dy=".3em">[Placeholder ${i}]</text></svg>`;
    
    // Cross-platform base64 encoding (Node.js & Browser)
    const base64 = typeof window !== 'undefined' 
      ? btoa(unescape(encodeURIComponent(svgStr))) 
      : Buffer.from(svgStr).toString('base64');
      
    const src = `data:image/svg+xml;base64,${base64}`;

    photos.push({
      src: src,
      width,
      height,
      alt: `Fotografie z výroby ${i}`,
    });
  }
  return photos;
};

const photos = generatePhotos();

export function MasonryGallery() {
  const [index, setIndex] = useState(-1);

  return (
    <div className="w-full">
      <PhotoAlbum 
        layout="rows" 
        photos={photos.slice(0, 12)} 
        spacing={16}
        targetRowHeight={300}
        onClick={({ index }) => setIndex(index)}
      />

      <Lightbox
        slides={photos}
        open={index >= 0}
        index={index}
        close={() => setIndex(-1)}
      />
    </div>
  );
}
